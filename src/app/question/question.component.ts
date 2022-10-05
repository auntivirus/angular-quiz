import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';
import {interval} from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  incorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isCompleted: boolean = false;

  constructor(private questionService: QuestionService) { };

  ngOnInit(): void {
    this.name = localStorage.getItem('username')!;
    this.getAllQuestions();
    this.startCounter();
  };

  getAllQuestions() {
    this.questionService.getQuestions().subscribe(res=> {
      // console.log(res.questions);
      this.questionList = res.questions;
    })
  };

  nextQuestion () {
      this.currentQuestion++;
  };

  previousQuestion () {
      this.currentQuestion--;
  };

  selectedAnswer(currentQuestion: number, option: any) {
    if(currentQuestion === this.questionList.length)
    {
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercentage();
      }, 1000);
      this.isCompleted = true;
      this.stopCounter();
    }
    if(option.correct)
    {
      this.points += 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercentage();
      }, 1000);
    }
    else
    {
      setTimeout(() => {
        this.currentQuestion++;
        this.incorrectAnswer++;
        this.resetCounter();
        this.getProgressPercentage();
      },1000);
      this.points -= 10;
    }
  };

  startCounter() {
    this.interval$ = interval(1000).subscribe(val => {
      this.counter--;
      if(this.counter === 0 )
      {
        this.currentQuestion++;
        this.points-=10;
        this.counter = 60;
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe()
    }, 600000);
  };

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  };

  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  };

  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.currentQuestion = 0;
    this.progress = "0";

  };

  getProgressPercentage() {
    this.progress = ((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;
  }

}
