<template>
  <v-container>
    <MgmtTable v-bind:data="data" v-on:editBtn="editBusiness($event)" v-on:deleteBtn="deleteBusiness($event)">
      <span class="white--text text-h5" slot="headerTitle">Business</span>
      <v-dialog v-model="add" persistent max-width="600px" slot="addBtn">
        <template v-slot:activator="{ on, attrs }">
          <v-btn sm="2" v-bind="attrs" v-on="on" dense class="ml-15" v-on:click="resetValues()" rounded>
            Add Business
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline pl-3 pt-3">Add Business</span>
          </v-card-title>
          <v-card-text class="pb-0">
            <v-container>
              <v-form>
                <v-text-field
                  label="Name*"
                  v-model="input"
                  hide-details
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-form>
            </v-container>
            <small class="ml-5">*indicates required field</small>
          </v-card-text>
          <v-card-actions class="pr-8 pb-8">
            <v-spacer></v-spacer>
            <v-btn rounded v-on:click="add = false" class="px-8">
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              class="px-10"
              rounded
              v-on:click="addBusiness(input)"
            >
              Add
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog 
       v-model="edit"
       persistent max-width="600px"
       slot="editDialog"
       :retain-focus="false">
        <v-card>
          <v-card-title>
            <span class="headline pl-3 pt-3">Edit Business</span>
          </v-card-title>
          <v-card-text class="pb-0">
            <v-container>
              <v-text-field
                label="Name*"
                v-model="input"
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
    </MgmtTable>
  </v-container>
</template>

<style scoped>
</style>
<script>
import MgmtTable from "../components/MgmtTable.vue";
import axios from "axios";

export default {
  components: { MgmtTable },
  name: "ManageBusiness",
  data() {
    return {
      add: false,
      edit: false,
      input: "",
      data: [
        {
          business: [],
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
  methods: {
    addBusiness: function (input) {
      var name = input;
      console.log(name);
      this.add = false;
    },
    editBusiness: function (data) {
      this.edit = true;
      this.input = data.name;
      console.log(data);
    },
    deleteBusiness: function(data){
      console.log(data);
    },
    resetValues: function(){
      this.input = '';
    }
  },
  beforeMount(){
    this.$store.state.showService = true;
    const data = this.$store.state.token;
    let head = {
      headers: {
        Authorization: data,
      },
    };
    axios
      .get("http://localhost:3000/api/businesses", head)
      .then((res) => {
        var name;
        var catcher = res.data.data;
        for (var i = 0; i < catcher.length; i++) {
          const addData = {
            id: "",
            name: "",
            createdAt: "",
          };
          addData.id = catcher[i].id;
          name = catcher[i].name;
          addData.name = name;
          var createdDate = catcher[i].createdAt.split("-")[2];
          addData.createdAt =
            catcher[i].createdAt.split("-")[1] +
            "/" +
            createdDate.split("T")[0] + 
            "/" +
            catcher[i].createdAt.split("-")[0];
          this.data[0].business.push(addData);
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }
};
</script>