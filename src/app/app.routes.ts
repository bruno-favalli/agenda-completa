import { Routes } from '@angular/router';
import { ListaContatosComponent } from './components/lista-contatos/lista-contatos';
import { DetalhesContatoComponent } from './components/detalhes-contato/detalhes-contato';
import { FormularioContatoComponent } from './components/formulario-contato/formulario-contato';

export const routes: Routes = [
  { path: '', redirectTo: '/contatos', pathMatch: 'full' },
  { path: 'contatos', component: ListaContatosComponent },
  { path: 'contatos/novo', component: FormularioContatoComponent },
  { path: 'contatos/:id', component: DetalhesContatoComponent },
  { path: 'contatos/:id/editar', component: FormularioContatoComponent },
  { path: '**', redirectTo: '/contatos' }
];

