import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
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

  public sendDataReport () {

    //console.log(JSON.stringify([...this.map_result]));
    // 'http://10.6.5.195:3000/sampleDomande
    // return this.http.post("http://localhost:3000/sendDataReport", [...this.map_result], this.httpOptions)
    return this.http.post("/api/sendDataReport", [...this.map_result], this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  public getQuestions(parNonRisp : boolean = true, parSbagliate : boolean = true  , parCorrette : boolean = true ): Observable<QuestionItems> {
    //
    this.map_result.clear();

    let queryParams = new HttpParams();
    queryParams = queryParams.append("parNonRisp",parNonRisp);
    queryParams = queryParams.append("parSbagliate",parSbagliate);
    queryParams = queryParams.append("parCorrette", parCorrette);
    //
    // return this.http.get<Question[]>("./assets/domande.json");
    // return this.http.get<Question[]>('http://10.6.5.195:3000/sampleDomande');
    //
    // see src/proxy.conf.json -->  https://angular.io/guide/build#rewrite-the-url-path
    let retArr : Observable<QuestionItems> = this.http.get<Question[]>("/api/sampleDomande" , { params: queryParams  });
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
