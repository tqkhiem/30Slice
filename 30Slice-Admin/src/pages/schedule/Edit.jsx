import { useForm } from "react-hook-form";

export default function Edit(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (newService) => {
    const data = {
      ...newService,
      _id: props?.id,
    };
    props.callback(data);
  };

  return (
    <div
      className="modal-basic modal fade show"
      id={"modal-edit" + props?.id}
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content modal-bg-white ">
          <div className="modal-header">
            <h6 className="modal-title">Đổi dịch vụ đã chọn</h6>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span data-feather="x" />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-body">
              <label htmlFor="">Chọn dịch vụ</label>
              <select
                className="form-control"
                id="date"
                aria-label="Chọn dịch vụ"
                defaultValue={props.defaultService}
                {...register("newService", {
                  required: "Trường này không được để trống",
                })}
              >
                {props?.item?.map((service, index) => {
                  return (
                    <option key={index} value={service._id}>
                      {service.Name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-info btn-sm">
                Lưu
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-dismiss="modal"
              >
                Đóng
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
