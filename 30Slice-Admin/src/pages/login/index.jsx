import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate,NavLink } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import Input from '../../components/sharedComponents/input';
import { usernameValidator } from '../../components/sharedComponents/validatorPatterns';
import { passwordValidator } from '../../components/sharedComponents/validatorPatterns';

import { selectMessage } from '../../app/redux/slices/auth/message';

import { login } from '../../app/redux/slices/auth/auth';
import { clearMessage } from '../../app/redux/slices/auth/message';

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const message = useSelector(selectMessage);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const onSubmit = (user) => {
    const { username, password } = user;
    setLoading(true);
    dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        // navigate('/');
        // window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <main className="main-content">
        <div className="signUP-admin">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-xl-4 col-lg-5 col-md-5 p-0">
                <div className="signUP-admin-left signIn-admin-left position-relative">
                  <div className="signUP-overlay">
                    <img
                      className="svg signupTop"
                      src="/assets/img/svg/signupTop.svg"
                      alt="img"
                    />
                    <img
                      className="svg signupBottom"
                      src="/assets/img/svg/signupBottom.svg"
                      alt="img"
                    />
                  </div>
                  {/* End: .signUP-overlay  */}
                  <div className="signUP-admin-left__content">
                    <div className="mb-md-30 mb-15 d-flex align-items-center justify-content-md-start justify-content-center">
                      <a
                        className="wh-36 bg-primary text-white radius-md mr-10 content-center"
                        href="index.html"
                      >
                        A
                      </a>
                      <span className="text-dark">Admin</span>
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
              <div className="col-xl-8 col-lg-7 col-md-7 col-sm-8 login-container">
                <div className="signUp-admin-right signIn-admin-right  p-md-40 p-10">
                  <div className="signUp-topbar d-flex align-items-center justify-content-md-end justify-content-center mt-md-0 mb-md-0 mt-20 mb-1">
                    <p className="mb-0">
                      <a href="sign-up.html" className="color-primary"></a>
                    </p>
                  </div>
                  {/* End: .signUp-topbar  */}
                  <div className="row justify-content-center">
                    <div className="col-xl-7 col-lg-8 col-md-12">
                      <div className="edit-profile mt-md-25 mt-0">
                        <div className="card border-0">
                          <div className="card-header border-0  pb-md-15 pb-10 pt-md-20 pt-10 ">
                            <div className="edit-profile__title">
                              <h6>
                                Đăng nhập vào{' '}
                                <span className="color-primary">Admin</span>
                              </h6>
                            </div>
                          </div>
                          <div className="card-body">
                            <div className="edit-profile__body">
                              <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group mb-20">
                                  <Input
                                    register={register}
                                    type="text"
                                    label="Tên người dùng"
                                    id="username"
                                    required="Trường này không được để trống"
                                    pattern={usernameValidator}
                                    error={errors.username}
                                  />
                                </div>
                                <div className="form-group mb-15">
                                  <Input
                                    register={register}
                                    type="password"
                                    label="Mật khẩu"
                                    id="password"
                                    required="Trường này không được để trống"
                                    pattern={passwordValidator}
                                    error={errors.password}
                                  />
                                </div>
                                <div className="signUp-condition signIn-condition">
                                  <div className="checkbox-theme-default custom-checkbox ">
                                    <input
                                      className="checkbox"
                                      type="checkbox"
                                      id="check-1"
                                    />
                                    <label htmlFor="check-1">
                                      <span className="checkbox-text">
                                        Giữ tôi đăng nhập
                                      </span>
                                    </label>
                                    
                                  </div>
                                  <NavLink to="/forget-password">Quên mật khẩu</NavLink>
                                </div>
                                {message && (
                                  <div className="form-group">
                                    <div
                                      className="alert alert-danger"
                                      role="alert"
                                    >
                                      {message}
                                    </div>
                                  </div>
                                )}
                                <div className="button-group d-flex pt-1 justify-content-md-start justify-content-center">
                                  <button
                                    type="submit"
                                    className="btn btn-primary btn-default btn-squared mr-15 lh-normal px-50 py-15 signIn-createBtn "
                                  >
                                    {loading && (
                                      <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    Đăng nhập
                                  </button>
                                </div>
                                <p className="social-connector text-center mb-sm-25 mb-15  mt-sm-30 mt-20">
                                  <span>Hoặc</span>
                                </p>
                              </form>
                              <div className="button-group d-flex align-items-center justify-content-md-start justify-content-center ">
                                <ul className="signUp-socialBtn">
                                  <li>
                                    <button className="btn text-dark px-30">
                                      <img
                                        className="svg"
                                        src="/assets/img/svg/google.svg"
                                        alt="img"
                                      />
                                      {'  '}
                                      <span
                                        style={{
                                          marginLeft: 10,
                                        }}
                                      >
                                        Đăng nhập bằng Google
                                      </span>
                                    </button>
                                  </li>
                                  {/* <li>
                                    <button className=" radius-md wh-48 content-center">
                                      <img
                                        className="svg"
                                        src="/assets/img/svg/facebook.svg"
                                        alt="img"
                                      />
                                    </button>
                                  </li>
                                  <li>
                                    <button className="radius-md wh-48 content-center">
                                      <img
                                        className="svg"
                                        src="/assets/img/svg/twitter.svg"
                                        alt="img"
                                      />
                                    </button>
                                  </li> */}
                                </ul>
                              </div>
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
    </>
  );
};

export default Login;
