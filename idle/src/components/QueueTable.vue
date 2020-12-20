<template>
  <v-container>
    <div class="my-6">
    
    </div>
    <template>
      <div style="max-width:80%;margin-left:10%">
        <v-data-table
          :headers="headers"
          :items="dataqueue"
          item-key="id  "
          class="elevation-1"

        >
        </v-data-table>
      </div> </template
  ></v-container>
</template>
<script>
// import axios from 'axios'
export default {
  name: "queueTable",
  data() {
    return {
     headers: [
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
      ]
    };
  },
  props:{
    dataqueue:{
      type: Array
    }
  },
  computed: {
  
  },
  methods: {
   
    //  beforeMount(){
    //    console.log("xd");
    //         axios.get('http://proxy101.callcruncher.com/idle/apis/queues').then((data)=>{
    //                   console.log(data);
    //         }).catch((error)=>{
    //             console.log(error);
    //         });
    //     },
  },
};
</script>