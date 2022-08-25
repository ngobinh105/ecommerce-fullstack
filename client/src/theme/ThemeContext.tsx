import { createContext } from 'react'

const ThemeContext = createContext({
  changeTheme: () => {},
})

export default ThemeContext
