import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { storeList } from "./storeList";

export default function StoreDetail() {
  const navigate = useNavigate();
  const { storeId } = useParams();

  const selectedStore = storeList.find((s) => s.id === Number(storeId));
  console.log(`selectedStore is ${selectedStore}`);
  if (!selectedStore) return <h3>找不到店家</h3>;
  return (
    <div className="bg-white">
      <br className="mt-4" />
      <Container className="py-5">
        {/* 標題 */}
        <div className="d-flex align-items-center mb-4">
          <div
            style={{
              width: "8px",
              height: "72px",
              backgroundColor: "#b30000",
              marginRight: "16x",
            }}
          />
          <p className="fw-bold ps-3 title48">門市據點</p>
        </div>

        {/* 下拉選單 */}
        <div className="d-flex align-items-center gap-3 mb-4">
          <span className="fw-semibold">選擇分店</span>
          <Form.Select
            className="rounded-0 bg-white"
            style={{ width: "240px" }}
            onChange={(e) => navigate(`/storedetail/${e.target.value}`)}
          >
            <option value="">請選擇</option>
            {storeList.map((store) => (
              <option key={store.id} value={store.id}>
                {store.name}
              </option>
            ))}
          </Form.Select>
        </div>

        {/* 內容區塊 */}
        <Row>
          {/* 左側：圖片 + 資訊 */}
          <Col md={5}>
            <Card className="rounded-0 shadow-sm bg-white">
              <Card.Img
                variant="top"
                src={selectedStore.img}
                className="rounded-0 "
              />

              <Card.Body className="px-0">
                <Card.Title className="px-4 py-1">
                  {selectedStore.name}
                </Card.Title>

                {/* 橫線滿版 */}
                <div className="border-top w-100 mb-3"></div>

                <div className="px-4">
                  <p className="mb-2">📞 電話：{selectedStore.phone}</p>
                  <p className="mb-2">⏰ 營業時間：{selectedStore.hours}</p>
                  <p className="mb-0">📍 地址：{selectedStore.address}</p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* 右側：地圖 */}
          <Col md={7}>
            <div className="h-100">
              <iframe
                title="store-map"
                src={selectedStore.map}
                width="100%"
                height="100%"
                style={{ minHeight: "400px", maxWidth: "746px", border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>
      <br className="mb-4" />
    </div>
  );
}
