import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Input from "../../components/sharedComponents/input";
import {
  usernameValidator,
  phoneValidator,
  passwordValidator,
} from "../../components/sharedComponents/validatorPatterns";
import { RegisterUser } from "../../app/services/user/user.service";
import { toastSuccess,toastError } from "../../components/sharedComponents/toast";
import { useForm } from "react-hook-form";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (user) => {
    setLoading(true);
    console.log(user)
    const res = await RegisterUser(user)
    if (res.status === 201) {
      toastSuccess("Đăng ký thành công");
      navigate("/login");
    }else{
      toastError(res.data.message);
    }
    setLoading(false);
  };

  return (
    <main className="main-content">
      <div className="signUP-admin">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-4 col-lg-5 col-md-5 p-0">
              <div className="signUP-admin-left position-relative">
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
                <div className="signUP-admin-left__content">
                  <div className="text-capitalize mb-md-30 mb-15 d-flex align-items-center justify-content-md-start justify-content-center">
                    <a
                      className="wh-36 bg-primary text-white radius-md mr-10 content-center"
                      href="index.html"
                    >
                      C
                    </a>
                    <span className="text-dark">client</span>
                  </div>
                  <h1>Trang Thành Viên Hệ Thống 30Slice</h1>
                </div>
                <div className="signUP-admin-left__img">
                  <img
                    className="img-fluid svg"
                    src="/assets/img/svg/signupIllustration.svg"
                    alt="img"
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-lg-7 col-md-7 col-sm-8">
              <div className="signUp-admin-right  p-md-40 p-10">
                <div className="row justify-content-center">
                  <div className="col-xl-7 col-lg-10 col-md-12 ">
                    <div className="edit-profile mt-md-25 mt-0">
                      <div className="card border-0">
                        <div className="card-header border-0  pb-md-15 pb-10 pt-md-20 pt-10 ">
                          <div className="edit-profile__title">
                            <h6>
                              Đăng ký tài khoản{" "}
                              <span className="color-primary">Client</span>
                            </h6>
                          </div>
                        </div>
                        <div className="card-body">
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="edit-profile__body">
                              <div className="form-group mb-20">
                                <label htmlFor="name">Họ và tên</label>
                                <input
                                  type="text"
                                  id="name"
                                  placeholder="Nguyễn Văn A..."
                                  className={
                                    !!errors?.full_name
                                      ? "is-invalid form-control"
                                      : "form-control"
                                  }
                                  {...register("full_name", {
                                    required: "Trường này không được để trống",
                                  })}
                                />
                                {errors && (
                                  <span className="invalid-validate">
                                    {errors?.full_name?.message}
                                  </span>
                                )}
                              </div>

                              <div className="form-group mb-20">
                                <label htmlFor="username">Tên đăng nhập</label>
                                <input
                                  type="text"
                                  id="username"
                                  placeholder="example123..."
                                  className={
                                    !!errors?.username
                                      ? "is-invalid form-control"
                                      : "form-control"
                                  }
                                  {...register("username", {
                                    required: "Trường này không được để trống",
                                    pattern: usernameValidator,
                                  })}
                                />
                                {errors && (
                                  <span className="invalid-validate">
                                    {errors?.username?.message}
                                  </span>
                                )}
                              </div>
                              <div className="form-group mb-20">
                                <label htmlFor="email">Địa chỉ email</label>
                                <input
                                  type="text"
                                  id="email"
                                  placeholder="name@example.com"
                                  className={
                                    !!errors?.email
                                      ? "is-invalid form-control"
                                      : "form-control"
                                  }
                                  {...register("email", {
                                    required: "Trường này không được để trống",
                                  })}
                                />
                                {errors && (
                                  <span className="invalid-validate">
                                    {errors?.email?.message}
                                  </span>
                                )}
                              </div>
                              <div className="form-group mb-20">
                                <label htmlFor="phone">Số điện thoại</label>
                                <input
                                  type="text"
                                  id="phone"
                                  placeholder="09876543"
                                  className={
                                    !!errors?.phone
                                      ? "is-invalid form-control"
                                      : "form-control"
                                  }
                                  {...register("phone", {
                                    required: "Trường này không được để trống",
                                    pattern: phoneValidator,
                                  })}
                                />
                                {errors && (
                                  <span className="invalid-validate">
                                    {errors?.phone?.message}
                                  </span>
                                )}
                              </div>
                              <div className="form-group mb-15">
                                <label htmlFor="password-field">Mật khẩu</label>
                                <div className="position-relative">
                                  <input
                                    id="password-field"
                                    type="password"
                                    className={
                                      !!errors?.password
                                        ? "is-invalid form-control"
                                        : "form-control"
                                    }
                                    {...register("password", {
                                      required:
                                        "Trường này không được để trống",
                                      pattern: passwordValidator,
                                    })}
                                  />
                                  {errors && (
                                    <span className="invalid-validate">
                                      {errors?.password?.message}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <p className="my-3">
                                Đã có tài khoản?
                                <Link to="/login" className="color-primary">
                                  Đăng nhập
                                </Link>
                              </p>

                              <div className="button-group d-flex pt-1 justify-content-md-start justify-content-center">
                                <button
                                  type="submit"
                                  className="btn btn-primary btn-default btn-squared mr-15 text-capitalize lh-normal px-50 py-15 signUp-createBtn signIn-createBtn"
                                >
                                  {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                  )}
                                  Đăng ký
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
