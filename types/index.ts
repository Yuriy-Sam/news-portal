export type CategoryType = {
  value: string;
  title: string;
};
type AutorType = {
  name: string;
  image: string;
};
export type PostType = {
  url: string;
  image: string;
  title: string;
  text: string;
  imageSize?: number;
  autor: AutorType;
  categories?: Array<CategoryType>;
};
