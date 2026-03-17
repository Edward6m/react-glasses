import { useState, useMemo, useEffect } from "react";
import { Container, Row, Col, Card, Pagination } from "react-bootstrap";
// import { productsList } from "./productsList.jsx";
import { productsList, type Product } from "./productsList.js";
import { useDispatch } from "react-redux";
import { pushToast } from "../slice/toastSlice";
// ── Assets ──────────────────────────────────────────────
import glassesbanner1 from "../assets/image/product-header-1.png";
import glassesbanner2 from "../assets/image/product-header-2.png";
import glassesbanner3 from "../assets/image/product-header-3.png";
import glassesbanner4 from "../assets/image/product-header-4.png";

// ── Types ────────────────────────────────────────────────
type TabKey = "optical" | "sunglasses" | "functional";


interface TabItem {
  key: TabKey;
  label: string;
}

interface BannerItem {
  src: string;
  alt: string;
}

// ── Static Data ──────────────────────────────────────────
const TABS: TabItem[] = [
  { key: "optical",    label: "OPTICAL"    },
  { key: "sunglasses", label: "SUNGLASSES" },
  { key: "functional", label: "FUNCTIONAL" },
];

const BANNERS: Partial<Record<TabKey, BannerItem[]>> = {
  optical: [
    { src: glassesbanner1, alt: "optical banner 1" },
    { src: glassesbanner2, alt: "optical banner 2" },
  ],
  sunglasses: [
    { src: glassesbanner3, alt: "sunglasses banner 1" },
    { src: glassesbanner4, alt: "sunglasses banner 2" },
  ],
};

const ITEMS_PER_PAGE = 12;

// ── Sub Components ───────────────────────────────────────
interface TabButtonsProps {
  activeKey: TabKey;
  onSelect: (key: TabKey) => void;
}

const TabButtons: React.FC<TabButtonsProps> = ({ activeKey, onSelect }) => (
  <Row className="custom-tab-row g-0">
    {TABS.map(({ key, label }) => (
      <Col xs={4} key={key}>
        <button
          className={`custom-tab-btn ${activeKey === key ? "active" : ""}`}
          onClick={() => onSelect(key)}
        >
          {label}
        </button>
      </Col>
    ))}
  </Row>
);

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <Card className="bg-white text-center h-100 rounded-0 product-card">
    <Card.Img variant="top" src={product.img} alt={product.code} />
    <Card.Body className="px-0">
      <div className="d-flex justify-content-between align-items-center mb-2 px-2">
        <span className="text-dark">{product.code}</span>
        <span className="text-danger fw-bold">{product.price}</span>
      </div>
      <div className="d-flex justify-content-start gap-2 px-2">
        {product.colors.map((color, i) => (
          <span
            key={i}
            style={{ width: 24, height: 24, backgroundColor: color, display: "inline-block" }}
          />
        ))}
      </div>
    </Card.Body>
  </Card>
);

// ── Main Component ───────────────────────────────────────
const Products: React.FC = () => {
  const [activeKey, setActiveKey] = useState<TabKey>("optical");
  const [currentPage, setCurrentPage] = useState<number>(1);

   const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      pushToast({
        type: "success",
        message: "3類鏡框可選擇",
      })
    );
  }, [dispatch]);

  // 切換 tab 時重置頁碼
  const handleTabSelect = (key: TabKey) => {
    setActiveKey(key);
    setCurrentPage(1);
  };

  // 過濾產品（useMemo 避免重複計算）
  const filteredProducts = useMemo<Product[]>(() => {
    if (activeKey === "sunglasses")  return productsList.filter((p) => p.sun === 1);
    if (activeKey === "functional")  return productsList.filter((p) => p.sun === 2);
    return productsList;
  }, [activeKey]);

  // 分頁計算
  const totalPages  = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex  = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const banners = BANNERS[activeKey];

  return (
    <div className="bg-white">
      {/* Mobile Tabs */}
      <div className="d-md-none">
        <TabButtons activeKey={activeKey} onSelect={handleTabSelect} />
      </div>

      {/* Desktop Tabs */}
      <div className="d-none d-md-block">
        <Container>
          <TabButtons activeKey={activeKey} onSelect={handleTabSelect} />
        </Container>
      </div>

      {/* Banner */}
      {banners && (
        <Row className="mb-5 g-0">
          {banners.map((b) => (
            <Col key={b.alt}>
              <img src={b.src} className="img-fluid w-100" alt={b.alt} />
            </Col>
          ))}
        </Row>
      )}

      <Container>
        {/* Title */}
        <Row className="text-center mb-4 mt-10">
          <Col>
            {activeKey === "optical"    && <h3>Celluloid Combi</h3>}
            {activeKey === "sunglasses" && <p className="fs-md-2 fs-sm-4 fw-medium">2020 NEW COLLECTION</p>}
            <p className="text-muted fs-md-3 fs-sm-4">賽璐珞鈦金屬混合鏡框</p>
          </Col>
        </Row>

        {/* Product Grid */}
        <Row className="g-4">
          {currentItems.map((item) => (
            <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={item} />
            </Col>
          ))}
        </Row>

        {/* Pagination */}
        <Row className="justify-content-center mt-20 bg-white pb-20">
          <Col xs="auto">
            <Pagination className="custom-pagination rounded-0">
              <Pagination.Prev
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                上一頁
              </Pagination.Prev>

              {Array.from({ length: totalPages }, (_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === currentPage}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}

              <Pagination.Next
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                下一頁
              </Pagination.Next>
            </Pagination>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Products;