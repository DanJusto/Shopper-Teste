import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { Container, Form } from './style'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

export function Home() {
  const [csvFile, setCsvFile] = useState(null);
  const navigate = useNavigate();
  
  function navigateToValidation() {
    navigate("/validation");
  }

  function handleChangeFile(event) {
    const file = event.target.files[0];
    const fileName = file.name;
    if (fileName.endsWith('.csv')) {
      setCsvFile(file);
      return;
    }
    event.target.value = '';
    alert("O arquivo deve possuir a extensão .csv")
  }

  async function handleSaveFile(event) {
    event.preventDefault();

    if (!csvFile) {
      alert("Carregue um arquivo .csv")
      return;
    }
    const fileUploadForm = new FormData();
    fileUploadForm.append("file", csvFile);
    await api.post("/file", fileUploadForm)
    .then(() => navigateToValidation());
  }

  return (
    <Container>
      <Header/>
      <Form>
        <div>
          <label htmlFor="file">Carregue o arquivo .csv</label>
          <input id="file" type="file" onChange={handleChangeFile}/>
        </div>
        <button onClick={handleSaveFile}>Validar</button>
      </Form>
      <Footer/>
    </Container>
  )
}
