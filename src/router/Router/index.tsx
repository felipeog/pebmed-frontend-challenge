import { Routes, Route } from "react-router-dom";

import { Layout } from "router/Layout";
import { Home } from "pages/Home";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="checkout" element={<p>checkout</p>} />
        <Route path="checkout/success" element={<p>checkout success</p>} />
        <Route path="*" element={<p>not found</p>} />
      </Route>
    </Routes>
  );
}

export { Router };
