import { useLocation, NavLink } from 'react-router-dom';

const defaultBreadcrumb = [
  {
    title: 'Trang chủ',
    link: '',
  },
  {
    title: 'Sản phẩm',
    link: 'products',
  },
  {
    title: 'Loại sản phẩm',
    link: 'category',
  },
  {
    title: 'Giỏ hàng',
    link: 'cart',
  },
  {
    title: 'Lịch sử đơn hàng',
    link: 'order',
  },
  {
    title: 'Lịch sử đặt lịch',
    link: 'booked-history',
  },
  {
    title: 'Tin tức',
    link: 'news',
  },
  {
    title: 'Combo',
    link: 'combo',
  },
  {
    title: 'Đội ngũ coder',
    link: 'crew',
  }
];


function Breadcrumb(props) {
  const location = useLocation();
  let path = location.pathname.split("/").slice(1);
  let brc = path.map((item, index, row) => {
    let link = path.slice(0, index + 1).join("/");
    if (index + 1 === row.length) {
      if(row.length !== 1) {
        return (
          <li className="atbd-breadcrumb__item" key={index}>
            {" "}
            {/* {item}{" "} */}
            {props.BreadName}
          </li>
        );
      } else {
        return (
          <li className="atbd-breadcrumb__item" key={index}>
            {" "}{defaultBreadcrumb.find((i) => i.link === link).title}{" "}
          </li>
        );
      }
    } else {
      return (
        <li className="atbd-breadcrumb__item" key={index}>
          <NavLink to={`/${link}`}>
            {defaultBreadcrumb.find((i) => i.link === link).title}
          </NavLink>
          <span className="breadcrumb__seperator">
            <span className="la la-angle-right" />
          </span>
        </li>
      );
    }
  });
  return (
    <div className="card card-default card-md mb-4">
      <div className="card-body">
        <ul className="atbd-breadcrumb nav">
          <li className="atbd-breadcrumb__item">
            <NavLink to="/"> Trang chủ </NavLink>
            <span className="breadcrumb__seperator">
              <span className="la la-angle-right" />
            </span>
          </li>
          {brc}
        </ul>
      </div>
    </div>
  );
}
export default Breadcrumb;