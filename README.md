# Projeto Trybe-Futebol-Clube

# Sobre
Este projeto foi desenvolvido durante o Módulo 3 - Back-End do curso de Desenvolvimento Web da Trybe.

Esta aplicação consiste em um site informativo sobre partidas e classificações de futebol. Foi desenvolvida uma API dockerizada e integrada ao front-end através do docker-compose, cuja modelagem de dados foi feita através do Sequelize, utilizando classes e interfaces em Typescript.

A API utiliza a arquitetura MSC (model-service-controller) e permite criar, atualizar e exibir partidas. Algumas rotas possuem validações de dados, incluindo criação e validação de Token através de login. O banco de dados utilizado foi o MySQL, tendo sido explorado o relacionamento entre as tabelas teams e matches.

Também foram desenvolvidos testes de integração utilizando Mocha e sinon-chai.

Arquivos desenvolvidos por mim:
- No diretório backend: todos do diretório src + Dockerfie.
- No diretório front-end: Dockerfile.
Os demais foram desenvolvidos pelo time da Trybe.

## Descrição dos endpoints:
<table>
  <thead>
    <tr>
      <th>Método HTTP</th>
      <th>Endpoint</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GET</td>
      <td>/teams</td>
      <td>Lista todos os times cadastrados e suas respectivas ids</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/teams/:id</td>
      <td>Lista o time cuja id foi dada como parâmetro</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/login</td>
      <td>Realiza o login do usuário validando seu email e senha</td>
    </tr>
      <td>GET</td>
      <td>/login/role</td>
      <td>Retorna o tipo do usuário logado após validação do token</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/matches</td>
      <td>Lista todas partidas cadastradas.Permite filtrar por partidas em andamento ou finalizadas</td>
    </tr>
    <tr>
      <td>PATCH</td>
      <td>/matches/:id/finish</td>
      <td>Altera o status de uma partida em andamento para finalizada</td>
    </tr>
    <tr>
      <td>PATCH</td>
      <td>/matches/:id</td>
      <td>Altera o placar de uma partida em andamento</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/matches</td>
      <td>Cadastra uma nova partida em andamento</td>
    </tr>
    </tr>
      <td>GET</td>
      <td>/leaderboard/home</td>
      <td>Lista informações de desempenho de times de casa</td>
    </tr>
    </tr>
      <td>GET</td>
      <td>/leaderboard/away</td>
      <td>Lista informações de desempenho de times de fora</td>
    </tr>
  </tbody>
</table>

## Tecnologias usadas

>Back-End:
Docker, docker-compose, SQL, Node.js, Sequelize, JWT, Typescript.

## Instalando Dependências
- É necessário possuir o docker instalado em sua máquina

1. Clone este repositório em su máquina, e em seguida suba o container:
```bash
npm run compose:up
``` 
- Serão inicializados três containers (db, app_backend e app_frontend)

2. Para executar os scripts do back-end:
```bash
docker exec -it app_backend sh
``` 
- As credencias de acesso ao banco de dados estão definidas no arquivo docker-compose.yml.

3. Agora instale as dependências dentro do container:
```bash
npm install
``` 
