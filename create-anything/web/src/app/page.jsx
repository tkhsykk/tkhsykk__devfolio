import {
  Github,
  Mail,
  ExternalLink,
  Code,
  Globe,
  Database,
  Settings,
  GitBranch,
  Search,
} from "lucide-react";
import { useState } from "react";

export default function PortfolioPage() {
  const [hoveredWork, setHoveredWork] = useState(null);

  const skillCategories = [
    {
      title: "Markup / Style",
      skills: [
        "HTML5",
        "SCSS(Sass)",
        "BEM",
        "セマンティックHTML",
        "アクセシビリティ対応(WCAG)",
      ],
      icon: <Code className="w-6 h-6 text-[#FF006C]" />,
    },
    {
      title: "Build / Tools",
      skills: ["Gulp", "Webpack", "Vite"],
      icon: <Settings className="w-6 h-6 text-[#FF006C]" />,
    },
    {
      title: "CMS / Backend",
      skills: ["WordPress（テーマ／ブロック／プラグイン）", "PHP"],
      icon: <Database className="w-6 h-6 text-[#FF006C]" />,
    },
    {
      title: "Environment",
      skills: ["Docker", "XAMPP", "VSCode"],
      icon: <Globe className="w-6 h-6 text-[#FF006C]" />,
    },
    {
      title: "Version Control / Deployment",
      skills: ["Git", "GitHub", "SSH", "VPS構築", "自動デプロイ設定"],
      icon: <GitBranch className="w-6 h-6 text-[#FF006C]" />,
    },
    {
      title: "Optimization / SEO",
      skills: ["Core Web Vitals", "構造化データ", "メタ最適化", "画像圧縮"],
      icon: <Search className="w-6 h-6 text-[#FF006C]" />,
    },
  ];

  const works = [
    {
      id: 1,
      title: "ECサイトリニューアル",
      thumbnail:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
      scope: "フロントエンド設計・WordPressテーマ開発",
      technologies: ["WordPress", "SCSS", "Gulp", "PHP"],
      features: "レスポンシブ対応、SEO最適化、高速化",
      details:
        "既存ECサイトの完全リニューアル。WordPressをベースとした柔軟なCMS設計により、クライアントが容易にコンテンツを更新できる仕組みを構築。Core Web Vitalsスコア大幅改善を実現。",
    },
    {
      id: 2,
      title: "コーポレートサイト構築",
      thumbnail:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      scope: "要件定義・設計・開発・デプロイ",
      technologies: ["Docker", "WordPress", "Vite", "SCSS"],
      features: "多言語対応、アクセシビリティ対応、CMS化",
      details:
        "B2B企業向けコーポレートサイト。多言語対応とアクセシビリティ（WCAG 2.1 AA準拠）を重視した設計。Docker環境での開発効率化とViteを活用した高速なビルドプロセスを実現。",
    },
    {
      id: 3,
      title: "メディアサイト高速化",
      thumbnail:
        "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=800",
      scope: "パフォーマンス改善・インフラ最適化",
      technologies: ["WordPress", "CDN", "画像最適化", "キャッシュ"],
      features: "表示速度向上、画像最適化、CDN導入",
      details:
        "大規模メディアサイトの表示速度改善プロジェクト。画像の適切な圧縮・最適化、CDNの導入、効率的なキャッシュ戦略により、PageSpeed Insightsスコアを30点台から90点台へ改善。",
    },
  ];

  const techNotes = [
    {
      title: "Gulpによる開発自動化",
      description:
        "SCSS コンパイル、画像圧縮、ファイル監視を自動化するGulpタスクの構築方法",
      date: "2024.11",
    },
    {
      title: "Viteを使った軽量開発",
      description:
        "モダンなフロントエンド開発環境としてViteを活用した高速な開発フローの構築",
      date: "2024.10",
    },
    {
      title: "Dockerでの共有環境構築",
      description:
        "チーム開発における環境統一とデプロイメント効率化のためのDocker活用術",
      date: "2024.09",
    },
    {
      title: "WordPressブロックカスタマイズ",
      description:
        "Gutenbergブロックエディターのカスタムブロック開発とテーマとの連携方法",
      date: "2024.08",
    },
    {
      title: "SEO向け構造化データ",
      description:
        "検索エンジン最適化のための構造化データ実装とCore Web Vitals改善",
      date: "2024.07",
    },
    {
      title: "アクセシビリティ改善",
      description:
        "WCAG 2.1 ガイドラインに準拠したWebアクセシビリティの実装と検証",
      date: "2024.06",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF] font-inter text-[#494B67]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-[#FFF]/95 backdrop-blur-sm border-b border-[#ECEBFF] z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-bold text-lg tracking-wider text-[#494B67]">
            Portfolio
          </span>
          <div className="flex space-x-8">
            <a
              href="#hero"
              className="text-sm text-[#494B67] hover:text-[#FF006C] transition-colors"
            >
              Top
            </a>
            <a
              href="#skills"
              className="text-sm text-[#494B67] hover:text-[#FF006C] transition-colors"
            >
              Skills
            </a>
            <a
              href="#works"
              className="text-sm text-[#494B67] hover:text-[#FF006C] transition-colors"
            >
              Works
            </a>
            <a
              href="#notes"
              className="text-sm text-[#494B67] hover:text-[#FF006C] transition-colors"
            >
              Notes
            </a>
            <a
              href="#about"
              className="text-sm text-[#494B67] hover:text-[#FF006C] transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-sm text-[#494B67] hover:text-[#FF006C] transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8 text-[#494B67]">
            Webフルスタックエンジニア
            <br />
            <span className="text-[#FF006C]">（WordPress特化）</span>
          </h1>
          <p className="text-lg md:text-xl text-[#494B67] mb-6 opacity-80">
            HTML／SCSS設計からCMS構築・環境構築・デプロイまで
          </p>
          <p className="text-base text-[#494B67] max-w-2xl mx-auto leading-relaxed opacity-70">
            再現性・運用性・アクセシビリティを重視したWeb開発を行っています。
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-[#D5F7FF]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#494B67]">
              Skills
            </h2>
            <div className="w-16 h-1 bg-[#FF006C] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className="bg-[#FFF] p-8 rounded-xl shadow-sm border border-[#ECEBFF] hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-6">
                  {category.icon}
                  <h3 className="font-semibold text-lg ml-3 text-[#494B67]">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-[#ECEBFF] text-[#494B67] text-sm rounded-full hover:bg-[#FF006C] hover:text-[#FFF] transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section id="works" className="py-20 px-6 bg-[#FFF]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#494B67]">
              Works
            </h2>
            <div className="w-16 h-1 bg-[#FF006C] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {works.map((work) => (
              <div
                key={work.id}
                className="group relative bg-[#FFF] rounded-xl shadow-sm border border-[#ECEBFF] overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredWork(work.id)}
                onMouseLeave={() => setHoveredWork(null)}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={work.thumbnail}
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-[#FF006C] transition-colors text-[#494B67]">
                    {work.title}
                  </h3>
                  <p className="text-sm text-[#494B67] opacity-70 mb-3">
                    {work.scope}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {work.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-[#ECEBFF] text-[#494B67] text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-[#494B67] opacity-60">
                    {work.features}
                  </p>
                </div>

                {/* Hover Details */}
                <div
                  className={`absolute inset-0 bg-[#FFF]/95 backdrop-blur-sm p-6 flex flex-col justify-center transition-opacity duration-300 ${
                    hoveredWork === work.id
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  <h3 className="font-semibold text-lg mb-3 text-[#FF006C]">
                    {work.title}
                  </h3>
                  <p className="text-sm text-[#494B67] leading-relaxed">
                    {work.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Notes Section */}
      <section id="notes" className="py-20 px-6 bg-[#ECEBFF]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#494B67]">
              Tech Notes
            </h2>
            <div className="w-16 h-1 bg-[#FF006C] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techNotes.map((note, index) => (
              <article
                key={index}
                className="bg-[#FFF] p-6 rounded-xl shadow-sm border border-[#D5F7FF] hover:shadow-md hover:border-[#FF006C] transition-all duration-300 group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs text-[#494B67] opacity-50 font-medium">
                    {note.date}
                  </span>
                  <ExternalLink className="w-4 h-4 text-[#494B67] opacity-50 group-hover:text-[#FF006C] transition-colors" />
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-[#FF006C] transition-colors text-[#494B67]">
                  {note.title}
                </h3>
                <p className="text-sm text-[#494B67] opacity-70 leading-relaxed">
                  {note.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-[#FFF]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#494B67]">
              About
            </h2>
            <div className="w-16 h-1 bg-[#FF006C] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1 flex justify-center">
              <div className="w-48 h-48 bg-gradient-to-br from-[#FF006C] to-[#494B67] rounded-full flex items-center justify-center">
                <Code className="w-20 h-20 text-[#FFF]" />
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-[#494B67]">
                  田中 太郎
                </h3>
                <p className="text-[#FF006C] font-medium mb-4">
                  Webフルスタックエンジニア（WordPress / Frontend /
                  Infrastructure）
                </p>
                <p className="text-[#494B67] opacity-80 leading-relaxed">
                  コードは誰が見てもわかりやすく、運用を前提に設計することを大切にしています。
                  セマンティックな構造とアクセシビリティ、SEOを意識したマークアップを常に心がけています。
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center text-[#494B67] opacity-70">
                  <span className="w-2 h-2 bg-[#FF006C] rounded-full mr-3"></span>
                  <span>フロントエンド開発 5年</span>
                </div>
                <div className="flex items-center text-[#494B67] opacity-70">
                  <span className="w-2 h-2 bg-[#FF006C] rounded-full mr-3"></span>
                  <span>WordPress開発 4年</span>
                </div>
                <div className="flex items-center text-[#494B67] opacity-70">
                  <span className="w-2 h-2 bg-[#FF006C] rounded-full mr-3"></span>
                  <span>インフラ構築 3年</span>
                </div>
                <div className="flex items-center text-[#494B67] opacity-70">
                  <span className="w-2 h-2 bg-[#FF006C] rounded-full mr-3"></span>
                  <span>アクセシビリティ対応</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-[#D5F7FF]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#494B67]">
            Let's Connect
          </h2>
          <div className="w-16 h-1 bg-[#FF006C] mx-auto mb-8"></div>

          <p className="text-[#494B67] opacity-80 mb-12 leading-relaxed">
            新しいプロジェクトやご相談がございましたら、お気軽にお声がけください。
            <br />
            より良いWeb体験の創造に向けて、一緒に取り組みましょう。
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="mailto:contact@example.com"
              className="flex items-center px-8 py-3 bg-[#FF006C] text-[#FFF] rounded-lg hover:bg-[#494B67] transition-colors group"
            >
              <Mail className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              <span>Email</span>
            </a>

            <a
              href="https://github.com/username"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-8 py-3 border-2 border-[#FF006C] text-[#FF006C] rounded-lg hover:bg-[#FF006C] hover:text-[#FFF] transition-colors group"
            >
              <Github className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#ECEBFF] bg-[#FFF]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-[#494B67] opacity-50">
            © 2024 Portfolio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
