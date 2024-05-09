'use client'

import React from 'react'
import { Providers } from './providers'
import { theme } from '@/plugins/chakra-ui/theme'
import { ColorModeScript } from '@chakra-ui/react'
import '@/assets/styles/globals.css'

// then replace the whole /public/favicon folder and favicon.ico
const favicons: Array<React.ComponentPropsWithoutRef<'link'>> = [
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/favicon/apple-touch-icon.png'
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon/favicon-32x32.png'
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon/favicon-16x16.png'
  },
  { rel: 'manifest', href: '/favicon/site.webmanifest' },
  {
    rel: 'mask-icon',
    href: '/favicon/safari-pinned-tab.svg',
    color: '#00e887'
  },
  { rel: 'shortcut icon', href: '/favicon/favicon.ico' }
]

export default function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Boilerplate Next Chakra UI</title>
        {/* Favicons */}
        {favicons.map(linkProps => (
          <link key={linkProps.href} {...linkProps} />
        ))}
      </head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
