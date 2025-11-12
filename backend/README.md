# Backend - Sistema de Agendamento de Consultas Médicas

API REST desenvolvida em Node.js com TypeScript, NestJS, TypeORM e PostgreSQL para gerenciamento de agendamentos de consultas médicas.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Banco de Dados](#banco-de-dados)
- [Executando o Projeto](#executando-o-projeto)
  - [Com Docker (Recomendado)](#com-docker-recomendado)
  - [Sem Docker (Desenvolvimento Local)](#sem-docker-desenvolvimento-local)
- [Endpoints da API](#endpoints-da-api)
- [Estrutura do Projeto](#estrutura-do-projeto)

## 🎯 Sobre o Projeto

Sistema de agendamento de consultas médicas que permite:

- **Autenticação de usuários**: Cadastro e login com JWT
- **Gerenciamento de médicos**: CRUD completo com especialidades
- **Gerenciamento de agendas**: Criação e controle de horários disponíveis por médico
- **Agendamento de consultas**: Criação e listagem de consultas futuras
- **Validações**: Verificação de horários disponíveis e conflitos

## 🛠 Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Linguagem de programação
- **NestJS** - Framework Node.js progressivo
- **TypeORM** - ORM para TypeScript e JavaScript
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação via tokens
- **bcrypt** - Criptografia de senhas
- **class-validator** - Validação de DTOs
- **class-transformer** - Transformação de objetos
- **CORS** - Controle de acesso cross-origin

## 🏗 Arquitetura

O projeto segue a arquitetura modular do NestJS:

```
Controllers → Services → TypeORM Entities → PostgreSQL
```

- **Controllers**: Recebem requisições HTTP, validam DTOs e retornam respostas
- **Services**: Contêm a lógica de negócio e validações
- **Entities (TypeORM)**: Representam as tabelas do banco de dados
- **DTOs**: Objetos de transferência de dados com validação automática
- **Modules**: Organizam a aplicação em módulos funcionais
- **Database**: TypeORM gerencia a conexão e queries com PostgreSQL

## 📦 Pré-requisitos

### Para executar com Docker (Recomendado):
- Docker instalado
- Docker Compose instalado

### Para executar localmente:
- Node.js (versão 18 ou superior)
- npm ou yarn
- PostgreSQL
- Git

## 🚀 Instalação

1. Clone o repositório (se ainda não tiver feito):
```bash
git clone <url-do-repositorio>
cd Desafio-Intmed/backend
```

2. Instale as dependências:
```bash
npm install
```

## ⚙️ Configuração

1. Crie um arquivo `.env` na raiz do projeto `backend`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=1234
DB_NAME=postgres
JWT_SECRET=seu_secret_key_aqui
```

**Nota**: Para produção, use uma chave JWT segura e forte.

## 🗄 Banco de Dados

### Tabelas do Sistema

O sistema utiliza as seguintes tabelas:
- `especialidade` - Especialidades médicas
- `medico` - Dados dos médicos
- `agenda` - Agendas e horários disponíveis
- `consulta` - Consultas agendadas
- `usuario` - Usuários do sistema

### Migrações do Banco de Dados

O projeto utiliza TypeORM para gerenciar o banco de dados. As tabelas já existentes (criadas anteriormente) são utilizadas diretamente.

**Scripts disponíveis:**
- `npm run migration:generate` - Gera uma nova migração baseada nas entities
- `npm run migration:run` - Executa migrações pendentes
- `npm run migration:revert` - Reverte a última migração

**Nota**: O TypeORM está configurado com `synchronize: false` para usar as tabelas existentes. Em desenvolvimento, você pode habilitar `synchronize: true` no `app.module.ts` para sincronização automática.

## ▶️ Executando o Projeto

### Com Docker (Recomendado)

Esta é a forma mais simples e recomendada de executar o projeto, pois configura automaticamente o PostgreSQL e o backend.

#### Opção 1: Usando Docker Compose (Recomendado)

Na **raiz do projeto** (não dentro da pasta backend), execute:

```bash
docker-compose up -d
```

Isso irá:
- Criar e iniciar o container do PostgreSQL
- Construir a imagem do backend
- Executar as migrações automaticamente
- Iniciar o servidor backend

O backend estará disponível em `http://localhost:3000`

#### Opção 2: Usando Scripts do package.json

No diretório `backend`, você pode usar os scripts Docker:

```bash
# Iniciar todos os serviços (postgres + backend)
npm run docker:up

# Ver logs do backend
npm run docker:logs

# Parar todos os serviços
npm run docker:down

# Reiniciar apenas o backend
npm run docker:restart
```

#### Opção 3: Build Manual da Imagem

```bash
cd backend

# Construir a imagem
npm run docker:build

# Executar o container (requer PostgreSQL rodando separadamente)
npm run docker:run
```

#### Gerenciando os Containers

```bash
# Ver status dos containers
docker-compose ps

# Ver logs de todos os serviços
docker-compose logs -f

# Ver logs apenas do backend
docker-compose logs -f backend

# Parar todos os serviços
docker-compose down

# Parar e remover volumes (apaga dados do banco)
docker-compose down -v

# Reconstruir a imagem do backend após mudanças
docker-compose up -d --build backend
```

#### Variáveis de Ambiente com Docker

Crie um arquivo `.env` na **raiz do projeto** (não na pasta backend) para personalizar as configurações:

```env
DB_USER=postgres
DB_PASSWORD=1234
DB_NAME=postgres
DB_PORT=5432
BACKEND_PORT=3000
JWT_SECRET=seu-secret-key-aqui
NODE_ENV=production
```

**Importante**: No Docker, o `DB_HOST` é automaticamente configurado como `postgres` (nome do serviço no docker-compose), não `localhost`.

### Sem Docker (Desenvolvimento Local)

#### Pré-requisitos
- PostgreSQL instalado e rodando localmente
- Node.js e npm instalados

#### Passos

1. **Configure o banco de dados**:
   - Crie um banco de dados PostgreSQL
   - Configure as variáveis de ambiente no arquivo `.env` (veja seção [Configuração](#⚙️-configuração))

2. **Execute as migrações**:
```bash
npm run migrate:latest
```

3. **Modo Desenvolvimento**:
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

4. **Modo Produção**:
```bash
# Compile o TypeScript
npm run build

# Execute o servidor
npm start
```

## 📡 Endpoints da API

Base URL: `http://localhost:3000`

### 🔐 Autenticação (`/auth`)

#### POST `/auth/cadastro`
Cadastra um novo usuário.

**Body:**
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "senha123"
}
```

**Resposta (201):**
```json
{
  "message": "Usuário cadastrado com sucesso!",
  "usuario": { "id": 1, "nome": "João Silva", "email": "joao@email.com" }
}
```

#### POST `/auth/login`
Realiza login e retorna token JWT.

**Body:**
```json
{
  "email": "joao@email.com",
  "senha": "senha123"
}
```

**Resposta (200):**
```json
{
  "message": "Login realizado com sucesso!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": { "id": 1, "nome": "João Silva", "email": "joao@email.com" }
}
```

### 👨‍⚕️ Médicos (`/medicos`)

#### GET `/medicos`
Lista todos os médicos com suas especialidades.

**Resposta (200):**
```json
[
  {
    "id": 1,
    "nome": "Dr. João Silva",
    "crm": "12345",
    "email": "joao@medico.com",
    "especialidade": {
      "id": 1,
      "nome": "Cardiologia"
    }
  }
]
```

#### POST `/medicos`
Cria um novo médico.

**Body:**
```json
{
  "nome": "Dr. João Silva",
  "crm": "12345",
  "email": "joao@medico.com",
  "especialidade_id": 1
}
```

**Resposta (201):**
```json
{
  "id": 1,
  "message": "Médico criado com sucesso"
}
```

#### DELETE `/medicos/:id`
Exclui um médico.

**Resposta (200):**
```json
{
  "message": "Médico excluído com sucesso"
}
```

#### GET `/medicos/especialidades`
Lista todas as especialidades disponíveis.

**Resposta (200):**
```json
{
  "message": "Especialidades listadas com sucesso",
  "data": [
    { "id": 1, "nome": "Cardiologia" },
    { "id": 2, "nome": "Dermatologia" }
  ]
}
```

#### POST `/medicos/especialidades`
Cria uma nova especialidade.

**Body:**
```json
{
  "nome": "Cardiologia"
}
```

**Validações:**
- Nome é obrigatório
- Nome deve ter no máximo 100 caracteres
- Nome deve ser único

**Resposta (201):**
```json
{
  "id": 1,
  "message": "Especialidade criada com sucesso"
}
```

**Erro (409):**
```json
{
  "statusCode": 409,
  "message": "Especialidade já cadastrada!"
}
```

#### DELETE `/medicos/especialidades/:id`
Exclui uma especialidade.

**Validações:**
- Especialidade não pode ter médicos cadastrados

**Resposta (200):**
```json
{
  "message": "Especialidade excluída com sucesso"
}
```

**Erro (404):**
```json
{
  "statusCode": 404,
  "message": "Especialidade não encontrada!"
}
```

**Erro (409):**
```json
{
  "statusCode": 409,
  "message": "Não é possível excluir uma especialidade que possui médicos cadastrados!"
}
```

#### GET `/medicos/especialidades/:id`
Lista médicos de uma especialidade específica.

**Resposta (200):**
```json
{
  "message": "Medicos listados com sucesso",
  "data": [
    {
      "id": 1,
      "nome": "Dr. João Silva",
      "crm": "12345",
      "email": "joao@medico.com"
    }
  ]
}
```

### 📅 Agendas (`/agendas`)

#### GET `/agendas`
Lista todas as agendas.

**Resposta (200):**
```json
[
  {
    "id": 1,
    "medico_id": 1,
    "dia": "2024-01-15",
    "horarios": ["08:00", "09:00", "10:00"]
  }
]
```

#### POST `/agendas`
Cria uma nova agenda para um médico.

**Body:**
```json
{
  "medico_id": 1,
  "dia": "2024-01-15",
  "horarios": ["08:00", "09:00", "10:00", "14:00", "15:00"]
}
```

**Resposta (201):**
```json
{
  "id": 1,
  "message": "Agenda criada com sucesso"
}
```

#### DELETE `/agendas/:id`
Exclui uma agenda.

**Resposta (200):**
```json
{
  "message": "Agenda excluída com sucesso"
}
```

#### GET `/agendas/medicos/:id`
Lista agendas de um médico específico.

**Resposta (200):**
```json
{
  "message": "Agendas listadas com sucesso",
  "data": [
    {
      "id": 1,
      "medico_id": 1,
      "dia": "2024-01-15",
      "horarios": ["08:00", "09:00", "10:00"]
    }
  ]
}
```

#### GET `/agendas/:id`
Busca uma agenda por ID.

**Resposta (200):**
```json
{
  "message": "Agendas listadas com sucesso",
  "data": {
    "id": 1,
    "medico_id": 1,
    "dia": "2024-01-15",
    "horarios": ["08:00", "09:00", "10:00"]
  }
}
```

### 🏥 Consultas (`/consultas`)

#### GET `/consultas`
Lista todas as consultas futuras (apenas consultas com data/horário no futuro).

**Resposta (200):**
```json
[
  {
    "id": 1,
    "dia": "15/01/2024",
    "horario": "08:00",
    "data_agendamento": "2024-01-10T10:30:00Z",
    "medico": {
      "id": 1,
      "crm": "12345",
      "nome": "Dr. João Silva",
      "email": "joao@medico.com",
      "especialidade": {
        "id": 1,
        "nome": "Cardiologia"
      }
    }
  }
]
```

#### POST `/consultas`
Cria uma nova consulta.

**Body:**
```json
{
  "dia": "2024-01-15",
  "horario": "08:00",
  "medico_id": 1
}
```

**Validações:**
- O médico deve existir
- O horário deve estar disponível na agenda do médico
- Não pode haver conflito com outra consulta

**Resposta (201):**
```json
{
  "data": [1],
  "message": "Consulta criada com sucesso"
}
```

#### DELETE `/consultas/:id`
Exclui uma consulta.

**Resposta (200):**
```json
{
  "message": "Consulta excluída com sucesso"
}
```

## 📁 Estrutura do Projeto

```
backend/
├── src/
│   ├── agenda/                  # Módulo de Agendas
│   │   ├── dto/
│   │   │   └── create-agenda.dto.ts
│   │   ├── agenda.controller.ts
│   │   ├── agenda.module.ts
│   │   └── agenda.service.ts
│   ├── auth/                    # Módulo de Autenticação
│   │   ├── dto/
│   │   │   ├── cadastro.dto.ts
│   │   │   └── login.dto.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   └── auth.service.ts
│   ├── consulta/                # Módulo de Consultas
│   │   ├── dto/
│   │   │   └── create-consulta.dto.ts
│   │   ├── interceptors/
│   │   │   └── consulta-format.interceptor.ts
│   │   ├── consulta.controller.ts
│   │   ├── consulta.module.ts
│   │   └── consulta.service.ts
│   ├── entities/                # Entities do TypeORM
│   │   ├── agenda.entity.ts
│   │   ├── consulta.entity.ts
│   │   ├── especialidade.entity.ts
│   │   ├── medico.entity.ts
│   │   └── usuario.entity.ts
│   ├── medico/                  # Módulo de Médicos
│   │   ├── dto/
│   │   │   └── create-medico.dto.ts
│   │   ├── medico.controller.ts
│   │   ├── medico.module.ts
│   │   └── medico.service.ts
│   ├── app.module.ts            # Módulo principal
│   └── main.ts                 # Arquivo de bootstrap
├── Dockerfile                   # Configuração Docker para o backend
├── .dockerignore                # Arquivos ignorados no build Docker
├── nest-cli.json                # Configuração do NestJS CLI
├── package.json
├── tsconfig.json
└── README.md
```

**Nota**: O arquivo `docker-compose.yml` está na raiz do projeto (não dentro da pasta backend).

## 🔒 Segurança

- Senhas são criptografadas usando bcrypt antes de serem armazenadas
- Autenticação via JWT (JSON Web Tokens) usando `@nestjs/jwt`
- Validações automáticas de entrada em todos os endpoints via `class-validator`
- DTOs (Data Transfer Objects) garantem validação de tipos e formatos
- CORS configurado para permitir requisições do frontend
- Validação global habilitada com `ValidationPipe` do NestJS

## 📝 Notas Importantes

- As consultas listadas são apenas as futuras (data/horário no futuro)
- Ao excluir um médico, todas suas agendas e consultas são excluídas automaticamente (CASCADE via TypeORM)
- Os horários nas agendas são armazenados como array de strings (TEXT[] no PostgreSQL)
- O sistema valida se o horário está disponível antes de criar uma consulta
- Todas as validações de entrada são feitas automaticamente via `class-validator` nos DTOs
- O TypeORM utiliza as tabelas existentes no banco (synchronize: false)
- A aplicação segue o padrão modular do NestJS, facilitando manutenção e testes

## 🐛 Troubleshooting

### Erro de conexão com o banco

**Com Docker:**
- Verifique se os containers estão rodando: `docker-compose ps`
- Verifique os logs do PostgreSQL: `docker-compose logs postgres`
- Certifique-se de que o backend está aguardando o PostgreSQL ficar saudável (healthcheck)
- Verifique se o `DB_HOST` está configurado como `postgres` (nome do serviço) e não `localhost`

**Sem Docker:**
- Verifique se o PostgreSQL está rodando localmente
- Confirme as credenciais no arquivo `.env`
- Verifique se o `DB_HOST` está configurado como `localhost`

### Erro ao conectar com TypeORM

**Com Docker:**
- Verifique se o PostgreSQL está rodando: `docker-compose ps`
- Verifique os logs do backend: `docker-compose logs backend`
- Confirme que as variáveis de ambiente estão corretas

**Sem Docker:**
- Certifique-se de que o banco de dados existe
- Verifique se as credenciais no `.env` estão corretas
- Verifique se as entities correspondem às tabelas existentes

### Porta 3000 já em uso

**Com Docker:**
- Altere a variável `BACKEND_PORT` no arquivo `.env` ou docker-compose.yml
- Pare o container que está usando a porta: `docker-compose down`

**Sem Docker:**
- Altere a porta no arquivo `main.ts` ou pare o processo que está usando a porta

### Problemas com Docker

**Container não inicia:**
- Verifique os logs: `docker-compose logs backend`
- Reconstrua a imagem: `docker-compose up -d --build backend`
- Verifique se há erros de sintaxe no código

**Imagem não é construída:**
- Verifique se o Dockerfile está no diretório correto (`backend/Dockerfile`)
- Limpe o cache do Docker: `docker system prune -a`
- Tente construir manualmente: `cd backend && npm run docker:build`

**Backend não consegue conectar ao banco:**
- Verifique se ambos os serviços estão na mesma rede Docker
- Confirme que o `DB_HOST` está como `postgres` (não `localhost`)
- Verifique se o PostgreSQL está saudável: `docker-compose ps`

## 📄 Licença

Este projeto é parte do Desafio Intmed.

