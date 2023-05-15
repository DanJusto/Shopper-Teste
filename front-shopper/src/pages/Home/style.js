import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
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
  gap: 3rem;
  align-items: center;
  justify-content: space-between;
  margin-top: -4rem;
    
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  label {
    font-weight: 600;
  }

  input {
    width: 100%;
    font-size: 1.3rem;
  }

  button {
    width: 18rem;
    border-radius: 20px;
    border: none;
    padding: 1.2rem 3.2rem;
    background-color: #2DA77A;
    color: #FFFFFF;
    font-weight: 600;
    font-size: 1.4rem;
  }

  @media screen and (min-width: 600px) {
    width: 50rem;
    gap: 4rem;
    margin-top: -5rem;

    div {
      gap: 2.5rem;
    }

    input {
      font-size: 1.5rem;
    }

    button {
      width: 21rem;
      font-size: 1.7rem;
    }
  }

  @media screen and (min-width: 1024px) {
    width: 80rem;
    gap: 5rem;
    margin-top: -6rem;

    div {
      gap: 3rem;
    }

    input {
      font-size: 1.8rem;
    }

    button {
      width: 25rem;
      font-size: 2rem;
    }
  }
`;