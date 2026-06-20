import { cn } from "@/lib/utils";

type GlassPanelProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "section" | "article";
};

export function GlassPanel({
  className,
  as: Comp = "div",
  children,
  ...props
}: GlassPanelProps) {
  return (
    <Comp
      className={cn(
        "rounded-2xl border border-black/6 bg-white text-[#1d1d1f] shadow-[0_2px_20px_rgba(0,0,0,0.06)]",
        "dark:border-white/8 dark:bg-[#1c1c1e] dark:text-[#f5f5f7] dark:shadow-none",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
