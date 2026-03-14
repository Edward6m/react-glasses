import React, { useState, useCallback, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import logo from "../../assets/image/logo_new_header.png";

// ── Types ────────────────────────────────────────────────
type MenuItem = "products" | "store" | "blog" | "qa";

interface NavItem {
  key: MenuItem;
  label: string;
  path: string;
}

// ── Static Data ──────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  { key: "products", label: "系列鏡框", path: "/products" },
  { key: "store",    label: "門市據點", path: "/store"    },
  { key: "blog",     label: "部落格",   path: "/blog"     },
  { key: "qa",       label: "常見問題", path: "/qa"       },
];


// ── SEO Component ────────────────────────────────────────
const SEO: React.FC = () => (
  <Helmet>
     {/* 瀏覽器分頁標題，也是 Google 搜尋結果顯示的標題 */}
    <title>Promise-Desert 眼鏡 | 專業光學眼鏡品牌</title>
     {/* Google 搜尋結果顯示的網站描述，建議 150字內 */}
    <meta name="description" content="Promise-Desert 提供高品質光學眼鏡、太陽眼鏡與功能性鏡框，單一價格、20分鐘取件、120天保固售後服務。" />
    {/* 告訴搜尋引擎這個頁面的關鍵字（現代 Google 已較少參考） */}
    <meta name="keywords" content="眼鏡,光學眼鏡,太陽眼鏡,鏡框,Promise-Desert" />

    {/* Open Graph ; （Facebook / Line / Instagram 分享用） */}
    {/* 告訴 Facebook 這是一個網站類型（其他值：article, product）*/}
    <meta property="og:type"        content="website" />
    {/* 分享到 Facebook / Line 時顯示的標題 */}
    <meta property="og:title"       content="Promise-Desert 眼鏡 | 專業光學眼鏡品牌" />
     {/* 分享到 Facebook / Line 時顯示的描述文字 */}
    <meta property="og:description" content="高品質光學眼鏡、太陽眼鏡與功能性鏡框，單一價格、20分鐘取件。" />
     {/* 分享到 Facebook / Line 時顯示的預覽圖片（建議 1200x630px）*/}
    <meta property="og:image"       content="../assets/image/home-header.png" />
    {/* 分享的網址，讓平台知道連結指向哪裡 */}
    <meta property="og:url"         content="https://your-domain.com" />

    {/* Twitter Card;( X / Twitter 分享用）社群分享時顯示正確預覽 */}
    {/* 卡片樣式：summary_large_image = 大圖預覽（其他值：summary, app）*/}
    <meta name="twitter:card"        content="summary_large_image" />
    <meta name="twitter:title"       content="Promise-Desert 眼鏡" />
    <meta name="twitter:description" content="高品質光學眼鏡、太陽眼鏡與功能性鏡框" />
    <meta name="twitter:image"       content="../assets/image/home-header.png" />

    {/* ── JSON-LD 結構化資料（給 Google 讀的店家資訊）──────── */}
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",  // 固定值;使用 schema.org 標準格式
        "@type": "Store",                  // 依頁面類型改變;告訴 Google 這是一間實體店家
        name: "Promise-Desert 眼鏡",       // 店家名稱
        description: "專業光學眼鏡品牌",    // 店家描述
        url: "https://your-domain.com",   // 店家網址
        telephone: "0800000000",          // 店家電話（Google 地圖可能顯示）
        address: { "@type": "PostalAddress",  // 固定值;地址格式
            addressCountry: "TW" },         //店家國家代碼
      })}
    </script>
  </Helmet>
);


// ── Desktop Nav ──────────────────────────────────────────
const DesktopNav: React.FC = memo(() => (
  <Navbar expand="md" className="header d-none d-sm-flex">
    <Container>
      <Navbar.Brand as={Link} to="/" aria-label="Promise-Desert 首頁">
        <img className="logo" src={logo} alt="Promise-Desert 眼鏡 Logo" width={120} height={40} />
      </Navbar.Brand>

      <Nav className="ms-auto nav" as="ul">
        {NAV_ITEMS.map(({ key, label, path }) => (
          <Nav.Item as="li" key={key}>
            <Nav.Link as={Link} to={path} aria-label={label}>
              {label}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </Container>
  </Navbar>
));
//輔助除錯
DesktopNav.displayName = "DesktopNav";

// ── Mobile Nav ───────────────────────────────────────────
interface MobileNavProps {
  activeItem: MenuItem | null;
  onItemClick: (key: MenuItem, path: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = memo(({ activeItem, onItemClick }) => (
  <>
    <Container fluid className="mobile-menu d-block d-sm-none">
      <Navbar.Brand as={Link} to="/" aria-label="Promise-Desert 首頁">
        <img className="logo py-3" src={logo} alt="Promise-Desert 眼鏡 Logo"  />
      </Navbar.Brand>
    </Container>

    <Row className="menu-grid g-0 d-sm-none" as="nav" aria-label="行動裝置導覽">
      {NAV_ITEMS.map(({ key, label, path }) => (
        <Col
          key={key}
          xs={6}
          role="button"
          tabIndex={0}
          aria-label={label}
          aria-current={activeItem === key ? "page" : undefined}
          className={`menu-item text-center border py-2 ${
            activeItem === key ? "text-black" : "text-white"
          }`}
          onClick={() => onItemClick(key, path)}
          onKeyDown={(e) => e.key === "Enter" && onItemClick(key, path)}
          style={{ cursor: "pointer" }}
        >
          {label}
        </Col>
      ))}
    </Row>
  </>
));
MobileNav.displayName = "MobileNav";

// ── Main Component ───────────────────────────────────────
const Header: React.FC = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);

  const handleClick = useCallback((key: MenuItem, path: string) => {
    setActiveItem(key);
    navigate(path);
  }, [navigate]);

  return (
    <>
      <SEO />
      <header>
        <DesktopNav />
        <MobileNav activeItem={activeItem} onItemClick={handleClick} />
      </header>
    </>
  );
};

export default Header;