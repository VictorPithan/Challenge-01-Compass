import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  overflow: hidden;
`

export const ImgBackground = styled.img`
  width: 38rem;
`

export const ContainerSignIn = styled.aside`
  width: 100%;
  min-width: 38rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background: linear-gradient(180deg, #2e2f36 0%, #17181c 100%);
  padding: 9.812rem;

  h1 {
    color: ${(props) => props.theme.white};
    font-size: 4rem;
    font-weight: 500;
    line-height: 1.5;
    align-self: flex-start;
  }

  h3 {
    display: inline-block;
    width: 405px;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5;
    align-self: flex-start;

    margin-top: 1.5rem;
  }
`
export const FormContainer = styled.form`
  margin-top: 5.937rem;
  fieldset {
    display: flex;
    flex-direction: column;
    border: none;

    legend {
      font-weight: 400;
      font-size: 2rem;
      line-height: 1.5;
    }

    button {
      width: 100%;
      background: linear-gradient(180deg, #ad2d14 0%, #f42e07 100%);
      border: 1px solid ${(props) => props.theme['orange-400']};
      border-radius: 46px;
      padding-inline: 10.3rem;
      padding-block: 1.187rem;
      margin-top: 1.5rem;

      font-weight: 600;
      font-size: 1rem;
      line-height: 1.5;

      cursor: pointer;
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
  }

  .invalidInput {
    max-width: 416px;
    font-weight: 500;
    line-height: 1.5;
    color: ${(props) => props.theme['yellow-400']};
    text-align: center;

    margin-top: 1.5rem;
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
    overflow: hidden;
  }

  input {
    width: 100%;

    font-weight: 400;
    line-height: 1.5;

    border: 2px solid ${(props) => props.theme.white};
    border-radius: 46px;
    background: transparent;
    padding-inline: 1.5rem;
    padding-block: 1.187rem;

    margin-top: 1.5rem;

    &::placeholder {
      color: ${(props) => props.theme.white};
      font-weight: 400;
      line-height: 1.5;
    }
  }

  input:invalid {
    border: 2px solid ${(props) => props.theme['yellow-400']};
  }
`
