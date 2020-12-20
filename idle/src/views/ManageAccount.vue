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
                  <v-text-field
                    label="Year*"
                    hide-details
                    outlined
                    dense
                    required
                  ></v-text-field>
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
          <v-card-actions class="pr-8 pt-5 pb-8">
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
                  <v-text-field
                    label="Year*"
                    hide-details
                    outlined
                    dense
                    required
                  ></v-text-field>
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
export default {
  components: { MgmtTable },
  name: "ManageAccount",
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
              branch: "Dummy",
              birthdate: "12/25/2020",
              email: "sample@gmail.com",
              password: "a131jgjdsasjhda8asbfa",
              createdAt: "12/15/2020",
            },
            {
              id: "0002",
              name: "Chongyun",
              branch: "Liyue",
              birthdate: "09/07/2020",
              email: "chonghyun@gmail.com",
              password: "asghdj3hdas8b32l1asld",
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
            { text: "Branch", value: "branch" },
            { text: "Birthday", value: "birthdate" },
            { text: "Email", value: "email" },
            { text: "Password", value: "password" },
            { text: "Date Created", value: "createdAt" },
            { text: "", value: "controls", sortable: false, align: "end" },
          ],
        },
      ],
      branches: ["Hi", "Hello"],
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
      days: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
      ],
    };
  },
};
</script>