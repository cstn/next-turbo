import { FC } from 'react';

const Footer: FC = () => (
  <footer className="container mx-auto m-4 flex justify-center items-center text-sm">
    <p>Copyright &copy; {new Date().getFullYear()} Carsten Stein</p>
  </footer>
);

export default Footer;
