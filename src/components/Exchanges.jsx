import React from "react";
import {useGetCryptosExchangesQuery} from "../services/cryptoApi";
import { Collapse, Typography, Row, Col } from 'antd';

import Loader from "./Loader";

const { Panel } = Collapse;
const {Title, Text } = Typography;



const Exchanges = () => {
	const {data} = useGetCryptosExchangesQuery();
	
	
	return (
		<>
		<Loader />
		<Row className="exchanges-row">
			<Col span={6} className="exchange-cel">Exchenges</Col>
			<Col span={6} className="exchange-cel">24h Trade Value</Col>
			<Col span={6} className="exchange-cel">Market</Col>
			<Col span={6} className="exchange-cel">Change</Col>
		</Row>
		<div className="collapse-container">
		<Collapse defaultActiveKey={['1']} >
    <Panel showArrow={false} header="Premium plan require" key="1">
      <p>{"Premium plan required."}</p>
    </Panel>
  </Collapse>	
		</div>
	</>
	)
}

export default Exchanges