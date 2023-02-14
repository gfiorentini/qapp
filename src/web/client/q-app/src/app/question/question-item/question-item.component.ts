import { Component, Input, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/question.service';
import { Question, Risposta, RispostaItems, Profile } from '../../../app/model/question';


@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.css']
})
export class QuestionItemComponent implements OnInit {

  @Input()
  q: Question|any= {};

  constructor ( private service:QuestionService   ) {}

  @Input()
    id: number = 0;

  rSelected: Risposta = { Corretta : false, Text : ''};

  ngOnInit() {

    console.log("QuestionItemComponent   ngInit " );

  }

  handleChange (r : Risposta) {
    console.log('click;', r);
    this.rSelected = r;
    this.service.register ( this.q, r.Corretta );
  }

}
