# thera-teste-backend

## Necessário
- Banco de Dados PostgreSQL;
- [NodeJS](https://nodejs.org/en);

## Configuração do Projeto

Primeiro instale dependências do projeto:

```bash
npm install
```

Inicie a estrutura do banco de dados

```bash
npx prisma migrate dev --name dev
```

## Compilar e Iniciar Projeto

```bash
# Desenvolvimento
npm run start

# Modo Assistido
npm run start:dev

# Modo de Produção
npm run start:prod
```