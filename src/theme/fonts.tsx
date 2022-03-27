import { Global } from '@mantine/core';

export function Fonts() {
  return (
    <Global
      styles={[
        {
          '@font-face': {
            fontFamily: 'Inter',
            src: `url(/fonts/inter.var.woff2) format("woff2")`,
            fontWeight: '400 700',
            fontStyle: 'normal',
          },
        },
      ]}
    />
  );
}
