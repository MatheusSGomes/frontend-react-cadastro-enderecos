// https://www.freecodecamp.org/portuguese/news/como-realizar-operacoes-de-crud-usando-react-hooks-do-react-e-axios/
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import './style.css';

const formDeleteStyle = {
  display: "inline-block",
  marginLeft: ".5rem"
}

function UFs() {
  const [nome, setNome] = useState('');
  const [sigla, setSigla] = useState('');
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');

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
        setMessage(res.data.mensagem);
        getData();
      })
      .catch(error => setMessage(error.response.data.mensagem));
  }

  const deleteUf = (id) => {
    // console.log(id);
    axios
      .delete(`http://localhost:8000/api/uf/${id}`)
      .then(res => {
        setMessage('UF Apagada com sucesso');
        getData();
      })
      .catch(error => setMessage(error.response.data.mensagem));
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

  return (
    <div>
      <h2 className="mt-4">Lista de UFs</h2>
      <hr />

      <button type="button" className="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Cadastrar UF
      </button>

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
                  <input type="text" className="form-control" id="nome" name="nome" onChange={(e) => setNome(e.target.value)} value={nome} />
                </Form.Field>
                <Form.Field className='col-4'>
                  <label htmlFor="sigla" className="form-label">Sigla</label>
                  <input type="text" className="form-control" id="sigla" name="sigla" onChange={(e) => setSigla(e.target.value)} value={sigla} />
                </Form.Field>
                <Button type='submit' className="btn btn-primary" onClick={postUf} >Cadastrar</Button>
            </Form>
          </div>
        </div>
      </div>

      {renderMessage()}

      <ul className="list-group mb-4">
        {/* <UFsList /> */}
        
        {data.map((uf, index) => (<li key={index} className="list-group-item d-flex justify-content-between align-items-center">
          {uf.sigla} - {uf.nome}
          <div>
            <a href={`api/uf/${uf.codigo_uf}`} className="btn btn-primary">Editar</a>

            <Button onClick={() => deleteUf(uf.codigo_uf)} className="btn btn-danger" style={formDeleteStyle}>Apagar</Button>
          </div>
        </li>))}
      </ul>
    </div>
  );
};

export default UFs;