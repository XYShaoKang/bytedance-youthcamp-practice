require('dotenv').config()
const mongoose = require('mongoose')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('@koa/router')

const MONGODB_CONNECT = process.env.MONGODB_CONNECT

if (!MONGODB_CONNECT) {
  throw new Error(`请在 .env 文件中配置 MONGODB_CONNECT (一个有效的 MongoDB 连接字符串)

更多详情查看: https://docs.mongodb.com/manual/reference/connection-string/
`)
}

const { Schema, model } = mongoose

const userSchema = new Schema({
  name: String,
  age: Number,
})

const User = model('User', userSchema)

const router = new Router()
router.get('/users', async (ctx, _next) => {
  const users = await User.find()
  ctx.body = users
})
router.get('/users/:id', async (ctx, _next) => {
  const { id } = ctx.params
  const user = await User.where({ id }).findOne()
  ctx.body = user
})
router.post('/users', async (ctx, _next) => {
  const { name, age } = ctx.request.body
  const user = new User({ name, age })
  user.save()
  ctx.body = user
})

router.del('/users/:id', async (ctx, _next) => {
  const { id } = ctx.params
  const result = await User.deleteOne({ id })
  ctx.body = result
})
router.put('/users/:id', async (ctx, _next) => {
  const { id } = ctx.params
  const { name, age } = ctx.request.body
  const user = await User.updateOne({ id }, { name, age })
  ctx.body = user
})

const app = new Koa()
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())

void (async function () {
  await mongoose.connect(MONGODB_CONNECT)

  app.listen(3000, () => {
    console.log('Server run on http://localhost:3000')
  })
})()
