import { Provider } from "react-redux";
import Toast from "./Toast";
import { ToastMessageType } from "./Toast.types";
import { act, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { configureStore } from "@reduxjs/toolkit";
import toastReducer, { openAndCloseToast } from "../../store/toastSlice";

interface PreloadedStateProps {
  toast: {
    isOpen: boolean;
  };
}

/**
 *
 * Helper function to render the toast component within a redux provider.
 * @param messageType  - The type of toast message to display.
 * @param preloadedState - - The initial state of the Redux store.
 */

const renderToast = (
  messageType: ToastMessageType,
  preloadedState: PreloadedStateProps
) => {
  const store = configureStore({
    reducer: {
      toast: toastReducer,
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <Toast messageType={messageType} />
    </Provider>
  );
};

jest.useFakeTimers();
describe("Toast Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Define resuable preloaded states for open and closed toast
  const openPreloadState: PreloadedStateProps = { toast: { isOpen: true } };
  const closePreloadState: PreloadedStateProps = { toast: { isOpen: false } };

  // Test case: Renders success toast correctly
  it("renders success toast with the correct message and icon", async () => {
    renderToast("success", openPreloadState);

    // Find the elements in the rendered component
    const toastElement = await screen.findByText("Success");
    const iconElement = await screen.findByTestId("success-icon");

    // assert that elements are present
    expect(iconElement).toBeInTheDocument();
    expect(toastElement).toBeInTheDocument();
  });

  // Test case: Renders error toast correctly
  it("renders error toast with the correct message and icon", async () => {
    renderToast("error", openPreloadState);

    // Find the elements in the rendered component
    const toastElement = await screen.findByText("Error has occurred");
    const iconElement = await screen.findByTestId("error-icon");

    // assert that elements are present
    expect(iconElement).toBeInTheDocument();
    expect(toastElement).toBeInTheDocument();
  });

  // Test case: Closes
  it("Opens and closes toast based off corresponding actions", async () => {
    const store = configureStore({
      reducer: {
        toast: toastReducer,
      },
    });

    render(
      <Provider store={store}>
        <Toast messageType={"error"} />
      </Provider>
    );
    // Initially, the toast should be hidden
    expect(screen.queryByText("Error has occurred")).not.toBeInTheDocument();

    // dispatch action to open the toast
    act(() => store.dispatch(openAndCloseToast(true)));

    // wait for the toast to appear
    await waitFor(() => {
      expect(screen.getByText("Error has occurred")).toBeInTheDocument();
    });
    expect(screen.getByTestId("error-icon")).toBeInTheDocument();

    // Dispatch action to close the toast
    act(() => store.dispatch(openAndCloseToast(false)));

    // Wait for the toast to disppear
    await waitFor(() => {
      expect(screen.queryByText("Error has occurred")).toBeNull();
    });
  });
});
