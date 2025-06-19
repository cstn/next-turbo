import type { Preview } from "@storybook/nextjs";
import withThemeDecorator, { globalTypes as themeGlobalTypes } from "./withThemeDecorator";
import "@cstn/ui/styles/globals.css";

const preview: Preview = {
  globalTypes: { ...themeGlobalTypes },
  initialGlobals: {
    theme: "light",
  },
  decorators: [withThemeDecorator],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
