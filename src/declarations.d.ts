declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

// 圖片
declare module "*.png" { const src: string; export default src; }
declare module "*.jpg" { const src: string; export default src; }
declare module "*.jpeg" { const src: string; export default src; }
declare module "*.svg" { const src: string; export default src; }
declare module "*.webp" { const src: string; export default src; }

// 樣式  ← 補上這兩行
declare module "*.scss" { const styles: Record<string, string>; export default styles; }
declare module "*.css"  { const styles: Record<string, string>; export default styles; }

declare module "./routes" {
  import { RouteObject } from "react-router-dom";
  const routes: RouteObject[];
  export default routes;
}