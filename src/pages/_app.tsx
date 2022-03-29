import { AppProps } from 'next/app';
import { MantineProvider, ColorScheme } from '@mantine/core';
import { Fonts, theme } from '@/theme';
import NextProgress from 'next-progress';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <MantineProvider theme={{ ...theme }} withGlobalStyles withNormalizeCSS>
      <NextProgress color='#fff' />
      <Fonts />
      <Component {...pageProps} />
    </MantineProvider>
  );
}
