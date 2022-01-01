import { useEffect, useState } from "react";
import axios from "axios";
import {
  Text,
  Heading,
  Box,
  Button,
  Flex,
  Spacer,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

export default function Action() {
  const [vmode, setVmode] = useState();
  const [status, setStatus] = useState();
  async function resendEmailVerification(email, continueUrl) {
    setStatus("resendO");
    await axios
      .post("/api/auth/send-email", {
        mode: "verifyEmail",
        email,
        continueUrl,
      })
      .then((data) => {
        setStatus("resendS");
      })
      .catch((err) => {
        setStatus("resendF");
      });
  }
  async function handleVerifyEmail(actionCode, continueUrl, email) {
    setStatus("ongoing");
    setVmode({
      type: "verifyEmail",
      ongoing: {
        title: "ইমেইল যাচাইকরন চলছে...",
        desc: "আপনার ইমেইল যাচাই করা হচ্ছে। অনুগ্রহ করে অপেক্ষা করুন।",
      },
      faild: {
        title: "ইমেইল যাচাইকরন ব্যার্থ!",
        desc: "ভেরিফিকেশন কোডটি বৈধ নয় অথবা মেয়াদ উত্তির্ণ। দয়া করে নতুন করে আবেদন করুন।",
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
    await axios
      .post("/api/auth/verify-email", {
        actionCode,
      })
      .then((data) => {
        window.location.href = continueUrl;
      })
      .catch((err) => {
        setStatus("faild");
      });
  }

  useEffect(() => {
    function getParameterByName(name) {
      return new URLSearchParams(window.location.search).get(name);
    }
    const mode = getParameterByName("mode");
    const email = getParameterByName("email");
    const actionCode = getParameterByName("oobCode");
    const continueUrl = getParameterByName("continueUrl") || "/";
    switch (mode) {
      case "resetPassword":
        // Display reset password handler and UI.
        handleResetPassword(actionCode, continueUrl);
        break;
      case "recoverEmail":
        // Display email recovery handler and UI.
        handleRecoverEmail(actionCode);
        break;
      case "verifyEmail":
        handleVerifyEmail(actionCode, continueUrl, email);
        break;
      default:
      // window.location.href = "/";
    }
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
