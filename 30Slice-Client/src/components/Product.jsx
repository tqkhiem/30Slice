import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../app/redux/slices/user/CartSlice";
import { toastSuccess } from "../components/sharedComponents/toast";
// import { nonAccentConverter } from '../app/services/nonAccentConverter/nonAccentConverter';
import { ShoppingBag, ShoppingCart } from "react-feather";
function Product(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addToCart = (item) => {
    const product = {
      _id: item._id,
      Name: item.Name,
      Price: (item.Price * (100 - item.Discount)) / 100,
      Images: item.Images,
      Quantity: 1,
    };
    toastSuccess("Thêm vào giỏ hàng thành công!");
    dispatch(addProduct(product));
  };
  const buyNow = (item) => {
    const product = {
      _id: item._id,
      Name: item.Name,
      Price: (item.Price * (100 - item.Discount)) / 100,
      Images: item.Images,
      Quantity: 1,
    };
    navigate("/cart");
    // toastSuccess('Thêm vào giỏ hàng thành công!');
    dispatch(addProduct(product));
  };
  let Rating = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= props.prod.Rating) {
      Rating.push(
        <span
          key={props.prod._id + "Rating" + i}
          className="star-icon las la-star active"
        />
      );
    } else {
      Rating.push(
        <span
          key={props.prod._id + "Rating" + i}
          className="star-icon las la-star"
        />
      );
    }
  }

  return (
    <div className="cus-xl-3 col-lg-4 col-md-6 col-12 mb-30 px-10">
      <div className="card product product--grid h-100">
        <div className="h-100">
          <div className="product-item">
            <div className="product-item__image">
              {/* <span className="like-icon">
                <button type="button" className="content-center">
                  <i className="lar la-heart icon" />
                </button>
              </span> */}
              <NavLink
                to={`/products/${props.prod.Name.replace(/ /g, "-")}`}
                state={{ product: props.prod._id }}
              >
                <img
                  className="card-img-top img-fluid"
                  src={props.prod.Images[0]}
                  alt="digital-chair"
                  style={{
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  }}
                />
              </NavLink>
            </div>
            <div className="card-body px-20 pb-25 pt-20">
              <div className="product-item__body text-capitalize">
                <NavLink
                  to={`/products/${props.prod.Name.replace(/ /g, "-")}`}
                  state={{ product: props.prod._id }}
                >
                  <h6 className="card-title">
                    {props.prod.Name.substring(0, 40)}...
                  </h6>
                </NavLink>
                <div className="d-flex align-items-center mb-10 flex-wrap">
                  <span className="product-desc-price">
                    {(
                      props.prod.Price *
                      (1 - props.prod.Discount / 100)
                    ).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                  {props.prod.Discount > 0 && (
                    <div className="d-flex align-items-center">
                      <span className="product-discount px-2">
                        Giảm {props.prod.Discount}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="product-item__footer">
                <div className="stars-rating d-flex align-items-center flex-wrap">
                  {/* {Rating}
                  <span className="stars-rating__point">
                    {' '}
                    {props.prod.Rating}{' '}
                  </span> */}
                  <span className="stars-rating__review">
                    Đã bán <span>{props.prod.Saled}</span>
                  </span>
                </div>
              </div>
              {props?.prod?.InStock === 0 ? (
                <div className="product-item__button d-flex mt-20 flex-wrap">
                  <button className="btn btn-default btn-squared btn-outline-light disabled">
                    <ShoppingCart />
                    Hết hàng
                  </button>
                  <button className="btn btn-primary btn-default btn-squared border-0  disabled">
                    <ShoppingBag />
                    Hết hàng
                  </button>
                </div>
              ) : (
                <div className="product-item__button d-flex mt-20 flex-wrap">
                  <button
                    onClick={() => addToCart(props.prod)}
                    className="btn btn-default btn-squared btn-outline-light "
                  >
                    <ShoppingCart />
                    Thêm vào giỏ
                  </button>
                  <button
                    onClick={() => buyNow(props.prod)}
                    className="btn btn-primary btn-default btn-squared border-0 "
                  >
                    <ShoppingBag />
                    Mua
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Product;
