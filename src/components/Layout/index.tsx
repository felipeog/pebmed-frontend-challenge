import { Outlet } from "react-router-dom";

import { NavigationHeader } from "../NavigationHeader";
import styles from "./index.module.css";

function Layout() {
  return (
    <div className="Layout">
      <NavigationHeader />

      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
}

export { Layout };
