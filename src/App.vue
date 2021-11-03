<template>
  <div id="app">
    <Navigation v-if="$store.state.username.toLowerCase() !== 'admin'"></Navigation>
<!--      <keep-alive include="Shop,BookDetail,ShoppingCart">-->
    <transition
        appear
        name="fade" mode="out-in">
      <keep-alive>
    <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Navigation from "./components/Navigation";
import 'animate.css';
export default {
  name: 'app',
  components: {
    Navigation,
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
