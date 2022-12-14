import { Link } from "react-router-dom";

const Error = () => {


  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12">
            {/* Start: error page */}
            <div className="min-vh-100 content-center">
              <div className="error-page text-center">
                <img src="/assets/img/svg/404.svg" alt={404} className="svg" />
                <div className="error-page__title">
                  404
                </div>
                <h5 className="fw-500">Ối! Đi lạc rồi bạn ơi.</h5>
                <div className="content-center mt-30">
                  <Link to="/" className="btn btn-primary">Trở về trang chủ</Link>
                </div>
              </div>
            </div>
            {/* End: error page */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
