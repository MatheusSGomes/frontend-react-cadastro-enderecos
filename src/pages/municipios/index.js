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
      // .then(console.log)
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
      });
  };

  const deleteMunicipio = (id) => {
    axios
      .delete(`http://localhost:8000/api/municipio/${id}`)
      .then(res => {
        getMunicipios();
      })
  }

  return (
    <div>
      <h2 className="mt-4">Lista de Municípios</h2>

      <hr />
      <button type="button" className="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Cadastrar Município
      </button>
      
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Cadastre um Município</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <Form className="" action="" method="post" onSubmit={postMunicipio}>
              <div className="modal-body row g-3">        
                <div className="col-9">
                  <label htmlFor="nome" className="form-label">Nome</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="nome" 
                    name="nome" 
                    onChange={(e) => setNomeMunicipio(e.target.value)} 
                    value={nomeMunicipio}
                  />
                </div>

                <div className="col-3">
                  <label htmlFor="uf" className="form-label">UF</label>
                  <select id="uf" name="uf" className="form-select" onChange={(e) => setUfMunicipio(e.target.value)}>
                    <option disabled>Escolha...</option>
                    {ufs.map((uf) => (
                      <option value={uf.codigo_uf}>{uf.sigla}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                <Button type="submit" className="btn btn-primary">Salvar</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>

      <ul className="list-group mb-4">
        {municipios.map((municipio) => (
          <li className="list-group-item d-flex justify-content-between align-items-center">
            {municipio.nome}
            <div>
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEditarUF">Editar</button>
              <Button 
                type="submit" 
                className="btn btn-danger" 
                onClick={() => deleteMunicipio(municipio.codigo_municipio)}
                style={formDeleteStyle}
              >Apagar</Button>
            </div>

            <div className="modal fade" id="modalEditarUF" tabIndex="-1" aria-labelledby="modalLabelUF" aria-hidden="true">
              <div className="modal-dialog modal-md">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="modalLabelUF">Editar Município</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <Form className="modal-body row g-3" onSubmit="">
                      <Form.Field className='col-8'>
                        <label htmlFor="nome" className="form-label">Nome</label>
                        <input type="text" className="form-control" id="nome" name="nome" onChange="" defaultValue="" />
                      </Form.Field>
                      <Form.Field className='col-4'>
                        <label htmlFor="sigla" className="form-label">Sigla</label>
                        <input type="text" className="form-control" id="sigla" name="sigla" onChange="" defaultValue="" />
                      </Form.Field>
                      
                    <div className="modal-footer p-0 pt-1">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                      <Button type='submit' className="btn btn-primary">Atualizar</Button>
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