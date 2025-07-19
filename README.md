# 🚀 Micro-Framework Web Node.js

Um micro-framework leve e flexível para construir APIs RESTful com Node.js, utilizando o módulo `http` nativo.

## ✨ Funcionalidades

- **Roteamento Simples:** Defina rotas para diferentes métodos HTTP (GET, POST, PATCH, PUT, DELETE).
- **Extração de Parâmetros:** Suporte para parâmetros de URL (ex: `/users/:id`).
- **Análise de Corpo de Requisição:** Lida com a leitura do corpo de requisições POST/PATCH/PUT.
- **Códigos de Status e Métodos HTTP:** Utiliza enums para maior clareza e segurança de tipo.
- **Estrutura Modular:** Componentes separados para roteamento, análise de requisições e servidor.

## 💻 Tecnologias e Padrões

Este projeto utiliza as seguintes tecnologias e padrões:

### Tecnologias

<img src="https://raw.githubusercontent.com/material-extensions/vscode-material-icon-theme/refs/heads/main/icons/nodejs.svg" width="40" height="40" />
<img src="https://raw.githubusercontent.com/material-extensions/vscode-material-icon-theme/refs/heads/main/icons/jest.svg" width="40" height="40" />
 <img src="https://raw.githubusercontent.com/material-extensions/vscode-material-icon-theme/refs/heads/main/icons/eslint.svg" width="40" height="40" />
 <img src="https://raw.githubusercontent.com/material-extensions/vscode-material-icon-theme/refs/heads/main/icons/prettier.svg" width="40" height="40" />

- **Node.js**: Plataforma de execução JavaScript no lado do servidor.
- **Jest**: Framework de testes JavaScript.
- **ESLint**: Ferramenta de linting para identificar e reportar padrões problemáticos em código JavaScript.
- **Prettier**: Ferramenta de formatação de código para garantir um estilo consistente.

### Padrões e Conceitos

- **Micro-Framework:** Uma abordagem minimalista para construção de frameworks, focando apenas nas funcionalidades essenciais.
- **API RESTful:** Arquitetura para APIs que utiliza princípios REST (Representational State Transfer), como recursos, métodos HTTP e comunicação stateless.
- **Roteamento (Routing):** Padrão para direcionar requisições HTTP para o código apropriado com base na URL e no método HTTP.
- **Análise de Requisições (Request Parsing):** Processamento do corpo e dos parâmetros das requisições HTTP.
- **Enums (Enumerations):** Utilização de objetos congelados para representar conjuntos fixos de valores (como status HTTP e métodos HTTP), melhorando a legibilidade e a segurança de tipo.
- **Modularização:** Organização do código em módulos separados (`server`, `url-matcher`, `request-parser`, `http-status`, `http-methods`) para promover a reutilização e a manutenibilidade.

## 🛠️ Instalação

Para configurar o projeto localmente, siga os passos abaixo:

1.  Instale as dependências:
    ```bash
    npm install
    ```

## 🚀 Uso

Para iniciar o servidor de desenvolvimento:

```bash
node src/index.js
```

O servidor estará rodando em `http://localhost:3000` (ou na porta configurada em `src/index.js`).

### Exemplo de Rotas (configuradas em `src/index.js`)

- **GET /test-get**
- **POST /test-post**
- **PATCH /test-patch/:id**

## 🧪 Testes

O projeto utiliza [Jest](https://jestjs.io/) para testes unitários.

Para rodar todos os testes:

```bash
npm test
```

Para rodar os testes e gerar um relatório de cobertura:

```bash
npm test -- --coverage
```

## 🧹 Linting e Formatação

O projeto utiliza [ESLint](https://eslint.org/) para linting e [Prettier](https://prettier.io/) para formatação de código.

Para verificar o código com o linter:

```bash
npm run lint
```

Para formatar o código automaticamente:

```bash
npm run format
```
