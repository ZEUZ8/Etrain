import * as yup from "yup"

export const ExamValidation = yup.object().shape({
    examName: yup
        .string()
        .min(2,'Atleast 2 charecters')
        .max(20)
        .required('Required'), 
    examDiscription:yup
        .string()
        .min(2,'Atleast 2 Charecter')
        .required('Required'),
    startDate: yup
        .date()
        .required("Required")
        .min(new Date(), "Start date must be in futer"),   
    examClass: yup
        .number("only Number")
        .max(4,'Not Valid')
        .required("Required"),
    endDate:yup
        .date()
        .required("required")
        .min(yup.ref("startDate"),"End date must be after the start date"),
    timeTable: yup
        .string(),                   
})
