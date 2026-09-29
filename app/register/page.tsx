import { AuthPage } from "@/components/auth/AuthPage";
export const metadata = { title: "Create an Account" };
/** Registration shares styling and feedback conventions with sign-in. */
export default function Page() {
  return <AuthPage mode="register" />;
}
