/**
 * Defines the possible position for a toast notification on the screen.
 * 
 * @typedef {'bottom-right' | 'bottom-left' | 'top-left' | "top-right"} ToastPosition
 * @property {'bottom-right'} BOTTOM_RIGHT - Positions the toast at bottom right of the screen (default).
 * @property {'bottom-left'} BOTTOM_LEFT - Positions the toast at bottom left of the screen. 
 * @property {'top-right'} TOP_RIGHT - Positions the toast at top right of the screen. 
 * @property {'top-left'} TOP_LEFT - Positions the toast at top left of the screen. 
 */

export type ToastPosition =
  | "bottom-right"
  | "bottom-left"
  | "top-left"
  | "top-right";


/**
 * Defines the types of messages a Toast notification can display.
 * 
 * @typedef {'error' | 'success'} ToastMessageType
 * @property {'error'} ERROR - Indicates an error message.
 * @property {'success'} SUCCESS - Indicates a success message.
 */

export type ToastMessageType = "error" | "success";
