# LojaVirtual
Deverá ser construído uma aplicação web e back para uma loja virtual fictícia;


# LojaVirtual

## Descrição do Projeto
### Back-end
Para satisfazer as regras solicitadas para a aplicação back end, foi feito em Java usado o Arquitetura API REST onde o Fremework Spring Boot possui diverças soluções que são:
* Spring Boot
* Spring-Jpa
* Spring-Web
* Swagger-ui
* Maven
* Mysql

### Front-end
Aplicação cliente para consumir o CRUD de produtos. Foram usadas as seguintes tecnologias:

* ReactJs
* React-Bootstrap
* WebPack
* Bootstrap 4
## Configuração e Execução

### Docker
Foi disponibilizado um arquivo docker-compose.yml contendo os conteiners necessários à execução, já configurados. Para executar a aplicação usando docker, basta executar o compose.

docker-compose up

O front-end será executado na porta 3000 (http://localhost:3000) e o back-end será executado na porta 8080 (http://localhost:8080).

### Execução Local
##### pre-requisito
    Criar um database chamada  (lojavirtual)
    Para o spring acessar a base segue o user e pass necessario.
        (spring.datasource.username=luiz).
        (spring.datasource.password=123456789).
    Endereço de acesso esperada para a base de dado (localhost:3306)

#### Front-end
Na pasta front, digite:

npm install

npm run start

O front-end será executado em (http://localhost:9000).

#### Back-end
Na pasta back, digite:

./mvnw clean spring-boot:run -Dspring-boot.run.profiles=local

O back-end será executado em http://localhost:8080.
