import Head from "next/head";
import styles from "@/components/Layout.module.scss";

interface iLayoutCocolisProps {
  children?: React.ReactNode;
}

export const siteDescription =
  "HU Zuoqin is an experienced software engineer based in Paris. She does full-stack projects with a focus on front-end development using React.";
export const siteTitle =
  "HU ZUOQIN | Software Engineer in Paris, Focus on Front-End Development using React";
export const faviconURL = "/images/favicon.ico";
export default function LayoutCocolis(props: iLayoutCocolisProps) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href={faviconURL}></link>
        <meta charSet="utf-8"></meta>
        <meta httpEquiv="x-ua-compatible" content="ie=edge"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        ></meta>
        <meta name="generator" content="Next.js@12.0.10"></meta>
        <meta name="description" content={siteDescription}></meta>

        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image"></meta>

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        ></link>
        <link rel="icon" type="image/png" href={faviconURL}></link>
        <meta property="og:site_name" content={siteTitle}></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:locale" content="en_gb"></meta>
        <meta property="og:title" content={siteTitle}></meta>
        <meta property="og:description" content={siteDescription}></meta>
        <meta name="twitter:devleloper" content="@HUZUOQIN"></meta>
        <title>Mapbox</title>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      {props.children}
    </div>
  );
}
