import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeCommandesPage } from './fake-commandes.page';

describe('FakeCommandesPage', () => {
  let component: FakeCommandesPage;
  let fixture: ComponentFixture<FakeCommandesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FakeCommandesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeCommandesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
