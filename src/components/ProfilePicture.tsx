import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type Props = {
  src: string | StaticImport;
};

export default function ProfilePicture({ src }: Props) {
  return (
    <Image
      src={src}
      alt="User profile picture"
      width={80}
      height={80}
      style={{ border: "solid 2px var(--blue)", borderRadius: 50 }}
    />
  );
}
