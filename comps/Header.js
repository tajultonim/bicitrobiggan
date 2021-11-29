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
} from "@chakra-ui/react";

import Link from "next/link";

import { IoSearch } from "react-icons/io5";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import {
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";
import { ImClock } from "react-icons/im";

import { useState, useEffect } from "react";

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
  function search() {
    alert("ok");
  }

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
      console.log(curScroll);

      if (window.getComputedStyle(tb).display == "flex") {
        if (curScroll <= 35) {
          header.style.transition = "0s";
          header.style.top = "0px";
          header.style.position = "relative";
        }
      } else {
        if (curScroll <= 0) {
          header.style.transition = "0.3s";
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

    window.addEventListener("scroll", checkScroll);
  });

  const headerbg = useColorModeValue("white", "#0000004D");
  const color = useColorModeValue("gray.800", "white");
  const lightcolor = useColorModeValue("gray.500", "gray.300");
  const ldcolor = useColorModeValue("gray.800", "gray.300");
  const hovercolor = useColorMode("white", "gray.900");

  return (
    <>
      <Box
        id="site-header"
        position="relative"
        top="0px"
        width="100%"
        zIndex="100"
        transition="all .3s ease"
      >
        <Flex
          alignItems="center"
          borderBottom={border}
          className="topbar"
          borderColor="gray.200"
          h="35px"
          pl={["10px", "10px", "110px"]}
          w="100%"
          color={lightcolor}
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
            pr={["10px", "10px", "110px"]}
          >
            <Link href="https://facebook.com/BicitroBiggan">
              <a tabIndex="5" target="_blank" style={{ marginRight: "13px" }}>
                <Icon
                  _hover={{ color: "#1778f2" }}
                  mt="6px"
                  boxSize="14px"
                  as={FaFacebook}
                />
              </a>
            </Link>
            <Link href="#">
              <a target="_blank" tabIndex="6" style={{ marginRight: "13px" }}>
                <Icon
                  _hover={{ color: "#00acee" }}
                  mt="6px"
                  boxSize="14px"
                  as={FaTwitter}
                />
              </a>
            </Link>
            <Link href="https://instagram.com/BicitroBiggan">
              <a target="_blank" tabIndex="7" style={{ marginRight: "13px" }}>
                <Icon
                  _hover={{ color: "#cd486b" }}
                  mt="6px"
                  boxSize="14px"
                  as={FaInstagram}
                />
              </a>
            </Link>
            <Link href="#">
              <a tabIndex="8" target="_blank" style={{ marginRight: "13px" }}>
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
        <Flex
          alignItems="center"
          className="header"
          borderBottom={border}
          borderColor="gray.200"
          w="100%"
          h="63px"
          bg={headerbg}
          color={color}
          pl={["10px", "10px", "110px"]}
        >
          <Link href="/">
            <a style={{ userSelect: "none" }} tabIndex="-1">
              <Image tabIndex="10" h="27px" src={logo} />
            </a>
          </Link>
          <Flex
            alignItems="center"
            justifyContent="right"
            h="100%"
            flex="1"
            pr={["10px", "10px", "110px"]}
          >
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
            <Icon
              onClick={() => {
                search();
              }}
              _hover={{ color: "#FF6700" }}
              tabIndex="12"
              boxSize="17.6px"
              style={{ strokeWidth: "15" }}
              as={IoSearch}
              cursor="pointer"
              style={{ userSelect: "none" }}
            />
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

//orng FF6700
//blue 009EFF
