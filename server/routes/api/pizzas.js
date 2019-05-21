const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Pizzas
router.get('/', async (req, res) => {
    const pizzas = await loadPizzasCollection();
    res.send(await pizzas.find({}).toArray());
});

// Get Pizza
router.get('/:id', async (req, res) => {
    const pizzas = await loadPizzasCollection();
    res.send(await pizzas.findOne({ '_id': new mongodb.ObjectID(req.params.id) }));
});

// Add Root
router.post('/', async (req, res) => {
    const pizzas = await loadPizzasCollection();
    await pizzas.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

// Delete Pizza
router.delete('/:id', async (req, res) => {
    const pizzas = await loadPizzasCollection();
    await pizzas.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
    res.status(200).send();
});

async function loadPizzasCollection() {
    const client = await mongodb.MongoClient.connect('mongodb://localhost:27017', {
        useNewUrlParser: true
    });

    return client.db('pizzaria').collection('pizzas');
}

module.exports = router;
