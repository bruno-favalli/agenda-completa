# Agenda de Contatos - Angular

Uma aplicação completa de agenda de contatos desenvolvida em Angular 20 com todas as funcionalidades CRUD, filtros dinâmicos e ordenação alfabética.

## 🚀 Funcionalidades

- ✅ **CRUD Completo**: Criar, visualizar, editar e excluir contatos
- ✅ **Filtro Dinâmico**: Pesquisar contatos por qualquer campo (nome, email, telefone, WhatsApp, data de nascimento)
- ✅ **Ordenação Alfabética**: Ordenar contatos de A-Z ou Z-A
- ✅ **Interface Responsiva**: Design adaptável para desktop e mobile
- ✅ **Banco de Dados Simulado**: JSON Server para simular uma API REST
- ✅ **Validação de Formulários**: Validação completa dos campos de entrada
- ✅ **Notificações**: Feedback visual para ações do usuário
- ✅ **Máscaras de Entrada**: Formatação automática para telefone
- ✅ **Avatars**: Suporte a imagens de perfil com fallback para iniciais

## 📋 Campos do Contato

```typescript
interface Contato {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  avatarUrl?: string;
  dataNascimento?: string;
  whatsapp?: string;
}
```

## 🛠️ Tecnologias Utilizadas

- **Angular 20.1.0** - Framework principal
- **Angular Material 20.1.3** - Componentes UI
- **Bootstrap 5.3.7** - Framework CSS
- **ngx-mask 20.0.0** - Máscaras de entrada
- **ngx-toastr 19.0.0** - Notificações
- **JSON Server 1.0.0-beta.3** - API simulada
- **Font Awesome 6.4.0** - Ícones
- **TypeScript 5.8.2** - Linguagem de programação

## 📦 Instalação e Execução


### Passos para executar


1. **Instalar dependências**
   ```bash
   npm install
   ```

3. **Executar a aplicação**
  
   # Opção 1: Executar JSON Server e Angular simultaneamente
   npm run dev
   
   # Opção 2: Executar separadamente
   # Terminal 1 - JSON Server
   npm run json-server
   
   # Terminal 2 - Angular
   npm start
   ```

4. **Acessar a aplicação**
   - Front: http://localhost:4200
   - API (JSON Server): http://localhost:3001

## 📁 Estrutura do Projeto

```
agenda-contatos/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── lista-contatos/          # Lista e filtros
│   │   │   ├── detalhes-contato/        # Visualização detalhada
│   │   │   └── formulario-contato/      # Criação e edição
│   │   ├── models/
│   │   │   └── contato.interface.ts     # Interface do contato
│   │   ├── services/
│   │   │   └── contato.service.ts       # Serviço de dados
│   │   ├── app.config.ts                # Configuração da app
│   │   ├── app.routes.ts                # Rotas
│   │   └── app.ts                       # Componente principal
│   ├── styles.scss                      # Estilos globais
│   └── index.html                       # HTML principal
├── db.json                              # Banco de dados simulado
├── package.json                         # Dependências e scripts
└── README.md                            # Este arquivo
```

## 🎯 Como Usar

### 1. Lista de Contatos
- Visualize todos os contatos em cards organizados
- Use a barra de pesquisa para filtrar por qualquer campo
- Clique no botão de ordenação para alternar entre A-Z e Z-A
- Acesse ações rápidas: Ver, Editar, Excluir

### 2. Adicionar Novo Contato
- Clique em "Novo Contato" na navegação ou na lista
- Preencha os campos obrigatórios (nome, email, telefone)
- Campos opcionais: WhatsApp, data de nascimento, URL do avatar
- O formulário inclui validação em tempo real

### 3. Visualizar Detalhes
- Clique em "Ver" em qualquer contato
- Visualize todas as informações organizadas
- Acesse ações rápidas: Ligar, WhatsApp, Email
- Botões para editar ou excluir o contato

### 4. Editar Contato
- Clique em "Editar" na lista ou nos detalhes
- Formulário pré-preenchido com dados atuais
- Mesmas validações da criação

### 5. Filtros e Pesquisa
- Digite na barra de pesquisa para filtrar em tempo real
- A pesquisa funciona em todos os campos:
  - Nome
  - Email
  - Telefone
  - WhatsApp
  - Data de nascimento
- Clique no "X" para limpar o filtro


## 📊 Dados de Exemplo

O projeto inclui 5 contatos de exemplo no arquivo `db.json` para demonstração das funcionalidades.

## 🎨 Design e UX

- **Interface Moderna**: Design limpo e profissional
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Feedback Visual**: Notificações para todas as ações
- **Navegação Intuitiva**: Menu claro e breadcrumbs
- **Estados de Loading**: Indicadores visuais durante carregamento
- **Validação em Tempo Real**: Feedback imediato nos formulários

## 🔒 Validações

- **Nome**: Obrigatório, mínimo 2 caracteres
- **Email**: Obrigatório, formato válido
- **Telefone**: Obrigatório, com máscara (11) 99999-9999
- **WhatsApp**: Opcional, com máscara
- **Data de Nascimento**: Opcional, formato de data
- **Avatar URL**: Opcional, deve ser uma URL válida (http/https)

## 🚀 Próximos Passos

Para expandir a aplicação, consideramos:

- Implementar autenticação de usuários
- Adicionar categorias/grupos de contatos
- Implementar backup/sincronização na nuvem
- Adicionar importação/exportação de contatos
- Implementar notificações de aniversário
- Adicionar histórico de interações



**Desenvolvido usando Angular 20**

