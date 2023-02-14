import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question-query',
  templateUrl: './question-query.component.html',
  styleUrls: ['./question-query.component.css']
})
export class QuestionQueryComponent implements OnInit {

  constructor ( private service: QuestionService ) {

  }

  @ViewChild('refNonRisp') refNonRisp: ElementRef<HTMLInputElement> | undefined
  @ViewChild('refSbagliate') refSbagliate:ElementRef<HTMLInputElement> | undefined
  @ViewChild('refCorrette') refCorrette :ElementRef<HTMLInputElement> | undefined;

  ngOnInit() {

    console.log("QuestionQueryComponent   ngInit " );

    console.log( this.refCorrette?.nativeElement.value );
    console.log( this.refSbagliate?.nativeElement.value );
    console.log( this.refNonRisp?.nativeElement.value );


  //   this.service.getQuestions ().subscribe(
  //     (qlist) => {
  //       console.log("QuestionListComponent    this.service.getQuestions " , qlist );
  //       // mischia/shuffle le risposte.
  //       for (let i of qlist ) {
  //         i.Risposte = this.shuffle ( i.Risposte );
  //       }
  //       for (let q of qlist ) {
  //         this.service.initQuestion ( q );
  //       }
  //       this.questions = qlist;
  //     }
  //     );
  }

  onClickInvia(){
    console.log('-------------- clickInvia -----------------');
    console.log( this.refCorrette?.nativeElement.checked );
    console.log( this.refSbagliate?.nativeElement.checked);
    console.log( this.refNonRisp?.nativeElement.checked );

    this.service.getQuestions ( this.refNonRisp?.nativeElement.checked
      , this.refSbagliate?.nativeElement.checked
      , this.refCorrette?.nativeElement.checked );

  }




}
