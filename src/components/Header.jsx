// import { Link } from "react-router-dom";
import "../styles/Header.css";
// import logo from "../pictures/fruits.png"

const Header = (props) => {
  return (
    <header className="HeaderStyle">
      {/* <img src={logo} className="App-logo" alt="logo salade de fruits" /> */}
      <p className="headTitle">Easy diet</p>
      <p className="ssheadTitle">
        Bienvenue sur le générateur de salades équilibrées
      </p>
    </header>
  );
};

export default Header;
