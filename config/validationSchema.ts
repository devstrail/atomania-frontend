import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .required('This field is required'),
    password: Yup.string()
        .required('Password is required'),
});

export const signUpSchema = Yup.object().shape({
    phone: Yup.string()
        .required('Phone number is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    name: Yup.string()
        .required('Full name is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 8 characters')
        .required('Password is required'),
    password_confirmation: Yup.string()
        .when('password', {
            is: (password) => password && password.length > 0,
            then: (schema) => schema
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required('Confirm password is required'),
            otherwise: (schema) => schema.notRequired(),
        }),
});

export const profileSchema = Yup.object().shape({
    phone: Yup.string()
        .required('Phone number is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    full_name: Yup.string()
        .required('Full name is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 8 characters')
        .required('Password is required'),
});

export const contactSchema = Yup.object().shape({
    first_name: Yup.string()
        .required('First name is required'),
    last_name: Yup.string()
        .required('Last name is required'),
    email: Yup.string()
        .required('Email name is required'),
    message: Yup.string()
        .required('Message name is required'),
});

export const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required'),
});

export const resetPasswordSchema = Yup.object().shape({
    password: Yup.string()
        .required('Password is required'),
    password_confirmation: Yup.string()
        .required('Please retype password'),
});

export const phoneSchema = Yup.object().shape({
    phone: Yup.string()
        .required('Please enter your phone number to get started'),
});

export const subscriptionSchema = Yup.object().shape({
    email: Yup.string()
        .required('Please enter your email'),
});