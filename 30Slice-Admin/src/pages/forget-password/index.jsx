import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
import { toastSuccess } from "../../components/sharedComponents/toast";

const ForgetPassword = () => {
  const API_URL = import.meta.env.REACT_APP_API_ENDPOINT;
  const [loading, setLoading] = useState(false);

  const refEmail = useRef();
  const HandleSubmit = async () => {
    let email = refEmail.current.value;
    setLoading(true);

    const response = await axios.post(API_URL + "admin/forgot-password", {
      email,
    });
    console.log(response);
    if (response.status === 200) {
      setLoading(false);
      toastSuccess("Thành Công! Vui lòng kiểm tra email hoặc email spam");
    }
  };

  return (
    <main className="main-content">
      <div className="signUP-admin">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-4 col-lg-5 col-md-5 p-0">
              <div className="signUP-admin-left position-relative h-100vh">
                <div className="signUP-overlay">
                  <img
                    className="svg signupTop"
                    src="/assets/img/svg/signuptop.svg"
                    alt="svg"
                  />
                  <img
                    className="svg signupBottom"
                    src="/assets/img/svg/signupbottom.svg"
                    alt="svg"
                  />
                </div>
                <div className="signUP-admin-left__content">
                  <div className="text-capitalize mb-md-30 mb-15 d-flex align-items-center justify-content-md-start justify-content-center">
                    <a
                      className="wh-36 bg-primary text-white radius-md mr-10 content-center"
                      href="index.html"
                    >
                      a
                    </a>
                    <span className="text-dark">admin</span>
                  </div>
                  <h1>Trang Quản Trị Hệ Thống 30Slice</h1>
                </div>
                <div className="signUP-admin-left__img">
                  <img
                    className="img-fluid svg"
                    src="/assets/img/svg/signupIllustration.svg"
                    alt="svg"
                  />
                </div>
              </div>
              {/* End: .signUP-admin-left */}
            </div>
            {/* End: .col */}
            <div className="col-xl-8 col-md-7 col-sm-8">
              <div className="signUp-admin-right content-center h-100 pb-30">
                <div className="row justify-content-center">
                  <div className="col-md-8 col-sm-10">
                    <div className="edit-profile mt-0">
                      <div className="card border-0">
                        <div className="card-header border-0 pt-0 pb-0">
                          <div className="signUp-header-top mt-md-0 mt-30">
                            <h6>Quên mật khẩu?</h6>
                            <p className="mt-md-45 mt-20">
                              Nhập địa chỉ email bạn đã sử dụng khi tham gia và
                              chúng tôi sẽ gửi cho bạn hướng dẫn để đặt lại mật
                              khẩu của bạn.
                            </p>
                          </div>
                        </div>
                        <div className="card-body pt-20 pb-0">
                          <div className="edit-profile__body">
                            <div className="form-group mb-20">
                              <label htmlFor="email">Địa chỉ Email</label>
                              <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="name@example.com"
                                ref={refEmail}
                              />
                            </div>
                            <div className="d-flex mb-sm-35 mb-20">
                              <button
                                onClick={HandleSubmit}
                                className="btn btn-primary btn-default btn-squared text-capitalize lh-normal px-md-50 py-15 signIn-createBtn"
                              >
                                {loading && (
                                  <span className="spinner-border spinner-border-sm"></span>
                                )}
                                Gửi yêu cầu
                              </button>
                            </div>
                            <p className="mb-0 fs-14 fw-500 text-gray text-capitalize">
                              Trở về
                              <NavLink
                                to="/login"
                                className="m-1 color-primary"
                              >
                                Đăng nhập
                              </NavLink>
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* End: .card */}
                    </div>
                    {/* End: .edit-profile */}
                  </div>
                  {/* End: col */}
                </div>
              </div>
              {/* End: .signUp-admin-right */}
            </div>
            {/* End: .col */}
          </div>
        </div>
      </div>
      {/* End: .signUP-admin */}
    </main>
  );
};
export default ForgetPassword;
