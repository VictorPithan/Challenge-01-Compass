import { BodyContainer, BoxTopicContainer, Container, Header, MenuContainer, PostsContainer, Profile } from "./styles";

import homeIcon from '../../../../assets/home.svg'
import { Post } from "../../../../components/Post";
import { Avatar } from "../../../../components/Avatar";
import { BoxToCreateNewPost } from "../../../../components/BoxToCreateNewPost";
import { TopicContainer } from "./styles";

export function Main() {
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
          <BoxToCreateNewPost />
          <Post />
        </PostsContainer>
        <TopicContainer>
          <BoxTopicContainer>
            <p>Meus Amigos</p>
            <div>
              <Avatar src="https://github.com/victorpithan.png" alt="" width={32} height={32}/>
              <span>Victor Pithan</span>
            </div>
            <div>
              <Avatar src="https://github.com/ihagoSantos.png" alt="" width={32} height={32}/>
              <span>Ihago Freire Santos</span>
            </div>
            <div>
              <Avatar src="https://github.com/isadorabrito.png" alt="" width={32} height={32}/>
              <span>Isadora Brito</span>
            </div>
          </BoxTopicContainer>
          <BoxTopicContainer></BoxTopicContainer>
          <BoxTopicContainer></BoxTopicContainer>
        </TopicContainer>
      </BodyContainer>
    </Container>
  )
}