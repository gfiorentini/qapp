import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question, QuestionItems } from './model/question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {
    /*     this.getJSON().subscribe(data => {
        console.log(data);
    }); */
  }

  public getQuestions(): Observable<QuestionItems> {
    // return this.http.get<Question[]>("./assets/domande.json");
    return this.http.get<Question[]>('http://10.6.5.195:3000/sampleDomande');
  }
}
