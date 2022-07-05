export type Parts = any[]

export function concatenate(...parts: Parts): string {
  return parts
    .filter((p) => !!p)
    .map((p) => (Array.isArray(p) ? concatenate(...p) : p))
    .join("\n")
}

export function block(...parts: Parts) {
  return ["{", ...parts, "}"]
}

export function statement(...parts: Parts) {
  return [...parts, ";"]
}

export function assignment(name: string, value: string) {
  return statement(`${name} = ${value}`)
}
