<template>
  <v-container>
    <MgmtTable v-bind:data="data" v-on:deleteBtn="deleteBranchBtn($event)" v-on:editBtn="editBranchBtn($event)" v-on:serviceBtn="serviceBranchBtn($event)">
      <span class="white--text text-h5" slot="headerTitle">Branch</span>
      <v-dialog v-model="addBranch" persistent max-width="600px" slot="addBtn">
        <template v-slot:activator="{ on, attrs }">
          <v-btn sm="2" v-bind="attrs" v-on="on" dense class="ml-15" v-on:click="resetValues()" rounded>
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
            <v-btn rounded class="px-8" v-on:click="addBranch = false">
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              class="px-10"
              rounded
              v-on:click="addBranchBtn(input)"
            >
              Add
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="editBranch"
        persistent
        max-width="600px"
        slot="editDialog"
        :retain-focus="false"
      >
        <v-card>
          <v-card-title>
            <span class="headline pl-3 pt-3">Edit Branch</span>
          </v-card-title>
          <v-card-text class="pb-0">
            <v-container>
              <v-text-field
                label="Name*"
                v-model="input.name"
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
            <v-btn rounded class="px-8" v-on:click="editBranch = false">
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              class="px-10"
              rounded
              v-on:click="saveBranch(input)"
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
        :retain-focus="false"
        slot="serviceDialog"
      >
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
              <div class="ma-10 mx-15">
                <v-dialog
                  v-model="addService"
                  persistent
                  max-width="600px"
                  :retain-focus="false"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      sm="2"
                      v-bind="attrs"
                      v-on="on"
                      dense
                      class="mb-5"
                      rounded
                      color="primary"
                      v-on:click="resetValues()"
                    >
                      Add Service
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline pl-3 pt-3">Add Service</span>
                    </v-card-title>
                    <v-card-text class="pb-0">
                      <v-container>
                        <v-text-field
                          label="Name*"
                          v-model="inputService"
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
                      <v-btn
                        rounded
                        class="px-8"
                        v-on:click="addService = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        color="primary"
                        class="px-10"
                        rounded
                        v-on:click="addServiceBtn(inputService)"
                      >
                        Add
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-data-table
                  :headers="serviceHeaders"
                  :items="services"
                  item-key="id"
                  class="elevation-1"
                >
                  <template v-slot:item.controls="props">
                    <v-dialog
                      v-model="editService"
                      persistent
                      max-width="600px"
                      :retain-focus="false"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="amber darken-2"
                          small
                          v-bind="attrs"
                          v-on="on"
                          class="white--text"
                          v-on:click="editServiceBtn(props.item)"
                        >
                          EDIT <v-icon small>mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="headline pl-3 pt-3">Edit Service</span>
                        </v-card-title>
                        <v-card-text class="pb-0">
                          <v-container>
                            <v-text-field
                              label="Name*"
                              v-model="inputService"
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
                          <v-btn
                            rounded
                            class="px-8"
                            v-on:click="editService = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            color="primary"
                            class="px-10"
                            rounded
                            v-on:click="editService = false"
                          >
                            Save
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-btn
                      color="red"
                      small
                      class="ml-3 white--text"
                      v-on:click="deleteServiceBtn(props.item)"
                    >
                      DELETE <v-icon small>mdi-delete-outline</v-icon>
                    </v-btn>
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
import axios from "axios";

export default {
  components: { MgmtTable },
  name: "ManageBranch",
  data() {
    return {
      input: '',
      addBranch: false,
      editBranch: false,
      editService: false,
      addService: false,
      service: false,
      inputService: '',
      businessId: '',
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
      services: [
        {
          id: "0001",
          name: "hi",
        },
      ],
      serviceHeaders: [
        { text: "Id", value: "id" },
        { text: "Service", value: "name" },
        { text: "", value: "controls", sortable: false, align: "end" },
      ],
    };
  },
  methods: {
    addBranchBtn: function (input) {
      this.$store.state.showService = true;
      const data = this.$store.state.token;
        let head = {
          headers: {
            Authorization: data,
          },
        };
      axios
        .get("http://localhost:3000/api/businesses/"+this.businessId, head)
        .then((res) => {
          var addData = {
            branchname: '',
            businessname: ''
          }
          addData.branchname = input;
          addData.businessname = res.data.name;
          axios
            .post("http://localhost:3000/api/branches", addData, head)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error.response.data.message);
            });
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
      this.addBranch = false;
    },
    editBranchBtn: function (data) {
      this.editBranch = true;
      this.input = {
        id: '',
        name: '',
      };
      this.input.id = data.id;
      this.input.name = data.name;
    },
    saveBranch: function (input) {
      this.$store.state.showService = true;
      const data = this.$store.state.token;
        let head = {
          headers: {
            Authorization: data,
          },
        };
      axios
        .get("http://localhost:3000/api/businesses/"+this.businessId, head)
        .then((res) => {
          var addData = {
            branchname: '',
            businessname: '',
            businessId: '',
          }
          addData.branchname = input.name;
          addData.businessname = res.data.name;
          addData.businessId = this.businessId;

          axios
            .put("http://localhost:3000/api/branches/"+input.id, addData, head)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error.response.data.message);
            });
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
      this.editBranch = false;
    },
    deleteBranchBtn: function(data){
      console.log(data);
    },
    serviceBranchBtn: function(data){
      this.service = true;
      console.log(data);
    },
    addServiceBtn: function(inputService){
      var name = inputService;
      console.log(name);
      this.addService = false;
    },
    editServiceBtn: function (data) {
      this.editService = true;
      this.inputService = data.name;
      console.log(data);
    },
    deleteServiceBtn: function(data){
      console.log(data);
    },
    resetValues: function(){
      this.input = '';
      this.inputService = '';
    }
  },
  beforeMount(){
    this.$store.state.showService = true;
    this.businessId = this.$store.state.businessid;
    const data = this.$store.state.token;
      let head = {
        headers: {
          Authorization: data,
        },
      };
      axios
        .get("http://localhost:3000/api/branches?businessId="+this.businessId, head)
        .then((res) => {
          var catcher = res.data.data;
          for(var i = 0; i < catcher.length; i++){
            var addBranchData = {
              id: '',
              name: '',
              createdAt: '',
            };
            addBranchData.id = catcher[i].id;
            addBranchData.name = catcher[i].name;
            var createdDate = catcher[i].createdAt.split("-")[2];
            addBranchData.createdAt =
              catcher[i].createdAt.split("-")[1] +
              "/" +
              createdDate.split("T")[0] + 
              "/" +
              catcher[i].createdAt.split("-")[0];
            this.data[0].business.push(addBranchData);
          }
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
  }
};
</script>