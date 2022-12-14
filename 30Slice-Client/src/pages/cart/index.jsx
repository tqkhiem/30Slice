import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breakcumb from "../../components/Breakcumb";
import OrderSummary from "../../components/OrderSummary";
import {
  removeProduct,
  updateProduct,
} from "../../app/redux/slices/user/CartSlice";
import { useRef } from "react";
import { ShoppingBag } from "react-feather";
const Cart = () => {
  const dataCart = useSelector((state) => state.cart);
  // console.log(dataCart);
  const dispatch = useDispatch();
  const handleUpdate = (_id, Quantity) => {
    if (Quantity <= 0 || Quantity === "") {
      return;
    }
    dispatch(updateProduct({ _id, Quantity: parseInt(Quantity) }));
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="shop-breadcrumb">
              <div className="breadcrumb-main">
                <h4 className="text-capitalize breadcrumb-title">giỏ hàng</h4>
              </div>
              <Breakcumb />
            </div>
          </div>
        </div>
      </div>
      {dataCart.products && dataCart.products.length > 0 ? (
        <div className="container-fluid">
          <div className="cartPage  global-shadow border pr-sm-30 pl-sm-30  p-15 py-sm-30 bg-white radius-xl w-100 mb-30">
            <div className="row justify-content-center">
              <div className="cus-xl-9 col-12 ">
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
                            Tổng cộng
                          </th>
                          <th scope="col" className="" />
                        </tr>
                      </thead>
                      <tbody>
                        {dataCart.products.map((item, index) => (
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
                                <input
                                  type="button"
                                  defaultValue="-"
                                  className="bttn bttn-left wh-36"
                                  onClick={() => {
                                    handleUpdate(item._id, item.Quantity - 1);
                                  }}
                                />
                                <input
                                  type="number"
                                  value={item.Quantity}
                                  className="qty qh-36 input"
                                  onChange={(e) => {
                                    handleUpdate(item._id, e.target.value);
                                  }}
                                />
                                <input
                                  type="button"
                                  defaultValue="+"
                                  className="bttn bttn-right wh-36"
                                  onClick={() => {
                                    handleUpdate(item._id, item.Quantity + 1);
                                  }}
                                />
                              </div>
                              {/* End: Product Quantity */}
                            </td>
                            <td className="text-center subtotal">
                              {(item.Price * item.Quantity).toLocaleString(
                                "vi-VN"
                              )}
                              đ
                            </td>
                            <td className="actions">
                              <button
                                onClick={() =>
                                  dispatch(removeProduct(item._id))
                                }
                                type="button"
                                className="action-btn float-right"
                              >
                                <i className="las la-trash-alt" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* End: table */}
                  </div>
                </div>
                {/* End: .product-cart*/}
              </div>
              {/* End: .cus-xl-9 */}
              <div className="cus-xl-3 col-md-8  ">
                <div className="card order-summery bg-normal p-sm-25 p-15 order-summery--width ">
                  <div className="card-header border-bottom-0 p-0 pb-25">
                    <h5 className="fw-500">Tổng đơn hàng</h5>
                  </div>
                  <div className="card-body bg-white px-sm-25 px-20">
                    <OrderSummary />
                    <Link
                      to="/checkout"
                      className="checkout btn-secondary
                      content-center w-100 btn-lg mt-20"
                    >
                      {" "}
                      Tới trang thanh toán
                      <i className="las la-arrow-right" />
                    </Link>
                  </div>
                </div>
                {/* End: .order-summery*/}
              </div>
              {/* End: .cus-xl-9 */}
            </div>
          </div>
          {/* End: .global-shadow */}
        </div>
      ) : (
        <>
          <div className="text-center mb-5">
          <h1> Giỏ hàng của bạn đang trống</h1>

            <img src="/assets/img/Add to Cart-amico.svg" width="25%" alt="" />
          </div>
        </>
      )}
    </>
  );
};
export default Cart;
