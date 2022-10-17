// https://www.freecodecamp.org/portuguese/news/como-realizar-operacoes-de-crud-usando-react-hooks-do-react-e-axios/
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import './style.css';
import Title from '../../Components/Title';

const formDeleteStyle = {
  display: "inline-block",
  marginLeft: ".5rem"
}

function UFs() {
  const [nome, setNome] = useState('');
  const [sigla, setSigla] = useState('');
  const [data, setData] = useState([]);
  const [message, setMessage] = useState([]);

  const getData = () => {
    axios
      .get('http://localhost:8000/api/uf')
      .then((response) => {
        setData(response.data);
      })
  }

  useEffect(() => {
    const listarUFs = async () =>
    {
      const {data} = await axios.get('http://localhost:8000/api/uf');
      setData(data);
    };

    listarUFs();
  }, []);

  const postUf = () => {
    axios
      .post('http://localhost:8000/api/uf', {
        nome: nome,
        sigla: sigla,
        status: 1
      })
      .then(res => {
        setMessage([res.data.mensagem, 'success']);
        getData();
      })
      .catch(error => {
        setMessage([error.response.data.mensagem, 'danger']);
      });
  }

  const updateUf = (codigo) => {
    const uf = data.find((uf) => uf.codigo_uf == codigo);

    axios
      .put(`http://localhost:8000/api/uf/${codigo}`, {
        nome: nome,
        sigla: sigla,
        status: uf.status
      })
      .then(res => {
        setMessage(['UF atualizada com sucesso', 'success']);
        getData();
      })
      .catch(error => {
        setMessage([error.response.data.mensagem, 'danger']);
      });
  }

  const deleteUf = (id) => {
    // console.log(id);
    axios
      .delete(`http://localhost:8000/api/uf/${id}`)
      .then(res => {
        setMessage(['UF Apagada com sucesso', 'warning']);
        getData();
      })
      .catch(error => setMessage([error.response.data.mensagem, 'danger']));
  }

  const handleSubmit = event => {
    event.preventDefault();
    setNome('');
    setSigla('');
  }

  const renderMessage = () => {
    if(message != '') {
      return (<div className="alert alert-success alert-dismissible fade show" role="alert">
      <p>{message}</p>
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>);
    }
  }

  const AlertMessage = (props) => {
    return (
      <div 
        className={`alert alert-${props.type} alert-dismissible fade show`} 
        role="alert">
        <p>{props.message}</p>
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    );
  }

  function onClickCadastrarUf () {
    setNome('');
    setSigla('');
  }

  function handleChangeStatus(codigo_uf, status) {
    (status == 1) ? (status = 0) : (status = 1)

    axios
      .put(`http://localhost:8000/api/uf/${codigo_uf}`, {
        status: status
      })
      .then(res => {
        getData();
      })
  }

  return (
    <div>
      <Title>Lista de UFs</Title>

      <button type="button" className="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={onClickCadastrarUf}>
        Cadastrar UF
      </button>

      {/* MODAL ADICIONAR UF */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Cadastre uma UF</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <Form className="modal-body row g-3" onSubmit={handleSubmit}>
                <Form.Field className='col-8'>
                  <label htmlFor="nome" className="form-label">Nome</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="nome" 
                    name="nome" 
                    onChange={(e) => setNome(e.target.value)} 
                    value={nome}
                    required
                  />
                </Form.Field>
                <Form.Field className='col-4'>
                  <label htmlFor="sigla" className="form-label">Sigla</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="sigla" 
                    name="sigla" 
                    onChange={(e) => setSigla(e.target.value)} 
                    value={sigla}
                    required 
                  />
                </Form.Field>
                <Button type='submit' className="btn btn-primary" onClick={postUf} data-bs-dismiss="modal">Cadastrar</Button>
            </Form>
          </div>
        </div>
      </div>

      <AlertMessage message={message[0]} type={message[1]} />

      <ul className="list-group mb-4">
        {data.map((uf, index) => (
          <li key={index} id={uf.codigo_uf} className="list-group-item d-flex justify-content-between align-items-center">
            <div className="form-check form-switch" style={{display: 'inline-block'}}>
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="flexSwitchCheckDefault"
                defaultChecked={uf.status}
                onChange={() => handleChangeStatus(uf.codigo_uf, uf.status)}
              />
              {uf.sigla} - {uf.nome}
            </div>

            <div>
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#modalEditarUF${uf.codigo_uf}`}>Editar</button>

              <Button onClick={() => deleteUf(uf.codigo_uf)} className="btn btn-danger" style={formDeleteStyle}>Apagar</Button>
            </div>

            {/* MODAL EDITAR */}
            <div className="modal fade" id={`modalEditarUF${uf.codigo_uf}`} tabIndex="-1" aria-labelledby={`modalLabelUF${uf.codigo_uf}`} aria-hidden="true">
              <div className="modal-dialog modal-md">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id={`modalLabelUF${uf.codigo_uf}`}>Editar UF</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <Form className="modal-body row g-3" onSubmit={() => updateUf(uf.codigo_uf)}>
                      <Form.Field className='col-8'>
                        <label htmlFor="nome" className="form-label">Nome</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="nome" 
                          name="nome" 
                          onChange={(e) => setNome(e.target.value)} 
                          defaultValue={uf.nome} 
                          required
                        />
                      </Form.Field>
                      <Form.Field className='col-4'>
                        <label htmlFor="sigla" className="form-label">Sigla</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="sigla" 
                          name="sigla" 
                          onChange={(e) => setSigla(e.target.value)} 
                          defaultValue={uf.sigla} 
                          required
                        />
                      </Form.Field>
                      <Button type='submit' className="btn btn-primary" data-bs-dismiss="modal">Atualizar</Button>
                  </Form>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UFs;