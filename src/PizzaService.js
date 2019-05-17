import axios from 'axios';

const url = 'http://localhost:5000/api/pizzas/';

class PizzaService {
    // Get Pizzas
    static getPizzas() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(pizza => ({
                        ...pizza,
                        createdAt: new Date(pizza.createdAt)
                    }))
                );
            } catch(error) {
                reject(error);
            }
        });
    }

    // Create Pizza
    static insertPizza(text) {
        return axios.post(url, {
            text
        });
    }

    // Delete Pizza
    static deletePizza(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default PizzaService;
