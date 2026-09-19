// Public, original demonstration catalog. No private source files are imported.
export const physicsBase = "/projects/university-physics";
export const physicsChapters = [
  { number: 14, title: "真空中的静电场", count: 5 },
  { number: 15, title: "静电场中的导体和电介质", count: 1 },
  { number: 16, title: "恒定磁场", count: 0 },
  { number: 17, title: "磁场对电流的作用", count: 0 },
  { number: 18, title: "磁介质", count: 0 },
  { number: 19, title: "电磁感应", count: 0 },
  { number: 20, title: "麦克斯韦方程组与电磁波", count: 0 },
  { number: 21, title: "狭义相对论", count: 0 },
  { number: 22, title: "早期量子论", count: 0 },
  { number: 23, title: "量子力学初步", count: 0 },
  { number: 24, title: "激光", count: 0 },
  { number: 25, title: "固体的能带理论基础", count: 0 },
  { number: 26, title: "广义相对论 天体物理与宇宙学简介", count: 0 },
] as const;
export const physicsDemos = [
  {
    slug: "field-superposition",
    title: "电场 · 两支箭头怎样相加",
    method: "从场源到场点，再到试验电荷",
    description: "比较同号与异号电荷，逐步画出每项贡献、投影与矢量和。",
    tag: "库仑定律 · 矢量叠加 · 受力",
  },
  {
    slug: "finite-rod",
    title: "有限长直杆 · 微元积分",
    method: "从一小段电荷到整根杆",
    description: "固定观察点，逐段比较距离与贡献。让离散求和逐渐接近积分。",
    tag: "微元 · 方向 · 误差",
  },
  {
    slug: "gauss-sphere",
    title: "球对称分布 · 高斯定理",
    method: "让高斯面穿过不同区域",
    description: "对照实心球、厚球层与理想球面，分清包围电荷、场强和电势。",
    tag: "对称 · 分段 · 边界",
  },
  {
    slug: "flux-angle",
    title: "电通量 · 为什么要乘cosθ",
    method: "从面法线到净通量",
    description: "旋转一个面观察投影，再看封闭盒子中流入与流出的抵消。",
    tag: "法线 · 投影 · 净通量",
  },
  {
    slug: "potential-slope",
    title: "电势曲线 · 从斜率得到电场",
    method: "从圆环电势到负梯度与功",
    description: "把割线收向切线，解释电场的负号；对比零点改变、圆环与圆环形薄板。",
    tag: "电势 · 负梯度 · 电场力做功",
  },
] as const;
export const physicsRoutes = [
  physicsBase,
  physicsBase + "/chapter-15",
  physicsBase + "/chapter-15/capacitor",
  `${physicsBase}/chapter-14`,
  ...physicsDemos.map((d) => `${physicsBase}/chapter-14/${d.slug}`),
];
