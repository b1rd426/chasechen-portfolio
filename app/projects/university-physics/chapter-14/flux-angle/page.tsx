import type { Metadata } from "next";
import { FluxAngleDemo } from "@/components/physics/flux-angle";
import { DemoShell } from "@/components/physics/shared";
export const metadata:Metadata={title:"电通量：为什么要乘cosθ",alternates:{canonical:"/projects/university-physics/chapter-14/flux-angle"}};
export default function Page(){return <DemoShell title="电通量：为什么要乘cosθ" description="旋转一个面，看有效投影与正负号；再把面闭合成盒子，区分净通量与局部场强。"><FluxAngleDemo/></DemoShell>;}
