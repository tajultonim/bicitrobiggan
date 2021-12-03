import {
  Heading,
  Input,
  useColorModeValue,
  Text,
  Flex,
  Button,
  Box,
  Image,
  Icon,
  Tag,
} from "@chakra-ui/react";
import { ImClock, ImFire } from "react-icons/im";
import { FaComments } from "react-icons/fa";
import { Router, useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

export default function Search() {
  const router = useRouter();
  const [queryString, setQueryString] = useState("");
  const [stcQString, setStcQString] = useState("");
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
  useEffect(() => {
    if (window && router.isReady) {
      if (router.query.query) {
        setQueryString(router.query.query);
        setStcQString(router.query.query);
      }
    }
  }, [router]);

  function HardSearch() {
    let url = new URL(window.location.origin);
    url.pathname = "/search";
    url.searchParams.append("query", queryString);
    window.location = url;
  }
  return (
    <>
      <Head>
        <title>{stcQString} - বিচিত্র বিজ্ঞান</title>
      </Head>
      <Heading
        mt={{ base: "20px", sm: "40px" }}
        fontSize={{ base: "2xl", sm: "4xl" }}
        textAlign="center"
      >
        {notFound
          ? "দুঃখিত, ফাঁকা সেট {}"
          : `${stcQString} -এর অনুসন্ধান ফলাফল`}
      </Heading>
      <Flex
        mt={{ base: "10px", sm: "20px" }}
        w="100%"
        alignItems="center"
        flexDirection="column"
      >
        <Flex
          mb={{ base: "-8px", sm: "-10px" }}
          w="95%"
          display={notFound ? "flex" : "none"}
          maxW="770px"
          mt={{ base: "10px", sm: "20px" }}
        >
          <Text fontSize="sm">
            দুঃখিত, কিছুই পাওয়া যায়নি, আপনি বরং অন্য কিওয়ার্ডে খোঁজ করুন।
          </Text>
        </Flex>
        <Flex w="95%" mb="20px" maxW="770px" mt={{ base: "10px", sm: "20px" }}>
          <Input
            _focus={{
              boxShadow: "none",
            }}
            _placeholder={{
              color: useColorModeValue("gray.500", "rgba(209, 215, 223,1)"),
            }}
            mr="5px"
            placeholder="এখানে খুজুন..."
            value={queryString}
            onChange={(e) => {
              setQueryString(e.target.value);
            }}
          />
          <Button
            color="rgba(255, 255, 255,0.9)"
            w="20%"
            ml="5px"
            onClick={HardSearch}
            _focus={{
              boxShadow: "none",
            }}
            _active={{
              bg: "rgba(130,52,1)",
            }}
            _hover={{
              bg: "rgba(227, 91, 0,1)",
              color: "rgba(255, 255, 255,1)",
            }}
            bg="rgba(255, 120, 31,1)"
          >
            খুজুন
          </Button>
        </Flex>
        <Flex
          mb={{ base: "-8px", sm: "-10px" }}
          w="95%"
          maxW="780px"
          mt="20px"
          flexDirection="column"
        >
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
    </>
  );
}

function SearchCard({
  title,
  desc,
  image,
  categories,
  author,
  likes,
  comments,
  authorId,
  slug,
  type,
  time,
}) {
  let category;
  if (categories.length) {
    category = categories[0];
  } else {
    category = "শ্রেণীভুক্ত নয়";
  }
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
    <Flex pb="15px" alignItems="center" pt="15px" w="100%">
      <Flex
        w="31%"
        flexDirection="column"
        _hover={{ cursor: "pointer" }}
        minWidth="200px"
        zIndex="2"
      >
        <Link href={`/${slug}`}>
          <a>
            <Flex borderRadius="10px">
              <Image alt="" borderRadius="10px" w="100%" src={image} />
            </Flex>
          </a>
        </Link>
        <Link href={`/category/${category.id}`}>
          <a>
            <Flex w="100%" mt="-30.5px" ml="-5px" justifyContent="right">
              <Tag
                color="white"
                bg={useColorModeValue(
                  "rgba(227, 91, 0,1)",
                  "rgba(227, 91, 0,1)"
                )}
                borderRadius="5px"
              >
                {category.name}
              </Tag>
            </Flex>
          </a>
        </Link>
      </Flex>

      <Flex pl="10px" w="69%" flexDirection="column" h="100%">
        <Flex
          color={useColorModeValue("gray.600", "gray.300")}
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex alignItems="center" mb="1px" justifyContent="left">
            <Link href={`/author/${authorId}`}>
              <a>
                <Text
                  _hover={{
                    color: "rgba(227, 91, 0,1)",
                  }}
                  mb="3px"
                  fontSize="0.75rem"
                >
                  {author}
                </Text>
              </a>
            </Link>
            <Icon ml="7px" mr="5px" boxSize="12px" as={ImClock} />
            <Text fontSize="0.75rem">{timeStr}</Text>
          </Flex>
          <Flex justifyContent="right" alignItems="center">
            <Icon ml="7px" mr="3px" boxSize="13px" as={FaComments} />
            <Text fontSize="0.75rem" mr="5px">
              {comments}
            </Text>
            <Icon ml="7px" mr="3px" boxSize="12px" as={ImFire} />
            <Text fontSize="0.75rem">{likes}</Text>
          </Flex>
        </Flex>
        <Link href={`/${type}/${slug}`}>
          <a>
            <Heading
              _hover={{
                color: "rgba(227, 91, 0,1)",
              }}
              fontSize="1.5rem"
            >
              {title}
            </Heading>
          </a>
        </Link>
        <Text
          opacity={useColorModeValue("0.9", "1")}
          color={useColorModeValue("gray.600", "gray.300")}
        >
          {desc}
        </Text>
      </Flex>
    </Flex>
  );
}
