/**
 * Represents the difference sizes aviable for the Button component.
 *
 * @typedef {'large' | 'medium' | 'small'} ButtonSize
 * @property {'large'} LARGE - Large size button
 * @property {'medium'} MEDIUM - Medium size button (default)
 * @property {'small'} SMALL - Small size button
 */

export type ButtonSize = "large" | "medium" | "small";

/**
 * Represents the different visual styles (variants) available for the Button component.
 *
 * @typedef {'primary' | 'secondary' | 'danger' | 'link' | 'social' | 'tertiary'} ButtonVariant
 * @property {'primary'} PRIMARY - The main call-to-action button (default).
 * @property {'secondary'} SECONDARY - A less prominent action button.
 * @property {'danger'} DANGER - Used for destructive actions.
 * @property {'link'} LINK - Styled as a hyperlink.
 * @property {'social'} SOCIAL - Used for social actions (like, share, etc.).
 * @property {'tertiary'} TERTIARY - Minimal styling, for less important actions.
 * @property {'navBtn'} NAVBTN - Strictly Nav styling only.
 */

export type ButtonVarient =
  | "danger"
  | "primary"
  | "social"
  | "secondary"
  | "link"
  | "tertiary"
  | "navBtn"
  | "null"; // ???

/**
 * Represents the different roles of button available for the Button component.
 *
 * @typedef {'button' | 'reset' | "submit"} ButtonType
 * @property {'button'} BUTTON - A standard button that triggers a function when clicked (default)
 * @property {'reset'} RESET -  Resets the values of all form elements within nearest parent '<form>'.
 * @property {'submit'} SUBMIT - Submites the form data to server when clicked.
 */

export type ButtonType = "button" | "reset" | "submit";
