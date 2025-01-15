import * as Yup from "yup";

export const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Must be at least 6 characters")
    .required("Required"),
});

export const createUserSchema = Yup.object({
  username: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Must be at least 6 characters")
    .required("Required"),
  committedHoursForThisMonth: Yup.number().required("Required"),
  basicPayForThisMonth: Yup.number().required("Required"),
  role: Yup.string().required("Required"),
  type: Yup.string().required("Required"),
  joiningDate:
    Yup.string()
    .required("Required"),
});
