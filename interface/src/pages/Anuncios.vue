<template>
    <div class="flex min-h-screen">
        <Sidebar title="Anúncios" class="fixed left-0 top-0 h-full"/>
        <div class="flex flex-col w-full ml-sidebar-space">
            <div class="flex flex-col items-center w-full mt-10 mb-10">
                <div class="flex flex-col space-y-5 items-center w-full max-w-4xl">
                    <div v-for="anuncio in anuncios" :key="anuncio._id">
                        <Card :date="anuncio.dataAnuncio" :content="{ id: anuncio._id, title: anuncio.titulo, description: anuncio.conteudo }" :canEdit="userPermissions.canEdit" @delete="deleteAnuncio" />
                    </div>
                </div>
            </div>
            <div v-if="userPermissions.canEdit" class="fixed bottom-10 right-10">
                <router-link :to="{ name: 'addAnuncio', params: { id: currentUcId, type: 'anuncio' } }">
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

export default {
    components: {
        Card,
        Sidebar
    },
    data() {
        return {
            anuncios: [],
            userPermissions: { canEdit: false },
        }
    },
    computed: {
        currentUcId() {
            return this.$route.params.id;
        }
    },
    methods: {
        async fetchData() {
            const loginStore = useLoginStore();
            const username = loginStore.getUsername; 
            const id = this.$route.params.id;
            try {
                const anunciosResponse = await axios.get(`http://localhost:16000/ucs/${id}/anuncios`);
                this.anuncios = anunciosResponse.data;

                if (username) {
                    const permissionsResponse = await axios.get(`http://localhost:16002/users/level/${username}`);
                    const userLevel = permissionsResponse.data.dados.level;
                    this.userPermissions.canEdit = userLevel === 'professor' || userLevel === 'admin';
                }
            } catch (error) {
                console.error(error);
            }
        },
        async deleteAnuncio(anuncioId) {
            try {
                await axios.delete(`http://localhost:16000/ucs/${this.$route.params.id}/anuncios/${anuncioId}`);
                this.fetchData();
            } catch (error) {
                console.error('Erro ao deletar anúncio:', error);
            }
        }
    },
    mounted() {
        this.fetchData()
    }
}
</script>