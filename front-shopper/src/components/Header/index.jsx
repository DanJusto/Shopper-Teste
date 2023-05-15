import React from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "./style";
import logo from "../../assets/logo-black.svg";

export function Header() {
  const navigate = useNavigate();
  
  function navigateToHomeAndReload() {
    navigate("/");
    window.location.reload();
  }

  return (
    <Container>
      <img src={logo} alt="logo da Shopper" onClick={navigateToHomeAndReload} />
      <p>Shopper: Teste para Dev Junior</p>
    </Container>
  );
}