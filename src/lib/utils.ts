export function cn(
  ...inputs: Array<string | number | boolean | undefined | null>
): string {
  return inputs.filter((v) => typeof v === "string" && v.length > 0).join(" ");
}
