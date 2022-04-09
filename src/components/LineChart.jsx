import React from 'react';
import { Col, Row, Typography } from 'antd';

import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2'
ChartJS.register(...registerables);

const { Title } = Typography;

const LineChart = ({ coinHistory, coinPrice, coinName }) => {
	const priceChange = coinHistory ? (coinHistory.data ? coinHistory.data.change : null) : null;

	const coinPrices = [];
	const coinTimestamps = [];

	coinHistory &&
		coinHistory.data &&
		coinHistory.data.history.forEach((time) => {
			coinTimestamps.unshift(new Date(time.timestamp*1000).toLocaleDateString("en-uk"));
			coinPrices.unshift(time.price);
		});


	const data = {
		labels: coinTimestamps,
		datasets: [
			{
				label: 'Price in USD',
				data: coinPrices,
				fill: false,
				backgroundColor: '#0071bd',
				borderColor: '#0071bd',
			},
		],
	};

	  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };


	return (
		<>
			<Row className="chart-header">
				<Title level={2} className="chart-title">
					{coinName} Price History
				</Title>
				<Col className="price-container">
					<Title level={5} className="price-change">
						{priceChange} %
					</Title>
					<Title level={5} className="current-price">
						Current {coinName} Price: $ {coinPrice}{' '}
					</Title>
				</Col>
			</Row>
		<Line data={data} options={options} />
		</>
	);
};

export default LineChart;