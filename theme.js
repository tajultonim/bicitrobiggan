import { extendTheme } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"

const breakpoints = createBreakpoints({
  sm: '768px',
  md: '1024px',
  lg: '1200px',
  xl: '1290px'
})

const theme = extendTheme({
  breakpoints,
  fonts: {
    heading: "BalooDa2",
    body: "BalooDa2"
  },
  initialColorMode: "light",
  useSystemColorMode: false,
})

export default theme