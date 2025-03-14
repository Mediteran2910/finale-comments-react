export default function classNames(
  base: string,
  cls: Record<string, string | boolean | null | undefined>,
  raws?: string,
): string {
  const has = Object.entries(cls)
    .filter(([, is]) => is)
    .map((cls) => `${base}-${cls}`);

  has.push(base);
  if (raws) has.push(raws);

  return has.join(" ");
}
