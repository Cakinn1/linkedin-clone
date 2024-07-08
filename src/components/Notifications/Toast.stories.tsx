import { StoryObj, Meta } from "@storybook/react/*";
import Toast from "./Toast";
import { useDispatch } from "react-redux";
import { openAndCloseToast } from "../../store/toastSlice";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  argTypes: {
    messageType: {
      control: { type: "select", options: ["success", "error"] },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Toast>;

/**
 * Story: ErrorToastSimulation
 *
 * This story simulates an error scenario in the application an error
 * toast is displayed to the user
 */

export const ErrorToastSimulation: Story = {
  args: {
    messageType: "error",
  },
  render: (args) => {
    const dispatch = useDispatch();
    const { messageType } = args;
    const handleOpenErrorToast = () => dispatch(openAndCloseToast(true));

    return (
      <>
        {/* NOTE: currently isOpen (state to check toast in DOM) is being checked inside toast component,
            This is why two states are needed for animation and needs to get
            updated. (this goes for all of them)
         */}
        <button onClick={handleOpenErrorToast}>Simulate Error</button>
        <Toast messageType={messageType} />
      </>
    );
  },
};

/**
 * Story: SuccessToastSimulation
 *
 * This story simulates a success scenario in the application a success
 * toast is displayed to the user
 */

export const SuccessToastSimulation: Story = {
  args: {
    messageType: "success",
  },
  render: (args) => {
    const { messageType } = args;
    const dispatch = useDispatch();

    const handleOpenSuccessToast = () => dispatch(openAndCloseToast(true));

    return (
      <>
        <button onClick={handleOpenSuccessToast}>Simulate Success</button>
        <Toast messageType={messageType} />
      </>
    );
  },
};

/**
 * Story: ToastWithoutProgressBar
 *
 * This story displays a toast with the progress bar hidden.
 */

export const ToastWithoutProgressBar: Story = {
  args: {
    hideProgressBar: true,
    messageType: "success",
    autoClose: false,
  },
  render: (args) => {
    const { messageType, hideProgressBar, autoClose } = args;

    const dispatch = useDispatch();

    const handleOpenToastWithoutProgressBar = () =>
      dispatch(openAndCloseToast(true));

    return (
      <>
        <button onClick={handleOpenToastWithoutProgressBar}>
          Simulate toast without progress bar
        </button>
        <Toast
          messageType={messageType}
          autoClose={autoClose}
          hideProgressBar={hideProgressBar}
        />
      </>
    );
  },
};

/**
 * Story: ManualCloseToast
 *
 * User gets prompted with toast then can click (close button) to close
 * Toast before progress is 0
 *
 * Notes:
 * - Only works if toast is first opened
 * - Doesnt play animation since animation content is located in Toast component
 */

export const ManualCloseToast: Story = {
  args: {
    messageType: "success",
  },
  render: (args) => {
    const { messageType } = args;
    const dispatch = useDispatch();

    const openToastManually = () => dispatch(openAndCloseToast(true));
    const closeToastManually = () => dispatch(openAndCloseToast(false));

    return (
      <>
        <button className="w-full mb-10" onClick={openToastManually}>
          Open Toast
        </button>
        <button className="w-full" onClick={closeToastManually}>
          Close Toast
        </button>
        <Toast messageType={messageType} />
      </>
    );
  },
};

/**
 * Story: ToastWithoutAutoClose
 *
 * Simulates a toast that requires manual closure via the close button (X)
 *
 * Note: The progress bar is automatically hidden when autoClose is false.
 */

export const ToastWithoutAutoClose: Story = {
  args: {
    messageType: "success",
    autoClose: false,
  },
  render: (args) => {
    const { messageType, autoClose } = args;
    const dispatch = useDispatch();

    const handleOpenToast = () => dispatch(openAndCloseToast(true));
    return (
      <>
        <button onClick={handleOpenToast}>open toast</button>
        <Toast messageType={messageType} autoClose={autoClose} />
      </>
    );
  },
};
