<template>
<Menu/>
</template>

<script>
import Menu from '@/components/Menu.vue'
import axios from "axios";
import jwt_decode from "jwt-decode";

export default {
components: {Menu},
    data: function () {
        return {
            userid: localStorage.getItem("user_id") || "none",
            items: "",
            loaded: false,
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
        getData: async function () {
            if (localStorage.getItem("token") === null) {
                this.$emit("logOut");
                return;
            }
            
            const options = {
                method: 'GET',
                url: 'http://127.0.0.1:9999/mesa',
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
    },
    
    created: async function () {
        this.getData();
    },

};
</script>