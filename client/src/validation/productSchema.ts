import * as yup from 'yup'

const FILE_SIZE = 1000000
const FILE_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']
const productSchema = yup.object({
  title: yup.string().required(),
  price: yup.number().required(),
  description: yup.string().required(),
  stock: yup.number().required(),
  images: yup
    .mixed()
    .required('File is required')
    .test(
      'fileSize',
      'This file is too large',

      (value) => {
        if (value && value.length > 0) {
          for (let i = 0; i < value.length; i++) {
            if (value[i].size > FILE_SIZE) {
              return false
            }
          }
        }
        return true
      }
    )
    .test('fileType', 'Unsupported File Format', (value) => {
      if (value && value.length > 0) {
        for (let i = 0; i < value.length; i++) {
          if (!FILE_FORMATS.includes(value[i].type)) {
            return false
          }
        }
      }
      return true
    }),
})

export default productSchema
