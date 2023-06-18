import { Routes, Route } from "react-router-dom";

import { Text } from "components/Text";
import { Checkout } from "pages/Checkout";
import { Home } from "pages/Home";
import { SuccesfulCheckout } from "pages/SuccesfulCheckout";
import { Layout } from "router/Layout";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="checkout/success" element={<SuccesfulCheckout />} />
        <Route path="*" element={<Text>404 - Página não encontrada</Text>} />
      </Route>
    </Routes>
  );
}

export { Router };
