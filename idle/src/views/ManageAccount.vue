<template>
  <v-container>
    <MgmtTable v-bind:data="data">
      <span class="white--text text-h5" slot="headerTitle">Account</span>
      <v-dialog v-model="add" persistent max-width="600px" slot="addBtn">
        <template v-slot:activator="{ on, attrs }">
          <v-btn sm="2" v-bind="attrs" v-on="on" dense class="ml-15" rounded>
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

                <v-select
                  :items="branches"
                  v-model="input.branch"
                  v-on:click="showBranches()"
                  label="Branch*"
                  outlined
                  hide-details
                  class="mb-2"
                  prepend-icon="mdi-source-branch"
                  dense
                ></v-select>
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
            <span class="headline pl-3 pt-3">Edit Account</span>
          </v-card-title>
          <v-card-text class="pb-0">
            <v-container>
              <v-text-field
                label="Name*"
                hide-details
                outlined
                dense
                required
                prepend-icon="mdi-account"
                class="mb-5"
              ></v-text-field>
              <v-select
                :items="branches"
                label="Branch*"
                outlined
                hide-details
                class="mb-2"
                prepend-icon="mdi-source-branch"
                dense
              ></v-select>
              <v-row>
                <v-col sm="5">
                  <v-select
                    label="Month*"
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
                hide-details
                outlined
                dense
                required
                prepend-icon="mdi-email"
                class="mb-5"
              ></v-text-field>
              <v-text-field
                label="Password*"
                hide-details
                outlined
                dense
                prepend-icon="mdi-lock"
                required
              ></v-text-field>
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
  name: "ManageAccount",
  data() {
    return {
      add: false,
      edit: false,
      input: {
        firstname: "",
        lastname: "",
        branch: "",
        month: "",
        day: "",
        year: "",
        birthdate: "",
        email: "",
        password: "",
      },
      data: [
        {
          business: [
          ],
          headers: [
            {
              text: "ID",
              align: "start",
              value: "id",
            },
            { text: "Name", value: "name" },
            { text: "Branch", value: "branch" },
            { text: "Birthday", value: "birthdate" },
            { text: "Email", value: "email" },
            { text: "Password", value: "password" },
            { text: "Date Created", value: "createdAt" },
            { text: "", value: "controls", sortable: false, align: "end" },
          ],
        },
      ],
      branches: [ ],
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
      years: []
    };
  },
  methods: {
    addAccount: function (input) {
      console.log(input);
      var date = input.month + "/" + input.day + "/" + input.year;
      input.birthdate = date;
      axios
        .post("http://proxy101.callcruncher.com/idle/api/users", input) //asa kuhaon ang data
        .then((data) => {
          //response if successful
          console.log(data.data);
        })
        .catch((error) => {
          console.log(error.response.data.message); //catches error
        });
      this.add = false;
    },
    showBranches: function(){
      const data =  this.$store.state.token;
       let head = {
           headers:{
               Authorization: data
           }
       }
      axios
      .get("https://proxy101.callcruncher.com/idle/api/branches/1", head)
      .then((res) => {
          this.branches = res.data.branch_details.name;
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
    }
  },

  beforeMount(){
       const data =  this.$store.state.token;
       let head = {
           headers:{
               Authorization: data
           }
       }
       axios
      .get("http://proxy101.callcruncher.com/idle/api/users", head)
      .then((res) => {
        var name, bday;
        var catcher = res.data.data;
        for(var i = 0; i < catcher.length; i++){
          const addData = {
            id:"",
            name:"",
            branch: "",
            birthdate:"",
            email:"",
            password:"",
            createdAt: ""
          };
          addData.id = catcher[i].id;
          name = catcher[i].name.split(", ")[1] + " " + catcher[i].name.split(", ")[0]
          bday = catcher[i].birthdate.split("-")[1] + "/" + catcher[i].birthdate.split("-")[2] + "/" + catcher[i].birthdate.split("-")[0]
          addData.name = name
          addData.email = catcher[i].email
          addData.birthdate = bday;
          addData.email = catcher[i].email
          this.data[0].business.push(addData);
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });

    for(var yr = 2020; yr > 1960; yr--){
      this.years.push(yr);
    }
    for(var d = 1; d <= 31; d++){
      this.days.push(d);
    }
  }
};
</script>