import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import {
  toastSuccess,
  toastError,
} from "../../components/sharedComponents/toast";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import OrderSummary from "../../components/OrderSummary";
import { Truck } from "react-feather";
import { GetOrdersByCustomer } from "../../app/services/user/cart.service";
const Checkout4 = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(false);
  const _isMounted = useRef(false);

  const getOrders = async () => {
    _isMounted.current && setLoading(true);
    try {
      const res = await GetOrdersByCustomer(searchParams.get("order_id"));
      // console.log(res.data);
      _isMounted.current && setOrders(res.data);
      _isMounted.current && setLoading(false);
    } catch (error) {
      _isMounted.current && setLoading(false);
      _isMounted.current && toastError(error.message);
    }
  };

  useEffect(() => {
    _isMounted.current = true;

    return () => {
      _isMounted.current = false;
    };
  });
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="shop-breadcrumb">
              <div className="breadcrumb-main">
                <h4 className="text-capitalize breadcrumb-title">
                  hoàn thành đơn hàng
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className=" checkout wizard1 global-shadow border px-sm-50 px-20 pt-sm-50 py-30 mb-30 bg-white radius-xl w-100">
          <div className="row">
            <div className="col-xl-12">
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
                      src="/assets/img/svg/green.svg"
                      alt="img"
                      className="svg"
                    />
                  </div>
                  <div className="step" id={3}>
                    <span>
                      <img
                        className="svg"
                        src="/assets/img/svg/155-credit-card-success.svg"
                        alt=""
                      />
                    </span>
                    <span>Phương thức thanh toán</span>
                  </div>
                  <div className="current">
                    <img
                      src="/assets/img/svg/green.svg"
                      alt="img"
                      className="svg"
                    />
                  </div>
                  <div className="step" id={4}>
                    <span>
                      <img
                        className="svg"
                        src="/assets/img/svg/024-like-success.svg"
                        alt=""
                      />
                    </span>
                    <span>Hoàn thành đơn hàng</span>
                  </div>
                </div>
              </div>
              {loading ? (
                <div className="card-body">
                  <div className="spin-container text-center">
                    <div className="atbd-spin-dots spin-lg">
                      <span className="spin-dot badge-dot dot-primary"></span>
                      <span className="spin-dot badge-dot dot-primary"></span>
                      <span className="spin-dot badge-dot dot-primary"></span>
                      <span className="spin-dot badge-dot dot-primary"></span>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-8 col-sm-10">
                      <div className="card payment-status bg-normal p-sm-30 p-15">
                        <div className="card-body bg-white bg-shadow radius-xl px-sm-30 pt-sm-25 m-0 p-0">
                          <div className="payment-status__area  py-sm-25 py-20 text-center">
                            <div className="content-center">
                              <span className="wh-34 bg-success rounded-circle content-center">
                                <span className="las la-check fs-16 color-white" />
                              </span>
                            </div>
                            <h4 className="fw-500 mt-20 mb-10">
                              Đặt hàng thành công
                            </h4>
                            <span className="fs-15 color-gray">
                              Cảm ơn bạn đã đặt hàng ! Chúng tôi sẽ xác nhận đơn
                              và gửi cho bạn trong thời gian sớm nhất!
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* ends: card */}
                    </div>
                    {/* ends: col */}
                  </div>
                  <div className="row justify-content-center mt-3">
                    <div className="col-xl-8 col-lg-8 col-sm-10">
                      <h1 className="text-center">Thông tin đơn hàng</h1>
                      <hr className="m-2" />
                      <p>
                        Mã đơn hàng : <b>{orders?._id}</b>
                      </p>
                      <p>
                        Tên người nhận: <b>{orders && orders?.Receiver}</b>
                      </p>
                      <p>
                        Tên người đặt hàng:{" "}
                        <b>{orders.Info && orders?.Info.Full_Name}</b>
                      </p>
                      <p>
                        Địa chỉ: <b>{orders && orders?.Address}</b>
                      </p>
                      <p>
                        Số điện thoại người nhận:{" "}
                        <b>{orders && orders?.Phone}</b>
                      </p>
                      <p>
                        Email người nhận: <b>{orders && orders?.Email}</b>
                      </p>
                      <p>
                        Trạng thái: <b>{orders && orders?.Payment_Status}</b>
                      </p>
                      <p>
                        Phương thức thanh toán:{" "}
                        <b>{orders && orders?.Payment_Method}</b>
                      </p>
                      <p>
                        Ghi chú: <b>{orders && orders?.Customer_Note}</b>
                      </p>
                    </div>
                    <div className=" bg-normal p-sm-30 card">
                      <div className="cartPage  global-shadow border pr-sm-30 pl-sm-30  p-15 py-sm-30 bg-white radius-xl w-100 mb-30">
                        <h3 className="my-4">Chi tiết đơn hàng</h3>

                        <div className="row">
                          <div className=" col-12 ">
                            <div className="product-cart mb-sm-0 mb-20">
                              <div className="table-responsive">
                                <table
                                  id="cart"
                                  className="table table-borderless table-hover"
                                >
                                  <thead>
                                    <tr className="product-cart__header">
                                      <th scope="col">Sản phẩm</th>
                                      <th scope="col">Giá</th>
                                      <th scope="col">Số lượng</th>
                                      <th scope="col" className="text-center">
                                        Thành tiền
                                      </th>
                                      <th scope="col" className="" />
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {orders.Products &&
                                      orders.Products.map((item, index) => (
                                        <tr key={index}>
                                          <td className="Product-cart-title">
                                            <div className="media  align-items-center">
                                              <img
                                                className="mr-3 wh-80 align-self-center radius-xl bg-opacity-primary"
                                                src={item.Images[0]}
                                                alt="Generic placeholder image"
                                              />
                                              <div className="media-body">
                                                <h5 className="mt-0">
                                                  {item.Name}
                                                </h5>
                                              </div>
                                            </div>
                                          </td>
                                          <td className="price">
                                            {item.Price.toLocaleString("vi-VN")}
                                            đ
                                          </td>
                                          <td>
                                            {/* Start: Product Quantity */}
                                            <div className="quantity product-cart__quantity">
                                              {item.Quantity}
                                            </div>
                                            {/* End: Product Quantity */}
                                          </td>
                                          <td className="text-center subtotal">
                                            {(
                                              item.Price * item.Quantity
                                            ).toLocaleString("vi-VN")}
                                            đ
                                          </td>
                                        </tr>
                                      ))}
                                    <tr>
                                      <td>
                                        <h4>Tổng Cộng</h4>
                                      </td>
                                      <td> </td>
                                      <td>
                                        <p>
                                          {orders.Amount &&
                                            orders.Amount.toLocaleString(
                                              "vi-VN"
                                            )}
                                          đ
                                        </p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                {/* End: table */}
                              </div>
                            </div>
                            {/* End: .product-cart*/}
                          </div>
                          {/* End: .cus-xl-9 */}

                          {/* End: .cus-xl-9 */}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {/* checkout */}
            </div>
            {/* ends: col */}
            {/* ends: col */}
          </div>
        </div>
        {/* End: .global-shadow*/}
      </div>
    </>
  );
};
export default Checkout4;
