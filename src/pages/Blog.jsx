import { useMemo, useRef, useEffect, useState } from "react";
import { Container, Nav, Form, Row, Col, Card } from "react-bootstrap";
import { blogData } from "./blogData";
import { FaSearch } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import CustomPagination from "./CustomPagination";

const PER_PAGE = 3;

function Blog() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  // ✅ URL 作為唯一資料來源
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "全部";
  const keyword = searchParams.get("keyword") || "";
  const currentPage = Number(searchParams.get("page")) || 1;

  // 只控制 input 顯示用（不當成搜尋來源）
  const [inputValue, setInputValue] = useState(keyword);

  /* =============================
      URL 更新工具函式
  ==============================*/
  const updateParams = (newParams) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(newParams).forEach(([key, value]) => {
      if (!value || value === "全部" || value === 1) {
        params.delete(key); // 空值會被刪掉
      } else {
        params.set(key, value);
      }
    });

    setSearchParams(params);
  };

  /* =============================
      當 URL keyword 改變 → 同步 input
  ==============================*/
  useEffect(() => {
    setInputValue(keyword);
  }, [keyword]);

  /* =============================
      展開後自動 focus
  ==============================*/
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  /* =============================
      1️⃣ 分類 + 搜尋篩選
  ==============================*/
  const filteredData = useMemo(() => {
    return blogData.filter((item) => {
      const matchCategory = category === "全部" || item.category === category;

      const matchKeyword = Object.entries(item)
        .filter(([key]) => !key.startsWith("img"))
        .some(([, val]) =>
          String(val).toLowerCase().includes(keyword.toLowerCase()),
        );

      return matchCategory && matchKeyword;
    });
  }, [category, keyword]);

  /* =============================
      2️⃣ 分頁
  ==============================*/
  const totalPages = Math.ceil(filteredData.length / PER_PAGE);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );

  /* =============================
      分類處理
  ==============================*/
  const handleCategory = (cat) => {
    updateParams({
      category: cat, // 保留分類
      keyword: "", // ← 強制刪除
      page: 1, // 分頁回到第一頁
    });
  };

  /* =============================
      搜尋處理
  ==============================*/
  const handleSearch = () => {
    updateParams({
      keyword: inputValue,
      page: 1,
    });
  };

  /* =============================
      分頁處理
  ==============================*/
  const handlePageChange = (page) => {
    updateParams({ page });
  };

  // const getPreviewText = (item) => {
  //   return Object.entries(item)
  //     .filter(([key]) => key.startsWith("content"))
  //     .map(([, val]) => val)
  //     .slice(0, 5)
  //     .join(" ");
  // };

  return (
    <div className="bg-white">
      {/* =============================
          分類 + 搜尋列   d-none d-md-block
      ==============================*/}

      <div className="second-menu-bg py-3 d-none d-md-block mt-2">
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            {/* 分類 */}
            <Nav>
              {["最新消息", "特別企劃", "新品上市", "鏡框小知識"].map(
                (cat, i) => (
                  <Nav.Link
                    key={cat}
                    active={category === cat}
                    onClick={() => handleCategory(cat)}
                    className={`text-white my-navlink ${i === 0 ? "ms-0 ps-0" : "ms-0"} ${category === cat ? "fw-bold" : ""}`}
                  >
                    {cat}
                  </Nav.Link>
                ),
              )}
            </Nav>

            {/* 搜尋區 */}
            <div className="d-flex align-items-center position-relative">
              <Form.Control
                ref={inputRef}
                type="text"
                value={inputValue}
                placeholder="搜尋文章..."
                className={`search-input ${open ? "open" : ""}`}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                    setOpen(false);
                  }
                }}
                onBlur={() => setOpen(false)}
              />

              <FaSearch
                className="search-icon text-white"
                onClick={() => {
                  if (open) {
                    handleSearch();
                  }
                  setOpen((prev) => !prev);
                }}
              />
            </div>
          </div>
        </Container>
      </div>

      {/* =============================
          Blog 卡片區
      ==============================*/}
      <br />
      <Container className="mt-10 mb-80">
        {/* 標題 */}
        <div className="d-flex align-items-center">
          <div
            style={{
              width: "8px",
              height: "72px",
              backgroundColor: "#b30000",
              marginRight: "16px",
            }}
          />
          <p className="fw-bold ps-3 title48">部落格</p>
        </div>

        {paginatedData.map((item) => (
          <Row key={item.id} className="mb-5">
            <Col md={6}>
              <img src={item.img} alt={item.title} className="img-fluid" />
            </Col>

            <Col md={6}>
              <Card className="border-0 bg-white h-100">
                <Card.Body>
                  <Card.Title className="fs-2 ft-color">
                    <Link to={`/blog/${item.id}`}>{item.title}</Link>
                  </Card.Title>

                  <div className="d-flex justify-content-between">
                    <p className="fw-bold">{item.subtitle}</p>
                    <p className="text-muted">{item.date}</p>
                  </div>

                  <Card.Text
                    className="mt-2 preview-text d-none d-md-block"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 5,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {/* {getPreviewText(item)} */}
                    {item.content.split("\n").slice(0, 2).join("\n")}
                  </Card.Text>
                  <div className="text-end p-3 flex-grow-1 position-absolute bottom-0 end-0 d-none d-md-block">
                    <Link
                      to={`/blog/${item.id}`}
                      className="ft-36 mb-0 blogContent-font"
                    >
                      MORE
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
        <br />
        {/* 分頁 */}
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          maxVisible={7}
        />
      </Container>
      <br />
    </div>
  );
}

export default Blog;
