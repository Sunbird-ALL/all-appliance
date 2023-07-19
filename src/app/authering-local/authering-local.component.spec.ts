import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutheringLocalComponent } from './authering-local.component';

describe('AutheringLocalComponent', () => {
  let component: AutheringLocalComponent;
  let fixture: ComponentFixture<AutheringLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutheringLocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutheringLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
