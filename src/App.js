import logo from "./logo.svg";
import "./App.css";
import Menu from "./components/MenuComponent.jsx";

function App() {
  return (
    <div className="App">
      <div className="navContainer">
        <div className="nav">
          <h3>Restaurant con fusion</h3>
        </div>
      </div>
      <Menu />
    </div>
  );
}

export default App;
