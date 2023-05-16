# ![logo](https://github.com/DanJusto/Shopper-Teste/blob/main/front-shopper/src/assets/logo-white.svg)
  
  
### Aplicação para um teste da Shopper.

## 📜 Sumário
1. [Detalhes do projeto](https://github.com/DanJusto/Shopper-Teste#1--detalhes-do-projeto)
2. [Tecnologias usadas](https://github.com/DanJusto/Shopper-Teste#2--tecnologias-usadas)
3. [Para rodar o projeto](https://github.com/DanJusto/Shopper-Teste#3--para-rodar-o-projeto)
4. [Documentação](https://github.com/DanJusto/Shopper-Teste#4--documenta%C3%A7%C3%A3o)
5. [Visual](https://github.com/DanJusto/Shopper-Teste#5--visual)
6. [Autor](https://github.com/DanJusto/Shopper-Teste#5--autor)

## 1. 🔍 Detalhes do projeto
O projeto foi realizado como um teste para uma vaga de Dev Junior na Shopper. A proposta era construir uma ferramenta que permita atualizar os produtos de forma massiva e com recursos adicionais para evitar erros que possam prejudicar o negócio.  
  
#### Cenário:
Regras de negócio: 
* Atualização por meio de arquivo .csv com código do produto e novo preço;
* Impossibilidade de reajuste de valor para preço abaixo do custo;
* Impossibilidade de reajuste maior ou menor do que 10% do preço atual do produto;
* Alguns produtos são vendidos em pacotes, ou seja, um produto que é composto por um ou
mais produtos em quantidades diferentes. Neste caso, ao reajustar o preço de um produto ou pacote, deve-se realizar também o reajuste do contexto (o preço da soma dos componentes é igual ao preço do pacote), validando as regras já citadas.  
  
Outros requisitos:
* Sistema deve permitir o carregamento de um arquivo .csv;
* Deve possuir um botão que leva à validação;
* Ao final da validação o sistema deve exibir as informações dos produtos que foram enviados (Codigo, Nome, Preço Atual, Novo Preço), bem como a regra quebrada, caso não tenha passado em alguma validação;
* Se todas as validações tiverem sucesso, deve possibilitar um botão para atualizar os preços;
* Ao clicar em atualizar, deve retornar para tela inicial, possibilitando um carregamento de outro arquivo.
 

## 2. 💻 Tecnologias usadas
<div align="center">

Languages, Frameworks & Librarys:   
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![StyledComponents](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JSON](https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white)

Database:  
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)

IDE:  
![VSCode](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)

</div>

## 3. 🔌 Para rodar o projeto

O projeto foi construído de forma separada, sendo que o front-end consome uma API. Assim o sistema roda em dois servidores, um para o front e outro para a API.  
  
### Front-End
Para rodar o front-end em ambiente de desenvolvimento, se faz necessário ingressar na pasta "front-shopper" pelo terminal e executar os seguintes passos:  
  
1. Instale as dependências necessárias (relacionadas no package.json):

    ```
    npm install
    ```
2. Rode a aplicação em ambiente de desenvolvimento:

    ```
    npm run dev
    ```
3. Utilize a url citada no terminal após o último comando em algum navegador (de preferência Google Chrome).  
  
### Back-End
Para rodar a API em ambiente de desenvolvimento, se faz necessário ingressar na pasta "API" pelo terminal e executar os seguintes passos:  
  
1. Instale as dependências necessárias para rodar a API (relacionadas no package.json):

    ```
    npm install
    ```
2. A API utiliza o MySQL como banco de dados, então se faz necessário que você tenha-o instalado em sua máquina.
3. Com ele instalado, crie um database e preencha o arquivo ".env.example" com o host, user_db, password_db e database_name. Em seguida, retire o ".example", deixando apenas ".env" como nome do arquivo.
4. Rode a aplicação em ambiente de desenvolvimento:

    ```
    npm run dev
    ```
5. O comando já irá rodar a migration e criar as tabelas e alimentá-las com os dados disponibilizados para o teste.
6. Você poderá testar a API utilizando o front-end, bastando rodar os dois ao mesmo tempo. Caso queira rodar a API sem a interface, você precisará de uma ferramenta de teste de requisições como o [Insomnia](https://insomnia.rest/), devendo seguir as orientações da documentação.
7. Caso queira apagar os dados após a utilização e começar de novo, basta apagar as tabelas pelo mysql e rodar a aplicação novamente que a migration vai criar as tabelas e alimentá-las com os dados iniciais do teste.  
8. Utilize localhost:3333 e siga a documentação abaixo para utilizar a API.

## 4. 📋 Documentação
### Endpoints

**File** <br/>
[`POST /file/`](#post-file) - Salvar o arquivo .csv na pasta do projeto.
<br/><br/>

**Products** <br/>
[`GET /products/`](#get-products) Busca de todos produtos <br/>
[`PUT /products/`](#put-products) Atualização de dados de um produto
<br/><br/>

###
#### POST file

**Request**

Arquivo .csv com dois atributos. Exemplo:

|**product_code**|**new_price**|
| :------------ | :------------ |
|16|20.15|
|18|5.29|
|23|9.57|

<br />

**Response**

Sucesso  
```no body returned for response```
```status: 201```
<br /><br /> 
Erro comum

```json
{
    "mensagem": "Falha ao receber o arquivo. Verifique se o arquivo é um .csv",
    "status": 400
}
```
<br/>

###
#### GET products

**Request**

Com o arquivo já salvo pela requisição anterior, não é necessário enviar nenhum conteúdo.

<br />

**Response**

Sucesso
```json
{
    "data": {
    	"listProducts": [
	      {
		"code": 16,
		"name": "AZEITE  PORTUGUES  EXTRA VIRGEM GALLO 500ML",
		"currentPrice": "20.49",
		"newPrice": "25.50",
		"validation": "Proibido: valor de reajuste é maior ou menor que 10% do preço atual"
	      },
	      {
		"code": 22,
		"name": "ENERGETICO  RED BULL ENERGY DRINK SEM ACUCAR 250ML",
		"currentPrice": "7.49",
		"newPrice": "6.72",
		"validation": "Proibido: valor é menor que o custo"
	      },
	      {
		"code": 26,
		"name": "ROLO DE PAPEL ALUMUNIO WYDA 30CMX7,5M",
		"currentPrice": "5.79",
		"newPrice": "5.24",
		"validation": "OK!"
	      }
	 ],
	 "valid": false
    },
    "status": 200
}
```

<br /> 

Erro comum

```json
{
    "mensagem": "Arquivo .csv não possui nenhum registro",
    "status": 400
}
```
<br/>

###
#### PUT products

**Request**

Com o arquivo já salvo e todas as validações já realizadas com retorno de "OK!", não é necessário enviar nenhum conteúdo.

<br />

**Response**

Sucesso  
```no body returned for response```
```status: 200```
<br/>

## 5. 🎬 Visual
<div align="center">

* Tela inicial  
![screen](https://github.com/DanJusto/Shopper-Teste/blob/main/screenshots/tela-inicial.png)  
  
* Tela de validação fracassada  
![screen](https://github.com/DanJusto/Shopper-Teste/blob/main/screenshots/validacao-bloqueio.png)  
  
* Tela de sucesso da validação  
![screen](https://github.com/DanJusto/Shopper-Teste/blob/main/screenshots/validacao-ok.png)  
  

</div>

## 6. 👨‍💻 Autor
Criado por Daniel Justo  
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/danielmjusto/)
[![github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/DanJusto)  
  
Obrigado pela visita!
