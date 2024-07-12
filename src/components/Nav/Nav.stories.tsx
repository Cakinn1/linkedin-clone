import { Meta, StoryObj } from "@storybook/react/*";
import Nav from "./Nav";

const meta: Meta<typeof Nav> = {
  component: Nav,
};

export default meta;

type Story = StoryObj<typeof Nav>;

export const NavStory: Story = {
  args: {},
  render: (args) => {


    return (
      <div className="h-[400vh]">
        <Nav />
      </div>
    )
  },
};
