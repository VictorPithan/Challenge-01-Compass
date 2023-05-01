import express, { Router } from 'express'
import listUsers from './storage/listUsers.json'
import listPosts from './storage/listPosts.json'


const routes = Router()

function findUserByUsername(username: string) {
  return listUsers.users.find(user => user.user === username);
}

function findPosts() {
  return listPosts.posts.map(post => {
    const user = findUserByUsername(post.user);

    const comentsWithUserInfos = post.comments?.map(coment => {
      const userComent = findUserByUsername(coment.user);
      return {
        ...coment,
        profile_photo: user?.profile_photo,
        name: user?.name
      }
    })

    return {
      ...post,
      comments: comentsWithUserInfos,
      name: user?.name,
      profile_photo: user?.profile_photo
    }
  })
}

routes.get('/api/v1/user', (req, res) => {
  res.send(listUsers)
})

routes.get('/api/v1/user/post', (req, res) => {
  console.log(findPosts())
  res.send(findPosts())
})

routes.post('/login', (req, res) => {
  const userName = req.body?.userName;
  const password = req.body?.password;

  console.log(userName)
  console.log(password)

  const auth = listUsers.users.find((user) => user.email === userName && user.password === password)

  if (!auth) {
    res.status(404).send()
  } else {
    const userAuthenticated = {
      name: auth.email,
      profile_photo: auth.profile_photo
    }
    return res.json(userAuthenticated).send()
  }
})


export default routes