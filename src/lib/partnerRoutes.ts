/** Routes that use partner dashboard chrome (navbar, sidebar, no marketing footer). */
export function isPartnerAppRoute(pathname: string): boolean {
  return (
    pathname.startsWith("/partner-dashboard") || pathname.startsWith("/add-lead")
  );
}
