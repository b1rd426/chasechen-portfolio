import "katex/dist/katex.min.css";
import "@/components/physics/physics.css";
export default function PhysicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="physics-project">{children}</div>;
}
