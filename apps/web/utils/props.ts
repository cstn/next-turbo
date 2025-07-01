export type LocaleProps = {
  params:
    | Promise<{
    locale: string,
  }>
    | { locale: string },
};

export type PropsWithStyle = {
  className?: string,
  classNames?: Record<string, string>,
};
