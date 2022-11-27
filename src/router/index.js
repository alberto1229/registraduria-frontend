import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Elecciones/Login.vue"
import SignUp from "../views/Elecciones/SignUp.vue";
import Dashboard from "../views/Elecciones/Dashboard.vue";
import AsignarRolUsuario from "../views/Admin/AsignarRolUsuario.vue";
import AsignarCandidatoPartido from "../views/Admin/AsignarCandidatoPartido.vue";

/* Candidatos */
import Candidatos from "../views/Elecciones/Candidatos/Candidatos.vue";

/* Mesas */
import Mesas from "../views/Elecciones/Mesas/Mesas.vue";

/* Partidos */
import Partidos from "../views/Elecciones/Partidos/Partidos.vue";

/* Resultados x Canndidato */
import ResultadosCandidaro from "../views/Elecciones/Resultado-Candidato/Resultados.vue";
import NuevoResultado from "../views/Elecciones/Resultado-Candidato/NuevoResultado.vue";

/* Resultados x Mesa */
import ResultadosMesa from "../views/Elecciones/Resultado-Mesa/Resultados.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "logIn",
      component: Login,
    },
    {
      path: "/signup",
      name: "signUp",
      component: SignUp,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/asignarrolusuario",
      name: "asignarrolusuario",
      component: AsignarRolUsuario,
    },
    {
      path: "/asignarcandidatopartido",
      name: "asignarcandidatopartido",
      component: AsignarCandidatoPartido,
    },
    {
      path: "/candidatos",
      name: "candidatos",
      component: Candidatos,
    },
    {
      path: "/mesas",
      name: "mesas",
      component: Mesas,
    },
    {
      path: "/partidos",
      name: "partidos",
      component: Partidos,
    },
    {
      path: "/resultadoscandidato",
      name: "resultadoscandidato",
      component: ResultadosCandidaro,
    },
    {
      path: "/nuevoresultadocandiddato",
      name: "nuevoresultadocandiddato",
      component: NuevoResultado,
    },
    {
      path: "/resultadosmesa",
      name: "resultadosmesa",
      component: ResultadosMesa,
    },
  ],
});

export default router