import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutheringServerComponent } from './authering-server.component';

describe('AutheringServerComponent', () => {
  let component: AutheringServerComponent;
  let fixture: ComponentFixture<AutheringServerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutheringServerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutheringServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
