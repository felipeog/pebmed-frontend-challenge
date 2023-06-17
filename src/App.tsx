import { Slide, ToastContainer } from "react-toastify";

import { Router } from "router/Router";

function App() {
  return (
    <div className="App">
      <Router />
      <ToastContainer
        position="bottom-right"
        draggable={false}
        transition={Slide}
        hideProgressBar
      />
    </div>
  );
}

export { App };
