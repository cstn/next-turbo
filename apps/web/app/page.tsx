import { Button } from "@cstn/ui/components/button";
import ModeToggle from "@cstn/ui/components/mode-toggle";
import { LoginForm } from "@cstn/ui/components/login-form";

export default function Home() {
  const usernameProps = {
    label: "Username",
    placeholder: "Enter your username",
    description: "This is your unique username for login.",
  };
  const passwordProps = {
    label: "Password",
    placeholder: "Enter your password",
    description: "This is your secure password for login.",
  };
  return (
    <main className="p-24">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Button>Open alert</Button>

        <LoginForm username={usernameProps} password={passwordProps} />

        <ModeToggle />
      </div>
    </main>
  );
}
