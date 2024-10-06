import { customAlphabet } from "nanoid";

/**
 * The available prefixes for public IDs.
 *
 * @remarks
 * A prefix value must be 5 characters or less.
 */
export const PREFIXES = {
  route: "route",
  user: "user",
  rating: "rat",
} as const;

const prefixMaxLength = 5;
if (Object.values(PREFIXES).some((prefix) => prefix.length > prefixMaxLength)) {
  throw new Error("Prefixes must be 5 characters or less");
}

type Prefix = (typeof PREFIXES)[keyof typeof PREFIXES];

export function isValidPrefix(prefix: string): prefix is Prefix {
  const validPrefixes: string[] = Object.values(PREFIXES);
  return validPrefixes.includes(prefix);
}

const lowercasedBase36Digits = "0123456789abcdefghijklmnopqrstuvwxyz";
const nanoIDLength = 12;
const nanoID = customAlphabet(lowercasedBase36Digits, nanoIDLength);

export type PublicID<P extends Prefix = Prefix> = `${P}_${string}`;

export const MAX_LENGTH = prefixMaxLength + 1 + nanoIDLength;

/**
 * Creates a new public ID with the given prefix.
 *
 * @example
 * ```
 * import * as PublicID from "@/lib/PublicID";
 *
 * const newPublicID = PublicID.create(PublicID.PREFIXES.route);
 * ```
 */
export function create<P extends Prefix>(prefix: P): PublicID<P> {
  return `${prefix}_${nanoID()}`;
}

export function isValid(id: string): id is PublicID {
  const [prefix, nanoid] = id.split("_");

  if (!prefix || !nanoid) return false;

  if (!isValidPrefix(prefix)) return false;

  if (nanoid.length !== nanoIDLength) return false;

  for (const char of nanoid) {
    if (!lowercasedBase36Digits.includes(char)) return false;
  }

  return true;
}
