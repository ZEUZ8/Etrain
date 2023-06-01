import * as yup from "yup"

export const weaklyTaskValidation = yup.object().shape({
    taskName: yup
        .string()
        .min(2,'Atleast 2 charecters')
        .max(20)
        .required('Required'), 
    taskDiscription:yup
        .string()
        .min(2,'Atleast 2 Charecter')
        .required('Required'),
    startDate: yup
        .date()
        .required("Required")
        .min(new Date(), "Start date must be in futer"),
    endDate:yup
        .date()
        .required("required")
        .min(yup.ref("startDate"),"End date must be after the start date")                    
  
})
