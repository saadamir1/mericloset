import placeholder1 from "../assets/placeholder1.png";

const getCroppedImageUrl = (url: string) => {
  if (!url) return placeholder1; // if no image, use default placeholder
  const target = "media/";
  const index = url.indexOf(target) + target.length; // url give lenght till start of target, so we added target' length to reach end of our target
  return url.slice(0, index) + "crop/600/400/" + url.slice(index);
};

export default getCroppedImageUrl;
