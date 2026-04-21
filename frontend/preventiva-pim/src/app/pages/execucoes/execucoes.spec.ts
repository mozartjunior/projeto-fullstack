import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Execucoes } from './execucoes';

describe('Execucoes', () => {
  let component: Execucoes;
  let fixture: ComponentFixture<Execucoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Execucoes],
    }).compileComponents();

    fixture = TestBed.createComponent(Execucoes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
