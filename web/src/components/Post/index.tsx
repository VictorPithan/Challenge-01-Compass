import { ChangeEvent, FormEvent, InvalidEvent, useContext, useState, useEffect } from "react";

import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { Avatar } from "../Avatar";
import { BottomButtonsContainer, Comment, ImgPost, NewCommentPost, PostButton, PostContainer } from "./styles";

import likeIcon from '../../assets/likeIcon.svg'
import likeIconWhite from '../../assets/like-svg.svg'
import commentIcon from '../../assets/commentIcon.svg'
import shareIcon from '../../assets/shareIcon.svg'
import oClockIcon from '../../assets/oClockIcon.svg'
import { NotePencil, Trash } from "phosphor-react"
import profileIcon from '../../assets/profileIcon.jpg'

import cameraIcon from '../../assets/cameraIcon.svg'
import imageIcon from '../../assets/imageIcon.svg'
import attachmentIcon from '../../assets/attachmentIcon.svg'
import mapPinIcon from '../../assets/mapPinIcon.svg'
import emojiIcon from '../../assets/emojiIcon.svg'
import iconProfile from '../../assets/profileIcon.jpg'
import { DataContext } from "../../contexts/DataContext";
import api from "../../services/api";

interface CommentProps {
  postId: string;
  username: string;
  content: string;
}

interface PostProps {
  id: string;
  // user?: string;
  userName?: string;
  avatarURL?: string;
  publishedAt: Date | string;
  description: string;
  // likes: number;
  imagePost?: string | null;
  // comments: CommentProps[];
  onDeletePost: (post: string) => void
}
// {user,comments = [], , likes}
export function Post({id, userName, avatarURL = iconProfile, description, publishedAt, imagePost = null, onDeletePost}: PostProps) {
  const [listComments, setListComments] = useState<CommentProps[]>()
  const { deletePost, createComment } = useContext(DataContext)
  const [newCommentText, setNewCommentText] = useState("")

  const [likesPost, setLikesPost] = useState(0); // likes
  const [like, setLike] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await api.get(`/posts/${id}/comments`)
        const data:CommentProps[] = responseData.data.comments
        setListComments([...data])
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchData();
  }, []);

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()

    const newComment:CommentProps = {
      postId: id,
      username: userName!,
      content: newCommentText,
    }

    createComment(newComment)
    setNewCommentText("")
    window.location.href = '/home';
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

  async function handleDeletePost() {
    await deletePost(id)
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
          <Avatar src={avatarURL === null ? profileIcon : avatarURL === "" ? profileIcon : avatarURL} alt="" width={32} height={32}/>
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
        <div>
          <a href={`/update-post/${id}`}>
            <NotePencil size={24}/>
          </a>
          <button onClick={handleDeletePost} title="Deletar post">
            <Trash size={24} />
          </button>
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
        <button><img src={commentIcon} alt="" /> Comentários <span>{listComments === undefined ? 0 : listComments.length}</span></button>
        <button><img src={shareIcon} alt="" /> Compartilhar</button>
      </BottomButtonsContainer>

      <NewCommentPost>
        {/* <Avatar src={avatarURL === null ? profileIcon : avatarURL === "" ? profileIcon : avatarURL} width={32} height={32}/> */}
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
        listComments && listComments.map((comment, i) => {
          return (
            <Comment key={`${i} ${comment.content}`}>
              {/* <Avatar src={comment.profile_photo ?? iconProfile} width={24} height={24}/> */}
              <p><span>{comment.username}: </span>{comment.content}</p>
            </Comment>
          )
        })
      }

      <hr />
      <p className="allComments">Ver todos os comentários</p>
    </PostContainer>
  )
}