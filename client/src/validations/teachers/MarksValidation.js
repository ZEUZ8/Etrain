import * as yup from "yup"

export const MarksValidation = yup.object().shape({
    examName: yup
        .string()
        .min(2,'Atleast 2 charecters')
        .max(20),

    studentName:yup
        .string()
        .min(2,'Atleast 2 Charecter')
        .max(20,"max limits"),
                       
    english:yup
        .number("must be number")
        .positive()
        .integer(),
                       
    mathematics:yup
        .number("must be number")
        .positive()
        .integer(),
                       
    science:yup
        .number("must be number")
        .positive()
        .integer(),
                       
    malayalam:yup
        .number("must be number")
        .positive()
        .integer(),
         
    totalMark:yup
        .number("must be numbe")
        .positive()
        .integer(),
    grade: yup
        .string()
        .min(1,'Atleast 1')
        .max(20),
            
    note: yup
        .string()
        .min(10,'Atleast 10')
            
})
