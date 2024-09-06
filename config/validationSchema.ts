import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    phone: Yup.string()
        .required('Phone is required'),
    password: Yup.string()
        .required('Password is required'),
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

export const staffSchema = (id) => Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
    email: Yup.string()
        .required('Email is required')
        .email(),
    password: Yup.string()
        .when('password', (val) => {
            if (id !== null) {
                return Yup.string().nullable()
            } else {
                return Yup.string().required('Password is required')
            }
        }),
},
[
    ['password', 'password']
]);

export const storeSchema = Yup.object().shape({
    store_id: Yup.string()
        .required('Store id is required'),
    staff_id: Yup.string()
        .required('Staff is required'),
    location: Yup.string()
        .required('Location is required'),
});

export const itemSchema = Yup.object().shape({
    sheet_type: Yup.string()
        .required('Sheet type is required'),
    sheet_no: Yup.string()
        .when('sheet_type', {
            is: (value) => value !== '1',
            then: () => Yup.string().required('Sheet number is required'),
            otherwise: () => Yup.string.nullable
        }),
    name: Yup.string()
        .required('Item name is required'),
    sequence: Yup.string()
        .required('Sequence is required'),
    caption: Yup.string().nullable(),
    plate_size: Yup.string()
        .required('Insert size is required'),
    insert_type: Yup.string()
        .required('Prep type is required'),
    inserts_per_case: Yup.string().nullable(),
    image: Yup.string()
        .required('Image is required'),
});

export const updateQuantitySchema = Yup.object().shape({
    update_type: Yup.string()
        .required('Update type is required'),
    number_of_days: Yup.string()
        .required('Number of days is required')
});

export const worksheetItemSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required'),
    sequence: Yup.string()
        .required('Sequence is required'),
    description: Yup.string()
        .required('Description is required')
});