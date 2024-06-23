import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type Props = {
  src: string | StaticImport;
  width: number;
  height: number;
  onClick?: () => void;
};

export default function ProfilePicture({ src, width, height, onClick }: Props) {
  return (
    <Image
      src={src}
      alt="User profile picture"
      width={width}
      height={height}
      onClick={onClick}
      style={{
        border: "solid 0.125rem var(--blue)",
        borderRadius: 50,
        cursor: "pointer",
      }}
    />
  );
}
