# Frontend - Sistema de Agendamento de Consultas

Frontend desenvolvido em React com Vite para o sistema de agendamento de consultas médicas.

## 🚀 Tecnologias

- **React 19** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool e dev server
- **React Router DOM** - Roteamento de páginas
- **Axios** - Cliente HTTP para requisições à API
- **Tailwind CSS** - Framework CSS utilitário

## 📋 Pré-requisitos

- Node.js 18+ e npm
- Backend rodando (ver README principal do projeto)

## 🛠️ Instalação

1. Instale as dependências:

```bash
npm install
```

## 🏃 Executando em Desenvolvimento

1. Configure a variável de ambiente (opcional):

Crie um arquivo `.env` na raiz do frontend:

```env
VITE_API_URL=http://localhost:3000
```

Se não especificar, o padrão será `http://localhost:3000`.

2. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O frontend estará disponível em `http://localhost:5173` (porta padrão do Vite).

## 🐳 Executando com Docker

O frontend está configurado para rodar no Docker através do `docker-compose.yml` na raiz do projeto.

### Build e execução

Na raiz do projeto, execute:

```bash
docker-compose up -d
```

Isso irá construir e iniciar todos os serviços (postgres, backend e frontend).

O frontend estará disponível em `http://localhost` (porta 80).

### Variáveis de ambiente para Docker

No arquivo `.env` na raiz do projeto, você pode configurar:

```env
VITE_API_URL=http://backend:3000
FRONTEND_PORT=80
```

**Nota:** No Docker, use `http://backend:3000` como URL da API, pois os containers se comunicam pela rede interna do Docker. Para desenvolvimento local, use `http://localhost:3000`.

## 📦 Build para Produção

Para gerar o build de produção:

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

Para visualizar o build localmente:

```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Botao.jsx
│   │   ├── Header.jsx
│   │   ├── NovaConsulta.jsx
│   │   └── TabelaConsultas.jsx
│   ├── pages/               # Páginas da aplicação
│   │   ├── LoginPage.jsx
│   │   ├── CadastroPage.jsx
│   │   └── ConsultasPage.jsx
│   ├── config/              # Configurações
│   │   └── api.js           # Configuração do Axios e interceptors
│   ├── assets/              # Imagens e recursos estáticos
│   ├── App.jsx              # Componente principal
│   ├── main.jsx             # Ponto de entrada
│   └── index.css            # Estilos globais
├── public/                  # Arquivos públicos
├── Dockerfile               # Configuração Docker
├── nginx.conf               # Configuração Nginx para produção
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🔐 Autenticação

O frontend utiliza autenticação JWT:

- **Login:** O token JWT é armazenado no `localStorage` após login bem-sucedido
- **Interceptors:** O Axios automaticamente adiciona o token `Bearer` em todas as requisições
- **Proteção de rotas:** Rotas protegidas verificam a existência do token antes de permitir acesso
- **Logout:** Remove o token e redireciona para a página de login

### Fluxo de Autenticação

1. Usuário faz login em `/login`
2. Token JWT é recebido e armazenado no `localStorage`
3. Token é automaticamente incluído em todas as requisições via interceptor
4. Se o token expirar ou for inválido (401), o usuário é redirecionado para login

## 🎨 Funcionalidades

### Páginas

- **Login** (`/login`): Autenticação de usuários
- **Cadastro** (`/cadastro`): Registro de novos usuários
- **Consultas** (`/consultas`): Listagem e gerenciamento de consultas

### Componentes

- **Header**: Cabeçalho com informações do usuário e botão de logout
- **TabelaConsultas**: Exibe lista de consultas agendadas
- **NovaConsulta**: Modal para criar nova consulta
- **Botao**: Componente de botão reutilizável

## 🔧 Configuração da API

A URL da API é configurada através da variável de ambiente `VITE_API_URL`:

- **Desenvolvimento local:** `http://localhost:3000`
- **Docker:** `http://backend:3000` (comunicação interna entre containers)

O arquivo `src/config/api.js` centraliza a configuração do Axios e inclui:

- Interceptor para adicionar token de autenticação
- Interceptor para tratar erros 401 (não autorizado)
- Configuração base da URL da API

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza build de produção localmente
- `npm run lint` - Executa o linter

## 🐛 Tratamento de Erros

- **Login/Cadastro:** Exibe mensagens de erro do backend
- **Requisições:** Erros 401 redirecionam automaticamente para login
- **Consultas:** Mensagens de erro são exibidas via alertas

## 🔄 Estado da Aplicação

O estado de autenticação é gerenciado através de:

- `localStorage` para persistência do token e dados do usuário
- Estado React no componente `App.jsx` para controle de rotas
- Verificação automática do token ao carregar a aplicação

## 📱 Responsividade

A interface é responsiva e utiliza Tailwind CSS para estilização, garantindo uma boa experiência em diferentes tamanhos de tela.

## 🚨 Troubleshooting

### Erro de CORS

Se encontrar erros de CORS, verifique se o backend está configurado para aceitar requisições do frontend. O backend deve ter CORS habilitado.

### Token não está sendo enviado

Verifique se o token está sendo armazenado no `localStorage` após o login. Abra o DevTools (F12) > Application > Local Storage.

### API não responde

- Verifique se o backend está rodando
- Confirme a URL da API no arquivo `.env` ou `src/config/api.js`
- No Docker, use `http://backend:3000` em vez de `http://localhost:3000`

## 📄 Licença

Este projeto faz parte do Desafio Intmed.
