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

export type ContentType = {
  type: "image" | "subtitle" | "content";
  // image?: string;
  // subtitle?: string;
  // content?: string;
  value: string;
};

export type PostType = {
  mainImage: string;
  title: string;
  content: ContentType[];
  imageSize?: number;
  autor: AuthUserType;
  categories?: Array<CategoryType>;
  views: number;
  date?: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
};
export interface AuthUserType {
  firstName: string;
  lastName: string;
  avatar: string;
  password?: string;
  email: string;

  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}
