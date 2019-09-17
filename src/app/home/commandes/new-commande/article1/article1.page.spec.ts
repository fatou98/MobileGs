import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Article1Page } from './article1.page';

describe('Article1Page', () => {
  let component: Article1Page;
  let fixture: ComponentFixture<Article1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Article1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Article1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
