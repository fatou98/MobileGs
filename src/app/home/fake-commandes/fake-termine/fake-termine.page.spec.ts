import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeTerminePage } from './fake-termine.page';

describe('FakeTerminePage', () => {
  let component: FakeTerminePage;
  let fixture: ComponentFixture<FakeTerminePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FakeTerminePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeTerminePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
