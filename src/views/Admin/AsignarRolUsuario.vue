<template>
    <Menu />
    <div class="w-1/3 my-4 mx-auto">
        <form action="" v-on:submit.prevent="AsignarRolUsuario">
            <label for="usuario" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Selleccionar usuario
            </label>
            <select id="usuario" v-model="usuario_id"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option v-for="(usuario, index) in usuarios" :value="usuario._id">{{ usuario.correo }}
                </option>
            </select>

            <label for="rol" class=" mt-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Seleccionar rol
            </label>
            <select id="rol" v-model="rol_id"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option v-for="(rol, index) in roles" :value="rol._id">{{ rol.nombre }}
                </option>
            </select>
            <button type="submit" class="btn-brand mt-4">Aceptar</button>
        </form>
    </div>
</template>

<script>
import Menu from "@/components/menu.vue"
import axios from "axios";
import jwt_decode from "jwt-decode";

export default {
    data: function () {
        return {
            usuarios: [],
            roles: [],
            usuario_id: "",
            rol_id: ""
        };
    },
    methods: {
        verifyAuth: function () {
            this.is_auth = localStorage.getItem("isAuth") || false;
            if (this.is_auth == false)
                this.$router.push({ name: "logIn" });
            else
                this.$router.push({ name: "dashboard" });

            // let userId = jwt_decode(localStorage.token).sub.rol.nombre.toString();
        },
        AsignarRolUsuario: function () {
            if (localStorage.getItem("token") === null) {
                this.$emit("logOut");
                return;
            }

            const options = {
                method: 'PUT',
                url: `http://127.0.0.1:8080/usuarios/${this.usuario_id}/rol/${this.rol_id}`
            };

            axios.request(options).then((response) => {
                alert('Usuario asignado correctamente')
                console.log(response.data);
            }).catch((error) => {
                console.error(error);
            });
        },
    },
    mounted() {
        const usuarios = { method: 'GET', url: 'http://127.0.0.1:8080/usuarios' };

        axios.request(usuarios).then((response) => {
            this.usuarios = response.data
            console.log(response.data);
        }).catch((error) => {
            console.error(error);
        });

        const roles = { method: 'GET', url: 'http://127.0.0.1:8080/rol' };

        axios.request(roles).then((response) => {
            this.roles = response.data
            console.log(response.data);
        }).catch((error) => {
            console.error(error);
        });
    },
    components: { Menu },
};
</script>