"use client";

import { DurationFormat } from "@formatjs/intl-durationformat";
import type {
  DurationFormatOptions,
  DurationInput,
} from "@formatjs/intl-durationformat/src/types";

type FormattedDurationProps = DurationFormatOptions & {
  value: DurationInput;
  className?: string;
};

/**
 * @privateRemarks
 *
 * This uses a polyfill for the `Intl.DurationFormat` API to format the duration.
 * It should be replaced with the native API when it becomes available in all major browsers:
 * {@link https://caniuse.com/mdn-javascript_builtins_intl_durationformat_format}
 */
export default function FormattedDuration({
  value,
  className,
  ...formatOptions
}: FormattedDurationProps) {
  return (
    <span className={className}>
      {new DurationFormat(undefined, formatOptions).format(value)}
    </span>
  );
}
