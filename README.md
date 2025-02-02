# findAfriendAPI

## Sobre o Projeto

A findAfriendAPI foi criada para usar princípios SOLID utilizando de design patterns como use-cases, repositórios, testes unitários, testes e2e, CI/CD. 

## 🛠️ Construído com:

* [Typescript](https://www.typescriptlang.org/) - A linguagem de programação usada
* [Fastify](https://fastify.dev/) - O framework web usado
* [Prisma](https://www.prisma.io/) - ORM utilizada
* [Postgresql](https://www.postgresql.org/) - Banco de dados usado
* [Vitest](https://vitest.dev/) - Plataforma de testing


## Requisitos Funcionais

- [x] Deve ser possível cadastrar um pet;
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade;
- [x] Deve ser possível filtrar pets por suas características;
- [x] Deve ser possível visualizar detalhes de um pet para adoção;
- [x] Deve ser possível se cadastrar como uma ORG;
- [x] Deve ser possível realizar login como uma ORG;

## Regras de negócio

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade;
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp;
- [x] Um pet deve estar ligado a uma ORG;
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp;
- [x] Todos os filtros, além da cidade, são opcionais;
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada;
