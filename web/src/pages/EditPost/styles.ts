import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: auto;
`

export const ImgBackground = styled.img`
  width: 100%;
  object-fit: fill;
  /* height: 100%; */
  /* flex: 1; */
  
`

export const ContainerRegister = styled.aside`
  width: 100%;
  /* height: 100%; */
  /* flex: 1; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: linear-gradient(180deg, #2e2f36 0%, #17181c 100%);
  padding-inline: 9.812rem;
  padding-top: 1rem;

  h1 {
    color: ${(props) => props.theme.white};
    font-size: 4rem;
    font-weight: 500;
    line-height: 1.25;
    align-self: flex-start;
  }

  h3 {
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5;
    align-self: flex-start;

    margin-top: 0.75rem;
  }

  @media (min-height: 1024px) {
    h3 {
      margin-top: 1rem;
    }
  }
`
export const FormContainer = styled.form`
  margin-top: 1rem;
  width: 416px;
  fieldset {
    display: flex;
    flex-direction: column;
    border: none;

    legend {
      font-weight: 400;
      font-size: 2rem;
      line-height: 1.5;
      margin-bottom: 4rem;
    }

    .buttons {
      display: flex;
      gap: 2rem;

      button, a {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        
        border-radius: 46px;
        padding-inline: 2rem;// 9.4rem;
        padding-block: 0.8rem;//1.187rem;
        margin-top: 1.5rem;

        font-weight: 600;
        font-size: 1rem;
        line-height: 1.5;

        cursor: pointer;
      }

      button {
        background: linear-gradient(180deg, #ad2d14 0%, #f42e07 100%);
        border: 1px solid ${(props) => props.theme['orange-400']};
      }

      a {
        text-decoration: none;
        background: transparent;
        border: 1px solid ${(props) => props.theme['gray-300']};
        
        &:link {
          color: ${(props) => props.theme['gray-200']};
        }

        /* link que foi visitado */
        &:visited {
            color: ${(props) => props.theme['gray-200']};
        }

        /* mouse over */
        &:hover {
            color: ${(props) => props.theme['gray-300']};
        }

        /* link selecionado */
        &:active {
            color: ${(props) => props.theme['gray-200']};
        }
      }
    }
    

    .invalidInput + button {
      margin-top: 1rem;
    }

    span {
      margin: 1.5rem auto;

      a:link {
        text-decoration: none;
        color: ${(props) => props.theme.white};
      }

      a:visited {
        text-decoration: none;
        color: ${(props) => props.theme.white};
      }
    }

    @media (min-height: 1024px) {
      margin-top: 2.5rem;
      .invalidInput + button {
        margin-top: 1.5rem;
      }

      .invalidInput {
        margin-top: 1.5rem;
      }
    }
  }

  .invalidInput {
    max-width: 416px;
    font-weight: 500;
    line-height: 1.5;
    color: ${(props) => props.theme['yellow-400']};
    text-align: center;

    margin-top: 1rem;
  }

  .invalid-input {
    border: 2px solid ${(props) => props.theme['yellow-400']};
  }
`

export const InputForm = styled.div`
  position: relative;

  img {
    position: absolute;
    top: 50%;
    right: 25px;
    width: 1.5rem;
  }

  input {
    width: 100%;

    font-weight: 400;
    line-height: 1.5;

    border: 2px solid ${props => props.theme["gray-300"]};
    border-radius: 16px;
    background: transparent;
    padding-inline: 1.5rem;
    padding-block: 1.187rem;

    margin-top: 1.5rem;

    &::placeholder {
      color: ${props => props.theme["gray-300"]};
      font-size: 0.875rem;
      line-height: 1.5;
    }
  }

  textarea {
    width: 100%;
    height: 8rem;
    border: 2px solid ${props => props.theme["gray-300"]};
    border-radius: 16px;
    resize: none;
    background: transparent;
    padding-inline: 1.5rem;
    padding-top: 0.35rem;
    color: ${props => props.theme.white};
    font-size: 0.875rem;
    line-height: 1.5;
    /* overflow-y: hidden; */

    &::placeholder {
      color: ${props => props.theme["gray-300"]};
      font-size: 0.875rem;
      line-height: 1.5;
    }
  }
`
