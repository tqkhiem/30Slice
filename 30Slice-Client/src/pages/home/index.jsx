import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductsHome } from "../../app/services/user/product.service";
import Product from "../../components/Product";
function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchProducts = async () => {
    const res = await getProductsHome();
    setProducts(res);
    setLoading(false);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="container-fluid m-0 p-0">
        <div className="image-home">
          <Link to="/booking" className="offset">
            Đặt lịch
          </Link>
          <img
            src="/assets/images/dsc01875-8577.jpg"
            alt=""
            width="100%"
            height="100%"
          />
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
          <div className="container-fluid w-80 pt-3">
            <h1>Sản phẩm mới nhất</h1>
            <div className="row product-page-list justify-content-center">
              {products?.productsNew?.map((product) => (
                <Product prod={product} key={product._id} />
              ))}
            </div>
            <h1>Sản phẩm nổi bật</h1>
            <div className="row product-page-list justify-content-center">
            {products?.productHot?.map((product) => (
                <Product prod={product} key={product._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Home;
