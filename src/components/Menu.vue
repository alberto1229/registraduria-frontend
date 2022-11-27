<template>
    <div class="flex items-center my-4 py-3 px-6 bg-gray-100 rounded-full">
        <div class="flex items-center space-x-6">
            <router-link class="py-2 px-4 font-semibold hover:text-blue-700 focus:text-blue-700 active:text-blue-700" to="candidatos">Candidatos</router-link>
            <router-link class="py-2 px-4 font-semibold hover:text-blue-700 focus:text-blue-700 active:text-blue-700" to="partidos">Partidos</router-link>
            <router-link class="py-2 px-4 font-semibold hover:text-blue-700 focus:text-blue-700 active:text-blue-700" to="mesas">Mesas
            </router-link>
            <dropdown text="Resultados">
                <template #trigger>
                    <span
                        class="cursor-pointer font-semibold hover:text-blue-700 focus:text-blue-700 flex items-center">Resultados<svg
                            class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7">
                            </path>
                        </svg></span>
                </template>
                <list-group>
                    <list-group-item>
                        <router-link class="block py-2 px-4 " to="resultadoscandidato">Resultados por Candidato
                        </router-link>
                    </list-group-item>
                    <list-group-item>
                        <router-link class="block py-2 px-4 " to="resultadosmesa">Resultados por Partido</router-link>
                    </list-group-item>
                    <list-group-item>
                        <router-link class="block py-2 px-4 " to="nuevoresultadocandiddato">Nuevo Resultado Candidato
                        </router-link>
                    </list-group-item>
                </list-group>
            </dropdown>
            <dropdown text="Admin">
                <template #trigger>
                    <span
                        class="cursor-pointer font-semibold hover:text-blue-700 focus:text-blue-700 flex items-center">Admin<svg
                            class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7">
                            </path>
                        </svg></span>
                </template>
                <list-group>
                    <list-group-item>
                        <router-link class="block py-2 px-4 " to="asignarcandidatopartido">Asignar Candidato a Partido</router-link>
                    </list-group-item>
                    <list-group-item>
                        <router-link class="block py-2 px-4 " to="asignarrolusuario">Asignar Rol a Usuario</router-link>
                    </list-group-item>
                </list-group>
            </dropdown>
        </div>
        <button class=" font-semibold ml-auto" v-on:click="logOut">Cerrar Sesión</button>
    </div>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref } from "vue"
import { Dropdown, ListGroup, ListGroupItem } from 'flowbite-vue'

const router = useRouter()

function logOut() {
    localStorage.clear();
    alert("Sesión Cerrada");
    router.push({ name: "logIn" })
}
</script>