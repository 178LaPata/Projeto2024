<template>
    <div class="flex min-h-screen">
        <div class="flex flex-col w-full ml-sidebar-space">
            <div class="flex flex-col items-center w-full mt-20">
                <div class="flex flex-col space-y-5 items-center w-full max-w-4xl">
                    <div class="flex flex-col items-center gap-10 w-full px-4 pt-52">
                        <div v-for="uc in ucs" :key="uc._id" class="flex justify-between items-center w-full h-40 bg-azul2 rounded-lg shadow-xl p-8" @click="goToUcPage(uc._id, uc.sigla)">
                            <p class="text-4xl font-bold text-branco1" tabindex="0">{{ uc.titulo }}</p>
                            <div v-if="userPermissions.canEdit" class="flex flex-col justify-between space-y-2">
                                <img src="/edit.svg" alt="Edit Icon" class="w-10 h-10 hover:cursor-pointer" />
                                <img src="/delete.svg" alt="Delete Icon" class="w-10 h-10 hover:cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="userPermissions.canEdit" class="fixed bottom-10 right-10">
                <router-link :to="`/adicionar`">
                    <img src="/add.svg" alt="Add Icon" class="w-20 h-20 hover:cursor-pointer" />
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
import axios from 'axios';
import { useLoginStore } from '../stores/LoginStore';
import { useUcsStore } from '../stores/UcsStore';

export default {
    components: {
        Sidebar
    },
    data() {
        return {
            ucs: [],
            userPermissions: { canEdit: false },
        }
    },
    async mounted() {
        await this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const ucsResponse = await axios.get('http://localhost:16000/ucs');
                this.ucs = ucsResponse.data;

                const loginStore = useLoginStore();
                const username = loginStore.getUsername;
                
                if (username) {
                    const permissionsResponse = await axios.get(`http://localhost:16002/users/level/${username}`);
                    const userLevel = permissionsResponse.data.dados.level;
                    this.userPermissions.canEdit = userLevel === 'admin';
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        goToUcPage(ucId, ucSigla) {
            const ucsStore = useUcsStore();
            ucsStore.setCurrentUc(ucId, ucSigla);            
            if (ucId) {
                this.$router.push(`/${ucId}/anuncios`);
            } else {
                console.error('ucId is null or undefined');
            }
        }
    }
}
</script>