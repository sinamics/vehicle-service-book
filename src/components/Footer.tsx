const Footer = ({ ...props }) => {
  return (
    <footer
      className="footer footer-center bg-base-300 text-base-content p-4"
      {...props}
    >
      <div>
        <p>Copyright © 2022 - All right reserved by Jakub Soboczyński</p>
      </div>
    </footer>
  );
};

export default Footer;
