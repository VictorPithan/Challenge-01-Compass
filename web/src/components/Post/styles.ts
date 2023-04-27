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
      font-size: 0.5rem;
      line-height: 1.25;
      background: ${props => props.theme["blue-400"]};
      color: ${props => props.theme.white};
      border-radius: 16px;
      padding: 0.125rem 0.375rem;
    }
  }
`;