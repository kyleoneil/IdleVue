<template>
  <v-container>
    <MgmtTable v-bind:data="data"></MgmtTable>
  </v-container>
</template>
<style scoped>
</style>
<script>
import MgmtTable from "../components/MgmtTable.vue";
export default {
  components: { MgmtTable },
  name: "ManageBusiness",
  data() {
    return {
      data: [
        {
          business: [
            {
              id: "0001",
              name: "Sample",
              createdAt: "12/15/2020",
            },
            {
              id: "0002",
              name: "Sample2",
              createdAt: "12/15/2020",
            },
          ],
          headers: [
            {
              text: "ID",
              align: "start",
              value: "id",
            },
            { text: "Name", value: "name" },
            { text: "Date Created", value: "createdAt" },
            { text: "", value: "controls", sortable: false, align: "end"},
          ],
        },
      ],
    };
  },
};
</script>