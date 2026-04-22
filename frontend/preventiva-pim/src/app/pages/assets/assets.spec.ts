import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Assets } from './assets';

describe('Assets', () => {
  let component: Assets;
  let fixture: ComponentFixture<Assets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Assets],
    }).compileComponents();

    fixture = TestBed.createComponent(Assets);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
