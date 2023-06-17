import * as yup from "yup"

export const leaveFormValidation = yup.object().shape({
    name: yup
        .string()
        .min(2,'Atleast 2 charecters')
        .max(20)
        .required('Required'), 
    leaveReason:yup
        .string()
        .min(10,'Atleast 10 Charecter')
        .required('Required'),
    startDate: yup
        .date()
        .required("Required")
        .min(new Date(), "Start date must be in futer"),
    endDate:yup
        .date()
        .required("required")
        .min(yup.ref("startDate"),"End date must be after the start date")  ,                 
  
})
