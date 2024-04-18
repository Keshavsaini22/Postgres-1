const express = require("express")
const cors = require('cors')
const { Sequelize, sequelize, User, Posts } = require('./models');
const { where } = require("sequelize");
const app = express()

app.use(express.text())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());


app.post('/users', async (req, res) => {
    const { name, email, role } = req.body
    try {
        const user = await User.create({ name, email, role })
        return res.json(user)
    } catch (e) {
        return res.status(500).json(e)
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll()
        return res.json(users)
    } catch (e) {
        return res.status(500).json(e)
    }
})

app.get('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    try {
        const user = await User.findOne({
            where: { uuid },
            include: 'posts'
        })
        return res.json(user)
    } catch (e) {
        return res.status(500).json(e)
    }
})

app.delete('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    try {
        const user = await User.findOne({ where: { uuid }, })
        await user.destroy()
        return res.json({ message: 'User deleted' })
    } catch (e) {
        return res.status(500).json(e)
    }
})

app.put('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    const { name } = req.body
    try {
        const user = await User.findOne({ where: { uuid }, })
        user.name = name
        await user.save()
        return res.json(user)
    } catch (e) {
        return res.status(500).json(e)
    }
})

app.post('/posts', async (req, res) => {
    const { userUuid, body } = req.body
    try {
        const user = await User.findOne({
            where: {
                uuid: userUuid
            }
        })

        const post = await Posts.create({ body, userId: user.id })
        return res.json(post)
    } catch (e) {
        return res.status(500).json(e)
    }
})

app.get('/posts', async (req, res) => {
    try {
        // const posts = await Posts.findAll({ include: [User] })
        // const posts = await Posts.findAll({ include: [{ model: User, as: 'user' }] })
        // const posts = await Posts.findAll({ include: ['user'] })
        const posts = await Posts.findAll({ include: 'user' })

        return res.json(posts)
    } catch (e) {
        return res.status(500).json(e)
    }
})

app.listen(8080, async () => {
    try {
        // await sequelize.sync({ force: true });
        await sequelize.authenticate();
        console.log("sequelize connected")
    }
    catch (err) {
        console.log("error is", err)
    }
    console.log(`Server is running on port 8080`);
});