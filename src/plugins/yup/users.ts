import * as yup from 'yup'

export const schemaUser = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  gender: yup.string().required(),
  status: yup.string().required()
})
