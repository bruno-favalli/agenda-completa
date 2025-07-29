import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContatoService } from '../../services/contato.service';
import { Contato } from '../../models/contato.interface';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-lista-contatos',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './lista-contatos.html',
  styleUrl: './lista-contatos.scss'
})
export class ListaContatosComponent implements OnInit {
  contatos$: Observable<Contato[]>;
  filtroTermo = '';
  ordemAlfabetica: 'asc' | 'desc' = 'asc';
  private filtroSubject = new BehaviorSubject<string>('');

  constructor(
    private contatoService: ContatoService,
    private toastr: ToastrService
  ) {
    this.contatos$ = combineLatest([
      this.contatoService.contatos$,
      this.filtroSubject.asObservable().pipe(startWith(''))
    ]).pipe(
      map(([contatos, filtro]) => {
        let contatosFiltrados = contatos;
        
        if (filtro.trim()) {
          const termoLower = filtro.toLowerCase();
          contatosFiltrados = contatos.filter(contato =>
            contato.nome.toLowerCase().includes(termoLower) ||
            contato.email.toLowerCase().includes(termoLower) ||
            contato.telefone.includes(filtro) ||
            (contato.whatsapp && contato.whatsapp.includes(filtro)) ||
            (contato.dataNascimento && contato.dataNascimento.includes(filtro))
          );
        }
        
        return this.contatoService.ordenarContatos(contatosFiltrados, this.ordemAlfabetica);
      })
    );
  }

  ngOnInit(): void {
    this.contatoService.carregarContatos();
  }

  aplicarFiltro(): void {
    this.filtroSubject.next(this.filtroTermo);
  }

  limparFiltro(): void {
    this.filtroTermo = '';
    this.filtroSubject.next('');
  }

  alternarOrdem(): void {
    this.ordemAlfabetica = this.ordemAlfabetica === 'asc' ? 'desc' : 'asc';
    this.aplicarFiltro(); // Reaplica o filtro com a nova ordenação
  }

  excluirContato(id: number, nome: string): void {
    if (confirm(`Tem certeza que deseja excluir o contato "${nome}"?`)) {
      this.contatoService.excluirContato(id).subscribe({
        next: () => {
          this.toastr.success(`Contato "${nome}" excluído com sucesso!`);
        },
        error: (error) => {
          console.error('Erro ao excluir contato:', error);
          this.toastr.error('Erro ao excluir contato. Tente novamente.');
        }
      });
    }
  }

  formatarTelefone(telefone: string): string {
    return telefone || 'Não informado';
  }

  obterIniciais(nome: string): string {
    return nome.split(' ')
      .map(parte => parte.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }
}

