import clsx from "clsx";
import * as React from "react";
import { SiBilibili,SiGithub } from "react-icons/si";

import { trackEvent } from "@/lib/analytics";
import useLoaded from "@/hooks/useLoaded";

import Accent from "@/components/Accent";
import Layout from "@/components/layout/Layout";
import ButtonLink from "@/components/links/ButtonLink";
import UnstyledLink from "@/components/links/UnstyledLink";
import Seo from "@/components/Seo";

export default function IndexPage() {
  const isLoaded = useLoaded();

  return (
    <Layout>
      <Seo />

      <main>
        <section
          className={clsx(
            "min-h-main -mt-20 mb-20 flex flex-col justify-center",
            isLoaded && "fade-in-start"
          )}
        >
          <article className="layout">
            <h2 className="text-2xl md:text-4xl 2xl:text-5xl" data-fade="1">
              Ciallo ★!
            </h2>
            <h1
              className="mt-1 text-3xl md:text-5xl 2xl:text-6xl"
              data-fade="2"
            >
              I'm <Accent>Kaede</Accent>
            </h1>
            <p
              className={clsx(
                "mt-4 max-w-4xl text-gray-700 dark:text-gray-200 md:mt-6",
                "md:text-lg 2xl:text-xl"
              )}
              data-fade="3"
            >
              A normal student, who believe that all things will be better.
            </p>
            <div
              data-fade="5"
              className="mt-8 flex flex-wrap gap-4 md:!text-lg"
            >
              <div className="group relative">
                <ButtonLink href="/blog">Read Blog</ButtonLink>
              </div>
              <ButtonLink href="/about">Learn more about me</ButtonLink>
            </div>
            <div
              data-fade="6"
              className="mt-4 flex flex-wrap gap-4 gap-y-2 md:mt-8"
            >
              {/* 添加社会链接 */}
              <UnstyledLink
                href="https://github.com/Kaede221"
                className={clsx(
                  "inline-flex items-center gap-1 text-sm font-medium md:text-base",
                  "text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white",
                  "focus:outline-none focus-visible:ring focus-visible:ring-primary-300",
                  "transition-colors"
                )}
                onClick={() => {
                  trackEvent("Social Link: Github", "link");
                }}
              >
                <SiGithub className="shrink-0" />
                <span>Kaede221</span>
              </UnstyledLink>

              <UnstyledLink
                href="https://space.bilibili.com/670895955"
                className={clsx(
                  "inline-flex items-center gap-1 text-sm font-medium md:text-base",
                  "text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white",
                  "focus:outline-none focus-visible:ring focus-visible:ring-primary-300",
                  "transition-colors"
                )}
                onClick={() => {
                  trackEvent("Social Link: Bilibili", "link");
                }}
              >
                <SiBilibili className="shrink-0" />
                <span>Kaede清水枫</span>
              </UnstyledLink>
            </div>
          </article>
        </section>
      </main>
    </Layout>
  );
}
