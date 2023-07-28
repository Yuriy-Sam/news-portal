export type CategoryType = {
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
export interface AuthUser {
  firstName: string;
  lastName: string;
  avatar: string;
  password: string;
  email: string;
  // Add other properties of the user if needed
}
