import React from "react";
import { Container } from "./style";
import logo from "../../assets/logo-white.svg";

export function Footer() {
  
  return (
    <Container>
      <h3>Teste da Shopper</h3>
      <img src={logo} alt="logo da Shopper" />
    </Container>
  );
}