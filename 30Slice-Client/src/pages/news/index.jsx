import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllNews } from "../../app/services/user/news.service";
import "./news.css";
import Breadcrumb from "../../components/Breakcumb";
export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchNews = async () => {
    setLoading(true);
    const res = await getAllNews();
    console.log(res.data);
    if (res.status === 200) {
      setNews(res.data);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="shop-breadcrumb">
              <div className="breadcrumb-main">
                <h4 className="text-capitalize breadcrumb-title">
                  Tất cả tin tức
                </h4>
              </div>
            </div>
            <Breadcrumb />
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
        // layout ở đây
        <div className="container-fluid w-80 pt-3">
          <div className="row product-page-list justify-content-center">
            {news &&
              news.map((item) => (
                <div key={item?._id} className="news">
                  <Link
                    to={"/news/" + item?.Title.replace(/ /g, "-")}
                    state={{ id: item?._id }}
                  >
                    <img src={item?.image} className="card-img-top" alt="" />
                  </Link>
                  <div className="card-body">
                    <Link
                      to={"/news/" + item?.Title.replace(/ /g, "-")}
                      state={{ id: item?._id }}
                    >
                      <h5 className="card-title">{item?.Title}</h5>
                    </Link>
                    <p className="card-text">{item?.Desc}</p>
                    <button href="#" className="btn btn-primary">
                      <Link
                        to={"/news/" + item?.Title.replace(/ /g, "-")}
                        state={{ id: item?._id }}
                        className="offset"
                      >
                        Chi tiết
                      </Link>
                    </button>
                  </div>
                </div>
              ))}
          </div>
          {/* phan trang */}
          <div className="d-flex justify-content-end pt-30">
            <nav className="atbd-page ">
              <ul className="atbd-pagination d-flex">
                <li className="atbd-pagination__item">
                  <a
                    href="#"
                    className="atbd-pagination__link pagination-control"
                  >
                    <span className="la la-angle-left" />
                  </a>
                  <a href="#" className="atbd-pagination__link">
                    <span className="page-number">1</span>
                  </a>
                  <a href="#" className="atbd-pagination__link active">
                    <span className="page-number">2</span>
                  </a>
                  <a href="#" className="atbd-pagination__link">
                    <span className="page-number">3</span>
                  </a>
                  <a
                    href="#"
                    className="atbd-pagination__link pagination-control"
                  >
                    <span className="page-number">...</span>
                  </a>
                  <a href="#" className="atbd-pagination__link">
                    <span className="page-number">12</span>
                  </a>
                  <a
                    href="#"
                    className="atbd-pagination__link pagination-control"
                  >
                    <span className="la la-angle-right" />
                  </a>
                  <a href="#" className="atbd-pagination__option"></a>
                </li>
                <li className="atbd-pagination__item">
                  <div className="paging-option">
                    <select name="page-number" className="page-selection">
                      <option value={20}>20/page</option>
                      <option value={40}>40/page</option>
                      <option value={60}>60/page</option>
                    </select>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
