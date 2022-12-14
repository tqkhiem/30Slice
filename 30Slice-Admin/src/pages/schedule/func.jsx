export const create7Date = () => {
    const arrDate = [];
    // khỏi tạo 7 ngày tiếp theo
    for (var i = 0; i <= 6; i++) {
      var date = new Date();
      date.setDate(date.getDate() + i);
      arrDate.push({
        dateVn: date.toLocaleDateString("vi-VN", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
          weekday: "long",
        }),
        dateEn: date.toLocaleDateString("en", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
        }),
      });
    }
    return arrDate;
  };