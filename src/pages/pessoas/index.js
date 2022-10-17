import axios from 'axios';
import { Button, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './style.css';

function Pessoas () {
  const [pessoas, setPessoas] = useState([]);
  const [bairros, setBairros] = useState([]);

  const [nomePessoa, setNomePessoa] = useState('');
  const [sobrenomePessoa, setSobrenomePessoa] = useState('');
  const [idadePessoa, setIdadePessoa] = useState('');
  const [loginPessoa, setLoginPessoa] = useState('');
  const [senhaPessoa, setSenhaPessoa] = useState('');

  const [ruaEndereco, setRuaEndereco] = useState('');
  const [numeroEndereco, setNumeroEndereco] = useState('');
  const [bairroEndereco, setBairroEndereco] = useState('');
  const [cepEndereco, setCepEndereco] = useState('');
  const [complementoEndereco, setComplementoEndereco] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    getPessoas();
    getBairros();
  }, []);

  const getPessoas = () => {
    axios
      .get('http://localhost:8000/api/pessoa')
      .then(res => setPessoas(res.data));
  }

  const getBairros = () => {
    axios
    .get('http://localhost:8000/api/bairro')
    .then((response) => {
      setBairros(response.data);
    });
  }

  const updatePessoa = (id) => {
    axios
      .put(`http://localhost:8000/api/pessoa/${id}`, {
        codigo_pessoa: id,
        nome: nomePessoa,
        sobrenome: sobrenomePessoa,
        idade: idadePessoa,
        login: loginPessoa,
        senha: senhaPessoa,
        status: 1
      })
      .then(res => {
        getPessoas();
        setMessage('Pessoa atualizada com sucesso');
      });
  }

  const novoEndereco = (id_usuario) => {
    function findPessoa(pess) {
      return pess.codigo_pessoa == id_usuario;
    }

    const pessoa = pessoas.find(findPessoa);

    axios
      .put(`http://localhost:8000/api/pessoa/${id_usuario}`, {
        codigo_pessoa: pessoa.codigo_pessoa,
        nome: pessoa.nome,
        sobrenome: pessoa.sobrenome,
        idade: pessoa.idade,
        login: pessoa.login,
        senha: pessoa.senha,
        enderecos: [
          {
            "codigo_endereco": null,
            "codigo_pessoa": pessoa.codigo_pessoa,
            "codigoBairro": bairroEndereco,
            "nomeRua": ruaEndereco,
            "numero": numeroEndereco,
            "complemento": complementoEndereco,
            "cep": cepEndereco
          }
        ]
      })
      .then(res => {
        getPessoas();
        setMessage('Endereço adicionado com sucesso');
      });
  }

  const updateEndereco = (codigo_pessoa, codigo_endereco) => {
    const pessoa = pessoas.find((pessoa) => pessoa.codigo_pessoa == codigo_pessoa);

    axios
      .put(`http://localhost:8000/api/pessoa/${codigo_pessoa}`, {
        codigo_pessoa: pessoa.codigo_pessoa,
        nome: pessoa.nome,
        sobrenome: pessoa.sobrenome,
        idade: pessoa.idade,
        login: pessoa.login,
        senha: pessoa.senha,
        status: pessoa.status,
        enderecos: [
          {
            "codigo_endereco": codigo_endereco,
            "codigo_pessoa": pessoa.codigo_pessoa,
            "codigoBairro": bairroEndereco,
            "nomeRua": ruaEndereco,
            "numero": numeroEndereco,
            "complemento": complementoEndereco,
            "cep": cepEndereco
          }
        ]
      })
      .then(res => {
        getPessoas();
        setMessage('Endereço atualizado com sucesso');
      });
  }

  const deletePessoa = (id) => {
    axios
      .delete(`http://localhost:8000/api/pessoa/${id}`)
      .then(res => {
        getPessoas();
        setMessage(res.data.message);
      });
  }

  const deleteEndereco = (codigo_endereco, codigo_pessoa) => {
    axios
      .delete(`http://localhost:8000/api/pessoa/${codigo_pessoa}`, {
        data: {
          "codigo_pessoa": codigo_pessoa,
          "codigo_endereco": codigo_endereco
        }
      })
      .then((res) => {
        getPessoas();
        setMessage(res.data.message);
      });
  }

  const renderMessage = () => {
    if (message != '') {
      return (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {message}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>  
      );
    }
  }

  const handleChangeStatus = (codigo_pessoa, status_pessoa) => {
    (status_pessoa == 1) ? (status_pessoa = 0) : (status_pessoa = 1)

    axios
      .put(`http://localhost:8000/api/pessoa/${codigo_pessoa}`, {
        status: status_pessoa
      })
      .then(res => getPessoas());
  }

  return (
    <div>
      <h2 className="mt-4">Lista de Pessoas</h2>

      <hr />
      <Link to="/" className="btn btn-primary mb-4">Cadastrar Pessoa</Link>

      {renderMessage()}

      <ul className="list-group mb-4">
        {pessoas.map((pessoa) => {
          return (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={pessoa.codigo_pessoa}>
              <div className="form-check form-switch" style={{display: 'inline-block'}}>
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  id="flexSwitchCheckDefault"
                  defaultChecked={pessoa.status}
                  onChange={() => handleChangeStatus(pessoa.codigo_pessoa, pessoa.status)}
                />
                {pessoa.nome}
              </div>

              <div>
                <Button 
                  type="button" 
                  className="btn btn-primary"
                  data-bs-toggle="modal" 
                  data-bs-target={`#modalEditarPessoa${pessoa.codigo_pessoa}`}
                >Editar</Button>

                <Button 
                  type="button" 
                  className="btn btn-danger botao-apagar"
                  onClick={() => deletePessoa(pessoa.codigo_pessoa)}
                >Apagar</Button>
                
                {/* MODAL EDITAR PESSOA */}
                <div className="modal fade" id={`modalEditarPessoa${pessoa.codigo_pessoa}`} tabIndex="-1" aria-labelledby="modalLabelPessoa" aria-hidden="true">
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="modalLabelPessoa">Editar Pessoa</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      
                      <Form className="modal-body row g-3" onSubmit={() => updatePessoa(pessoa.codigo_pessoa)}>
                        <Form.Field className="col-md-4">
                          <label htmlFor="nome" className="form-label">Nome</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            id="nome" 
                            name="nome"
                            onChange={(e) => setNomePessoa(e.target.value)} 
                            defaultValue={pessoa.nome} 
                            required
                          />
                        </Form.Field>
                        
                        <Form.Field className="col-md-4">
                          <label htmlFor="sobrenome" className="form-label">Sobrenome</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            id="sobrenome" 
                            name="sobrenome" 
                            onChange={(e) => setSobrenomePessoa(e.target.value)}
                            defaultValue={pessoa.sobrenome}
                            required 
                          />
                        </Form.Field>
                    
                        <Form.Field className="col-md-4">
                          <label htmlFor="idade" className="form-label">Idade</label>
                          <input 
                            type="number" 
                            className="form-control" 
                            id="idade" 
                            name="idade"
                            onChange={(e) => setIdadePessoa(e.target.value)}
                            defaultValue={pessoa.idade}
                            required 
                          />
                        </Form.Field>

                        <Form.Field className="col-md-6">
                          <label htmlFor="login" className="form-label">Login</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            id="login" 
                            name="login" 
                            onChange={(e) => setLoginPessoa(e.target.value)}
                            defaultValue={pessoa.login}
                            required 
                          />
                        </Form.Field>

                        <Form.Field className="col-md-6">
                          <label htmlFor="senha" className="form-label">Senha</label>
                          <input 
                            type="password" 
                            className="form-control" 
                            id="senha" 
                            name="senha"
                            onChange={(e) => setSenhaPessoa(e.target.value)}
                          />
                        </Form.Field>

                        <div className="modal-body">
                          <h3 className="mb-2">Endereços</h3>
                          <Button 
                            type="button" 
                            className="btn btn-sm btn-secondary mb-3" 
                            // data-bs-target="#modalAdicionarEnderecoToggle" 
                            data-bs-target={`#modalAdicionarEnderecoToggle${pessoa.codigo_pessoa}`} 
                            data-bs-toggle="modal" 
                            data-bs-dismiss="modal"
                          >
                            Adicionar Endereço
                          </Button>

                          <ul className="list-group">
                            {pessoa.enderecos.map((endereco, index) => (
                              <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                                {endereco.nome_rua}
                                <div>
                                  <Button 
                                    type="button"
                                    className="btn btn-sm btn-primary"
                                    data-bs-target={`#modalEditarEnderecoToggle${endereco.codigo_endereco}`}
                                    data-bs-toggle="modal" 
                                    data-bs-dismiss="modal"
                                  >Editar</Button>                              

                                  <Button 
                                    type="button" 
                                    className="btn btn-sm btn-danger botao-apagar"
                                    onClick={() => deleteEndereco(endereco.codigo_endereco, pessoa.codigo_pessoa)}
                                  >Apagar</Button>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="modal-footer p-0 pt-1">
                          <Button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</Button>
                          <Button type='submit' className="btn btn-primary" data-bs-dismiss="modal">Atualizar</Button>
                        </div>
                      </Form>

                    </div>
                  </div>
                </div>

                {/* MODAL EDITAR ENDEREÇO */}
                {pessoa.enderecos.map((endereco, index) => (
                  <div className="modal fade" id={`modalEditarEnderecoToggle${endereco.codigo_endereco}`} aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1" key={index}>
                    
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalToggleLabel2">Endereço {index + 1}</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <Form onSubmit={() => updateEndereco(pessoa.codigo_pessoa ,endereco.codigo_endereco)}>
                          <div className="modal-body">
                            <div className="row g-3">
                              <div className="col-4">
                                <label htmlFor="rua" className="form-label">Rua</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  id="rua" 
                                  name={`enderecos[${endereco.codigo_endereco}][rua]`}
                                  onChange={(e) => setRuaEndereco(e.target.value)}
                                  defaultValue={endereco.nome_rua} 
                                />
                              </div>
                          
                              <div className="col-4">
                                <label htmlFor="numero" className="form-label">Número</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  id="numero"
                                  onChange={(e) => setNumeroEndereco(e.target.value)}
                                  name={`enderecos[${endereco.codigo_endereco}][numero]`} 
                                  defaultValue={endereco.numero} 
                                />
                              </div>
                          
                              <div className="col-4">
                                <label htmlFor="bairro" className="form-label">Bairro</label>
                                <select 
                                  id="bairro" 
                                  className="form-select" 
                                  name={`enderecos[${endereco.codigo_endereco}][bairro]`}
                                  onChange={(e) => setBairroEndereco(e.target.value)}
                                >
                                  {bairros.map((bairro) => (
                                    bairro.codigo_bairro == endereco.codigo_bairro 
                                    ? <option value={bairro.codigo_bairro} key={bairro.codigo_bairro} selected>{bairro.nome}</option>
                                    : <option value={bairro.codigo_bairro} key={bairro.codigo_bairro}>{bairro.nome}</option>
                                  ))}
                                </select>
                              </div>  
                          
                              <div className="col-4">
                                <label htmlFor="cep" className="form-label">CEP</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  id="cep"
                                  onChange={(e) => setCepEndereco(e.target.value)}
                                  name={`enderecos[${endereco.codigo_endereco}][cep]`} 
                                  defaultValue={endereco.cep} 
                                />
                              </div>
                          
                              <div className="col-8">
                                <label htmlFor="complemento" className="form-label">Complemento</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  id="complemento" 
                                  onChange={(e) => setComplementoEndereco(e.target.value)}
                                  name={`enderecos[${endereco.codigo_endereco}][complemento]`} 
                                  defaultValue={endereco.complemento} 
                                />
                              </div>
                            </div>
                          </div>

                          <div className="modal-footer">
                            <Button 
                              type="button" 
                              className="btn btn-secondary" 
                              data-bs-target={`#modalEditarPessoa${endereco.codigo_pessoa}`} 
                              data-bs-toggle="modal" 
                              data-bs-dismiss="modal"
                            >Voltar</Button>
                            
                            <Button 
                              type="submit" 
                              className="btn btn-primary" 
                              data-bs-target={`#modalEditarPessoa${endereco.codigo_pessoa}`} 
                              data-bs-toggle="modal" 
                              data-bs-dismiss="modal"
                            >Salvar</Button>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* MODAL ADICIONAR ENDEREÇO */}
              <div className="modal fade" id={`modalAdicionarEnderecoToggle${pessoa.codigo_pessoa}`} aria-hidden="true" aria-labelledby={`modalAdicionarEnderecoToggleLabel${pessoa.codigo_pessoa}`} tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id={`modalAdicionarEnderecoToggleLabel${pessoa.codigo_pessoa}`}>Cadastrar novo endereço - {pessoa.nome}</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <Form onSubmit={() => novoEndereco(pessoa.codigo_pessoa)}>
                      <div className="modal-body">            
                        <div className="row g-3">
                          <div className="col-4">
                            <label htmlFor="rua" className="form-label">Rua</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              id="rua" 
                              name="enderecos[1][rua]"
                              onChange={(e) => setRuaEndereco(e.target.value)}
                            />
                          </div>
                      
                          <div className="col-4">
                            <label htmlFor="numero" className="form-label">Número</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              id="numero" 
                              name="enderecos[1][numero]" 
                              onChange={(e) => setNumeroEndereco(e.target.value)}
                            />
                          </div>
                      
                          <div className="col-4">
                            <label htmlFor="bairro" className="form-label">Bairro</label>
                            <select 
                              id="bairro" 
                              className="form-select" 
                              name="enderecos[1][bairro]"
                              onChange={(e) => setBairroEndereco(e.target.value)}>
                              {bairros.map((bairro, index) => (
                                <option value={bairro.codigo_bairro} key={index}>{bairro.nome}</option>
                              ))}
                            </select>
                          </div>  
                      
                          <div className="col-4">
                            <label htmlFor="cep" className="form-label">CEP</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              id="cep" 
                              name="enderecos[1][cep]" 
                              onChange={(e) => setCepEndereco(e.target.value)}
                            />
                          </div>
                                  
                          <div className="col-8">
                            <label htmlFor="complemento" className="form-label">Complemento</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              id="complemento" 
                              name="enderecos[1][complemento]" 
                              onChange={(e) => setComplementoEndereco(e.target.value)}
                            />
                          </div>
                        </div>              
                      </div>
                      <div className="modal-footer">
                      
                        <Button type="button" className="btn btn-secondary" data-bs-target={`#modalEditarPessoa${pessoa.codigo_pessoa}`} data-bs-toggle="modal" data-bs-dismiss="modal">Voltar</Button>
                        <Button type="submit" className="btn btn-primary" data-bs-target={`#modalEditarPessoa${pessoa.codigo_pessoa}`} data-bs-toggle="modal" data-bs-dismiss="modal">Salvar</Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Pessoas;