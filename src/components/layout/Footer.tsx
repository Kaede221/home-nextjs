import * as React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FiMail } from "react-icons/fi";
import { SiGithub } from "react-icons/si";
import { Tooltip as TooltipTippy } from "react-tippy";

import { trackEvent } from "@/lib/analytics";

import Accent from "@/components/Accent";
import Spotify from "@/components/layout/Spotify";
import UnstyledLink from "@/components/links/UnstyledLink";
import Tooltip from "@/components/Tooltip";

import { spotifyFlag } from "@/constants/env";

export default function Footer() {
  return (
    <footer className="mt-4 pb-2">
      <main className="layout flex flex-col items-center border-t pt-6 dark:border-gray-600">
        <FooterLinks />

        {spotifyFlag && <Spotify className="mt-8" />}

        <p className="mt-12 font-medium text-gray-600 dark:text-gray-300">
          Ciallo～(∠・ω &lt; )⌒★
        </p>
        <SocialLinks />

        <p className="mt-8 text-sm text-gray-600 dark:text-gray-300">
          © Kaede {new Date().getFullYear()}
        </p>
      </main>
    </footer>
  );
}

function FooterLinks() {
  return (
    <div className="flex flex-wrap justify-center gap-y-4 gap-x-8">
      {footerLinks.map(({ href, text, tooltip }) => (
        <Tooltip interactive={false} key={href} content={tooltip}>
          <UnstyledLink
            className="animated-underline rounded-sm text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-primary-300 dark:text-gray-200"
            href={href}
            onClick={() => {
              trackEvent(`Footer Link: ${text}`, "link");
            }}
          >
            {text}
          </UnstyledLink>
        </Tooltip>
      ))}
    </div>
  );
}

function SocialLinks() {
  const [copyStatus, setCopyStatus] = React.useState("点击图标复制");

  return (
    <div className="mt-2 flex space-x-4">
      <div className="flex items-center justify-center">
        <TooltipTippy
          trigger="mouseenter"
          hideOnClick={false}
          interactive
          html={
            <div className="inline-block rounded-md border bg-white p-2 text-gray-600 shadow-md dark:border-gray-600 dark:bg-dark dark:text-gray-200">
              {copyStatus}
              <Accent className="inline-block font-medium">
                kaedeshimizu@outlook.com
              </Accent>
            </div>
          }
        >
          <CopyToClipboard
            text="kaedeshimizu@outlook.com"
            onCopy={() => {
              setCopyStatus("复制完成啦 🥳");
              setTimeout(() => setCopyStatus("点击图标复制"), 1500);
            }}
          >
            <button className="rounded-sm align-middle focus:outline-none focus-visible:ring focus-visible:ring-primary-300">
              <FiMail className="h-7 w-7 align-middle text-gray-600 hover:text-primary-300 dark:text-gray-300 dark:hover:text-primary-300" />
            </button>
          </CopyToClipboard>
        </TooltipTippy>
      </div>
      {socials.map((social) => (
        <Tooltip interactive={false} key={social.href} content={social.text}>
          <UnstyledLink
            className="inline-flex items-center justify-center rounded-sm focus:outline-none focus-visible:ring focus-visible:ring-primary-300"
            href={social.href}
            onClick={() => {
              trackEvent(`Footer Link: ${social.id}`, "link");
            }}
          >
            <social.icon className="my-auto h-6 w-6 align-middle text-gray-600 transition-colors hover:text-primary-300 dark:text-gray-300 dark:hover:text-primary-300" />
          </UnstyledLink>
        </Tooltip>
      ))}
    </div>
  );
}

const footerLinks = [
  {
    href: "https://github.com/Kaede221/home-nextjs",
    text: "源码",
    tooltip: (
      <>
        本网站 <strong>完全开源</strong> !
      </>
    ),
  },
  {
    href: "/projects",
    text: "项目",
    tooltip: "或许你能找到有用的东西",
  },
];

const socials = [
  {
    href: "https://github.com/Kaede221",
    icon: SiGithub,
    id: "Github",
    text: (
      <>
        你可以在 <Accent className="font-medium">Github</Accent> 看看我的项目
      </>
    ),
  },
];
