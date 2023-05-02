import { ChangeEvent, FormEvent, InvalidEvent, useState, useContext } from "react";

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

interface CreatePostInput {
  description: string;
  url_imagem: string;
}

export function Main() {

  const { createPost, posts, users, userlogged } = useContext(DataContext)
  const [newPostText, setNewPostText] = useState("")

  async function handleCreateNewPost(event: FormEvent) {
    event.preventDefault()

    const newPost: CreatePostInput = {
      description: newPostText,
      url_imagem: ""
    }
    
    await createPost(newPost)

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
          <span>{userlogged?.name}</span>
          <Avatar src={userlogged?.profile_photo ?? profileIcon} alt="" width={42} height={42}/>
        </Profile>        
      </Header>

      <BodyContainer>
        <PostsContainer>
          <NewPost>
            <form onSubmit={handleCreateNewPost}>
              <HeaderContainer>
                <Avatar src={userlogged?.profile_photo ?? profileIcon} alt="" width={32} height={32}/>
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

          {posts.map((post, i) => {
            return (
              <Post
                userName={post?.name}
                user={post?.user}
                avatarURL={post?.profile_photo ?? profileIcon}
                publishedAt={post?.post_date}
                description={post?.description}
                likes={post?.likes}
                comments={post?.comments}
                imagePost={post?.url_imagem}
                key={`${i}${post.description}`}
              />
            )
          })}
          
        </PostsContainer>
        <TopicContainer>
          <BoxTopicContainer>
            <p>Meus Amigos</p>
            <ul>
              {users.map((user, i) => {
                return (
                <li key={i}>
                  <Avatar src={user.profile_photo ?? profileIcon} alt="" width={32} height={32}/>
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