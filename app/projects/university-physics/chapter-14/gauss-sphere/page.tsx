import type { Metadata } from "next";
import { GaussSphereDemo } from "@/components/physics/gauss-sphere";
import { DemoShell } from "@/components/physics/shared";
export const metadata: Metadata = {
  title: "球对称分布：高斯定理",
  alternates: {
    canonical: "/projects/university-physics/chapter-14/gauss-sphere",
  },
};
export default function Page() {
  return (
    <DemoShell
      title="球对称分布：高斯定理"
      description="移动高斯面，观察包围电荷、通量、场强和电势如何共同变化。"
    >
      <GaussSphereDemo />
    </DemoShell>
  );
}
