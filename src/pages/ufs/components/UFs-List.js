import axios from "axios";
import { useEffect, useState } from 'react';
import './UFS-List.css';

const formDeleteStyle = {
  display: "inline-block",
  marginLeft: ".5rem"
}

function UFsList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const listarUFs = async () =>
    {
      const {data} = await axios.get('http://localhost:8000/api/uf');
      console.log(data);
      setData(data);
    };

    listarUFs();
  }, []);

  return (data.map((uf, index) => (<li key={index} className="list-group-item d-flex justify-content-between align-items-center">
    {uf.sigla} - {uf.nome}
    <div>
      <a href={`api/uf/${uf.codigo_uf}`} className="btn btn-primary">Editar</a>

      <form 
        action="{{ route('ufs.destroy', $uf->codigo_uf) }}" 
        method="post"
        style={formDeleteStyle}
      >
        <button type="submit" className="btn btn-danger">Apagar</button>
      </form>
    </div>
  </li>)));
}

export default UFsList;
