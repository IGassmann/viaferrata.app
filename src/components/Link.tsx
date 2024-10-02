import * as Headless from "@headlessui/react";
import NextLink, { type LinkProps } from "next/link";

export default function Link(
  props: LinkProps & React.ComponentPropsWithRef<"a">,
) {
  return (
    <Headless.DataInteractive>
      <NextLink {...props} />
    </Headless.DataInteractive>
  );
}
