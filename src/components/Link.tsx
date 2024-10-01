import * as Headless from '@headlessui/react'
import NextLink, { type LinkProps } from 'next/link'
import React from 'react'

export default function Link(
  props: LinkProps,
) {
  return (
    <Headless.DataInteractive>
      <NextLink {...props} />
    </Headless.DataInteractive>
  )
}
