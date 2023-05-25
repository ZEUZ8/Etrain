import * as yup from "yup"

export const classCreationSchema = yup.object().shape({
    className: yup
        .number('Not a Valid Class')
        .positive()
        .integer()
        .max(4,"Not a Valid Class")
        .required('Required'),    
    division:yup
        .string()
        .max(1,"Not Valid")
        .required("Required")
        .test("is-string", "Input must be a string", (value) => {
            return typeof value === "string";
          }),
    classTeacher:yup
        .string()
        .min(5,"should contain 5-16 charecters")
        .max(16,"should contain 5-16 charecters"),
    maxStudents: yup
        .number('Must be a Number')
        .positive()
        .integer()
        .max(100, 'Not Valid')
        .required('Required'),      
})
