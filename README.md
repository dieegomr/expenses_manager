## Gerenciamento de Desepesas

## Descrição

Gerenciamento de despesas é uma aplicação construída com NestJS e Typescript que permite usuários a criarem conta e então gerenciar suas despesas. A aplicação usa Nodemailer para enviar um email, notificando o usuário quando uma despesa é cadastrada.

## Recursos

- Autenticação do usuário com JWT
- Registro de despesas com envio de e-mail
- Operações CRUD para despesas
- Validação de entrada com class-validator

## Instalação

1. Clone o repositório: https://github.com/dieegomr/expenses_manager.git

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

## Endpoints

_Observação: Todos os endpoints de despesas, precisam ter um usuário logado para realizar a ação_

_Resumo:_
`POST /user` criar um usuário
`POST /auth` login do usuário cadastrado
`POST /expenses` criar uma despesa
`GET /expenses` acessar todas as despesas do usuário logado
`GET /expenses/:id` acessar uma despesa em específico
`PATCH /expenses/:id` atualizar uma despesa em específico
`DELETE /expenses/:id` deletar uma despesa em específico

#### <span style="color:orange">POST</span> Criar usuário

```bash
/user
```

_Corpo da requisição:_
name (string): Nome do usuário.
email (string): Email do usuário.
password (string): Senha do usuário.

_Exemplo:_

```bash
{
    "name": "User Name",
    "email": "user@email.com",
    "password": "password"
}
```

#### <span style="color:orange">POST</span> Login

```bash
/auth
```

_Corpo da requisição:_
email (string): Email do usuário.
password (string): Senha do usuário.

_Exemplo:_

```bash
{
    "email": "user@email.com",
    "password": "password"
}
```

#### <span style="color:orange">POST</span> Criar despesa

```bash
/expenses
```

_Cabeçalho da requisição:_
'Authorization' (string): The JWT access token

_Corpo da requisição:_
description (string, max length: 191): Descrição da despesa.
date (string): Data da despesa, AAAA-MM-DD.
amount (number): Valor da despesa em reais.

Obs.: A descrição não pode ter mais do que 191 caracteres e o valor da despesa não pode ser negativo

_Exemplo:_

```bash
{
    "description": "Descrição da despesa",
    "date": "AAAA-MM-DD",
    "amount": 120
}
```

#### <span style="color:green">GET</span> Acessar todas as despesas do usuário logado

```bash
/expenses
```

_Cabeçalho da requisição:_
'Authorization' (string): The JWT access token

#### <span style="color:green">GET</span> Acessar despesa em específico

```bash
/expenses/:id
```

_Cabeçalho da requisição:_
'Authorization' (string): The JWT access token

_Parâmetro da requisição:_
'id' (string): O ID da despesa a ser selecionada

#### PATCH Editar despesa

```bash
/expenses/:id
```

_Cabeçalho da requisição:_
'Authorization' (string): The JWT access token

_Corpo da requisição:_
description (optional, string, max length: 191): Descrição da despesa.
date (optional, string): Data da despesa, AAAA-MM-DD.
amount (optional, number): Valor da despesa em reais.

_Parâmetro da requisição:_
'id' (string): O ID da despesa a ser selecionada

Obs1.: Os campos são opcionais, devendo ser adicionado somente os que serão atualizados
Obs2.: A descrição não pode ter mais do que 191 caracteres e o valor da despesa não pode ser negativo

_Exemplo:_

```bash
{
    "description": "Descrição da despesa",
}
```

#### <span style="color:red">DELETE</span> Deletar despesa existente

```bash
/expenses/:id
```

_Cabeçalho da requisição:_
'Authorization' (string): The JWT access token

_Parâmetro da requisição:_
'id' (string): O ID da despesa a ser deletada

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
