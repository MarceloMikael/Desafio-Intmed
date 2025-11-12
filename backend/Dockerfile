# Estágio 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY tsconfig.json ./
COPY nest-cli.json ./

# Instalar dependências (incluindo devDependencies para compilar)
RUN npm ci

# Copiar código fonte
COPY src ./src

# Compilar TypeScript com NestJS
RUN npm run build

# Estágio 2: Produção
FROM node:18-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY tsconfig.json ./

# Instalar apenas dependências de produção
RUN npm ci --only=production

# Copiar arquivos compilados
COPY --from=builder /app/dist ./dist

# Expor porta
EXPOSE 3000

# Comando para iniciar o servidor
COPY wait-for-postgres.sh /wait-for-postgres.sh
RUN chmod +x /wait-for-postgres.sh
CMD ["/wait-for-postgres.sh", "postgres", "npm", "run", "start:prod"]

