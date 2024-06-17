import { defineStore } from 'pinia';

export const useUcsStore = defineStore('ucs', {
    state: () => ({
        ucsIds: [],
        currentUcId: null,
        currentUcSigla: null 
    }),
    actions: {
        updateUcsIds(ucs) {
            this.ucsIds = ucs.map(uc => uc._id);
        },
        setCurrentUc(id, sigla) {
            this.currentUcId = id;
            this.currentUcSigla = sigla;
        }
    },
    getters: {
        getCurrentUcId() {
            return this.currentUcId;
        },
        getCurrentUcSigla() { 
            return this.currentUcSigla;
        }
    }
});
