import Head from "../comps/Head";
import {
  Text,
  Heading,
  Icon,
  Box,
  Flex,
  Image,
  Stack,
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
        pl={["10px", "10px", "110px"]}
        pr={["10px", "10px", "110px"]}
        mt={["10px", "20px", "30px"]}
        justifyContent="center"
        alignItems="center"
      >
        <Stack borderRadius="20px" direction="horizontal" bg="#c9ddff" w="100%">
          <Box w="50%" h="100%" pl="50px" mt="20px" pb="50px">
            <Heading mt="50px" fontSize="2.7rem" color="#404040">
              <Box as="span" color="#FF6700">
                বাংলা ভাষায়{" "}
              </Box>
              বিজ্ঞান চর্চাই আমাদের লক্ষ
            </Heading>
            <Text mt="20px" fontWeight="medium" color="#404040" pr="50px">
              তুমুল বেগে এগিয়ে যাচ্ছে বিজ্ঞান। কিন্তু মাতৃভাষায় বিজ্ঞান চর্চা
              এখনো করুণ অবস্থায়। বাংলায় বিজ্ঞান চর্চা সমৃদ্ধ করা না গেলে,
              বিজ্ঞানের আলো হতে বঞ্চিত হবে অনেকেই। তাই
              <Box as="span" color="#FF6700">
                {" "}
                বাংলায় বিজ্ঞান চর্চা সমৃদ্ধ করার আমাদের এই ক্ষুদ্র প্রচেষ্টা।
              </Box>
            </Text>
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
          </Box>
          <Image pt="10px" pb="10px" w="50%" src="/res/vectors/thinking.svg" />
        </Stack>
      </Flex>
    </>
  );
}
