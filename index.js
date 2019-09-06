const express = require('express');

const { User } = require('./app/models')
const { Shop } = require('./app/models')
const { Coffe } = require('./app/models')

const app = express()

app.use(express.urlencoded({ extended: false }))

// User.create({ name: 'Jorge', email: 'Jorge@email.com.br', password: '123456' });
// Shop.create({ name: 'Starbucks' });
// Coffe.create({ name: 'Cafe', type: 'amarelo', shopId: 3 });

app.get('/', (req, res) => {
    res.send('Hello World!')
})

//METODOS DO SEQUELIZE CRUD DE USER
app.post('/register', async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});

app.get('/find/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id)
    res.json(user);
});

app.get('/findall', async (req, res) => {
    const user = await User.findAll()
    res.json(user);
});

app.put('/update/:id', async(req, res) => {
    const user = await User.update({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        },{
            where: { id: req.params.id }
        }
    )
    res.json(user);
});

app.delete('/delete/:id', async (req, res) => {
    const user = await User.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json(user);
});


//METODOS DO SEQUELIZE CRUD DE SHOP
app.post('/registerShop', async (req, res) => {
    const shop = await Shop.create(req.body);
    res.json(shop);
});

app.get('/findShop/:id', async (req, res) => {
    const shop = await Shop.findByPk(req.params.id)
    res.json(shop);
});

app.get('/findallShop', async (req, res) => {
    const shop = await Shop.findAll()
    res.json(shop);
});

app.put('/updateShop/:id', async(req, res) => {
    const shop = await Shop.update({
            name: req.body.name,
        },{
            where: { id: req.params.id }
        }
    )
    res.json(shop);
});

app.get('/getCoffeesWithShop', async(req, res) => {
    const shop = await Shop.findAll();
    const coffee = await shop.Coffe.findall();
    res.json(coffee);
});

app.delete('/deleteShop/:id', async (req, res) => {
    const shop = await Shop.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json(shop);
});


//METODOS DO SEQUELIZE CRUD DE COFFE
app.post('/registerCoffe', async (req, res) => {
    const coffe = await Coffe.create(req.body);
    res.json(coffe);
});

app.get('/findCoffe/:id', async (req, res) => {
    const coffe = await Coffe.findByPk(req.params.id)
    res.json(coffe);
});

app.get('/findallCoffe', async (req, res) => {
    const coffe = await Coffe.findAll()
    res.json(coffe);
});

app.put('/updateCoffe/:id', async(req, res) => {
    const coffe = await Coffe.update({
            name: req.body.name,
        },{
            where: { id: req.params.id }
        }
    )
    res.json(coffe);
});

app.delete('/deleteCoffe/:id', async (req, res) => {
    const coffe = await Coffe.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json(coffe);
});


app.listen(3000)