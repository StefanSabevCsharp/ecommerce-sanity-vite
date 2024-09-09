import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer-container">
      <p>2024 Headphones Store All rights reserved</p>
      <p className="icons">
        <Link to="/">
          <AiFillInstagram />
        </Link>
        <Link to="/">
          <AiOutlineTwitter />
        </Link>
      </p>
    </div>
  );
}