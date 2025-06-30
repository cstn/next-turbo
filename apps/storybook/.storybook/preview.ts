import type { Preview } from "@storybook/nextjs";
import withIntlDecorator, { globalTypes as intlGlobalTypes } from './withIntlDecorator';
import withThemeDecorator, { globalTypes as themeGlobalTypes } from "./withThemeDecorator";
import "@cstn/ui/styles/globals.css";

const preview: Preview = {
  globalTypes: { ...intlGlobalTypes, ...themeGlobalTypes },
  initialGlobals: {
    theme: "light",
    locale: "en",
  },
  decorators: [withIntlDecorator, withThemeDecorator],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      codePanel: true,
    },
  },
};

export default preview;
