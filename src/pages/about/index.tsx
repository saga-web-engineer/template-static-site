import { Footer } from '../../components/Footer';
import { Head } from '../../components/Head';
import { Header } from '../../components/Header';
import { config } from '../../config';

export default function AboutPage() {
  return (
    <html lang="ja">
      <Head
        title={`About | ${config.siteName}`}
        description="JSX + Sass(scss) + TypeScriptで静的なWebサイトを構築するためのテンプレートのAboutページ"
        url={`${config.baseUrl}/about/`}
      />
      <body>
        <div class="layout u-grid">
          <Header />
          <main class="p-about">
            <div class="c-wrapper p-about__wrapper u-mx-auto">
              <h2>About</h2>
            </div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
