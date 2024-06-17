<template>
    <div class="flex min-h-screen">
        <Sidebar title="Adicionar" class="fixed left-0 top-0 h-full"/>
        <div class="flex-1 ml-96 p-10">
            <form @submit.prevent="handleSubmit">
                <div v-if="type === 'anuncio'">
                    <div class="mb-5">
                        <label for="title" class="block text-sm font-medium text-azul1">Título</label>
                        <textarea v-model="title" id="title" name="title" rows="3" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required></textarea>
                    </div>
                    <div class="mb-5">
                        <label for="description" class="block text-sm font-medium text-azul1">Conteúdo</label>
                        <textarea v-model="description" id="description" name="description" rows="3" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required></textarea>
                    </div>
                    <div class="mb-5">
                        <label for="date" class="block text-sm font-medium text-azul1">Data do Anúncio</label>
                        <input v-model="date" type="date" id="date" name="date" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
                    </div>
                </div>
                <div v-if="type === 'aula'">
                    <div class="mb-5">
                        <label for="aulaType" class="block text-sm font-medium text-azul1">Tipo de Aula</label>
                        <select v-model="aulaType" id="aulaType" name="aulaType" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
                            <option value="teorica">Teórica</option>
                            <option value="pratica">Prática</option>
                        </select>
                    </div>
                    <div class="mb-5">
                        <label for="date" class="block text-sm font-medium text-azul1">Data da Aula</label>
                        <input v-model="date" type="date" id="date" name="date" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
                    </div>
                    <div class="mb-5">
                        <label for="summary" class="block text-sm font-medium text-azul1">Sumário</label>
                        <textarea v-model="summary" id="summary" name="summary" rows="3" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required></textarea>
                    </div>
                    <div class="mb-5">
                        <label for="files" class="block text-sm font-medium text-azul1">Ficheiros</label>
                        <input @change="handleFilesChange" type="file" id="files" name="files" multiple class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>  
                </div>
                <div v-if="type === 'info'">
                    <div class="mb-5">
                        <label for="schedule" class="block text-sm font-medium text-azul1">Horário</label>
                        <input v-model="schedule" type="text" id="schedule" name="schedule" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
                    </div>
                    <div class="mb-5">
                        <label for="evaluationMethod" class="block text-sm font-medium text-azul1">Método de Avaliação</label>
                        <input v-model="evaluationMethod" type="text" id="evaluationMethod" name="evaluationMethod" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
                    </div>
                    <div class="mb-5">
                        <label for="dates" class="block text-sm font-medium text-azul1">Datas</label>
                        <textarea v-model="dates" id="dates" name="dates" rows="3" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required></textarea>
                    </div>
                </div>
                <div v-if="type === 'docente'">
                    <div class="mb-5">
                        <label for="name" class="block text-sm font-medium text-azul1">Nome</label>
                        <input v-model="name" type="text" id="name" name="name" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
                    </div>
                    <div class="mb-5">
                        <label for="photo" class="block text-sm font-medium text-azul1">Foto</label>
                        <input @change="handleFileChange" type="file" id="photo" name="photo" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>
                    <div class="mb-5">
                        <label for="categories" class="block text-sm font-medium text-azul1">Categorias</label>
                        <input v-model="categories" type="text" id="categories" name="categories" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>
                    <div class="mb-5">
                        <label for="affiliation" class="block text-sm font-medium text-azul1">Filiação</label>
                        <input v-model="affiliation" type="text" id="affiliation" name="affiliation" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>
                    <div class="mb-5">
                        <label for="email" class="block text-sm font-medium text-azul1">Email</label>
                        <input v-model="email" type="email" id="email" name="email" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>
                    <div class="mb-5">
                        <label for="webpage" class="block text-sm font-medium text-azul1">Webpage</label>
                        <input v-model="webpage" type="url" id="webpage" name="webpage" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>
                </div>
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Salvar</button>
            </form>
        </div>  
    </div>
</template>

<script>
import axios from 'axios'; // Agora será usado
import Sidebar from '../components/Sidebar.vue';
import { useUcsStore } from '../stores/UcsStore'

export default {
    components: {
        Sidebar
    },
    props: ['type'], 
    data() {
        return {
            title: '',
        description: '',
            date: '',
            aulaType: '',
            summary: '',
            name: '',
            photo: null,
            categories: '',
            affiliation: '',
            email: '',
            webpage: '',
            files: [], 
            schedule: '',
            evaluationMethod: '', 
            dates: '', 
        }
    },
    setup() {
        const ucsStore = useUcsStore();
        return { ucsStore }; 
    },
    methods: {
        async handleSubmit() {
            const ucsStore = useUcsStore(); 
            let data = {};
            let url = `http://localhost:16000/ucs/${ucsStore.currentUcId}/`;

            if (this.type === 'aula') {
                const fileIds = await this.uploadFiles(this.files);
                if (!fileIds) {
                    console.error('Falha ao enviar ficheiros');
                    return;
                }
                data = {
                    tipoAula: this.aulaType,
                    data: this.date,
                    sumario: this.summary,
                    ficheiros: fileIds, 
                };
                url += 'aulas';
            }

            axios.post(url, data)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        async uploadFiles(files) {
            const formData = new FormData();
            files.forEach(file => {
                formData.append('files', file);
            });

            try {
                const response = await axios.post('http://localhost:16000/files', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                return response.data.fileIds; 
            } catch (error) {
                console.error(error);
                return null;
            }
        }
    }
};
</script>