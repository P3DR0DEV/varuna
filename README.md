# Varuna - IT Manager

A funcionalidade core da aplicação é o armazenamento e manipulação de dados relacionados a TI de uma pequena/média organização.

# Sobre o projeto

Varuna é um projeto que tem como principal função a gerência de TI de pequenas de médias empresas, onde o tecnico poderá cadastrar as suas necessidades, maquinas, e outros tipos de equipamentos. 
Este é um projeto ambicioso em que estou tentando aplicar os conceitos que aprendi durante a minha carreira sendo um Help Desk, Analista de Sistemas e Redes, e desenvolvedor. Em um futuro um pouco distante busco aperfeiçoar o projeto para que ele também sirva como um sistema de monitoramento de aplicações e servidores da empresa, no qual o tecnico poderá cadastrar o que ele gostaria de monitorar, utilizando o protocolo snmp, algo próximo ao que o Zabbix faz. 
Também quero fazer com que este projeto seja instânciado via cmd e com uma CLI intuitiva.

O projeto atualmente conta com o Crud básico dos equipamentos que normalmente compõe o dia-a-dia de um tecnico de TI, rotas documentadas pelo Swagger (/docs), Clean Arch e TDD.

# Tecnologias utilizadas
## Back end
- TypeScript
- Fastify
- Prisma
- PostgreSQL
- Clean Arch
- TDD


# Como executar o projeto

## Back end
Pré-requisitos: Node LTS e Docker

```bash
# clonar repositório
git clone https://github.com/p3dr0dev/varuna

# entrar na pasta do projeto back end
cd server

# baixar os pacotes necessários
yarn i
npm i
pnpm i (minha preferência)

# executar a instância do docker e migrations
docker compose up -d
pnpm db:migrate

# executar o projeto
pnpm dev

```

# Autor

[Pedro Henrique Campos Mendes](https://www.linkedin.com/in/pedro-cmendes)
