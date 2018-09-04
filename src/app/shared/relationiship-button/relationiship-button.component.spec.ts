import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationishipButtonComponent } from './relationiship-button.component';

describe('RelationishipButtonComponent', () => {
  let component: RelationishipButtonComponent;
  let fixture: ComponentFixture<RelationishipButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationishipButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationishipButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
