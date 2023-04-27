import { Router } from 'express'
import { users } from './storage/listUsers'
import { listPosts } from './storage/listPosts'

const routes = Router()

routes.get('/api/v1/user', (req, res) => {
  res.send(users)
})

routes.get('/api/v1/user/post', (req, res) => {
  res.send(listPosts)
})

export default routes