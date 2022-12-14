import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breakcumb";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../app/redux/slices/user/CartSlice";
import { toastSuccess } from "../../components/sharedComponents/toast";
import { ShoppingBag, ShoppingCart } from "react-feather";
import {
  addComment,
  deleteCommentByAdmin,
  getCommentByProduct,
  updateComment,
} from "../../app/services/user/comment.service";
const socket = io("https://v2.30slice.online");
function Detail(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState([]);
  const [contentComment, setContentComment] = useState("");
  const [contentReply, setContentReply] = useState("");
  const [idCommentReply, setIdCommentReply] = useState("");
  const [idCommentUpdate, setIdCommentUpdate] = useState("");
  const [contentUpdate, setContentUpdate] = useState("");
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [isConnected, setIsConnected] = useState(socket.connected);
  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("comment", (data) => {
      fetchComment();
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("comment");
    };
  }, []);

  const fetchDetail = async () => {
    setLoading(true);
    const res = await fetch(
      import.meta.env.REACT_APP_API_ENDPOINT +
        "product/getOneProduct/" +
        location.state?.product
    );
    const data = await res.json();
    setProduct(data);
    setLoading(false);
  };

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
    dispatch(addProduct(product));
    navigate("/cart");
  };
  let Rating = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= product.Rating) {
      Rating.push(<span key={i} className="star-icon las la-star active" />);
    } else {
      Rating.push(<span key={i} className="star-icon las la-star" />);
    }
  }

  const dataTree = (data, _id = null, link = "Parent_Id") => {
    return data
      .filter((item) => item[link] === _id)
      .map((item) => ({ ...item, Children: dataTree(data, item._id) }));
  };

  const fetchComment = async () => {
    const res = await getCommentByProduct(location.state?.product);

    const treeData = dataTree(res.filter((item) => !item.Is_User_Delete));
    return setComment(treeData);
  };

  const handleAddComment = async () => {
    const data = {
      Id_Customter: user.id,
      Id_Product: product._id,
      Content: contentComment,
    };
    const res = await addComment(data);
    if (res.status === 200) {
      setContentComment("");
      // fetchComment();
      socket.emit("comment", "ok");
    }
  };

  const handleDeleteByAdmin = async (id) => {
    const data = { _id: id };
    const res = await deleteCommentByAdmin(data);
    if (res.status === 200) {
      // fetchComment();
      socket.emit("comment", res);
    }
  };

  const handleReplyComment = async () => {
    const data = {
      Id_Customter: user?.id,
      Id_Product: product._id,
      Content: contentReply,
      Parent_Id: idCommentReply,
    };
    const res = await addComment(data);
    if (res.status === 200) {
      setIdCommentReply("");
      setContentReply("");
      // fetchComment();
      socket.emit("comment", "ok");
    }
  };

  const handleDeleteComment = async (id) => {
    const data = {
      Is_User_Delete: true,
      _id: id,
    };
    const res = await updateComment(data);
    if (res.status === 200) {
      // fetchComment();
      socket.emit("comment", "ok");
    }
  };

  const handleUpdateComment = async () => {
    const data = {
      Content: contentUpdate,
      _id: idCommentUpdate,
    };
    const res = await updateComment(data);
    if (res.status === 200) {
      setIdCommentUpdate("");
      setContentUpdate("");
      // fetchComment();
      socket.emit("comment", "ok");
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchDetail();
      await fetchComment();
    };
    load();
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="shop-breadcrumb">
              <div className="breadcrumb-main">
                <h4 className="text-capitalize breadcrumb-title">
                  Chi tiết sản phẩm
                </h4>
              </div>
              <Breadcrumb BreadName={product.Name} />
            </div>
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
          <div className="products mb-20">
            <div className="container-fluid">
              {/* Start: Card */}
              <div className="card product-details h-100">
                <div className="product-item d-flex p-sm-40 p-20">
                  <div className="row">
                    <div className="col-lg-5">
                      {/* Start: Product Slider */}
                      <div className="product-item__image">
                        <div className="wrap-gallery-article">
                          <div
                            id="myCarouselArticle"
                            className="carousel slide carousel-fade"
                            data-ride="carousel"
                          >
                            <ol className="carousel-indicators">
                              <li
                                data-target="#myCarouselArticle"
                                data-slide-to={0}
                                className="active"
                              />
                              <li
                                data-target="#myCarouselArticle"
                                data-slide-to={1}
                              />
                              <li
                                data-target="#myCarouselArticle"
                                data-slide-to={2}
                              />
                              <li
                                data-target="#myCarouselArticle"
                                data-slide-to={3}
                              />
                              <li
                                data-target="#myCarouselArticle"
                                data-slide-to={4}
                              />
                              <li
                                data-target="#myCarouselArticle"
                                data-slide-to={5}
                              />
                              <li
                                data-target="#myCarouselArticle"
                                data-slide-to={6}
                              />
                            </ol>
                            <div className="carousel-inner" role="listbox">
                              {product.Images &&
                                product.Images.map((item, index) => {
                                  return (
                                    <div
                                      className={`carousel-item ${
                                        index === 0 ? "active" : ""
                                      }`}
                                      key={index}
                                    >
                                      <img
                                        className="img-fluid d-flex bg-opacity-primary "
                                        src={item}
                                        alt="First slide"
                                      />
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                          <div className="overflow-hidden " id="slider-thumbs">
                            {/* Bottom switcher of slider */}
                            <ul className="reset-ul d-flex flex-wrap list-thumb-gallery">
                              {product.Images &&
                                product.Images.map((item, index) => {
                                  return (
                                    <li key={index}>
                                      <a
                                        href="#"
                                        className="thumbnail"
                                        data-target="#myCarouselArticle"
                                        data-slide-to={index}
                                      >
                                        <img
                                          className="d-flex bg-opacity-primary"
                                          src={item}
                                          alt="First slide"
                                        />
                                      </a>
                                    </li>
                                  );
                                })}
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* End: Product Slider */}
                    </div>
                    <div className=" col-lg-7">
                      {/* Start: Product Details */}
                      <div className=" border-bottom mb-25 pb-sm-30 pb-15 mt-lg-0 mt-15">
                        <div className="product-item__body">
                          {/* Start: Product Title */}
                          <div className="product-item__title">
                            <h2 className="card-title fw-500">
                              <p>{product.Name}</p>
                            </h2>
                          </div>
                          {/* End: Product Title */}
                          <div className="product-item__content text-capitalize">
                            {/* Start: Product Ratings */}
                            <div className="stars-rating d-flex align-items-center">
                              {Rating}
                              <span className="stars-rating__point">
                                {product.Rating}
                              </span>
                              <span className="stars-rating__review">
                                <span>{product.Views}</span> Lượt xem
                              </span>
                            </div>
                            {/* End: Product Ratings */}
                            {/* Start: Product Brand */}

                            <span className="product-desc-price">
                              {product &&
                                (
                                  product.Price *
                                  (1 - product.Discount / 100)
                                ).toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                            </span>
                            {product.Discount > 0 && (
                              <div className="d-flex align-items-center mb-2">
                                <span className="product-price">
                                  {product.Price.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                                </span>
                                <span className="product-discount">
                                  Giảm {product.Discount}%
                                </span>
                              </div>
                            )}
                            {/* End: Product Brand */}
                            {/* Start: Product Description */}
                            <p className=" product-deatils-pera">
                              Mô tả : <b> {product.Details}</b>
                            </p>
                            <p className=" product-deatils-pera">
                              Chi tiết : <b> {product?.Describe}</b>
                            </p>
                            {/* End: Product Description */}
                            {/* Start: Product Stock */}
                            <div className="product-details__availability">
                              <div className="title">
                                <p>Tình trạng:</p>
                                {product.InStock > 0 ? (
                                  <span className="stock"> Còn hàng </span>
                                ) : (
                                  <span className="text-danger">
                                    {" "}
                                    Hết hàng{" "}
                                  </span>
                                )}
                              </div>
                              <div className="title">
                                <p>Phí vận chuyển:</p>
                                <span className="free"> Miễn phí</span>
                              </div>
                            </div>
                            {/* End: Product Stock */}
                            {/* Start: Product Quantity */}
                            <div className="quantity product-quantity flex-wrap">
                              <div className="mr-15 d-flex align-items-center flex-wrap">
                                <p className="fs-14 fw-500 color-dark">
                                  {" "}
                                  Số lượng:{" "}
                                </p>
                                <input
                                  type="button"
                                  defaultValue="-"
                                  className="qty-minus bttn bttn-left wh-36"
                                />
                                <input
                                  type="number"
                                  defaultValue={1}
                                  className="qty qh-36 input"
                                />
                                <input
                                  type="button"
                                  defaultValue="+"
                                  className="qty-plus bttn bttn-right wh-36"
                                />
                              </div>
                              <span className="fs-13 fw-400 color-light my-sm-0 my-10">
                                Còn lại {product?.InStock} sản phẩm
                              </span>
                            </div>
                            {/* End: Product Quantity */}
                            {/* Start: Product Selections */}
                            <div className="product-item__button mt-lg-30 mt-sm-25 mt-20 d-flex flex-wrap">
                              {product.InStock > 0 ? (
                                <div className=" d-flex flex-wrap product-item__action align-items-center">
                                  <button
                                    onClick={() => buyNow(product)}
                                    className="btn btn-primary btn-default btn-squared border-0 mr-10 my-sm-0 my-2"
                                  >
                                    <ShoppingBag />
                                    Mua ngay
                                  </button>
                                  <button
                                    onClick={() => addToCart(product)}
                                    className="btn btn-secondary btn-default btn-squared border-0 px-25 my-sm-0 my-2 mr-2"
                                  >
                                    <ShoppingCart />
                                    Thêm vào giỏ
                                  </button>
                                  <div className="like-icon">
                                    <button type="button">
                                      <i className="lar la-heart icon" />
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className=" d-flex flex-wrap product-item__action align-items-center">
                                  <button className="btn btn-primary btn-default btn-squared border-0 mr-10 my-sm-0 my-2 disabled">
                                    <ShoppingBag />
                                    Hết hàng
                                  </button>
                                  <button className="btn btn-secondary btn-default btn-squared border-0 px-25 my-sm-0 my-2 mr-2 disabled">
                                    <ShoppingCart />
                                    Hết hàng
                                  </button>
                                  <div className="like-icon">
                                    <button type="button">
                                      <i className="lar la-heart icon" />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                            {/* End: Product Selections */}
                          </div>
                        </div>
                      </div>
                      {/* Start: Product Availability */}
                      <div className="product-details__availability">
                        <div className="title">
                          <p>Đã bán:</p>
                          <span className="free">
                            {" "}
                            <strong>{product.Saled}</strong> sản phẩm{" "}
                          </span>
                        </div>
                        <div className="title">
                          <p>Danh mục:</p>
                          <span className="free">
                            {" "}
                            <Link
                              to={
                                "/category/" +
                                product?.Id_Categories?.Name.replace(/ /g, "-")
                              }
                              state={{
                                category: product?.Id_Categories?._id,
                              }}
                            >
                              {product?.Id_Categories?.Name}
                            </Link>{" "}
                          </span>
                        </div>
                      </div>
                      {/* End: Product Availability */}
                      {/* End: Product Details */}
                    </div>
                  </div>
                </div>
              </div>
              {/* End: Card */}
            </div>
          </div>
          <div className="products mb-30">
            <div className="container-fluid">
              <div className="card">
                <h3 className="p-3">Bình luận</h3>
                <hr className="m-0" />
                <div className="card-body">
                  {comment.length > 0 &&
                    comment.map((item) => (
                      <ul key={item?._id} className="comment-list__ul">
                        <li className="mt-4">
                          <div className="atbd-comment-box media">
                            <div className="atbd-comment-box__author">
                              <figure>
                                <img
                                  src={item?.Id_Customter?.Images}
                                  className="bg-opacity-primary d-flex"
                                  alt="Admin Autor"
                                />
                              </figure>
                            </div>
                            <div className="atbd-comment-box__content media-body">
                              <div className="comment-content-inner cci">
                                <span className="cci__author-info font-weight-bold">
                                  {item?.Id_Customter?.Full_Name}
                                  {item?.Id_Customter?.Role === "admin" && (
                                    <img
                                      src="/assets/images/tich-xanh.png"
                                      alt=""
                                      width={18}
                                      className="mx-1"
                                    />
                                  )}
                                </span>
                                <p className="cci__comment-text">
                                  {item.Content}
                                </p>

                                {isLoggedIn && (
                                  <div className="cci__comment-actions">
                                    <a
                                      href="javascript:void(0)"
                                      onClick={() => {
                                        setIdCommentReply(item._id);
                                        setIdCommentUpdate("");
                                      }}
                                      className="btn-reply"
                                    >
                                      <span className="text-primary">
                                        Trả lời
                                      </span>
                                    </a>
                                    {user?.role === "admin" && (
                                      <a
                                        href="javascript:void(0)"
                                        className="btn-reply"
                                        onClick={() =>
                                          handleDeleteByAdmin(item?._id)
                                        }
                                      >
                                        <span className="mx-2 text-danger">
                                          Gỡ
                                        </span>
                                      </a>
                                    )}
                                    {user?.id === item?.Id_Customter?._id && (
                                      <>
                                        <a
                                          href="javascript:void(0)"
                                          className="btn-reply"
                                          onClick={() => {
                                            setIdCommentUpdate(item?._id);
                                            setContentUpdate(item?.Content);
                                            setIdCommentReply("");
                                          }}
                                        >
                                          <span className="mx-2 text-primary">
                                            Sửa
                                          </span>
                                        </a>
                                        <a
                                          href="javascript:void(0)"
                                          className="btn-reply"
                                          onClick={() =>
                                            handleDeleteByAdmin(item?._id)
                                          }
                                        >
                                          {user?.role === "customer" && (
                                            <span className="mx-2 text-danger">
                                              Xoá
                                            </span>
                                          )}
                                        </a>
                                      </>
                                    )}
                                  </div>
                                )}

                                {idCommentReply.toString() ===
                                  item._id.toString() && (
                                  <div className="reply-editor media mt-3">
                                    <div className="reply-editor__author">
                                      <img
                                        src={item?.Id_Customter?.Images}
                                        className="bg-opacity-primary d-flex"
                                        alt="Reply Editor Author"
                                      />
                                    </div>
                                    {/* ends: .reply-editor__author */}
                                    <div className="reply-editor__form media-body">
                                      <div className="form-group row">
                                        <input
                                          className="form-control w-50 mx-20"
                                          type="text"
                                          value={contentReply}
                                          onChange={(e) =>
                                            setContentReply(e.target.value)
                                          }
                                        />
                                        <input
                                          type="button"
                                          className="btn btn-primary"
                                          value="Trả lời"
                                          onClick={handleReplyComment}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )}
                                {/* sưa */}
                                {idCommentUpdate.toString() ===
                                  item._id.toString() && (
                                  <div className="reply-editor media mt-3">
                                    {/* ends: .reply-editor__author */}
                                    <div className="reply-editor__form media-body">
                                      <div className="form-group row">
                                        <input
                                          className="form-control w-50 mx-20"
                                          type="text"
                                          value={contentUpdate}
                                          onChange={(e) =>
                                            setContentUpdate(e.target.value)
                                          }
                                        />
                                        <input
                                          type="button"
                                          className="btn btn-primary"
                                          value="Sửa"
                                          onClick={handleUpdateComment}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          {item.Children.length > 0 &&
                            item.Children.map((childItem) => (
                              <ul
                                key={childItem?._id}
                                className="comment-list__ul"
                              >
                                <li className="mb-20 mt-4">
                                  <div className="atbd-comment-box media">
                                    <div className="atbd-comment-box__author">
                                      <figure>
                                        <img
                                          src={childItem?.Id_Customter?.Images}
                                          className="bg-opacity-primary d-flex"
                                          alt="Admin Autor"
                                        />
                                      </figure>
                                    </div>
                                    <div className="atbd-comment-box__content media-body">
                                      <div className="comment-content-inner cci">
                                        <span className="cci__author-info font-weight-bold">
                                          {childItem?.Id_Customter?.Full_Name}
                                          {childItem?.Id_Customter?.Role ===
                                            "admin" && (
                                            <img
                                              src="/assets/images/tich-xanh.png"
                                              alt=""
                                              width={18}
                                              className="mx-1"
                                            />
                                          )}
                                        </span>

                                        <p className="cci__comment-text">
                                          {childItem.Content}
                                        </p>
                                        <div className="cci__comment-actions">
                                          {user?.id ===
                                            childItem?.Id_Customter?._id && (
                                            <>
                                              <a
                                                href="javascript:void(0)"
                                                className="btn-reply"
                                                onClick={() =>
                                                  handleDeleteByAdmin(
                                                    childItem?._id
                                                  )
                                                }
                                              >
                                                {user?.role === "customer" && (
                                                  <span className="mx-2 text-danger">
                                                    Xoá
                                                  </span>
                                                )}
                                              </a>

                                              <a
                                                href="javascript:void(0)"
                                                className="btn-reply"
                                                onClick={() => {
                                                  setIdCommentUpdate(
                                                    childItem?._id
                                                  );
                                                  setContentUpdate(
                                                    childItem?.Content
                                                  );
                                                  setIdCommentReply("");
                                                }}
                                              >
                                                <span className="mx-2 text-primary">
                                                  Sửa
                                                </span>
                                              </a>
                                            </>
                                          )}
                                          {user?.role === "admin" && (
                                            <a
                                              href="javascript:void(0)"
                                              className="btn-reply"
                                              onClick={() =>
                                                handleDeleteByAdmin(
                                                  childItem?._id
                                                )
                                              }
                                            >
                                              <span className="mx-2 text-danger">
                                                Gỡ
                                              </span>
                                            </a>
                                          )}
                                        </div>
                                        {/* sưa */}
                                        {idCommentUpdate.toString() ===
                                          childItem._id.toString() && (
                                          <div className="reply-editor media mt-3">
                                            {/* ends: .reply-editor__author */}
                                            <div className="reply-editor__form media-body">
                                              <div className="form-group row">
                                                <input
                                                  className="form-control w-50 mx-20"
                                                  type="text"
                                                  value={contentUpdate}
                                                  onChange={(e) =>
                                                    setContentUpdate(
                                                      e.target.value
                                                    )
                                                  }
                                                />
                                                <input
                                                  type="button"
                                                  className="btn btn-primary"
                                                  value="Sửa"
                                                  onClick={handleUpdateComment}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                      <div></div>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            ))}
                        </li>
                      </ul>
                    ))}
                  <hr className="m-3" />
                  {isLoggedIn ? (
                    <>
                      {" "}
                      <h5>Viết bình luận</h5>
                      <div className="reply-editor media mt-3">
                        <div className="reply-editor__author">
                          <img
                            src={user?.image}
                            className="bg-opacity-primary d-flex"
                            alt="Reply Editor Author"
                          />
                        </div>
                        {/* ends: .reply-editor__author */}
                        <div className="reply-editor__form media-body">
                          <div className="form-row">
                            <div className="form-group col-12">
                              <textarea
                                name="reply-text"
                                className="form-control mb-4"
                                value={contentComment}
                                onChange={(e) =>
                                  setContentComment(e.target.value)
                                }
                              />
                              <button
                                onClick={handleAddComment}
                                className="btn btn-primary btn-lg btn-squared btn-shadow-primary fw-400"
                              >
                                Bình luận
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <h5>Đăng nhập để bình luận</h5>
                    </>
                  )}

                  {/* ends: .reply-editor__form */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default Detail;
