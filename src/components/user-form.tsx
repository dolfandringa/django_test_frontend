import React, { useState, ChangeEvent } from "react";
import { Form, Message, InputOnChangeData } from "semantic-ui-react";

interface FormProps {
  onChange: (email: string, password: string) => void;
  error?: string;
}

export const UserForm = (props: FormProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  let error = false;
  if (props.error) {
    error = true;
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    if (data.name == "email") {
      setEmail(data.value);
    } else if (data.name == "password") {
      setPassword(data.value);
    }
  };

  const handleSubmit = () => {
    props.onChange(email, password);
  };
  return (
    <Form error={error} onSubmit={handleSubmit}>
      <Form.Input
        name="email"
        onChange={handleChange}
        icon="at"
        label="Email"
        placeholder="test@test.com"
      />
      <Message error>{props.error}</Message>
      <Form.Input
        name="password"
        onChange={handleChange}
        label="Password"
        type="password"
      />
      <Form.Button>Submit</Form.Button>
    </Form>
  );
};
