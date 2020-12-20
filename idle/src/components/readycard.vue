<template>
<v-container>
      <v-row dense>
         <v-col
          v-for="(item, i) in data[0].business"
          :key="i"
          cols="4"
        >
            <v-card
              class="mx-auto mt-12"
              max-width="344"
            >
              <v-img
                src="https://cdn.javascripttutorial.net/wp-content/uploads/2019/12/queue-at-a-bank.png"
                height="200px"
              ></v-img>

              <v-card-title  style="color:#1c88e5;font-size: 1.4vw;  ">
                {{item.name}}
              </v-card-title>

              <v-card-subtitle style="margin-top:1%">
              {{item.queue}} waiting
              </v-card-subtitle>

              <v-card-actions>
                <v-btn
                  color="primary"
                  style="font-size: .6vw;margin-left:2%;margin-top:-3%;margin-bottom:2%;font-family:Arial"
                  v-bind:id="item.id"
                  v-on:click="getqueue($event)"
                  >
                  START
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
</v-container>


</template>

<script>
  export default {
    data: () => ({
      show: false,
    }),
    props:{
      data:{
        type: Array,
      },
    },
    methods:{
      getqueue: function(event){
        const id=event.currentTarget.id;
        console.log(id);
        // console.log(this.data[0].visible);
        // this.data[0].visible = !this.data[0].visible;
       
      }
    },
  }
</script>