<template>
  <div>
    <h1>{{ title }}</h1>
    <div>
      <form v-on:submit.prevent="createPizza">
        <label for="create">Qual pizza você está pensando?</label>
        <br>
        <input type="text" id="create" v-model="text" required placeholder="Calabresa...">
        <br>
        <button type="submit">Criar</button>
      </form>
    </div>
    <hr>
    <p v-if="error">{{ error }}</p>
    <ul>
      <li 
        v-for="(pizza, index) in pizzas"
        v-bind:item="pizza"
        v-bind:index="index"
        v-bind:key="pizza._id"
      >
        <router-link :to="{ name: 'pizza', params: { pizza_id: pizza._id } }">{{ pizza.text }}</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import PizzaService from './PizzaService';

export default {
  data() {
    return {
      title: 'Pizzas',
      pizzas: [],
      error: '',
      text: ''
    }
  },
  created () {
    this.getPizzas();
  },
  beforeRouteUpdate (to, from, next) {
    this.getPizzas();
    next();
  },
  methods: {
    async createPizza() {
      await PizzaService.insertPizza(this.text);
      this.pizzas = await PizzaService.getPizzas();
    },
    async getPizzas() {
      try {
        this.pizzas = await PizzaService.getPizzas();
      } catch (error) {
        this.error = error.message;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  $color: red;
  h1 {
    color: $color;
  }
</style>
