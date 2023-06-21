import React from "react";
import "./Footer.css";
import { ReactComponent as Linkedin } from "../../assets/icons/linkedin.svg";
import { ReactComponent as Github } from "../../assets/icons/github.svg";

function Footer() {
  return (
    <footer className="footer">
      <div>Made with ❤ by Lucas Saller</div>
      <div className="footer-icons">
        <a
          href="https://www.linkedin.com/in/lucas-saller-23640918a/"
          target="_blank"
          rel="noreferrer"
        >
          <Linkedin />
        </a>

        <a
          href="https://github.com/LucasSaller/tasklists/"
          target="_blank"
          rel="noreferrer"
        >
          <Github />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
