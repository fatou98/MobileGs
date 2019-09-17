import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Article2Page } from './article2.page';

describe('Article2Page', () => {
  let component: Article2Page;
  let fixture: ComponentFixture<Article2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Article2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Article2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
