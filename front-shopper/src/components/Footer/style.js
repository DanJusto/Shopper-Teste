import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #3D3D5E;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5rem;
  height: 5.2rem;
  transition: 500ms;

  > h3 {
    font-size: 1.2rem;
    color: #FFFFFF;
  }

  > img {
    width: 9rem;
    height: auto;
    margin-left: 1.5rem;
  }

  @media screen and (min-width: 600px) {
    height: 6rem;
    gap: 18rem;

    > h3 {
      font-size: 1.5rem;
    }

    > img {
      width: 12rem;
      margin-left: 2.2rem;
    }
  }

  @media screen and (min-width: 1024px) {
    height: 6.8rem;
    gap: 30rem;

    > h3 {
      font-size: 1.8rem;
    }

    > img {
      width: 15rem;
      margin-left: 3rem;
    }
  }
`;