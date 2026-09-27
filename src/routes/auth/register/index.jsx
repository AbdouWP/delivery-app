import { EyeClosedIcon, EyeIcon } from "@phosphor-icons/react";
import { createFileRoute, Link } from "@tanstack/react-router";

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

import * as z from "zod";

import { Form } from "../../-components/form";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { validator } from "../../../lib/utils";

export const Route = createFileRoute("/auth/register/")({
  component: AuthRegister,
});

const defaultValues = {
  username: "",
  email: "",
  password: "",
  confirm_password: "",
};

function AuthRegister() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [canView, setCanView] = useState(false);
  const [passwordValue, setPasswordValue] = useState(null);
  const [validators] = useState({
    username: z
      .string()
      .min(6, "Username is too short")
      .max(24, "Username is too long"),
    email: z.email("This input must be a valid email"),
    password: z
      .string()
      .min(8, "Password is too short")
      .regex(/\d/, "Password must have 1 number at least")
      .regex(/[A-Z]/, "Password must have 1 uppercase letter at least")
      .regex(/[@#\-_%^:,;|\/?.<>&]/, "Password must include 1 symbol at least"),
  });

  const form = useForm({
    defaultValues,
    onSubmit: ({ value }) => console.log(value),
  });

  return (
    <>
      <Form method="post" form={form} onSubmit={() => setIsSubmit(true)}>
        <FieldLegend className="text-center text-muted-foreground">
          Get started in minutes by entering your registration details below
        </FieldLegend>
        <FieldContent className="gap-3">
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <form.Field
              name="username"
              validators={{
                onChange: ({ value }) => validator(validators.username, value),
              }}
              children={(field) => (
                <>
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type={"username"}
                    id={"username"}
                    placeholder={"Enter your username"}
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
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                        setPasswordValue(e.target.value);
                      }}
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
          <Field>
            <FieldLabel htmlFor="confirm_password">Confirm password</FieldLabel>
            <InputGroup>
              <form.Field
                name="confirm_password"
                validators={{
                  onChange: ({ value }) =>
                    passwordValue !== value &&
                    "Confirm password doesn't match the password",
                }}
                children={(field) => (
                  <>
                    <InputGroupInput
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type={canView ? "text" : "password"}
                      id={"confirm_password"}
                      placeholder={"Confirm your password"}
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
        <Button type="submit">Submit</Button>
      </Form>
      <p className="text-center text-sm text-muted-foreground">
        You have an account ?{" "}
        <Link to="/auth/login" className="text-foreground hover:underline">
          Login
        </Link>
      </p>
      <Separator />
    </>
  );
}
