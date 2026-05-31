import { Container } from "@/components/container";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 pb-14 pt-14 sm:pb-16 sm:pt-16">
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-cyan-300/15 blur-3xl" />
      <Container className="relative">
        <p className="text-sm font-semibold text-cyan-200">
          {eyebrow}
        </p>
        <h1 className="text-balance mt-4 max-w-3xl text-4xl font-semibold text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
          {description}
        </p>
      </Container>
    </section>
  );
}
