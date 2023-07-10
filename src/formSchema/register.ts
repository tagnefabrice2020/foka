import * as yup from "yup";

export const RegisterSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(20).required(),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export type RegisterType = {
  name: string;
  email: string;
  password: string;
};

