<template>
  <v-card
    class="mx-auto "
    max-width="344"
  >
    <v-img
      src="https://cdn.javascripttutorial.net/wp-content/uploads/2019/12/queue-at-a-bank.png"
      height="200px"
    ></v-img>

    <v-card-title  style="color:#1c88e5;font-size: 1.5vw; ">
      Top western road trips
    </v-card-title>

    <v-card-subtitle style="margin-top:1%">
      1,000 waiting
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="primary"
        style="color:green;font-size: .6vw;margin-left:2%;margin-top:-3%;margin-bottom:2%;font-family:Arial"
      >
        START
      </v-btn>

      <v-spacer></v-spacer>

      <!-- <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn> -->
    </v-card-actions>

    <!-- <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition> -->
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      show: false,
    }),
  }
</script>