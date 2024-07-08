import { Meta, StoryObj } from "@storybook/react";
import Loading from "./Loading";
import React from "react";

const meta: Meta<typeof Loading> = {
  component: Loading,
};

export default meta;

type Story = StoryObj<typeof Loading>;

export const HomeScreenLoader: Story = {
  args: {
    type: "homeScreen",
  },
  render: (args) => {
    return <Loading type={args.type} />;
  },
};
