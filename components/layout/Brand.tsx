import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Brand mark remains separate from text so it scales without stretching. */
export function Brand({ iconOnly = false, className }: { iconOnly?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="ByteSpace home" className={cn("brand", className)}>
      <Image src="/assets/brand/logo-icon.png" alt="" width={29} height={32} />
      {!iconOnly && <span>ByteSpace</span>}
    </Link>
  );
}
