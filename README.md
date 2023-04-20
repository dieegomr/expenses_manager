## Gerenciamento de Desepesas

## Descrição

Gerenciamento de despesas é uma aplicação construída com NestJS e Typescript que permite usuários a criarem conta e então gerenciar suas despesas. A aplicação usa Nodemailer para enviar um email, notificando o usuário quando uma despesa é cadastrada.

## Recursos

- Autenticação do usuário com JWT
- Registro de despesas com envio de e-mail
- Operações CRUD para despesas
- Validação de entrada com class-validator

## Instalação

1. Clone o repositório:

2. Instale as dependências:

```bash
$ npm install
```

3. Renomeie o arquivo '.env.example' para para '.env'

4. Atualize o arquivo '.env' com as informações do seu email provider.

5. Inicie o servidor:

```bash
# watch mode
$ npm run start:dev
```

## Testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Entre em contato

- Author - [Diego Mendes](https://www.linkedin.com/in/diego-mendes-rocha)
