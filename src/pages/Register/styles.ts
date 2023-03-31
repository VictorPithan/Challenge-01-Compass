import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;

export const ImgBackground = styled.img`
  width: auto;
  height: 100vh;
`;

export const ContainerRegister = styled.aside`
  width: 100%;
  min-width: 720px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: linear-gradient(180deg, #2E2F36 0%, #17181C 100%);
  padding-inline: 9.812rem;
  padding-top: 1rem;

  h1 {
    color: ${props => props.theme.white};
    font-size: 4rem;
    font-weight: 500;
    line-height: 1.5;
    align-self: flex-start;
  }

  h3 {
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5;
    align-self: flex-start;

    margin-top: 1.5rem;
  }
`;
export const FormContainer = styled.form`
  margin-top: 3rem;
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
      background: linear-gradient(180deg, #AD2D14 0%, #F42E07 100%);
      border: 1px solid ${props => props.theme["orange-400"]};
      border-radius: 46px;
      padding-inline: 9.4rem;
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
        color: ${props => props.theme.white};
      }
    }
  }

  .invalidInput {
    max-width: 416px;
    font-weight: 500;
    line-height: 1.5;
    color: ${props => props.theme["yellow-400"]};
    text-align: center;

    margin-top: 1.5rem;
  }

  .invalid-input {
    border: 2px solid ${props => props.theme["yellow-400"]};
  }
`;

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
      
      border: 2px solid ${props => props.theme.white};
      border-radius: 46px;
      background: transparent;
      padding-inline: 1.5rem;
      padding-block: 1.187rem;

      margin-top: 1.5rem;

      &::placeholder {
        color: ${props => props.theme.white};
        font-weight: 400;
        line-height: 1.5;
      }
    }

    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 60px #27282F inset;
      -webkit-text-fill-color: white !important;
    }

    input[type="date"]::-webkit-calendar-picker-indicator {
      opacity: 0;
    }
`;