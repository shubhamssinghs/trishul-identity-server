import { Button, Form, Input, Textarea } from "@components";
import type { ValidationSchema } from "@types";

interface AddOrEditClientFormProps {
  isReadOnly?: boolean;
  isLoading?: boolean;
  onSubmit?: (values: Record<string, unknown>) => void;
}

const clientFormSchema: ValidationSchema = {
  name: { required: true },
  support_email: { required: true, email: true, name: "Support email" },
};

export const AddOrEditClientForm = ({
  isReadOnly = false,
  isLoading = false,
  onSubmit,
}: AddOrEditClientFormProps) => {
  const formFields = {
    name: "",
    descriptions: "",
    logo_utl: "",
    theme_color: "#000000",
    support_email: "",
    created_by: "",
  };

  const handleFormSubmit = (values: Record<string, unknown>) => {
    if (isReadOnly) return;
    onSubmit?.(values);
  };

  return (
    <Form
      initialValues={formFields}
      schema={clientFormSchema}
      onSubmit={handleFormSubmit}
      className="grid gap-4 sm:grid-cols-1"
      validateOn="blur"
    >
      <Input
        name="name"
        label="Name"
        type="text"
        placeholder="Enter the client's name"
        readOnly={isReadOnly}
        disabled={isLoading}
      />

      <Textarea
        name="descriptions"
        label="Description"
        placeholder="Write a brief description about the client"
        readOnly={isReadOnly}
        disabled={isLoading}
      />

      <Input
        name="logo_utl"
        label="Logo URL"
        type="text"
        placeholder="Paste the logo image URL (e.g., https://...)"
        readOnly={isReadOnly}
        disabled={isLoading}
      />

      <Input
        name="theme_color"
        label="Theme Color"
        type="color"
        placeholder="Choose a theme color"
        disabled={isLoading || isReadOnly}
      />

      <Input
        name="support_email"
        type="email"
        label="Support Email"
        placeholder="Enter a support contact email"
        readOnly={isReadOnly}
        disabled={isLoading}
      />

      <Button
        className={`w-32 ml-auto ${isReadOnly && "hidden"}`}
        type="submit"
        disabled={isLoading}
      >
        Submit
      </Button>
    </Form>
  );
};
