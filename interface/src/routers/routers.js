import Login from '../pages/Login.vue'
import Registar from '../pages/Registar.vue'
import Home from '../pages/Home.vue'
import Anuncios from '../pages/Anuncios.vue'
import Aulas from '../pages/Aulas.vue'
import Docentes from '../pages/Docentes.vue'
import Informacoes from '../pages/Informacoes.vue'
import Material from '../pages/Material.vue'
import EditPage from '../pages/EditPage.vue'
import AddPage from '../pages/AddPage.vue'
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        name: 'Login',
        component: Login,
        path: '/login'
    },
    {
        name: 'Registar',
        component: Registar,
        path: '/registar'
    },
    {
        name: 'Home',
        component: Home,
        path: '/'
    },
    {
        name: 'Anuncios',
        component: Anuncios,
        path: '/:id/anuncios'
    },
    {
        name: 'Aulas',
        component: Aulas,
        path: '/:id/aulas'
    },
    {
        name: 'Docentes',
        component: Docentes,
        path: '/:id/docentes'
    },
    {
        name: 'Informacoes',
        component: Informacoes,
        path: '/:id/informacoes'
    },
    {
        name: 'Material',
        component: Material,
        path: '/:id/material'
    },
    {
        name: 'EditPage',
        component: EditPage,
        path: '/:id/editar/:id2',
        props: true
    },
    {
        name: 'AddPage',
        component: AddPage,
        path: '/:id/adicionar',
        props: true
    },
    {
        name: 'Add',
        component: AddPage,
        path: '/adicionar',
        props: true
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;