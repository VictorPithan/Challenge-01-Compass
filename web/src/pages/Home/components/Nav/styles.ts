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
  }
`;