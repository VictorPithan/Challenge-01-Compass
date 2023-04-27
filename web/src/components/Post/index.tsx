import { Avatar } from "../Avatar";
import { BottomButtonsContainer, ImgPost, PostContainer } from "./styles";

import ilhaDoComendador from '../../assets/ilhaDoComendador.png'
import likeIcon from '../../assets/likeIcon.svg'
import commentIcon from '../../assets/commentIcon.svg'
import shareIcon from '../../assets/shareIcon.svg'
import oClockIcon from '../../assets/oClockIcon.svg'

export function Post() {
  return (
    <PostContainer>
      <header>
        <div>
          <Avatar src="https://github.com/victorpithan.png" alt="" width={32} height={32}/>
          <div>
            <p>Victor Pithan</p>
            <time
              title="25-04-2023"
              dateTime="25-04-2023"
            >
              <img src={oClockIcon} alt="" />
              12 minutos atrás em <strong>paisagens exuberantes</strong>
            </time>
          </div>
        </div>
      </header>
      <p>Minha última viagem para a ilha do Comendador, um lugar simplesmente incrível, natureza praticamente intocada. Recomendo a todos que apreciam o mundo como ele é.</p>
      <ImgPost src={ilhaDoComendador} alt="ilha do comendador" />

      <BottomButtonsContainer>
        <button><img src={likeIcon} alt="" /> Curtiu <span>1.7k</span></button>
        <button><img src={commentIcon} alt="" /> Comentários <span>345</span></button>
        <button><img src={shareIcon} alt="" /> Compartilhar</button>
      </BottomButtonsContainer>
    </PostContainer>
  )
}