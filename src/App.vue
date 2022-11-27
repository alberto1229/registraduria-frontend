<template>
  <header class="flex items-center justify-between z-50 py-2 px-4 border-b bg-white">
    <RouterLink to="/"><img class="w-28" src="@/assets/logo.png"
        alt="Logo de la Registraduría Nacional del Estado Civil" /></RouterLink>
    <nav class="flex gap-4 font-semibold">
      <RouterLink class="hover:text-blue-700 focus:text-blue-700" to="/">Inicio</RouterLink>
      <RouterLink class="hover:text-blue-700 focus:text-blue-700" to="dashboard">Login</RouterLink>
    </nav>
  </header>

  <div>
    <router-view v-on:completedLogIn="completedLogIn" v-on:completedSignUp="completedSignUp" v-on:logOut="logOut">
    </router-view>
  </div>

  
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      is_auth: false,
      is_admin: false
    }
  },

  components: {},

  methods: {
    verifyAuth: function () {
      this.is_auth = localStorage.getItem("isAuth") || false;
      if (this.is_auth == false)
        this.$router.push({ name: "logIn" });
      else
        this.$router.push({ name: "dashboard" });
    },

    loadAccount: function () {
      this.$router.push({ name: "dashboard" });
    },

    loadHome: function () {
      this.$router.push({ name: "dashboard" });
    },

    logOut: function () {
      localStorage.clear();
      // alert("Sesión Cerrada");
      this.verifyAuth();
    },

    loadLogIn: function () {
      this.$router.push({ name: "logIn" })
    },

    loadSignUp: function () {
      this.$router.push({ name: "signUp"})
    },

    completedLogIn: function (data) {
      localStorage.setItem("isAuth", true);
      localStorage.setItem("username", data.username);
      localStorage.setItem("token", data.token.token);
      localStorage.setItem("user_id", data.token.user_id);
      console.log(localStorage.token)
      this.verifyAuth();
    },

    completedSignUp: function (data) {
      alert("Registro Exitoso");
      this.completedLogIn(data)
    },
  },
  created: function () {
    this.verifyAuth()
  }
}
</script>