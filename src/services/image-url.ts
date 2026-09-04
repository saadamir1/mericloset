import placeholder1 from "../assets/placeholder1.png";
import { mediaUrl } from "../config";

/** Resolve product/CDN image URLs (legacy RAWG crop removed). */
const getCroppedImageUrl = (url: string) => {
  if (!url) return placeholder1;
  return mediaUrl(url) || placeholder1;
};

export default getCroppedImageUrl;
