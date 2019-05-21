<template>
    <div>
        <p v-if="error">{{ error }}</p>
        <h2>{{ pizza.text }}</h2>
        <small>{{ pizza.createdAt }}</small>
        <br>
        <button v-on:click="deletePizza(pizza._id)">Excluir</button>
    </div>
</template>

<script>
import PizzaService from './PizzaService';

export default {
    data() {
        return {
            pizza: {},
            error: ''
        }
    },
    created () {
        this.getPizza(this.$route.params.pizza_id);
    },
    beforeRouteUpdate (to, from, next) {
        this.getPizza(to.params.pizza_id);
        next();
    },
    methods: {
        async getPizza(id) {
            try {
                await PizzaService.getPizza(id).then(pizza => {
                    this.pizza = pizza;
                });
            } catch (error) {
                this.error = error.message;
            }
        },
        async deletePizza(id) {
            await PizzaService.deletePizza(id).then(() => {
                this.$router.push({ name: 'pizzas' });
            });
        }
    }
}
</script>
