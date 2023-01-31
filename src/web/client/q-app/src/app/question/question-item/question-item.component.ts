import { Component, Input, OnInit } from '@angular/core';
import { Question, Risposta, RispostaItems } from '../../../app/model/question';


@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.css']
})
export class QuestionItemComponent implements OnInit {

  @Input()
  q: Question = {
    TestoDomanda: 'empty',
    Risposte: []
  };

  @Input()
    id: number = 0;

  rSelected: Risposta = { Corretta : false, Text : ''};

  ngOnInit() {

    console.log("QuestionItemComponent   ngInit " );

  }

  handleChange (r : Risposta) {
    console.log('click;', r);
    this.rSelected = r;
  }

}
