import { useEffect } from 'react'
import AirBendingMotionDiagram from '../components/AirBendingMotionDiagram.jsx'
import LanguageSwitcher from '../components/LanguageSwitcher.jsx'
import { getEngineeringText } from '../languages/engineeringText.js'
import {
  getSiteUrl,
  setPageSEO,
  setStructuredData,
} from '../utils/seo.js'

const pageContent = {
  eyebrow: 'Engineering Reference',
  title: 'Air Bending Guide for Press Brake Sheet Metal Forming',
  subtitle:
    'Understand air bending principles, V-die selection, inside radius behavior, springback influence and bending force estimation for modern press brake operations.',
  industrialNote:
    'Air bending is the most widely used press brake bending method in modern sheet metal fabrication because it provides flexible angle control, lower tooling force and reduced tooling wear.',
  overview: [
    'Air bending is a press brake forming method where the punch drives the sheet into a V die without forcing the material to fully match the die angle or bottom surface. The bend is formed through controlled elastic-plastic deformation while the material is supported at the die shoulders and loaded at the punch tip.',
    'It is common in modern shops because one punch and die set can form a wide range of angles by changing ram depth. This reduces tool changes, lowers forming force compared with bottoming or coining, and makes CNC angle correction practical for mixed-part production.',
    'The relationship between punch tip and V die is not a full-contact geometry. In typical air bending, the sheet contacts three points: the punch nose and the two die shoulders. The final angle is mainly controlled by punch penetration depth, while material strength, thickness, grain direction, tooling condition and machine deflection influence the actual result.',
    'Springback exists because the outer and inner zones of the bend do not remain fully plastically deformed after unloading. Higher tensile strength, higher yield strength and larger elastic recovery cause the angle to open after the ram returns. Stainless steel usually springs back more than mild steel; softer aluminum may spring back less or differently depending on alloy and temper.',
    'The V opening changes inside radius because air bending allows the material to form a natural radius over the die span. A wider V opening distributes deformation over a larger bend zone, usually producing a larger inside radius and lower force. A narrower V opening concentrates deformation, reducing radius but increasing required tonnage and marking risk.',
  ],
  sections: [
    {
      title: 'How Air Bending Works',
      paragraphs: [
        'In air bending, the punch does not bottom out against the die. The material is suspended over the V opening and contacts the tooling mainly at the punch tip and the two die shoulders.',
        'The bend angle is controlled by punch penetration depth. Deeper penetration closes the angle; less penetration leaves a more open angle. Because the material is not forced to the die angle, the same tooling can produce multiple bend angles when the machine position and compensation are controlled correctly.',
        'This method depends on repeatable material behavior and accurate machine control. Variations in thickness, tensile strength, rolling direction, surface coating and tooling wear can change the final angle even when the programmed depth is unchanged.',
      ],
    },
    {
      title: 'V-Die Selection Influence',
      paragraphs: [
        'A larger V opening reduces bending force because the forming lever arm becomes longer and the material bends over a wider span. The tradeoff is a larger natural inside radius, greater sensitivity to springback and a wider bend line footprint.',
        'A smaller V opening increases tonnage because the material is forced to bend over a shorter span. It can produce a smaller inside radius and often reduces springback, but it also increases tool pressure, surface marking and the risk of cracking on hard or low-ductility materials.',
        'Production V-die choice is therefore a balance between force capacity, required inside radius, flange length, material ductility, marking tolerance and angle stability.',
      ],
    },
    {
      title: 'Inside Radius Behavior in Air Bending',
      paragraphs: [
        'In air bending, the inside radius is normally a natural radius created by the material, thickness and V opening. It is not automatically equal to the punch tip radius unless the punch radius is large enough to dominate the bend geometry.',
        'For many mild steel air bends, the natural inside radius is often related to the V opening rather than only the punch nose. A common engineering assumption is that wider V openings create larger inside radii, while narrower V openings create tighter radii at higher tonnage.',
        'Material thickness matters because thicker plate needs a larger deformation zone to bend without excessive strain. If the specified inside radius is too small for the material and thickness, cracking, coating damage or unstable angle repeatability may occur.',
      ],
    },
    {
      title: 'Springback in Air Bending',
      paragraphs: [
        'Springback is the elastic recovery that occurs after the ram releases pressure. In air bending it is more visible because the material is not coined into a fully compressed tool cavity.',
        'High tensile and high yield materials spring back more because a larger portion of the bend remains elastically stressed after forming. Stainless steel generally needs more overbend than mild steel. Aluminum behavior depends strongly on alloy and temper; soft aluminum may form easily, while harder tempers can show meaningful recovery and cracking sensitivity.',
        'Compensation methods include programmed overbend, angle measurement systems, material-specific bend tables, test bends, tighter thickness control and tooling choices that reduce variation. The practical logic is simple: bend slightly past the target so the part opens back to the required angle after unloading.',
      ],
    },
  ],
  comparison: [
    ['Forming pressure', 'Low to medium', 'High', 'Very high'],
    ['Accuracy', 'Good with CNC compensation', 'High when tooling and material are stable', 'Very high for suitable parts'],
    ['Springback', 'Must be compensated', 'Reduced by higher contact pressure', 'Minimal because material is heavily compressed'],
    ['Tool wear', 'Lower', 'Medium to high', 'High'],
    ['Flexibility', 'High; multiple angles with same tooling', 'Medium; closer to tool angle', 'Low; tooling and tonnage specific'],
    ['Production speed', 'Fast for mixed production', 'Fast for repeat jobs after setup', 'Slower when high tonnage or special tooling is required'],
    ['Tooling force', 'Lowest of the three methods', 'Higher than air bending', 'Highest'],
  ],
  faq: [
    [
      'What is air bending in a press brake?',
      'Air bending is a press brake method where the punch bends the sheet into a V die without bottoming out. The material contacts the punch tip and die shoulders, and the final angle is controlled mainly by punch penetration depth.',
    ],
    [
      'Why is air bending more flexible?',
      'Air bending is flexible because one punch and V die combination can form multiple angles. Operators adjust ram depth and compensation rather than changing tooling for every angle.',
    ],
    [
      'How does V-die opening affect bending force?',
      'A larger V opening lowers bending force because the material bends over a wider span. A smaller V opening increases tonnage because the bend is formed over a shorter lever arm.',
    ],
    [
      'Why does springback occur?',
      'Springback occurs because part of the bend remains elastically stressed during forming. After the ram releases pressure, the material recovers slightly and the bend angle opens.',
    ],
    [
      'What is the difference between air bending and coining?',
      'Air bending forms the angle through controlled penetration without full tool contact. Coining uses much higher force to compress the material into the die angle, reducing springback but increasing tonnage and tool wear.',
    ],
    [
      'Does punch radius determine inside radius?',
      'Not always. In air bending, inside radius is often a natural radius influenced by V opening, material thickness and material properties. The punch radius dominates only when it is large enough relative to the natural bend radius.',
    ],
    [
      'Why does stainless steel spring back more?',
      'Stainless steel usually has higher yield strength and stronger elastic recovery than mild steel, so it often requires more overbend or angle compensation in air bending.',
    ],
    [
      'How accurate is air bending?',
      'Air bending can be accurate when machine repeatability, tooling condition, material consistency and angle compensation are controlled. It is more sensitive to material variation than bottoming or coining.',
    ],
    [
      'Why does a wider V die create a larger inside radius?',
      'A wider V opening spreads bending deformation across a larger zone. The sheet forms a broader natural radius instead of being forced tightly around the punch nose.',
    ],
    [
      'When should a smaller V opening be avoided?',
      'A smaller V opening should be avoided when tonnage exceeds machine capacity, when surface marking is unacceptable, or when hard material may crack from excessive localized strain.',
    ],
  ],
}

const relatedTools = [
  {
    key: 'pressBrakeCalculator',
    href: '/engineering-tools/press-brake-calculator',
  },
  {
    key: 'materialDatabase',
    href: '/engineering-tools/material-database',
  },
  {
    key: 'vDieSelectionTool',
    href: '/engineering-tools/v-die-selection',
  },
  {
    key: 'insideRadiusGuide',
    href: '/engineering-tools/inside-radius-guide',
  },
  {
    key: 'springbackDatabase',
    href: '/engineering-tools/springback-database',
  },
  {
    key: 'bendAllowanceCalculator',
    href: '/engineering-tools/bend-allowance-calculator',
  },
  {
    key: 'kFactorGuide',
    href: '/engineering/k-factor-guide',
  },
  {
    key: 'bendDeductionGuide',
    href: '/engineering/bend-deduction-guide',
  },
  {
    key: 'airBendingGuide',
    href: '/engineering-tools/air-bending-guide',
  },
  {
    key: 'pressBrakeTonnageGuide',
    href: '/engineering/press-brake-tonnage-guide',
  },
  {
    key: 'vDieOpeningGuide',
    href: '/engineering/how-to-choose-press-brake-v-die-opening',
  },
  {
    key: 'minimumFlangeLengthGuide',
    href: '/engineering/minimum-flange-length-guide',
  },
  {
    key: 'toolingSelectionGuide',
    href: '/engineering/press-brake-tooling-selection-guide',
  },
  {
    key: 'crowningGuide',
    href: '/engineering/press-brake-crowning-guide',
  },
  {
    key: 'stainlessSteelBendingGuide',
    href: '/engineering/stainless-steel-bending-guide',
  },
  {
    key: 'aluminumBendingGuide',
    href: '/engineering/aluminum-bending-guide',
  },
]

const seoDescription =
  'Learn how air bending works in press brake sheet metal fabrication. Understand V-die selection, springback, inside radius behavior, bending force influence and differences between air bending, bottoming and coining.'

const createTechArticleStructuredData = () => ({
  '@type': 'TechArticle',
  headline: pageContent.title,
  description: seoDescription,
  author: {
    '@type': 'Organization',
    name: 'ZYCO',
  },
  publisher: {
    '@type': 'Organization',
    name: 'ZYCO',
    url: getSiteUrl('/'),
  },
  mainEntityOfPage: getSiteUrl('/engineering-tools/air-bending-guide'),
})

const createWebPageStructuredData = () => ({
  '@type': 'WebPage',
  name: pageContent.title,
  description: seoDescription,
  url: getSiteUrl('/engineering-tools/air-bending-guide'),
  isPartOf: {
    '@type': 'WebSite',
    name: 'ZYCO',
    url: getSiteUrl('/'),
  },
})

const createFAQStructuredData = () => ({
  '@type': 'FAQPage',
  mainEntity: pageContent.faq.map(([question, answer]) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer,
    },
  })),
})

function ContentSection({ section }) {
  return (
    <section
      className='zyco-air__panel'
      aria-labelledby={`air-${section.title.toLowerCase().replaceAll(' ', '-')}`}
    >
      <h2
        className='zyco-air__panel-title'
        id={`air-${section.title.toLowerCase().replaceAll(' ', '-')}`}
      >
        {section.title}
      </h2>

      <div className='zyco-air__copy'>
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  )
}

export default function AirBendingGuide({
  language = 'en',
  setLanguage = () => {},
}) {
  useEffect(() => {
    setPageSEO({
      title: 'Air Bending Guide for Press Brake Sheet Metal Forming | ZYCO',
      description: seoDescription,
      keywords:
        'air bending guide, press brake air bending, air bending vs bottoming, press brake bending method, V die bending, sheet metal air bending, bending force guide',
      canonicalPath: '/engineering-tools/air-bending-guide',
    })

    setStructuredData({
      id: 'air-bending-guide-jsonld',
      data: {
        '@context': 'https://schema.org',
        '@graph': [
          createWebPageStructuredData(),
          createTechArticleStructuredData(),
          createFAQStructuredData(),
        ],
      },
    })
  }, [])

  const t = getEngineeringText(language)
  const page = t.pages.air

  return (
    <>
      <style>
        {`
          .zyco-air {
            min-height: 100vh;
            box-sizing: border-box;
            padding: 52px 22px;
            background:
              radial-gradient(circle at 16% 12%, rgba(96, 165, 250, 0.34), transparent 30%),
              radial-gradient(circle at 84% 20%, rgba(14, 165, 233, 0.22), transparent 28%),
              linear-gradient(145deg, #071224 0%, #0b1f3f 42%, #12366e 74%, #1d4ed8 100%);
            color: #ffffff;
            font-family:
              Inter,
              ui-sans-serif,
              system-ui,
              -apple-system,
              BlinkMacSystemFont,
              "Segoe UI",
              sans-serif;
            overflow: hidden;
            position: relative;
          }

          .zyco-air::before {
            content: "";
            position: absolute;
            inset: 0;
            background-image:
              linear-gradient(rgba(96, 165, 250, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(96, 165, 250, 0.08) 1px, transparent 1px);
            background-size: 42px 42px;
            mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), transparent 78%);
            pointer-events: none;
          }

          .zyco-air::after {
            content: "";
            position: absolute;
            left: -10%;
            right: -10%;
            top: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(147, 197, 253, 0.9), transparent);
            box-shadow: 0 0 34px rgba(96, 165, 250, 0.55);
            pointer-events: none;
          }

          .zyco-air__shell {
            width: min(1120px, 100%);
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }

          .zyco-air__header,
          .zyco-air__panel {
            border: 1px solid rgba(147, 197, 253, 0.2);
            border-radius: 28px;
            background:
              linear-gradient(145deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.05));
            box-shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
            backdrop-filter: blur(18px);
          }

          .zyco-air__header {
            margin-bottom: 22px;
            padding: 34px;
          }

          .zyco-air__back {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: fit-content;
            max-width: min(100%, 460px);
            min-height: 44px;
            box-sizing: border-box;
            margin: 0 0 22px;
            padding: 0 16px;
            border: 1px solid rgba(147, 197, 253, 0.46);
            border-radius: 999px;
            background:
              linear-gradient(145deg, rgba(15, 23, 42, 0.34), rgba(37, 99, 235, 0.12));
            color: #bfdbfe;
            font-size: 14px;
            line-height: 1.35;
            font-weight: 850;
            text-decoration: none;
            box-shadow:
              0 10px 28px rgba(15, 23, 42, 0.18),
              inset 0 1px 0 rgba(255, 255, 255, 0.12);
            backdrop-filter: blur(16px);
            transition:
              transform 0.22s ease,
              border-color 0.22s ease,
              color 0.22s ease,
              background 0.22s ease,
              box-shadow 0.22s ease;
          }

          .zyco-air__back:hover,
          .zyco-air__tool:hover {
            transform: translateY(-2px);
            border-color: rgba(191, 219, 254, 0.72);
            color: #ffffff;
          }

          .zyco-air__back:focus-visible,
          .zyco-air__tool:focus-visible {
            outline: 3px solid rgba(147, 197, 253, 0.46);
            outline-offset: 3px;
          }

          .zyco-air__eyebrow {
            margin: 0 0 14px;
            color: #93c5fd;
            font-size: 13px;
            font-weight: 800;
            letter-spacing: 2.4px;
            text-transform: uppercase;
          }

          .zyco-air__title {
            max-width: 940px;
            margin: 0;
            color: #ffffff;
            font-size: 46px;
            line-height: 1.08;
            font-weight: 900;
            letter-spacing: 0;
            text-shadow: 0 0 28px rgba(96, 165, 250, 0.35);
          }

          .zyco-air__subtitle {
            max-width: 780px;
            margin: 16px 0 0;
            color: #bfdbfe;
            font-size: 18px;
            line-height: 1.7;
            font-weight: 600;
          }

          .zyco-air__industrial-note {
            max-width: 940px;
            margin: 24px 0 0;
            padding: 18px 20px;
            border: 1px solid rgba(147, 197, 253, 0.22);
            border-radius: 20px;
            background: rgba(15, 23, 42, 0.24);
            color: #dbeafe;
            font-size: 14px;
            line-height: 1.7;
            font-weight: 650;
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
          }

          .zyco-air__panel {
            margin-top: 22px;
            padding: 24px;
          }

          .zyco-air__content-panel,
          .zyco-air__content-grid {
            width: 100%;
            margin-left: auto;
            margin-right: auto;
            box-sizing: border-box;
          }

          .zyco-air__related-panel {
            width: 100%;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 34px;
            padding: 22px;
            box-sizing: border-box;
          }

          .zyco-air__panel-title {
            margin: 0 0 14px;
            color: #ffffff;
            font-size: 22px;
            line-height: 1.28;
            font-weight: 850;
            letter-spacing: 0;
          }

          .zyco-air__copy {
            display: grid;
            gap: 12px;
            max-width: 990px;
          }

          .zyco-air__copy p,
          .zyco-air__answer {
            margin: 0;
            color: #dbeafe;
            font-size: 15px;
            line-height: 1.75;
            font-weight: 620;
          }

          .zyco-air__knowledge-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 22px;
            margin-top: 30px;
          }

          .zyco-air__knowledge-grid .zyco-air__panel {
            margin-top: 0;
          }

          .zyco-air__comparison {
            width: 100%;
            border-collapse: collapse;
            overflow: hidden;
          }

          .zyco-air__comparison-wrap {
            overflow-x: auto;
          }

          .zyco-air__comparison th,
          .zyco-air__comparison td {
            padding: 16px;
            border-bottom: 1px solid rgba(191, 219, 254, 0.14);
            text-align: left;
            vertical-align: top;
          }

          .zyco-air__comparison th {
            color: #93c5fd;
            font-size: 12px;
            line-height: 1.35;
            font-weight: 900;
            letter-spacing: 0.7px;
            text-transform: uppercase;
            white-space: nowrap;
          }

          .zyco-air__comparison td {
            color: #e0f2fe;
            font-size: 14px;
            line-height: 1.55;
            font-weight: 650;
            min-width: 180px;
          }

          .zyco-air__comparison td:first-child {
            color: #ffffff;
            font-weight: 850;
            min-width: 150px;
          }

          .zyco-air__faq {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }

          .zyco-air__faq-item {
            padding: 18px;
            border: 1px solid rgba(147, 197, 253, 0.18);
            border-radius: 20px;
            background: rgba(15, 23, 42, 0.22);
          }

          .zyco-air__question {
            margin: 0 0 8px;
            color: #ffffff;
            font-size: 15px;
            line-height: 1.45;
            font-weight: 850;
          }

          .zyco-air__tools {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 12px;
          }

          .zyco-air__tool {
            min-height: 46px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            padding: 0 18px;
            border: 1px solid rgba(96, 165, 250, 0.18);
            border-radius: 16px;
            background:
              linear-gradient(135deg, #1e3a8a 0%, #2563eb 48%, #60a5fa 100%);
            color: #ffffff;
            font-size: 15px;
            font-weight: 800;
            text-decoration: none;
            box-shadow: 0 12px 30px rgba(37, 99, 235, 0.34);
            flex: 0 1 auto;
            transition:
              transform 0.25s ease,
              box-shadow 0.25s ease,
              border-color 0.25s ease;
          }

          .zyco-air__tool:hover {
            box-shadow: 0 18px 38px rgba(37, 99, 235, 0.42);
          }

          @media (max-width: 980px) {
            .zyco-air__knowledge-grid,
            .zyco-air__faq {
              grid-template-columns: 1fr;
            }

            .zyco-air__title {
              font-size: 38px;
            }
          }

          @media (max-width: 640px) {
            .zyco-air {
              padding: 28px 14px;
            }

            .zyco-air__header,
            .zyco-air__panel {
              padding: 22px;
              border-radius: 24px;
            }

            .zyco-air__back,
            .zyco-air__tool {
              width: 100%;
            }

            .zyco-air__title {
              font-size: 32px;
            }

            .zyco-air__subtitle {
              font-size: 16px;
            }

            .zyco-air__comparison th,
            .zyco-air__comparison td {
              padding: 14px;
            }
          }
        `}
      </style>

      <main className='zyco-air'>
        <section className='zyco-air__shell'>
          <header className='zyco-air__header'>
            <a
              aria-label={page.backToEngineeringTools}
              className='zyco-air__back'
              href='/engineering-tools'
            >
              {page.backToEngineeringTools}
            </a>

            <LanguageSwitcher
              className='zyco-page-language-switcher'
              language={language}
              setLanguage={setLanguage}
            />

            <p className='zyco-air__eyebrow'>
              {t.common.engineeringReference}
            </p>

            <h1 className='zyco-air__title'>
              {page.title}
            </h1>

            <p className='zyco-air__subtitle'>
              {page.subtitle}
            </p>

            <p className='zyco-air__industrial-note'>
              {page.industrialNote}
            </p>
          </header>

          <AirBendingMotionDiagram labels={page.motionDiagram} />

          <section
            className='zyco-air__panel zyco-air__content-panel'
            aria-labelledby='air-engineering-overview'
          >
            <h2
              className='zyco-air__panel-title'
              id='air-engineering-overview'
            >
              {page.overviewTitle}
            </h2>

            <div className='zyco-air__copy'>
              {page.overview.map((paragraph) => (
                <p key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <div className='zyco-air__knowledge-grid zyco-air__content-grid'>
            {page.sections.map((section) => (
              <ContentSection
                key={section.title}
                section={section}
              />
            ))}
          </div>

          <section
            className='zyco-air__panel zyco-air__content-panel'
            aria-labelledby='air-bending-comparison'
          >
            <h2
              className='zyco-air__panel-title'
              id='air-bending-comparison'
            >
              {page.comparisonTitle}
            </h2>

            <div className='zyco-air__comparison-wrap'>
              <table className='zyco-air__comparison'>
                <thead>
                  <tr>
                    {page.comparisonHeaders.map((header) => (
                      <th key={header}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {page.comparison.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell) => (
                        <td key={cell}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section
            className='zyco-air__panel zyco-air__content-panel zyco-air__faq-panel'
            aria-labelledby='air-bending-faq'
          >
            <h2
              className='zyco-air__panel-title'
              id='air-bending-faq'
            >
              {page.faqTitle}
            </h2>

            <div className='zyco-air__faq'>
              {page.faq.map(([question, answer]) => (
                <article
                  className='zyco-air__faq-item'
                  key={question}
                >
                  <h3 className='zyco-air__question'>
                    {question}
                  </h3>

                  <p className='zyco-air__answer'>
                    {answer}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section
            className='zyco-air__panel zyco-air__related-panel'
            aria-labelledby='air-bending-related-tools'
          >
            <h2
              className='zyco-air__panel-title'
              id='air-bending-related-tools'
            >
              {t.common.relatedEngineeringTools}
            </h2>

            <nav
              className='zyco-air__tools'
              aria-label={t.common.relatedToolsAria}
            >
              {relatedTools.map((tool) => (
                <a
                  className='zyco-air__tool'
                  href={tool.href}
                  key={tool.key}
                >
                  {t.relatedTools[tool.key]}
                </a>
              ))}
            </nav>
          </section>
        </section>
      </main>
    </>
  )
}
