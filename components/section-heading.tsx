type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="mb-3 text-sm font-medium tracking-wide text-brand-600">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance text-2xl font-semibold tracking-tight text-ink-950 sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 leading-7 text-slate-600">{description}</p>
      ) : null}
    </div>
  );
}
