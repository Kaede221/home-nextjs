import clsx from "clsx";
import { InferGetStaticPropsType } from "next";
import * as React from "react";

import { getAllFilesFrontmatter } from "@/lib/mdx";
import { getTags, sortByDate, sortDateFn } from "@/lib/mdx-client";
import useInjectContentMeta from "@/hooks/useInjectContentMeta";
import useLoaded from "@/hooks/useLoaded";

import Accent from "@/components/Accent";
import BlogCard from "@/components/content/blog/BlogCard";
import ContentPlaceholder from "@/components/content/ContentPlaceholder";
import Tag, { SkipNavTag } from "@/components/content/Tag";
import StyledInput from "@/components/form/StyledInput";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/Seo";

import { BlogFrontmatter, InjectedMeta } from "@/types/frontmatters";

export default function IndexPage({
  posts,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  /** Lazy init from session storage to preserve preference on revisit */
  const isLoaded = useLoaded();

  const populatedPosts = useInjectContentMeta("blog", posts);

  //#region  //*=========== Search ===========
  const [search, setSearch] = React.useState<string>("");
  const [filteredPosts, setFilteredPosts] = React.useState<
    Array<BlogFrontmatter & InjectedMeta>
  >(() => [...posts]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  React.useEffect(() => {
    const results = populatedPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase()) ||
        // Check if splitted search contained in tag
        search
          .toLowerCase()
          .split(" ")
          .every((tag) => post.tags.includes(tag))
    );

    // 这里直接让通过日期排序就好了
    results.sort(sortDateFn);
    sessionStorage.setItem("blog-sort", "0");
    setFilteredPosts(results);
  }, [search, populatedPosts]);
  //#endregion  //*======== Search ===========

  //#region  //*=========== Post Language Splitter ===========
  const englishPosts = filteredPosts.filter((p) => !p.slug.startsWith("id-"));
  const currentPosts = englishPosts;
  //#endregion  //*======== Post Language Splitter ===========

  //#region  //*=========== Tag ===========
  const toggleTag = (tag: string) => {
    // If tag is already there, then remove
    if (search.includes(tag)) {
      setSearch((s) =>
        s
          .split(" ")
          .filter((t) => t !== tag)
          ?.join(" ")
      );
    } else {
      // append tag
      setSearch((s) => (s !== "" ? `${s.trim()} ${tag}` : tag));
    }
  };

  /** Currently available tags based on filtered posts */
  const filteredTags = getTags(currentPosts);

  /** Show accent if not disabled and selected  */
  const checkTagged = (tag: string) => {
    return (
      filteredTags.includes(tag) &&
      search.toLowerCase().split(" ").includes(tag)
    );
  };
  //#endregion  //*======== Tag ===========

  return (
    <Layout>
      <Seo templateTitle="博客" description="想法, 思考, 各种东西都汇聚于此" />

      <main>
        <section className={clsx(isLoaded && "fade-in-start")}>
          <div className="layout py-12">
            <h1 className="text-3xl md:text-5xl" data-fade="0">
              <Accent>博客</Accent>
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300" data-fade="1">
              想法与思考, 都会聚集于此
            </p>
            <StyledInput
              data-fade="2"
              className="mt-4"
              placeholder="搜素..."
              onChange={handleSearch}
              value={search}
              type="text"
            />
            <div
              className="mt-2 flex flex-wrap items-baseline justify-start gap-2 text-sm text-gray-600 dark:text-gray-300"
              data-fade="3"
            >
              <span className="font-medium">选择Tag:</span>
              <SkipNavTag>
                {tags.map((tag) => (
                  <Tag
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    disabled={!filteredTags.includes(tag)}
                  >
                    {checkTagged(tag) ? <Accent>{tag}</Accent> : tag}
                  </Tag>
                ))}
              </SkipNavTag>
            </div>
            <ul
              className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
              data-fade="5"
            >
              {currentPosts.length > 0 ? (
                currentPosts.map((post) => (
                  <BlogCard
                    key={post.slug}
                    post={post}
                    checkTagged={checkTagged}
                  />
                ))
              ) : (
                <ContentPlaceholder />
              )}
            </ul>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const files = await getAllFilesFrontmatter("blog");
  const posts = sortByDate(files);

  // Accumulate tags and remove duplicate
  const tags = getTags(posts);

  return { props: { posts, tags } };
}
