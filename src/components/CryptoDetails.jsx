import React, {useState} from "react";
import ReactHtmlParser from 'react-html-parser';
import {useParams} from "react-router-dom";
import millify from "millify";
import {Col, Row, Typography, Select} from "antd";
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import {useGetCryptosDetailsQuery,useGetCryptosHistoryQuery} from "../services/cryptoApi";

import LineChart from "./LineChart";

const {Title, Text} = Typography;
const {Option} = Select;


const CryptoDetails = () => {
	const {coinId} = useParams();
	const [timePeriod, setTimePeriod] = useState('7d');
	const { data, isFetching } = useGetCryptosDetailsQuery(coinId);
	const {data: coinHistory} = useGetCryptosHistoryQuery({coinId, timePeriod})
	const cryptoDetails = data ? data.data ? data.data.coin : null : null;
	
	console.log(coinHistory)
	
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];
  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails && cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails && cryptoDetails.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${ cryptoDetails && cryptoDetails["24hVolume"] && millify(cryptoDetails["24hVolume"])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails && cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${ cryptoDetails && cryptoDetails.allTimeHigh.price && millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails && cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails && cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails && cryptoDetails.supply.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${ cryptoDetails && cryptoDetails.supply.total && millify(cryptoDetails && cryptoDetails.supply.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${ cryptoDetails && cryptoDetails.supply.circulating && millify(cryptoDetails.supply.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];
	
	if (!cryptoDetails) {
		return "Loading"
	}
	if (isFetching) {
		return "Loading"
	}
	return (
	<Col className="coin-detail-container">
		<Col className="coin-heading-container">
		<Title level={2} className="coin-name">
			{ cryptoDetails.name} ({ cryptoDetails.symbol}) Price
			</Title>
			<p>
			{cryptoDetails.name} live price in US Dollars.
				View value statistic, market cap and supply.
			</p>
		</Col>
			<Select 
				default="7d" 
				className="select-timeperiod"
				placeholder="Select Time Period"
				onChange={(value) => setTimePeriod(value)}
				> 
			{time.map(date => <Option key={date}>{date}</Option>) }
			</Select>
			<LineChart
				coinHistory={coinHistory}
				coinPrice={millify(cryptoDetails.price)}
				coinName={cryptoDetails.name}
				/>
			<Col className="stats-container">
			<Col className="coin-value-statistics">
				<Col className="coin-value-statistics-heading">
				<Title level={3} className="coin-details-heading">{cryptoDetails.name} Value Statisstics</Title>
				<p>An overview showing the statistics of the {cryptoDetails.name}</p>
				</Col>
				{stats.map(({icon, title, value}) => (
				<Col className="coin-stats" key={title}> 
				<Col className="coin-stats-name">
					<Text>{icon}</Text>	
					<Text>{title}</Text>	
					</Col>	
						<Text className="stats">{value}</Text>
			    </Col>
						
				))}
			</Col>
				
			<Col className="other-stats-info">
				<Col className="coin-value-statistics-heading">
				<Title level={3} className="coin-details-heading">Other Statisstics</Title>
				<p>An overview showing the statistics of all cryptocurrencies. </p>
				</Col>
				{genericStats.map(({icon, title, value}) => (
				<Col className="coin-stats" key={title}> 
				<Col className="coin-stats-name">
					<Text>{icon}</Text>	
					<Text>{title}</Text>	
					</Col>	
						<Text className="stats">{value}</Text>
			    </Col>
						
				))}
			</Col>
			</Col>
			<Col className="coin-desc-link">
			  <Row className="coin-desc">
				<Title level={3} className="coin-details-heading">
				  What is {cryptoDetails.name}
				  </Title>
				 {ReactHtmlParser(cryptoDetails.description)}
				</Row>
				<Col className="coin-links">
				<Title level={3} className="coin-details-heading">{cryptoDetails.name} Links</Title>
					{cryptoDetails.links.map(link => (
					<Row className="coin-link" key={link.name}> 
						<Title level={5} className="link-name">
						{link.type}	
						</Title>
							<a href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a>
						</Row>
					) )}
				</Col>
			</Col>
	</Col>
	)
}

export default CryptoDetails