if (typeof window !== "undefined") {
  require("tinymce/tinymce");
  require("tinymce/themes/silver");
  require("tinymce/plugins/advlist");
  require("tinymce/plugins/autolink");
  require("tinymce/plugins/lists");
  require("tinymce/plugins/link");
  require("tinymce/plugins/image");
  require("tinymce/plugins/charmap");
  require("tinymce/plugins/print");
  require("tinymce/plugins/preview");
  require("tinymce/plugins/anchor");
  require("tinymce/plugins/searchreplace");
  require("tinymce/plugins/visualblocks");
  require("tinymce/plugins/code");
  require("tinymce/plugins/fullscreen");
  require("tinymce/plugins/insertdatetime");
  require("tinymce/plugins/media");
  require("tinymce/plugins/table");
  require("tinymce/plugins/paste");
  require("tinymce/plugins/code");
  require("tinymce/plugins/help");
  require("tinymce/plugins/wordcount");
  require("tinymce/icons/default");
}

import admin from "firebase-admin";
import { Text, Flex, Input } from "@chakra-ui/react";
import axios from "axios";
import nookies from "nookies";
import Head from "next/head";
import { adminInit } from "../firebase/admin-init";
import { Editor, handleEditorChange } from "@tinymce/tinymce-react";
export default function CreatePost({ session }) {
  return (
    <>
      <Editor
        id="tinymce-html-editor"
        initialValue="<p>আপনার পোস্ট লিখুন...</p>"
        init={{
          selector: "#tinymce",
          branding: false,
          default_link_target: "_blank",
          height: 500,
          content_style: `@import url('/res/fonts/fonts.css');
             p,h1,h2,h3,h4,h5,h6,pre{
               font-family: BalooDa2;
             }
            `,
          menubar: false,
          plugins: [
            "advlist autolink lists link image",
            "charmap print preview anchor help",
            "searchreplace visualblocks code",
            "insertdatetime media table paste wordcount",
          ],
          images_upload_handler: example_image_upload_handler,
          toolbar:
            "undo redo | formatselect | bold italic | \
             alignleft aligncenter alignright | \
             bullist numlist| outdent indent |link charmap|image media|table| \
             code preview ",
          skin_url: "/assets/libs/tinymce/skins/ui/oxide", // Static files path(step 2)
          content_css:
            "/assets/libs/tinymce/skins/content/default/content.min.css", // Static files path(step 2)
        }}
        onChange={handleEditorChange}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    adminInit();
    const cookies = nookies.get(context);
    if (!cookies.idToken) {
      throw err;
    }
    const token = await admin.auth().verifyIdToken(cookies.idToken);
    if (!token.email_verified) {
      throw error;
    }
    const { uid, email } = token;
    return {
      props: {
        session: {
          user: token,
        },
      },
    };
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        permanent: false,
        destination: `/login?ref=${context.resolvedUrl}`,
      },
    };
  }
}

async function example_image_upload_handler(
  blobInfo,
  success,
  failure,
  progress
) {
  function uid() {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4() + "-" + S4();
  }
  let blob = blobInfo.blob();
  let filename = uid() + blobInfo.filename();
  const file = new File([blob], filename, { type: blob.type });
  const res = await fetch(`/api/upload/image?file=${filename}`);
  const { url, fields } = await res.json();
  const formData = new FormData();

  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    formData.append(key, value);
  });
  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  if(!url || !fields.key){
    failure("Something went wrong")
  }
  success(url+fields.key);
}
