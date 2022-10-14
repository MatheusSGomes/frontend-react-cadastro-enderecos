import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [idade, setIdade] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const [rua, setRua]  = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cep, setCep] = useState('');
  const [complemento, setComplemento] = useState('');

  const [enderecos, setEnderecos] = useState([]);
  
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
      .then(res => console.log(res));
  }

  const adicionarEndereco = () => {
    setEnderecos((prevState) => [
      ...prevState,
      {
        codigoBairro: 'Código Bairro',
        nomeRua: 'Rua',
        numero: 'Número',
        complemento: 'Complemento',
        cep: 'CEP',
        key: Date.now()
      }
    ]);
  }

  const removerEndereco = (key) => {
    setEnderecos((prevState) => prevState.filter(endereco => endereco.key != key));
  }

  return (
    <div>
            
      <h1 className="mt-4">Cadastro de Endereços</h1>

      <hr />
      
      <h2 className="mb-4">Cadastro de Usuário</h2>

      
      <div className="alert alert-success alert-dismissible fade show" role="alert">
        Mensagem sucesso
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>  
      
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
                <h3 className="mt-4 mb-4">Cadastrar novo endereço ({index + 1})</h3>
                <hr />
                <div key={endereco.key}>
                  <div className="row g-3">
                    <div className="col-4">
                      <label htmlFor="rua" className="form-label">Rua</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="rua" 
                        name="enderecos[1][rua]" 
                        onChange={(e) => setRua(e.target.value)}
                      />
                    </div>
                
                    <div className="col-4">
                      <label htmlFor="numero" className="form-label">Número</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="numero" 
                        name="enderecos[1][numero]" 
                        onChange={(e) => setNumero(e.target.value)}
                      />
                    </div>
                
                    <div className="col-4">
                      <label htmlFor="bairro" className="form-label">Bairro</label>
                      <select 
                        id="bairro" 
                        className="form-select" 
                        name="enderecos[1][bairro]"
                        onChange={(e) => setBairro(e.target.value)}>

                        <option selected disabled>Escolha...</option>
                        
                          <option value="{{ $bairro->codigo_bairro }}"> bairro nome </option>

                      </select>
                    </div>  
                
                    <div className="col-4">
                      <label htmlFor="cep" className="form-label">CEP</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="cep" 
                        name="enderecos[1][cep]" 
                        onChange={(e) => setCep(e.target.value)}
                      />
                    </div>
                
                    <div className="col-8">
                      <label htmlFor="complemento" className="form-label">Complemento</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="complemento" 
                        name="enderecos[1][complemento]" 
                        onChange={(e) => setComplemento(e.target.value)}  
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
          <Button type="submit" className="btn btn-primary">Cadastrar</Button>
        </div>
      </Form>
    </div>
  );
};

export default Cadastro;
