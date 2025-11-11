# Desafio Intmed

## Configuração do Banco de Dados PostgreSQL com Docker

Este projeto utiliza Docker Compose para gerenciar o banco de dados PostgreSQL.

### Pré-requisitos

- Docker instalado
- Docker Compose instalado

### Configuração

1. Crie um arquivo `.env` na raiz do projeto (opcional, os valores padrão serão usados se não existir):

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=1234
DB_NAME=postgres
```

### Como usar

#### Iniciar o banco de dados

```bash
docker-compose up -d
```

#### Parar o banco de dados

```bash
docker-compose down
```

#### Parar e remover os volumes (apaga os dados)

```bash
docker-compose down -v
```

#### Ver os logs do banco

```bash
docker-compose logs -f postgres
```

#### Executar migrações do Knex

Após iniciar o banco de dados, execute as migrações:

```bash
cd backend
npm run migrate:latest
```

### Estrutura

- `docker-compose.yml` - Configuração do serviço PostgreSQL
- `.env` - Variáveis de ambiente (criar manualmente se necessário)

### Volumes

Os dados do PostgreSQL são persistidos em um volume Docker chamado `postgres_data`, garantindo que os dados não sejam perdidos ao parar o container.

