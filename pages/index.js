import Head from "../comps/Head";
import {
  Text,
  Heading,
  Icon,
  Box,
  Flex,
  Image,
  Stack,
  VStack,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

import Link from "next/link";

import { IoSearch } from "react-icons/io5";
import {FaArrowRight} from "react-icons/fa"
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

import { useState, useEffect } from "react";

export default function Home() {
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
      <Flex
        w="100%"
        mt={["10px", "20px", "30px"]}
        justifyContent="center"
        alignItems="center"
      >
        <Flex bg="rgba(0,0,0,1)" borderRadius="20.1px" maxW="1200px">
        <Stack borderRadius="20px" direction={{base:"column-reverse",sm:"column",md:"row"}} bg={useColorModeValue("rgba(201, 221, 255,1)","rgba(201, 221, 255,0.5)")} w="100%">
          <Box w="100%" h="100%" pl={{base:"20px",sm:"50px"}} mt="20px" pb="50px">
            <Heading mt={["0px","0px","50px"]} fontSize={{base:"2rem",sm:"2.7rem"}} textAlign={{base:"left",sm:"center",md:"left"}} color={useColorModeValue("#404040","#dedede")}>
              <Box as="span" color="rgba(255, 120, 31,1)">
                বাংলা ভাষায়{" "}
              </Box>
              বিজ্ঞান চর্চাই আমাদের লক্ষ
            </Heading>
            <Text textAlign={{base:"left",sm:"center",md:"left"}} mt="20px" fontWeight="medium" color={useColorModeValue("#404040","#dedede")} pr="50px">
              তুমুল বেগে এগিয়ে যাচ্ছে বিজ্ঞান। কিন্তু মাতৃভাষায় বিজ্ঞান চর্চা
              এখনো করুণ অবস্থায়। বাংলায় বিজ্ঞান চর্চা সমৃদ্ধ করা না গেলে,
              বিজ্ঞানের আলো হতে বঞ্চিত হবে অনেকেই। তাই
              <Box as="span" color="#FF6700">
                {" "}
                বাংলায় বিজ্ঞান চর্চা সমৃদ্ধ করার আমাদের এই ক্ষুদ্র প্রচেষ্টা।
              </Box>
            </Text>
            <Flex w="100%" justifyContent={{base:"left",sm:"center",md:"left"}}>
            <Link href="/our-story">
            <a>
            <Button
              mt="20px"
              alignItems="center"
              p="25px"
              rightIcon={<Icon as={FaArrowRight}/>}
              color="white"
              bg="linear-gradient(90deg, rgba(255,103,0,1) 0%, rgba(255,33,0,1) 100%);"
              _hover={{bg:"linear-gradient(90deg, rgba(255,103,0,1) 0%, rgba(255,33,0,1) 100%);",transform:"scale(1.1)"}}
              _focus={{boxShadow:"none"}}
              _active={{bg:"linear-gradient(90deg, rgba(255,103,0,1) 0%, rgba(255,33,0,1) 100%);"}}
              variant="solid"
            >
              আমাদের গল্প পড়ুন
            </Button>
            </a>
            </Link>
            </Flex>
          </Box>
          <Flex justifyContent="center" width="100%">
          <Image alt="" maxWidth="600px" pt="10px" pb="10px" w="100%" src="/res/vectors/thinking.svg" />
          </Flex>
        </Stack>
        </Flex>
      </Flex>
    </>
  );
}
