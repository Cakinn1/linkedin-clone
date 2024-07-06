import type { Preview } from "@storybook/react";
import { Provider } from "react-redux";
import { store } from "../src/store/index";
import "../src/global.css";
import React from "react";

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <Story />
    </Provider>
  ),
];

const preview: Preview = {
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
