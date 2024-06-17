<template>
    <div class="flex min-h-screen">
        <Sidebar title="Informações" class="fixed left-0 top-0 h-full"/>
        <div class="flex flex-col w-full ml-96 justify-center">
            <div class="flex flex-col items-center w-full">
                <div class="flex flex-col space-y-10 items-center w-full max-w-4xl mx-auto">
                    <!-- Horários -->
                    <div v-if="informacoes.horario" class="flex w-full max-w-4xl mx-auto bg-azul2 rounded-lg shadow-xl">
                        <div class="px-8 py-4 flex-grow">
                            <p class="text-4xl font-bold text-branco1 text-center" tabindex="0">Horários</p>
                            <div v-for="(horas, tipo) in informacoes.horario" :key="tipo">
                                <p class="text-2xl font-bold mt-2 text-branco1">{{ tipo.charAt(0).toUpperCase() + tipo.slice(1) }}:</p>
                                <ul>
                                    <li v-for="hora in horas" :key="hora" class="text-branco1 text-xl">{{ hora }}</li>
                                </ul>
                            </div>
                        </div>
                        <div v-if="userPermissions.canEdit" class="flex flex-col justify-between p-4 space-y-2">
                            <router-link :to="`/${id}/editar/horario`">
                                <img src="/edit.svg" alt="Edit Icon" class="w-20 h-20 hover:cursor-pointer" />
                            </router-link>
                            <div @click="deleteInformacao('horario')">
                                <img src="/delete.svg" alt="Delete Icon" class="w-20 h-20 hover:cursor-pointer" />
                            </div>
                        </div>
                    </div>
                    <!-- Método de Avaliação -->
                    <div v-if="informacoes.avaliacao" class="flex w-full max-w-4xl mx-auto bg-azul2 rounded-lg shadow-xl">
                        <div class="px-8 py-4 flex-grow">
                            <p class="text-4xl font-bold text-branco1 text-center" tabindex="0">Método de Avaliação</p>
                            <ul>
                                <li v-for="item in informacoes.avaliacao" :key="item" class="text-xl mt-2 text-branco1">{{ item }}</li>
                            </ul>
                        </div>
                        <div v-if="userPermissions.canEdit" class="flex flex-col justify-between p-4 space-y-2">
                            <router-link :to="`/${id}/editar/avaliacao`">
                                <img src="/edit.svg" alt="Edit Icon" class="w-20 h-20 hover:cursor-pointer" />
                            </router-link>
                            <div @click="deleteInformacao('avaliacao')">
                                <img src="/delete.svg" alt="Delete Icon" class="w-20 h-20 hover:cursor-pointer" />
                            </div>
                        </div>
                    </div>
                    <!-- Datas -->
                    <div v-if="informacoes.datas" class="flex w-full max-w-4xl mx-auto bg-azul2 rounded-lg shadow-xl">
                        <div class="px-8 py-4 flex-grow">
                            <p class="text-4xl font-bold text-branco1 text-center" tabindex="0">Datas</p>
                            <div v-for="(data, evento) in informacoes.datas" :key="evento">
                                <p class="text-xl mt-2 text-branco1">{{ evento.charAt(0).toUpperCase() + evento.slice(1) }}: {{ data }}</p>
                            </div>
                        </div>
                        <div v-if="userPermissions.canEdit" class="flex flex-col justify-between p-4 space-y-2">
                            <router-link :to="`/${id}/editar/datas`">
                                <img src="/edit.svg" alt="Edit Icon" class="w-20 h-20 hover:cursor-pointer" />
                            </router-link>
                            <div @click="deleteInformacao('datas')">
                                <img src="/delete.svg" alt="Delete Icon" class="w-20 h-20 hover:cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="userPermissions.canEdit" class="fixed bottom-10 right-10">
                <router-link :to="{ path: `/${id}/adicionar`,  params: { id: currentUcId, type: 'info' } }">
                    <img src="/add.svg" alt="Add Icon" class="w-20 h-20 hover:cursor-pointer" />
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import axios from 'axios'
import { useLoginStore } from '../stores/LoginStore'

export default {
    components: {
        Sidebar
    },
    data() {
        return {
            informacoes: [],
            userPermissions: { canEdit: false },
            id: this.$route.params.id
        }
    },
    async mounted() {
        await this.fetchData();
        await this.fetchPermissions();
    },
    methods: {
        async fetchData() {
            try {
                const response = await axios.get(`http://localhost:16000/ucs/${this.id}/informacoes`);
                this.informacoes = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async fetchPermissions() {
            const loginStore = useLoginStore();
            const username = loginStore.getUsername;
            if (!username) return;
            try {
                const response = await axios.get(`http://localhost:16002/users/level/${username}`);
                const userLevel = response.data.dados.level;
                this.userPermissions.canEdit = userLevel === 'professor' || userLevel === 'admin';
            } catch (error) {
                console.error(error);
            }
        },
        async deleteInformacao(tipo) {
            try {
                await axios.delete(`http://localhost:16000/ucs/${this.id}/informacoes/${tipo}`);
                this.fetchData(); // Recarrega as informações após a exclusão
            } catch (error) {
                console.error('Erro ao deletar informação:', error);
            }
        }
    }
}
</script>