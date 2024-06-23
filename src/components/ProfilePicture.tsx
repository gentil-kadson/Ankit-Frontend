import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type Props = {
  src: string | StaticImport;
  width: number;
  height: number;
};

export default function ProfilePicture({ src, width, height }: Props) {
  return (
    <Image
      src={src}
      alt="User profile picture"
      width={width}
      height={height}
      style={{ border: "solid 2px var(--blue)", borderRadius: 50 }}
    />
  );
}
