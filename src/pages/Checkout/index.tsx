import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import { Button } from "components/Button";
// import { Chip } from "components/Chip";
// import { Heading } from "components/Heading";
// import { Icon } from "components/Icon";
// import { Text } from "components/Text";
import styles from "./index.module.css";

function Checkout() {
  const navigate = useNavigate();

  function handlePaymentButtonClick() {
    navigate("/checkout/success");
  }

  return (
    <div className={clsx("Checkout", styles.checkout)}>
      <Button onClick={handlePaymentButtonClick}>Finalizar pagamento</Button>
    </div>
  );
}

export { Checkout };
