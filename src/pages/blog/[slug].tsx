import clsx from "clsx";
import { format } from "date-fns";
import { getMDXComponent } from "mdx-bundler/client";
import { GetStaticPaths, GetStaticProps } from "next";
import * as React from "react";
import { HiOutlineClock } from "react-icons/hi";

import { trackEvent } from "@/lib/analytics";
import { getFileBySlug, getFiles, getRecommendations } from "@/lib/mdx";
import useInjectContentMeta from "@/hooks/useInjectContentMeta";
import useScrollSpy from "@/hooks/useScrollspy";

import Accent from "@/components/Accent";
import BlogCard from "@/components/content/blog/BlogCard";
import Comment from "@/components/content/Comment";
import MDXComponents from "@/components/content/MDXComponents";
import ReloadDevtool from "@/components/content/ReloadDevtool";
import TableOfContents, {
  HeadingScrollSpy,
} from "@/components/content/TableOfContents";
import NextImage from "@/components/images/NextImage";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/Seo";

import { BlogFrontmatter, BlogType } from "@/types/frontmatters";

type SingleBlogPageProps = {
  recommendations: BlogFrontmatter[];
} & BlogType;

export default function SingleBlogPage({
  code,
  frontmatter,
  recommendations,
}: SingleBlogPageProps) {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);

  const populatedRecommendations = useInjectContentMeta(
    "blog",
    recommendations
  );

  const OG_BANNER_LINK = frontmatter.banner;
  //#endregion  //*======== Link Constants ===========

  //#region  //*=========== Scrollspy ===========
  const activeSection = useScrollSpy();

  const [toc, setToc] = React.useState<HeadingScrollSpy>();
  const minLevel =
    toc?.reduce((min, item) => (item.level < min ? item.level : min), 10) ?? 0;

  React.useEffect(() => {
    const headings = document.querySelectorAll(".mdx h1, .mdx h2, .mdx h3");

    const headingArr: HeadingScrollSpy = [];
    headings.forEach((heading) => {
      const id = heading.id;
      const level = +heading.tagName.replace("H", "");
      const text = heading.textContent + "";

      headingArr.push({ id, level, text });
    });

    setToc(headingArr);
  }, [frontmatter.slug]);
  //#endregion  //*======== Scrollspy ===========

  return (
    <Layout>
      <Seo
        templateTitle={frontmatter.title}
        description={frontmatter.description}
        isBlog
        banner={OG_BANNER_LINK}
        date={new Date(
          frontmatter.lastUpdated ?? frontmatter.publishedAt
        ).toISOString()}
      />

      <main>
        <section className="">
          <div className="layout">
              <NextImage
                className="pointer-events-none overflow-hidden rounded-t-md"
                alt="博客头图"
                src={`/blog/${frontmatter.banner}`}
                width={1200}
                height={(1200 * 2) / 5} />
                <div
                  className={clsx(
                    "absolute bottom-0 w-full px-4 py-2",
                    "mt-2 flex flex-wrap justify-end gap-y-1 gap-x-2 text-sm text-black       dark:text-gray-100"
                  )}
                >
              <div className="mt-6 flex items-center justify-start gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-1">
                  <HiOutlineClock className="inline-block text-base" />
                  <Accent>{frontmatter.readingTime.text}</Accent>
                </div>
              </div>
            </div>

            <hr className="dark:border-gray-600" />

            <section className="lg:grid lg:grid-cols-[auto,250px] lg:gap-8">
              <article className="mdx prose mx-auto mt-4 w-full transition-colors dark:prose-invert">
                <Component
                  components={
                    {
                      ...MDXComponents,
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } as any
                  }
                />
              </article>

              <aside className="py-4">
                <div className="sticky top-36">
                  <TableOfContents
                    toc={toc}
                    minLevel={minLevel}
                    activeSection={activeSection}
                  />
                </div>
              </aside>
            </section>

            <figure className="mt-12">
              <Comment key={frontmatter.slug} />
            </figure>

            {populatedRecommendations.length > 0 && (
              <div className="mt-20">
                <h2>
                  <Accent>你可能也想看...</Accent>
                </h2>
                <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {populatedRecommendations.map((post, i) => (
                    <BlogCard
                      onClick={() => {
                        trackEvent(post.slug, "recommend");
                      }}
                      className={clsx({ "hidden xl:block": i === 2 })}
                      key={post.slug}
                      post={post}
                    />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getFiles("blog");

  return {
    paths: posts.map((p) => ({
      params: {
        slug: p.replace(/\.mdx/, ""),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const post = await getFileBySlug("blog", params?.slug as string);

  const recommendations = await getRecommendations(params?.slug as string);

  return {
    props: { ...post, recommendations },
  };
};
