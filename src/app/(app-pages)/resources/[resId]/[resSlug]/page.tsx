import {MDXRemote} from "next-mdx-remote/rsc";
import {Error404Page} from "@/components/Error404Page";

export default async function ResourcePage({ params }: { params: { resId: string, resSlug: string } }) {
  const resId = params.resId;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resources/${resId}`);
  if (!response.ok) {
      return <Error404Page />;
  }

  const data = await response.json();
  const content = data.content;

  return <MDXRemote source={content} />
}
