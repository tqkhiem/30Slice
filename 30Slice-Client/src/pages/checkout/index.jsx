import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, NavLink, Link } from "react-router-dom";

import { useForm } from "react-hook-form";

import Input from "../../components/sharedComponents/input";
import { usernameValidator } from "../../components/sharedComponents/validatorPatterns";
import { passwordValidator } from "../../components/sharedComponents/validatorPatterns";

import { selectMessage } from "../../app/redux/slices/auth/message";

import { login } from "../../app/redux/slices/auth/auth";
import { clearMessage } from "../../app/redux/slices/auth/message";

import OrderSummary from "../../components/OrderSummary";
const Checkout = () => {
  const dataCart = useSelector((state) => state.cart);
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
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="shop-breadcrumb">
              <div className="breadcrumb-main">
                <h4 className="text-capitalize breadcrumb-title">Đăng nhập</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className=" checkout wizard1 global-shadow border px-sm-50 px-20 pt-sm-50 py-30 mb-30 bg-white radius-xl w-100">
          <div className="row">
            <div className="col-xl-8">
              <div className="checkout-progress-indicator content-center">
                <div className="checkout-progress">
                  <div className="step " id={1}>
                    <span>
                      {" "}
                      <img
                        className="svg"
                        src="/assets/img/svg/user.svg"
                        alt=""
                      />{" "}
                    </span>
                    <span>Đăng nhập</span>
                  </div>
                  <div className="current">
                    <img
                      src="/assets/img/svg/checkout.svg"
                      alt="img"
                      className="svg"
                    />
                  </div>
                  <div className="step" id={2}>
                    <span>
                      <img
                        className="svg"
                        src="/assets/img/svg/address.svg"
                        alt=""
                      />
                    </span>
                    <span>Thông tin người nhận</span>
                  </div>
                  <div className="current">
                    <img
                      src="/assets/img/svg/checkout.svg"
                      alt="img"
                      className="svg"
                    />
                  </div>
                  <div className="step" id={3}>
                    <span>
                      <img
                        className="svg"
                        src="/assets/img/svg/155-credit-card.svg"
                        alt=""
                      />
                    </span>
                    <span>Phương thức thanh toán</span>
                  </div>
                  <div className="current">
                    <img
                      src="/assets/img/svg/checkout.svg"
                      alt="img"
                      className="svg"
                    />
                  </div>
                  <div className="step" id={4}>
                    <span>
                      <img
                        className="svg"
                        src="/assets/img/svg/024-like.svg"
                        alt=""
                      />
                    </span>
                    <span>Hoàn thành đơn hàng</span>
                  </div>
                </div>
              </div>

              {/* checkout */}
              <div className="row justify-content-center">
                <div className="col-xl-6 col-lg-8 col-sm-10">
                  <div className="card checkout-shipping-form border-0">
                    <div className="card-header border-bottom-0 align-content-start pb-sm-0 pb-1">
                      <h4 className="fw-500">
                        1. Đăng nhập vào tài khoản của bạn
                      </h4>
                    </div>
                    <div className="card-body">
                      <div className="edit-profile__body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="form-group">
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
                          <div className="form-group create-passord">
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
                          {message && (
                            <div className="form-group">
                              <div className="alert alert-danger" role="alert">
                                {message}
                              </div>
                            </div>
                          )}
                          <span>Chưa có tài khoản? <Link to="/register">Đăng ký</Link></span>
                          <div className="button-group d-flex pt-20 mb-20 justify-content-md-end justify-content-center">
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
                        </form>
                      </div>
                    </div>
                  </div>
                  {/* ends: card */}
                </div>
                {/* ends: col */}
              </div>
            </div>
            {/* ends: col */}
            <div className="col-xl-4 col-md-8 col-sm-10 mx-auto">
              <div className="card order-summery order-summery--width  bg-normal p-sm-25 p-15">
                <div className="card-header border-bottom-0 p-0 pb-25">
                  <h5 className="fw-500">Tổng đơn hàng</h5>
                </div>
                <div className="card-body bg-white">
                  <OrderSummary />
                </div>
              </div>
              {/* ends: card */}
            </div>
            {/* ends: col */}
          </div>
        </div>
        {/* End: .global-shadow*/}
      </div>
    </>
  );
};
export default Checkout;
