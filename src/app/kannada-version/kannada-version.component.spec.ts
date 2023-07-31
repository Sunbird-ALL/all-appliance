import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KannadaVersionComponent } from './kannada-version.component';

describe('KannadaVersionComponent', () => {
  let component: KannadaVersionComponent;
  let fixture: ComponentFixture<KannadaVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KannadaVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KannadaVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
