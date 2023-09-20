import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Create Account and Join Us - Scope",
};
function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
export default AuthLayout;
