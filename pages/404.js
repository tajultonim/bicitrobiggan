import {
  Heading,
  Image,
  Box,
  Text,
  Flex,
  Stack,
  useColorModeValue,
  Button,
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";
import Head from "next/head";
import { FaArrowRight } from "react-icons/fa";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>পৃষ্ঠাটি পাওয়া যায় নি! - বিচিত্র বিজ্ঞান</title>
        <link rel="manifest" href="/res/favicons/manifest.json" />
      </Head>
      <Flex
        w="100%"
        mt="10px"
        justifyContent="center"
        alignItems="center"
      >
        <Flex borderRadius="20.1px" w="100%">
          <Flex
            borderRadius="20px"
            alignItems="center"
            opacity={useColorModeValue("1", "0.9")}
            w="100%"
            pb="20px"
            flexDirection="column"
          >
              <Flex justifyContent="center" w="100%">
                <Image alt="" maxW="750px" width="100%" src="/res/vectors/404.svg" />
              </Flex>
              <Flex justifyContent="center" w="100%">
          
              <Text
                mt="10px"
                textAlign="center"
                fontWeight="medium"
                color={useColorModeValue("#404040", "#dedede")}
                w="700px"
                maxW="95%"
              >
               দুঃখিত, আপনি যা খুঁজছেন তা পাওয়া যায়নি। দয়া করে আপনার প্রবেশকৃত
                <Box as="span" color="#FF6700">
                  {" "}
                  লিংকটি ঠিক আছে কিনা দেখুন অথবা প্রচ্ছেদে ফিরে যান।
                </Box>
              </Text>
              </Flex>

              <Flex justifyContent="center" w="100%">
                <Link href="/">
                  <a>
                    <Button
                      mt="20px"
                      alignItems="center"
                      p="25px"
                      rightIcon={<Icon as={FaArrowRight} />}
                      color="white"
                      bg="linear-gradient(90deg, rgba(255,103,0,1) 0%, rgba(255,33,0,1) 100%);"
                      _hover={{
                        bg: "linear-gradient(90deg, rgba(255,103,0,1) 0%, rgba(255,33,0,1) 100%);",
                        transform: "scale(1.1)",
                      }}
                      _focus={{ boxShadow: "none" }}
                      _active={{
                        bg: "linear-gradient(90deg, rgba(255,103,0,1) 0%, rgba(255,33,0,1) 100%);",
                      }}
                      variant="solid"
                    >
                      প্রচ্ছেদে ফিরুন
                    </Button>
                  </a>
                </Link>
              </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
