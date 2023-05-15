import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { Container, Form, Item } from './style'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

export function Validation() {
  const [validate, setValidate] = useState(null);
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();
  
  function navigateToHomeAndReload() {
    navigate("/");
    window.location.reload();
  }

  function handleUpdateProducts() {
    api.put("/products");
    navigateToHomeAndReload();
  }

  useEffect(() => {
    async function fetchValidations() {
      const response = await api.get("/products");
      setProducts(response.data.listProducts);
      setValidate(response.data.valid);
    }
    fetchValidations();
  }, []);

  useEffect(() => {
    if (validate) {
      const button = document.querySelector(".atualizar-button");
      button.classList.remove('hide');
    }
  }, [validate]);

  return (
    <Container>
      <Header/>
      <Form>
        {
          products &&
          <div id="resposta">
            {
              products.map((validate, index) => (
                <Item key={index}>
                  <p>Código: {validate.code}</p>
                  <p>Nome: {validate.name}</p>
                  <p>Preço Atual: {validate.currentPrice}</p>
                  <p>Novo Preço: {validate.newPrice}</p>
                  <p className='validacao'>{validate.validation}</p>
                </Item>
              ))
            }
          </div>
        }
        <div className='buttons'>
          <button id="back-button" onClick={navigateToHomeAndReload}>Voltar</button>
          <button className="atualizar-button hide" onClick={handleUpdateProducts}>Atualizar</button>
        </div>
      </Form>
      <Footer/>
    </Container>
  )
}

