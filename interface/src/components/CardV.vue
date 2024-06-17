<template>
    <div class="max-w-md px-8 py-4 bg-azul2 rounded-lg shadow-xl mb-10">
        <div class="flex justify-center mt-5">
            <img class="rounded-lg w-48 h-52" :src="photoUrl" alt="profile-pic">
        </div>
        <div class="mt-5">
            <div v-for="section in sections" :key="section.text" class="mt-auto flex items-center mb-6 space-x-5">
                <img :src="section.icon" alt="Icon" class="w-8 h-8 hover:cursor-pointer" />
                <span v-if="!section.link && !section.email" class="text-xl text-branco1">{{ section.text }}</span>
                <a v-if="section.link" :href="section.link" class="text-xl text-branco1 hover:underline" target="_blank">{{ section.text }}</a>
                <a v-if="section.email" :href="`mailto:${section.text}`" class="text-xl text-branco1 hover:underline">{{ section.text }}</a>
            </div>
        </div>
        <div v-if="canEdit" class="flex flex-row justify-between space-y-2">
            <router-link :to="`/${currentUcId}/editar`">
                <img src="/edit.svg" alt="Edit Icon" class="w-20 h-20 hover:cursor-pointer" />
            </router-link>
            <div @click="onDeleteClick">
                <img src="/delete.svg" alt="Delete Icon" class="w-20 h-20 hover:cursor-pointer" />
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useUcsStore } from '../stores/UcsStore.js'; 

export default defineComponent({
    props: {
        sections: {
            type: Array,
            required: true,
            default: () => ([])
        },
        photoUrl: {
            type: String,
            required: true
        },
        canEdit: {
            type: Boolean,
            default: false
        }
    },
    setup() {
        const ucsStore = useUcsStore();
        
        const currentUcId = computed(() => ucsStore.getCurrentUcId);

        return {
            currentUcId
        };
    },
    methods: {
        onDeleteClick() {
            this.$emit('delete', this.currentUcId.value);
        }
    }
});
</script>