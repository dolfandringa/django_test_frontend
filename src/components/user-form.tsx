import React, { useState, ChangeEvent } from "react";
import { Form, InputOnChangeData } from "semantic-ui-react";

interface FormProps {
  onChange: (email: string, password: string) => void;
}

export const UserForm = (props: FormProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleChange = (
    _: ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    console.log("Changing data", data);
    if (data.email) {
      setEmail(email);
    }
    if (data.password) {
      setPassword(password);
    }
  };

  const handleSubmit = () => {
    props.onChange(email, password);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        onChange={handleChange}
        icon="at"
        label="Email"
        placeholder="test@test.com"
      />

      <Form.Input onChange={handleChange} label="Password" type="password" />
      <Form.Button>Submit</Form.Button>
    </Form>
  );
};
