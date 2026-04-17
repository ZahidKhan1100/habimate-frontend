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
        "rounded-3xl border border-slate-200/80 bg-white/85 text-slate-900 shadow-xl backdrop-blur-[15px]",
        "dark:border-white/10 dark:bg-slate-900/40 dark:text-slate-100",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
