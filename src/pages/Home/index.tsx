import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import { Button } from "components/Button";
import { Heading } from "components/Heading";
import styles from "./index.module.css";

function Home() {
  const navigate = useNavigate();

  function handleCheckoutButtonClick() {
    navigate("/checkout");
  }

  return (
    <div className={clsx("Home", styles.home)}>
      <Heading tag="h1">Whitebook</Heading>
      <Heading className={styles.subtitle} tag="h2">
        De médicos para médicos, melhorando a sua tomada de decisão clínica
      </Heading>

      <Button variation="secondary" onClick={handleCheckoutButtonClick}>
        Assinar o Whitebook
      </Button>
    </div>
  );
}

export { Home };
