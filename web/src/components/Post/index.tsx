import { ChangeEvent, FormEvent, InvalidEvent, useEffect, useState } from "react";

import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { Avatar } from "../Avatar";
import { BottomButtonsContainer, Comment, ImgPost, NewCommentPost, PostButton, PostContainer } from "./styles";

import likeIcon from '../../assets/likeIcon.svg'
import commentIcon from '../../assets/commentIcon.svg'
import shareIcon from '../../assets/shareIcon.svg'
import oClockIcon from '../../assets/oClockIcon.svg'

import cameraIcon from '../../assets/cameraIcon.svg'
import imageIcon from '../../assets/imageIcon.svg'
import attachmentIcon from '../../assets/attachmentIcon.svg'
import mapPinIcon from '../../assets/mapPinIcon.svg'
import emojiIcon from '../../assets/emojiIcon.svg'
import iconProfile from '../../assets/profileIcon.jpg'

// interface AuthorPost {
//   user: string;
//   avatarURL: string;
// }

interface CommentProps {
  user: string;
  avatarURL?: string;
  comment: string;
}

interface PostProps {
  user: string;
  userName?: string;
  avatarURL?: string;
  publishedAt: Date | string;
  description: string;
  likes: number;
  imagePost?: string | null;
  comments: CommentProps[];
}

export function Post({user, userName, avatarURL = iconProfile, publishedAt, description, likes, comments = [], imagePost = null}: PostProps) {
  const [listComments, setListComments] = useState(comments)

  const [newCommentText, setNewCommentText] = useState("")

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()

    const newComment = {
      user,
      comment: newCommentText
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
            <p>{user}</p>
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
        <button><img src={likeIcon} alt="" /> Curtiu <span>{likes}</span></button>
        <button><img src={commentIcon} alt="" /> Comentários <span>{comments.length}</span></button>
        <button><img src={shareIcon} alt="" /> Compartilhar</button>
      </BottomButtonsContainer>

      <NewCommentPost>
        <Avatar src="https://github.com/victorpithan.png" width={32} height={32}/>
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
        listComments.map(comment => {
          return (
            <Comment key={`${comment.comment}${comment.user}`}>
              <Avatar src={comment.avatarURL = iconProfile} width={24} height={24}/>
              <p><span>{comment.user}: </span>{comment.comment}</p>
            </Comment>
          )
        })
      }

      <hr />
      <p className="allComments">Ver todos os comentários</p>
    </PostContainer>
  )
}