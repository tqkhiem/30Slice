import { NavLink, useSearchParams, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
import { toastSuccess } from "../../components/sharedComponents/toast";
const ResetPassword = () => {
  const API_URL = import.meta.env.REACT_APP_API_ENDPOINT;
  const [loading, setLoading] = useState(false);
  const refNewPassword = useRef();
  const [param] = useSearchParams();
  const navigate = useNavigate();
  let token = param.get("token");
  const HandleSubmit = async () => {
    setLoading(true);
    let new_password = refNewPassword.current.value;
    const response = await axios.post(
      API_URL + "admin/reset-password",
      { new_password },
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    if (response.status === 200) {
      setLoading(false);
      toastSuccess("Đổi mật khẩu thành công vui lòng đăng nhập lại!");
      navigate("/login");
    }
  };

  return (
    <main className="main-content">
      <div className="signUP-admin">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-4 col-lg-5 col-md-5 p-0">
              <div className="signUP-admin-left signIn-admin-left position-relative">
                <div className="signUP-overlay">
                  <img
                    className="svg signupTop"
                    src="/assets/img/svg/signuptop.svg"
                    alt="img"
                  />
                  <img
                    className="svg signupBottom"
                    src="/assets/img/svg/signupbottom.svg"
                    alt="img"
                  />
                </div>
                {/* End: .signUP-overlay  */}
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
                {/* End: .signUP-admin-left__content  */}
                <div className="signUP-admin-left__img">
                  <img
                    className="img-fluid svg"
                    src="/assets/img/svg/signupIllustration.svg"
                    alt="img"
                  />
                </div>
                {/* End: .signUP-admin-left__img  */}
              </div>
              {/* End: .signUP-admin-left  */}
            </div>
            {/* End: .col-xl-4  */}
            <div className="col-xl-8 col-lg-7 col-md-7 col-sm-8">
              <div className="signUp-admin-right signIn-admin-right  p-md-40 p-10 mt-5">
                {/* End: .signUp-topbar  */}
                <div className="row justify-content-center">
                  <div className="col-xl-7 col-lg-8 col-md-12">
                    <div className="edit-profile mt-md-25 mt-0">
                      <div className="card border-0">
                        <div className="card-header border-0  pb-md-15 pb-10 pt-md-20 pt-10 ">
                          <div className="edit-profile__title">
                            <h6>
                              Khôi phục{" "}
                              <span className="color-primary">Mật Khẩu</span>
                            </h6>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="edit-profile__body">
                            <div className="form-group mb-15">
                              <label htmlFor="newPassword-field">
                                Mật khẩu mới
                              </label>
                              <div className="position-relative">
                                <input
                                  id="newPassword-field"
                                  type="password"
                                  className="form-control"
                                  name="newPassword"
                                  ref={refNewPassword}
                                />
                                <div className="fa fa-fw fa-eye-slash text-light fs-16 field-icon toggle-password2" />
                              </div>
                            </div>
                            <div className="form-group mb-15">
                              <label htmlFor="password-field">
                                Nhập lại mật khẩu mới
                              </label>
                              <div className="position-relative">
                                <input
                                  id="password-field"
                                  type="password"
                                  className="form-control"
                                  name="password"
                                />
                                <div className="fa fa-fw fa-eye-slash text-light fs-16 field-icon toggle-password2" />
                              </div>
                            </div>

                            <div className="button-group d-flex pt-1 justify-content-md-start justify-content-center mb-20">
                              <button
                                onClick={HandleSubmit}
                                className="btn btn-primary btn-default btn-squared mr-15 text-capitalize lh-normal px-50 py-15 signIn-createBtn "
                              >
                                {loading && (
                                  <span className="spinner-border spinner-border-sm"></span>
                                )}
                                Đổi mật khẩu
                              </button>
                            </div>
                            <p className="mb-0 fs-14 fw-500 text-gray text-capitalize">
                              Trở về
                              <NavLink
                                className="m-1 color-primary"
                                to="/login"
                              >
                                Đăng nhập
                              </NavLink>
                            </p>
                          </div>
                        </div>
                        {/* End: .card-body */}
                      </div>
                      {/* End: .card */}
                    </div>
                    {/* End: .edit-profile */}
                  </div>
                  {/* End: .col-xl-5 */}
                </div>
              </div>
              {/* End: .signUp-admin-right  */}
            </div>
            {/* End: .col-xl-8  */}
          </div>
        </div>
      </div>
      {/* End: .signUP-admin  */}
    </main>
  );
};
export default ResetPassword;
