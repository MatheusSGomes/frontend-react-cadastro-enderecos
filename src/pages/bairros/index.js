import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import './style.css';
import Title from '../../Components/Title';
import AlertMessage from '../../Components/AlertMessage';

function Bairros() {
  const [bairros, setBairros] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [nomeBairro, setNomeBairro] = useState('');
  const [codigoMunicipio, setCodigoMunicipio] = useState('');
  const [message, setMessage] = useState([]);

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
        setMessage([res.data.mensagem, 'success']);
        clearInputs();
      })
      .catch(error => setMessage([error.response.data.mensagem, 'danger']));
  }

  const updateBairro = (codigo_bairro) => {
    const bairro = bairros.find((bairro) => bairro.codigo_bairro == codigo_bairro)

    axios
      .put(`http://localhost:8000/api/bairro/${codigo_bairro}`, {
        municipio: codigoMunicipio,
        nome: nomeBairro,
        status: bairro.status
      })
      .then(res => {
        getBairros();
        setMessage(['Bairro atualizado com sucesso', 'success']);
      })
      .catch(error => setMessage([error.response.data.mensagem, 'danger']));;
  }

  const deleteBairros = (id) => {
    axios
      .delete(`http://localhost:8000/api/bairro/${id}`)
      .then(res => {
        getBairros();
        setMessage(['Bairro apagado com sucesso', 'warning']);
      })
      .catch(error => setMessage([error.response.data.mensagem, 'danger']));;
  }

  const clearInputs = () => {
    setNomeBairro('');
    setCodigoMunicipio('');
  }

  const handleChangeStatus = (codigo_bairro, status_bairro) => {
    (status_bairro == 1) ? (status_bairro = 0) : (status_bairro = 1)

    axios
      .put(`http://localhost:8000/api/bairro/${codigo_bairro}`, {
        status: status_bairro
      })
      .then(res => {
        getBairros();
      });
  }

  return (
    <div>
      <Title>Lista de Bairros</Title>

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
                    required
                  />
                </div>

                <div className="col-6">
                  <label htmlFor="municipio" className="form-label">Munic??pio</label>
                  <select 
                    id="municipio" 
                    name="municipio" 
                    className="form-select"
                    onChange={(e) => setCodigoMunicipio(e.target.value)}
                    required
                  >
                    <option disabled selected>Escolha...</option>
                    {municipios.map(((municipio) => (
                      <option value={municipio.codigo_municipio} key={municipio.codigo_municipio}>{municipio.nome}</option>
                    )))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <Button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</Button>
                <Button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Salvar</Button>
              </div>            
            </Form>
          </div>
        </div>
      </div>

      <AlertMessage message={message[0]} type={message[1]} />

      <ul className="list-group mb-4">
        {bairros.map((bairro) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={bairro.codigo_bairro}>
            <div className="form-check form-switch" style={{display: 'inline-block'}}>
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="flexSwitchCheckDefault"
                defaultChecked={bairro.status}
                onChange={() => handleChangeStatus(bairro.codigo_bairro, bairro.status)}
              />
              {bairro.nome}
            </div>

            <div>
              <Button 
                type="button" 
                className="btn btn-primary" 
                data-bs-toggle="modal" 
                data-bs-target={`#modalEditarBairro${bairro.codigo_bairro}`}
              >Editar</Button>

              <Button className="btn btn-danger botao-apagar" onClick={() => deleteBairros(bairro.codigo_bairro)}>Apagar</Button>
            </div>

            <div className="modal fade" id={`modalEditarBairro${bairro.codigo_bairro}`} tabIndex="-1" aria-labelledby="modalLabelBairro" aria-hidden="true">
              <div className="modal-dialog modal-md">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="modalLabelBairro">Editar Bairro</h1>
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
                        <label htmlFor="uf" className="form-label">Munic??pio</label>
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

export default Bairros;