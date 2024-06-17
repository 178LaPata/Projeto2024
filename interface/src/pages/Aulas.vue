<template>
    <div class="flex min-h-screen">
        <Sidebar title="Aulas" class="fixed left-0 top-0 h-full"/>
        <div class="flex flex-col w-full ml-sidebar-space">
            <div class="flex flex-col items-center w-full mt-10 mb-10">
                <div class="flex flex-col space-y-5 items-center w-full max-w-4xl">
                    <div v-for="aula in aulas" :key="aula._id">
                        <Card :date="aula.data" :content="{ title: aula.tipoNumerado, description: (aula.sumario || []).join(', ') }" :canEdit="userPermissions.canEdit" @delete="deleteAula" />
                    </div>
                </div>
            </div>
            <div v-if="userPermissions.canEdit" class="fixed bottom-10 right-10">
                <router-link :to="{ path: `/${currentUcId}/adicionar`,  params: { id: currentUcId, type: 'aula' } }">
                    <img src="/add.svg" alt="Add Icon" class="w-20 h-20 hover:cursor-pointer" />
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Card from '../components/Card.vue'
import Sidebar from '../components/Sidebar.vue'
import axios from 'axios'
import { useLoginStore } from '../stores/LoginStore'
import { useUcsStore } from '../stores/UcsStore'

export default {
    components: {
        Card,
        Sidebar
    },
    data() {
        return {
            aulas: [],
            userPermissions: { canEdit: false },
            contadorAulas: {
                P: 0,
                T: 0,
            },
        }
    },
    computed: {
        currentUcId() {
            const ucsStore = useUcsStore();
            return ucsStore.currentUcId;
        }
    },
    methods: {
        async fetchData() {
            await this.fetchAulas();
            await this.fetchUserPermissions();
            this.processarAulasComNumeracao();
        },
        async fetchAulas() {
            const id = this.currentUcId;
            try {
                const response = await axios.get(`http://localhost:16000/ucs/${id}/aulas`);
                this.aulas = response.data;
                this.resetContadores();
            } catch (error) {
                console.error('Erro ao buscar aulas:', error);
            }
        },
        async fetchUserPermissions() {
            const loginStore = useLoginStore();
            const username = loginStore.getUsername; 
            if (!username) return;
            try {
                const response = await axios.get(`http://localhost:16002/users/level/${username}`);
                const userLevel = response.data.dados.level;
                this.userPermissions.canEdit = userLevel === 'professor' || userLevel === 'admin';
            } catch (error) {
                console.error('Erro ao buscar permissões do usuário:', error);
            }
        },
        getTipoAula(tipo) {
            if (tipo === 'P' || tipo === 'TP') {
                this.contadorAulas.P++; 
            } else {
                this.contadorAulas.T++;
            }

            let tipoAula;
            if (tipo === 'P' || tipo === 'TP') {
                tipoAula = 'Prática';
            } else {
                tipoAula = 'Teórica';
            }

            return `${tipoAula} ${this.contadorAulas[tipo === 'P' || tipo === 'TP' ? 'P' : 'T']}`;
        },
        resetContadores() {
            this.contadorAulas.P = 0;
            this.contadorAulas.T = 0;
        },
        processarAulasComNumeracao() {
            this.aulas = this.aulas.filter(aula => aula.tipo && aula.sumario).map(aula => ({
                ...aula,
                tipoNumerado: this.getTipoAula(aula.tipo),
                _id: aula.id 
            }));
        },
        async deleteAula(aulaId) {
            const id = this.currentUcId;
            try {
                await axios.delete(`http://localhost:16000/ucs/${id}/aulas/${aulaId}`);
                this.fetchData(); 
            } catch (error) {
                console.error('Erro ao deletar aula:', error);
            }
        }
    },
    mounted() {
        this.fetchData();
    }
}
</script>