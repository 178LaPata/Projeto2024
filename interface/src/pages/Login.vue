<template>
    <div>
        <h1 class="text-8xl font-bold text-center text-azul1 mt-20 mb-40">Gerador websites da UC</h1>
        <section>
            <div class="flex flex-col items-center justify-center mx-auto lg:py-0">
                <div class="w-full bg-azul2 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-4xl font-bold leading-tight tracking-tight text-branco1 text-center">Entre na sua conta</h1>
                        <form @submit.prevent="handleLogin" class="space-y-4 md:space-y-6">
                            <div>
                                <label for="username" class="block mb-2 text-m font-medium text-branco1">Username</label>
                                <input type="text" name="username" id="username" v-model="username" class="bg-branco1 text-azul1 sm:text-m rounded-lg focus:ring-branco1 focus:border-branco1 block w-full p-2.5" placeholder="Username" required="" autocomplete="username">
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-m font-medium text-branco1">Palavra-passe</label>
                                <input type="password" name="password" id="password" v-model="password" placeholder="••••••••" class="bg-branco1 text-azul1 sm:text-m rounded-lg focus:ring-branco1 focus:border-branco1 block w-full p-2.5 " required="" autocomplete="current-password">
                            </div>
                            <div class="flex items-center justify-between">
                                <router-link to="/" class="text-m font-medium text-branco1 hover:underline">Entrar como aluno</router-link>
                            </div>
                            <button type="submit" class="w-full text-branco1 bg-azul1 hover:bg-azul3 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-m px-5 py-2.5 text-center">Login</button>
                            <p class="text-m font-light text-branco1">
                                Ainda não tens conta? <router-link to="/registar" class="font-medium text-branco1 hover:underline">Registar</router-link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        <div v-if="errorMessage">{{ errorMessage }}</div>
    </div>
</template>

<script>
import axios from 'axios';
import { useLoginStore } from '../stores/LoginStore';

export default {
    data() {
        return {
            username: '',
            password: '',
            errorMessage: ''
        };
    },
    methods: {
        async handleLogin() {
            try {
                const response = await axios.post('http://localhost:16002/users/login', {
                    username: this.username,
                    password: this.password
                });
                if (response.data.token) {
                    const token = response.data.token;
                    localStorage.setItem('authToken', token);

                    const verifyResponse = await axios.get(`http://localhost:16002/users/level/${this.username}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    console.log('Token:', token);

                    const loginStore = useLoginStore();
                    loginStore.setUsername(this.username);
                    loginStore.setLevel(verifyResponse.data.dados.level);
                    console.log('Level:', verifyResponse.data.dados.level);
                    console.log('Username:', this.username);

                    if (verifyResponse.data.dados.level === 'professor') {
                        this.$router.push('/');
                    } else if (verifyResponse.data.dados.level === 'admin') {
                        this.$router.push('/');
                    } else {
                        this.errorMessage = 'Utilizador não tem permissão para aceder a esta área.';
                    }
                } else {
                    this.errorMessage = 'Login falhou. Token não recebido.';
                }
            } catch (error) {
                console.error('Error:', error);
                if (error.response && error.response.status === 401) {
                    this.errorMessage = 'Acesso não autorizado. Verifique suas credenciais e tente novamente.';
                } else {
                    this.errorMessage = error.response && error.response.data ? error.response.data.message : 'Login falhou. Por favor, verifique suas credenciais.';
                }
            }
        }
    }
};
</script>
