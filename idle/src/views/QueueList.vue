<template>
   <div>
       <v-container class="fill-height" fluid>
            <v-col style="margin-top:12vw"> 
                <readycard></readycard>
            </v-col>
        </v-container>
   </div>
</template>

<script>

import readycard from '../components/readycard.vue'
export default {
    components:{
      
        readycard
    },
    data:()=>({
      
    }),
    props:{
        source: String
    }
}
</script>