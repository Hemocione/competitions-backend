export default function getValue<T>(value: any, defaultValue: T): T {
  if (typeof value === 'undefined') {
    return defaultValue
  }
  return value
}
