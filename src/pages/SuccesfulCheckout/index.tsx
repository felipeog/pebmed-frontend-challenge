import { useLocation } from "react-router-dom";

function SuccesfulCheckout() {
  const location = useLocation();

  console.log(location.state);

  return <p>SuccesfulCheckout</p>;
}

export { SuccesfulCheckout };
