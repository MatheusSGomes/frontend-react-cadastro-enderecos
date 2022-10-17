// https://www.freecodecamp.org/portuguese/news/como-realizar-operacoes-de-crud-usando-react-hooks-do-react-e-axios/
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, Button } from 'semantic-ui-react';

const formDeleteStyle = {
  display: "inline-block",
  marginLeft: '.5rem'
}

function Municipios() {
  const [nomeMunicipio, setNomeMunicipio] = useState('');
  const [ufMunicipio, setUfMunicipio] = useState('');
  const [municipios, setMunicipios] = useState([]);
  const [ufs, setUfs] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/municipio')
      .then(response => setMunicipios(response.data));
    
    axios
      .get('http://localhost:8000/api/uf')
      .then(response => setUfs(response.data));
  }, []);

  const getMunicipios = () => {
    axios
      .get('http://localhost:8000/api/municipio')
      .then(res => setMunicipios(res.data));
  }

  const postMunicipio = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/municipio', {
        nome: nomeMunicipio,
        codigo_uf: ufMunicipio,
        status: 1
      })
      .then(res => {
        getMunicipios();
        setMessage('Município adicionado com sucesso');
        handleSubmit();
      })
      .catch(error => setMessage(error.response.data.mensagem));
  };

  const deleteMunicipio = (id) => {
    axios
      .delete(`http://localhost:8000/api/municipio/${id}`)
      .then(res => {
        getMunicipios();
        setMessage('Município apagado com sucesso');
      })
  }

  const updateMunicipio = (codigo_municipio) => {
    const municipio = municipios.find((municipio) => municipio.codigo_municipio == codigo_municipio);

    axios
      .put(`http://localhost:8000/api/municipio/${codigo_municipio}`, {
        nome: nomeMunicipio,
        codigo_uf: ufMunicipio,
        status: municipio.status
      })
      .then(res => {
        getMunicipios();
        setMessage('Município atualizado com sucesso');
      })
  }

  const renderMessage = () => {
    if (message != '') {
      return (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <p>{message}</p>
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      );
    }
  }

  const handleSubmit = () => {
    setNomeMunicipio('');
    setUfMunicipio('');
  }

  const handleChangeStatus = (codigo_municipio, status_municipio) => {
    (status_municipio == 1) ? (status_municipio = 0) : (status_municipio = 1)

    axios
      .put(`http://localhost:8000/api/municipio/${codigo_municipio}`, {
        status: status_municipio
      })
      .then(res => {
        getMunicipios();
      })
  }

  return (
    <div>
      <h2 className="mt-4">Lista de Municípios</h2>

      <hr />
      <button type="button" className="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#modalCadastroMunicipio">
        Cadastrar Município
      </button>
      
      <div className="modal fade" id="modalCadastroMunicipio" tabIndex="-1" aria-labelledby="modalCadastro" aria-hidden="true">
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modalCadastro">Cadastre um Município</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <Form className="" action="" method="post" onSubmit={postMunicipio}>
              <div className="modal-body row g-3">        
                <div className="col-8">
                  <label htmlFor="nome" className="form-label">Nome</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="nome" 
                    name="nome" 
                    onChange={(e) => setNomeMunicipio(e.target.value)} 
                    value={nomeMunicipio}
                    required
                  />
                </div>

                <div className="col-4">
                  <label htmlFor="uf" className="form-label">UF</label>
                  <select 
                    id="uf" 
                    name="uf" 
                    className="form-select" 
                    onChange={(e) => setUfMunicipio(e.target.value)}
                    required
                  >
                    <option disabled selected>Escolha...</option>
                    {ufs.map((uf) => (
                      <option key={uf.codigo_uf} value={uf.codigo_uf}>{uf.sigla}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                <Button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Salvar</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>

      {renderMessage()}

      <ul className="list-group mb-4">
        {municipios.map((municipio) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={municipio.codigo_municipio}>

            <div className="form-check form-switch" style={{display: 'inline-block'}}>
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="flexSwitchCheckDefault"
                defaultChecked={municipio.status}
                onChange={() => handleChangeStatus(municipio.codigo_municipio, municipio.status)}
              />
              {municipio.nome}
            </div>

            <div>
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#modalEditarMunicipio${municipio.codigo_municipio}`}>Editar</button>
              
              <Button 
                type="submit" 
                className="btn btn-danger" 
                onClick={() => deleteMunicipio(municipio.codigo_municipio)}
                style={formDeleteStyle}
              >Apagar</Button>
            </div>
            
            <div className="modal fade" id={`modalEditarMunicipio${municipio.codigo_municipio}`} tabIndex="-1" aria-labelledby="modalLabelMunicipio" aria-hidden="true">
              <div className="modal-dialog modal-md">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="modalLabelMunicipio">Editar Município</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <Form className="modal-body row g-3" onSubmit={() => updateMunicipio(municipio.codigo_municipio)}>
                    <Form.Field className='col-8'>
                      <label htmlFor="nome" className="form-label">Nome</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="nome" 
                        name="nome" 
                        onChange={(e) => setNomeMunicipio(e.target.value)} 
                        defaultValue={municipio.nome} 
                        required
                      />
                    </Form.Field>
                    <Form.Field className='col-4'>
                      <label htmlFor="uf" className="form-label">UF</label>
                      <select 
                        id="uf" 
                        name="uf" 
                        className="form-select" 
                        onChange={(e) => setUfMunicipio(e.target.value)}
                      >
                        {ufs.map((uf) => (
                          (uf.codigo_uf == municipio.codigo_uf) 
                          ? <option key={uf.codigo_uf} value={uf.codigo_uf} selected>{uf.sigla}</option> 
                          : <option key={uf.codigo_uf} value={uf.codigo_uf}>{uf.sigla}</option>
                        ))}
                      </select>
                    </Form.Field>
                      
                    <div className="modal-footer p-0 pt-1">
                      <Button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</Button>
                      <Button type='submit' className="btn btn-primary" data-bs-dismiss="modal">Atualizar</Button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Municipios;