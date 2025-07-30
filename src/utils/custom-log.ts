export const log = {
  info: (args: any[]) => console.log("%c[INFO]", "color: green;", args),
  warn: (args: any[]) => console.warn("%c[WARN]", "color: orange;", args),
  error: (args: any[]) => console.error("%c[ERROR]", "color: red;", args),
};
