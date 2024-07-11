import { Meta, StoryObj } from "@storybook/react";
import Loading from "./Loading";

// weird but the options are not coming up on the stories??

const meta: Meta<typeof Loading> = {
  component: Loading,
  argTypes: {
    spinnerColor: {
      control: { type: "select", options: ["gray", "yellow", "green"] },
    },
    type: {
      control: { type: "select", options: ["homeScreen", "skeleton"] },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Loading>;

/**
 * Story: HomeScreenLoader
 *
 * Simulates the home screen loading state.
 */

export const HomeScreenLoader: Story = {
  args: {
    type: "homeScreen",
  },
  render: (args) => {
    return <Loading type={args.type} />;
  },
};

/**
 * Story: SkeletonLoader
 *
 * Simulates the loading state of a profile card, displaying a skeleton placeholder.
 */

export const SkeletonLoader: Story = {
  args: {
    type: "skeleton",
  },

  render: (args) => {
    return <Loading type={args.type} />;
  },
};

/**
 * Story: SpinnerLoader
 *
 * Simulates Spinner loading indicator with color set to green.
 */

export const SpinnerLoader: Story = {
  args: {
    type: "spinner",
    spinnerColor: "green",
  },
  parameters: {
    layout: "centered",
  },
  render: (args) => {
    return <Loading spinnerColor={args.spinnerColor} type={args.type} />;
  },
};
