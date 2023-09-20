import { Header, ProfileSidebar } from "@/components";
import { Metadata, ResolvingMetadata } from "next";
type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const product = await fetch(
    `https://news-portal-iota.vercel.app/api/post/${id}`
  )
    .then((res) => res.json())
    .then((data) => data.post);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product.title + " - Scope",
    openGraph: {
      images: [product.mainImage, ...previousImages],
    },
  };
}
function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return <>{children}</>;
}
export default AuthLayout;
