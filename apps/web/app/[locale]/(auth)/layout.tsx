import { FC, PropsWithChildren } from 'react';

const AuthLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className="container md:w-6/12 lg:w-4/12 my-8 mx-auto flex flex-col">{children}</div>
);

export default AuthLayout;
