import * as yup from "yup"

export const MarksValidation = yup.object().shape({
    examName: yup
        .string()
        .min(2,'Atleast 2 charecters')
        .max(20)
        .required('Required'), 
    studentName:yup
        .string()
        .min(2,'Atleast 2 Charecter')
        .max(20,"max limits")
        .required('Required'),                
    english:yup
        .number("must be number")
        .positive()
        .integer()
        .required('Required'),                
    mathematics:yup
        .number("must be number")
        .positive()
        .integer()
        .required('Required'),                
    science:yup
        .number("must be number")
        .positive()
        .integer()
        .required('Required'),                
    malayalam:yup
        .number("must be number")
        .positive()
        .integer()
        .required('Required'),  
    totalMark:yup
        .number("must be numbe")
        .positive()
        .integer()
        .required("Required"),
    grade: yup
        .string()
        .min(1,'Atleast 1')
        .max(20)
        .required('Required'),     
})
