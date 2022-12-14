import { useState } from "react";
import { addNews, getOneNews, updateNews } from "../../app/services/admin/news.service";
import { useRef } from "react";
import { uploadLoadFIle } from "../../app/services/upload";
import { useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  toastError,
  toastSuccess,
} from "../../components/sharedComponents/toast";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const EditNews = () => {
  const location = useLocation();
  const idNew = location.pathname.split("/")[2];
  const navigate = useNavigate()
  const [news,setNews] = useState([])
  const file = useRef();
  const { id } = useSelector((state) => state.auth.user);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mode: "onChange",
      news: {
        Title: "",
        Desc: "",
      },
    },
  });
  const storage = getStorage();

  const editorRef = useRef(null);

  const onSubmit = async (obj) => {
    const {news} = obj
    let data = [];
    if(file.current.files[0]){
        const urlImg = await uploadLoadFIle(file.current.files[0]);
        data = {
            ...news,
            image: urlImg,
            Create_By: id,
            Content: editorRef.current.getContent(),
            _id : idNew
          };
    }else{
        data = {
            ...news,
            Create_By: id,
            Content: editorRef.current.getContent(),
            _id : idNew
          };
    }
     
    const res = await updateNews(data);
    if (res.status === 200) {
      toastSuccess("Sữa tin tức thành công!");
      navigate('/news')
      return;
    }
    toastError("Đã xuất hiện lỗi xin thử lại sau!");
  };

  const fetchNew = async (id) => {
    const data = await getOneNews(id);
    return setNews(data);
  };

  useEffect(()=>{
    fetchNew(idNew);
  },[idNew])

  useEffect(() => {
    let _isMounted = true;
    const { Title, Desc } = news;
    _isMounted &&
      setValue("news", {
        Title: Title,
        Desc: Desc,
      });
    return () => {
      _isMounted = false;
    };
  }, [news]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="shop-breadcrumb">
              <div className="breadcrumb-main">
                <h4 className="text-capitalize breadcrumb-title">
                  Sửa tin tức
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            {/* Start: product page */}
            <div className="global-shadow border px-sm-30 py-sm-50 px-0 py-20 bg-white radius-xl w-100 mb-40">
              <div className="row justify-content-center">
                <div className="col-xl-12 col-lg-10">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mx-sm-30 mx-20 ">
                      {/* Start: card */}
                      <div className="card add-product p-sm-30 p-20 mb-30">
                        <div className="card-body p-0">
                          {/* Start: card body */}
                          <div className="add-product__body px-sm-40 px-20">
                            {/* Start: form */}

                            {/* form group */}
                            <div className="form-group mb-20">
                              <label
                                htmlFor="title-news"
                                className="fs-14 color-light strikethrough"
                              >
                                Tiêu đề tin tức
                              </label>
                              <textarea
                                className={
                                  !!errors?.news?.Title
                                    ? "is-invalid form-control"
                                    : "form-control"
                                }
                                id="title-news"
                                rows={2}
                                {...register("news.Title", { required: true })}
                              />
                            </div>
                            <div className="form-group mb-20">
                              <label
                                htmlFor="desc-news"
                                className="fs-14 color-light strikethrough"
                              >
                                Mô tả
                              </label>
                              <textarea
                                className={
                                  !!errors?.news?.Desc
                                    ? "is-invalid form-control"
                                    : "form-control"
                                }
                                id="desc-news"
                                rows={3}
                                {...register("news.Desc", { required: true })}
                              />
                            </div>
                            <div className="form-group mb-20">
                              <label
                                htmlFor="img-news"
                                className="fs-14 color-light strikethrough"
                              >
                                Hình ảnh
                              </label>

                              <input
                                ref={file}
                                className="form-control"
                                type="file"
                                id="formFile"
                              />
                            </div>
                            <div className="form-group mb-20">
                              <label className="fs-14 color-light strikethrough">
                                Nội dung
                              </label>
                              <div className="form-group"></div>
                              <Editor
                                onInit={(evt, editor) =>
                                  (editorRef.current = editor)
                                }
                                initialValue={news?.Content}
                                apiKey="xe96hx4boxd7pim8uqurpol71245lpwc1u17k20kly9szpy8"
                                init={{
                                  height: 600,
                                  menubar: true,
                                  config: {},

                                  plugins: `advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount`,
                                  toolbar: `undo redo| link code image | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help`,
                                  image_title: true,
                                  automatic_uploads: true,
                                  file_picker_types: "image",
                                  file_picker_callback: function (
                                    cb,
                                    value,
                                    meta
                                  ) {
                                    var input = document.createElement("input");
                                    input.setAttribute("type", "file");
                                    input.setAttribute("accept", "image/*");

                                    input.onchange = function () {
                                      var file = this.files[0];
                                      var reader = new FileReader();
                                      reader.onload = function () {
                                        var id =
                                          "blobid" + new Date().getTime();
                                        const storageRef = ref(
                                          storage,
                                          `images/${id}-${file.name}`
                                        );
                                        var blobCache =
                                          window.tinymce.activeEditor
                                            .editorUpload.blobCache;
                                        var base64 =
                                          reader.result.split(",")[1];

                                        var blobInfo = blobCache.create(
                                          id,
                                          file,
                                          base64
                                        );
                                        blobCache.add(blobInfo);

                                        const uploadTask = uploadBytesResumable(
                                          storageRef,
                                          blobInfo.blob()
                                        );
                                        uploadTask.on(
                                          "state_changed",
                                          (snapshot) => {
                                            const progress =
                                              (snapshot.bytesTransferred /
                                                snapshot.totalBytes) *
                                              100;
                                            console.log(
                                              `Upload is ${progress}% done`
                                            );
                                          },
                                          (error) => {},
                                          () => {
                                            getDownloadURL(
                                              uploadTask.snapshot.ref
                                            ).then((downloadURL) => {
                                              console.log(
                                                "File available at",
                                                downloadURL
                                              );
                                              cb(downloadURL, {
                                                title: file.name,
                                              });
                                            });
                                          }
                                        );
                                      };

                                      reader.readAsDataURL(file);
                                    };
                                    input.click();
                                  },
                                }}
                              />
                            </div>

                            {/* End: form */}
                          </div>
                          {/* End: card body */}
                        </div>
                      </div>
                      {/* End: card */}
                      {/* Start: button group */}
                      <div className="button-group add-product-btn d-flex justify-content-end mt-40">
                        <Link to="/news">
                          <button className="btn btn-default btn-squared fw-400 text-capitalize">
                            Huỷ
                          </button>
                        </Link>
                        <button
                          type="submit"
                          className="btn btn-primary btn-default btn-squared text-capitalize"
                        >
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
          {/* ends: col-lg-12 */}
        </div>
      </div>
    </>
  );
};

export default EditNews;
