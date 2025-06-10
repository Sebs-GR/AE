<template>
  <div id="app">
    <nav>
      <router-link to="/">Pacientes</router-link> |
      <router-link to="/symptoms">Registrar Síntomas</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
// No script needed for a basic App.vue with navigation
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
nav {
  margin-bottom: 20px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}
nav a.router-link-exact-active {
  color: #42b983;
}
</style>