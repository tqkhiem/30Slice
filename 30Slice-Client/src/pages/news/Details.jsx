import { Link, useLocation } from "react-router-dom";
import Breadcrumb from "../../components/Breakcumb";
import { getNewsById } from "../../app/services/user/news.service";
import { useEffect, useState } from "react";
export default function Details() {
  const location = useLocation();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchNews = async () => {
    const res = await getNewsById(location.state.id);
    console.log(res.data);
    if (res.status === 200) {
      setNews(res.data);
      setLoading(false);
    }
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
                  Chi tiết tin tức
                </h4>
              </div>
              <Breadcrumb BreadName={news?.Title} />
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
        <div className="products mb-20">
        <div className="container-fluid w-80">
          {/* Start: Card */}
          <div className="card product-details h-100">
            {/* <div className="product-item d-flex p-sm-40 p-20"> */}
              <div className="card-body">
                <h1 className="card-title">{news?.Title}</h1>
                <p>
                  {" "}
                  Tác giả: <b>{news?.Create_By?.Full_Name} </b> Lượt xem :{" "}
                  <b> {news?.Views}</b>
                </p>
                <img
                  src={news?.image}
                    width="30%"
                  alt=""
                />
                <p className="card-text" dangerouslySetInnerHTML={{ __html: news?.Content }}></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
