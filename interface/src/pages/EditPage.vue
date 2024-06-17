<template>
    <div class="flex min-h-screen">
        <Sidebar title="Editar" class="fixed left-0 top-0 h-full"/>
        <div class="flex-1 ml-96 p-10">
            <h1 class="text-2xl font-bold mb-5">Editar Anúncio</h1>
            <form @submit.prevent="handleSubmit">
                <!-- Campos comuns -->
                <div class="mb-5">
                    <label for="title" class="block text-sm font-medium text-gray-700">Título</label>
                    <input v-model="title" type="text" id="title" name="title" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
                </div>

                <!-- Campos condicionais baseados no parâmetro de rota -->
                <div v-if="type === 'anuncio' || type === 'aula'">
                    <div class="mb-5">
                        <label for="description" class="block text-sm font-medium text-gray-700">Descrição</label>
                        <textarea v-model="description" id="description" name="description" rows="3" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required></textarea>
                    </div>
                </div>
                <div v-if="type === 'anuncio'">
                    <div class="mb-5">
                        <label for="price" class="block text-sm font-medium text-gray-700">Preço</label>
                        <input v-model="price" type="number" id="price" name="price" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
                    </div>
                    <div class="mb-5">
                        <label for="image" class="block text-sm font-medium text-gray-700">Imagem</label>
                        <input type="file" id="image" name="image" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>
                </div>
                <!-- Adicione mais campos condicionais conforme necessário -->

                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Salvar</button>
            </form>
        </div>  
    </div>
</template>

<script>
import axios from 'axios'; // Certifique-se de ter o Axios instalado e importado
import Sidebar from '../components/Sidebar.vue';

export default {
    components: {
        Sidebar
    },
    data() {
        return {
            // Acessa o parâmetro de rota para definir o tipo
            type: this.$route.params.type,
            _id: null, // Adicione o _id aqui para ser usado na requisição PUT
            title: '',
            description: '',
            price: '',
            image: '',
            // Adicione os outros campos necessários para docentes, anuncios e aulas
        }
    },
    methods: {
        handleSubmit() {
            // Construa o objeto de dados baseado no tipo
            let data = {};
            switch (this.type) {
                case 'docente':
                    data = {
                        nome: this.title, // Assumindo que 'title' mapeia para 'nome' para simplificar
                        // Adicione os outros campos de docente aqui
                    };
                    break;
                case 'anuncio':
                    data = {
                        titulo: this.title,
                        conteudo: this.description,
                        // Adicione os outros campos de anuncio aqui
                    };
                    break;
                case 'aula':
                    data = {
                        tipo: this.title, // Assumindo que 'title' mapeia para 'tipo' para simplificar
                        // Adicione os outros campos de aula aqui
                    };
                    break;
            }

            // Realize a requisição PUT
            axios.put(`http://localhost:16000/ucs/${this._id}`, data)
                .then(response => {
                    console.log('Atualização bem-sucedida:', response.data);
                    // Trate o sucesso da requisição aqui (por exemplo, redirecionando o usuário)
                })
                .catch(error => {
                    console.error('Erro na atualização:', error);
                    // Trate o erro aqui
                });
        }
    }
}
</script>