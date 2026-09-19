import type { Metadata } from "next";
import { PotentialSlopeDemo } from "@/components/physics/potential-slope";
import { DemoShell } from "@/components/physics/shared";
export const metadata:Metadata={title:"电势曲线：斜率为什么就是电场",alternates:{canonical:"/projects/university-physics/chapter-14/potential-slope"}};
export default function Page(){return <DemoShell title="电势曲线：斜率为什么就是电场" description="移动轴上场点，逐步画出电势、割线和切线。用同一条曲线解释场强、零势参考和电场力做功。" footnote="原创有限圆环与圆环形薄板模型，真空、均匀静止电荷。紫色表示电势，绿色表示切线与电场，金色标观察点。"><PotentialSlopeDemo/></DemoShell>;}
