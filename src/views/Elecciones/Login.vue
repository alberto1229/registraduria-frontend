<template>
    <section class=" dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[calc(100vh-100px)] lg:py-0">
            <div
                class="w-full rounded-3xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 border">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1
                        class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Iniciar Sesión
                    </h1>
                    <form class="space-y-4 md:space-y-6" v-on:submit.prevent="processLogInUser">
                        <div>
                            <label for="correo"
                                class="block mb-2 pl-1 text-sm font-medium text-gray-900 dark:text-white">Correo
                                electrónico</label>
                            <input type="text" name="correo" v-model="user.correo"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-3xl focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Escribe tu correo electrónico" required>
                        </div>
                        <div>
                            <label for="password"
                                class="block mb-2 pl-1 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                            <input type="password" name="password" v-model="user.contrasena"
                                placeholder="Ingresa tu contraseña"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-3xl focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required>
                        </div>
                        <button type="submit"
                            class="w-full text-white bg-slate-600 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800">Ingresar</button>
                        <p class="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                            ¿Aún no tienes una cuenta?
                            <router-link to="signup"
                                class="font-medium text-slate-600 hover:underline dark:text-slate-500">Regístrate
                            </router-link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
export default {
    name: "logIn",
    data: function () {
        return {
            user: {
                correo: "",
                contrasena: ""
            }
        }
    },
    methods: {
        processLogInUser: function () {
            axios
                .post("http://127.0.0.1:7777/login",
                    this.user, { headers: {} }
                )
                .then((result) => {
                    let dataLogIn = {
                        username: this.user.correo,
                        token: result.data
                    }
                    console.log(dataLogIn.token)
                    this.$emit('completedLogIn', dataLogIn)
                })
                .catch((error) => {
                    if (error.response.status == "401")
                        alert("Credenciales Incorrectas.");
                });
        }
    }
}
</script>