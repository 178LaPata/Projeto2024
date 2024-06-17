import json

def add_ids_to_list(data_list, start_id=1):
    for i, item in enumerate(data_list, start_id):
        item['_id'] = i
    return data_list

# Function to add IDs to aulas, anuncios and docentes
def add_ids(data):
    # Add IDs to aulas
    if 'aulas' in data:
        data['aulas'] = add_ids_to_list(data['aulas'], 1)
    
    # Add IDs to anuncios
    if 'anuncios' in data:
        data['anuncios'] = add_ids_to_list(data['anuncios'], 1)
    
    # Add IDs to docentes
    if 'docentes' in data:
        data['docentes'] = add_ids_to_list(data['docentes'], 1)
    
    return data

# Load JSON data
with open('metaENGWEB2024.json', 'r', encoding='utf-8') as file1, \
     open('metaATP2023.json', 'r', encoding='utf-8') as file2, \
     open('metaRPCW2024.json', 'r', encoding='utf-8') as file3:
    data1 = json.load(file1)
    data2 = json.load(file2)
    data3 = json.load(file3)

# Add announcements to each course
anuncios_engweb = [
    {
        "titulo": "Teste",
        "conteudo": "Caros alunos, o teste consiste no desenvolvimento de uma aplicação web composta por vários serviços. Será realizado no vosso computador pessoal. Não se esqueçam de garantir bateria ou extensão elétrica, a sala não tem tomadas elétricas para todos. Até logo jcr",
        "dataAnuncio": "16/05/2024 11:53"
    },
    {
        "titulo": "Aula da próxima semana: Dockers para todos os gostos",
        "conteudo": "Caros alunos, estou a preparar um crash course sobre containers Docker para vos ser lecionado na próxima segunda na aula teórica. Vai haver para todos os gostos: dockers com websites estáticos, a serem criados com diferentes web servers, com websites com javascript embebido, dockers para as Apps que temos feito nas aulas, dockers para acesso e consumo de API externas, dockers para Apps em Python, etc... Se conseguir, apresento também um docker com uma App web tipo sandbox para os compiladores que estamos a fazer em PL. Como sempre, a aula começa às 14h. Quem estiver a 0 neste assunto, se perder o início da aula vai ter dificuldades em acompanhar. Tragam os portáteis com as baterias carregadas para poderem acompanhar, vai ser uma aula computacionalmente intensiva. Bom fim de semana jcr",
        "dataAnuncio": "27/04/2024 18:08"
    }
]

anuncios_rpcw = [
    {
        "titulo": "Teste de avaliação",
        "conteudo": "Caros alunos para que não restem dúvidas a ninguém: 1. O teste será realizado na hora da aula, 16h, na sala da aula; 2. O teste será realizado no vosso computador pessoal, tragam as baterias carregadas e extensões e triplas suficientes... 3. Durante o teste podem consultar o que quiserem, só não podem conversar entre vocês; 4. No fim, o resultado deverá ser depositado no GIT de acordo com as instruções no teste. Até amanhã jcr",
        "dataAnuncio": "20/05/2024 19:14"
    },
    {
        "titulo": "Rescaldo da aula de ontem",
        "conteudo": "No seguimento da aula de ontem fiz o seguinte: 1. Desenvolvi uma nova aplicação em flask que chama a API de dados e apresenta a informação numa página web; 2. Disponibilizei esta App em Conteúdo: interface.zip; 3. Disponibilizei a versão final da App realizada na aula. Coloquem os dois serviços a funcionar e testem. Têm aqui uma receita base para coisas interessantes jcr",
        "dataAnuncio": "08/05/2024 20:30"
    }
]

anuncios_atp = [
    {
        "titulo": "Teste ATP",
        "conteudo": "Caros alunos de ATP, o teste consiste em resolver problemas de algoritmos...",
        "dataAnuncio": "16/05/2024 11:53"
    },
    {
        "titulo": "Aula da próxima semana: Algoritmos Avançados",
        "conteudo": "Caros alunos de ATP, na próxima semana vamos abordar algoritmos avançados...",
        "dataAnuncio": "27/04/2024 18:08"
    }
]

data1['anuncios'] = anuncios_engweb
data2['anuncios'] = anuncios_atp
data3['anuncios'] = anuncios_rpcw

# Add IDs to data1, data2, data3
data1 = add_ids(data1)
data2 = add_ids(data2)
data3 = add_ids(data3)

# Combine data without the extra "data" key
data1['_id'] = 1
data2['_id'] = 2
data3['_id'] = 3

combined_data = [data1, data2, data3]

# Save the combined data to a new JSON file
with open('datasetFinal.json', 'w', encoding='utf-8') as outfile:
    json.dump(combined_data, outfile, ensure_ascii=False, indent=4)

print("Data has been successfully updated and saved to 'datasetFinal.json'")
