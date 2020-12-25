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
               
                <v-card-text class="font-weight-bold text-center mt-10 mb-10" style="font-size: 10vw;">
                    {{number}}
                </v-card-text>
                 <v-card-text class="font-weight-bold text-center" style="font-size: 1vw;">
                    {{service}}
                </v-card-text>
                 <v-card-text class="font-weight-bold text-center " style="font-size: 2vw;">
                NOW SERVING
                </v-card-text>
                <span></span>
                <v-card-actions>
                <v-list-item>
                    <v-list-item-avatar color="grey darken-3">
                    <v-img
                        class="elevation-6"
                        alt=""
                        src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                    ></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                    <v-list-item-title>{{name}}</v-list-item-title>
                    </v-list-item-content>

                    <v-row align="center" justify="end">
                        <v-btn
                          color="blue-grey"
                        style="font-size: .6vw;font-family:Arial"
                        class="mr-6"
                        v-on:click="noShow"
                        >
                        NO SHOW
                        </v-btn>
                         <v-btn
                         color="success"
                        style="font-size: .6vw;font-family:Arial;margin-right:2%"
                        v-on:click="next('COMPLETED')"
                        >
                        NEXT
                        </v-btn>
                    </v-row>
                </v-list-item>
                </v-card-actions>
            </v-card>
         
           <queue v-if="!visible" v-bind:data="queuedata"></queue> <!--QUEUE QUEUE QUEUE QUEUE QUEUE QUEUE QUEUE QUEUE QUEUE-->
            
           <div class="" style="margin-left:44%;"   v-show="!visible">
                <v-btn
                color="error"
                style="font-size: 1vw;font-family:Arial;"
                v-on:click="visible=!visible"
                class="mx-auto mt-16"
                >
                FINISH
                </v-btn>
           </div>
          
            <v-col v-show="visible"> 
                <v-container v-if="!check">
                    <v-row dense>
                        <v-col
                        v-for="(item, i) in datalist.data.data"
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
                            {{item.last_in_queue - item.current_queue}} waiting
                            </v-card-subtitle>

                            <v-card-actions>
                                <v-btn
                                color="primary"
                                style="font-size: 1vw;margin-left:2%;margin-top:-3%;margin-bottom:2%;font-family:Arial"
                                v-bind:id="item.id"
                                v-on:click="getqueue($event),visible=!visible"
                                >
                                START
                                </v-btn>
                            </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
                <!-- <readycard v-show ="!data.visible" v-bind:data.sync="data"></readycard>    -->
            </v-col>
        </v-container>
       <!-- <v-btn v-on:click="xd">test</v-btn> -->
   </div>
</template>

<script>

// import readycard from '../components/readycard.vue'
import queue from '../components/QueueTable.vue';
import axios from 'axios'

export default {
  
    components:{
        queue,
        // readycard
    },
    data:()=>({
      number: 0,
      name:"",
      service:"",
      visible: true,
      datalist:[],
      queuedata:[],
      check: true,
      currentid:"",
      currentserviceid:"",
      count:0,
    }),
    props:{
        source: String
    },
    methods:{
        
     next: function(status){
        const data = this.$store.state.token;
     
        let head = 
            {
           headers:{
            authorization: data,
            }
        };
        let send={};
        console.log(this.currentid);
        const PROTOCOL2="http://localhost:3000/api/queues/";
         //const PROTOCOL2="http://proxy101.callcruncher.com/idle/api/queues/";
         console.log("currentid:"+this.currentid);
        axios.patch(PROTOCOL2+this.currentid+'?status='+status,send,head).then((data)=>{
               console.log("PROTOCOL2"+data.data);
         }).catch((error)=>{
            console.log("PROTOCOL2"+error.response.data.message)
        });
        
         const PROTOCOL="http://localhost:3000/api/services/";
         console.log("current service id:"+this.currentserviceid);
         //const PROTOCOL="http://proxy101.callcruncher.com/idle/api/services/1/nextqueue";
         axios.patch(PROTOCOL+this.currentserviceid+"/nextqueue",send,head).then((data)=>{
                console.log("PROTOCOL1"+data.data);
         }).catch((error)=>{
           console.log("PROTOCOL1"+error.response.data.message)
             this.name ="";
                this.number = "";
                this.service = "";
                this.currentid="";
                this.currentserviceid="";
        });
         //get queue
        
        const PROTOCOL3 ="http://localhost:3000/api/queues?serviceId=";
        //const PROTOCOL="http://proxy101.callcruncher.com/idle/api/queues?serviceId=";
        axios.get(PROTOCOL3+this.currentserviceid,head).then((data)=>{
             var catcher = data.data.data;
            // this.queuedata = data.data.data.data;
            this.queuedata=[];
            var adddata;
            console.log(data.data.data.data);
            for(var a=0; a<catcher.totalRecords;a++){
                if(catcher.data[a].status=="IN_PROGRESS"){
                    console.log(catcher.data[a].status);
                    this.name = catcher.data[a].User.user_name;
                    this.number = catcher.data[a].queue_number;
                    this.service = catcher.data[a].Service.service_name;
                    this.currentid= catcher.data[a].id;
                    this.currentserviceid=catcher.data[a].Service.id;
                }
                if(catcher.data[a].status=="IN_PROGRESS" || catcher.data[a].status=="IN_QUEUE"){
                    adddata = {name:"",queuenum:"",email:"",birthdate:""};
                    adddata.name = catcher.data[a].User.user_name;
                    adddata.queuenum = catcher.data[a].queue_number
                    adddata.email=catcher.data[a].User.user_email
                    adddata.birthdate=catcher.data[a].User.user_birthdate; //bday dapat
                    this.queuedata.push(adddata);
                
                }
            }
            if(catcher.totalRecords==0){
                this.name ="";
                this.number = "";
                this.service = "";
                this.currentid="";
                this.currentserviceid="";
            }
        }).catch((error)=>{
         
            console.log(error.response.data.message)
            
        });
         
     },
     noShow: function(){
        this.next("NO_SHOW");
     },
     getqueue: function(event){
         this.currentserviceid=    event.currentTarget.id;
        const data = this.$store.state.token;
          let head = {
           headers:{
               Authorization:data
           }
       }
        const PROTOCOL2="http://localhost:3000/api/services/";
         //const PROTOCOL="http://proxy101.callcruncher.com/idle/api/services/1/nextqueue";
         axios.patch(PROTOCOL2+this.currentserviceid+"/nextqueue",{},head).then((data)=>{
                console.log("PROTOCOL1"+data.data);
         }).catch((error)=>{
            console.log("PROTOCOL1"+error.response.data.message)
        });
        const PROTOCOL ="http://localhost:3000/api/queues?serviceId=";
        //const PROTOCOL="http://proxy101.callcruncher.com/idle/api/queues?serviceId=";
        axios.get(PROTOCOL+this.currentserviceid,head).then((data)=>{
            var catcher = data.data.data;
            // this.queuedata = data.data.data.data;
            this.queuedata=[];
            var adddata;
            console.log(data.data.data.data);
            for(var a=0; a<catcher.totalRecords;a++){
                if(catcher.data[a].status=="IN_PROGRESS"){
                    console.log(catcher.data[a].status);
                    this.name = catcher.data[a].User.user_name;
                    this.number = catcher.data[a].queue_number;
                    this.service = catcher.data[a].Service.service_name;
                    this.currentid= catcher.data[a].id;
                    this.currentserviceid=catcher.data[a].Service.id;
                }
                if(catcher.data[a].status=="IN_PROGRESS" || catcher.data[a].status=="IN_QUEUE"){
                    adddata = {name:"",queuenum:"",email:"",birthdate:""};
                    adddata.name = catcher.data[a].User.user_name;
                    adddata.queuenum = catcher.data[a].queue_number
                    adddata.email=catcher.data[a].User.user_email
                    adddata.birthdate=catcher.data[a].User.user_birthdate; //bday dapat
                    this.queuedata.push(adddata);
                
                }
            }
        }).catch((error)=>{
            console.log(error.response.data.message)
        });
    
      },

    },
 
    beforeMount(){
       const data =  this.$store.state.token;
       let head = {
           headers:{
               Authorization:data
           }
       }
       
    //    const PROTOCOL="http://proxy101.callcruncher.com/idle/api/services?branchid=";
       const PROTOCOL="http://localhost:3000/api/services?branchId=";
       const id =  this.$store.state.id;
        axios.get(PROTOCOL+id,head).then((data)=>{
        this.datalist = data;
        this.check=!this.check;
        }).catch((error)=>{
            console.log(error.response.data.message);
        });
    },
}
</script>