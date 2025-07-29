import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Contato } from '../models/contato.interface';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private apiUrl = 'http://localhost:3001/contatos';
  private contatosSubject = new BehaviorSubject<Contato[]>([]);
  public contatos$ = this.contatosSubject.asObservable();

  constructor(private http: HttpClient) {
    this.carregarContatos();
  }

  carregarContatos(): void {
    this.http.get<Contato[]>(this.apiUrl).subscribe({
      next: (contatos) => {
        this.contatosSubject.next(contatos);
      },
      error: (error) => {
        console.error('Erro ao carregar contatos:', error);
        this.contatosSubject.next([]);
      }
    });
  }

  obterContatos(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.apiUrl).pipe(
      tap(contatos => this.contatosSubject.next(contatos))
    );
  }

  obterContatoPorId(id: string): Observable<Contato> {
    return this.http.get<Contato>(`${this.apiUrl}/${id}`);
  }

  criarContato(contato: Omit<Contato, 'id'>): Observable<Contato> {
    return this.http.post<Contato>(this.apiUrl, contato).pipe(
      tap(() => this.carregarContatos())
    );
  }

  atualizarContato(id: string, contato: Partial<Contato>): Observable<Contato> {
    return this.http.patch<Contato>(`${this.apiUrl}/${id}`, contato).pipe(
      tap(() => this.carregarContatos())
    );
  }

  excluirContato(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.carregarContatos())
    );
  }

  filtrarContatos(termo: string): Observable<Contato[]> {
    return this.contatos$.pipe(
      map(contatos => {
        if (!termo.trim()) {
          return contatos;
        }
        
        const termoLower = termo.toLowerCase();
        return contatos.filter(contato =>
          contato.nome.toLowerCase().includes(termoLower) ||
          contato.email.toLowerCase().includes(termoLower) ||
          contato.telefone.includes(termo) ||
          (contato.whatsapp && contato.whatsapp.includes(termo)) ||
          (contato.dataNascimento && contato.dataNascimento.includes(termo))
        );
      })
    );
  }

  ordenarContatos(contatos: Contato[], ordem: 'asc' | 'desc' = 'asc'): Contato[] {
    return [...contatos].sort((a, b) => {
      const nomeA = a.nome.toLowerCase();
      const nomeB = b.nome.toLowerCase();
      
      if (ordem === 'asc') {
        return nomeA.localeCompare(nomeB);
      } else {
        return nomeB.localeCompare(nomeA);
      }
    });
  }
}

