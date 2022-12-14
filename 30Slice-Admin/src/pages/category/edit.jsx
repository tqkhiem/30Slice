import { useParams, Link } from "react-router-dom";
import {
  toastSuccess,
  toastError,
} from "../../components/sharedComponents/toast";
import { useForm } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import SwitchIOS from "../../CustomMui/switch";

import {
  getParentCategory,
  getOneCategory,
  UpdateCategory,
} from "../../app/services/admin/category.service";

const EditCategory = () => {
  const params = useParams();
  const id = params.id;
  const [category, setCategory] = useState({});
  const [parentCategory, setParentCategory] = useState([]);
  const _isMounted = useRef(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState();
  const refName = useRef("");
  const refOrdinal = useRef();
  const refParent = useRef();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { Is_Show: category.Is_Show } });

  const onSubmit1 = (data) => {
    console.log(data);
  };

  useEffect(() => {
    _isMounted.current = true;
    return () => {
      _isMounted.current = false;
    };
  });
  const loadCategory = async () => {
    _isMounted.current && setLoading(true);
    // const data = await getOneCategory(id);
    // const dataParent = await getParentCategory();
    const getOneCategoryPromise = getOneCategory(id);
    const getParentCategoryPromise = getParentCategory();
    const [data, dataParent] = await Promise.all([
      getOneCategoryPromise,
      getParentCategoryPromise,
    ]);
    _isMounted.current && setSelected(data.Is_Show);
    _isMounted.current && setCategory(data);
    _isMounted.current && setParentCategory(dataParent);
    _isMounted.current && setLoading(false);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    // console.log(data);
    const req = {
      _id: data._id,
      Name: data.Name,
      Ordinal: parseInt(data.Ordinal),
      Is_Show: data.Is_Show,
      Parent_Id: data.ParentCategory === "0" ? null : data.ParentCategory,
    };

    const res = await UpdateCategory(req);
    if (res.status === 201) {
      toastSuccess(res.data.message);
    } else {
      toastError(res.data.message);
    }
    setLoading(false);
    _isMounted && loadCategory();
    console.log(res);
  };

  useEffect(() => {
    loadCategory().then(() => {
      reset(category, parentCategory);
    });
  }, [id]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="shop-breadcrumb">
              <div className="breadcrumb-main">
                <h4 className="text-capitalize breadcrumb-title">
                  Sửa Loại Sản Phẩm
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
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
            <div className="col-lg-12">
              {/* Start: product page */}
              <div className="global-shadow border px-sm-30 py-sm-50 px-0 py-20 bg-white radius-xl w-100 mb-40">
                <div className="row justify-content-center">
                  <div className="col-xl-7 col-lg-10">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mx-sm-30 mx-20 ">
                        {/* Start: card */}
                        <div className="card add-product p-sm-30 p-20 mb-30">
                          <div className="card-body p-0">
                            <div className="card-header">
                              <h6 className="fw-500">
                                Thông tin loại sản phẩm
                              </h6>
                            </div>
                            {/* Start: card body */}
                            <div className="add-product__body px-sm-40 px-20">
                              {/* Start: form */}

                              {/* form group */}
                              <div className="form-group">
                                <label htmlFor="id">ID</label>
                                <input
                                  id="id"
                                  readOnly
                                  type="text"
                                  className="form-control"
                                  defaultValue={category._id}
                                  {...register("_id")}
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="name">Tên Loại</label>
                                <input
                                  type="text"
                                  id={"name"}
                                  defaultValue={category.Name}
                                  className="form-control"
                                  {...register("Name")}
                                />
                              </div>

                              <div className="form-group">
                                <label htmlFor="Is_Show1" className="mb-15">
                                  Hiện
                                </label>
                                <span className="MuiSwitch-root MuiSwitch-sizeMedium css-1r4r6iz-MuiSwitch-root">
                                  <span
                                    className={` ${
                                      selected && "Mui-checked"
                                    } MuiButtonBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary PrivateSwitchBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase`}
                                  >
                                    <input
                                      onClick={() => {
                                        setSelected(!selected);
                                      }}
                                      className="PrivateSwitchBase-input MuiSwitch-input css-1m9pwf3"
                                      type="checkbox"
                                      name="Is_Show"
                                      defaultChecked={category.Is_Show}
                                      {...register("Is_Show")}
                                    />
                                    <span className="MuiSwitch-thumb css-jsexje-MuiSwitch-thumb" />
                                  </span>
                                  <span className="MuiSwitch-track css-1yjjitx-MuiSwitch-track" />
                                  <p style={{ display: "none" }}>
                                    <SwitchIOS />
                                  </p>
                                </span>
                              </div>

                              <div className="form-group">
                                <label htmlFor="name8">Thứ tự</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  id="name8"
                                  placeholder="Số thứ tự"
                                  defaultValue={category?.Ordinal}
                                  {...register("Ordinal")}
                                />
                              </div>
                              <div className="form-group">
                                <div className="countryOption">
                                  <label htmlFor="countryOption">Con ?</label>
                                  <select
                                    id="countryOption"
                                    className="js-example-basic-single js-states form-control"
                                    defaultValue={category.Parent_Id}
                                    {...register("ParentCategory")}
                                  >
                                    <option value="0">Không</option>
                                    {parentCategory.map((item) => (
                                      <option key={item._id} value={item._id}>
                                        {item.Name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>

                              {/* End: form */}
                            </div>
                            {/* End: card body */}
                          </div>
                        </div>
                        {/* End: card */}
                        {/* Start: button group */}
                        <div className="button-group add-product-btn d-flex justify-content-end mt-40">
                          <Link to="/category">
                            <button className="btn btn-default btn-squared fw-400 text-capitalize">
                              Huỷ
                            </button>
                          </Link>
                          <button type="submit" className="btn btn-primary btn-default btn-squared text-capitalize">
                            Lưu
                          </button>
                        </div>
                        {/* End: button group */}
                      </div>
                    </form>
                  </div>
                  {/* ends: col-lg-8 */}
                </div>
              </div>
              {/* End: Product page */}
            </div>
          )}
          {/* ends: col-lg-12 */}
        </div>
      </div>
    </>
  );
};
export default EditCategory;
