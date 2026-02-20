// import { Container, Row, Col, Nav, Card, Pagination } from "react-bootstrap";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { storeList } from "./storeList";

export default function Store() {
  const [selectedCity, setSelectedCity] = useState("");
  // 篩選符合城市的門市
  const filteredStores =
    selectedCity === ""
      ? storeList
      : storeList.filter((store) => store.city === selectedCity);
  return (
    <div className="bg-white">
      <br className="mt-5" />
      <Container className="bg-white">
        {/* 標題 */}
        <div className="d-flex align-items-center mb-4">
          <div
            style={{
              width: "8px",
              height: "72px",
              backgroundColor: "#b30000",
              marginRight: "12px",
            }}
          />
          <h3 className="fw-bold ps-3 title48">門市據點</h3>
        </div>
        {/* 下拉選單 */}
        <section
          className="d-flex align-items-center justify-content-between"
          style={{ maxWidth: 410 }}
        >
          <p className="fs-5">選擇地區</p>
          <Form.Select
            className="mb-4 rounded-0 bg-white"
            style={{ maxWidth: 304 }}
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">全部地區</option>
            <option value="台北市">台北市</option>
            <option value="台中市">台中市</option>
            <option value="高雄市">高雄市</option>
          </Form.Select>
        </section>

        {/* 門市卡片 */}
        <Row>
          {filteredStores.map((store) => (
            <Col key={store.id} md={4} className="mb-4 ">
              <Card className="h-100 rounded-0 bg-white">
                <Card.Img variant="top rounded-0" src={store.img} />
                <Card.Body className="px-0">
                  <Card.Title className="px-5 mb-3">{store.name}</Card.Title>
                  <div className="border-top"></div>
                  <div className="px-5 py-3">
                    <p className="mb-1">📞 電話：{store.phone}</p>
                    <p className="mb-1">⏰ 營業時間：{store.hours}</p>
                    <p className="">📍 地址：{store.address}</p>
                  </div>
                </Card.Body>

                <Card.Footer className="p-0">
                  <Button
                    variant="dark"
                    className="w-100 rounded-0 bg-black"
                    as={Link}
                    to={`/storedetail/${store.id}`}
                  >
                    詳細資訊
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <br className="mb-5" />
    </div>
  );
}
