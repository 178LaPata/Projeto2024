<template>
    <div class="flex">
        <div class="flex flex-col h-screen p-4 bg-azul1 shadow-md w-96 font-bold">
            <div class="flex items-center justify-center h-20 m-6">
                <span class="text-6xl text-branco1"> {{ title }}</span>
            </div>
            <div class="mt-10 ml-4">
                <router-link v-for="link in links" :key="link.text" :to="`/${currentUcId}/${link.href}`" class="flex items-center p-2 my-10 text-branco1 rounded-lg hover:bg-azul3">
                    <img :src="link.icon" alt="Icon" class="w-8 h-8 hover:cursor-pointer" />
                    <span class="text-3xl ml-6 text-branco1">{{ link.text }}</span>
                </router-link>
            </div>
            <div class="mt-auto flex justify-evenly items-center mb-6">
                <img src="/logout.svg" alt="Logout Icon" class="w-10 h-10 hover:cursor-pointer" @click="logout" />
                <span class="text-2xl text-branco1">{{ currentUcSigla }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useUcsStore } from '../stores/UcsStore';
import { useRouter } from 'vue-router'; 

export default {
    name: 'Sidebar',
    props: {
        title: String
    },
    setup() {
        const ucsStore = useUcsStore();
        const router = useRouter();
        const currentUcId = computed(() => ucsStore.getCurrentUcId);
        const currentUcSigla = computed(() => ucsStore.getCurrentUcSigla);

        const logout = () => {
            localStorage.removeItem('authToken');
            
            router.push('/login');
        };

        return {
            currentUcId,
            currentUcSigla,
            logout,
            links: [
                { href: "anuncios", icon: "/anuncio.svg", text: "Anúncios" },
                { href: "aulas", icon: "/school.svg", text: "Aulas" },
                { href: "material", icon: "/books.svg", text: "Material" },
                { href: "informacoes", icon: "/info.svg", text: "Informações" },
                { href: "docentes", icon: "/people.svg", text: "Docentes" }
            ]
        };
    }
};
</script>