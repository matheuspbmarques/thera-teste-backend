# thera-teste-backend

## Requisitos
#### Iniciar o Projeto sem Docker;
- [Node](https://nodejs.org/en);
- [Docker](https://www.docker.com/) ou [PostgreSQL](https://www.postgresql.org/).
#### Iniciar o Projecto com Docker:
- [Docker](https://www.docker.com/).

## Configuração
Antes de tudo, renomeie `.env.example` para `.env`. Dentro do arquivo (agora) `.env`, você pode configurar:
- O usuário do banco de dados através da variável `POSTGRES_USER`;
- A senha do usuário do banco de dados através da variável `POSTGRES_PASSWORD`;
- O nome da base de dados através da variável `POSTGRES_DB`.
- A conexão do [Prisma](https://www.prisma.io/) com o banco de dados através da variável `DATABASE_URL`;

#### Atenção:
As variáveis do banco de dados (`POSTGRES_USER`, `POSTGRES_PASSWORD` e `POSTGRES_DB`) estão sendo usadas dentro da variável de ambiente `DATABASE_URL`, citadas com a inicial $ (dolar). Alterando as variáveis do banco de dados a não precisa configurar variável `DATABASE_URL`.

#### Saiba mais:
- [Sobre URL de conexão Prisma para PostgreSQL.](https://www.prisma.io/docs/orm/reference/connection-urls#postgresql)

## Iniciar o Projeto sem Docker

Tendo o [Node](https://nodejs.org/en) instalado, vamos precisar de um banco de dados postgreSQL. Você pode instalar o banco de dados [PostgreSQL](https://www.postgresql.org/) na sua máquina. Caso ainda não tenha o [PostgreSQL](https://www.postgresql.org/) na sua máquina, [clique aqui](https://www.postgresql.org/download/) para ir para a página de download.

_Lembre-se de configurar o seu arquivo .env com as variáveis do banco de dados para tudo ocorrer corretamente_

Caso queira usar um container [Docker](https://www.docker.com/) de banco de dados [PostgreSQL](https://www.postgresql.org/download/), você pode usar o seguinte comando:

```bash
docker run --name postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=postgres -p 5432:5432 -d postgres
```
_Como você pode ver, as variáveis para o container Docker são as mesmas do arquivo `.env`. Os mesmo valores que você informar neste comando, devem ser no seu arquivo `.env`._

## Iniciar o Projeto com Docker

Com o [Docker](https://www.docker.com/) já instalado em sua máquina, agora basta rodar o seguinte comando:

```bash
docker compose up -d
```

Com o projeto iniciado, acesse http://localhost:3000/api para ver a documentação e assim poder testar todas as rotas.

## Escolhas

- [Prisma:](https://docs.nestjs.com/recipes/prisma) para substituir a camada Repositories do projeto e agilizar no processo de desenvolvimento
- [class-validator](https://github.com/typestack/class-validator): para validar os dados da requisição usando classes com decorators determinadas pelo class-validaro.