import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureTrainingComponent } from './future-training.component';

describe('FutureTrainingComponent', () => {
  let component: FutureTrainingComponent;
  let fixture: ComponentFixture<FutureTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutureTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
