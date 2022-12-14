import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  toastSuccess,
  toastError,
} from "../../components/sharedComponents/toast";
import { useNavigate } from "react-router-dom";
import { setPayment, clearCart } from "../../app/redux/slices/user/CartSlice";
import { Link } from "react-router-dom";
import OrderSummary from "../../components/OrderSummary";
import { Truck } from "react-feather";
import {
  CheckoutCod,
  CheckoutVnpay,
  CheckoutMomo,
} from "../../app/services/user/cart.service";
const Checkout3 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState("momo");
  // console.log(cartItems)
  const handleCheckout = async () => {
    dispatch(setPayment(paymentMethod));
    const data = {
      Id_Customer: cartItems.id_Customer,
      Products: cartItems.products,
      Receiver: cartItems.name,
      Address: cartItems.address,
      Phone: cartItems.phone,
      Email: cartItems.email,
      Amount: cartItems.amount,
      Payment_Method: paymentMethod,
      Customer_Note: cartItems.note,
    };
    if (paymentMethod == "cod") {
      // console.log(data);
      const res = await CheckoutCod(data);
      // console.log(res);
      if (res.status === 200) {
        toastSuccess("Đặt hàng thành công");
        navigate("/order-success?order_id=" + res.data._id);
        dispatch(clearCart());
      }
    } else if (paymentMethod == "vnpay") {
      const res = await CheckoutVnpay(data);
      // console.log(res.data);
      window.location.replace(res.data);
      dispatch(clearCart());
    } else if (paymentMethod == "momo") {
      const res = await CheckoutMomo(data);
      // console.log(res.data);
      window.location.replace(res.data);
      dispatch(clearCart());
    }

  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="shop-breadcrumb">
              <div className="breadcrumb-main">
                <h4 className="text-capitalize breadcrumb-title">
                  Phương thức thanh toán
                </h4>
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
                  <div className="step" id={1}>
                    <span>
                      {" "}
                      <img
                        className="svg"
                        src="/assets/img/svg/user-success.svg"
                        alt=""
                      />{" "}
                    </span>
                    <span>Đăng nhập</span>
                  </div>
                  <div className="current">
                    <img
                      src="/assets/img/svg/green.svg"
                      alt="img"
                      className="svg"
                    />
                  </div>
                  <div className="step active" id={2}>
                    <span>
                      <img
                        className="svg"
                        src="/assets/img/svg/address-success.svg"
                        alt=""
                      />
                    </span>
                    <span>Thông tin người nhận</span>
                  </div>
                  <div className="current">
                    <img
                      src="/assets/img/svg/checkoutin.svg"
                      alt="img"
                      className="svg"
                    />
                  </div>
                  <div className="step" id={3}>
                    <span>
                      <img
                        className="svg"
                        src="/assets/img/svg/155-credit-card-active.svg"
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
                      <h4 className="fw-500">3. Chọn phương thức thanh toán</h4>
                    </div>
                    <div className="card-body">
                      <div className="payment-method-paypal">
                        <div className="d-flex align-items-center mb-20">
                          <div className="radio-theme-default custom-radio  d-flex mr-2">
                            <input
                              className="radio"
                              type="radio"
                              name="radio-vertical"
                              value="momo"
                              id="momo"
                              defaultChecked
                              onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <label htmlFor="momo">
                              <span className="radio-text" />
                            </label>
                          </div>
                          <label
                            htmlFor="momo"
                            className=" form-control d-flex align-items-center justify-content-between"
                          >
                            Thanh toán bằng Momo
                            <img
                              src="/assets/images/momo.svg"
                              alt="paypal"
                              className="d-lg-block mx-3"
                              style={{ width: "50px" }}
                            />
                          </label>
                        </div>
                        <div className="d-flex align-items-center mb-20">
                          <div className="radio-theme-default custom-radio  d-flex mr-2">
                            <input
                              className="radio"
                              type="radio"
                              name="radio-vertical"
                              value="vnpay"
                              id="vnpay"
                              onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <label htmlFor="vnpay">
                              <span className="radio-text" />
                            </label>
                          </div>
                          <label
                            htmlFor="vnpay"
                            className=" form-control d-flex align-items-center justify-content-between"
                          >
                            Thanh toán bằng VNPAY
                            <img
                              src="/assets/images/vnpay.svg"
                              alt="paypal"
                              className="d-lg-block d-none"
                            />
                          </label>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="radio-theme-default custom-radio  d-flex mr-2">
                            <input
                              className="radio"
                              type="radio"
                              name="radio-vertical"
                              value="cod"
                              id="cod"
                              onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <label htmlFor="cod">
                              <span className="radio-text" />
                            </label>
                          </div>
                          <label
                            htmlFor="cod"
                            className=" form-control d-flex align-items-center justify-content-between"
                            id="payment3"
                          >
                            Thanh toán khi nhận hàng (COD)
                            <Truck className="d-lg-block d-none m-4" />
                          </label>
                        </div>
                      </div>

                      <div className="col-md-12 mt-5 form-group">
                        <div className="button-group d-flex pt-40 mb-xl-20  justify-content-sm-between justify-content-center m-0 mb-xl-30 mb-30 flex-wrap">
                          <Link
                            to="/checkout2"
                            className="btn btn-light btn-default btn-squared fw-400 text-capitalize m-sm-0 m-1"
                          >
                            <i className="las la-arrow-left mr-10" />
                            Trở lại
                          </Link>
                          <button
                            onClick={handleCheckout}
                            className="btn text-white btn-primary btn-default btn-squared text-capitalize m-sm-0 m-1"
                          >
                            tiếp tục
                            <i className="ml-10 mr-0 las la-arrow-right" />
                          </button>
                        </div>
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
export default Checkout3;
