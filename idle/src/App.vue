<template>

  <v-app>
    <div>
      <router-view></router-view>
    </div>
    <Navigation v-if=" this.$store.state.count==1"></Navigation>
    
   <v-main>
    </v-main>
  </v-app>

</template>

<script>
import Navigation from './components/Navigation.vue';


export default {
  name: 'App',
  components: {
    Navigation,
  },
  data: () => ({
  }),
  
};
</script>


              