import { useState, useMemo, useRef, useEffect, useCallback, memo } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Container, Nav, Form, Row, Col, Breadcrumb } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { blogData } from "./blogData";
import icon1 from "../assets/image/logo-facebook.png";
import icon2 from "../assets/image/logo-instagram.png";
import { type BlogItem } from "./blogType";
// ── Types ────────────────────────────────────────────────
type BlogCategory = "全部" | "最新消息" | "特別企劃" | "新品上市" | "鏡框小知識";

interface BlogSection {
  img:     string;
  content: string;
}


// ── Static Data ──────────────────────────────────────────
const CATEGORIES: BlogCategory[] = ["最新消息", "特別企劃", "新品上市", "鏡框小知識"];

// ── SEO ──────────────────────────────────────────────────
interface BlogSEOProps {
  title:    string;
  subtitle: string;
  img:      string;
}

const BlogSEO: React.FC<BlogSEOProps> = memo(({ title, subtitle, img }) => (
  <Helmet>
    <title>{title} | Promise-Desert 部落格</title>
    <meta name="description" content={subtitle} />

    <meta property="og:type"        content="article" />
    <meta property="og:title"       content={title} />
    <meta property="og:description" content={subtitle} />
    <meta property="og:image"       content={img} />
    <meta property="og:url"         content={window.location.href} />

    <meta name="twitter:card"        content="summary_large_image" />
    <meta name="twitter:title"       content={title} />
    <meta name="twitter:description" content={subtitle} />
    <meta name="twitter:image"       content={img} />

    <script type="application/ld+json">
      {JSON.stringify({
        "@context":       "https://schema.org",
        "@type":          "BlogPosting",
        headline:         title,
        description:      subtitle,
        image:            img,
        publisher: {
          "@type": "Organization",
          name:    "Promise-Desert 眼鏡",
        },
      })}
    </script>
  </Helmet>
));
BlogSEO.displayName = "BlogSEO";

// ── Search Bar ───────────────────────────────────────────
interface SearchBarProps {
  keyword:   string;
  open:      boolean;
  inputRef:  React.RefObject<HTMLInputElement | null>;
  onChange:  (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch:  () => void;
  onToggle:  () => void;
  onBlur:    () => void;
}

const SearchBar: React.FC<SearchBarProps> = memo(({
  keyword, open, inputRef, onChange, onSearch, onToggle, onBlur,
}) => (
  <div className="d-none d-sm-block">
    <div className="d-flex align-items-center position-relative">
      <Form.Control
        ref={inputRef}
        type="text"
        value={keyword}
        placeholder="搜尋文章..."
        aria-label="搜尋文章"
        className={`search-input ${open ? "open" : ""}`}
        onChange={onChange}
        onKeyDown={(e) => e.key === "Enter" && keyword.trim() && onSearch()}
        onBlur={onBlur}
      />
      <FaSearch
        className="search-icon text-white"
        role="button"
        aria-label="開啟搜尋"
        onClick={onToggle}
      />
    </div>
  </div>
));
SearchBar.displayName = "SearchBar";

// ── Main Component ───────────────────────────────────────
const BlogDetail: React.FC = () => {
  const { id }      = useParams<{ id: string }>();
  const navigate    = useNavigate();
  const inputRef    = useRef<HTMLInputElement>(null);

  const [open,       setOpen]       = useState<boolean>(false);
  const [keyword,    setKeyword]    = useState<string>("");
  const [category,   setCategory]   = useState<BlogCategory>("全部");
  const [searchText, setSearchText] = useState<string>("");

  const blogId = Number(id);
  const blog   = blogData.find((item: BlogItem) => item.id === blogId) as BlogItem | undefined;

  // ── 捲回頂端（換頁時觸發）──────────────────────────────
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]); // id 變化時（上一篇/下一篇）觸發

  // ── 頁面初始化 ─────────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      setCategory("全部");
      setSearchText("");
      setKeyword("");
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // ── 展開後自動 focus ───────────────────────────────────
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // ── 篩選文章（備用）───────────────────────────────────
  useMemo(() => blogData.filter((item: BlogItem) => {
    const matchCategory = category === "全部" || item.category === category;
    const matchKeyword  = Object.entries(item)
      .filter(([key]) => !key.startsWith("img"))
      .some(([, val]) => String(val).toLowerCase().includes(searchText.toLowerCase()));
    return matchCategory && matchKeyword;
  }), [category, searchText]);

  // ── Handlers ───────────────────────────────────────────
  const handleCategory = useCallback((cat: BlogCategory) => {
    navigate(`/blog?category=${encodeURIComponent(cat)}`);
  }, [navigate]);

  const handleSearch = useCallback(() => {
    if (!keyword.trim()) return;
    navigate(`/blog?keyword=${encodeURIComponent(keyword)}`);
    setOpen(false);
  }, [keyword, navigate]);

  const handleToggle = useCallback(() => setOpen((prev) => !prev), []);
  const handleBlur   = useCallback(() => setOpen(false), []);
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }, []);

  if (!blog) return <div role="alert">文章不存在</div>;

  const currentIndex = blogData.findIndex((item: BlogItem) => item.id === blogId);
  const prevBlog     = blogData[currentIndex - 1] as BlogItem | undefined;
  const nextBlog     = blogData[currentIndex + 1] as BlogItem | undefined;

  const sections: BlogSection[] = [
    { img: blog.img,  content: blog.content  },
    { img: blog.img1, content: blog.content1 },
    { img: blog.img2, content: blog.content2 },
    { img: blog.img3, content: blog.content3 },
  ];

  return (
    <div className="bg-white">
      <BlogSEO title={blog.title} subtitle={blog.subtitle} img={blog.img} />

      {/* 分類 + 搜尋列 */}
      <div className="second-menu-bg py-3">
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <Nav className="d-flex gap-2 gap-sm-3 gap-md-10" as="ul" aria-label="文章分類">
              {CATEGORIES.map((cat) => (
                <Nav.Item as="li" key={cat}>
                  <Nav.Link
                    active={blog.category === cat}
                    onClick={() => handleCategory(cat)}
                    className="text-white ms-0 px-0 my-navlink"
                    aria-current={blog.category === cat ? "page" : undefined}
                  >
                    {cat}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>

            <SearchBar
              keyword={keyword}
              open={open}
              inputRef={inputRef}
              onChange={handleChange}
              onSearch={handleSearch}
              onToggle={handleToggle}
              onBlur={handleBlur}
            />
          </div>
        </Container>
      </div>

      <Container className="py-5 blog-detail">
        {/* 麵包屑 */}
        <Breadcrumb aria-label="網站導覽">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>首頁</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/blog" }}>部落格</Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => handleCategory(blog.category)} style={{ cursor: "pointer" }}>
            {blog.category}
          </Breadcrumb.Item>
          <Breadcrumb.Item active className="text-danger">{blog.title}</Breadcrumb.Item>
        </Breadcrumb>

        <Row className="mb-20">
          <Col md={8}>
            <h1 className="fw-bold">{blog.title}</h1>
            <p className="fs-5">{blog.subtitle}</p>

            {/* 內容區塊 */}
            {sections.map((section, index) => (
              <div key={index} className="mb-5">
                <img src={section.img} alt={`${blog.title} 圖片 ${index + 1}`} className="img-fluid mb-3" loading="lazy" />
                <p>{section.content}</p>
              </div>
            ))}

            {/* Share */}
            <div className="d-none d-md-flex align-items-center gap-4 mb-3">
              <span className="fw-bold fs-6">Share</span>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="分享到 Facebook">
                <img src={icon1} width={24} height={24} alt="Facebook" />
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="分享到 Instagram">
                <img src={icon2} width={24} height={24} alt="Instagram" />
              </a>
            </div>

            <hr style={{ borderTop: "1px solid #ccc" }} />

            {/* 上下篇 */}
            <nav className="d-flex justify-content-between mt-3" aria-label="文章導覽">
              <div>
                {prevBlog && (
                  <Link to={`/blog/${prevBlog.id}`} className="text-dark text-decoration-none d-flex">
                    ← <span className="d-none d-md-block ms-1">上一篇：{prevBlog.title}</span>
                  </Link>
                )}
              </div>
              <div>
                {nextBlog && (
                  <Link to={`/blog/${nextBlog.id}`} className="text-dark text-decoration-none d-flex">
                    <span className="d-none d-md-block me-1">下一篇：{nextBlog.title}</span> →
                  </Link>
                )}
              </div>
            </nav>
          </Col>

          {/* Tags */}
          <Col md={4}>
            <div className="ps-md-4 mt-4 mt-md-0 d-none d-md-block">
              <div className="d-flex align-items-center">
                <i className="bi bi-tag me-3 tag-font" style={{ fontSize: "24px" }} aria-hidden="true" />
                <p className="fw-bold fs-2 tag-font">TAGS</p>
              </div>
              {blog.tag?.map((tag, index) => (
                <span
                  key={index}
                  role="button"
                  tabIndex={0}
                  className="bg-light me-3 tag-font fs-4"
                  style={{ cursor: "pointer" }}
                  aria-label={`搜尋標籤 ${tag}`}
                  onClick={() => navigate(`/blog?keyword=${encodeURIComponent(tag)}`)}
                  onKeyDown={(e) => e.key === "Enter" && navigate(`/blog?keyword=${encodeURIComponent(tag)}`)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BlogDetail;