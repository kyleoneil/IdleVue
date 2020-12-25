<template>
  <v-container>
    <v-container
      rounded
      class="ma-2 pa-6 pt-2 mt-6 pb-0 mb-0 px-9"
      style="background: rgb(20, 118, 210)"
    >
      <v-row justify="center">
        <v-col sm="9">
          <slot name="headerTitle"></slot
          ><span class="white--text text-h5"> Management</span>
        </v-col>
        <v-col sm="3">
          <slot name="addBtn"></slot>
        </v-col>
      </v-row>
    </v-container>

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
            <v-btn
              color="amber darken-2"
              small
              class="white--text"
              v-on:click="editBtn(props.item)"
            >
              EDIT <v-icon small>mdi-pencil</v-icon>
            </v-btn>
            <slot name="editDialog"></slot>
            <v-btn
              color="red"
              small
              class="ml-3 white--text"
              v-on:click="deleteBtn(props.item)"
            >
              DELETE <v-icon small>mdi-delete-outline</v-icon>
            </v-btn>
            <v-btn
              v-if="showService==true"
              color="primary"
              small
              class="white--text ml-3 mr-7"
              v-on:click="serviceBtn(props.item)"
            >
              Service
            </v-btn>
            <slot name="serviceDialog"></slot>
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
      showService: false,
      role: null,
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
    deleteBtn: function (data) {
      this.$emit("deleteBtn", data);
    },
    editBtn: function (data) {
      this.$emit("editBtn", data);
    },
    serviceBtn: function (data) {
      this.$emit("serviceBtn", data);
    },
  },
  beforeMount(){
    this.showService = this.$store.state.showService;
    if(this.$store.state.role == "SUPER_ADMIN"){
      this.role = 1;
    }else if(this.$store.state.role =="BUSINESS_OWNER"){
      this.role = 2;
    }else if (this.$store.state.role=="BUSINESS_TELLER"){
      this.role = 3;
    } 
  }
};
</script>