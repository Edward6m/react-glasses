
export type BlogCategory = "全部" | "最新消息" | "特別企劃" | "新品上市" | "鏡框小知識";

export interface BlogItem {
  id:       number;
  title:    string;
  subtitle: string;
  date:     string;
  category: BlogCategory; 
  content:  string;
  content1: string;
  content2: string;
  content3: string;
  img:      string;
  img1:     string;
  img2:     string;
  img3:     string;
  tag?:     string[];
}