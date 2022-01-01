import {
  Text,
  Heading,
  Icon,
  Box,
  Flex,
  Image,
  Button,
  Slide,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  Input,
  InputGroup,
  Tag,
  InputRightElement,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

import { useRouter } from "next/router";

import Link from "next/link";

import { IoSearch, IoClose } from "react-icons/io5";
import { AiFillAppstore } from "react-icons/ai";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import {
  FaTwitter,
  FaComments,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";
import { ImClock, ImFire } from "react-icons/im";

import { useState, useEffect, useRef, forwardRef } from "react";

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [logo, setLogo] = useState(
    colorMode == "light"
      ? "/res/logos/svg/txtlogo.svg"
      : "/res/logos/svg/txtlogodark.svg"
  );
  const [border, setBorder] = useState(colorMode === "light" ? "0px" : "1px");
  const [isDark, setIsDark] = useState(colorMode !== "light");
  function toggleDarkMode() {
    toggleColorMode();
    setLogo(
      colorMode == "light"
        ? "/res/logos/svg/txtlogodark.svg"
        : "/res/logos/svg/txtlogo.svg"
    );
    setBorder(colorMode === "light" ? "0px" : "1px");
    setIsDark(colorMode !== "light");
  }

  const days = [
    "রবিবার",
    "সোমবার",
    "মঙ্গলবার",
    "বুধবার",
    "বৃহস্পতিবার",
    "শুক্রবার",
    "শনিবার",
  ];
  const months = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];
  var d = new Date();
  var nums = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  const [timeStr, setTimeStr] = useState(
    `${days[d.getUTCDay()]}, ${
      months[d.getUTCMonth()]
    } ${d.getUTCDate()} ${d.getUTCFullYear()}`.replace(/[0-9]/gi, function (x) {
      return nums[x];
    })
  );

  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    setLogo(
      colorMode == "light"
        ? "/res/logos/svg/txtlogo.svg"
        : "/res/logos/svg/txtlogodark.svg"
    );

    setBorder(colorMode === "light" ? "1px" : "0px");
    setIsDark(colorMode !== "light");

    setInterval(() => {
      const days = [
        "রবিবার",
        "সোমবার",
        "মঙ্গলবার",
        "বুধবার",
        "বৃহস্পতিবার",
        "শুক্রবার",
        "শনিবার",
      ];
      const months = [
        "জানুয়ারি",
        "ফেব্রুয়ারি",
        "মার্চ",
        "এপ্রিল",
        "মে",
        "জুন",
        "জুলাই",
        "আগস্ট",
        "সেপ্টেম্বর",
        "অক্টোবর",
        "নভেম্বর",
        "ডিসেম্বর",
      ];
      var d = new Date();
      var nums = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
      document.querySelector("#clock").innerText = `${days[d.getUTCDay()]}, ${
        months[d.getUTCMonth()]
      } ${d.getUTCDate()} ${d.getUTCFullYear()}`.replace(
        /[0-9]/gi,
        function (x) {
          return nums[x];
        }
      );
    }, 10000);

    var doc = document.documentElement;
    var w = window;
    var tb = document.querySelector(".topbar");

    var prevScroll = w.scrollY || doc.scrollTop;
    var curScroll;
    var direction = 0;
    var prevDirection = 0;

    var header = document.getElementById("site-header");
    var hwraper = document.getElementById("header-wraper");
    var body = document.body;

    var checkScroll = function () {
      /*
       ** Find the direction of scroll
       ** 0 - initial, 1 - up, 2 - down
       */

      curScroll = w.scrollY || doc.scrollTop;
      if (curScroll > prevScroll) {
        //scrolled up
        direction = 2;
      } else if (curScroll < prevScroll) {
        //scrolled down
        direction = 1;
      }

      if (window.getComputedStyle(tb).display == "flex") {
        if (curScroll <= 35) {
          header.style.transition = "0s";
          header.style.top = "0px";
          header.style.position = "relative";
        }
      } else {
        if (curScroll <= 0) {
          header.style.transition = "0s";
          header.style.top = "0px";
          header.style.position = "relative";
        }
      }

      if (direction !== prevDirection) {
        toggleHeader(direction, curScroll);
      }
      prevScroll = curScroll;
    };

    var toggleHeader = function (direction, curScroll) {
      if (direction === 2 && curScroll > 98) {
        //replace 52 with the height of your header in px
        header.style.position = "relative";
        header.style.top = "-98px";
        prevDirection = direction;
      } else if (direction === 1 && curScroll > 98) {
        if (window.getComputedStyle(tb).display == "flex") {
          header.style.top = "-35px";
        } else {
          header.style.top = "-0px";
        }
        header.style.position = "fixed";
        prevDirection = direction;
      }
    };

    window.onscroll = function () {};
    window.onscroll = checkScroll;
  });

  const headerbg = useColorModeValue("white", "rgba(0,0,0,0.4)");
  const color = useColorModeValue("gray.800", "white");
  const lightcolor = useColorModeValue("gray.500", "gray.300");
  const ldcolor = useColorModeValue("gray.800", "gray.300");
  const hovercolor = useColorMode("white", "gray.900");

  return (
    <>
      <Flex
        direction="column"
        h={["64px", "98px", "98px"]}
        w="100%"
        id="header-wraper"
      >
        <Box
          id="site-header"
          position="relative"
          top="0px"
          width="100%"
          zIndex="3"
          transition="all .3s ease"
        >
          <Flex
            w="100%"
            justifyContent="center"
            color={lightcolor}
            borderBottom={border}
            borderColor="gray.200"
          >
            <Flex
              alignItems="center"
              className="topbar"
              h="35px"
              w="100%"
              maxW="1200px"
              display={["none", "flex", "flex"]}
            >
              <Icon color={ldcolor} boxSize="11px" as={ImClock} />
              <Text color={ldcolor} ml="5px" id="clock" fontSize="13px">
                {timeStr}
              </Text>
              <Link href="/">
                <a tabIndex="1" style={{ marginLeft: "6px", fontSize: "14px" }}>
                  <Text
                    _hover={{
                      color: "#FF6700",
                      background: isDark ? "gray.900" : "white",
                    }}
                    h="20px"
                    paddingLeft="7px"
                    borderRadius="5px"
                    paddingRight="7px"
                  >
                    {" "}
                    প্রচ্ছদ
                  </Text>
                </a>
              </Link>
              <Link href="/create-post">
                <a tabIndex="2" style={{ marginLeft: "6px", fontSize: "14px" }}>
                  <Text
                    _hover={{
                      color: "#FF6700",
                      background: isDark ? "gray.900" : "white",
                    }}
                    h="20px"
                    paddingLeft="7px"
                    borderRadius="5px"
                    paddingRight="7px"
                  >
                    {" "}
                    লেখা প্রকাশ করুন
                  </Text>
                </a>
              </Link>
              <Link href="/our-story">
                <a tabIndex="3" style={{ marginLeft: "6px", fontSize: "14px" }}>
                  <Text
                    _hover={{
                      color: "#FF6700",
                      background: isDark ? "gray.900" : "white",
                    }}
                    h="20px"
                    paddingLeft="7px"
                    borderRadius="5px"
                    paddingRight="7px"
                  >
                    আমাদের কথা
                  </Text>
                </a>
              </Link>
              <Link href="/events">
                <a tabIndex="4" style={{ marginLeft: "6px", fontSize: "14px" }}>
                  <Text
                    _hover={{
                      color: "#FF6700",
                      background: isDark ? "gray.900" : "white",
                    }}
                    h="20px"
                    paddingLeft="7px"
                    borderRadius="5px"
                    paddingRight="7px"
                  >
                    {" "}
                    ইভেন্টসমূহ{" "}
                  </Text>
                </a>
              </Link>
              <Flex
                alignItems="center"
                justifyContent="right"
                h="100%"
                flex="1"
                color={ldcolor}
              >
                <Link href="https://facebook.com/BicitroBiggan">
                  <a
                    tabIndex="5"
                    target="_blank"
                    style={{ marginRight: "13px" }}
                  >
                    <Icon
                      _hover={{ color: "#1778f2" }}
                      mt="6px"
                      boxSize="14px"
                      as={FaFacebook}
                    />
                  </a>
                </Link>
                <Link href="#">
                  <a
                    target="_blank"
                    tabIndex="6"
                    style={{ marginRight: "13px" }}
                  >
                    <Icon
                      _hover={{ color: "#00acee" }}
                      mt="6px"
                      boxSize="14px"
                      as={FaTwitter}
                    />
                  </a>
                </Link>
                <Link href="https://instagram.com/BicitroBiggan">
                  <a
                    target="_blank"
                    tabIndex="7"
                    style={{ marginRight: "13px" }}
                  >
                    <Icon
                      _hover={{ color: "#cd486b" }}
                      mt="6px"
                      boxSize="14px"
                      as={FaInstagram}
                    />
                  </a>
                </Link>
                <Link href="#">
                  <a
                    tabIndex="8"
                    target="_blank"
                    style={{ marginRight: "13px" }}
                  >
                    <Icon
                      _hover={{ color: "#FF0000" }}
                      mt="6px"
                      boxSize="14px"
                      as={FaYoutube}
                    />
                  </a>
                </Link>
                <Link href="#">
                  <a tabIndex="9" target="_blank">
                    <Icon
                      _hover={{ color: "#0e76a8" }}
                      mt="6px"
                      boxSize="13px"
                      as={FaLinkedin}
                    />
                  </a>
                </Link>
              </Flex>
            </Flex>
          </Flex>
          <Flex w="100%" bg={useColorModeValue("white", "rgba(26,32,44,0.9)")}>
            <Flex
              alignItems="center"
              className="header"
              justifyContent="center"
              borderBottom={border}
              borderColor="gray.200"
              w="100%"
              h="63px"
              bg={headerbg}
              w="100%"
            >
              <Flex
                maxW="1200px"
                alignItems="center"
                h="100%"
                w="100%"
                justifyContent="left"
              >
                <Menu />
                <Link href="/">
                  <a style={{ userSelect: "none" }} tabIndex="-1">
                    <Image
                      ml="12px"
                      pr="30px"
                      tabIndex="10"
                      h="27px"
                      src={logo}
                    />
                  </a>
                </Link>
                <Flex alignItems="center" justifyContent="right" flex="1">
                  <Icon
                    tabIndex="11"
                    onClick={toggleDarkMode}
                    display={isDark ? "block" : "none"}
                    boxSize="20px"
                    _hover={{ color: "#FF6700" }}
                    as={MdOutlineLightMode}
                    mr="15px"
                    cursor="pointer"
                    style={{ userSelect: "none" }}
                  />
                  <Icon
                    tabIndex="11"
                    onClick={toggleDarkMode}
                    display={!isDark ? "block" : "none"}
                    boxSize="20px"
                    _hover={{ color: "#FF6700" }}
                    as={MdOutlineDarkMode}
                    mr="15px"
                    cursor="pointer"
                    style={{ userSelect: "none" }}
                  />
                  <SearchDialogue />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}

function SearchDialogue() {
  const [data, setData] = useState([
    {
      title: "নিয়ান্ডারথালঃ মাংসখেকো মানুষদের কান্ড!",
      desc: "কোনো প্রাণী যখন তারই প্রজাতির অন্য প্রাণীর মাংস বা শরীরের কোনো অংশ খায় সেটিকে ক্যানিবালিজম বলে। এটি একটি সাধারণ পরিবেশগত…",
      author: "Shawon Mahmud",
      authorId: "shawon",
      image:
        "https://blog.bigyanpriyo.org/wp-content/uploads/2021/10/neandarthals.jpg",
      time: new Date().toISOString(),
      likeCount: "189",
      commentCount: "0",
      slug: "neoof",
      type: "news",
      categories: [
        { name: "নৃবিজ্ঞান", id: "mud", mcat: "blog" },
        { name: "মানুষ", id: "man", mcat: "blog" },
      ],
    },
    {
      title: "নিয়ান্ডারথালঃ মাংসখেকো মানুষদের কান্ড!",
      desc: "কোনো প্রাণী যখন তারই প্রজাতির অন্য প্রাণীর মাংস বা শরীরের কোনো অংশ খায় সেটিকে ক্যানিবালিজম বলে। এটি একটি সাধারণ পরিবেশগত…",
      author: "Shawon Mahmud",
      slug: "neo",
      authorId: "shawon",
      image:
        "https://blog.bigyanpriyo.org/wp-content/uploads/2021/10/neandarthals.jpg",
      time: new Date().toISOString(),
      likeCount: "189",
      commentCount: "0",
      type: "blog",
      categories: [
        { name: "মানুষ", id: "man" },
        { name: "নৃবিজ্ঞান", id: "mud" },
      ],
    },
  ]);
  const [notFound, setnotFound] = useState(!data.length);

  const [isOpen, setIsOpen] = useState(false);
  const [queryStr, setQueryStr] = useState("");
  const router = useRouter();
  function toggleSearch() {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
      let query = router.query;
      if (router.query.hasOwnProperty("query")) {
        query.search = query.query;
      } else {
        query.search = "";
      }
      router.push({ query });
    } else {
      let query = router.query;
      delete query.search;
      router.push({ query });
      document.body.style.overflow = "initial";
    }
    setIsOpen(!isOpen);
  }

  function SearchValChangeHandler(e) {
    let v = e.target.value;
    setQueryStr(v);
    let query = router.query;
    query.search = v;
    router.push({ query });
  }

  function searchOverlayClickHandle(e) {
    console.log(e.target.id);
    if (e.target.id == "search-overlay") {
      toggleSearch();
    }
  }

  function HardSearch() {
    let url = new URL(window.location.origin);
    url.pathname = "/search";
    url.searchParams.append("query", router.query.search);
    window.location = url;
  }

  useEffect(() => {
    if (window) {
      if (router.query.hasOwnProperty("search")) {
        setIsOpen(true);
        setQueryStr(router.query.search);
        document.body.style.overflow = "hidden";
      }
    }
  });

  return (
    <>
      <Icon
        onClick={toggleSearch}
        _hover={{ color: "#FF6700" }}
        tabIndex="12"
        boxSize="20px"
        mr="6.9px"
        style={{ strokeWidth: "20px" }}
        as={IoSearch}
        cursor="pointer"
        style={{ userSelect: "none" }}
      />

      <Flex
        color="white"
        display={isOpen ? "flex" : "none"}
        bg="rgba(0,0,0,0.9)"
        top="0"
        left="0"
        id="search-overlay"
        bottom="0"
        right="0"
        overflow="hidden"
        position="fixed"
        w="100%"
        alignItems="center"
        flexDirection="column"
        h="100%"
        onClick={searchOverlayClickHandle}
      >
        <Flex
          w="100%"
          justifyContent="right"
          mt={{ base: "10px", sm: "35px" }}
          mr={{ base: "10px", sm: "70px" }}
        >
          <Icon
            onClick={toggleSearch}
            _hover={{ color: "#FF6700" }}
            boxSize="30px"
            style={{ strokeWidth: "15" }}
            as={IoClose}
            color="white"
            cursor="pointer"
            style={{ userSelect: "none" }}
          />
        </Flex>
        <Flex w="100%" justifyContent="center">
          <Flex
            bg="red"
            w="95%"
            opacity="1"
            bg="gray.900"
            p="30px"
            flexDirection="column"
            borderRadius="5px"
            maxW="700px"
            mt={{ base: "10px", sm: "40px" }}
          >
            <InputGroup>
              <Input
                id="search-input"
                _placeholder={{
                  color: "rgba(209, 215, 223,0.9)",
                }}
                _focus={{
                  boxShadow: "none",
                }}
                placeholder="এখানে খুজুন..."
                value={queryStr}
                onChange={SearchValChangeHandler}
              />
              <InputRightElement children={<IoSearch onClick={HardSearch} />} />
            </InputGroup>
            {data.map((post, i) => (
              <SearchCard
                categories={post.categories}
                key={i}
                time={post.time}
                title={post.title}
                image={post.image}
                slug={post.slug}
                desc={post.desc}
                type={post.type}
                authorId={post.authorId}
                author={post.author}
                likes={post.likeCount}
                comments={post.commentCount}
              />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

//orng FF6700
//blue 009EFF

function SearchCard({
  title,
  image,
  categories,
  author,
  authorId,
  slug,
  type,
  time,
}) {
  const months = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];
  var nums = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  let d = new Date(time);
  let timeStr = `${
    months[d.getMonth()]
  } ${d.getDate()} ${d.getFullYear()}`.replace(/[0-9]/gi, function (x) {
    return nums[x];
  });
  return (
    <Flex alignItems="center" pt="15px" w="100%">
      <Flex
        w="10%"
        flexDirection="column"
        _hover={{ cursor: "pointer" }}
        minWidth="110px"
        zIndex="2"
      >
        <Link href={`/${type}/${slug}`}>
          <a>
            <Flex borderRadius="10px">
              <Image borderRadius="10px" w="100%" src={image} />
            </Flex>
          </a>
        </Link>
      </Flex>

      <Flex
        h="100%"
        justifyContent="center"
        pl="10px"
        w="69%"
        flexDirection="column"
        h="100%"
      >
        <Link href={`/${type}/${slug}`}>
          <a>
            <Heading
              _hover={{
                color: "rgba(227, 91, 0,1)",
              }}
              fontSize="1.2rem"
            >
              {title}
            </Heading>
          </a>
        </Link>
        <Flex
          alignItems="center"
          color={useColorModeValue("gray.600", "gray.300")}
          mb="1px"
          justifyContent="left"
        >
          <Icon mr="5px" boxSize="12px" as={ImClock} />
          <Text fontSize="0.75rem">{timeStr}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

function Menu() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  return (
    <>
      <Icon
        onClick={onOpen}
        display={{ base: "block", sm: "none" }}
        _hover={{ color: "#FF6700" }}
        tabIndex="12"
        boxSize="25px"
        id="menuButton"
        ml="6.9px"
        style={{ strokeWidth: "15"}}
        outline="none"
        as={AiFillAppstore}
        cursor="pointer"
        style={{ userSelect: "none" }}
      />

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerHeader></DrawerHeader>
        <DrawerContent>
          <Flex
            w="100%"
            justifyContent="center"
            mt={{ base: "10px", sm: "35px" }}
            mr={{ base: "10px", sm: "70px" }}
          >
            <Icon
              onClick={onToggle}
              _hover={{ color: "#FF6700" }}
              boxSize="30px"
              style={{ strokeWidth: "15" }}
              as={IoClose}
              color="white"
              cursor="pointer"
              style={{ userSelect: "none" }}
            />
          </Flex>
          <DrawerBody fontSize="1.3rem" mt="10px">
            <Link href="/create-post">
              <a style={{ userSelect: "none" }}>
                <Text
                  _hover={{
                    color: "#FF6700",
                  }}
                  h="20px"
                >
                  লেখা প্রকাশ করুন
                </Text>
              </a>
            </Link>
            <Link href="/our-story">
              <a style={{ userSelect: "none" }}>
                <Text
                  _hover={{
                    color: "#FF6700",
                  }}
                  mt="10px"
                  h="20px"
                >
                  আমাদের কথা
                </Text>
              </a>
            </Link>
            <Link href="/events">
              <a style={{ userSelect: "none" }}>
                <Text
                  _hover={{
                    color: "#FF6700",
                  }}
                  h="20px"
                  mt="10px"
                >
                  ইভেন্টসমূহ
                </Text>
              </a>
            </Link>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
