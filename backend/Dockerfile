# Estágio 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY tsconfig.json ./
COPY knexfile.ts ./

# Instalar dependências (incluindo devDependencies para compilar)
RUN npm ci

# Copiar código fonte
COPY src ./src

# Compilar TypeScript
RUN npm run build

# Estágio 2: Produção
FROM node:18-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY knexfile.ts ./
COPY tsconfig.json ./

# Instalar todas as dependências (precisamos de ts-node e typescript para migrações)
RUN npm ci

# Copiar arquivos compilados e fonte (para migrações)
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/migrations ./src/migrations

# Expor porta
EXPOSE 3000

# Comando para iniciar o servidor (migrações são executadas pelo docker-compose)
CMD ["npm", "start"]

