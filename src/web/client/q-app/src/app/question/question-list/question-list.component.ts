import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuestionService } from 'src/app/question.service';
import { QuestionItems, Risposta, Question } from '../../model/question';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
})
export class QuestionListComponent implements OnInit, OnDestroy {
  questions: QuestionItems = [];

  private domandeSub: Subscription | undefined;

  constructor(private service: QuestionService) {}

  ngOnDestroy() {
    if (this.domandeSub === undefined) {
    } else {
      this.domandeSub.unsubscribe();
    }
  }

  ngOnInit() {
    console.log('QuestionListComponent   ngInit ');

    this.domandeSub = this.service
      .getDomandeAggiornateListener()
      .subscribe((domande: QuestionItems) => {
        // update data.
        console.log(
          'QuestionListComponent    this.service.getQuestions ',
          domande
        );

        // mischia/shuffle le risposte.
        for (let i of domande) {
          i.Risposte = this.shuffle(i.Risposte);
        }

        for (let q of domande) {
          this.service.initQuestion(q);
        }

        this.questions = domande;
      });

    this.service.requestNewQuestions();

    /*    this.service.getQuestions().subscribe((qlist) => {
      console.log('QuestionListComponent    this.service.getQuestions ', qlist);

      // mischia/shuffle le risposte.
      for (let i of qlist) {
        i.Risposte = this.shuffle(i.Risposte);
      }

      for (let q of qlist) {
        this.service.initQuestion(q);
      }

      this.questions = qlist;
    });
    */
  }

  onClickInvia() {
    var a = this.service.getRisposteDate();
    console.log(a);
    this.service.sendDataReport().subscribe((data) => console.log(data));
  }

  shuffle(array: Risposta[]): Risposta[] {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
}
