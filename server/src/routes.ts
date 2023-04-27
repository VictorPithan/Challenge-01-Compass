import { Router } from 'express'

const routes = Router()

routes.get('/', (req, res) => {
  res.send('Funcionando')
})

export default routes