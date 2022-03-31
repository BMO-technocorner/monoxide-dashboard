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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
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
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <meta name="apple-mobile-web-app-title" content="Monoxide" />
        <meta name="application-name" content="Monoxide" />
        <meta name="msapplication-TileColor" content="#fafafa" />
        <meta name="theme-color" content="#ffffff" />
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
