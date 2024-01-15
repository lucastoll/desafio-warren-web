# Desafio Warren Web

Esse repositório consiste na implementação de uma dashboard de transações vindo de uma API, de forma que é possível buscar e filtrar as transações ao mesmo tempo, além de visualizar elas individualmente por meio de um modal.

![image](https://github.com/lucastoll/desafio-warren-web/assets/86172649/3d49bbe4-636b-43fd-9379-0a927d235f5b)
![image](https://github.com/lucastoll/desafio-warren-web/assets/86172649/80f7813d-b676-4ede-a579-9e19bcbeb890)


# Clean Architecture 🗂

Um dos grandes aprendizados do desafio é implementar o conceito de arquitetura de software que se baseia em manter a aplicação com camadas de responsabilidades bem separadas, o clean architecture 

Para isso, foi feito uma aplicação "core" dentro do repositório, essa aplicação contém todas as regras de negócio e lógicas do que envolve a aplicação, o motivo da existência da aplicação em si, a organização foi feita nos diretório da seguinte maneira:

**/entities** <br>
Diretório que guarda as entidades das classes que são a razão (core) da aplicação, no caso, a transação, aqui esta definida a classe e tipagem da transação bem como algumas regras básicas relacionadas a ela e suas propriedades

**/gateways** <br>
Diretório que guarda a parte onde a aplicação faz conexão com agentes externos como APIs e bancos de dados

**/usecases** <br>
Diretório que guarda as ações que os usuários vão fazer dentro da aplicação, aqui são utilizadas as entities e gateways para implementar as lógicas de negócio 

Assim, tanto as classes da aplicação, a conexão com o banco e as lógicas da aplicação são feitas separadamente o que facilita a manuntenção, **testabilidade e escabilidade**. O front-end da aplicação é independente de tudo isso que esta no core, ele apenas importa o que precisa e usa.

# Como rodar a aplicação ⚙
#### Core
```
cd .\core
pnpm install
pnpm run dev
```
#### Front-end
```
cd .\interface
pnpm install
pnpm run dev
```
Como a aplicação é separada em dois diretórios diferentes, elas se comunicam através de um processo de build, caso uma alteração seja feita no core, é necessário rodar o comando ```pnpm run build``` isso vai criar uma pasta com o nome de **coreDist** no front-end, com o código atualizado e compilado do core. 

# Tecnologias utilizadas 💻

#### Core
- Typescript
- Axios 
- Json Server (Fake API)
- Jest (testes unitários)
- ESLint & Prettier (formatação)

#### Front-end
- Vue.js
- TypeScript
- Less (CSS)
- ESLint & Prettier (formatação)
- Cypress (Testes E2E)
