import Head from "../comps/Head";
import {
  Image,
  Input,
  Stack,
  Icon,
  useColorModeValue,
  Text,
  Alert,
  AlertDescription,
  AlertTitle,
  AlertIcon,
  Heading,
  Button,
  Spinner,
  InputGroup,
  FormHelperText,
  InputRightElement,
  useToast,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import nookies from "nookies";
import axios from "axios";
import admin from "firebase-admin";
import { adminInit } from "../firebase/admin-init";

export async function getServerSideProps(context) {
  try {
    adminInit();
    const cookies = nookies.get(context);
    if (Object.keys(cookies).length === 0) {
      throw error;
    }
    try {
      if (!cookies.token) {
        throw err;
      }
      const token = await admin.auth().verifyIdToken(cookies.idToken);
      const { uid, email } = token;
      let ref = "/";
      if (context.query.ref) {
        ref = context.query.ref;
      }
      if (!token.email_verified) {
        return {
          props: {
            user: token,
            refer: ref,
          },
        };
      }
      return {
        redirect: {
          permanent: false,
          destination: ref,
        },
      };
    } catch (err) {
      const ApiKey = process.env.ClientApiKey;
      const token = cookies.refreshToken;
      //console.log(token);
      if (!token) {
        throw err;
      }
      const params = new URLSearchParams();
      params.append("grant_type", "refresh_token");
      params.append("refresh_token", token);
      const options = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: params,
        url: `https://securetoken.googleapis.com/v1/token?key=${ApiKey}`,
      };

      let r;
      await axios(options).then(async ({ data }) => {
        nookies.set(context, "refreshToken", data.refresh_token, {
          path: "/login",
        });
        nookies.set(context, "idToken", data.id_token, {
          maxAge: data.expires_in,
          path: "/",
        });
        const ntoken = await admin.auth().verifyIdToken(data.id_token);
        const { uid, email } = ntoken;
        let ref = "/";
        if (context.query.ref) {
          ref = context.query.ref;
        }
        if (!ntoken.email_verified) {
          r = {
            props: {
              user: ntoken,
              refer: ref,
            },
          };
        } else {
          r = {
            redirect: {
              permanent: false,
              destination: ref,
            },
          };
        }
      });
      return r;
    }
  } catch (error) {
    nookies.set(context, "refreshToken", "", {
      path: "/login",
    });
    nookies.set(context, "idToken", "", {
      path: "/",
    });
    console.log(error);
    return { props: {} };
  }
}

export default function LoginPage({ user, refer }) {
  // console.log(user);
  if (!user) {
    return <Login />;
  } else {
    return <EmailVerify user={user} refer={refer} />;
  }
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const router = useRouter();
  const [lgOngoing, setLgOngoing] = useState(false);
  async function loginAccount() {
    setLgOngoing(true);
    let err;
    if (!isValidEmail(username) && !isValidUsername(username)) {
      err = "আপনার প্রবেশকৃত ইউজারনেম অথবা ইমেইলটি সঠিক নয়";
    } else if (!isValidPassword(password)) {
      err = "পাসওয়ার্ড-এ একটি নাম্বার ও একটি বিশেষ চিহ্ন আবশ্যক";
    } else {
      await axios
        .post("/api/auth/signin", {
          id: username,
          pass: password,
        })
        .then(({ data }) => {
          setLgOngoing(false);
          setIdToken(data.tokens.idToken, data.tokens.expiresIn);
          setRefreshToken(data.tokens.refreshToken);
          setUser(data.user);
          router.reload();
        })
        .catch(({ response }) => {
          setLgOngoing(false);
          if (response) {
            toast({
              title: "ব্যার্থ!",
              description: response.data.error.message,
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        });
    }
    setLgOngoing(false);
    if (err) {
      toast({
        title: "ব্যার্থ!",
        description: err,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <>
      <Head title="প্রবেশ করুন অথবা যোগ দিন - বিচিত্র বিজ্ঞান" />

      <Flex
        w="100%"
        mt={["10px", "20px", "30px"]}
        justifyContent="center"
        alignItems="center"
      >
        <Flex
          bg={{ base: "white", lg: "rgba(0,0,0,1)" }}
          borderRadius="20.1px"
          maxW="1200px"
        >
          <Stack
            borderRadius={{ base: "10px", md: "20px" }}
            direction={{ base: "column-reverse", sm: "column", md: "row" }}
            bg={{
              base: "white",
              lg: useColorModeValue(
                "rgba(201, 221, 255,1)",
                "rgba(201, 221, 255,0.5)"
              ),
            }}
            w="100%"
          >
            <Box
              w="100%"
              h="100%"
              pl={{ base: "20px", sm: "50px" }}
              display={{ base: "none", lg: "block" }}
              mt="20px"
              pb="50px"
            >
              <Heading
                mt={["0px", "0px", "50px"]}
                fontSize={{ base: "2rem", sm: "2.7rem" }}
                textAlign={{ base: "left", sm: "center", md: "left" }}
                color={useColorModeValue("#404040", "#dedede")}
              >
                <Box as="span" color="rgba(255, 120, 31,1)">
                  বিজ্ঞান চর্চায়{" "}
                </Box>
                অংশগ্রহন করুন আমাদের সাথে
              </Heading>
              <Text
                textAlign={{ base: "left", sm: "center", md: "left" }}
                mt="20px"
                fontWeight="medium"
                color={useColorModeValue("#404040", "#dedede")}
                pr="50px"
              >
                বিচিত্র বিজ্ঞান প্লাটফর্মে লিখতে, মন্তব্য করতে কিংবা
                অন্যান্যভাবে পূর্নাঙ্গ ইন্টারেকশনের জন্য,
                <Box as="span" color="#FF6700">
                  {" "}
                  প্রবেশ করুন কিংবা যোগ দিন বিচিত্র বিজ্ঞান-এ।
                </Box>
              </Text>
              <Flex
                w="100%"
                justifyContent={{ base: "left", sm: "center", md: "left" }}
              >
                <Link href="/our-story">
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
                      আমাদের গল্প পড়ুন
                    </Button>
                  </a>
                </Link>
              </Flex>
            </Box>
            <Flex alignItems="center" justifyContent="center" width="100%">
              <Box
                mb={{ base: "-10px", sm: "0px" }}
                mt={{ base: "0px", sm: "-10px", md: "0px" }}
                w="100%"
                maxWidth="400px"
                borderRadius="10px"
                p="20px"
                bg={useColorModeValue("#F4F8FF", "#E0E2E6")}
              >
                <Input
                  color="gray.900"
                  _placeholder={{
                    color: useColorModeValue("gray.500", "gray.500"),
                  }}
                  isDisabled={lgOngoing}
                  w="100%"
                  placeholder="ইউজারনেম অথবা ইমেইল লিখুন"
                  _hover={{ borderColor: "gray.500" }}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  _focus={{ boxShadow: "none", borderColor: "gray.600" }}
                  borderColor="gray.400"
                  bg="none"
                />
                <PasswordInput
                  color="gray.900"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  isDisabled={lgOngoing}
                  _placeholder={{
                    color: useColorModeValue("gray.500", "gray.500"),
                  }}
                  w="100%"
                  placeholder="পাসওয়ার্ড লিখুন"
                  _hover={{ borderColor: "gray.500" }}
                  _focus={{ boxShadow: "none", borderColor: "gray.600" }}
                  borderColor="gray.400"
                  bg="none"
                  mt="10px"
                />
                <ForgetPassword />
                <Button
                  bg="linear-gradient(90deg, rgba(255,103,0,1) 0%, rgba(255,33,0,1) 100%);"
                  onClick={loginAccount}
                  _hover={{
                    bg: "linear-gradient(90deg, rgba(255,103,0,0.9) 0%, rgba(255,33,0,0.9) 100%);",
                    transform: "scale(1.01)",
                  }}
                  isLoading={lgOngoing}
                  color="white"
                  _focus={{ boxShadow: "none" }}
                  _active={{
                    bg: "linear-gradient(90deg, rgba(255,103,0,1) 0%, rgba(255,33,0,1) 100%);",
                  }}
                  w="100%"
                  mt="3px"
                >
                  প্রবেশ করুন
                </Button>
                <Text textAlign="center" mt="2px" color="gray.700">
                  একাউন্ট নেই?
                </Text>
                <SignupDialogue />
              </Box>
            </Flex>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}

function ForgetPassword() {
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
  const [RUsername,setRUsername] = useState(false)
  const [rOngoing, setROngoing] = useState(false);
  const router = useRouter();
  function toggleReset() {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
      let query = router.query;
      query.mode = "RESET_PASSWORD";
      router.push({ query });
    } else {
      let query = router.query;
      delete query.mode;
      router.push({ query });
      document.body.style.overflow = "initial";
    }
    setIsOpen(!isOpen);
  }
  function overlayClickHandle(e) {
    console.log(e.target.id);
    if (e.target.id == "reset-overlay") {
      toggleReset();
    }
  }
  useEffect(() => {
    if (window) {
      if (router.query.mode == "RESET_PASSWORD") {
        setIsOpen(true);
        document.body.style.overflow = "hidden";
      }
    }
  });
  return (
    <>
      <Flex w="100%" justifyContent="right">
        <Text
          onClick={toggleReset}
          textAlign="right"
          cursor="pointer"
          mt="3px"
          _hover={{
            color: "#FF6700",
          }}
          color="gray.600"
        >
          পাসওয়ার্ড ভুলে গিয়েছি
        </Text>
      </Flex>
      <Flex
        color="white"
        display={isOpen ? "flex" : "none"}
        bg="rgba(0,0,0,0.9)"
        top="0"
        left="0"
        id="reset-overlay"
        bottom="0"
        right="0"
        overflow="hidden"
        zIndex="4"
        position="fixed"
        w="100%"
        alignItems="center"
        flexDirection="column"
        h="100%"
        onClick={overlayClickHandle}
      >
        <Flex
          w="100%"
          justifyContent="right"
          mt={{ base: "10px", sm: "35px" }}
          mr={{ base: "10px", sm: "70px" }}
        >
          <Icon
            onClick={toggleReset}
            _hover={{ color: "#FF6700" }}
            boxSize="30px"
            style={{ strokeWidth: "15",userSelect: "none" }}
            as={IoClose}
            color="white"
            cursor="pointer"
          />
        </Flex>
        <Flex w="100%" justifyContent="center">
          <Box
            mb={{ base: "-10px", sm: "0px" }}
            mt={{ base: "0px", sm: "-10px", md: "0px" }}
            w="100%"
            maxWidth="400px"
            borderRadius="10px"
            p="20px"
            bg={useColorModeValue("#F4F8FF", "#E0E2E6")}
          >
            <Input
              color="gray.900"
              _placeholder={{
                color: useColorModeValue("gray.500", "gray.500"),
              }}
              isDisabled={rOngoing}
              w="100%"
              placeholder="ইউজারনেম অথবা ইমেইল লিখুন"
              _hover={{ borderColor: "gray.500" }}
              onChange={(e) => {
                setRUsername(e.target.value);
              }}
              _focus={{ boxShadow: "none", borderColor: "gray.600" }}
              borderColor="gray.400"
              bg="none"
            />
            <Button
              isLoading={rOngoing}
              bg="linear-gradient(90deg, rgba(69,194,0,1) 0%, rgba(49,159,0,1) 100%)"
              _hover={{
                bg: "linear-gradient(90deg, rgba(69,194,0,1) 0%, rgba(49,159,0,1) 100%)",
                transform: "scale(1.01)",
              }}
              
              _focus={{ boxShadow: "none" }}
              _active={{
                bg: "linear-gradient(90deg, rgba(69,194,0,1) 0%, rgba(49,159,0,1) 100%)",
              }}
              w="100%"
              color="gray.100"
              mt="10px"
            >
              পাসওয়ার্ড পাল্টান
            </Button>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

function SignupDialogue() {
  const [isOpen, setIsOpen] = useState(false);
  const [nname, setNname] = useState("");
  const [nusername, setNusername] = useState("");
  const [nemail, setNemail] = useState("");
  const [npass, setNpass] = useState("");
  const [ncpass, setNcpass] = useState("");
  const toast = useToast();
  const [nacOngoing, setNacOngoing] = useState(false);
  const router = useRouter();
  function toggleSignup() {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
      let query = router.query;
      query.mode = "SIGNUP";
      router.push({ query });
    } else {
      let query = router.query;
      delete query.mode;
      router.push({ query });
      document.body.style.overflow = "initial";
    }
    setIsOpen(!isOpen);
  }
  function overlayClickHandle(e) {
    console.log(e.target.id);
    if (e.target.id == "signup-overlay") {
      toggleSignup();
    }
  }
  async function createAccount() {
    setNacOngoing(true);
    let err = "";
    let ref = router.query.ref || "/";
    if (nname.length <= 5) {
      err = "নাম কমপক্ষে ৬ অক্ষরের হতে হবে";
    } else if (!isValidUsername(nusername)) {
      err =
        "ইউজারনেম-এ শুধুমাত্র ইংরেজি বর্ণমালা, ডট (.) এবং আন্ডারস্কোর (_) ব্যবহারযোগ্য";
    } else if (!isValidEmail(nemail)) {
      err = "আপনার প্রবেশকৃত ইমেইলটি সঠিক নয়";
    } else if (!isValidPassword(npass)) {
      err = "পাসওয়ার্ড-এ একটি নাম্বার ও একটি বিশেষ চিহ্ন আবশ্যক";
    } else if (npass != ncpass) {
      err = "প্রবেশকৃত পাসওয়ার্ড দুটি মিলছে না";
    } else {
      await axios
        .post("/api/auth/signup", {
          name: nname,
          username: nusername,
          email: nemail,
          password: npass,
          refer: ref,
        })
        .then((data) => {
          setNacOngoing(false);
          setIdToken(data.data.tokens.idToken, data.data.tokens.expiresIn);
          setRefreshToken(data.data.tokens.refreshToken);
          setUser(data.data.user);
          router.reload();
        })
        .catch((err) => {
          // console.log(err);
          setNacOngoing(false);
          toast({
            title: "ব্যার্থ!",
            description: err.response.data.error.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    }
    setNacOngoing(false);
    if (err) {
      toast({
        title: "ব্যার্থ!",
        description: err,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    if (window) {
      if (router.query.mode == "SIGNUP") {
        setIsOpen(true);
        document.body.style.overflow = "hidden";
      }
    }
  });
  return (
    <>
      <Button
        bg="linear-gradient(90deg, rgba(69,194,0,1) 0%, rgba(49,159,0,1) 100%)"
        _hover={{
          bg: "linear-gradient(90deg, rgba(69,194,0,1) 0%, rgba(49,159,0,1) 100%)",
          transform: "scale(1.01)",
        }}

        _focus={{ boxShadow: "none" }}
        _active={{
          bg: "linear-gradient(90deg, rgba(69,194,0,1) 0%, rgba(49,159,0,1) 100%)",
        }}
        onClick={toggleSignup}
        w="100%"
        color="gray.100"
      >
        একাউন্ট তৈরি করুন
      </Button>
      <Flex
        color="white"
        display={isOpen ? "flex" : "none"}
        bg="rgba(0,0,0,0.9)"
        top="0"
        left="0"
        id="signup-overlay"
        bottom="0"
        right="0"
        overflow="hidden"
        zIndex="4"
        position="fixed"
        w="100%"
        alignItems="center"
        flexDirection="column"
        h="100%"
        onClick={overlayClickHandle}
      >
        <Flex
          w="100%"
          justifyContent="right"
          mt={{ base: "10px", sm: "35px" }}
          mr={{ base: "10px", sm: "70px" }}
        >
          <Icon
            onClick={toggleSignup}
            _hover={{ color: "#FF6700" }}
            boxSize="30px"
            style={{ strokeWidth: "15",userSelect: "none" }}
            as={IoClose}
            color="white"
            cursor="pointer"
          />
        </Flex>
        <Flex w="100%" justifyContent="center">
          <Box
            mb={{ base: "-10px", sm: "0px" }}
            mt={{ base: "0px", sm: "-10px", md: "0px" }}
            w="100%"
            maxWidth="400px"
            borderRadius="10px"
            p="20px"
            bg={useColorModeValue("#F4F8FF", "#E0E2E6")}
          >
            <Input
              color="gray.900"
              isDisabled={nacOngoing}
              _placeholder={{
                color: useColorModeValue("gray.500", "gray.500"),
              }}
              w="100%"
              placeholder="সম্পূর্ন নাম লিখুন"
              _hover={{ borderColor: "gray.500" }}
              onChange={(e) => {
                setNname(e.target.value);
              }}
              _focus={{ boxShadow: "none", borderColor: "gray.600" }}
              borderColor="gray.400"
              bg="none"
              type="text"
            />
            <Input
              color="gray.900"
              isDisabled={nacOngoing}
              _placeholder={{
                color: useColorModeValue("gray.500", "gray.500"),
              }}
              w="100%"
              placeholder="ইউজারনেম লিখুন"
              _hover={{ borderColor: "gray.500" }}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\s/g, "");
                setNusername(e.target.value.replace(/\s/g, ""));
              }}
              _focus={{ boxShadow: "none", borderColor: "gray.600" }}
              borderColor="gray.400"
              bg="none"
              mt="10px"
            />
            <Input
              color="gray.900"
              isDisabled={nacOngoing}
              _placeholder={{
                color: useColorModeValue("gray.500", "gray.500"),
              }}
              w="100%"
              placeholder="ইমেইল লিখুন"
              type="email"
              _hover={{ borderColor: "gray.500" }}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\s/g, "");
                setNemail(e.target.value.replace(/\s/g, ""));
              }}
              _focus={{ boxShadow: "none", borderColor: "gray.600" }}
              borderColor="gray.400"
              bg="none"
              mt="10px"
            />
            <PasswordInput
              isDisabled={nacOngoing}
              color="gray.900"
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\s/g, "");
                setNpass(e.target.value.replace(/\s/g, ""));
              }}
              _placeholder={{
                color: useColorModeValue("gray.500", "gray.500"),
              }}
              w="100%"
              placeholder="পাসওয়ার্ড লিখুন"
              _hover={{ borderColor: "gray.500" }}
              _focus={{ boxShadow: "none", borderColor: "gray.600" }}
              borderColor="gray.400"
              bg="none"
              mt="10px"
            />
            <PasswordInput
              color="gray.900"
              type="password"
              isDisabled={nacOngoing}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\s/g, "");
                setNcpass(e.target.value.replace(/\s/g, ""));
              }}
              _placeholder={{
                color: useColorModeValue("gray.500", "gray.500"),
              }}
              w="100%"
              placeholder="আবার পাসওয়ার্ড লিখুন"
              _hover={{ borderColor: "gray.500" }}
              _focus={{ boxShadow: "none", borderColor: "gray.600" }}
              borderColor="gray.400"
              bg="none"
              mt="10px"
            />
            <Button
              isLoading={nacOngoing}
              bg="linear-gradient(90deg, rgba(69,194,0,1) 0%, rgba(49,159,0,1) 100%)"
              _hover={{
                bg: "linear-gradient(90deg, rgba(69,194,0,1) 0%, rgba(49,159,0,1) 100%)",
                transform: "scale(1.01)",
              }}
              _focus={{ boxShadow: "none" }}
              _active={{
                bg: "linear-gradient(90deg, rgba(69,194,0,1) 0%, rgba(49,159,0,1) 100%)",
              }}
              onClick={createAccount}
              w="100%"
              color="gray.100"
              mt="10px"
            >
              একাউন্ট তৈরি করুন
            </Button>

            <Text textAlign="center" mt="2px" color="gray.700">
              একাউন্ট আছে?
            </Text>
            <Button
              bg="linear-gradient(90deg, rgba(255,103,0,1) 0%, rgba(255,33,0,1) 100%);"
              onClick={toggleSignup}
              _hover={{
                bg: "linear-gradient(90deg, rgba(255,103,0,0.9) 0%, rgba(255,33,0,0.9) 100%);",
                transform: "scale(1.01)",
              }}
              color="white"
              _focus={{ boxShadow: "none" }}
              _active={{
                bg: "linear-gradient(90deg, rgba(255,103,0,1) 0%, rgba(255,33,0,1) 100%);",
              }}
              w="100%"
            >
              প্রবেশ করুন
            </Button>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

function isValidPassword(pass) {
  return pass.match(
    /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/
  );
}

function isValidEmail(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

function isValidUsername(username) {
  return username.match(
    /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
  );
}

function setRefreshToken(refreshToken) {
  // alert(refreshToken);
  if (typeof Storage !== "undefined") {
    if (refreshToken) {
      nookies.set(null, "refreshToken", refreshToken, { path: "/login" });
      console.log(nookies.get("refreshToken"));
      localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
    }
  } else {
    console.log("Sorry, your browser does not support Web Storage...");
  }
}

function setIdToken(idToken, exp) {
  //alert(idToken);
  if (typeof Storage !== "undefined") {
    if (idToken) {
      nookies.set(null, "idToken", idToken, {
        maxAge: exp,
        path: "/",
      });
      localStorage.setItem("idToken", JSON.stringify(idToken));
    }
  } else {
    console.log("Sorry, your browser does not support Web Storage...");
  }
}

function setUser(user) {
  // alert(user);
  if (typeof Storage !== "undefined") {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  } else {
    console.log("Sorry, your browser does not support Web Storage...");
  }
}

function EmailVerify({ user, refer }) {
  const [vmode, setVmode] = useState();
  const [status, setStatus] = useState();
  async function resendEmailVerification(email, continueUrl) {
    setStatus("resendO");
    await axios
      .post("/api/auth/send-email", {
        mode: "verifyEmail",
        email: user.email,
        continueUrl: window.location.origin + refer,
      })
      .then((data) => {
        setStatus("resendS");
      })
      .catch((err) => {
        setStatus("resendF");
      });
  }
  async function handleVerifyEmail(continueUrl, email) {
    setStatus("faild");
    setVmode({
      type: "verifyEmail",
      ongoing: {
        title: "ইমেইল যাচাইকরন চলছে...",
        desc: "আপনার ইমেইল যাচাই করা হচ্ছে। অনুগ্রহ করে অপেক্ষা করুন।",
      },
      faild: {
        title: "ইমেইল ভেরিফাইড নয়!",
        desc: "ভেরিফিকেশন লিংক এর জন্য আপনার ইমেইল চেক করুন। না পেলে, পুনঃরায় ভেরিফিকেশন আবেদন করুন।",
        opt: resendEmailVerification,
        optname: "পুনঃরায় আবেদন",
      },
      resendO: {
        title: "পুনঃযাচাইকরন আবেদন করা হচ্ছে...",
        desc: "আপনার ইমেইল পুনঃযাচাইকরন আবেদন করা হচ্ছে। অনুগ্রহ করে অপেক্ষা করুন",
      },
      resendS: {
        title: "পুনঃযাচাইকরন আবেদন গৃহীত",
        desc: "দয়া করে আপনার ইমেইল চেক করে সেখানে থাকা লিংক এ ক্লিক করুন।",
      },
      resendF: {
        title: "পুনঃযাচাইকরন আবেদন ব্যার্থ!",
        desc: "আপনার পুনঃযাচাইকরন আবেদন ব্যার্থ হয়েছে। কিছুক্ষন পরে আবার চেষ্টা করুন।",
        opt: () => {
          resendEmailVerification(email, continueUrl);
        },
        optname: "পুনঃরায় আবেদন",
      },
    });
  }

  useEffect(() => {
    handleVerifyEmail();
  }, []);

  return (
    <>
      <Flex
        w="100%"
        mt={["10px", "20px", "30px"]}
        justifyContent="center"
        alignItems="center"
      >
        {vmode && status == "ongoing" && (
          <OngoingAlert title={vmode.ongoing.title} desc={vmode.ongoing.desc} />
        )}
        {vmode && status == "faild" && (
          <ErrorAlert
            title={vmode.faild.title}
            desc={vmode.faild.desc}
            opt={vmode.faild.opt}
            optname={vmode.faild.optname}
          />
        )}
        {vmode && status == "resendO" && (
          <OngoingAlert title={vmode.resendO.title} desc={vmode.resendO.desc} />
        )}
        {vmode && status == "resendS" && (
          <SuccessAlert title={vmode.resendS.title} desc={vmode.resendS.desc} />
        )}
        {vmode && status == "resendF" && (
          <ErrorAlert
            title={vmode.resendF.title}
            desc={vmode.resendF.desc}
            opt={vmode.resendF.opt}
            optname={vmode.resendF.optname}
          />
        )}
      </Flex>
    </>
  );
}

function ErrorAlert({ title, desc, opt, optname }) {
  return (
    <Alert
      maxW="500px"
      width="95%"
      borderRadius="10px"
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {title}
      </AlertTitle>
      <AlertDescription maxWidth="sm">{desc}</AlertDescription>
      <Flex mt="10px" w="100%" justifyContent="center">
        <Flex mr="5px" w="50%" justifyContent="right">
          <Button
            onClick={() => {
              window.location.href = "/";
            }}
            colorScheme="blue"
          >
            প্রচ্ছদে ফিরুন
          </Button>
        </Flex>
        <Flex ml="5px" w="50%" justifyContent="left">
          <Button colorScheme="green" onClick={opt}>
            {optname}
          </Button>
        </Flex>
      </Flex>
    </Alert>
  );
}

function OngoingAlert({ title, desc }) {
  return (
    <Alert
      maxW="500px"
      width="95%"
      borderRadius="10px"
      status="warning"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <Spinner
        thickness="8px"
        speed="0.65s"
        emptyColor="orange.200"
        color="orange.500"
        size="xl"
      />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {title}
      </AlertTitle>
      <AlertDescription maxWidth="sm">{desc}</AlertDescription>
    </Alert>
  );
}

function SuccessAlert({ title, desc }) {
  return (
    <Alert
      maxW="500px"
      width="95%"
      borderRadius="10px"
      status="success"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {title}
      </AlertTitle>
      <AlertDescription maxWidth="sm">{desc}</AlertDescription>
    </Alert>
  );
}

function PasswordInput({ ...props }) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md" alignItems="center" mt={props.mt}>
      <Input type={show ? "text" : "password"} {...props} mt="0px" />
      <InputRightElement width="4.5rem">
        <Button bg="gray.400" h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
