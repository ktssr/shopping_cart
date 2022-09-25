import { Col, Row } from "react-bootstrap"
import Storeitem from "../components/Storeitem"
import storeItems from "../data/items.json"
export default () => {
    return (
        <>
            <h1>Store</h1>
            <Row md={2} xs={1} lg={3} className={"g-3"}>
                {storeItems.map((item) => (
                    <Col key={item.id}>
                        <Storeitem {...item} />
                    </Col>
                ))}
            </Row>
        </>
    )
}
