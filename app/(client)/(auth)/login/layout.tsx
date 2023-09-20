import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login to Your Account - Scope",
};
function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
export default AuthLayout;
