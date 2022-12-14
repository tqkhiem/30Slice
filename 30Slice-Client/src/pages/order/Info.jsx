import Breadcrumb from "../../components/Breakcumb";
import { GetOrderHistory } from "../../app/services/user/order.service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetOrdersByCustomer } from "../../app/services/user/cart.service";
import { useParams } from "react-router-dom";
export default function OrderInfo() {
  const { id } = useParams();
  const [orders, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchOrderInfo = async () => {
    setLoading(true);
    const res = await GetOrdersByCustomer(id);
    // console.log(res.data);
    if (res.status === 200) {
      setOrder(res.data);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchOrderInfo();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="shop-breadcrumb">
              <div className="breadcrumb-main">
                <h4 className="text-capitalize breadcrumb-title">
                  Thông tin đơn hàng
                </h4>
              </div>
            </div>
            <Breadcrumb BreadName="Thông tin đơn hàng" />
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
        <div className="container-fluid card">
        <div className="row  justify-content-center mt-3">
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
              Tên người đặt hàng: <b>{orders.Info && orders?.Info.Full_Name}</b>
            </p>
            <p>
              Địa chỉ: <b>{orders && orders?.Address}</b>
            </p>
            <p>
              Số điện thoại người nhận: <b>{orders && orders?.Phone}</b>
            </p>
            <p>
              Email người nhận: <b>{orders && orders?.Email}</b>
            </p>
            <p>
              Trạng thái: 
              {orders?.Status === "Pending" ? (
                <b className="text-warning"> Chưa xác nhận</b>
              ) : (
                <b className="text-success"> Đã xác nhận/đang giao hàng</b>
              )}
            </p>
            <p>
              Phương thức thanh toán: <b>{orders?.Payment_Method?.toUpperCase()}</b>
            </p>
            <p>
              Tình trạng thanh toán: 
              {orders?.Payment_Status === "Pending" ? (
                <b className="text-warning"> Chưa thanh toán</b>
              ) : (
                <b className="text-success"> Đã thanh toán thành công</b>
              )}
            </p>
            <p>
              Ghi chú: <b>{orders && orders?.Customer_Note}</b>
            </p>
            <p>
              Ghi chú bởi admin: <b>{orders && orders?.Admin_Note}</b>
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
                                      <h5 className="mt-0">{item.Name}</h5>
                                    </div>
                                  </div>
                                </td>
                                <td className="price">
                                  {item.Price.toLocaleString("vi-VN")}đ
                                </td>
                                <td>
                                  {/* Start: Product Quantity */}
                                  <div className="quantity product-cart__quantity">
                                    {item.Quantity}
                                  </div>
                                  {/* End: Product Quantity */}
                                </td>
                                <td className="text-center subtotal">
                                  {(item.Price * item.Quantity).toLocaleString(
                                    "vi-VN"
                                  )}
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
                                  orders.Amount.toLocaleString("vi-VN")}
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
        </div>
      )}
    </>
  );
}
