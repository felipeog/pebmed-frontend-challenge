import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div className="Layout">
      <nav>
        <ul>
          <li>
            <Link to="/">back</Link>
          </li>

          <li>
            <Link to="/">logo</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
}

export { Layout };
