import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 8rem;
  padding-bottom: 6.2rem;
  transition: 500ms;

  @media screen and (min-width: 600px) {
    padding-top: 9.6rem;
    padding-bottom: 7rem;
  }

  @media screen and (min-width: 1024px) {
    padding-top: 11rem;
    padding-bottom: 8.8rem;
  }
`;

export const Form = styled.form`
  width: 30rem;
  height: fit-content;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 3rem;
  background-color: #FFFFFF;
  box-shadow: 3px 3px 4px #A9A9A9;
  justify-content: space-between;
    
  #resposta {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    div:last-child {
      border-bottom: none;
    }
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1.5rem;
    gap: 2rem;

    button {
      width: 12rem;
      border-radius: 20px;
      border: none;
      padding: 1.2rem 3.2rem;
      background-color: #2DA77A;
      color: #FFFFFF;
      font-weight: 600;
      font-size: 1.2rem;
    }

    #back-button {
      background-color: #B22222;
    }

    .hide {
      display: none;
    }
  }


  @media screen and (min-width: 600px) {
    width: 50rem;
    padding-top: 9.6rem;

    .buttons {
      gap: 2.5rem;

      button {
        width: 21rem;
        font-size: 1.7rem;
      }
    }
    
  }

  @media screen and (min-width: 1024px) {
    width: 80rem;
    padding-top: 11rem;

    .buttons {
      gap: 3rem;

      button {
        width: 25rem;
        font-size: 2rem;
      }
    }

  }
`;

export const Item = styled.div`
  width: 100%;
  display: flex;
  gap: 3px;
  border-bottom: 1px solid #2DA77A;
  padding-bottom: 0.5rem;

  p {
    font-size: 1.2rem;
  }

  .validacao {
    font-weight: 600;
  }
`;