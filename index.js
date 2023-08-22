const express = require('express')
const db = require('./db/db')
const { engine } = require('express-handlebars')
const user = require('./models/User')
const User = require('./models/User')
const app = express()

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.get('/', async (req, res) => {
  res.render('home')
})

app.get('/user/all', async (req, res) => {
  const users = await User.findAll({ raw: true })
  res.render('users', { users })
})

app.get('/user/edit/:id', async (req, res) => {
  const id = req.params.id

  const user = await User.findOne({ raw: true, where: { id: id } })

  res.render('edit', { user })
})

app.post('/user/update', async (req, res) => {
  const { nome, email, id } = req.body

  const userData = {
    nome,
    email
  }
  await User.update(userData, { where: { id: id } })
 res.redirect('/user/all')
})

app.post('/user/delete/:id', async (req, res) => {
  const id = req.params.id

  await User.destroy({ where: { id: id } })

  res.redirect('/user/all')
})

app.post('/user/create', async (req, res) => {
  const { nome, email } = req.body

  await User.create({
    nome,
    email
  })

  res.redirect('/user/all')
})

db.sync().then(app.listen(3000))
