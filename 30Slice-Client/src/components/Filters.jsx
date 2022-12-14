import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Filters = () => {
  const [listCate, setCate] = useState([]);

  const fetchCate = async () => {
    const res = await fetch(
      import.meta.env.REACT_APP_API_ENDPOINT + "category/getAllCategories"
    );
    const data = await res.json();

    setCate(data);
  };

  useEffect(() => {
    fetchCate();
  }, []);

  return (
    <div className="widget">
      <div className="widget-header-title px-20 py-15 border-bottom">
        <h6 className="d-flex align-content-center fw-500">
          <span data-feather="sliders" /> Bộ Lọc
        </h6>
      </div>
      <div className="category_sidebar">
        {/* End: Aside */}

        {/* Start: Aside */}
        <aside className="product-sidebar-widget mb-30">
          {/* Title */}
          <div className="widget_title mb-20">
            <h6>Loại sản phẩm (số bên phải lấy tạm ordinal)</h6>
          </div>
          {/* Title */}
          {/* Body */}
          <div className="card border-0">
            <div className="product-brands">
              <ul>
                {listCate.map((item, index) => (
                  <li key={item._id}>
                    <Link to={/category/ + item.Name.replace(/ /g, '-')} state={{category: item._id}}>
                      <div className="checkbox-theme-default custom-checkbox ">
                        <input
                          className="checkbox"
                          type="checkbox"
                          id={`check-${item._id}`}
                        />
                        <label htmlFor={`check-${item._id}`}>
                          <span className="checkbox-text">
                            {item.Name}
                            <span className="item-numbers">{item.Ordinal}</span>
                          </span>
                        </label>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-2">
                <a href="#" className=" fs-13 fw-500 text-capitalize">
                  Xem thêm
                </a>
              </div>
            </div>
          </div>
          {/* Body */}
        </aside>
        {/* End: Aside */}
        {/* Start: Aside */}
        <aside className="product-sidebar-widget mb-30">
          {/* Title */}
          <div className="widget_title mb-20">
            <h6>Đánh giá</h6>
          </div>
          {/* Title */}
          {/* Body */}
          <div className="card border-0">
            <div className="product-ratings">
              <ul>
                <li>
                  <div className="checkbox-theme-default custom-checkbox ">
                    <input className="checkbox" type="checkbox" id="rating-1" />
                    <label htmlFor="rating-1">
                      <span className="stars-rating d-flex align-items-center">
                        <span className="star-icon las la-star active" />
                        <span className="star-icon las la-star active" />
                        <span className="star-icon las la-star active" />
                        <span className="star-icon las la-star active" />
                        <span className="star-icon las la-star active" />
                        <span className="checkbox-text">
                          trở lên
                          <span className="item-numbers">42</span>
                        </span>
                      </span>
                    </label>
                  </div>
                </li>
                <li>
                  <div className="checkbox-theme-default custom-checkbox ">
                    <input className="checkbox" type="checkbox" id="rating-3" />
                    <label htmlFor="rating-3">
                      <span className="stars-rating d-flex align-items-center">
                        <span className="star-icon las la-star active" />
                        <span className="star-icon las la-star active" />
                        <span className="star-icon las la-star active" />
                        <span className="star-icon las la-star active" />
                        <span className="star-icon las la-star inactive" />
                        <span className="checkbox-text">
                          trở lên
                          <span className="item-numbers">54</span>
                        </span>
                      </span>
                    </label>
                  </div>
                </li>
                <li>
                  <div className="checkbox-theme-default custom-checkbox ">
                    <input className="checkbox" type="checkbox" id="rating-4" />
                    <label htmlFor="rating-4">
                      <span className="stars-rating d-flex align-items-center">
                        <span className="star-icon las la-star active" />
                        <span className="star-icon las la-star active" />
                        <span className="star-icon las la-star active" />
                        <span className="star-icon las la-star inactive" />
                        <span className="star-icon las la-star inactive" />
                        <span className="checkbox-text">
                          trở lên
                          <span className="item-numbers">78</span>
                        </span>
                      </span>
                    </label>
                  </div>
                </li>
                <li>
                  <div className="checkbox-theme-default custom-checkbox ">
                    <input className="checkbox" type="checkbox" id="rating-5" />
                    <label htmlFor="rating-5">
                      <span className="stars-rating d-flex align-items-center">
                        <span className="star-icon las la-star active" />
                        <span className="star-icon las la-star active" />
                        <span className="star-icon las la-star inactive" />
                        <span className="star-icon las la-star inactive" />
                        <span className="star-icon las la-star inactive" />
                        <span className="checkbox-text">
                          trở lên
                          <span className="item-numbers">42</span>
                        </span>
                      </span>
                    </label>
                  </div>
                </li>
                <li>
                  <div className="checkbox-theme-default custom-checkbox ">
                    <input className="checkbox" type="checkbox" id="rating-6" />
                    <label htmlFor="rating-6">
                      <span className="stars-rating d-flex align-items-center">
                        <span className="star-icon las la-star active" />
                        <span className="star-icon las la-star inactive" />
                        <span className="star-icon las la-star inactive" />
                        <span className="star-icon las la-star inactive" />
                        <span className="star-icon las la-star inactive" />
                        <span className="checkbox-text">
                          trở lên
                          <span className="item-numbers">35</span>
                        </span>
                      </span>
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* Body */}
        </aside>
        {/* End: Aside */}
      </div>
    </div>
  );
};
export default Filters;
