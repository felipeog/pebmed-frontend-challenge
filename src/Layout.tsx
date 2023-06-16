import { Outlet } from "react-router-dom";

import { NavigationHeader } from "./components/NavigationHeader";

function Layout() {
  return (
    <div className="Layout">
      <NavigationHeader />
      <Outlet />
    </div>
  );
}

export { Layout };
