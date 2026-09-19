import type { Metadata } from "next";
import { FieldSuperpositionDemo } from "@/components/physics/field-superposition";
import { DemoShell } from "@/components/physics/shared";
export const metadata:Metadata={title:"电场：两支箭头怎样相加",alternates:{canonical:"/projects/university-physics/chapter-14/field-superposition"}};
export default function Page(){return <DemoShell title="电场：两支箭头怎样相加" description="先在同一点画出每个电荷的贡献，再把箭头首尾相接。最后放入正、负试验电荷，区分电场与受力。" footnote="真空静止点电荷，SI单位。蓝/紫识别两个场源及各自的贡献；绿色为合场，金色为场点。播放表示作图顺序。"><FieldSuperpositionDemo/></DemoShell>;}
