import { ChangeEvent, FormEvent, InvalidEvent, useState, useContext, useEffect } from "react";

import { BodyContainer, BottomButtons, BottomButtonsContainer, BoxTopicContainer, Container, Header, HeaderContainer, MenuContainer, NewPost, PostButton, PostsContainer, Profile } from "./styles";

import { Post } from "../../../../components/Post";
import { Avatar } from "../../../../components/Avatar";
import { TopicContainer } from "./styles";

import homeIcon from '../../../../assets/home.svg'
import cameraIcon from '../../../../assets/cameraIcon.svg'
import imageIcon from '../../../../assets/imageIcon.svg'
import attachmentIcon from '../../../../assets/attachmentIcon.svg'
import mapPinIcon from '../../../../assets/mapPinIcon.svg'
import emojiIcon from '../../../../assets/emojiIcon.svg'
import profileIcon from '../../../../assets/profileIcon.jpg'
import { DataContext } from "../../../../contexts/DataContext";
import api from "../../../../services/api";

interface CreatePostInput {
  username: string;
  profilePhoto?: string;
  // postDate: Date;
  description: string;
  urlImage: string;
}

type User = {
  id: string;
  name: string;
  username: string;
  birthDate: string;
  email: string;
  profilePhoto: string | null;
}

interface PostsProps {
  id: string;
  urlImage: string;
  postDate: string;
  username: string;
  profilePhoto: string;
  description: string;
}

export function Main() {

  const { createPost, deletePost } = useContext(DataContext)
  const [posts, setPosts] = useState<PostsProps[]>()
  const [users, setUsers] = useState<User[]>()
  const [userlogged, setUserlogged] = useState<User | null>()


  const [newPostText, setNewPostText] = useState("")

  async function handleCreateNewPost(event: FormEvent) {
    event.preventDefault()

    const newPost: CreatePostInput = {
      username: userlogged!.username,
      // profilePhoto: userlogged?.profilePhoto || undefined,
      // postDate: new Date(),
      description: newPostText,
      urlImage: ""
    }
    
    await createPost(newPost)

    setNewPostText("")
    window.location.href = '/home';
  }

  function handleNewPostChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("")
    setNewPostText(event.target.value)
  }

  function handleNewPostInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório")
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await api.get('/users/profile')
        const data: User = responseData.data
        setUserlogged({
            id: data.id,
            name: data.name,
            username: data.username,
            birthDate: data.birthDate,
            email: data.email,
            profilePhoto: data.profilePhoto
        })

        const responseDataPost = await api.get('/posts')
  
        setPosts([...responseDataPost.data.posts])


        const responseUserData = await api.get('/users')
        const myFriends:User[]  = responseUserData.data.users.filter((item:User)=> {
          return item.id !== data.id
        })
        setUsers([...myFriends])
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);
  const isNewPostEmpty = newPostText.length === 0;
  return (
    <Container>
      <Header>
        <MenuContainer>
          <img src={homeIcon} alt="" />
          <span>Home</span>
        </MenuContainer>
        <Profile>
          <span>{userlogged?.name}</span>
          <Avatar src={userlogged?.profilePhoto === null ? profileIcon : userlogged?.profilePhoto === "" ? profileIcon : userlogged?.profilePhoto} alt="" width={42} height={42}/>
        </Profile>        
      </Header>

      <BodyContainer>
        <PostsContainer>
          <NewPost>
            <form onSubmit={handleCreateNewPost}>
              <HeaderContainer>
                <Avatar src={userlogged?.profilePhoto === null ? profileIcon : userlogged?.profilePhoto === "" ? profileIcon : userlogged?.profilePhoto} alt="" width={32} height={32}/>
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
                  <button disabled><img src={cameraIcon} alt="" /></button>
                  <button disabled><img src={imageIcon} alt="" /></button>
                  <button disabled><img src={attachmentIcon} alt="" /></button>
                  <button disabled><img src={mapPinIcon} alt="" /></button>
                  <button disabled><img src={emojiIcon} alt="" /></button>
                </BottomButtons>
                <PostButton type="submit" disabled={isNewPostEmpty}>
                  Postar
                </PostButton>
              </BottomButtonsContainer>
            </form>
          </NewPost>

          {posts && posts.map((post, i) => {
            return (
              <Post
                id={post.id}
                userName={post?.username}
                // user={post?.user}
                avatarURL={post?.profilePhoto ?? profileIcon}
                publishedAt={post?.postDate}
                description={post?.description}
                // likes={post?.likes}
                // comments={post?.comments}
                imagePost={post?.urlImage}
                key={post.id}
                onDeletePost={deletePost}
              />
            )
          })}
          
        </PostsContainer>
        <TopicContainer>
          <BoxTopicContainer>
            <p>Meus Amigos</p>
            <ul>
              {users && users.map((user, i) => {
                return (
                <li key={i}>
                  <Avatar src={user.profilePhoto === null ? profileIcon : user.profilePhoto === "" ? profileIcon : user.profilePhoto} alt="" width={32} height={32}/>
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