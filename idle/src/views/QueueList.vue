<template>
   <div>
       <v-container class="fill-height" fluid>
            <v-card v-show="!visible"
                class="mx-auto mt-16"
                color="#1476d2"
                dark
                width="50vw"
                height="20vw"
            >
                <v-card-title>
                <v-icon
                large
                left
                icon
                outlined
                class="fa fa-desktop"
                >
                 fa fa-desktop
                </v-icon>
           

                <span class="title font-weight-light">Idle</span>
                </v-card-title>

                <v-card-text class="font-weight-bold text-center mt-16 mb-10" style="font-size: 10vw;">
                    {{number}}
                </v-card-text>
                 <v-card-text class="font-weight-bold text-center mt-14" style="font-size: 2vw;">
                 NOW SERVING
                </v-card-text>
                <span></span>
                <v-card-actions>
                <v-list-item class="grow" style="margin-bottom:-12%">
                    <v-list-item-avatar color="grey darken-3">
                    <v-img
                        class="elevation-6"
                        alt=""
                        src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                    ></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                    <v-list-item-title>Evan You</v-list-item-title>
                    </v-list-item-content>

                    <v-row align="center" justify="end">
                        <v-btn
                          color="blue-grey"
                        style="font-size: .6vw;font-family:Arial"
                        class="mr-6"
                        >
                        NO SHOW
                        </v-btn>
                         <v-btn
                         color="success"
                        style="font-size: .6vw;font-family:Arial;margin-right:2%"
                        >
                        NEXT
                        </v-btn>
                    </v-row>
                </v-list-item>
                </v-card-actions>
            </v-card>
         
           <queue v-show="!visible"></queue>
           <div class="" style="margin-left:44%;margin-top:-10%"   v-show="!visible">
            <v-btn
            color="error"
            style="font-size: 1vw;font-family:Arial;"
            v-on:click="visible=!visible"
            class="mx-auto mt-16"
            >
            FINISH
            </v-btn>
           </div>
            <v-col style="margin-top:12vw"> 
                <readycard v-show ="visible" v-bind:data.sync="visible"></readycard>   
            </v-col>
        </v-container>
   </div>
</template>

<script>

import readycard from '../components/readycard.vue'
import queue from '../components/QueueTable.vue';

export default {
    components:{
        queue,
        readycard
    },
    data:()=>({
      visible: true,
      number: 5,
    }),
    props:{
        source: String
    }
}
</script>