<template>
  <v-container>
    <MgmtTable
      v-bind:data="data"
      v-on:deleteBtn="deleteAccount($event)"
      v-on:editBtn="editAccount($event)"
    >
      <span class="white--text text-h5" slot="headerTitle">Account</span>
      <v-dialog v-model="add" persistent max-width="600px" slot="addBtn">
        <template v-slot:activator="{ on, attrs }">
          <v-btn sm="2" v-bind="attrs" v-on="on" dense class="ml-15" v-on:click="resetValues()" rounded>
            Add Account
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline pl-3 pt-3">Add Account</span>
          </v-card-title>
          <v-card-text class="pb-0">
            <v-container>
              <v-form>
                <v-row>
                  <v-col sm="6" class="py-0 pr-2 ma-0">
                    <v-text-field
                      label="First Name*"
                      v-model="input.firstname"
                      hide-details
                      outlined
                      dense
                      required
                      prepend-icon="mdi-account"
                      class="mb-5"
                    ></v-text-field>
                  </v-col>
                  <v-col sm="6" class="py-0 pl-1 ma-0">
                    <v-text-field
                      label="Last Name*"
                      v-model="input.lastname"
                      hide-details
                      outlined
                      dense
                      required
                      class="mb-5"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <template v-if="role==2">
                <v-select
                  :items="branches"
                  v-model="input.branch"
                  label="Branch*"
                  outlined
                  hide-details
                  class="mb-2"
                  prepend-icon="mdi-source-branch"
                  dense
                ></v-select>
                </template>
                <template v-else-if="role==1">
                  <v-select
                  :items="userType"
                  v-model="input.roleId"
                  label="User Type*"
                  outlined
                  hide-details
                  class="mb-2"
                  prepend-icon="mdi-account-settings"
                  dense
                ></v-select>
                </template>
                <v-row>
                  <v-col sm="5">
                    <v-select
                      label="Month*"
                      v-model="input.month"
                      v-bind:items="months"
                      item-text="text"
                      item-value="value"
                      outlined
                      hide-details
                      class="mb-2"
                      dense
                      prepend-icon="mdi-cake-variant"
                    ></v-select>
                  </v-col>
                  <v-col sm="3">
                    <v-select
                      v-bind:items="days"
                      v-model="input.day"
                      item-text="text"
                      item-value="value"
                      label="Day*"
                      outlined
                      hide-details
                      class="mb-2"
                      dense
                    ></v-select>
                  </v-col>
                  <v-col sm="4">
                    <v-select
                      v-bind:items="years"
                      v-model="input.year"
                      item-text="text"
                      item-value="value"
                      label="Year*"
                      outlined
                      hide-details
                      class="mb-2"
                      dense
                    ></v-select>
                  </v-col>
                </v-row>

                <v-text-field
                  label="Email*"
                  v-model="input.email"
                  hide-details
                  outlined
                  dense
                  required
                  prepend-icon="mdi-email"
                  class="mb-5"
                ></v-text-field>
                <v-text-field
                  label="Password*"
                  v-model="input.password"
                  hide-details
                  outlined
                  dense
                  prepend-icon="mdi-lock"
                  required
                ></v-text-field>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions class="pr-8 pt-5 pb-8">
            <v-spacer></v-spacer>
            <v-btn rounded class="px-8" v-on:click="add = false">
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              class="px-10"
              rounded
              v-on:click="addAccount(input)"
            >
              Add
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="edit"
        persistent
        max-width="600px"
        :retain-focus="false"
        slot="editDialog"
      >
        <v-card>
          <v-card-title>
            <span class="headline pl-3 pt-3">Edit Account</span>
          </v-card-title>
          <v-card-text class="pb-0">
            <v-container>
              <v-form>
                <v-row>
                  <v-col sm="6" class="py-0 pr-2 ma-0">
                    <v-text-field
                      label="First Name*"
                      v-model="input.firstname"
                      hide-details
                      outlined
                      dense
                      required
                      prepend-icon="mdi-account"
                      class="mb-5"
                    ></v-text-field>
                  </v-col>
                  <v-col sm="6" class="py-0 pl-1 ma-0">
                    <v-text-field
                      label="Last Name*"
                      v-model="input.lastname"
                      hide-details
                      outlined
                      dense
                      required
                      class="mb-5"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <template v-if="role==2">
                <v-select
                  :items="branches"
                  v-model="input.branch"
                  item-text="text"
                  item-value="value"
                  label="Branch*"
                  outlined
                  hide-details
                  class="mb-2"
                  prepend-icon="mdi-source-branch"
                  dense
                ></v-select>
                </template>
                <template v-else-if="role==1">
                  <v-select
                  :items="userType"
                  v-model="input.roleId"
                  label="User Type*"
                  outlined
                  hide-details
                  class="mb-2"
                  prepend-icon="mdi-account-settings"
                  dense
                ></v-select>
                </template>
                <v-row>
                  <v-col sm="5">
                    <v-select
                      label="Month*"
                      v-model="input.month"
                      v-bind:items="months"
                      item-text="text"
                      item-value="value"
                      outlined
                      hide-details
                      class="mb-2"
                      dense
                      prepend-icon="mdi-cake-variant"
                    ></v-select>
                  </v-col>
                  <v-col sm="3">
                    <v-select
                      v-bind:items="days"
                      v-model="input.day"
                      item-text="text"
                      item-value="value"
                      label="Day*"
                      outlined
                      hide-details
                      class="mb-2"
                      dense
                    ></v-select>
                  </v-col>
                  <v-col sm="4">
                    <v-select
                      v-bind:items="years"
                      v-model="input.year"
                      item-text="text"
                      item-value="value"
                      label="Year*"
                      outlined
                      hide-details
                      class="mb-2"
                      dense
                    ></v-select>
                  </v-col>
                </v-row>

                <v-text-field
                  label="Email*"
                  v-model="input.email"
                  hide-details
                  outlined
                  dense
                  required
                  prepend-icon="mdi-email"
                  class="mb-5"
                ></v-text-field>
              </v-form>
            </v-container>
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
              v-on:click="saveAccount(input)"
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
  name: "ManageAccount",
  data() {
    return {
      add: false,
      edit: false,
      businessId: '',
      role: '',
      userType: [
        { text: "Business Owner", value: '2'},
        { text: "Business Teller", value: '3'},
        { text: "Customer", value: '4'},
      ],
      input: {
        id: "",
        firstname: "",
        lastname: "",
        branch: "",
        branch_id: "",
        business_id: "",
        roleName: "",
        roleId: "",
        month: "",
        day: "",
        year: "",
        birthdate: "",
        email: "",
        password: "",
      },
      data: [
        {
          business: [],
          headers: [],
        },
      ],
      branches: [],
      months: [
        { text: "January", value: "01" },
        { text: "February", value: "02" },
        { text: "March", value: "03" },
        { text: "April", value: "04" },
        { text: "May", value: "05" },
        { text: "June", value: "06" },
        { text: "July", value: "07" },
        { text: "August", value: "08" },
        { text: "September", value: "09" },
        { text: "October", value: "10" },
        { text: "November", value: "11" },
        { text: "December", value: "12" },
      ],
      days: [],
      years: [],
    };
  },
  methods: {
    addAccount: function (input) {
      const data = this.$store.state.token;
      let head = {
        headers: {
          Authorization: data,
        },
      };

      var date = input.month + "/" + input.day + "/" + input.year;
      if(this.role == 2){
        input.branch_id = input.branch;
        input.roleId == 3;
      }
      if(input.roleId == 2){
        input.roleName = "BUSINESS_OWNER";
      } else if(input.roleId == 3){
        input.roleName = "BUSINESS_TELLER";
      } else {
        input.roleName = "CUSTOMER";
      }
      var addData;

      if(this.role == 2){
        addData = {
          firstname: input.firstname,
          lastname: input.lastname,
          email: input.email,
          password: input.password,
          birthdate: date,
          branch_id: input.branch,
        }
      } else {
        if(input.roleId == 3 || input.roleId == 2){
          addData = {
            firstname: input.firstname,
            lastname: input.lastname,
            email: input.email,
            password: input.password,
            birthdate: date,
            roleName: input.roleName,
            business_id: '1'
          }
        } else {
          addData = {
            firstname: input.firstname,
            lastname: input.lastname,
            email: input.email,
            password: input.password,
            birthdate: date,
            roleName: input.roleName,
          }
        }
      }
      if(this.role == 1){
        axios
        .post("http://localhost:3000/api/users", addData)
        .then((data) => {
          console.log(data.data);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
      } else {
        axios
        .post("http://localhost:3000/api/businesses/"+this.businessId+"/tellers", addData, head)
        .then((data) => {
          console.log(data.data);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
      }
      this.add = false;
      this.data[0].business = [];

      if(this.role == 2){
      this.data[0].headers = [
        { text: "ID", value: "id", align: "start" },
        { text: "Name", value: "name" },
        { text: "Branch", value: "branch" },
        { text: "Birthday", value: "birthdate" },
        { text: "Email", value: "email" },
        { text: "Date Created", value: "createdAt" },
        { text: "", value: "controls", sortable: false, align: "end" },
      ]
      
      axios
      .get("http://localhost:3000/api/businesses/"+this.businessId+"/tellers", head)
      .then((res) => {
        var name, bday;
        var catcher = res.data.data;
        for (var i = 0; i < catcher.length; i++) {
          console.log(catcher);
          const addData = {
            id: "",
            name: "",
            branch: "",
            birthdate: "",
            email: "",
            createdAt: "",
          };
          addData.id = catcher[i].id;
          name =
            catcher[i].name.split(", ")[1] +
            " " +
            catcher[i].name.split(", ")[0];
          bday =
            catcher[i].birthdate.split("-")[1] +
            "/" +
            catcher[i].birthdate.split("-")[2] +
            "/" +
            catcher[i].birthdate.split("-")[0];
          addData.name = name;
          addData.email = catcher[i].email;
          addData.birthdate = bday;
          addData.email = catcher[i].email;
          var createdDate = catcher[i].createdAt.split("-")[2];
          addData.createdAt =
            catcher[i].createdAt.split("-")[1] +
            "/" +
            createdDate.split("T")[0] + 
            "/" +
            catcher[i].createdAt.split("-")[0];
            addData.branch = catcher[i].BranchId;
          this.data[0].business.push(addData);
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
    } else if (this.role == 1) {
      this.data[0].headers = [
        { text: "ID", value: "id", align: "start" },
        { text: "Name", value: "name" },
        { text: "User Type", value: "role"},
        { text: "Birthday", value: "birthdate" },
        { text: "Email", value: "email" },
        { text: "Date Created", value: "createdAt" },
        { text: "", value: "controls", sortable: false, align: "end" },
      ]

      axios
      .get("http://localhost:3000/api/users", head)
      .then((res) => {
        var name, bday;
        var catcher = res.data.data;
        for (var i = 0; i < catcher.length; i++) {
          const addData = {
            id: "",
            name: "",
            role: "",
            birthdate: "",
            email: "",
            createdAt: "",
          };
          addData.id = catcher[i].id;
          name =
            catcher[i].name.split(", ")[1] +
            " " +
            catcher[i].name.split(", ")[0];
          bday =
            catcher[i].birthdate.split("-")[1] +
            "/" +
            catcher[i].birthdate.split("-")[2] +
            "/" +
            catcher[i].birthdate.split("-")[0];
          addData.name = name;
          addData.email = catcher[i].email;
          addData.birthdate = bday;
          addData.email = catcher[i].email;
          var createdDate = catcher[i].createdAt.split("-")[2];
          addData.createdAt =
            catcher[i].createdAt.split("-")[1] +
            "/" +
            createdDate.split("T")[0] + 
            "/" +
            catcher[i].createdAt.split("-")[0];
          if(catcher[i].RoleId == 1){
            addData.role = "Super Admin"
          } else if(catcher[i].RoleId == 2){
            addData.role = "Business Owner"
          } else if(catcher[i].RoleId == 3){
            addData.role = "Business Teller"
          } else {
            addData.role = "Customer"
          }

          this.data[0].business.push(addData);
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
    }
    },
    deleteAccount: function (input) {
      console.log(data);
      const data = this.$store.state.token;
      let head = {
        headers: {
          Authorization: data,
        },
      };
      axios
        .delete("http://localhost:3000/api/users/"+input.id, head)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });

      this.data[0].business = [];

      if(this.role == 2){
      this.data[0].headers = [
        { text: "ID", value: "id", align: "start" },
        { text: "Name", value: "name" },
        { text: "Branch", value: "branch" },
        { text: "Birthday", value: "birthdate" },
        { text: "Email", value: "email" },
        { text: "Date Created", value: "createdAt" },
        { text: "", value: "controls", sortable: false, align: "end" },
      ]
      
      axios
      .get("http://localhost:3000/api/businesses/"+this.businessId+"/tellers", head)
      .then((res) => {
        var name, bday;
        var catcher = res.data.data;
        for (var i = 0; i < catcher.length; i++) {
          console.log(catcher);
          const addData = {
            id: "",
            name: "",
            branch: "",
            birthdate: "",
            email: "",
            createdAt: "",
          };
          addData.id = catcher[i].id;
          name =
            catcher[i].name.split(", ")[1] +
            " " +
            catcher[i].name.split(", ")[0];
          bday =
            catcher[i].birthdate.split("-")[1] +
            "/" +
            catcher[i].birthdate.split("-")[2] +
            "/" +
            catcher[i].birthdate.split("-")[0];
          addData.name = name;
          addData.email = catcher[i].email;
          addData.birthdate = bday;
          addData.email = catcher[i].email;
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
    } else if (this.role == 1) {
      this.data[0].headers = [
        { text: "ID", value: "id", align: "start" },
        { text: "Name", value: "name" },
        { text: "User Type", value: "role"},
        { text: "Birthday", value: "birthdate" },
        { text: "Email", value: "email" },
        { text: "Date Created", value: "createdAt" },
        { text: "", value: "controls", sortable: false, align: "end" },
      ]

      axios
      .get("http://localhost:3000/api/users", head)
      .then((res) => {
        var name, bday;
        var catcher = res.data.data;
        for (var i = 0; i < catcher.length; i++) {
          const addData = {
            id: "",
            name: "",
            role: "",
            birthdate: "",
            email: "",
            createdAt: "",
          };
          addData.id = catcher[i].id;
          name =
            catcher[i].name.split(", ")[1] +
            " " +
            catcher[i].name.split(", ")[0];
          bday =
            catcher[i].birthdate.split("-")[1] +
            "/" +
            catcher[i].birthdate.split("-")[2] +
            "/" +
            catcher[i].birthdate.split("-")[0];
          addData.name = name;
          addData.email = catcher[i].email;
          addData.birthdate = bday;
          addData.email = catcher[i].email;
          var createdDate = catcher[i].createdAt.split("-")[2];
          addData.createdAt =
            catcher[i].createdAt.split("-")[1] +
            "/" +
            createdDate.split("T")[0] + 
            "/" +
            catcher[i].createdAt.split("-")[0];
          if(catcher[i].RoleId == 1){
            addData.role = "Super Admin"
          } else if(catcher[i].RoleId == 2){
            addData.role = "Business Owner"
          } else if(catcher[i].RoleId == 3){
            addData.role = "Business Teller"
          } else {
            addData.role = "Customer"
          }

          this.data[0].business.push(addData);
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
    }
    },
    editAccount: function (data) {
      this.edit = true;
      this.input.id = data.id;
      this.input.firstname = data.name.split(" ")[0];
      this.input.lastname = data.name.split(" ")[1];
      this.input.month = data.birthdate.split("/")[0];
      this.input.day = data.birthdate.split("/")[1];
      this.input.year = data.birthdate.split("/")[2];
      this.input.branch = String(data.branch);
      console.log(this.input.branch);
      this.input.email = data.email;
      if(this.role == 1){
        if(data.role == "Business Owner"){
          this.input.roleId = "2"
        } else if(data.role == "Business Teller"){
          this.input.roleId = "3"
        } else if(data.role == "Customer"){
          this.input.roleId = "4"
        }
      }
    },
    saveAccount: function(input){
      const data = this.$store.state.token;
      let head = {
        headers: {
          Authorization: data,
        },
      };
      var date = input.month + "/" + input.day + "/" + input.year;
      var addData;
      if(this.role == 1){
        addData = {
          firstname: input.firstname,
          lastname: input.lastname,
          email: input.email,
          birthdate: date,
          roleName: input.roleName,
          business_id: '1'
        }
        console.log("Super");
      } else {
        addData = {
          firstname: input.firstname,
          lastname: input.lastname,
          email: input.email,
          birthdate: date,
          business_id: this.businessId,
          branch_id: input.branch,
        }
        console.log("admin");
      }
      console.log(addData);
      axios
        .put("http://localhost:3000/api/users/"+input.id, addData, head)
        .then((data) => {
          console.log(data.data);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
      this.edit = false;
    },
    resetValues: function(){
      this.input.id = '';
      this.input.firstname = '';
      this.input.lastname = '';
      this.input.branch = '';
      this.input.roleId = '';
      this.input.month = '';
      this.input.day = '';
      this.input.year = '';
      this.input.email = '';
      this.input.password = '';
    }
  },

  beforeMount() {
    this.$store.state.showService = false;
    const data = this.$store.state.token;
    this.businessId = this.$store.state.businessid;
    let head = {
      headers: {
        Authorization: data,
      },
    };

    if(this.$store.state.role == "SUPER_ADMIN"){
      this.role = 1;
    }else if(this.$store.state.role =="BUSINESS_OWNER"){
      this.role = 2;
    }else if (this.$store.state.role=="BUSINESS_TELLER"){
      this.role = 3;
    }
    if(this.role == 2){
      this.data[0].headers = [
        { text: "ID", value: "id", align: "start" },
        { text: "Name", value: "name" },
        { text: "Branch", value: "branch" },
        { text: "Birthday", value: "birthdate" },
        { text: "Email", value: "email" },
        { text: "Date Created", value: "createdAt" },
        { text: "", value: "controls", sortable: false, align: "end" },
      ]

      axios
      .get("http://localhost:3000/api/businesses/"+this.businessId+"/tellers", head)
      .then((res) => {
        var name, bday;
        var catcher = res.data.data;
        for (var i = 0; i < catcher.length; i++) {
          console.log(catcher);
          const addData = {
            id: "",
            name: "",
            branch: "",
            birthdate: "",
            email: "",
            createdAt: "",
          };
          addData.id = catcher[i].id;
          name =
            catcher[i].name.split(", ")[1] +
            " " +
            catcher[i].name.split(", ")[0];
          bday =
            catcher[i].birthdate.split("-")[1] +
            "/" +
            catcher[i].birthdate.split("-")[2] +
            "/" +
            catcher[i].birthdate.split("-")[0];
          addData.name = name;
          addData.email = catcher[i].email;
          addData.birthdate = bday;
          addData.branch = catcher[i].BranchId;
          addData.email = catcher[i].email;
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
      axios
        .get("http://localhost:3000/api/branches?businessId="+this.businessId, head)
        .then((res) => {
          var catcher = res.data.data;
          for(var i = 0; i < catcher.length; i++){
            var addBranchData = {
              text: "",
              value: ""
            };
            addBranchData.text = catcher[i].name;
            addBranchData.value = String(catcher[i].id);
            this.branches.push(addBranchData);
          }
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    } else if (this.role == 1) {
      this.data[0].headers = [
        { text: "ID", value: "id", align: "start" },
        { text: "Name", value: "name" },
        { text: "User Type", value: "role"},
        { text: "Birthday", value: "birthdate" },
        { text: "Email", value: "email" },
        { text: "Date Created", value: "createdAt" },
        { text: "", value: "controls", sortable: false, align: "end" },
      ]

      axios
      .get("http://localhost:3000/api/users", head)
      .then((res) => {
        var name, bday;
        var catcher = res.data.data;
        for (var i = 0; i < catcher.length; i++) {
          const addData = {
            id: "",
            name: "",
            role: "",
            birthdate: "",
            email: "",
            createdAt: "",
          };
          addData.id = catcher[i].id;
          name =
            catcher[i].name.split(", ")[1] +
            " " +
            catcher[i].name.split(", ")[0];
          bday =
            catcher[i].birthdate.split("-")[1] +
            "/" +
            catcher[i].birthdate.split("-")[2] +
            "/" +
            catcher[i].birthdate.split("-")[0];
          addData.name = name;
          addData.email = catcher[i].email;
          addData.birthdate = bday;
          addData.email = catcher[i].email;
          var createdDate = catcher[i].createdAt.split("-")[2];
          addData.createdAt =
            catcher[i].createdAt.split("-")[1] +
            "/" +
            createdDate.split("T")[0] + 
            "/" +
            catcher[i].createdAt.split("-")[0];
          if(catcher[i].RoleId == 1){
            addData.role = "Super Admin"
          } else if(catcher[i].RoleId == 2){
            addData.role = "Business Owner"
          } else if(catcher[i].RoleId == 3){
            addData.role = "Business Teller"
          } else {
            addData.role = "Customer"
          }

          this.data[0].business.push(addData);
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
    }

    for (var yr = 2020; yr > 1960; yr--) {
      var year = {text: '', value: ''};
      year.text = yr.toString();
      year.value = yr.toString();    
      this.years.push(year);
    }
    for (var d = 1; d <= 31; d++) {
      var day = {text: '', value: ''};
      day.text = d.toString();
      day.value = d.toString();
      this.days.push(day);
    }
  },
};
</script>