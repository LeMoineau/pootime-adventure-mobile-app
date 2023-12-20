import { Image, ImageProps } from "react-native";

export default function IconFromImage({
  uri,
  size,
  width,
  height,
  ...props
}: {
  uri: string;
  size?: number;
  width?: number;
  height?: number;
} & ImageProps) {
  return (
    <Image
      source={{
        uri: uri,
      }}
      style={{ width: size ?? width ?? 50, height: size ?? height ?? 35 }}
      resizeMode="contain"
      {...props}
    ></Image>
  );
}
