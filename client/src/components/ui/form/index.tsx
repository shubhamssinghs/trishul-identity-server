/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import type { FormInputProps, FormProps } from "./types";
import { ValidationService } from "@services";
import { useChangeTracker, useUnsavedChangesPrompt } from "@hooks";

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  (
    {
      initialValues,
      onSubmit,
      schema = {},
      validateOn = "submit",
      children,
      ...rest
    },
    ref
  ) => {
    const [values, setValues] = useState<Record<string, any>>(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const { isDirty, reset } = useChangeTracker(values);

    useUnsavedChangesPrompt(isDirty);

    const validateValues = (vals: Record<string, any>) => {
      const validationErrors = ValidationService.validate(vals, schema);
      setErrors(validationErrors);
      return Object.keys(validationErrors).length === 0;
    };

    const handleChange = (name: string, event: any) => {
      const target = event.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      setValues((prev) => ({ ...prev, [name]: value }));

      if (
        validateOn === "change" ||
        validateOn === "keyup" ||
        validateOn === "keydown"
      ) {
        validateValues({ ...values, [name]: value });
      }
    };

    const handleBlur = () => {
      if (validateOn === "blur") {
        validateValues(values);
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateValues(values)) return;
      onSubmit(values);
      reset();
    };

    return (
      <form onSubmit={handleSubmit} ref={ref} {...rest}>
        {React.Children.map(children, (child: any) => {
          if (!React.isValidElement(child)) return child;

          const componentType = child.type;

          const getComponentName = (comp: any) => {
            if (typeof comp === "string") return comp;
            if (typeof comp === "function")
              return comp.displayName || comp.name || null;
            if (typeof comp === "object" && comp !== null)
              return comp.displayName || comp.name || null;
            return null;
          };

          const componentName = getComponentName(componentType);

          const isButton =
            componentName === "button" || componentName === "Button";
          if (isButton) {
            return React.cloneElement(child, {
              ...(child.props as Record<string, any>),
            } as any);
          }

          const typedChild = child as React.ReactElement<FormInputProps>;

          const name = typedChild.props.name;
          const isCheckbox =
            typedChild.props.type === "checkbox" ||
            componentName === "Checkbox";

          const injectedProps: Record<string, any> = {
            onChange: (e: any) => handleChange(name, e),
            onBlur: handleBlur,
            ...(isCheckbox
              ? { checked: !!values[name] }
              : { value: values[name] ?? "" }),
          };

          if (!isButton) {
            injectedProps.errorMessage = errors[name];
            injectedProps.isInvalid = !!errors[name];
          }

          return React.cloneElement(typedChild, {
            ...typedChild.props,
            ...injectedProps,
          });
        })}
      </form>
    );
  }
);
