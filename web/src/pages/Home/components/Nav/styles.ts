import styled from "styled-components";

export const Container = styled.div`
  width: 350px;
  height: 100vh;
  padding-inline: 3.5rem;
  padding-top: 2.6rem;
  background: ${props => props.theme["gray-700"]};
  border: 2px solid ${props => props.theme["gray-600"]};

  img {
    width: 100%;
    margin-bottom: 2rem;
  }

  a, button {
      width: 100%;
      background: transparent;
      color: ${props => props.theme["gray-200"]};
      border: none;
      height: 50px;
      font-weight: bold;
      display: block;
      text-decoration: none;

      display: flex;
      align-items: center;
      justify-content: left;

      gap: 0.5rem;

      cursor: pointer;

      transition: color 0.1s, background-color 0.1s;

      &:hover {
        background: ${props => props.theme["gray-600"]};
        color: ${props => props.theme.white};
      }

      span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      svg {
        overflow: initial;
        color: ${props => props.theme["gray-200"]};
      }
    }
`;