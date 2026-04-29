import { Footer } from "../components/Footer";
import { Head } from "../components/Head";
import { Header } from "../components/Header";
import { config } from "../config";

export default function IndexPage() {
  const logos = [
    { name: "JSX(kita-html)", path: "ejs", width: "120", height: "120" },
    { name: "Sass(scss)", path: "sass", width: "160", height: "120" },
    { name: "TypeScript", path: "typescript", width: "120", height: "120" },
  ] as const;

  return (
    <html lang="ja">
      <Head
        title={config.siteName}
        description="JSX + Sass(scss) + TypeScriptで静的なWebサイトを構築するためのテンプレート"
        url={config.baseUrl}
      />
      <body>
        <div class="layout">
          <Header />
          <main class="p-top">
            <div class="c-wrapper u-mx-auto p-top__wrapper">
              <div class="p-topLogo">
                {logos.map((logo) => (
                  <figure class="p-topLogo__img">
                    <img
                      class="u-mx-auto"
                      src={`${config.path}assets/img/top/${logo.path}.svg`}
                      alt=""
                      width={logo.width}
                      height={logo.height}
                    />
                    <figcaption>{logo.name}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
