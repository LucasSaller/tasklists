import React from "react";
import "./Footer.css";
import { ReactComponent as Linkedin } from "../../assets/icons/linkedin.svg";
import { ReactComponent as Github } from "../../assets/icons/github.svg";

function Footer() {
  return (
    <footer className="footer">
      <div>Made with ❤ by Lucas Saller</div>
      <div className="footer-icons">
        <Linkedin />
        <Github />
      </div>
    </footer>
  );
}

export default Footer;
