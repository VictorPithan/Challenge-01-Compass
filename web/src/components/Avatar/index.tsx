import { ImgHTMLAttributes } from "react";
import { Container } from "./styles";

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {}

export function Avatar({...props}: AvatarProps) {
  return (
    <Container {...props} />
  )
}