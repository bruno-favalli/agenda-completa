import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContatoService } from '../../services/contato.service';
import { Contato } from '../../models/contato.interface';

@Component({
  selector: 'app-detalhes-contato',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalhes-contato.html',
  styleUrl: './detalhes-contato.scss'
})
export class DetalhesContatoComponent implements OnInit {
  contato: Contato | null = null;
  carregando = true;
  contatoId: string;

  constructor(
    private contatoService: ContatoService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.contatoId = this.route.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.carregarContato();
  }

  private carregarContato(): void {
    this.contatoService.obterContatoPorId(this.contatoId).subscribe({
      next: (contato) => {
        this.contato = contato;
        this.carregando = false;
      },
      error: (error) => {
        console.error('Erro ao carregar contato:', error);
        this.toastr.error('Contato não encontrado');
        this.router.navigate(['/contatos']);
        this.carregando = false;
      }
    });
  }

  excluirContato(): void {
    if (this.contato && confirm(`Tem certeza que deseja excluir o contato "${this.contato.nome}"?`)) {
      this.contatoService.excluirContato(this.contato.id).subscribe({
        next: () => {
          this.toastr.success(`Contato "${this.contato!.nome}" excluído com sucesso!`);
          this.router.navigate(['/contatos']);
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

  formatarData(data: string): string {
    if (!data) return 'Não informado';
    
    const dataObj = new Date(data + 'T00:00:00');
    return dataObj.toLocaleDateString('pt-BR');
  }

  calcularIdade(dataNascimento: string): number | null {
    if (!dataNascimento) return null;
    
    const hoje = new Date();
    const nascimento = new Date(dataNascimento + 'T00:00:00');
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();
    
    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    
    return idade;
  }

  obterIniciais(nome: string): string {
    return nome.split(' ')
      .map(parte => parte.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  abrirWhatsApp(): void {
    if (this.contato?.whatsapp) {
      const numeroLimpo = this.contato.whatsapp.replace(/\D/g, '');
      const url = `https://wa.me/55${numeroLimpo}`;
      window.open(url, '_blank');
    }
  }

  ligarPara(): void {
    if (this.contato?.telefone) {
      const numeroLimpo = this.contato.telefone.replace(/\D/g, '');
      window.location.href = `tel:+55${numeroLimpo}`;
    }
  }

  enviarEmail(): void {
    if (this.contato?.email) {
      window.location.href = `mailto:${this.contato.email}`;
    }
  }
}

