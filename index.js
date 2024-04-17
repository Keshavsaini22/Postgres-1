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
            where: { uuid }
        })
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