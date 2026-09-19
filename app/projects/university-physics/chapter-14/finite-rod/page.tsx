import type { Metadata } from "next";
import { FiniteRodDemo } from "@/components/physics/finite-rod";
import { DemoShell } from "@/components/physics/shared";
export const metadata: Metadata = {
  title: "有限长直杆：微元积分",
  alternates: {
    canonical: "/projects/university-physics/chapter-14/finite-rod",
  },
};
export default function Page() {
  return (
    <DemoShell
      title="有限长直杆：微元积分"
      description="从选取一个电荷微元，到比较离散求和与解析积分。"
    >
      <FiniteRodDemo />
    </DemoShell>
  );
}
