import { AuthPage } from "@/components/auth/AuthPage";
export const metadata = { title: "Sign In" };
/** Sign-in screen uses the shared auth layout and adapter-backed submission. */
export default function Page() {
  return <AuthPage mode="login" />;
}
