import { Link } from '@/i18n/navigation';

const Home = () =>
  (
    <main className="p-24">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Link href="/login">Log in</Link>
      </div>
    </main>
  );

export default Home;
