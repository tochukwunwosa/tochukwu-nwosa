export function track(event: string, data?: Record<string, any>) {
  if (typeof window !== "undefined" && (window as any).umami) {
    (window as any).umami.track(event, data);
  }
}
