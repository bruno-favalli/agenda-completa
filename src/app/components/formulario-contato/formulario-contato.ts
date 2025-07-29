import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ContatoService } from '../../services/contato.service';
import { Contato } from '../../models/contato.interface';

@Component({
  selector: 'app-formulario-contato',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './formulario-contato.html',
  styleUrl: './formulario-contato.scss'
})
export class FormularioContatoComponent implements OnInit {
  formulario: FormGroup;
  isEdicao = false;
  contatoId: number | null = null;
  carregando = false;

  constructor(
    private fb: FormBuilder,
    private contatoService: ContatoService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.formulario = this.criarFormulario();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdicao = true;
        this.contatoId = +params['id'];
        this.carregarContato();
      }
    });
  }

  private criarFormulario(): FormGroup {
    return this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      whatsapp: [''],
      dataNascimento: [''],
      avatarUrl: ['', [Validators.pattern(/^https?:\/\/.+/)]]
    });
  }

  private carregarContato(): void {
    if (this.contatoId) {
      this.carregando = true;
      this.contatoService.obterContatoPorId(this.contatoId).subscribe({
        next: (contato) => {
          this.formulario.patchValue({
            nome: contato.nome,
            email: contato.email,
            telefone: contato.telefone,
            whatsapp: contato.whatsapp || '',
            dataNascimento: contato.dataNascimento || '',
            avatarUrl: contato.avatarUrl || ''
          });
          this.carregando = false;
        },
        error: (error) => {
          console.error('Erro ao carregar contato:', error);
          this.toastr.error('Erro ao carregar contato');
          this.router.navigate(['/contatos']);
          this.carregando = false;
        }
      });
    }
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      this.carregando = true;
      const dadosContato = this.formulario.value;

      if (this.isEdicao && this.contatoId) {
        this.contatoService.atualizarContato(this.contatoId, dadosContato).subscribe({
          next: () => {
            this.toastr.success('Contato atualizado com sucesso!');
            this.router.navigate(['/contatos']);
          },
          error: (error) => {
            console.error('Erro ao atualizar contato:', error);
            this.toastr.error('Erro ao atualizar contato');
            this.carregando = false;
          }
        });
      } else {
        this.contatoService.criarContato(dadosContato).subscribe({
          next: () => {
            this.toastr.success('Contato criado com sucesso!');
            this.router.navigate(['/contatos']);
          },
          error: (error) => {
            console.error('Erro ao criar contato:', error);
            this.toastr.error('Erro ao criar contato');
            this.carregando = false;
          }
        });
      }
    } else {
      this.marcarCamposComoTocados();
      this.toastr.warning('Por favor, corrija os erros no formulário');
    }
  }

  private marcarCamposComoTocados(): void {
    Object.keys(this.formulario.controls).forEach(key => {
      this.formulario.get(key)?.markAsTouched();
    });
  }

  cancelar(): void {
    this.router.navigate(['/contatos']);
  }

  obterErro(campo: string): string {
    const control = this.formulario.get(campo);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `${this.obterNomeCampo(campo)} é obrigatório`;
      }
      if (control.errors['email']) {
        return 'Email inválido';
      }
      if (control.errors['minlength']) {
        return `${this.obterNomeCampo(campo)} deve ter pelo menos ${control.errors['minlength'].requiredLength} caracteres`;
      }
      if (control.errors['pattern']) {
        return 'URL inválida (deve começar com http:// ou https://)';
      }
    }
    return '';
  }

  private obterNomeCampo(campo: string): string {
    const nomes: { [key: string]: string } = {
      nome: 'Nome',
      email: 'Email',
      telefone: 'Telefone',
      whatsapp: 'WhatsApp',
      dataNascimento: 'Data de Nascimento',
      avatarUrl: 'URL do Avatar'
    };
    return nomes[campo] || campo;
  }

  campoInvalido(campo: string): boolean {
    const control = this.formulario.get(campo);
    return !!(control?.invalid && control.touched);
  }
}

