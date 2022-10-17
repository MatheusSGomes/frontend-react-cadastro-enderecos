import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import AlertMessage from '../Components/AlertMessage';

const Cadastro = () => {
  let navigate = useNavigate();

  const [enderecos, setEnderecos] = useState([]);
  const [bairros, setBairros] = useState([]);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [idade, setIdade] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    getBairros();
  }, [])
  
  const postPessoa = () => {
    axios
      .post('http://localhost:8000/api/pessoa', {
        nome,
        sobrenome,
        idade,
        login,
        senha,
        status: 1,
        enderecos: [...enderecos]
      })
      .then(res => {
        navigate('/pessoas');
        setMessage([res.data.mensagem, 'success']);
      })
      .catch(error => setMessage([error.response.data.mensagem, 'danger']));
  }

  const adicionarEndereco = () => {
    setEnderecos((prevState) => [
      ...prevState,
      {
        codigoBairro: '',
        nomeRua: '',
        numero: '',
        complemento: '',
        cep: '',
        key: Date.now()
      }
    ]);
  }

  const removerEndereco = (key) => {
    setEnderecos((prevState) => prevState.filter(endereco => endereco.key != key));
  }

  const handleInputChange = (key, event) => {
    setEnderecos((prevState) => {
      const newState = prevState.map((endereco) => {
        if (endereco.key == key) {
          return {
            ...endereco,
            [event.target.name]: event.target.value
          }
        }

        return endereco;
      });
      
      return newState;
    });
  }

  const getBairros = () => {
    axios
      .get('http://localhost:8000/api/bairro')
      .then(res => setBairros(res.data));
  }

  return (
    <div>
            
      <h1 className="mt-4">Cadastro de Endereços</h1>

      <hr />
      
      <h2 className="mb-4">Cadastro de Usuário</h2>

      <AlertMessage message={message[0]} type={message[1]} />
      
      <Form className="row g-3 mb-5" method="POST" onSubmit={() => postPessoa()}>

        <div className="pessoa">
          <div className="row g3">
            <div className="col-md-4">
              <label htmlFor="nome" className="form-label">Nome</label>
              <input 
                type="text" 
                className="form-control" 
                id="nome" 
                name="nome" 
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
        
            <div className="col-md-4">
              <label htmlFor="sobrenome" className="form-label">Sobrenome</label>
              <input 
                type="text" 
                className="form-control" 
                id="sobrenome" 
                name="sobrenome" 
                onChange={(e) => setSobrenome(e.target.value)}
                required
              />
            </div>
        
            <div className="col-md-4">
              <label htmlFor="idade" className="form-label">Idade</label>
              <input 
                type="number" 
                className="form-control" 
                id="idade" 
                name="idade" 
                onChange={(e) => setIdade(e.target.value)}
                required
              />
            </div>
        
            <div className="col-md-6">
              <label htmlFor="login" className="form-label">Login</label>
              <input 
                type="text" 
                className="form-control" 
                id="login" 
                name="login" 
                onChange={(e) => setLogin(e.target.value)}
                required
              />
            </div>
        
        
            <div className="col-md-6">
              <label htmlFor="senha" className="form-label">Senha</label>
              <input 
                type="password" 
                className="form-control" 
                id="senha" 
                name="senha"
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="col-12">
          <Button 
            type='button'
            className="btn btn-secondary" 
            id="adicionar-endereco" 
            onClick={adicionarEndereco}
          >
            Adicionar endereço
          </Button>
        </div>

        <div className="enderecos" id="enderecos">
          {enderecos.map((endereco, index) => (
            <div className="endereco">
              <h3 className="mt-4 mb-4">Cadastrar endereço ({index + 1})</h3>
              <hr />
              <div key={endereco.key}>
                <div className="row g-3">
                  <div className="col-4">
                    <label htmlFor="rua" className="form-label">Rua</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="rua" 
                      name="nomeRua"
                      value={endereco.nomeRua}
                      onChange={(e) => handleInputChange(endereco.key, e)}
                      required
                    />
                  </div>
              
                  <div className="col-4">
                    <label htmlFor="numero" className="form-label">Número</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="numero" 
                      name="numero"
                      value={endereco.numero}
                      onChange={(e) => handleInputChange(endereco.key, e)}
                      required
                    />
                  </div>
              
                  <div className="col-4">
                    <label htmlFor="bairro" className="form-label">Bairro</label>
                    <select 
                      id="bairro" 
                      className="form-select" 
                      name="codigoBairro"
                      value={endereco.codigoBairro}
                      onChange={(e) => handleInputChange(endereco.key, e)}
                      required
                    >
                      <option key={index} disabled selected>Escolha...</option>
                      {bairros.map((bairro, index) => (
                        <option key={bairro.codigo_bairro} value={bairro.codigo_bairro}>{bairro.nome}</option>
                      ))}
                    </select>
                  </div>
              
                  <div className="col-4">
                    <label htmlFor="cep" className="form-label">CEP</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="cep" 
                      name="cep"
                      value={endereco.cep}
                      onChange={(e) => handleInputChange(endereco.key, e)}
                      required
                    />
                  </div>
              
                  <div className="col-8">
                    <label htmlFor="complemento" className="form-label">Complemento</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="complemento" 
                      name="complemento"
                      value={endereco.complemento}
                      onChange={(e) => handleInputChange(endereco.key, e)}  
                      required
                    />
                  </div>
                </div>

                <Button
                  // className="btn btn-danger mt-2 d-none"
                  className="btn btn-danger mt-2"
                  id="remover-endereco"
                  onClick={() => removerEndereco(endereco.key)}
                >Remover endereço</Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="col-12">
          <Button 
            type="submit" 
            className="btn btn-primary"
          >
            Cadastrar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Cadastro;
