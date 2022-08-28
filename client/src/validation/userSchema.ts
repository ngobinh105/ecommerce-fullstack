import * as yup from 'yup'

const FILE_SIZE = 1000000
const FILE_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']
export const userSchema = yup.object({
  firstName: yup.string().required('Firstname is required'),
  lastName: yup.string().required('Lastname is required'),
  email: yup
    .string()
    .required('Email is required')
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email is not valid'),
  password: yup.string().required('Password is required'),
  passwordConfirm: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Password must be matched'),
  avatar: yup
    .mixed()
    .required('File is required')
    .test('fileType', 'Unsupported File Format', (value) => {
      return FILE_FORMATS.includes(value[0].type)
    })
    .test(
      'fileSize',
      'File cannot exceed 2MB',
      (value) => value[0].size <= FILE_SIZE
    ),
})
