<script setup>
import { RouterLink } from 'vue-router'
import useFetchData from '../composables/useFetchData'
import { SERVER_ENDPOINT } from '../constants'

// Fetch collections from DB
const { data: surveys, error } = useFetchData(`${SERVER_ENDPOINT}surveys`)
</script>

<template>
  <nav v-if="error">
    <p>{{ error }}</p>
  </nav>
  <nav v-else id="navbar">
    <img
      src="../assets/images/pitShop-logo-light.svg"
      alt="pitshop logo"
      height="200"
      width="200"
    />
    <RouterLink key="home" to="/" class="surveyLink"
      ><span class="material-symbols-sharp"> home </span>
      <h3>Home</h3></RouterLink
    >
    <RouterLink v-for="survey in surveys" :key="survey" :to="survey" class="surveyLink"
      ><span class="material-symbols-sharp"> analytics </span>
      <h3>{{ survey }}</h3></RouterLink
    >
  </nav>
</template>

<style>
#navbar {
  display: flex;
  flex-direction: column;
  width: 200px;
  padding: 10px;
  font-size: 1.5rem;
  height: 100;
  background-color: #ffffff;
}
.surveyLink {
  text-decoration: none;
  color: #000000;
  padding: 10px;
  margin: 15px 0px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.surveyLink:hover {
  background-color: #f8e1d1;
  opacity: 40%;
  transform: scale(0.95);
}
img {
  display: block;
  border-bottom: solid 2px #f8e1d1;
}
span {
  vertical-align: bottom;
}
h3 {
  display: inline;
  font-size: 0.9em;
  margin-left: 10px;
}
.router-link-active.router-link-exact-active {
  background-color: #f8e1d1;
  border-left: solid #000000 2px;
}
</style>
