import { Meta, StoryObj } from "@storybook/react/*";
import LoginForm from "./LoginForm";

const meta: Meta<typeof LoginForm> = {
  component: LoginForm,
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

export const firstStory: Story = {
  args: {},
};
