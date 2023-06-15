import { Routes, Route } from "react-router-dom";

import { Layout } from "./Layout";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<p>home</p>} />
        <Route path="checkout" element={<p>checkout</p>} />
        <Route path="checkout/success" element={<p>checkout success</p>} />
        <Route path="*" element={<p>not found</p>} />
      </Route>
    </Routes>
  );
}

export { Router };
