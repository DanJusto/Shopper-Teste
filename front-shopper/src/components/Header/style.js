import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  width: 100%;
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #FFFFFF;
  border-top: 6px solid #2DA77A;
  transition: 500ms;

  > img {
    width: 9rem;
    height: auto;
    margin-left: 1.5rem;
    cursor: pointer;
  }

  > p {
    margin-right: 1.5rem;
    //color: #03030B;
    font-weight: 600;
    font-size: 1.2rem;
  }

  @media screen and (min-width: 600px) {
    height: 8.3rem;

    > img {
      width: 12rem;
      margin-left: 2.2rem;
    }

    > p {
      margin-right: 2.2rem;
      font-size: 1.5rem;
    }
  }

  @media screen and (min-width: 1024px) {
    height: 9.6rem;

    > img {
      width: 15rem;
      margin-left: 3rem;
    }

    > p {
      margin-right: 3rem;
      font-size: 1.8rem;
    }
  }
`;