import { useRouteError,Link } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      {/* <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div> */}

      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12">
            {/* Start: error page */}
            <div className="min-vh-100 content-center">
              <div className="error-page text-center">
                <img src="/assets/img/svg/404.svg" alt={404} className="svg" />
                <div className="error-page__title">
                  {error.statusText || error.message}
                </div>
                <h5 className="fw-500">Ối! Có lỗi xảy ra.</h5>
                <div className="content-center mt-30">
                  <Link
                    to="/"
                    className="btn btn-primary btn-default btn-squared px-30"
                  >
                    Trở về trang chủ
                  </Link>
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
