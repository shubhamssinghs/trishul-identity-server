import {
  AlertBox,
  Button,
  ButtonGroup,
  Form,
  Input,
  SSOButton,
} from "@components";
import { useAsyncService } from "@hooks";
import {
  authServiceInstance,
  tokenServiceInstance,
  type LoginPayload,
  type LoginResponse,
} from "@services";
import { useEffect } from "react";

const loginSchema = {
  email: {
    required: true,
    pattern: /^\S+@\S+\.\S+$/,
    errorMessage: "Please enter a valid email address",
  },
  password: {
    required: true,
    minLength: 6,
    errorMessage: "Password must be at least 6 characters",
  },
};

export const Login = () => {
  const { execute, error, response, isLoading } = useAsyncService<
    LoginResponse,
    LoginPayload
  >((payload) => authServiceInstance.login(payload), false);

  const handleSubmit = async (values: Record<string, unknown>) => {
    await execute(values as LoginPayload, true);
  };

  useEffect(() => {
    if (response) {
      tokenServiceInstance.accessToken = response.accessToken;
      tokenServiceInstance.refreshToken = response.refreshToken;

      window.location.href = "/";
    }
  }, [response]);

  return (
    <>
      <h1 className="font-semibold text-text dark:text-text-dark mx-auto text-center text-lg">
        Login in to continue
      </h1>
      <AlertBox message={error?.error} variant="error" className="mt-4" />
      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        schema={loginSchema}
        className="flex flex-col gap-2 mt-4"
      >
        <Input
          name="email"
          type="email"
          placeholder="Enter your email"
          disabled={isLoading}
        />
        <Input
          name="password"
          type="password"
          placeholder="Enter your password"
          disabled={isLoading}
        />
        <Button type="submit" className="mt-3" disabled={isLoading}>
          Log In
        </Button>
      </Form>
      <div className="my-4 text-center text-text-muted dark:text-text-muted_dark text-sm font-semibold">
        Or continue with
      </div>
      <ButtonGroup className="w-full mb-4">
        <SSOButton
          provider="google"
          data-tooltip-content="Sign in with google"
        />
        <SSOButton
          provider="github"
          data-tooltip-content="Sign in with github"
        />
        <SSOButton
          provider="facebook"
          data-tooltip-content="Sign in with facebook"
        />
        <SSOButton provider="apple" data-tooltip-content="Sign in with apple" />
        <SSOButton
          provider="microsoft"
          data-tooltip-content="Sign in with microsoft"
        />
      </ButtonGroup>
    </>
  );
};
