const express = require('express');

const { User } = require('./app/models')

const app = express()

app.use(express.urlencoded({ extended: false }))

// User.create({ name: 'RAUL', email: 'RAUL@rocketseat.com.br', password: '123456' });

app.get('/', (req, res) => {
    res.send('Hello World!')
})

//METODOS DO SEQUELIZE

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
    const user = await User.update(
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password

        },
        { where: { id: req.params.id } }
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


app.listen(3000)