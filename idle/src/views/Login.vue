<template>
<div>
    <v-app>
        <v-main class="login-bg">
            <v-container class="fill-height" fluid>
                <v-row align="center" justify ="center">
                    <v-col cols="12" sm="8" md="8">
                        <v-card class="elevation-12">
                            <v-window v-model="step">
                                <v-window-item :value="1">
                                    <v-row>
                                        <v-col cols="12" md="8">
                                            <v-card-text class="mt-12">
                                                <h1 class="text-center display-2" style="color:#1c88e5;">Sign in to Idle</h1>
                                                <div class="text-center mt-5">
                                                    <v-btn class="mx-2" fab color="#2296f3" icon outlined>
                                                        <v-icon>fab fa-facebook-f</v-icon>
                                                    </v-btn>    
                                                    <v-btn class="mx-2" fab color="#2296f3" icon outlined>
                                                        <v-icon>fab fa-google-plus-g</v-icon>
                                                    </v-btn>  
                                                    <v-btn class="mx-2" fab color="#2296f3" icon outlined>
                                                        <v-icon>fab fa-linkedin-in</v-icon>
                                                    </v-btn>   
                                                </div>
                                                <h4 class="text-center mt-4">Ensure your email for registration</h4>
                                                <v-form>
                                                    <v-text-field
                                                    label="Email"
                                                    name="Email"
                                                    prepend-icon="email"
                                                    type="text"
                                                    color="#1c88e5" 
                                                     v-model="email"
                                                     required
                                                    />
                                                    <v-text-field
                                                    id="password"
                                                    label="Password"
                                                    name="Password"
                                                    prepend-icon="lock"
                                                    type="password"
                                                    color="#1c88e5"
                                                    v-model="password"
                                                    required 
                                                    />
                                                </v-form>
                                                <h5 class="text-center mt-n3 mb-n3" style="color:red;font-weight:400">{{message}}</h5>
                                                <h3 class="text-center mt-3">Forget your password?</h3>
                                            </v-card-text>
                                            <div class="text-center mt-3">
                                                <v-btn rounded color="#1c88e5" dark v-on:click="login(email,password)">LOGIN</v-btn>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="4" style="background-color:#1c88e5;">
                                            <v-card-text class="white--text mt-12">
                                                <h1 class="text-center display-1">Hello, Friends !</h1>
                                                <h5 class="text-center">Learn more about Idle and start journey with us</h5>
                                            </v-card-text>
                                            <div class="text-center">
                                                <v-btn rounded outlined="" dark v-on:click="step++">ABOUT</v-btn>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-window-item>
                                <v-window-item :value="2">
                                    <v-row class="fill-height">
                                        <v-col cols="12" md="4" style="background-color:#1c88e5">
                                            <v-card-text class="white--text mt-12">
                                                <h1 class="text-center display-1">Welcome Back !</h1>
                                                <h5 class="text-center">To keep connected with us please login with your personnel info</h5>
                                            </v-card-text>
                                            <div class="text-center">
                                                <v-btn rounded outlined dark v-on:click="step--">LOGIN</v-btn>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="8" justify="center">
                                            <v-card-text class="mt-12 ">
                                                <h1 class="text-center display-2" style="color:#1c88e5">ABOUT IDLE</h1>
                                                <h5 class="text-center mt-3" style="color:#1c88e5">Making queues secure and relaxing</h5>
                                                <h4 class="text-center mt-4 ml-16 mr-16 text-justify">Idle: a dynamic mobile queueing application with real-time queue tracking system and push notifications. 
                                                    Idle is a unified queueing application that allows users to queue in advance without 
                                                    being physically present in the chosen establishment. Users don’t need to wait in a crowded area. 
                                                    This application also allows customers to queue multiple lines at the same time.           
                                                    <br><br>
                                                    

                                                    This application will help the owners of establishments control the traffic surges in an area. Makes the process faster 
                                                    and less time consumption. Helps their customers apply social distancing due to the pandemic coronavirus. This provides a 
                                                    fair and logical virtual wait to customers seeking the same high-demand products or services.
                                                </h4>
                                            </v-card-text>
                                        </v-col>
                                    </v-row>
                                </v-window-item>
                            </v-window>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</div>
</template>

<script>
import axios from 'axios'

export default {
    data:()=>({
        message:"",
        email:"",
        password:"",
        step:1,
        image:{ backgroundImage:"url(https://i.pinimg.com/originals/80/cf/b7/80cfb725b38d732dd1c26646eaf2d1e1.jpg)"},
    }),
    props:{
        source: String
    },
    methods:{
        login: function(a,b){
            const data ={email:a,password:b};
            console.log(data);
            axios.post('http://proxy101.callcruncher.com/idle/api/auth/login',data).then((data)=>{
                 this.$store.state.role=data.data.roleName;
                this.$store.state.token=data.data.token;
                //  console.log(this.$store.role);
                 this.$store.commit('increment');
                 console.log(data.data);
                if(this.$store.state.role == "SUPER_ADMIN"){
                    this.$router.push({path:'/business',params:{data}});
                }else if(this.$store.state.role =="ADMIN"){
                    this.$router.push({path:'/branch',params:{data}});
                }else if (this.$store.state.role=="TELLER"){
                    this.$router.push({path:'/queueList',params:{data}});
                }
                             
            }).catch((error)=>{
                this.message=error.response.data.message; 
             
            });
        }
    },
    beforeMount(){
        this.$store.state.count=0;
    }
}
</script>
<style scoped>
.login-bg{
    background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)), url('https://i.pinimg.com/originals/80/cf/b7/80cfb725b38d732dd1c26646eaf2d1e1.jpg');
    background-size:     cover;                      
    background-repeat:   no-repeat;
    background-position: center center;  
}
</style>