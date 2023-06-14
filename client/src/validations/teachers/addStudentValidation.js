import * as yup from "yup"

export const addStudentValidation = yup.object().shape({
    studentName:yup
        .string()
        .min(2,'must 2 charecters')
        .max(20)
        .matches(/^[a-zA-Z\s]+$/, 'Only alphabets')
        .required('Required'),
    studentEmail: yup
        .string()
        .email('Enter a valid email')
        .required('Required'),    
    studentClass:yup
        .number()
        .positive()
        .integer()
        .required("Required"),
    studentDivision:yup
        .string()
        .matches(/^[a-zA-Z]+$/, 'Only alphabets are allowed')   
        .required("Required") 
})
