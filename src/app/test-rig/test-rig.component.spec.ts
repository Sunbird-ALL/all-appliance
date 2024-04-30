import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRigComponent } from './test-rig.component';

describe('TestRigComponent', () => {
  let component: TestRigComponent;
  let fixture: ComponentFixture<TestRigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestRigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
