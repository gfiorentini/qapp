import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './common/navbar/navbar.component';
import { QuestionItemComponent } from './question/question-item/question-item.component';
import { QuestionListComponent } from './question/question-list/question-list.component';
import { QuestionService } from './question.service';
import { QuestionQueryComponent } from './question-query/question-query.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    QuestionItemComponent,
    QuestionListComponent,
    QuestionQueryComponent
  ],
  imports: [
    BrowserModule,
	  FormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
