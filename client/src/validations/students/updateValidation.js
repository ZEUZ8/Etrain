import * as yup from "yup";

export const userUpdation = yup.object().shape({
    name:yup
        .string()
        .min(2,'Name must be atleast 2 charecters')
        .max(20)
        .matches(/^[a-zA-Z\s]+$/, 'Only alphabets are allowed')
        .required('Required'),
    phone:yup
        .number('Phone number must be a 10 digit number')
        .positive()
        .integer()
        .test('len', 'Phone number should be a 10 digit number', val => /^\d{10}$/.test(val))
        .required('Required'),  
    password: yup
        .string()
        .min(5, 'Must Conatain 5-16')
        .max(16, 'Only Conatain 5-16 '),
        // .matches(passwordRule, 'Please create a stronger password'),
    email: yup
        .string()
        .email('Please enter a valid email')
        .required('Required'),

})