import { useState } from 'react'
const useField = (type: string) => {
  const [value, setValue] = useState('')
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const clearInput = () => {
    setValue('')
  }
  return {
    type,
    value,
    onChange,
    clearInput,
  }
}

export default {
  useField,
}
