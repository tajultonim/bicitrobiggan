import {
  Box,
  Flex,
  Text,
  Image,
  useColorModeValue,
  Icon,
  VStack,
} from "@chakra-ui/react";
import {
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";

import Link from "next/link";

export default function Footer() {
  return (
    <>
      <Box
      mt="10px"
        w="100%"
        bg="gray.900"
        paddingTop="45px"
        paddingLeft="20px"
        paddingRight="20px"
        paddingBottom="20px"
        justifyContent="center"
      >
        <Flex alignItems="center" justifyContent="center">
          <Image h="27px" opacity="0.8" src="/res/logos/svg/footerlogo.svg" />
        </Flex>
        <Flex alignItems="center" justifyContent="center">
          <Text textAlign="center"fontWeight="normal" mt="20px" color="white" fontSize="12px" opacity="0.8">
            BicitroBiggan is a science based organization in Bangladesh.
          </Text>
        </Flex>
        <Flex alignItems="center" justifyContent="center">
          <Text textAlign="center" color="white" fontSize="12px" opacity="0.8">
            For any query call us 01878613436 (10AM to 10PM).
          </Text>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="center"
          w="100%"
          flex="1"
          color="white"
          opacity="0.8"
          mt="10px"
        >
          <Link href="https://facebook.com/BicitroBiggan">
            <a tabIndex="5" target="_blank" style={{ marginRight: "13px" }}>
              <Icon _hover={{color:"#1778f2"}} mt="6px" boxSize="14px" as={FaFacebook} />
            </a>
          </Link>
          <Link href="#">
            <a target="_blank" tabIndex="6" style={{ marginRight: "13px" }}>
              <Icon _hover={{color:"#00acee"}} mt="6px" boxSize="14px" as={FaTwitter} />
            </a>
          </Link>
          <Link href="https://instagram.com/BicitroBiggan">
            <a target="_blank" tabIndex="7" style={{ marginRight: "13px" }}>
              <Icon _hover={{color:"#cd486b"}} mt="6px" boxSize="14px" as={FaInstagram} />
            </a>
          </Link>
          <Link href="#">
            <a tabIndex="8" target="_blank" style={{ marginRight: "13px" }}>
              <Icon _hover={{color:"#FF0000"}} mt="6px" boxSize="14px" as={FaYoutube} />
            </a>
          </Link>
          <Link href="#">
            <a tabIndex="9" target="_blank">
              <Icon _hover={{color:"#0e76a8"}} mt="6px" boxSize="13px" as={FaLinkedin} />
            </a>
          </Link>
        </Flex>
      </Box>
      <Flex
        w="100%"
        bg="#12161f"
        color="white"
        paddingTop="10px"
        paddingBottom="10px"
        paddingLeft="20px"
        paddingRight="20px"
        justifyContent="center"
      >
        <Text textAlign="center" fontSize="12px">
          © Copyright {new Date().getUTCFullYear()}, All Rights Reserved | BicitroBiggan
        </Text>
      </Flex>
      <Flex bg="#FF6700" w="100%" h="5px"/>
    </>
  );
}
