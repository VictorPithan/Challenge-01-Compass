import { ChangeEvent, FormEvent, InvalidEvent, useEffect, useState } from "react";

import { BodyContainer, BottomButtons, BottomButtonsContainer, BoxTopicContainer, Container, Header, HeaderContainer, MenuContainer, NewPost, PostButton, PostsContainer, Profile } from "./styles";

import { Post } from "../../../../components/Post";
import { Avatar } from "../../../../components/Avatar";
import { BoxToCreateNewPost } from "../../../../components/BoxToCreateNewPost";
import { TopicContainer } from "./styles";

import homeIcon from '../../../../assets/home.svg'
import cameraIcon from '../../../../assets/cameraIcon.svg'
import imageIcon from '../../../../assets/imageIcon.svg'
import attachmentIcon from '../../../../assets/attachmentIcon.svg'
import mapPinIcon from '../../../../assets/mapPinIcon.svg'
import emojiIcon from '../../../../assets/emojiIcon.svg'
import profileIcon from '../../../../assets/profileIcon.jpg'
import ilhaDoComendador from '../../../../assets/ilhaDoComendador.png'

interface PostProps {
  user: string;
  name?: string;
  profile_photo?: string;
  post_date: Date | string;
  description: string;
  likes: number;
  comments: CommentProps[];
  url_imagem?: string;
}

interface CommentProps {
  user: string;
  name: string;
  profile_photo: string;
  comment: string;
}

interface usersProps {
  name: string;
  user: string;
  birthdate: string;
  email: string;
  password: string;
  profile_photo: string;
}

const userAuthenticated = {
  user: "victor pithan 2",
  name: "Victor Pithan",
  url_imagem: "https://github.com/victorpithan.png",
}

export function Main() {

  const [posts, setPosts] = useState<PostProps[]>([
    {
      user: "victorpithan",
      name: "Victor Pithan",
      profile_photo: "https://github.com/victorpithan.png",
      post_date: new Date("2023-04-28T16:15:00"),
      description: "Minha última viagem para a ilha do Comendador, um lugar simplesmente incrível, natureza praticamente intocada. Recomendo a todos que apreciam o mundo como ele é.",
      likes: 100,
      comments: [
        {
          "user": "diegosuarez",
          "name": "Diego Suarez",
          "profile_photo": "",
          "comment": "Linda foto Victor! 🌸"
        },
        {
          "user": "luizbrugnera",
          "name": "Luiz Brugnera",
          "profile_photo": "",
          "comment": "Que praia maravilhosa! 🌷"
        }
      ],
      url_imagem: ilhaDoComendador
    },
  ])

  const [newPostText, setNewPostText] = useState("")

  const [users, setUsers] = useState<usersProps[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/api/v1/user/post')
      .then(response => response.json())
      .then(data => {
        // const newPosts: PostProps[] = data.posts
        // console.log(data);
        setPosts([...posts, ...data])
      })

    fetch('http://localhost:3333/api/v1/user')
      .then(response => response.json())
      .then(data => {
        const newUsers: usersProps[] = data.users
        setUsers([...users, ...newUsers])
      })
  }, [])

  const imagePost = ilhaDoComendador //"https://picsum.photos/710/300"

  function handleCreateNewPost(event: FormEvent) {
    event.preventDefault()

    const newPost = {      
      user: userAuthenticated.user,
      name: userAuthenticated.name,
      profile_photo: userAuthenticated.url_imagem,
      post_date: new Date(),
      description: newPostText,
      likes: 0,
      comments: [],
      url_imagem: "",
    }

    setPosts([newPost, ...posts])
    setNewPostText("")
  }

  function handleNewPostChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("")
    setNewPostText(event.target.value)
  }

  function handleNewPostInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório")
  }

  const isNewPostEmpty = newPostText.length === 0;
  
  return (
    <Container>
      <Header>
        <MenuContainer>
          <img src={homeIcon} alt="" />
          <span>Home</span>
        </MenuContainer>
        <Profile>
          <span>Victor Pithan</span>
          <Avatar src="https://github.com/victorpithan.png" alt="" width={42} height={42}/>
        </Profile>        
      </Header>

      <BodyContainer>
        <PostsContainer>
          <NewPost>
            <form onSubmit={handleCreateNewPost}>
              <HeaderContainer>
                <Avatar src={userAuthenticated.url_imagem} alt="" width={32} height={32}/>
                <textarea
                  name="post"
                  placeholder="No que você está pensando?"
                  value={newPostText}
                  onChange={handleNewPostChange}
                  onInvalid={handleNewPostInvalid}
                  required
                />
              </HeaderContainer>
              <BottomButtonsContainer>
                <BottomButtons>
                  <button><img src={cameraIcon} alt="" /></button>
                  <button><img src={imageIcon} alt="" /></button>
                  <button><img src={attachmentIcon} alt="" /></button>
                  <button><img src={mapPinIcon} alt="" /></button>
                  <button><img src={emojiIcon} alt="" /></button>
                </BottomButtons>
                <PostButton type="submit" disabled={isNewPostEmpty}>
                  Postar
                </PostButton>
              </BottomButtonsContainer>
            </form>
          </NewPost>

          {posts.map((post) => {
            return (
              <Post
                userName={post?.name}
                user={post?.user}
                avatarURL={post?.profile_photo}
                publishedAt={post?.post_date}
                description={post?.description}
                likes={post?.likes}
                comments={post?.comments}
                imagePost={post?.url_imagem}
                key={`${post?.description}${post?.user}`}
              />
            )
          })}
          
        </PostsContainer>
        <TopicContainer>
          <BoxTopicContainer>
            <p>Meus Amigos</p>
            <ul>
              {users.map((user) => {
                return (
                <li key={user.user}>
                  <Avatar src={user.profile_photo = profileIcon} alt="" width={32} height={32}/>
                  <span>{user.name}</span>
                </li>
              )})}
              
            </ul>
            
          </BoxTopicContainer>
          <BoxTopicContainer></BoxTopicContainer>
          <BoxTopicContainer></BoxTopicContainer>
        </TopicContainer>
      </BodyContainer>
    </Container>
  )
}