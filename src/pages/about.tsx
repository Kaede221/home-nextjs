import clsx from "clsx";
import * as React from "react";

import useLoaded from "@/hooks/useLoaded";

import Accent from "@/components/Accent";
import NextImage from "@/components/images/NextImage";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/Seo";
import TechStack from "@/components/TechStack";

export default function AboutPage() {
  const isLoaded = useLoaded();

  return (
    <Layout>
      <Seo
        templateTitle="About"
        description="你好啊! 这里是Kaede, 当前就是一个普通的男大学生而已,
                  正在努力学习中!"
      />

      <main>
        <section className={clsx(isLoaded && "fade-in-start")}>
          <div className="layout min-h-main py-20">
            <h2 data-fade="0">关于</h2>
            <h1 className="mt-1" data-fade="1">
              <Accent>Kaede 枫</Accent>
            </h1>
            <div className="mt-4" data-fade="2">
              <NextImage
                className="float-right ml-6 w-40 md:w-72"
                src="/about/kaede.png"
                alt="Kaede's Photo"
                width="348"
                height="603"
              />
              <article className="prose dark:prose-invert">
                <p data-fade="3">
                  你好啊! 这里是Kaede, 当前就是一个普通的男大学生而已,
                  正在努力学习中!
                </p>
                <p data-fade="4">
                  我比较喜欢Codeing, 目前熟悉Python, C++, Java等编程语言.
                  当前居住于银川, 喜欢听一些二次元之类的歌曲.
                </p>
                <p data-fade="5">
                  我非常喜欢钻研技术之类的东西, 所以如果需要的话,
                  你可以随时找我, 一起探讨探讨哦, 下面是我的一些联络方式:
                  <ul>
                    <li>kaedeshimizu@outlook.com</li>
                    <li>QQ: 2107578350</li>
                    <li>绝区零: 11489571</li>
                  </ul>
                  最后希望你能在这里找到自己需要的东西! 感谢访问本站!
                </p>
              </article>
              <h3 className="mt-12">Tech Stack</h3>
              <figure className="mt-2">
                <TechStack />
              </figure>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
