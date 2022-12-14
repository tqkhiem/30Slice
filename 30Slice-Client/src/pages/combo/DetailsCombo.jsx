import { Link, useLocation } from "react-router-dom";
import Breadcrumb from "../../components/Breakcumb";
import { getComboById } from "../../app/services/user/combo.service";
import { useEffect, useState } from "react";
import './combo.css';

export default function DetailsCombo() {
  const location = useLocation();
  const [combo, setCombo] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchCombo = async () => {
    // setLoading(true);
    const res = await getComboById(location.state.id);
    console.log(res.data)
    if (res.status === 200) {
      setCombo(res.data);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchCombo();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="shop-breadcrumb">
              <div className="breadcrumb-main">
                <h4 className="text-capitalize breadcrumb-title">
                  Chi tiết Combo
                </h4>
              </div>
              <Breadcrumb BreadName={combo?.Name} />
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
                              <img
                                className="img-fluid d-flex bg-opacity-primary "
                                src={combo?.Image}
                                alt="First slide"
                              />
                            </div>
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
                              <p>{combo?.Name}</p>
                            </h2>
                          </div>
                          {/* End: Product Title */}

                          <div className="product-item__content text-capitalize">

                            {/* Start: Product Ratings */}
                            <div className="stars-rating d-flex align-items-center">                             
                              <span className="stars-rating__review">
                                <span>{combo?.Views}</span> Lượt xem
                              </span>
                            </div>
                            {/* End: Product Ratings */}

                            {/* Start: Product Brand */}
                            <span className="product-desc-price">
                              {combo &&
                                (
                                  combo?.Price *
                                  (1 - combo?.Discount / 100)
                                ).toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                            </span>
                            {combo?.Discount > 0 && (
                              <div className="d-flex align-items-center mb-2">
                                <span className="product-price">
                                  {combo?.Price.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                                </span>
                                <span className="product-discount">
                                  Giảm {combo?.Discount}%
                                </span>
                              </div>
                            )}
                            {/* End: Product Brand */}

                            {/* Start: Product Description */}
                            <p className=" product-deatils-pera">
                              Mô tả : <b> {combo?.Details}</b>
                            </p>
                            <p className=" product-deatils-pera">
                              {combo?.Name} gồm có : 
                              <b>
                                {combo &&
                                combo?.Arr_Products?.map((item) => {
                                  return (
                                    <div className="arr_combo">
                                      <p>- {item?.Name}</p>
                                    </div>
                                  );
                                })
                                }
                              </b>
                            </p>
                            {/* End: Product Description */}

                            {/* Start: Product Stock */}
                            <div className="product-details__availability">
                              <div className="title">
                                <p>Tình trạng:</p>
                                <span className="stock"> Còn hàng </span>
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
                                Còn lại {combo?.InStock} sản phẩm
                              </span>
                            </div>
                            {/* End: Product Quantity */}

                            {/* Start: Product Selections */}
                            <div className="product-item__button mt-lg-30 mt-sm-25 mt-20 d-flex flex-wrap">
                              <div className=" d-flex flex-wrap product-item__action align-items-center">
                                <button
                                  className="btn btn-primary btn-default btn-squared border-0 mr-10 my-sm-0 my-2"
                                >
                                  Mua ngay
                                </button>
                                <button
                                  className="btn btn-secondary btn-default btn-squared border-0 px-25 my-sm-0 my-2 mr-2"
                                >
                                  Thêm vào giỏ
                                </button>
                                <div className="like-icon">
                                  <button type="button">
                                    <i className="lar la-heart icon" />
                                  </button>
                                </div>
                              </div>
                            </div>
                            {/* End: Product Selections */}

                          </div>
                        </div>
                      </div>
                      
                      {/* End: Product Details */}
                    </div>
                  </div>
                </div>
              </div>
              {/* End: Card */}
            </div>
          </div>
        </>
      )}
    </>
  );
}
