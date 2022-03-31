import { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { Fonts, theme } from "@/theme";
import NextProgress from "next-progress";
import { ModalsProvider } from "@mantine/modals";
import { Fragment } from "react";
import Head from "next/head";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <Fragment>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <meta
          name="application-name"
          content={process.env.NEXT_PUBLIC_APP_NAME}
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="apple-mobile-web-app-title"
          content={process.env.NEXT_PUBLIC_APP_NAME}
        />
        <meta
          name="description"
          content="Control dashboard for monoxide devices"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/touch-icon-iphone.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/touch-icon-ipad.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/touch-icon-iphone-retina.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/touch-icon-ipad-retina.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.ico" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={`${process.env.NEXT_PUBLIC_URL}`} />
        <meta name="twitter:title" content={process.env.NEXT_PUBLIC_APP_NAME} />
        <meta
          name="twitter:description"
          content="Control dashboard for monoxide devices"
        />
        <meta
          name="twitter:image"
          content={`${process.env.NEXT_PUBLIC_URL}/android-chrome-192x192.png`}
        />
        <meta name="twitter:creator" content="@monoxide" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={process.env.NEXT_PUBLIC_APP_NAME} />
        <meta
          property="og:description"
          content="Control dashboard for monoxide devices"
        />
        <meta
          property="og:site_name"
          content={process.env.NEXT_PUBLIC_APP_NAME}
        />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}`} />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_URL}/apple-touch-icon.png`}
        />
      </Head>
      <MantineProvider theme={{ ...theme }} withGlobalStyles withNormalizeCSS>
        <ModalsProvider>
          <NextProgress color="#fff" />
          <Fonts />
          <Component {...pageProps} />
        </ModalsProvider>
      </MantineProvider>
    </Fragment>
  );
}
