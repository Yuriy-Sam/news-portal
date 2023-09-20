import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Create Your Perfect Article - Scope",
};
function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
export default AuthLayout;
