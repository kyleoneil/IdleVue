<template>

  <v-navigation-drawer color="rgb(20, 118, 210)" permanent app>
    <v-list-item>
      <v-list-item-content class="mt-2 ml-2">
        <v-list-item-title class="title white--text"> IDLE </v-list-item-title>
        <v-list-item-subtitle></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>

    <v-list dense nav>

      <v-list-item-group color="blue">
<!-- 
        <v-list-item class="white--text">
          <v-list-item-icon class="ma-0 mt-2 mr-2">
            <v-icon small style="color: #d1e7f9">mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <router-link to="/dashboard" style="color: #d1e7f9"
              >Dashboard</router-link
            >
          </v-list-item-content> 
        </v-list-item> -->

        <router-link v-if="role == 3" to="/queueList" >
        <v-list-item class="white--text">
          <v-list-item-icon class="ma-0 mt-2 mr-2">
            <v-icon small style="color: #d1e7f9">mdi-human-queue</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="color: #d1e7f9">
              Queue
          </v-list-item-content>
        </v-list-item>
        </router-link>

        <router-link to="/branch" v-if="role==2">
        <v-list-item class="white--text">
          <v-list-item-icon class="ma-0 mt-2 mr-2">
            <v-icon small style="color: #d1e7f9">mdi-source-branch</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="color: #d1e7f9">
              Manage Branch
          </v-list-item-content>
        </v-list-item>
        </router-link>

        <router-link to="/account" v-if="role==2 || role==1">
        <v-list-item class="white--text">
          <v-list-item-icon class="ma-0 mt-2 mr-2">
            <v-icon small style="color: #d1e7f9">mdi-account-group</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="color: #d1e7f9">
              Manage Account
          </v-list-item-content>
        </v-list-item>
        </router-link>

        <router-link to="/business" v-if="role==1">
        <v-list-item class="white--text">
          <v-list-item-icon class="ma-0 mt-2 mr-2">
            <v-icon small style="color: #d1e7f9">mdi-domain</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="color: #d1e7f9">
              Manage Business
          </v-list-item-content>
        </v-list-item>
        </router-link>
      </v-list-item-group>
    </v-list>
    <template v-slot:append>
      <div class="pa-2 ma-2 d-flex flex-row-reverse">
        <v-btn depressed small rounded color="primary">
          Logout
          <v-icon right small> mdi-logout </v-icon>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
<style scoped>
.list-item {
  font-size: 14px;
}
a {
  text-decoration: none;
}
</style>
<script>
export default {
  name: "AdminNavBar",
  data() {
    return {
      drawer: null,
      role: null,
    };
  },
  methods: {

  },
   beforeMount(){
      if(this.$store.state.role == "SUPER_ADMIN"){
        this.role = 1;
      }else if(this.$store.state.role =="ADMIN"){
        this.role = 2;
      }else if (this.$store.state.role=="TELLER"){
        this.role = 3;
      }
    }
};
</script>