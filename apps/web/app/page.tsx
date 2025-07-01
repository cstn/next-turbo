import { Button } from '@cstn/ui/components/button';
import ModeToggle from '@cstn/ui/components/mode-toggle';

const Home = () =>
  (
    <main className="p-24">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Button>Button</Button>

        <ModeToggle/>
      </div>
    </main>
  );

export default Home;
