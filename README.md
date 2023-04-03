## Visão Geral do Projeto
Trata-se de um desafio de estágio, seguindo as diretrizes e orientações da empresa bgc foi feito um webscrapper com algumas outras funcionalidades relacionadas a banco de dados serverless.

Utilizando a api Gateway é possível fazer chamadas a lambda function como uma api rest, desse modo o webscrapper pode realizar a raspagem da tela e recolher os dados dos 6 primeiros produtos da pagina de mais vendidos da Amazon. Após isso esses dados são armazenados em uma tabela DynamoDB com seus respectivos timestamps.

### Tecnologias utilizadas
- **Nodejs**
- **Serverless framework**  


- **Teste**
- **Puppeter** 
- **AWS DynamoDB**
- **AWS Lambda Functions**
- **AWS Api Gateway**

## Arquitetura do Projeto
<img src = "https://imgur.com/s6lFq8Z.png" width="800px">

## Ambiente de Desenvolvimento
**É preciso ter node instalado**

Inicie o progrma node
```
npm init
```

Instale as dependências
```
npm install 
```


Instale o serverless framework
```
npm install serverless -g 
```

Faça o deploy do projeto
```
serverless deploy
```

Utilize seu programa de requisição favorito com a url, retornada pelo deploy, com metodo get. Ou, chame a função manualmente por cli
```
serverless invoke -f webscrapper -l
```


