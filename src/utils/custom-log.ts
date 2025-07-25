export const log = {
  info: (args: string) => console.log("%c[INFO]", "color: green;", args),
  warn: (args: string) => console.warn("%c[WARN]", "color: orange;", args),
  error: (args: string) => console.error("%c[ERROR]", "color: red;", args),
};
