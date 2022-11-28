<template>
    <Menu />
    <button class="btn-primary rounded-full my-2" @click="ModalNew = true">Nuevo Partido</button>
    <div class="overflow-x-auto my-4 relative shadow-sm sm:rounded-lg">
        <table class="w-full text-xs md:text-sm text-center text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="py-3 px-6">
                        #
                    </th>
                    <th scope="col" class="py-3 px-6">
                        Nombre
                    </th>
                    <th scope="col" class="py-3 px-6">
                        Lema
                    </th>
                    <th scope="col" class="py-3 px-6">
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="py-4 px-6">
                        {{ index + 1 }}
                    </th>
                    <td class="py-4 px-6 font-medium">
                        {{ item.nombre }}
                    </td>
                    <td class="py-4 px-6">
                        {{ item.lema }}
                    </td>
                    <td class="py-4 px-6">
                        <button class="btn-yellow rounded-full"
                            v-on:click.prevent="itemDetails(item._id)">Detalles</button>
                        <button class="btn-primary rounded-full"
                            v-on:click.prevent="itemMostrar(item._id)">Actualizar</button>
                        <button class=" btn-red rounded-full"
                            v-on:click.prevent="deteleItem(item._id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Modal Mostrar detalles GET -->
    <Teleport to="body">
        <modal :show="ModalInfo" @close="ModalInfo = false">
            <template #header>
                <h3 class="font-bold">Partido: {{ itemdetalle.nombre }}</h3>
            </template>
            <template #body>
                <p class="">Lema: {{ itemdetalle.lema }}</p>
            </template>
        </modal>
    </Teleport>

    <!-- Modal Actualizar PUT -->
    <Teleport to="body">
        <modal :show="ModalUpdate" @close="ModalUpdate = false">
            <template #header>
                <h3 class="font-bold">Actualizar Partido</h3>
            </template>
            <template #body>
                <form v-on:submit.prevent="processItemUpdate(itemMostar._id)">
                    <div>
                        <label for="nombre"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre actual:
                            {{ itemMostar.nombre }}</label>
                        <input type="text" id="nombre" v-model="valor.nombre"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required>
                    </div>
                    <div>
                        <label for="lema"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lema actual: {{ itemMostar.lema }}</label>
                        <input type="text" id="lema" v-model="valor.lema"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required>
                    </div>
                    <button class="btn-primary rounded-full mt-4" type="submit">Actualizar registro</button>
                </form>
            </template>
        </modal>
    </Teleport>

    <!-- Modal Nuevo POST -->
    <Teleport to="body">
        <modal :show="ModalNew" @close="ModalNew = false">
            <template #header>
                <h3 class="font-bold">Nuevo partido</h3>
            </template>
            <template #body>
                <form v-on:submit.prevent="newItem()">
                    <div>
                        <label for="nombre_partido"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del Partido:</label>
                        <input type="text" id="nombre_partido" v-model="valor.nombre"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required>
                    </div>
                    <div>
                        <label for="lema"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lema:</label>
                        <input type="text" id="lema" v-model="valor.lema"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required>
                    </div>
                    <button class="btn-primary rounded-full mt-4" type="submit">Registrar</button>
                </form>
            </template>
        </modal>
    </Teleport>


</template>


<script>
import Menu from '@/components/Menu.vue'
import Modal from '@/components/Modal.vue'
import axios from "axios";
import jwt_decode from "jwt-decode";

export default {
    data: function () {
        return {
            valor: {
                nombre: "",
                lema: "",
            },
            items: "",
            loaded: false,
            ModalInfo: false,
            ModalUpdate: false,
            ModalNew: false,
            itemdetalle: [],
            itemMostar: [],
        };
    },
    components: { Menu, Modal },
    methods: {
        verifyAuth: function () {
            this.is_auth = localStorage.getItem("isAuth") || false;
            if (this.is_auth == false)
                this.$router.push({ name: "logIn" });
            else
                this.$router.push({ name: "dashboard" });

            // let userId = jwt_decode(localStorage.token).sub.rol.nombre.toString();
        },
        getData: async function () {
            if (localStorage.getItem("token") === null) {
                this.$emit("logOut");
                return;
            }

            const options = {
                method: 'GET',
                url: 'http://127.0.0.1:9999/partido',
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            };

            axios.request(options).then((response) => {
                this.items = response.data;
                this.loaded = true;
                console.log(response.data);
            }).catch((error) => {
                console.error(error);
                this.$emit("logOut");
            });
        },
        deteleItem: function (user_id) {
            const options = {
                method: 'DELETE',
                url: `http://127.0.0.1:9999/partido/${user_id}`,
            };

            axios.request(options).then((response) => {
                alert("Registro Eliminado Exitosamente")
                console.log(response.data);
                this.getData()
            }).catch((error) => {
                console.error(error);
            });
        },

        itemDetails: function (user_id) {
            const options = {
                method: 'GET',
                url: `http://127.0.0.1:9999/partido/${user_id}`,
            };

            axios.request(options).then((response) => {
                this.itemdetalle = response.data;
                this.ModalInfo = true;
                console.log(response.data);
            }).catch((error) => {
                console.error(error);
            });
        },

        itemMostrar: function (user_id) {
            const options = {
                method: 'GET',
                url: `http://127.0.0.1:9999/partido/${user_id}`,
            };

            axios.request(options).then((response) => {
                this.itemMostar = response.data;
                this.ModalUpdate = true;
                console.log(response.data);
            }).catch((error) => {
                console.error(error);
            });
        },

        processItemUpdate: function (user_id) {
            axios
                .put(`http://127.0.0.1:9999/partido/${user_id}`,
                    this.valor, { headers: {} }
                )
                .then((result) => {
                    this.ModalUpdate = false;
                    alert("Partido actualizado correctamente")
                    this.getData()
                    console.log(result)
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        newItem: function (user_id) {
            axios
                .post(`http://127.0.0.1:9999/partido`,
                    this.valor, { headers: {} }
                )
                .then((result) => {
                    this.ModalNew = false;
                    alert("Partido creado correctamente")
                    this.getData()
                    console.log(result)
                })
                .catch((error) => {
                    console.error(error);
                });
        },

    },

    created: async function () {
        this.getData();
    },

};
</script>