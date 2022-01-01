import NextHead from "next/head";
import { useColorModeValue } from "@chakra-ui/color-mode";

export default function Head({
  title,
  desc,
  type,
  asec,
  time,
  imageURL,
  iheight,
  iwidth,
  ialt,
  url,
  authorfb,
}) {
  imageURL = imageURL ? imageURL : `${url}/res/logos/png/logo.png`;
  return (
    <NextHead>
      <title>{title || process.env.Site_Title}</title>
      <meta name="description" content={desc || process.env.Site_Desc} />
      {url && <link rel="canonical" href={url} />}
      <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large"
      />
      <meta property="og:locale" content="en_US" />
      {type && <meta property="og:type" content={type} />}
      <meta property="og:title" content={title || process.env.Site_Title} />
      <meta property="og:description" content={desc || process.env.Site_Desc} />
      <meta property="og:site_name" content={process.env.Site_Name} />
      {url && <meta property="og:url" content={url} />}
      {type == "article" && (
        <meta
          property="article:publisher"
          content="https://www.facebook.com/bicitrobiggan"
        />
      )}
      {authorfb && <meta property="article:author" content={authorfb} />}
      {asec && <meta property="article:section" content={asec} />}
      {time && <meta property="og:updated_time" content={time} />}
      <meta property="og:image" content={imageURL} />
      <meta property="og:image:secure_url" content={imageURL} />
      {iwidth && <meta property="og:image:width" content={iwidth} />}
      {iheight && <meta property="og:image:height" content={iheight} />}
      {ialt && <meta property="og:image:alt" content={ialt} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:description"
        content={desc || process.env.Site_Desc}
      />
      <meta name="twitter:image" content={imageURL} />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/res/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/res/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/res/favicons/favicon-16x16.png"
      />
       <link rel="manifest" href="/res/favicons/manifest.json" />
       <meta name="theme-color" content={useColorModeValue("#fff","#1a202c")}/>
    </NextHead>
  );
}
