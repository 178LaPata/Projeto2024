import { defineStore } from 'pinia';

export const useLoginStore = defineStore('login', {
    state: () => ({
        username: '',
        level: ''
    }),
    actions: {
        setUsername(username) {
            this.username = username;
        },
        setLevel(level) {
            this.level = level;
        }
    },

    getters: {
        getUsername() {
            return this.username;
        },
        getLevel() {
            return this.level;
        }
    }
});