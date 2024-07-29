### RF Requisitos Funcionais

- [X] O sistema deve permitir o cadastro de departamentos
- [X] O sistema deve permitir o cadastro de usuários
- [X] O sistema deve permitir o cadastro de licenças (licença, usuários de licença)
  - [X] licença 
  - [X] usuario-licença
- [X] O sistema deve permitir o cadastro de contratos
  - [ ] Enviar arquivo para o servidor
- [X] O sistema deve permitir o cadastro de dispositivos (computador, impressora, dispositivos móveis)
  - [X] computador
  - [X] dispositivos móveis
  - [X] dispositivos genericos
  - [X] impressoras
- [X] O sistema deve permitir o cadastro de endereços de serviços
- [X] O sistema deve permitir o cadastro de estação de trabalho
- [X] O sistema deve permitir o cadastro de ocorrências
- [ ] O sistema deve permitir a liberação de certos endpoints (recursos) para departamentos selecionados
- [X] O sistema deve permitir o cadastro de contas de emails por departamento
- [ ] O sistema deve permitir o cadastro de contas de emails por usuário para que o sistema envie e-mail por ele

### RN Regras de negócios
- [ ] Os cadastros poderão ser registrados manualmente e/ou através de uma planilha de excel.
- [ ] O sistema deve avisar o/os administradores do sistema caso um contrato ou licença esteja perto do vencimento.
- [ ] O sistema deverá copiar o usuário na mensagem que será enviada por uma conta padrão do sistema.

### RNFs (Requisitos não-funcionais)

- [ ] A autenticação será via código de acesso e/ou magic link;
- [ ] O usuário deve ser identificado por um JWT (Json Web Token);
- [X] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL;


### TODO

- [ ] Implementar testes E2E
  - [X] User
  - [X] Computer
  - [ ] Contract
  - [X] Department
  - [X] Device
  - [X] Incident
  - [ ] License
  - [ ] Mobile
  - [ ] Printer
  - [X] Service
  - [ ] User-License
  - [ ] Workstation

- [X] Criar Servidor utilizando Fastify
  - [X] Crud
  - [ ] Monitoramento de servidores
  - [ ] Autenticação

- [ ] Melhorar respostas de erros


### Diagrama Relacional

<img src="../.github/Conceitual_1.png" alt="diagrama relacional" />