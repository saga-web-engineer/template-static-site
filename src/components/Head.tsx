import { config } from '../config';

const GOOGLE_FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Noto+Serif+JP:wght@700&display=swap';

type Props = {
  title: string;
  description: string;
  url: string;
};

export const Head = ({ title, description, url }: Props) => (
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="format-detection" content="telephone=no" />
    <title>{title}</title>
    <meta name="title" content={title} />
    <meta name="description" content={description} />
    <meta property="og:locale" content="ja_JP" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={`${config.baseUrl}/ogp.jpg`} />
    <meta property="og:site-name" content={config.siteName} />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={url} />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:image" content={`${config.baseUrl}/ogp.jpg`} />
    <meta property="twitter:description" content={description} />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
    <link rel="preload" as="style" href={GOOGLE_FONTS_URL} />
    <link
      rel="stylesheet"
      href={GOOGLE_FONTS_URL}
      media="print"
      onload="this.media='all'"
    />
    <noscript>
      <link href={GOOGLE_FONTS_URL} rel="stylesheet" />
    </noscript>
    <link rel="icon" href={`${config.path}favicon.ico`} sizes="any" />
    <link rel="icon" href={`${config.path}favicon.svg`} type="image/svg+xml" />
    <link rel="apple-touch-icon" href={`${config.path}apple-touch-icon.png`} />
    <link rel="manifest" href={`${config.path}manifest.webmanifest`} />
    <link rel="stylesheet" href={`${config.path}assets/css/style.css`} />
    <script defer src={`${config.path}assets/js/bundle.js`}></script>
  </head>
);
