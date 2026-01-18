# Varuna 🛠️

**Varuna** é uma API backend para **gerenciamento de ativos de TI** (equipamentos, responsáveis e histórico), voltada para pequenas e médias empresas.

O projeto foi desenvolvido com foco em **boas práticas de arquitetura, regras de negócio e escalabilidade**, simulando um sistema real utilizado em ambiente corporativo.

---

## 🧠 Visão Geral

A aplicação permite o controle centralizado de equipamentos de TI, facilitando a gestão, rastreabilidade e organização de ativos dentro da empresa.

O backend foi estruturado utilizando princípios de **Clean Architecture**, garantindo separação de responsabilidades, facilidade de manutenção e evolução do sistema.

---

## 🚀 Funcionalidades

- Cadastro, listagem, atualização e remoção de equipamentos
- Associação de equipamentos a responsáveis
- Validações de regras de negócio
- Documentação automática da API com Swagger
- Estrutura preparada para testes automatizados
- Arquitetura desacoplada e orientada a domínio

---

## 🏗️ Arquitetura

O projeto segue os princípios da **Clean Architecture**, com separação clara entre:

- **Domain**: regras de negócio e entidades
- **Use Cases**: lógica da aplicação
- **Infrastructure**: banco de dados, ORM e serviços externos
- **Interface (Controllers)**: camada HTTP e rotas

Essa abordagem facilita testes, manutenção e futuras mudanças tecnológicas.

---

## 🛠 Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **Fastify**
- **Prisma ORM**
- **PostgreSQL**
- **Swagger (OpenAPI)**
- **Docker** (ambiente de desenvolvimento)

---

## 📑 Documentação da API

Após iniciar o projeto, a documentação estará disponível em:
GET /docs

Através do Swagger é possível visualizar e testar todos os endpoints da API.

---

## ▶️ Como Executar o Projeto

### Pré-requisitos
- Node.js
- Docker e Docker Compose (opcional, recomendado)
- PostgreSQL

### Passos

```bash
# Clonar o repositório
git clone https://github.com/P3DR0DEV/varuna.git

# Acessar o projeto
cd varuna

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Executar as migrations
npx prisma migrate dev

# Iniciar a aplicação
npm run dev
```
## 🧪 Testes

O projeto foi estruturado para suportar testes automatizados, seguindo práticas de TDD.

```bash
npm run test
```
## 📄 Contexto

Este projeto foi desenvolvido com o objetivo de demonstrar habilidades em backend Node.js, incluindo:

modelagem de domínio

arquitetura limpa

APIs REST

boas práticas de código e organização

