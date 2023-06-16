import { Link } from "react-router-dom";

import { Icon } from "components/Icon";
import styles from "./index.module.css";

function NavigationHeader() {
  return (
    <nav className={`NavigationHeader ${styles.header}`}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link className={styles.link} to="/">
            <Icon name="ArrowLeft" width={8} />
          </Link>
        </li>

        <li className={styles.item}>
          <Link className={styles.link} to="/">
            <Icon name="Whitebook" width={39} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export { NavigationHeader };
