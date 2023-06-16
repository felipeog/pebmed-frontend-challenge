import { Icon } from "../Icon";
import styles from "./index.module.css";

function HomeHeader() {
  return (
    <div className={`HomeHeader ${styles.header}`}>
      <div className={styles.icon}>
        <Icon name="Whitebook" width={39} />
      </div>
    </div>
  );
}

export { HomeHeader };
