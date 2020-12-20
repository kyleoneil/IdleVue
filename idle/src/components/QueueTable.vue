<template>
  <v-container>
    <div class="my-6">
    
    </div>
    <template>
      <div style="max-width:80%;margin-left:10%">
        <v-data-table
          :headers="headers"
          :items="desserts"
          item-key="id  "
          class="elevation-1"
          :search="search"
          :custom-filter="filter"
        >
        </v-data-table>
      </div> </template
  ></v-container>
</template>
<script>
import axios from 'axios'
export default {
  name: "queueTable",
  data() {
    return {
      search: "",
      calories: "",
      desserts: [
        {
          name: "Kylito Onilito",
          queuenum: 159,
          email: "Kylito@Onilito.com",
          birthdate: "10/05/1999",
        },
        {
          name: "Kylita Onilita",
          queuenum: 169,
          email: "Kylita@Onilita.com",
          birthdate: "10/05/1969",
        },
      ],
      qlist: [],
    };
  },
  computed: {
    headers() {
      return [
        {
          text: "Queue Number",
          align: "start",
          sortable: false,
          value: "queuenum",
        },
        {
          text: "Customer Name",
          value: "name",
        },
        { text: "Customer Email", value: "email" },
        { text: "Birthdate", value: "birthdate" },  
      ];
    },
  },
  methods: {
     getQueue: function(){
      
            axios.get('http://proxy101.callcruncher.com/idle/api/auth/login').then((data)=>{
                      console.log(data);
            }).catch((error)=>{
                console.log(error);
            });
        },
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