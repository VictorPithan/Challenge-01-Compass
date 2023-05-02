import styled from "styled-components";

export const PostContainer = styled.article`
  background: ${props => props.theme["gray-700"]};
  border-radius: 16px;
  border: 2px solid ${props => props.theme["gray-600"]};
  padding-block: 1rem;
  margin-top: 1.5rem;

  header {
    padding-inline: 1rem;
    & > div {
      display: flex;
      gap: 1rem;
      align-items: center;

      & > div {
        p {
          font-size: 0.875rem;
          line-height: 1.5;
        }

        time {
          color: ${props => props.theme["gray-300"]};
          font-size: 0.75rem;
          line-height: 1.5;
          display: flex;
          align-items: center;
          gap: 0.375rem;

          strong {
            color: ${props => props.theme.white};
            font-weight: 500;
          }
        }
      }
    }
  }

  & > p {
    padding-inline: 1rem;
    margin-top: 1rem;
    font-size: 0.75rem;
    line-height: 1.5;
  }
 
 hr {
  border: 1px solid ${props => props.theme["gray-600"]};
  margin-inline: 1rem;
  margin-top: 1rem;
 }

 .allComments {
  display: flex;
  justify-content: center;
  font-size: 0.875rem;
  line-height: 1.2;
  font-weight: 500;
  color: ${props => props.theme["blue-400"]};
  font-family: 'Inter', sans-serif;
  cursor: pointer;
 }
`;

export const ImgPost = styled.img`
  padding: 0;
  width: 100%;
  margin-top: 1rem;
`;

export const BottomButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-inline: 3rem;
  margin-top: 0.625rem;

  .colorButtonLike {
    background: ${props => props.theme["blue-400"]};
  }

  .likeIcon {
    color: ${props => props.theme["blue-400"]};
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: transparent;
    border: 0;
    cursor: pointer;

    font-size: 0.75rem;
    line-height: 1.25;
    color: ${props => props.theme["gray-200"]};
    font-family: 'Inter', sans-serif;

    span {
      font-family: 'Inter', sans-serif;
      font-size: 0.6rem;
      line-height: 1.25;
      background: ${props => props.theme["gray-650"]};
      color: ${props => props.theme.white};
      border-radius: 16px;
      padding: 0.125rem 0.375rem;
    }
  }
`;

export const NewCommentPost = styled.div`
  display: flex;
  gap: 1rem;
  padding-inline: 1rem;
  margin-top: 1.125rem;

  form {
    width: 100%;
  }

  .commentForm:focus-within .textarea-style{
    height: 3rem;

    &::placeholder {
      color: transparent;
    }
  }

  .commentForm:focus-within footer {
      visibility: visible;
      max-height: none;
  }

  .commentForm:focus-within .bottom-button-hidden {
      visibility: hidden;
      max-height: 0;
  }

  .commentForm footer {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    visibility: hidden;
    max-height: 0;

    ul {
      display: flex;
      gap: 1.5rem;
      align-content: center;

      li {
        list-style: none;
      }

      button {
        background: transparent;
        border: none;
        cursor: pointer;
      }

      img {
        width: 1.2rem;
      }
    }
  }

  form > div {
    position: relative;
    width: 100%;
    
    ul {
      display: flex;
      gap: 1rem;
      position: absolute;
      top: 5px;
      right: 15px;

      li {
        list-style: none;
      }

      button {
        background: transparent;
        border: none;
        cursor: pointer;
      }

      img {
        width: 1rem;
      }
    }
  }

  textarea {
    width: 100%;
    height: 2rem;
    border: none;
    border-radius: 16px;
    resize: none;
    background: ${props => props.theme["gray-650"]};
    padding-inline: 1.5rem;
    padding-top: 0.35rem;
    color: ${props => props.theme.white};
    font-size: 0.875rem;
    line-height: 1.5;
    overflow-y: hidden;

    &::placeholder {
      color: ${props => props.theme["gray-300"]};
      font-size: 0.875rem;
      line-height: 1.5;
    }
  }
`;

export const Comment = styled.div`
  display: flex;
  padding-inline: 1rem;
  margin-top: 1rem;
  gap: 1rem;
  span {
    font-size: 0.75rem;
    line-height: 1.5;
  }
  p {
    font-size: 0.625rem;
    line-height: 1.5;
  }
`;

export const PostButton = styled.button`
  background: transparent;
  border: 2px solid ${props => props.theme["gray-650"]};
  font-size: 0.8rem;
  line-height: 1.5;
  color: ${props => props.theme.white};
  border-radius: 8px;
  padding: 0.375rem 2rem;
  cursor: pointer;

  transition: filter 0.2s;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:not(:disabled):hover {
    filter: brightness(0.9);
  }
`;