export type CategoryType = {
  _id?: string;
  value: string;
  title: string;
  image?: string;
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
export interface AuthUserType {
  firstName: string;
  lastName: string;
  avatar: string;
  password: string;
  email: string;
}
