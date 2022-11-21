const Footer = ({ ...props }) => {
  return (
    <footer
      className="footer footer-center bg-base-300 p-4 text-base-content"
      {...props}
    >
      <div>
        <p>
          Copyright © 2022 - All right reserved by{" "}
          <a
            className="link-hover link-info link"
            href="https://github.com/teziovsky/"
          >
            Jakub Soboczyński
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
