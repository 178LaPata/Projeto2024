# Relatorio

## Grupo
| Número | Nome             |
| -------- | ------- |
| 95454  | Lara Ferreira    |
| 95191  | João Alvim       |
| 97396  | Pedro Dantas     |

# Introdução

Para a cadeira de Engenharia Web foi-nos proposta a realização de um trabalho prático para o qual pudemos escolher entre 5 temas, sendo que acabamos por escolher o tema 5: "Gerador de Websites para UC". Para isto, foram estipulados vários objetivos a ter em conta como, por exemplo, a implementação de uma funcionalidade capaz de criar novas UCs, edição das diferentes UCs, diferentes níveis de acesso na plataforma, etc.


## API de Dados

A definição da API de dados teve que ser dividida em duas partes:

1. Análise e Tratamento do Dataset
2. Definição do Modelo da BD e da API

### 1. Análise e Tratamento do Dataset 

Para esta tarefa, e visto que haviam alterações ao dataset que achamos necessárias e essenciais, criamos um script em python no qual começamos por definir funções capazes de adicionar IDs às diferentes aulas, docentes e anúncios. Visto que os datasets iniciais não tinham informações referentes a estes anúncios, acabamos também por adicionar alguns manualmente para cada um dos datasets referentes às diferentes UCs. Após estes serem adicionados, fazemos então as atribuições dos IDs referidas anteriormente. No final, fazemos a junção dos 3 datasets iniciais num único dataset final, passando este a estar pronto para ser usado.


### 2. Definição do Modelo da BD e da API

No nosso modelo da Base de Dados e API, decidimos separar as operações relacionadas a ficheiros das restantes. Posto isto, os modelos da base de dados terão os seguintes formatos:

### 2.1 Modelo UC

```js
const ucSchema = new mongoose.Schema({
    _id: Number,
    sigla: String,
    titulo: String,
    docentes: [{
        _id: Number,
        nome: String,
        foto: String,
        categoria: String,
        filiacao: String,
        email: String,
        webpage: String
    }],
    horario: {
        teoricas: [String],
        praticas: [String]
    },
    avaliacao: [String],
    datas: {
        teste: String,
        exame: String,
        projeto: String
    },
    anuncios: [{
        _id: Number,
        titulo: String,
        conteudo: String,
        dataAnuncio: String
    }],
    aulas: [{
        _id: Number,
        tipo: String,
        data: String,
        sumario: [String]
    }]
}, { versionKey: false });
```

### 2.2 Modelo Ficheiros
```js
const FileSchema = new mongoose.Schema({
    uc: String,
    aula: String,
    date: String,
    mimetype: String,
    name: String,
    original: String,
    size: Number
},{ versionKey: false });
```

No que toca à API, o utilizador poderá:

- Obter uma lista de todas as UCs
- Obter uma determinada UC através do seu ID
- Obter as aulas, exames, informações, anúncios ou equipa docente de uma UC com base no ID fornecido
- Criar uma nova UC com os dados fornecidos no corpo da solicitação
- Remover uma UC com base no ID fornecido
- Atualizar os dados de uma UC com base no ID fornecido
- Obter a lista de todos os ficheiros de uma UC

Tal como referido anteriormente, certas funcionalidades estão restritas a utilizadores com nivéis de acesso superiores. Posto isto, apenas os admins terão acesso a tudo o que foi listado anteriormente.

# API 
Separei a api dos ficheiros para outro ficheiro
* Get  '/files' -> meta informação dos ficheiros
* Post '/files' -> upload de um ficheiro, tem um campo 'aula' opciona
* Delete '/files/:uc/:aula/:id' -> apaga um determinado ficheiro
    - os campos aula e id são opcionais, permite apagar tudo de uma aula ou tudo de uma uc

* Put  '/files/:uc/:aula/:name' -> altera os metadados de um ficheiro
    - os campos aula e nome são opcionais, no body também é enviado um ficheiro opcional, isto serve para, por
      exemplo, mudar o número da aula, ou nome do ficheiro

* Get  '/files/contents/:uc/:aula/:name' -> descarregar o conteudo de um determinado ficheiro de uma aula

* GET '/files/zip/:uc/:aula' -> descarrega um zip com todos os ficheiros de uma aula
    - o campo aula é opcional, se não for fornecido irá zippar todos os ficheiros de uma uc

* GET '/ucs'           -> Lista todas as Unidades Curriculares (UCs).
* GET '/ucs/'          -> Obtém uma UC específica com base no ID fornecido.
* GET '/ucs/:id/aulas' -> Obtém as aulas de uma UC específica com base no ID fornecido.
* GET '/ucs/:id/docentes' -> Obtém os docentes associados a uma UC específica com base no ID fornecido.
* GET '/ucs/:id/exames' -> Obtém os exames associados a uma UC específica com base no ID fornecido.
* GET '/ucs/:id/informacoes' -> Obtém as informações de uma UC específica com base no ID fornecido.
* GET '/ucs/:id/anuncios' -> Obtém os anúncios associados a uma UC específica com base no ID fornecido.
* POST '/ucs'       -> Cria uma nova UC com os dados fornecidos no corpo da solicitação.
* DELETE '/ucs/:id' -> Remove uma UC com base no ID fornecido.
* PUT '/ucs/:id'    -> Atualiza uma UC específica com base no ID fornecido, com os dados fornecidos no corpo da solicitação.


## Funcionalidades da plataforma 

Agora iremos explorar todas as funcionalidades implementadas no nosso trabalho.

### Criação, Remoção e Edição de UCs

Sendo a criação e remoção de UCs duas das funcionalidades mais importantes e existindo a possibilidade de potênciais erros causarem grandes danos na plataforma, serão apenas acessíveis pelos utilizadores com estatuto de Admin. Posto isto, a ecição poderá ser feita também pelos produtores, possibilitando então que estes alterem informações relevantes como método de avaliação, horários, entre outros.

### Upload e Download de ficheiros

Dada a natureza do projeto, e sendo esta uma plataforma criada para disponibilizar material e informações aos estudantes sobre as diferentes UCs, é essencial existir a possibilidade de fazer upload/download de ficheiros. Posto isto, o utilizador normal poderá fazer download de um determinado ficheiro, todos os ficheiros de uma determinada aula, ou todos os ficheiros da própria UC, sendo estas duas últimas opções disponibilizadas por forma de um ficheiro zip. O upload de ficheiros é então restrito a produtores/admins, sendo que não faz sentido nem existe um propósito para o utilizador comum, que serão maioritariamente (se não todos) alunos, ter acesso a esta funcionalidade.

### Consulta das diferentes informações de uma UC

Todos os utilizadores tem a possibilidade de consultar as diferentes informações relativas às UCs, como por exemplo método de avaliação, horários, anúncios, etc. Esta funcionalidade é também complementada pela anterior, sendo que os ficheiros fornecidos pelos docentes poderão ser encontrados na página "Aulas" onde poderá também ser disponibilizado um sumário de cada aula.



## Autenticação

Em relação à autenticação, recorremos ao jsonwebtoken para realizar todos os utilizadores, sendo que depois esse token é usado para obter dados da API via Interface. A Interface tem routes protegidas (por exemplo adicionar/editar UCs) sendo necessário estar Logged In para realizar estas ações.

A cada utilizador é também associado um nível de acesso (Utilizador, Produtor ou Admin), sendo que os Utilizadores podem consultar e descarregar recursos públicos, os Produtores podem executar todas as operações relacionadas a UCs das quais são produtores/autores e, finalmente, os Admins tem acesso a todas as operações em toda a plataforma.                                                                                                                                                                                                                                   
No nosso projeto optamos por não impor autenticação ao utilizador comum, sendo que, quando é selecionada a opção de entrar como aluno, é carregada a página inicial com as permissões de aluno. Quanto aos admins, existem 2 contas predefinidas, sendo que consideramos que não faria sentido permitir a criação de contas com estatuto admin a qualquer pessoa. Por fim, os produtores terão de se registar normalmente e, após isto, a aprovação da conta passa pelos admins que poderão aceitar ou não este registo. Isto porque, mais uma vez, consideramos que não faria sentido qualquer pessoa registar-se como docente sem qualquer tipo de supervisão.                                                                                                                             

# Conclusão                                                                                                                               
De forma sucinta, consideramos que, apesar de termos alcançado grande parte dos objetivos estipulados para este projeto, houveram definitivamente aspetos com margem para melhorar, por exemplo, a inexistência de filtros de pesquisa em qualquer das páginas criadas, o que seria uma grande mais valia neste tipo de website. Em relação ao que foi implementado na API, poderiamos também ter feito um melhor trabalho, por exemplo, em relação aos ficheiros, que acabaram por não ficar exatamente como pretendiamos. Posto isto, consideramos que os resultados obtidos foram positivos, apesar de, como dito anteriormente, haverem ainda alguns aspetos a melhorar.                                                                                                              