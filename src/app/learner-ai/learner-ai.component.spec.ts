import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerAiComponent } from './learner-ai.component';

describe('LearnerAiComponent', () => {
  let component: LearnerAiComponent;
  let fixture: ComponentFixture<LearnerAiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnerAiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
