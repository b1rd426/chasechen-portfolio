import type { Metadata } from "next";
import { CapacitorDemo } from "@/components/physics/capacitor";
import { DemoShell } from "@/components/physics/shared";
export const metadata: Metadata = {title:"电容器：接电源与断电源",
  alternates:{canonical:"/projects/university-physics/chapter-15/capacitor"}};
export default function Page() {return <DemoShell chapter={15} title="电容器：接电源与断电源"
  description="同一个初态，两种连接条件。让介质几何、分区电场和能量账本一起变化。"
  footnote="线性介质静电模型，SI单位。蓝色表示极板电荷，紫色表示介质，金色表示板距，绿色表示电场方向。">
  <CapacitorDemo/></DemoShell>;}
