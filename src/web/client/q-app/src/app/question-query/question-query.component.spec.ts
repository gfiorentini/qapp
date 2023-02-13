import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionQueryComponent } from './question-query.component';

describe('QuestionQueryComponent', () => {
  let component: QuestionQueryComponent;
  let fixture: ComponentFixture<QuestionQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionQueryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
