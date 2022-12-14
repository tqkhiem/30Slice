function About() {
   return (
      <div className="container about__container">
         <style>
            {`
               .about__content > div{
                  margin-bottom: 50px;
               }
               .about__container .about__content .mission__content {
                  padding: 80px;
                  display: flex;
                  justify-content: center;
                  flex-direction: column;
                  height: 100%;
               }
               .about__container .about__content .mission__content .sub-title {
                  margin-top: 20px;
                  font-size: 18px;
                  line-height: 28px;
                  color: #3d3d3d;
                  position: relative;
                  text-align: justify;
               }
               .about__container .about__content .mission__content .title { 
                  font-weight: 500;
                  font-size: 40px;
                  line-height: 60px;
                  text-transform: uppercase;
                  color: #000;
               }
               .about__container .about__content .story .store__content .content .title {
                  font-weight: 500;
                  font-size: 32px;
                  line-height: 48px;
                  text-transform: uppercase;
                  color: #000;
                  margin-bottom: 24px;
               }
               .core-value__content .title {
                  margin-bottom: 16px;
                  font-weight: 500;
                  font-size: 24px;
                  line-height: 36px;
                  text-transform: uppercase;
                  color: #fff;
               }
               .core-value__content .subtitle {
                  font-size: 14px;
                  line-height: 24px;
                  color: #bababa;
                  text-align: justify;
               }
               .about__container .about__content .signification .title {
                  font-weight: 500;
                  font-size: 32px;
                  line-height: 48px;
                  text-transform: uppercase;
                  color: #222;
                  margin-bottom: 24px;
               }
            `}
         </style>
         <div className="about__content" style={{ marginTop: "25px" }}>
            <div className="mission" style={{ background: "#fff4b6" }}>
               <div className="row">
                  <div className="col col-12 col-lg-6">
                     <div className="mission__content">
                        <h1 className="title">Sứ mệnh của 30Slice</h1>
                        <p className="sub-title">
                           "30Slice tin tưởng &amp; nỗ lực mỗi ngày để kết nối bàn tay tài hoa
                           của người thợ Việt cùng quy trình khoa học 30 phút nhằm đem đến
                           cho phái mạnh toàn cầu kiểu tóc đẹp trai, làn da khoẻ mạnh cuốn
                           hút phái đẹp cùng tinh thần thư giãn để bứt phá trong sự nghiệp."
                        </p>
                     </div>
                  </div>
                  <div className="col col-12 col-lg-6">
                     <div className="mission__image">
                        <img
                           style={{ maxWidth: "100%" }}
                           src="/assets/images/about_us.png"
                           className="content-image"
                           alt=""
                        />
                     </div>
                  </div>
               </div>
            </div>
            <div className="story">
               <div className="row col-reverse">
                  <div className="col col-12 col-lg-6">
                     <div className="story__map">
                        <img style={{ maxWidth: "100%" }} src="https://upload.wikimedia.org/wikipedia/commons/1/1c/Vietnam_Full_flag_map.png" alt="" />
                     </div>
                  </div>
                  <div className="col col-12 col-lg-6">
                     <div className="store__content">
                        <div className="icon_growth" style={{ width: "72px", height: "72px", borderRadius: "50%", background: "#fc3", padding: "18px" }}>
                           <img src="https://30shine.com/static/media/growth.2143c723.svg" alt="icon_growth" />
                        </div>
                        <div className="content" style={{ margin: "24px 0 48px" }}>
                           <h2 className="title">Câu chuyện 30Slice</h2>
                           <p className="sub-title">
                              30Slice chạy thử nghiệm lần đầu tiên vào tháng 10/2022
                              và mất một tháng để tìm ra hướng đi như hiện nay. Những anh em
                              sáng lập 30Slice tin tưởng rằng người thợ Việt Nam rất tận tâm,
                              khéo léo trong các nhóm ngành nghề cắt tóc, làm móng, massage…
                              Nếu đưa ra một mô hình mới ứng dụng công nghệ và quy trình hợp
                              lý, 30Slice có thể giúp thế mạnh này được chắp cánh, mang lại
                              dịch vụ tuyệt vời cho khách hàng, tạo dựng môi trường tốt hơn
                              cho anh em thợ. Theo đó, doanh nghiệp cũng có khả năng phát
                              triển bền vững tại Việt Nam và vươn ra nước ngoài.
                           </p>
                           <p className="sub-title">
                              Mục tiêu năm 2030, đạt quy mô 300 salon tại Việt Nam và vươn ra toàn cầu.
                              Tham gia các ngành dịch vụ sử dụng nhiều đến đôi tay tuyệt vời
                              của người thợ Việt Nam.
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="core-value" style={{ backgroundColor: "#000", color: "#fff", padding: "100px 60px 25px" }}>
               <div
                  className="row"
                  style={{ marginLeft: "-25px", marginRight: "-25px" }}
               >
                  <div
                     className="col col-12 col-lg-5"
                     style={{ paddingLeft: 25, paddingRight: 25 }}
                  >
                     <div className="core-value__image d-flex flex-column align-items-center">
                        <div className="icon_diamond" style={{ width: "72px", height: "72px", padding: "18px", borderRadius: "50%", background: "#fc3" }}>
                           <img src="https://30shine.com/static/media/diamond.ace9225b.svg" alt="" />
                        </div>
                        <div className="text-uppercase" style={{ fontSize: "32px" }}>giá trị cốt lõi</div>
                        <div className="content_image">
                           <img style={{ maxWidth: "100%" }} src="https://30shine.com/static/media/core_value.515c625b.png" alt="" />
                        </div>
                     </div>
                  </div>
                  <div
                     className="col col-12 col-lg-7"
                     style={{ paddingLeft: 25, paddingRight: 25 }}
                  >
                     <div
                        className="row"
                        style={{ marginLeft: "-25px", marginRight: "-25px" }}
                     >
                        <div
                           className="col col-12 col-lg-6"
                           style={{ paddingLeft: 25, paddingRight: 25 }}
                        >
                           <div className="core-value__content">
                              <h3 className="title">1. Trung thực</h3>
                              <p className="subtitle">
                                 Là nghĩ-nói-làm giống nhau, ngược lại với trung thực là gian
                                 dối. Gian dối về tiền bạc, gian dối về thời gian, gian dối về
                                 thông tin… đều là hành vi bị cấm tại 30Slice. 30Slice sẽ dùng
                                 tất cả khả năng, nguồn lực để phát hiện và trừng phạt thích
                                 đáng mọi hành vi gian dối, kể cả đưa ra pháp luật.
                              </p>
                           </div>
                        </div>
                        <div
                           className="col col-12 col-lg-6"
                           style={{ paddingLeft: 25, paddingRight: 25 }}
                        >
                           <div className="core-value__content">
                              <h3 className="title">2. ham học hỏi</h3>
                              <p className="subtitle">
                                 Là không ỉ lại, tự mình sử dụng thời gian, công sức của mình
                                 để tìm hiểu bất kỳ vấn đề gì mà mình còn đang thắc mắc, chưa
                                 biết. Việc ham học hỏi cũng giúp bản thân không bao giờ bị
                                 thụt lùi lại so với sự phát triển không ngừng của xã hội.
                              </p>
                           </div>
                        </div>
                        <div
                           className="col col-12 col-lg-6"
                           style={{ paddingLeft: 25, paddingRight: 25 }}
                        >
                           <div className="core-value__content">
                              <h3 className="title">3. tận tâm </h3>
                              <p className="subtitle">
                                 Là luôn sẵn sàng dốc hết sức lực và tâm huyết khi thực hiện
                                 các công việc, giải quyết các vấn đề để đạt được kết quả tốt
                                 đẹp. Tận tâm với khách hàng, tận tâm với đồng nghiệp, bạn bè,
                                 gia đình… sẽ khiến chúng ta đạt được nhiều hơn sự hài lòng, sự
                                 trân trọng trong công việc và cuộc sống.
                              </p>
                           </div>
                        </div>
                        <div
                           className="col col-12 col-lg-6"
                           style={{ paddingLeft: 25, paddingRight: 25 }}
                        >
                           <div className="core-value__content">
                              <h3 className="title">4. nhận trách nhiệm</h3>
                              <p className="subtitle">
                                 Là nhìn ra được nguyên nhân gốc rễ của vấn đề từ chính bản
                                 thân mình, từ đó đưa ra được giải giải pháp để thay đổi kết
                                 quả tốt đẹp hơn. Nhận trách nhiệm không phải là chịu trách
                                 nhiệm. Tinh thần nhận trách nhiệm sẽ giúp hạn chế tối đa các
                                 mâu thuẫn, xung đột, xây dựng được tập thể vững mạnh và hướng
                                 tới sự chủ động, cải tiến để thay đổi công việc, cuộc sống tốt
                                 đẹp hơn.
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="signification">
               <div
                  className="row"
                  style={{ marginLeft: "-20px", marginRight: "-20px" }}
               >
                  <div
                     className="col col-12 col-lg-6"
                     style={{ paddingLeft: 20, paddingRight: 20 }}
                  >
                     <div className="content-icon" style={{ width: "72px", height: "72px", borderRadius: "50%", background: "#fc3", padding: "18px" }}>
                        <img src="https://30shine.com/static/media/lamp.186e6eda.svg" alt="" />
                     </div>
                     <h2 className="title">Ý nghĩa của 30Slice</h2>
                     <p className="subtitle">
                        Slogan: “Nhắm mắt 30 phút và bạn sẽ thay đổi” có ý nghĩa cho cả nội
                        bộ và khách hàng. Khách hàng thấy được lời hứa của thương hiệu, nội
                        bộ nỗ lực mỗi ngày thực hiện lời hứa ấy, cũng chính là sứ mệnh
                        30Slice.
                     </p>
                     <p className="note">
                        *Logo và Slogan 30Slice tạm chưa được Cục Sở Hữu Trí Tuệ cấp bằng bảo hộ
                        độc quyền.
                     </p>
                  </div>
                  <div
                     className="col col-12 col-lg-6"
                     style={{ paddingLeft: 20, paddingRight: 20 }}
                  >
                     <div className="content-image">
                        <img style={{maxWidth: "100%"}} src="/assets/images/logo30slice.png" alt="" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
export default About;