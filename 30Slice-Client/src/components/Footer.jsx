import { Link } from "react-router-dom";
function Footer() {
  return (
    <>
      <footer className="footer-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="footer-copyright">
                <p>
                  2022 @<a href="#">30slice | Barbershop Đầu Hàng Việt Nam</a>
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="footer-menu text-right">
                <ul>
                  <li>
                    <Link to="/about">Về chúng tôi</Link>
                  </li>
                  <li>
                    <Link to="/crew">Đội ngũ coder</Link>
                  </li>
                  <li>
                    <Link to="/contact">Liên hệ</Link>
                  </li>
                </ul>
              </div>
              {/* ends: .Footer Menu */}
            </div>
          </div>
        </div>
      </footer>

      <div id="overlayer">
        <span className="loader-overlay">
          <div className="atbd-spin-dots spin-lg">
            <span className="spin-dot badge-dot dot-primary" />
            <span className="spin-dot badge-dot dot-primary" />
            <span className="spin-dot badge-dot dot-primary" />
            <span className="spin-dot badge-dot dot-primary" />
          </div>
        </span>
      </div>
      <div className="overlay-dark-sidebar" />
    </>



  )
}
export default Footer;