<template>
  <v-container>
    <div class="my-6">
      <v-text-field
        v-model="search"
        label="Search"
        class="mx-4"
        prepend-inner-icon="mdi-magnify"
        outlined
        dense
        hide-details
      ></v-text-field>
    </div>
    <template>
      <div>
        <v-data-table
          :headers="data[0].headers"
          :items="data[0].business"
          item-key="id"
          class="elevation-1"
          :search="search"
          :custom-filter="filter"
        >
          <template v-slot:item.controls="props">
            <v-dialog v-model="dialog" persistent max-width="600px">
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
                <span class="headline">Edit Business</span>
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
            <v-btn
              color="red"
              small
              v-on:click="onButtonClick(props.item)"
              class="white--text ml-3 mr-7"
            >
              DELETE <v-icon small>mdi-delete-outline</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </div>
    </template>
  </v-container>
</template>
<script>
export default {
  name: "MgmtTable",
  data() {
    return {
      search: "",
      dialog: false,
    };
  },
  props: {
    data: {
      type: Array,
    },
  },
  methods: {
    filter(value, search) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value
          .toString()
          .toLocaleUpperCase()
          .indexOf(search.toLocaleUpperCase()) !== -1
      );
    },
  },
};
</script>