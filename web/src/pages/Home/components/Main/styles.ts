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

  p {
    font-family: 'Inter', sans-serif;
    line-height: 1.1875;

    & + div {
      margin-top: 1.5rem;
    }
  }

  & + & {
    margin-top: 2.25rem;
  }

  div {
    display: flex;
    align-items: center;
    gap: 1rem;

    span {
      font-size: 0.875rem;
      line-height: 1.5;
    }

    & + div {
      margin-top: 1rem;
    }
  }
`;