<template>
   <div>
       <navigation></navigation>
   </div>
</template>

<script>
import navigation from '../components/Navigation.vue'
export default {
    components:{
        navigation
    },
    data:()=>({
      
    }),
    props:{
        source: String
    }
}
</script>