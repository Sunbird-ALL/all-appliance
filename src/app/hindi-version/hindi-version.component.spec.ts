import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HindiVersionComponent } from './hindi-version.component';

describe('HindiVersionComponent', () => {
  let component: HindiVersionComponent;
  let fixture: ComponentFixture<HindiVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HindiVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HindiVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
