import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import api from './services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === '') { 
      toast.error('INFORME UM CEP', { className: 'toast-error' });
      return;
    }
  
    try {
      const response = await api.get(`${input}/json`);
      if (response.status === 200 && response.data.erro) {
        toast.error('CEP não encontrado', { className: 'toast-error' });
        setInput('');
      } else {
        setCep(response.data);
        console.log(response.data);
        setInput('');
        toast.success('CEP encontrado', { className: 'toast-success' });
      }
    } catch {
      toast.error('Erro ao buscar CEP', { className: 'toast-error' });
      setInput('');
    }
  }
  

  return (
    <div className="container">
      <h1 className="title">Localizar CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          className=""
          placeholder="Digite um CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>{cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>{cep.bairro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}

      <ToastContainer />
    </div>
  );
}

export default App;
