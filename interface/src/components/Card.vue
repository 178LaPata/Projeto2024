<template>
    <div class="px-8 py-4 bg-azul2 rounded-lg shadow-xl flex justify-between">
        <div>
            <div class="flex items-center justify-end">
                <span class="text-base font-light text-branco1">{{ date }}</span>
            </div>
            
            <div class="mt-2 mb-2">
                <p class="text-3xl font-bold text-branco1" tabindex="0">{{ content.title }}</p>
                <p class="text-lg mt-2 text-branco1">{{ content.description }}</p>
            </div>
        </div>
        <div v-if="canEdit" class="flex flex-col justify-between space-y-2">
            <router-link :to="`/${currentUcId}/editar`">
                <img src="/edit.svg" alt="Edit Icon" class="w-20 h-20 hover:cursor-pointer" />
            </router-link>
            <router-link :to="`/${currentUcId}/apagar`" @click.prevent="onDeleteClick">
                <img src="/delete.svg" alt="Delete Icon" class="w-20 h-20 hover:cursor-pointer" />
            </router-link>
        </div>
    </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useUcsStore } from '../stores/UcsStore.js'; 

export default defineComponent({
    props: {
        date: String,
        content: {
            type: Object,
            default: () => ({
                title: '',
                description: ''
            })
        },
        canEdit: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onDeleteClick() {
            this.$emit('delete', this.content.id);
        }
    },
    setup() {
        const ucsStore = useUcsStore();
        
        const currentUcId = computed(() => ucsStore.getCurrentUcId);

        return {
            currentUcId
        };
    }
});
</script>