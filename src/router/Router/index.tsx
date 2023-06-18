import { Routes, Route } from "react-router-dom";

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
        <Route path="*" element={<p>not found</p>} />
      </Route>
    </Routes>
  );
}

export { Router };
