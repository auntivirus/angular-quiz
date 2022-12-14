import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { };

  getQuestions() {
    return this.http.get<any>('assets/questions/questions.json')
  };
}
