<template>
  <v-container>
    <v-container
      rounded
      class="ma-2 pa-6 pt-2 mt-6 pb-0 mb-0 px-9"
      style="background: rgb(20, 118, 210)"
    >
      <v-row justify="center">
        <v-col sm="9">
          <h2 class="white--text text-h5">Business Management</h2>
        </v-col>
        <v-col sm="3">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                sm="2"
                v-bind="attrs"
                v-on="on"
                dense
                class="ml-15"
                rounded
              >
                Add Business
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Add Business</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-text-field
                    label="Name*"
                    hide-details
                    required
                  ></v-text-field>
                </v-container>
                <small class="ml-5">*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">
                  Close
                </v-btn>
                <v-btn color="blue darken-1" text @click="dialog = false">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
    <MgmtTable v-bind:data="data"> </MgmtTable>
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
      dialog: false,
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
            { text: "", value: "controls", sortable: false, align: "end" },
          ],
        },
      ],
    };
  },
};
</script>