import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { toastSuccess } from "../../components/sharedComponents/toast";

function Contact() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm(
        "service_wjqkbbi",
        "template_p9hvcfj",
        form.current,
        "9gCbqCnwGuxw6MBc3"
      )
      .then(
        (result) => {
          setLoading(false);
          toastSuccess("Gửi tin nhắn thành công!");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div className="container-fluid my-4">
      <section className="card contact_area section_gap_bottom">
        <div className="container py-5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.30598272599!2d106.62729839773993!3d10.853280247100555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x11690ada8c36f9bc!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIFRo4buxYyBow6BuaCBGUFQgUG9seXRlY2huaWMgVFAuSENNIChDUzMp!5e0!3m2!1svi!2s!4v1670146728705!5m2!1svi!2s"
            width="100%"
            height={300}
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          <div className="row mt-3">
            <div className="col-lg-3">
              <div className="contact_info">
                <div className="info_item">
                  <i className="lnr lnr-home" />
                  <h6>Quận 12, Thành phố Hồ Chí Minh</h6>
                  <p>Toà nhà Innovation lô 24</p>
                </div>
                <div className="info_item">
                  <i className="lnr lnr-phone-handset" />
                  <h6>
                    <a href="tel:0987654321">0987-654-321</a>
                  </h6>
                  <p>9:00 - 18:00, thứ 2 đến thứ 7</p>
                </div>
                <div className="info_item">
                  <i className="lnr lnr-envelope" />
                  <h6>
                    <a href="mailto: support@30slice.com">
                      support@30slice.com
                    </a>
                  </h6>
                  <p>Gửi tin nhắn cho chúng tôi bất cứ lúc nào!</p>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <form
                className="row contact_form"
                id="contactForm"
                noValidate="novalidate"
                ref={form}
                onSubmit={onSubmit}
              >
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Tên của bạn"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Địa chỉ Email"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      name="subject"
                      placeholder="Tiêu đề"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      name="message"
                      id="message"
                      rows={6}
                      placeholder="Lời nhắn"
                      defaultValue={""}
                    />
                  </div>
                </div>
                <div className="col-md-12 text-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm btn-squared"
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    Gửi
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Contact;
