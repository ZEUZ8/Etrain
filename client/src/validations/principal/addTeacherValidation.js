import * as yup from "yup"

export const addTeacherValidation = yup.object().shape({
    teacherName:yup
        .string()
        .min(2,'must 2 charecters')
        .max(20)
        .matches(/^[a-zA-Z\s]+$/, 'Only alphabets')
        .required('Required'),
    teacherSubject:yup
        .string()
        .min(2,'must 2 charecters')
        .max(20)
        .required('Required'), 
    teacherEmail: yup
        .string()
        .email('Enter a valid email')
        .required('Required'),    
})
