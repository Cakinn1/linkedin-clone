import { ChangeEvent, useState } from "react";

/**
 * A custom React hook for managing form state and validation.
 *
 * @param validationSchema - An object containing validation functions for each form field.
 *   - Key: Name of the form field (matches the `name` attribute of input elements).
 *   - Value: A function that takes the field's value as input and returns a string error message
 *             if validation fails, or null otherwise.
 * @param initialValues - An object containing the initial values for each form field.
 * @returns An object containing:
 *   - handleFormChange: A function to handle changes in form input fields.
 *   - handleResetForm: A function to reset the form to initial values.
 *   - errors: An object containing validation errors for each field.
 *   - values: An object containing the current form values.
 *
 * @todo - Consider debouncing errors (e.g., show only the latest error after a delay).
 */
export default function useForm<T>(
  validationSchema: { [key in keyof T]: (value: string) => string | null },
  initialValues: T
): {
  handleFormChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleResetForm: () => void;
  errors: Partial<T>;
  values: T;
} {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<T>>({});

  /**
   * Handles changes in form input fields, updating both values and errors.
   *
   * @param e The ChangeEvent object from the input element.
   */
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;

    const keyName = name as keyof T;

    setValues((prevValues) => ({
      ...prevValues,
      [keyName]: value,
    }));

    setErrors((prevValues) => ({
      ...prevValues,
      [keyName]: validationSchema[keyName]?.(value) || null,
    }));
  };

  /**
   * Resets form to insitialValues and clears errors.
   */
  const handleResetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return { handleFormChange, handleResetForm, errors, values };
}
