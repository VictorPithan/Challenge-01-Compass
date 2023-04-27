import { Avatar } from "../Avatar";
import { BottomButtons, BottomButtonsContainer, Container, HeaderContainer, PostButton } from "./styles";

import cameraIcon from '../../assets/cameraIcon.svg'
import imageIcon from '../../assets/imageIcon.svg'
import attachmentIcon from '../../assets/attachmentIcon.svg'
import mapPinIcon from '../../assets/mapPinIcon.svg'
import emojiIcon from '../../assets/emojiIcon.svg'

export function BoxToCreateNewPost() {
  return (
    <Container>
      <HeaderContainer>
        <Avatar src="https://github.com/victorpithan.png" alt="" width={32} height={32}/>
        <input type="text" placeholder="No que você está pensando?"/>
      </HeaderContainer>
      <BottomButtonsContainer>
        <BottomButtons>
          <button><img src={cameraIcon} alt="" /></button>
          <button><img src={imageIcon} alt="" /></button>
          <button><img src={attachmentIcon} alt="" /></button>
          <button><img src={mapPinIcon} alt="" /></button>
          <button><img src={emojiIcon} alt="" /></button>
        </BottomButtons>
        <PostButton>Postar</PostButton>
      </BottomButtonsContainer>
    </Container>
  )
}