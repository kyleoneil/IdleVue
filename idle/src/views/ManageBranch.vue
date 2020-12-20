<template>
  <v-container>
    <MgmtTable v-bind:data="data">
      <span class="white--text text-h5" slot="headerTitle">Branch</span>
      <v-dialog v-model="add" persistent max-width="600px" slot="addBtn">
        <template v-slot:activator="{ on, attrs }">
          <v-btn sm="2" v-bind="attrs" v-on="on" dense class="ml-15" rounded>
            Add Branch
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline pl-3 pt-3">Add Branch</span>
          </v-card-title>
          <v-card-text class="pb-0">
            <v-container>
              <v-text-field
                label="Name*"
                hide-details
                outlined
                dense
                required
              ></v-text-field>
            </v-container>
            <small class="ml-5">*indicates required field</small>
          </v-card-text>
          <v-card-actions class="pr-8 pb-8">
            <v-spacer></v-spacer>
            <v-btn rounded class="px-8" v-on:click="add = false">
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              class="px-10"
              rounded
              v-on:click="add = false"
            >
              Add
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="edit" persistent max-width="600px" slot="editBtn">
              <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="amber darken-2"
              small
              v-bind="attrs"
                v-on="on"
              class="white--text"
            >
              EDIT <v-icon small>mdi-pencil</v-icon>
            </v-btn>
             </template>
            <v-card>
              <v-card-title>
                <span class="headline pl-3 pt-3">Edit Branch</span>
              </v-card-title>
              <v-card-text class="pb-0">
                <v-container>
                  <v-text-field
                    label="Name*"
                    hide-details
                    outlined
                    dense
                    required
                  ></v-text-field>
                </v-container>
                <small class="ml-5">*indicates required field</small>
              </v-card-text>
              <v-card-actions class="pr-8 pb-8">
                <v-spacer></v-spacer>
                <v-btn rounded class="px-8" v-on:click="edit = false">
                  Cancel
                </v-btn>
                <v-btn color="primary" class="px-10" rounded v-on:click="edit = false">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
    </MgmtTable>
  </v-container>
</template>

<style scoped>
</style>
<script>
import MgmtTable from "../components/MgmtTable.vue";
export default {
  components: { MgmtTable },
  name: "ManageBranch",
  data() {
    return {
      add: false,
      edit: false,
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