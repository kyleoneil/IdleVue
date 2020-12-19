<template>
   <div>
       <v-container class="fill-height" fluid>
            <v-col>
                <navigation></navigation>
           </v-col>
            <v-col style="margin-top:12vw"> 
                <readycard></readycard>
            </v-col>
        </v-container>
   </div>
</template>

<script>
import navigation from '../components/Navigation.vue'
import readycard from '../components/readycard.vue'
export default {
    components:{
        navigation,
        readycard
    },
    data:()=>({
      
    }),
    props:{
        source: String
    }
}
</script>