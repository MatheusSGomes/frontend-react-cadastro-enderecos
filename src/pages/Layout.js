import { Link } from 'react-router-dom';

function Layout() {
  return (
    <>
      <nav>
      <h2>Layout</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/pessoas">Pessoas</Link>
        </li>
        <li>
          <Link to="/ufs">UFs</Link>
        </li>
        <li>
          <Link to="/municipios">Municípios</Link>
        </li>
      </ul>
    </nav>
    </>
  );
}

export default Layout;