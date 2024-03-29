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
            <v-btn icon dark v-on:click="resetService()">
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
                              v-model="inputService.name"
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
                            v-on:click="saveService(inputService)"
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
      inputService: [],
      serviceBranchName: '',
      serviceBranchId: '',
      businessId: '',
      businessname: '',
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
      services: [ ],
      serviceHeaders: [
        { text: "Id", value: "id" },
        { text: "Service", value: "name" },
        { text: "", value: "controls", sortable: false, align: "end" },
      ],
    };
  },
  methods: {
    addBranchBtn: function (input) {
      const data = this.$store.state.token;
        let head = {
          headers: {
            Authorization: data,
          },
        };
      var addData = {
        branchname: '',
        businessname: ''
      }
      addData.branchname = input;
      addData.businessname = this.businessname;
      axios
        .post("http://localhost:3000/api/branches", addData, head)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
      this.addBranch = false;
      this.data[0].business = []
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
      const data = this.$store.state.token;
        let head = {
          headers: {
            Authorization: data,
          },
        };
      var addData = {
        branchname: '',
        businessname: '',
        businessId: '',
      }
      addData.branchname = input.name;
      addData.businessname = this.businessname;
      addData.businessId = this.businessId;

      axios
        .put("http://localhost:3000/api/branches/"+input.id, addData, head)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        })
      this.editBranch = false;
      this.data[0].business = []
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
    },
    deleteBranchBtn: function(input){
      const data = this.$store.state.token;
        let head = {
          headers: {
            Authorization: data,
          },
        };
      axios
        .delete("http://localhost:3000/api/branches/"+input.id, head)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
        this.data[0].business = []
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
    },
    serviceBranchBtn: function(branch){
      this.service = true;
      this.$store.state.showService = true;
      const data = this.$store.state.token;
        let head = {
          headers: {
            Authorization: data,
          },
        };
      axios
        .get("http://localhost:3000/api/services?branchId="+branch.id, head)
        .then((res) => {
          var catcher = res.data.data;
          for(var i = 0; i < catcher.length; i++){
            var addServiceData = {
              id: '',
              name: '',
            };
            addServiceData.id = catcher[i].id;
            addServiceData.name = catcher[i].name;
            this.services.push(addServiceData);
          }
          this.serviceBranchName = branch.name;
          this.serviceBranchId = branch.id;
        })  
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
    addServiceBtn: function(inputService){
      const data = this.$store.state.token;
        let head = {
          headers: {
            Authorization: data,
          },
        };
      var addData = {
        servicename: '',
        branchname: '',
      }
      addData.servicename = inputService;
      addData.branchname = this.serviceBranchName;
      console.log(addData);
      axios
        .post("http://localhost:3000/api/services", addData, head)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
      this.addService = false;

      this.services = [];
      this.$store.state.showService = true;
      axios
        .get("http://localhost:3000/api/services?branchId="+this.serviceBranchId, head)
        .then((res) => {
          var catcher = res.data.data;
          for(var i = 0; i < catcher.length; i++){
            var addServiceData = {
              id: '',
              name: '',
            };
            addServiceData.id = catcher[i].id;
            addServiceData.name = catcher[i].name;
            this.services.push(addServiceData);
          }
        })  
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
    editServiceBtn: function (data) {
      this.editService = true;
      this.inputService = {
        id: '',
        name: ''
      }
      this.inputService.id = data.id;
      this.inputService.name = data.name;
    },
    saveService: function (input) {
      const data = this.$store.state.token;
        let head = {
          headers: {
            Authorization: data,
          },
        };
      var addData = {
        servicename: '',
        branchname: '',
        branchId: '',
      }
      addData.servicename = input.name;
      addData.branchname = this.serviceBranchName;
      addData.branchId = this.serviceBranchId;
      console.log(addData);
      axios
        .put("http://localhost:3000/api/services/"+input.id, addData, head)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        })
      this.editService = false;
      this.services = [];
      this.$store.state.showService = true;
      axios
        .get("http://localhost:3000/api/services?branchId="+this.serviceBranchId, head)
        .then((res) => {
          var catcher = res.data.data;
          for(var i = 0; i < catcher.length; i++){
            var addServiceData = {
              id: '',
              name: '',
            };
            addServiceData.id = catcher[i].id;
            addServiceData.name = catcher[i].name;
            this.services.push(addServiceData);
          }
        })  
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
    deleteServiceBtn: function(input){
      const data = this.$store.state.token;
        let head = {
          headers: {
            Authorization: data,
          },
        };
      axios
        .delete("http://localhost:3000/api/services/"+input.id, head)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
      this.services = [];
      this.$store.state.showService = true;
      axios
        .get("http://localhost:3000/api/services?branchId="+this.serviceBranchId, head)
        .then((res) => {
          var catcher = res.data.data;
          for(var i = 0; i < catcher.length; i++){
            var addServiceData = {
              id: '',
              name: '',
            };
            addServiceData.id = catcher[i].id;
            addServiceData.name = catcher[i].name;
            this.services.push(addServiceData);
          }
        })  
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
    resetValues: function(){
      this.input = '';
      this.inputService = '';
    },
    resetService: function(){
      this.services = [];
      this.service = false;
      this.serviceBranchName = '';
      this.serviceBranchId = '';
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
    axios
      .get("http://localhost:3000/api/businesses/"+this.businessId, head)
      .then((res) => {
        this.businessname = res.data.name;
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }
};
</script>