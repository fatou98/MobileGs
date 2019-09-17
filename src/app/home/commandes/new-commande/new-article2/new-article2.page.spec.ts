import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewArticle2Page } from './new-article2.page';

describe('NewArticle2Page', () => {
  let component: NewArticle2Page;
  let fixture: ComponentFixture<NewArticle2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewArticle2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewArticle2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
