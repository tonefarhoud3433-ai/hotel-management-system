import * as yup from 'yup';

export const registerSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Must be only digits'),
  country: yup
    .string()
    .required('Country is required'),
  email: yup
    .string() 
    .required('Email address is required')
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
}).required();

export const verifySchema = yup.object({
  code: yup
    .string()
    .required('OTP is required')
    .length(4, 'OTP must be 4 characters'),
  email: yup
    .string()
    .required('Email address is required')
    .email('Invalid email format'),

}).required();
export const forgetSchema = yup.object({
  email: yup
    .string()
    .required('Email address is required')
    .email('Invalid email format'),

}).required();
export const resetSchema = yup.object({
  email: yup
    .string()
    .required('Email address is required')
    .email('Invalid email format'),
  code: yup
    .string()
    .required('OTP is required')
    .length(4, 'OTP must be 4 characters'),

  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
}).required();

export const changePasswordSchema = yup.object({
  currentPassword: yup
    .string()
    .required('Current password is required'),
  newPassword: yup
    .string()
    .required('New password is required')
    .min(6, 'New password must be at least 6 characters'),
  confirmNewPassword: yup
    .string()
    .required('Please confirm your new password')
    .oneOf([yup.ref('newPassword')], 'Passwords must match'),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email address is required')
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});
export type LoginFormData = yup.InferType<typeof loginSchema>;

export type RegisterFormData = yup.InferType<typeof registerSchema>;
export type VerifySchema = yup.InferType<typeof verifySchema>;
export type ForgetSchema = yup.InferType<typeof forgetSchema>;
export type ResetSchema = yup.InferType<typeof resetSchema>;