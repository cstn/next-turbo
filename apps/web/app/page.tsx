import { Button } from '@cstn/ui/components/button';
import ModeToggle from '@cstn/ui/components/mode-toggle';
import { LoginForm } from '@cstn/ui/components/login-form';

export const Home = () =>
  (
    <main className="p-24">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Button>Open alert</Button>

        <LoginForm onSubmit={() => {}} />

        <ModeToggle/>
      </div>
    </main>
  );
