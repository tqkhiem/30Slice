import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

function getPercentageIncrease(a, b) {
  if (b === 0) return 0;
  return ((a - b) / b) * 100;
}

const BarChart = ({ dataOrders }) => {
  const date = new Date();

  const [totalOrdersThisMonth, setTotalOrdersThisMonth] = useState();
  const [compareToLastMonth, setCompareToLastMonth] = useState();

  const data = {
    labels: dataOrders && dataOrders.map((item) => item.month),
    datasets: [
      {
        label: 'Tổng đơn hàng',
        data: dataOrders && dataOrders.map((item) => item.totalOrders),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  useEffect(() => {
    if (dataOrders) {
      dataOrders.forEach((item, index) => {
        if (Number(item.month.slice(0, 2)) === date.getMonth() + 1) {
          const thisMonth = item.totalOrders;
          const lastMonth = dataOrders[index - 1].totalOrders;
          setTotalOrdersThisMonth(thisMonth);
          const compareTM = getPercentageIncrease(
            Number(thisMonth),
            Number(lastMonth)
          );
          setCompareToLastMonth(compareTM);
          return;
        }
      });
    }
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      title: {
        display: false,
        text: 'Tổng lượng đơn hàng tháng',
      },
    },
  };

  return (
    <>
      <div className="col-xxl-3 col-md-6 col-ssm-12 mb-30">
        <div className="ap-po-details p-25 radius-xl bg-white">
          <div className="overview-content">
            <div className="dashboard-card-container d-grid justify-content-between align-items-center mb-1">
              <div>
                <h1>{totalOrdersThisMonth}</h1>
                <span>Đơn hàng</span>
              </div>
              <div className="ap-po-details-time">
                <span
                  className={
                    compareToLastMonth >= 0 ? 'color-success' : 'color-danger'
                  }
                >
                  <i
                    className={
                      compareToLastMonth >= 0
                        ? 'las la-arrow-up'
                        : 'las la-arrow-down'
                    }
                  />
                  <strong>
                    {dataOrders && Math.trunc(Math.abs(compareToLastMonth))}%
                  </strong>
                </span>
                <small> so với tháng trước</small>
              </div>
            </div>
            <div className="ap-po-details-time align-self-center">
              <Bar options={options} data={data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BarChart;
