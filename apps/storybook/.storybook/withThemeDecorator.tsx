import { Decorator } from "@storybook/nextjs";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const WithThemeDecorator: Decorator = (Story, context) => {
  const theme = context.globals?.theme || "light";

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
      forcedTheme={theme}
      themes={["light", "dark", "neutral", "system"]}
    >
      <Story />
    </NextThemesProvider>
  );
};

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Theme for styling",
    toolbar: {
      title: "Theme",
      icon: "circlehollow",
      items: [
        { value: "light", title: "Light", icon: "sun" },
        { value: "dark", title: "Dark", icon: "moon" },
        { value: "neutral", title: "Neutral", icon: "eye" },
        { value: "system", title: "System", icon: "browser" },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
};

export default WithThemeDecorator;
