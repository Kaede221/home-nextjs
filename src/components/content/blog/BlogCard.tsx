import clsx from "clsx";
import { format } from "date-fns";
import * as React from "react";
import { HiOutlineClock, HiOutlineEye } from "react-icons/hi";

import Accent from "@/components/Accent";
import Tag from "@/components/content/Tag";
import NextImage from "@/components/images/NextImage";
import UnstyledLink from "@/components/links/UnstyledLink";

import { BlogFrontmatter, InjectedMeta } from "@/types/frontmatters";

type BlogCardProps = {
  post: BlogFrontmatter & InjectedMeta;
  checkTagged?: (tag: string) => boolean;
} & React.ComponentPropsWithoutRef<"li">;

export default function BlogCard({
  post,
  className,
  checkTagged,
  onClick,
}: BlogCardProps) {
  return (
    <li
      className={clsx(
        "w-full rounded-md border border-gray-300 bg-white dark:border-gray-600 dark:bg-dark",
        "scale-100 hover:scale-[1.02] active:scale-[0.97] motion-safe:transform-gpu",
        "transition duration-100",
        "motion-reduce:hover:scale-100",
        "animate-shadow",
        className
      )}
      onClick={onClick}
    >
      <UnstyledLink
        className="block h-full rounded-md focus:outline-none focus-visible:ring focus-visible:ring-primary-300"
        href={`/blog/${post.slug}`}
      >
        <div className="relative">
          {
            // TODO 为了方便, 直接指定blog目录, 然后获取就好
            // TODO 同时这里使用了NextImage, 这样会方便一些
          }
          <NextImage
          className="pointer-events-none overflow-hidden rounded-t-md"
          alt="博客头图"
          src={`/blog/${post.banner}`}
          width={1200}
          height={(1200 * 2) / 5} />
          <div
            className={clsx(
              "absolute bottom-0 w-full px-4 py-2",
              "mt-2 flex flex-wrap justify-end gap-y-1 gap-x-2 text-sm text-black dark:text-gray-100"
            )}
          >
            {post.tags.split(",").map((tag) => (
              <Tag
                tabIndex={-1}
                className="bg-opacity-80 dark:!bg-opacity-60"
                key={tag}
              >
                {checkTagged?.(tag) ? <Accent>{tag}</Accent> : tag}
              </Tag>
            ))}
          </div>
        </div>
        <div className="p-4">
          <h4 className="text-gray-800 dark:text-gray-100">{post.title}</h4>
          <div className="mt-2 flex items-center justify-start gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-1">
              <HiOutlineClock className="inline-block text-base" />
              <Accent>{post.readingTime.text}</Accent>
            </div>
            <div className="flex items-center gap-1">
              <HiOutlineEye className="inline-block text-base" />
              <Accent>{post?.views?.toLocaleString() ?? "–––"} views</Accent>
            </div>
          </div>
          <p className="mt-4 mb-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="font-bold text-gray-800 dark:text-gray-100">
              {format(
                new Date(post.lastUpdated ?? post.publishedAt),
                "MMMM dd, yyyy"
              )}
            </span>
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {post.description}
          </p>
        </div>
      </UnstyledLink>
    </li>
  );
}
