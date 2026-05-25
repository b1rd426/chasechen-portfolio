import { Container } from "@/components/container";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-white/50 pb-14 pt-14 sm:pb-16 sm:pt-16">
      <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-brand-100/70 blur-3xl" />
      <Container className="relative">
        <p className="text-sm font-medium tracking-wide text-brand-600">
          {eyebrow}
        </p>
        <h1 className="text-balance mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-ink-950 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
          {description}
        </p>
      </Container>
    </section>
  );
}
