import * as yup from "yup"

export const complaintValidation = yup.object().shape({
    studentName:yup
        .string()
        .min(2,'must 2 charecters')
        .max(20)
        .matches(/^[a-zA-Z\s]+$/, 'Only alphabets ')
        .required('Required'),
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
    studentClass: yup
        .number('Not a Valid Class')
        .positive()
        .integer()
        .max(4,"Not a Valid Class")
        .required('Required'),    
    studentDivision:yup
        .string()
        .max(1,"Not Valid")
        .required("Required")
        .test("is-string", "must be string", (value) => {
            return typeof value === "string";
          }),
    complaint:yup
        .string()
        .min(10,"should contain more than 10")
})
