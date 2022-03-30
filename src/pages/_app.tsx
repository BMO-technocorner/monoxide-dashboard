import { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { Fonts, theme } from "@/theme";
import NextProgress from "next-progress";
import { ModalsProvider } from "@mantine/modals";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <MantineProvider theme={{ ...theme }} withGlobalStyles withNormalizeCSS>
      <ModalsProvider>
        <NextProgress color="#fff" />
        <Fonts />
        <Component {...pageProps} />
      </ModalsProvider>
    </MantineProvider>
  );
}
