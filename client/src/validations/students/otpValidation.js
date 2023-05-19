import * as yup from "yup"

export const otpSchema = yup.object().shape({
    otp1:yup
        .number('Otp Must be a Number')
        // .positive()
        .integer()
        .test('len', 'only contain 1 ', val => /^\d{1}$/.test(val))
        .required('Required'),       
    otp2:yup
        .number('Otp Must be a Number')
        // .positive()
        .integer()
        .test('len', 'only contain 1 ', val => /^\d{1}$/.test(val))
        .required('Required'),       
    otp3:yup
        .number('Otp Must be a Number')
        // .positive()
        .integer()
        .test('len', 'only contain 1 ', val => /^\d{1}$/.test(val))
        .required('Required'),       
    otp4:yup
        .number('Otp Must be a Number')
        // .positive()
        .integer()
        .test('len', 'only contain 1 ', val => /^\d{1}$/.test(val))
        .required('Required'),       
})
