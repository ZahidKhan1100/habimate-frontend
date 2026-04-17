import type { ImageLoaderProps } from "next/image";

/**
 * Use with next/image: loader={cloudinaryLoader} src="folder/image" (path after upload/)
 * Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in .env
 */
export function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloud) {
    return src.startsWith("http") ? src : `/${src}`;
  }
  const params = [`w_${width}`, "c_limit", "f_auto", `q_${quality ?? 75}`];
  const cleanSrc = src.replace(/^\//, "");
  return `https://res.cloudinary.com/${cloud}/image/upload/${params.join(",")}/${cleanSrc}`;
}
