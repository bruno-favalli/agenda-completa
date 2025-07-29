import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaContatos } from './lista-contatos';

describe('ListaContatos', () => {
  let component: ListaContatos;
  let fixture: ComponentFixture<ListaContatos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaContatos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaContatos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
