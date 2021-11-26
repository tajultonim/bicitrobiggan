import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  fonts: {
    heading: "BalooDa2",
    body: "BalooDa2"
  },
  initialColorMode: "light",
  useSystemColorMode: false,
})

export default theme