import * as Yup from 'yup'

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Please input your email!'),
  password: Yup.string().required('Please input your password!')
})
