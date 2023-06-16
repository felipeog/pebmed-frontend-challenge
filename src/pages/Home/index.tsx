import { useNavigate } from "react-router-dom";

import { Button } from "../../components/Button";
import { Heading } from "../../components/Heading";
import styles from "./index.module.css";

function Home() {
  const navigate = useNavigate();

  function handleCheckoutButtonClick() {
    navigate("/checkout");
  }

  return (
    <div className={`Home ${styles.home}`}>
      <Heading tag="h1">Whitebook</Heading>
      <Heading tag="h3">
        De médicos para médicos, melhorando a sua tomada de decisão clínica
      </Heading>

      <Button variation="secondary" onClick={handleCheckoutButtonClick}>
        Assinar o Whitebook
      </Button>
    </div>
  );
}

export { Home };
