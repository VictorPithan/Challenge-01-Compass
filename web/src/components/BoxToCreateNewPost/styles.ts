import styled from "styled-components";

export const Container = styled.div`
  background: ${props => props.theme["gray-700"]};
  border-radius: 16px;
  border: 2px solid ${props => props.theme["gray-600"]};
  padding: 1rem;
`;

export const HeaderContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  input {
    width: 100%;
    background: ${props => props.theme["gray-650"]};
    border-radius: 46px;
    border: none;
    padding-block: .5rem;
    padding-inline: 1.5rem;
    font-size: 0.875rem;
    line-height: 1.5;

    &::placeholder {  
      color: ${props => props.theme["gray-300"]};
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
`;

export const BottomButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.125rem;
`;