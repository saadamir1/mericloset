import Platform from "./Platform";
import Genre from "./Genre";
import Publisher from "./Publisher";

export default interface Product {
  id: number;
  name: string;
  slug: string;
  background_image: string;
  description_raw: string;
  metacritic: number;
  publishers: Publisher[];
  genres: Genre[];
  parent_platforms: { platform: Platform }[]; //parent_platforms is array of object where each object has a property called platform
  rating_top: number; //whole rating no.
  rating: number; //float rating no.
}
