import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Question, QuestionItems } from './model/question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {
    /*     this.getJSON().subscribe(data => {
        console.log(data);
    }); */
    // this.map = new Map<number,Question>();
    this.map_result = new Map<number, boolean >();
  }

  // map:  Map<number, Question>;

  // indica se si è risposto correttamente o meno alla domanda con id-indicato
  map_result : Map<number, boolean>;

  public initQuestion ( q: Question ) {
    // this.map.set( q.id, q );
  }

  public getRisposteDate () {
    return this.map_result;
  }

  public getQuestions(): Observable<QuestionItems> {
    //
    this.map_result.clear();
    //
    // return this.http.get<Question[]>("./assets/domande.json");
    // return this.http.get<Question[]>('http://10.6.5.195:3000/sampleDomande');
    //
    // see src/proxy.conf.json -->  https://angular.io/guide/build#rewrite-the-url-path
    let retArr : Observable<QuestionItems> = this.http.get<Question[]>("/api/sampleDomande");
    // retArr.subscribe(
    //   (qlist) => {
    //     this.map.clear();
    //     // Create map   id --> Question
    //     for (let i of qlist ) {
    //       this.map.set( i.id, i );
    //     }
    //   });
    return retArr;
  }

  public register( question:Question, rispostaCorretta: boolean ) {
    console.log(` registrato domanda ${question.id} corretta: ${rispostaCorretta}` );
    // if (rispostaCorretta) {
    //   let q1 : Question | undefined = this.map.get( question.id);
    //   if (q1 === undefined) {
    //
    //   } else {
    //     q1.profile.ok = q1.profile.ok + 1;
    //   }
    // } else {
    //   let q2 : Question | undefined = this.map.get( question.id);
    //   if (q2 === undefined) {

    //   } else {
    //     q2.profile.nok = q2.profile.nok + 1;
    //   }
    //
    // }
    //
    this.map_result.set( question.id, rispostaCorretta );
    //
    console.log( question );


  }

}
