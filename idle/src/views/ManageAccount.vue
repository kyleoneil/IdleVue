<template>
  <v-container>
    <MgmtTable v-bind:data="account"></MgmtTable>
  </v-container>
</template>
<style scoped>
</style>
<script>
import MgmtTable from "../components/MgmtTable.vue";
export default {
  components: { MgmtTable },
  name: "ManageBusiness",
  data(){
      return{
          account: [
              {
                  id: "0001",
                  name: "Sample",
                  createdAt: "12/15/2020"
              }
          ]
      }
  },
  computed: {
    headers() {
      return [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name",
        },
        {
          text: "Calories",
          value: "calories",
        },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
      ];
    },
  },
};
</script>