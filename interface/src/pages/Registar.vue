<template>
    <div>
        <h1 class="text-8xl font-bold text-center text-azul1 mt-20 mb-40">Gerador websites da UC</h1>
        <section>
            <div class="flex flex-col items-center justify-center mx-auto lg:py-0">
                <div class="w-full bg-azul2 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-4xl font-bold leading-tight tracking-tight text-branco1 text-center">Registe a sua conta</h1>
                        <form @submit.prevent="handleRegister" class="space-y-4 md:space-y-6" >
                            <div>
                                <label for="username" class="block mb-2 text-m font-medium text-branco1">Username</label>
                                <input v-model="username" type="text" name="username" id="username" class="bg-branco1 text-azul1 sm:text-m rounded-lg focus:ring-branco1 focus:border-branco1 block w-full p-2.5" placeholder="Username" required="" autocomplete="username">
                            </div>
                            <div>
                                <label for="email" class="block mb-2 text-m font-medium text-branco1">Email</label>
                                <input v-model="email" type="email" name="email" id="email" placeholder="d*****@di.uminho.pt" class="bg-branco1 text-azul1 sm:text-m rounded-lg focus:ring-branco1 focus:border-branco1 block w-full p-2.5 " required="">
                            </div>
                            <div>
                                <label for="nome" class="block mb-2 text-m font-medium text-branco1">Nome</label>
                                <input v-model="nome" type="text" name="nome" id="nome" placeholder="Nome Completo" class="bg-branco1 text-azul1 sm:text-m rounded-lg focus:ring-branco1 focus:border-branco1 block w-full p-2.5 " required="">
                            </div>
                            <div>
                                <label for="filiacao" class="block mb-2 text-m font-medium text-branco1">Filiação</label>
                                <input v-model="filiacao" type="text" name="filiacao" id="filiacao" placeholder="Filiação" class="bg-branco1 text-azul1 sm:text-m rounded-lg focus:ring-branco1 focus:border-branco1 block w-full p-2.5 " required="">
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-m font-medium text-branco1">Palavra-passe</label>
                                <input v-model="password" type="password" name="password" id="password" placeholder="••••••••" class="bg-branco1 text-azul1 sm:text-m rounded-lg focus:ring-branco1 focus:border-branco1 block w-full p-2.5 " required="" autocomplete="current-password">
                            </div>
                            <div class="flex items-center justify-between">
                                <router-link to="/" class="text-m font-medium text-branco1 hover:underline">Entrar como aluno</router-link>
                            </div>
                            <button type="submit" class="w-full text-branco1 bg-azul1 hover:bg-azul3 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-m px-5 py-2.5 text-center">Registar</button>
                            <p class="text-m font-light text-branco1">
                                Já tens conta? <router-link to="/login" class="font-medium text-branco1 hover:underline">Login</router-link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
import { useLoginStore } from '../stores/LoginStore';

export default {
    data() {
        return {
            username: '',
            email: '',
            nome: '',
            filiacao: '',
            password: '',
            errorMessage: '',
            level: 'professor' 
        };
    },
    methods: {
        async handleRegister() {
            if (!this.username || !this.email || !this.nome || !this.filiacao || !this.password) {
                this.errorMessage = 'Por favor, preencha todos os campos.';
                return;
            }

            try {
                const response = await axios.post('http://localhost:16002/users/register', {
                    username: this.username, 
                    email: this.email,
                    name: this.nome, 
                    filiation: this.filiacao, 
                    password: this.password,
                    level: this.level 
                });                
                if (response.data.token) {
                    const token = response.data.token;
                    localStorage.setItem('authToken', token);

                    const loginStore = useLoginStore();
                    loginStore.setUsername(this.username);
                    loginStore.setLevel(this.level);

                    this.$router.push('/');

                } else {
                    this.errorMessage = 'Registro falhou. Token não recebido.';
                }
            } catch (error) {
                console.error('Erro ao registrar:', error);
                this.errorMessage = error.response && error.response.data ? error.response.data.message : 'Registro falhou. Por favor, verifique suas credenciais.';
            }
        }
    }
}
</script>