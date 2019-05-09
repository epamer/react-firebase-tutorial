import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <ul>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/second"}>Second</Link>
      </li>
      <li>
        <Link to={"/third"}>Third</Link>
      </li>
    </ul>
  );
};
export default Header;
