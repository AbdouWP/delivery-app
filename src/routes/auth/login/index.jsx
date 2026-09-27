import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Field,
  FieldLegend,
  FieldContent,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

import { EyeClosedIcon, EyeIcon } from "@phosphor-icons/react";

import * as z from "zod";

import { Form } from "../../-components/form";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { validator } from "../../../lib/utils";
import { useUser } from "../../../store";

export const Route = createFileRoute("/auth/login/")({
  component: AuthLogin,
});

const defaultValues = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [canView, setCanView] = useState(false);
  const setToken = useUser((state) => state.setToken);
  const setUser = useUser((state) => state.setUser);

  const [validators] = useState({
    email: z.email("This input must be a valid email"),
    password: z
      .string()
      .min(8, "Password is too short")
      .regex(/\d/, "Password must have 1 number at least")
      .regex(/[A-Z]/, "Password must have 1 uppercase letter at least")
      .regex(/[@#\-_%^:,;|\/?.<>&]/, "Password must include 1 symbol at least"),
  });

  const navigate = useNavigate();

  const login = (user) => {
    setToken("12345678");
    setUser(user);
    navigate({ to: "/" });
  };

  const form = useForm({
    defaultValues,
    onSubmit: ({ value }) => login(value),
  });

  return (
    <>
      <Form method="post" form={form} onSubmit={() => setIsSubmit(true)}>
        <FieldLegend className="text-center text-muted-foreground">
          Sign in to your account to manage your workspace and preferences
        </FieldLegend>
        <FieldContent className="gap-3">
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) => validator(validators.email, value),
              }}
              children={(field) => (
                <>
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type={"email"}
                    id={"email"}
                    placeholder={"johndoe@example.com"}
                    aria-invalid={!field.state.meta.isValid}
                    aria-valid={field.state.meta.isValid}
                    autoFocus
                  />
                  {!field.state.meta.isValid && (
                    <FieldError>
                      {field.state.meta.errors.join(", ")}
                    </FieldError>
                  )}
                </>
              )}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <InputGroup>
              <form.Field
                name="password"
                validators={{
                  onChange: ({ value }) =>
                    validator(validators.password, value),
                }}

                children={(field) => (
                  <>
                    <InputGroupInput
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type={canView ? "text" : "password"}
                      id={"password"}
                      placeholder={"Enter your password"}
                      aria-invalid={!field.state.meta.isValid}
                      aria-valid={field.state.meta.isValid}
                    />
                    {!field.state.meta.isValid && (
                      <FieldError>
                        {field.state.meta.errors.join(", ")}
                      </FieldError>
                    )}
                  </>
                )}
              />
              <InputGroupButton onClick={() => setCanView((prev) => !prev)}>
                {!canView ? <EyeIcon /> : <EyeClosedIcon />}
              </InputGroupButton>
            </InputGroup>
          </Field>
        </FieldContent>
        <Button type="submit" size="xl">
          Submit
        </Button>
      </Form>
      <p className="text-center text-sm text-muted-foreground">
        You don't have an account ?{" "}
        <Link to="/auth/register" className="text-foreground hover:underline">
          Sign up
        </Link>
      </p>
      <Separator />
    </>
  );
}
