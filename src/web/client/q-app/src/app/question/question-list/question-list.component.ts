import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/question.service';
import {QuestionItems, Risposta, Question }  from '../../model/question'


@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

    questions : QuestionItems = [];



    constructor(private service: QuestionService) {

    }

    ngOnInit() {

      console.log("QuestionListComponent   ngInit " );

      this.service.getQuestions ().subscribe(
        (qlist) => {

          console.log("QuestionListComponent    this.service.getQuestions " , qlist );

          // mischia/shuffle le risposte.
          for (let i of qlist ) {
            i.Risposte = this.shuffle ( i.Risposte );
          }

          for (let q of qlist ) {
            this.service.initQuestion ( q );
          }

          this.questions = qlist;
        }
        );
    }

    onClickInvia(){
      var a = this.service.getRisposteDate();
      console.log(a);
    }

    shuffle(array: Risposta[]): Risposta[] {
      let currentIndex = array.length,  randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }

      return array;
    }

}
