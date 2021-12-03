
import { useAuth } from "../firebase/auth";
import { verifyIdToken } from "../firebase/verify";
import { useState, useEffect } from "react";
import nookies from "nookies";
export default function CreatePost({session}) {
 
  return <></>;
}

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.tocen);
    const { uid, email } = token;
    return {
      props: {
        session: {
          email,
          uid,
          token: nookies.get(context).token,
        },
      },
    };
  } catch {
   //   console.log(context)
    return { redirect: {
        permanent: false,
        destination: `/login?ref=${context.resolvedUrl}`
      } };
  }
}
