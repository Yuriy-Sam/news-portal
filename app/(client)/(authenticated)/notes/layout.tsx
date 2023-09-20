import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Notes - Scope",
};
function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
export default AuthLayout;
