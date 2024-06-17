<template>
    <div class="flex min-h-screen">
        <Sidebar title="Docentes" class="fixed left-0 top-0 h-full"/>
        <div class="flex flex-col w-full ml-sidebar-space ml-64"> 
            <div class="flex justify-center w-full mt-20 mb-10">
                <div class="flex flex-wrap justify-center items-center space-x-10">
                    <div v-for="(docente, index) in docentes" :key="`docente-${index}`" class="mb-5 px-2">
                        <CardV :sections="formatSections(docente)" :photoUrl="docente.foto ? `/${docente.foto}` : '/defaultPhoto.svg'" :canEdit="userPermissions.canEdit"  @delete="deleteDocentes" />
                    </div>
                </div>
            </div>
            <div v-if="userPermissions.canEdit" class="fixed bottom-10 right-10">
                <router-link :to="{ path: `/${currentUcId}/adicionar`,  params: { id: currentUcId, type: 'docente' } }">
                    <img src="/add.svg" alt="Add Icon" class="w-20 h-20 hover:cursor-pointer" />
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import CardV from '../components/CardV.vue';
import Sidebar from '../components/Sidebar.vue';
import axios from 'axios';
import { useLoginStore } from '../stores/LoginStore';

export default {
    components: {
        CardV,
        Sidebar
    },
    data() {
        return {
            docentes: [],
            userPermissions: { canEdit: false },
        };
    },
    methods: {
        async fetchData() {
            const loginStore = useLoginStore();
            const username = loginStore.getUsername;
            const id = this.$route.params.id;
            try {
                const docentesResponse = await axios.get(`http://localhost:16000/ucs/${id}/docentes`);
                this.docentes = docentesResponse.data.map(docente => ({
                    ...docente,
                    foto: docente.foto || 'defaultPhoto.svg'
                }));
                if (username) {
                    const permissionsResponse = await axios.get(`http://localhost:16002/users/level/${username}`);
                    const userLevel = permissionsResponse.data.dados.level;
                    this.userPermissions.canEdit = userLevel === 'professor' || userLevel === 'admin';
                }
            } catch (error) {
                console.error('Erro ao buscar docentes:', error);
            }
        },
        async deleteDocente(docenteId) {
            const id = this.$route.params.id;
            try {
                await axios.delete(`http://localhost:16000/ucs/${id}/docentes/${docenteId}`);
                this.fetchData(); 
            } catch (error) {
                console.error('Erro ao deletar docente:', error);
            }
        },
        formatSections(docente) {
            return [
                { icon: '/person.svg', text: docente.nome },
                { icon: '/work.svg', text: docente.categoria },
                { icon: '/home.svg', text: docente.filiacao },
                { icon: '/mail.svg', text: docente.email, email: true },
                { icon: '/link.svg', text: 'Outras Informações', link: docente.webpage }
            ];
        }
    },
    mounted() {
        this.fetchData();
    }
}
</script>