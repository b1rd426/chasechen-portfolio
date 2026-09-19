type PageHeroProps = { eyebrow: string; title: string; description: string };

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="garden-page-hero"><div>
      <p className="garden-eyebrow"><span className="garden-red-dot" />　{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </div></section>
  );
}
