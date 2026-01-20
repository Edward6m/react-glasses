import { useState } from "react";
import { Container, Row, Col, Nav, Card, Pagination } from "react-bootstrap";
import { productsList } from "./productsList";
import glassesbanner1 from "../assets/image/product-header-1.png";
import glassesbanner2 from "../assets/image/product-header-2.png";
import glassesbanner3 from "../assets/image/product-header-3.png";
import glassesbanner4 from "../assets/image/product-header-4.png";

export default function Products() {
  const [activeKey, setActiveKey] = useState("optical");

  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  // 過濾產品
  let filteredProducts = [];
  if (activeKey === "optical") {
    filteredProducts = productsList; // 全部顯示
  } else if (activeKey === "sunglasses") {
    filteredProducts = productsList.filter((p) => p.sun === 1);
    // 篩選    sun = 1;
  } else if (activeKey === "functional") {
    filteredProducts = productsList.filter((p) => p.functional === 1);
  }

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="bg-white">
      {/* Mobile Tabs ( < 768px ) */}
      <div className="d-md-none">
        <Row className="custom-tab-row g-0">
          <Col xs={4}>
            <button
              className={`custom-tab-btn ${activeKey === "optical" ? "active" : ""}`}
              onClick={() => setActiveKey("optical")}
            >
              OPTICAL
            </button>
          </Col>

          <Col xs={4}>
            <button
              className={`custom-tab-btn ${activeKey === "sunglasses" ? "active" : ""}`}
              onClick={() => setActiveKey("sunglasses")}
            >
              SUNGLASSES
            </button>
          </Col>

          <Col xs={4}>
            <button
              className={`custom-tab-btn ${activeKey === "functional" ? "active" : ""}`}
              onClick={() => setActiveKey("functional")}
            >
              FUNCTIONAL
            </button>
          </Col>
        </Row>
      </div>

      {/* Desktop Tabs ( ≥ 768px ) */}
      <div className="d-none d-md-block">
        <Container>
          <Row className="custom-tab-row g-0">
            <Col md={4}>
              <button
                className={`custom-tab-btn ${activeKey === "optical" ? "active" : ""}`}
                onClick={() => setActiveKey("optical")}
              >
                OPTICAL
              </button>
            </Col>

            <Col md={4}>
              <button
                className={`custom-tab-btn ${activeKey === "sunglasses" ? "active" : ""}`}
                onClick={() => setActiveKey("sunglasses")}
              >
                SUNGLASSES
              </button>
            </Col>

            <Col md={4}>
              <button
                className={`custom-tab-btn ${activeKey === "functional" ? "active" : ""}`}
                onClick={() => setActiveKey("functional")}
              >
                FUNCTIONAL
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Banner 1*/}
      {activeKey === "optical" && (
        <Row className="mb-5 g-0">
          <Col>
            <img
              src={glassesbanner1}
              className="img-fluid w-100 h168"
              alt="banner"
            />
          </Col>
          <Col>
            <img
              src={glassesbanner2}
              className="img-fluid w-100 h168"
              alt="banner"
            />
          </Col>
        </Row>
      )}

      {/* Banner 1*/}
      {activeKey === "sunglasses" && (
        <Row className="mb-5 g-0">
          <Col>
            <img
              src={glassesbanner3}
              className="img-fluid w-100"
              alt="banner"
            />
          </Col>
          <Col>
            <img
              src={glassesbanner4}
              className="img-fluid w-100"
              alt="banner"
            />
          </Col>
        </Row>
      )}

      <Container>
        {/* Title */}
        <Row className="text-center mb-4 mt-10">
          <Col>
            {activeKey === "optical" && <h3>Celluloid Combi</h3>}
            {activeKey === "sunglasses" && (
              <p className="fs-md-2 fs-sm-4 fw-medium">2020 NEW COLLECTION</p>
            )}
            <p className="text-muted fs-md-3 fs-sm-4">賽璐珞鈦金屬混合鏡框</p>
          </Col>
        </Row>

        {/* Product Grid */}
        <Row className="g-4">
          {currentItems.map((item) => (
            <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="bg-white text-center h-100 rounded-0 product-card">
                <Card.Img
                  variant="top"
                  // src="./image/product-1.png"
                  src={item.img}
                />
                <Card.Body className="px-0">
                  {/* 商品編號與價格同列排列 */}
                  <div className="d-flex justify-content-between align-items-center mb-2 px-2">
                    <span className="text-dark">{item.code}</span>
                    <span className="text-danger fw-bold">{item.price}</span>
                  </div>

                  {/* Color dots */}
                  <div className="d-flex justify-content-start gap-2 px-2">
                    {item.colors.map((c, i) => (
                      <span
                        key={i}
                        style={{
                          width: 24,
                          height: 24,
                          backgroundColor: c,
                          display: "inline-block",
                        }}
                      />
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Pagination */}

        <Row className="justify-content-center mt-20 bg-white pb-20">
          <Col xs="auto">
            <Pagination className="custom-pagination rounded-0">
              <Pagination.Prev onClick={handlePrev}>上一頁</Pagination.Prev>
              {[...Array(totalPages)].map((_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === currentPage}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}

              <Pagination.Next onClick={handleNext}>下一頁</Pagination.Next>
            </Pagination>
          </Col>
        </Row>
        {/* <p className="mt-20 text-white"> a</p> */}
      </Container>
    </div>
  );
}
