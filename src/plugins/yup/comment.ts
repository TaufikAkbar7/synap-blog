import * as yup from 'yup'

export const schemaComment = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  body: yup.string().required()
})
