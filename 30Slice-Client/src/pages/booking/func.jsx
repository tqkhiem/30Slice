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
export const allAvailableTime = [
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
  ];
export  function getAvailableTime(bookedDate,arrEmployee) {
    let arrAvailableTime = {};
    allAvailableTime.forEach((time) => {
      arrAvailableTime[time] = {};
    });
    arrEmployee.forEach((employee) => {
      employee.Info.Shifts.filter((time) => {
        return (
          new Date(`${bookedDate} ${time}`).getTime() >= new Date().getTime()
        );
      }).forEach((shift) => {
        if (arrAvailableTime[shift]) {
          arrAvailableTime[shift][employee._id] = true;
        }
      });
    });
    // console.log(arrAvailableTime);
    return arrAvailableTime;
  }