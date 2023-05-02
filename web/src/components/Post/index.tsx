import { ChangeEvent, FormEvent, InvalidEvent, useContext, useState } from "react";

import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { Avatar } from "../Avatar";
import { BottomButtonsContainer, Comment, ImgPost, NewCommentPost, PostButton, PostContainer } from "./styles";

import likeIcon from '../../assets/likeIcon.svg'
import likeIconWhite from '../../assets/like-svg.svg'
import commentIcon from '../../assets/commentIcon.svg'
import shareIcon from '../../assets/shareIcon.svg'
import oClockIcon from '../../assets/oClockIcon.svg'

import cameraIcon from '../../assets/cameraIcon.svg'
import imageIcon from '../../assets/imageIcon.svg'
import attachmentIcon from '../../assets/attachmentIcon.svg'
import mapPinIcon from '../../assets/mapPinIcon.svg'
import emojiIcon from '../../assets/emojiIcon.svg'
import iconProfile from '../../assets/profileIcon.jpg'
import { DataContext } from "../../contexts/DataContext";

interface CommentProps {
  user?: string | null;
  profile_photo?: string | null;
  name?: string;
  comment: string;
}

interface PostProps {
  user?: string;
  userName?: string;
  avatarURL?: string;
  publishedAt: Date | string;
  description: string;
  likes: number;
  imagePost?: string | null;
  comments: CommentProps[];
}

export function Post({user, userName, avatarURL = iconProfile, publishedAt, description, likes, comments = [], imagePost = null}: PostProps) {
  const { userlogged } = useContext(DataContext) 
  const [listComments, setListComments] = useState(comments)

  const [newCommentText, setNewCommentText] = useState("")

  const [likesPost, setLikesPost] = useState(likes);
  const [like, setLike] = useState(0);

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()

    const newComment = {
      user: userlogged?.name,
      comment: newCommentText,
      name: userlogged?.name,
      profile_photo: userlogged?.profile_photo
    }

    setListComments([newComment, ...listComments])
    setNewCommentText("")
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("")
    setNewCommentText(event.target.value)
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!")
  }

  function handlerLikePost() {
    if(like > 0 && likesPost > 0) {
      setLike(0)
      setLikesPost(likesPost - 1)
    } else {
      setLike(1)
      setLikesPost(likesPost + 1)
    }
  }

  const publishedDateFormatted = format(
    new Date(publishedAt),
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  )

  const publishedDateRelativeToNow = formatDistanceToNow(new Date(publishedAt), {
    locale: ptBR,
    addSuffix: true,
  })

  const isNewCommentEmpty = newCommentText.length === 0

  return (
    <PostContainer>
      <header>
        <div>
          <Avatar src={avatarURL} alt="" width={32} height={32}/>
          <div>
            <p>{userName}</p>
            <time
              title={publishedDateFormatted}
              dateTime={new Date(publishedAt).toISOString()}
            >
              <img src={oClockIcon} alt="" />
              {publishedDateRelativeToNow} atrás em <strong>paisagens exuberantes</strong>
            </time>
          </div>
        </div>
      </header>
      <p>{description}</p>
      {imagePost != null ? <ImgPost src={imagePost} alt="" /> : ''}

      <BottomButtonsContainer>
        <button onClick={handlerLikePost} className={like > 0 ? 'likeIcon' : ''}>
          <img src={like > 0 ? likeIcon : likeIconWhite} alt="" />
          {like > 0 ? 'Curtiu' : 'Curtir'}
          <span className="colorButtonLike">
            {likesPost}
          </span>
        </button>
        <button><img src={commentIcon} alt="" /> Comentários <span>{listComments.length}</span></button>
        <button><img src={shareIcon} alt="" /> Compartilhar</button>
      </BottomButtonsContainer>

      <NewCommentPost>
        <Avatar src={userlogged?.profile_photo ?? iconProfile} width={32} height={32}/>
        <form onSubmit={handleCreateNewComment} className="commentForm">
          <div>
            <textarea
              className="textarea-style"
              name="comment"
              placeholder="O que voce está pensando?"
              value={newCommentText}
              onChange={handleNewCommentChange}
              onInvalid={handleNewCommentInvalid}
              required
            />
            <ul className="bottom-button-hidden">
              <li>
                <button>
                  <img src={cameraIcon} alt="" />
                </button>
              </li>
              <li>
                <button>
                  <img src={imageIcon} alt="" />
                </button>
              </li>
              <li>
                <button>
                  <img src={attachmentIcon} alt="" />
                </button>
              </li>
              <li>
                <button>
                  <img src={mapPinIcon} alt="" />
                </button>
              </li>
              <li>
                <button>
                  <img src={emojiIcon} alt="" />
                </button>
              </li> 
            </ul>
          </div>
          <footer>
            <ul>
              <li>
                <button disabled>
                  <img src={cameraIcon} alt="" />
                </button>
              </li>
              <li>
                <button disabled>
                  <img src={imageIcon} alt="" />
                </button>
              </li>
              <li>
                <button disabled>
                  <img src={attachmentIcon} alt="" />
                </button>
              </li>
              <li>
                <button disabled>
                  <img src={mapPinIcon} alt="" />
                </button>
              </li>
              <li>
                <button disabled>
                  <img src={emojiIcon} alt="" />
                </button>
              </li> 
            </ul>
            <PostButton type="submit" disabled={isNewCommentEmpty}>
              Postar
            </PostButton>
          </footer>
          
        </form>
      </NewCommentPost>
      <p>Todos os comentários</p>
      {
        listComments.map((comment, i) => {
          return (
            <Comment key={`${i} ${comment.comment}`}>
              <Avatar src={comment.profile_photo ?? iconProfile} width={24} height={24}/>
              <p><span>{comment.name}: </span>{comment.comment}</p>
            </Comment>
          )
        })
      }

      <hr />
      <p className="allComments">Ver todos os comentários</p>
    </PostContainer>
  )
}