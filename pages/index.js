import Head from "../comps/Head";
import {
  Text,
  Heading,
  Icon,
  Box,
  Flex,
  Image,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

import { IoSearch } from "react-icons/io5";
import {MdOutlineDarkMode, MdOutlineLightMode} from "react-icons/md"

import { useState, useEffect } from "react";

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [logo, setLogo] = useState(
    colorMode == "light"
      ? "/res/logos/svg/txtlogo.svg"
      : "/res/logos/svg/txtlogodark.svg"
  );
  const [border, setBorder] = useState(colorMode === "light" ? "0px" : "1px");
  const [isDark,setIsDark]=useState(colorMode !== "light")
  function toggleDarkMode() {
    toggleColorMode();
    setLogo(
      colorMode == "light"
        ? "/res/logos/svg/txtlogodark.svg"
        : "/res/logos/svg/txtlogo.svg"
    );
    setBorder(colorMode === "light" ? "0px" : "1px");
    setIsDark(colorMode !== "light")
  }

  function search(){
    alert("ok")
  }

  useEffect(() => {
    setLogo(
      colorMode == "light"
        ? "/res/logos/svg/txtlogo.svg"
        : "/res/logos/svg/txtlogodark.svg"
    );
    setBorder(colorMode === "light" ? "1px" : "0px");
    setIsDark(colorMode !== "light")
  });

  const headerbg = useColorModeValue("white", "gray.900");
  const color = useColorModeValue("gray.800", "white");
  return (
    <>
      <Head
        title={process.env.Site_Title}
        url={process.env.Site_Url}
        desc={process.env.Site_Desc}
        type=""
      />
      <Box
        display={["none", "none", "block"]}
        h="39px"
        w="100%"
        borderBottom={border}
        borderColor="gray.200"
      ></Box>
      <Flex
        alignItems="center"
        borderBottom={border}
        borderColor="gray.200"
        w="100%"
        h="63px"
        bg={headerbg}
        color={color}
      >
        <Image h="27px" ml={["10px", "50px", "175px"]} src={logo} />
        <Flex alignItems="center" justifyContent="right" h="100%" w="100%">
          <Flex mr={["10px", "50px", "181px"]} alignItems="center" h="100%">
            <Icon onClick={toggleDarkMode} display={isDark?"block":"none"} boxSize="20px" as={MdOutlineLightMode} mr="15px"/>
            <Icon onClick={toggleDarkMode} display={!isDark?"block":"none"} boxSize="20px" as={MdOutlineDarkMode} mr="15px"/>
            <Icon onClick={()=>{search()}} boxSize="17.6px" style={{strokeWidth:"15"}} as={IoSearch} />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
