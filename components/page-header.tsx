import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

/** Standard interior-page opener. */
export function PageHeader({ eyebrow, title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("pb-12 pt-14 md:pb-16 md:pt-20", className)}>
      <Reveal className="mx-auto max-w-[800px] px-6 text-center">
        <p className="eyebrow text-green-600">{eyebrow}</p>
        <h1 className="mt-4 text-4xl md:text-[3.75rem] md:leading-[1.08]">{title}</h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </Reveal>
    </div>
  );
}
