import { BrowserRouter } from "react-router-dom";
import DefaultLayout from "./Layout/DefaultLayout";

function App() {
  return (
    <BrowserRouter>
      <div exact path="/" className="App">
        <DefaultLayout />
      </div>
    </BrowserRouter>
  );
}

export default App;
