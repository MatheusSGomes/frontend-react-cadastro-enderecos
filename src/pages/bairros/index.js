import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "semantic-ui-react";

function Bairros() {
  const [bairros, setBairros] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [nomeBairro, setNomeBairro] = useState('');
  const [codigoMunicipio, setCodigoMunicipio] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/bairro')
      .then(res => setBairros(res.data));

    axios
      .get('http://localhost:8000/api/municipio')
      .then(res => setMunicipios(res.data));
  }, []);

  const getBairros = () => {
    axios
      .get('http://localhost:8000/api/bairro')
      .then(res => setBairros(res.data));
  }

  const postBairros = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/bairro', {
        codigo_municipio: codigoMunicipio,
        nome: nomeBairro,
        status: 1
      })
      .then(res => {
        getBairros();
      });
  }

  const updateBairro = (id) => {
    axios
      .put(`http://localhost:8000/api/bairro/${id}`, {
        municipio: codigoMunicipio,
        nome: nomeBairro,
        status: 1
      })
      .then(res => {
        getBairros();
      })
  }

  const deleteBairros = (id) => {
    axios
      .delete(`http://localhost:8000/api/bairro/${id}`)
      .then(res => getBairros());
  }

  return (
    <div>
      <h2 className="mt-4">Lista de Bairros</h2>

      <hr />
      <button type="button" className="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#modalCadastrarBairro">
        Cadastrar Bairro
      </button>
      
      <div className="modal fade" id="modalCadastrarBairro" tabIndex="-1" aria-labelledby="modalCadastrarBairroLabel" aria-hidden="true">
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modalCadastrarBairroLabel">Cadastre um Bairro</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <Form 
              className="" 
              action="" 
              method="post"
              onSubmit={postBairros}
              >
         
              <div className="modal-body row g-3">        
                <div className="col-6">
                  <label htmlFor="nome" className="form-label">Nome do bairro</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="nome" 
                    name="nome" 
                    onChange={(e) => setNomeBairro(e.target.value)}
                    value={nomeBairro}
                  />
                </div>

                <div className="col-6">
                  <label htmlFor="municipio" className="form-label">Município</label>
                  <select 
                    id="municipio" 
                    name="municipio" 
                    className="form-select"
                    onChange={(e) => setCodigoMunicipio(e.target.value)}  
                  >
                    <option disabled>Escolha...</option>
                    {municipios.map(((municipio) => (
                      <option value={municipio.codigo_municipio} key={municipio.codigo_municipio}>{municipio.nome}</option>
                    )))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <Button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</Button>
                <Button type="submit" className="btn btn-primary">Salvar</Button>
              </div>            
            </Form>
          </div>
        </div>
      </div>

      <div className="alert alert-success alert-dismissible fade show" role="alert">
        Mensagem sucesso
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>  

      <ul className="list-group mb-4">
        {bairros.map((bairro) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={bairro.codigo_bairro}>
            {bairro.nome}
            <div>
              <Button 
                type="button" 
                className="btn btn-primary" 
                data-bs-toggle="modal" 
                data-bs-target={`#modalEditarBairro${bairro.codigo_bairro}`}
              >Editar</Button>

              <Button className="btn btn-danger" onClick={() => deleteBairros(bairro.codigo_bairro)}>Apagar</Button>
            </div>

            <div className="modal fade" id={`modalEditarBairro${bairro.codigo_bairro}`} tabIndex="-1" aria-labelledby="modalLabelBairro" aria-hidden="true">
              <div className="modal-dialog modal-md">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="modalLabelBairro">Editar Município</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <Form className="modal-body row g-3" onSubmit={() => updateBairro(bairro.codigo_bairro)}>
                      <Form.Field className='col-8'>
                        <label htmlFor="nome" className="form-label">Nome</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="nome" 
                          name="nome" 
                          onChange={(e) => setNomeBairro(e.target.value)} 
                          defaultValue={bairro.nome} 
                        />
                      </Form.Field>
                      <Form.Field className='col-4'>
                        <label htmlFor="uf" className="form-label">Município</label>
                        <select 
                          id="uf" 
                          name="uf" 
                          className="form-select" 
                          onChange={(e) => setCodigoMunicipio(e.target.value)}>
                          {municipios.map((municipio) => (
                            (municipio.codigo_municipio == bairro.codigo_municipio) 
                            ? <option key={municipio.codigo_municipio} value={municipio.codigo_municipio} selected>{municipio.nome}</option> 
                            : <option key={municipio.codigo_municipio} value={municipio.codigo_municipio}>{municipio.nome}</option>
                          ))}
                        </select>
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

export default Bairros;