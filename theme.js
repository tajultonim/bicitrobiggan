import { extendTheme } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"

const breakpoints = createBreakpoints({
  sm: "45em",
  md: "120em",
  lg: "200em",
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