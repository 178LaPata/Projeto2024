<template>
    <div class="flex min-h-screen">
        <Sidebar title="Informações" class="fixed left-0 top-0 h-full"/>
        <div class="flex flex-col w-full ml-sidebar-space">
            <div class="flex flex-col items-center w-full mt-10 mb-10">
                <div class="flex flex-col space-y-5 items-center w-full max-w-4xl">
                    <!-- Horários -->
                    <div class="px-8 py-4 bg-azul2 rounded-lg shadow-xl" v-if="informacoes.horario">
                        <div class="mt-2 mb-2">
                            <p class="text-3xl font-bold text-branco1" tabindex="0">Horários</p>
                            <div v-for="(horas, tipo) in informacoes.horario" :key="tipo">
                                <p class="text-lg mt-2 text-branco1">{{ tipo.charAt(0).toUpperCase() + tipo.slice(1) }}:</p>
                                <ul>
                                    <li v-for="hora in horas" :key="hora" class="text-branco1">{{ hora }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- Método de Avaliação -->
                    <div class="px-8 py-4 bg-azul2 rounded-lg shadow-xl" v-if="informacoes.avaliacao">
                        <div class="mt-2 mb-2">
                            <p class="text-3xl font-bold text-branco1" tabindex="0">Método de Avaliação</p>
                            <ul>
                                <li v-for="item in informacoes.avaliacao" :key="item" class="text-lg mt-2 text-branco1">{{ item }}</li>
                            </ul>
                        </div>
                    </div>
                    <!-- Datas -->
                    <div class="px-8 py-4 bg-azul2 rounded-lg shadow-xl" v-if="informacoes.datas">
                        <div class="mt-2 mb-2">
                            <p class="text-3xl font-bold text-branco1" tabindex="0">Datas</p>
                            <div v-for="(data, evento) in informacoes.datas" :key="evento">
                                <p class="text-lg mt-2 text-branco1">{{ evento.charAt(0).toUpperCase() + evento.slice(1) }}: {{ data }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import axios from 'axios'

export default {
    components: {
        Sidebar
    },
    data() {
        return {
            informacoes: [],
        }
    },
    methods: {
        async fetchData() {
            const id = this.$route.params.id;
            try {
                const response = await axios.get(`http://localhost:16000/ucs/${id}/informacoes`);
                this.informacoes = response.data;
            } catch (error) {
                console.error(error)
            }
        },
    },
    mounted() {
        this.fetchData()
    }
}
</script>