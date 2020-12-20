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
            <v-btn
              color="primary"
              class="px-10"
              rounded
              v-on:click="edit = false"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="service"
        fullscreen
        hide-overlay
        persistent
        transition="dialog-bottom-transition"
        scrollable
        slot="serviceBtn"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            small
            v-bind="attrs"
            v-on="on"
            class="white--text ml-3 mr-7"
          >
            Service
          </v-btn>
        </template>
        <v-card>
          <v-toolbar flat dark color="primary" max-height="68px">
            <v-toolbar-title>Services</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark v-on:click="service = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text class="pb-0">
            <template>
              <div>
                <v-data-table
                  :headers="serviceHeaders"
                  :items="services"
                  item-key="id"
                  class="elevation-1"
                  :search="search"
                  :custom-filter="filter"
                >
                  <template v-slot:item.controls="props">
                    <slot name="editBtn"></slot>
                    <v-btn
                      color="red"
                      small
                      class="ml-3 white--text"
                      v-on:click="onButtonClick(props.item)"
                    >
                      DELETE <v-icon small>mdi-delete-outline</v-icon>
                    </v-btn>
                    <slot name="serviceBtn"></slot>
                  </template>
                </v-data-table>
              </div>
            </template>
          </v-card-text>
          <v-card-actions class="pr-8 pb-8"> </v-card-actions>
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
      service: false,
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
      services : [
        {
          name: "hi"
        }
      ],
      serviceHeaders: [
        { text: "Service", value: "name" },
        { text: "", value: "controls", sortable: false, align: "end" },
      ]
    };
  },
};
</script>