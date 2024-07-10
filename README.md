# SENAI

## Descrição

Este é um projeto completo que inclui um backend desenvolvido com Prisma e um frontend. Este documento fornece
instruções  para configurar e executar ambos os lados da aplicação.

## Pré-requisitos

- Node.js (versão 20)
- NPM ou Yarn
- Clone o repositório do projeto:
   ```bash
   git clone https://github.com/andreifms/senai.git
  ```

## Configuração do Backend

1. Instalar dependências:
   ```bash
   npm install
   ```
2. Configurar variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```
3. Configurar o prisma:
   ```bash
npx prisma migrate dev
npx prisma generate
```
4. Executar o servidor:
   ```bash
   npm start
   ```

## Configuração do Frontend

1Instalar dependências:
   ```bash
   npm install
   ```

2. Configurar variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```
