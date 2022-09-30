import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterLink, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  @ViewChild('username') username!: ElementRef; // Passing name to the quiz page
  constructor() { }

  ngOnInit(): void {
  }

  startQuiz() {
      localStorage.setItem('username',this.username.nativeElement.value);
  };

}
