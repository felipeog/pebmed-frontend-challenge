import { Outlet, useMatch } from "react-router-dom";

import { HomeHeader } from "./components/HomeHeader";
import { NavigationHeader } from "./components/NavigationHeader";
import styles from "./index.module.css";

function Layout() {
  const match = useMatch("/");

  const isHome = Boolean(match);

  return (
    <div className="Layout">
      {isHome ? <HomeHeader /> : <NavigationHeader />}

      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
}

export { Layout };
