import { cn } from "@/lib/cn";
export function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const available = [
    "已完成",
    "Done",
    "MVP",
    "首版可用",
    "可用版本",
    "已发布",
  ].includes(status);
  return (
    <span
      className={cn(
        "garden-status",
        available && "garden-status-available",
        className,
      )}
    >
      <i aria-hidden="true" />
      {status}
    </span>
  );
}
