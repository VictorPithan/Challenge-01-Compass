import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.75rem;
  background: ${props => props.theme["gray-700"]};
  border: 2px solid ${props => props.theme["gray-600"]};
  border-left: none;
`;

export const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;

  span {
    color: ${props => props.theme.white};
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5;
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;

  span {
    line-height: 1.5;
  }
`;

export const BodyContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 2.25rem;
  gap: 2.25rem;
`;

export const PostsContainer = styled.main`
  width: 100%;
`;

export const TopicContainer = styled.aside`

`;

export const BoxTopicContainer = styled.div`
  width: 272px;
  height: 272px;
  background: ${props => props.theme["gray-700"]};
  border-radius: 16px;
  border: 2px solid ${props => props.theme["gray-600"]};
  padding: 1.5rem 1.25rem;
  overflow: auto;

  p {
    font-family: 'Inter', sans-serif;
    line-height: 1.1875;

    & + ul {
      margin-top: 1.5rem;
    }
  }

  & + & {
    margin-top: 2.25rem;
  }

  li {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;

    span {
      font-size: 0.875rem;
      line-height: 1.5;
    }

    & + li {
      margin-top: 1rem;
    }
  }

  &::-webkit-scrollbar {
    
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background: ${props => props.theme["gray-600"]};
  }

  &::-webkit-scrollbar-track {
    display: none;
    background: ${props => props.theme["gray-700"]};
  }
`;

export const NewPost = styled.div`
  background: ${props => props.theme["gray-700"]};
  border-radius: 16px;
  border: 2px solid ${props => props.theme["gray-600"]};
  padding: 1rem;
`;

export const HeaderContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  textarea {
    width: 100%;
    height: 2rem;
    border: none;
    border-radius: 16px;
    resize: none;
    background: ${props => props.theme["gray-650"]};
    padding-inline: 1.5rem;
    padding-top: 0.3rem;
    padding-right: 12rem;
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

export const BottomButtons = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  button { 
    background: transparent;
    border: none;
    cursor: pointer; 
  }
`;

export const PostButton = styled.button`
  background: transparent;
  border: 2px solid ${props => props.theme["gray-650"]};
  font-size: 0.875rem;
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

export const BottomButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.125rem;
`;