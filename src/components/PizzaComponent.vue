<template>
  <div class="container">
    <h1>Pizzaria</h1>
    <div>
      <label for="create-pizza">Qual pizza você está pensando?</label>
      <input type="text" id="create-pizza" v-model="text" placeholder="Calabresa...">
      <button v-on:click="createPizza">Criar</button>
    </div>
    <hr>
    <p v-if="error">{{ error }}</p>
    <div>
      <div 
        v-for="(pizza, index) in pizzas"
        v-bind:item="pizza"
        v-bind:index="index"
        v-bind:key="pizza._id"
      >
        <span>{{ pizza.text }}</span>
        <small>{{ `${pizza.createdAt.getDate()}/${pizza.createdAt.getMonth()}/${pizza.createdAt.getFullYear()}` }}</small>
        <button v-on:click="deletePizza(pizza._id)">Excluir</button>
      </div>
    </div>
  </div>
</template>

<script>
import PizzaService from '../PizzaService';

export default {
  name: 'PizzaComponent',
  data() {
    return {
      pizzas: [],
      error: '',
      text: ''
    }
  },
  async created() {
    try {
      this.pizzas = await PizzaService.getPizzas();
    } catch (error) {
      this.error = error.message;
    }
  },
  methods: {
    async createPizza() {
      await PizzaService.insertPizza(this.text);
      this.pizzas = await PizzaService.getPizzas();
    },
    async deletePizza(id) {
      await PizzaService.deletePizza(id);
      this.pizzas = await PizzaService.getPizzas();
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
