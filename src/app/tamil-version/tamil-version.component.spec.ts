import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TamilVersionComponent } from './tamil-version.component';

describe('TamilVersionComponent', () => {
  let component: TamilVersionComponent;
  let fixture: ComponentFixture<TamilVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TamilVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TamilVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
