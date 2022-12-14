import { useEffect, useState, useRef } from "react";
import Notiflix from "notiflix";

import Breadcrumb from "../../components/Breakcumb";
import Product from "../../components/Product";
import Filters from "../../components/Filters";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Search } from "react-feather";
function Products(props) {
  const [dataProduct, setdataProduct] = useState({});
  const [listProduct, setListProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const _isMounted = useRef(false);
  const refSearch = useRef("");
  const navigate = useNavigate();

  const [param] = useSearchParams();
  const pageNumber = new URLSearchParams(location.search).get("page") || 1;
  const search = param.get("search") || "";

  let listPage = [];
  for (let i = 1; i <= dataProduct.totalPage; i++) {
    listPage.push(
      <Link
        to={"?page=" + i + "&search=" + search}
        key={"toPage" + i}
        className={`atbd-pagination__link ${pageNumber == i ? "active" : ""}`}
      >
        <span className="page-number">{i}</span>
      </Link>
    );
  }
  const fetchProduct = async () => {
    setLoading(true);
    const res = await fetch(
      import.meta.env.REACT_APP_API_ENDPOINT +
        `product/getProducts?page=${pageNumber}&limit=12&search=${search}`
    );
    const data = await res.json();
    // console.log(data);
    if (data) {
      setLoading(false);
    }
    _isMounted.current && setdataProduct(data);
    _isMounted.current && setListProduct(data.products);
  };
  useEffect(() => {
    _isMounted.current = true;
    return () => {
      _isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    fetchProduct();
  }, [pageNumber, search]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="shop-breadcrumb">
              <div className="breadcrumb-main">
                <h4 className="text-capitalize breadcrumb-title">
                  Tất cả sản phẩm
                </h4>
              </div>
              <Breadcrumb />
            </div>
          </div>
        </div>
      </div>
      <div className="products_page product_page--grid mb-30">
        <div className="container-fluid">
          <div className="w-100 gt-3 row justify-content-center">
            {/* <div className="columns-1 col-lg-4 col-md-5 col-sm-8 order-md-0 order-1">
              <Filters />
              
            </div> */}
            {/* End: .columns-1 */}
            <div className="columns-2 col-lg-8 col-md-8 col-sm-8 order-md-1 order-0">
              {/* Start: Top Bar */}
              <div className="shop_products_top_filter">
                <div className="project-top-wrapper d-flex flex-wrap align-items-center">
                  <div className="project-top-left d-flex flex-wrap align-items-center">
                    <div className="project-search shop-search  global-shadow ">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          navigate(`?search=${refSearch.current.value}`);
                        }}
                        className="d-flex align-items-center user-member__form"
                      >
                        <Search />
                        <input
                          className="form-control mr-sm-2 border-0 box-shadow-none"
                          type="search"
                          placeholder="Tìm kiếm"
                          aria-label="Search"
                          ref={refSearch}
                        />
                      </form>
                    </div>
                    <span className="project-result-showing fs-14 color-gray ml-xl-25 mr-xl-0 text-center mt-lg-0 mt-20">
                      Hiển thị
                      <span>
                        {" "}
                        {(pageNumber - 1) * 12 + 1}-
                        {dataProduct?.totalItem > pageNumber * 12
                          ? pageNumber * 12
                          : dataProduct?.totalItem}
                      </span>{" "}
                      trong <span>{dataProduct.totalItem} </span>
                      kết quả
                    </span>
                  </div>
                  <div className="project-top-right d-flex flex-wrap align-items-center">
                    <div className="project-category flex-wrap d-flex align-items-center">
                      <p className="fs-14 color-gray text-capitalize">
                        Xếp theo:
                      </p>
                      <div className="project-tap b-light">
                        <ul className="nav px-1 " id="ap-tab" role="tablist">
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              id="ap-overview-tab"
                              data-toggle="pill"
                              href="#ap-overview"
                              role="tab"
                              aria-controls="ap-overview"
                              aria-selected="true"
                            >
                              Mới nhất
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              id="timeline-tab"
                              data-toggle="pill"
                              href="#timeline"
                              role="tab"
                              aria-controls="timeline"
                              aria-selected="false"
                            >
                              Xem nhiều
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              id="activity-tab"
                              data-toggle="pill"
                              href="#activity"
                              role="tab"
                              aria-controls="activity"
                              aria-selected="false"
                            >
                              Giá
                            </a>
                          </li>
                          {/* <li className="nav-item">
                            <a
                              className="nav-link"
                              id="draft-tab"
                              data-toggle="pill"
                              href="#draft"
                              role="tab"
                              aria-controls="draft"
                              aria-selected="false"
                            >
                              Đánh giá
                            </a>
                          </li> */}
                        </ul>
                      </div>
                    </div>
                    <div className="project-icon-selected content-center mt-lg-0 mt-25">
                      <div className="listing-social-link pb-lg-0 pb-xs-2">
                        <div className="icon-list-social d-flex">
                          <a
                            className="icon-list-social__link rounded-circle icon-list-social__style justify-content-center active ml-xl-20 mr-20"
                            href="#"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-grid"
                            >
                              <rect x={3} y={3} width={7} height={7} />
                              <rect x={14} y={3} width={7} height={7} />
                              <rect x={14} y={14} width={7} height={7} />
                              <rect x={3} y={14} width={7} height={7} />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End: Top Bar */}
              {/* Start: .product-list */}

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
                <div className="tab-content mt-25" id="ap-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="ap-overview"
                    role="tabpanel"
                    aria-labelledby="ap-overview-tab"
                  >
                    {/* Start: Shop Item */}
                    <div className="row product-page-list justify-content-center">
                      {listProduct &&
                        listProduct.map((item) => {
                          return <Product prod={item} key={item._id} />;
                        })}
                    </div>
                    {/* End: Shop Item */}
                  </div>
                  <div
                    className="tab-pane fade"
                    id="timeline"
                    role="tabpanel"
                    aria-labelledby="timeline-tab"
                  >
                    <div className="row product-page-list">
                      {listProduct &&
                        listProduct
                          .sort((a, b) => b.Views - a.Views)
                          .map((item) => {
                            return <Product prod={item} key={item._id} />;
                          })}
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="activity"
                    role="tabpanel"
                    aria-labelledby="activity-tab"
                  >
                    <div className="row product-page-list">
                      {listProduct &&
                        listProduct
                          .sort(
                            (a, b) =>
                              (b.Price * (100 - b.Discount)) / 100 -
                              (a.Price * (100 - a.Discount)) / 100
                          )
                          .map((item) => {
                            return <Product prod={item} key={item._id} />;
                          })}
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="draft"
                    role="tabpanel"
                    aria-labelledby="draft-tab"
                  >
                    <div className="row product-page-list">
                      {listProduct &&
                        listProduct
                          .sort((a, b) => b.Rating - a.Rating)
                          .map((item) => {
                            return <Product prod={item} key={item._id} />;
                          })}
                    </div>
                  </div>
                </div>
              )}
              <nav className="atbd-page ">
                <ul className="atbd-pagination d-flex">
                  <li className="atbd-pagination__item">
                    <a
                      href="#"
                      className="atbd-pagination__link pagination-control"
                    >
                      <span className="la la-angle-left" />
                    </a>

                    {listPage}

                    <a
                      href="#"
                      className="atbd-pagination__link pagination-control"
                    >
                      <span className="la la-angle-right" />
                    </a>
                    <a href="#" className="atbd-pagination__option"></a>
                  </li>
                </ul>
              </nav>

              {/* End: .product-list */}
            </div>
            {/* End: .columns-2 */}
          </div>
        </div>
      </div>
      {/* End: .products */}
    </>
  );
}
export default Products;
