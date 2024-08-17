import SignInForm from "@/containers/auth-page/signInForm";
export default function SignInPage() {
  return (
    <div className=" flex w-full h-screen items-center justify-center gap-8">
      <div className="w-[40%]">
        <h1 className="text-5xl font-bold">Jewelry Sales System</h1>
        <p className="text-2xl">
          Welcome to the Jewelry Sales System. Please sign in to continue.
        </p>
      </div>
      <SignInForm />
    </div>
  );
}
