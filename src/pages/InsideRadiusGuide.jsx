import { useEffect } from 'react'
import LanguageSwitcher from '../components/LanguageSwitcher.jsx'
import { getEngineeringText } from '../languages/engineeringText.js'
import {
  createFAQPageStructuredData,
  createWebApplicationStructuredData,
  setPageSEO,
  setStructuredData,
} from '../utils/seo.js'

const materials = [
  {
    name: 'Mild Steel',
    materialKey: 'mildSteel',
    recommendedInsideRadius: '1T\u20131.5T',
    minimumInsideRadius: '0.8T\u20131T',
    crackRisk: 'Low',
    springbackSensitivity: 'Low',
  },
  {
    name: 'Galvanized Steel',
    materialKey: 'galvanizedSteel',
    recommendedInsideRadius: '1.2T\u20131.6T',
    minimumInsideRadius: '1T\u20131.2T',
    crackRisk: 'Medium',
    springbackSensitivity: 'Low',
  },
  {
    name: 'Stainless Steel 201',
    materialKey: 'stainless201',
    recommendedInsideRadius: '1.4T\u20132T',
    minimumInsideRadius: '1T\u20131.3T',
    crackRisk: 'High',
    springbackSensitivity: 'Very High',
  },
  {
    name: 'Stainless Steel 304',
    materialKey: 'stainless304',
    recommendedInsideRadius: '1.3T\u20131.8T',
    minimumInsideRadius: '1T\u20131.3T',
    crackRisk: 'Medium',
    springbackSensitivity: 'High',
  },
  {
    name: 'Aluminum',
    materialKey: 'aluminum',
    recommendedInsideRadius: '1T\u20132T',
    minimumInsideRadius: '0.8T\u20131.5T',
    crackRisk: 'Medium',
    springbackSensitivity: 'Medium',
  },
  {
    name: 'Brass',
    materialKey: 'brass',
    recommendedInsideRadius: '1T\u20131.5T',
    minimumInsideRadius: '0.8T\u20131T',
    crackRisk: 'Low',
    springbackSensitivity: 'Low',
  },
]

const fields = [
  ['recommendedInsideRadius', 'recommendedInsideRadius'],
  ['minimumInsideRadius', 'minimumInsideRadius'],
  ['crackRisk', 'crackRisk'],
  ['springbackSensitivity', 'springbackSensitivity'],
]

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

const backToEngineeringToolsLabels = {
  en: '← Back to Engineering Tools',
  zh: '← 返回工程工具中心',
  ru: '← Назад к инженерным инструментам',
  es: '← Volver a herramientas de ingeniería',
  tr: '← Mühendislik araçlarına dön',
  id: '← Kembali ke Engineering Tools',
}

export default function InsideRadiusGuide({
  language = 'en',
  setLanguage = () => {},
}) {
  useEffect(() => {
    const englishPage = getEngineeringText('en').pages.radius

    setPageSEO({
      title: 'Inside Bend Radius Guide for Sheet Metal Bending | ZYCO',
      description:
        'Reference recommended and minimum inside bend radius for common sheet metal materials. Understand how V-opening, material properties and air bending conditions affect inside radius.',
      keywords:
        'inside bend radius, sheet metal bend radius, minimum bend radius, press brake inside radius, air bending radius, V opening radius',
      canonicalPath: '/engineering-tools/inside-radius-guide',
    })

    setStructuredData({
      id: 'inside-radius-guide-jsonld',
      data: {
        '@context': 'https://schema.org',
        '@graph': [
          createWebApplicationStructuredData({
            name: 'Inside Radius Guide',
            description:
              'Reference recommended and minimum inside bend radius for common sheet metal materials. Understand how V-opening, material properties and air bending conditions affect inside radius.',
            path: '/engineering-tools/inside-radius-guide',
          }),
          createFAQPageStructuredData(englishPage.faq),
        ],
      },
    })
  }, [])

  const t = getEngineeringText(language)
  const page = t.pages.radius
  const backToEngineeringToolsLabel =
    backToEngineeringToolsLabels[language] ||
    backToEngineeringToolsLabels.en
  const valueKeys = {
    Low: 'low',
    Medium: 'medium',
    High: 'high',
    'Very High': 'veryHigh',
    'Low to Medium': 'lowToMedium',
    'Medium to High': 'mediumToHigh',
  }
  const getRadiusDisplayValue = (value) =>
    page.values[valueKeys[value]] || value

  return (
    <>
      <style>
        {`
          .zyco-radius {
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

          .zyco-radius::before {
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

          .zyco-radius::after {
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

          .zyco-radius__shell {
            width: min(1180px, 100%);
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }

          .zyco-tool-back-to-hub {
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

          .zyco-tool-back-to-hub:hover {
            transform: translateY(-2px);
            border-color: rgba(191, 219, 254, 0.72);
            background:
              linear-gradient(145deg, rgba(30, 64, 175, 0.42), rgba(59, 130, 246, 0.18));
            color: #ffffff;
            box-shadow:
              0 16px 34px rgba(37, 99, 235, 0.26),
              inset 0 1px 0 rgba(255, 255, 255, 0.16);
          }

          .zyco-tool-back-to-hub:focus-visible {
            outline: 3px solid rgba(147, 197, 253, 0.46);
            outline-offset: 3px;
          }

          .zyco-radius__header {
            margin-bottom: 34px;
            padding: 34px;
            border: 1px solid rgba(147, 197, 253, 0.2);
            border-radius: 28px;
            background:
              linear-gradient(145deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.05));
            box-shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
            backdrop-filter: blur(18px);
          }

          .zyco-radius__eyebrow {
            margin: 0 0 14px;
            color: #93c5fd;
            font-size: 13px;
            font-weight: 800;
            letter-spacing: 2.4px;
            text-transform: uppercase;
          }

          .zyco-radius__title {
            margin: 0;
            color: #ffffff;
            font-size: 46px;
            line-height: 1.08;
            font-weight: 900;
            letter-spacing: 0;
            text-shadow: 0 0 28px rgba(96, 165, 250, 0.35);
          }

          .zyco-radius__subtitle {
            max-width: 680px;
            margin: 16px 0 0;
            color: #bfdbfe;
            font-size: 18px;
            line-height: 1.7;
            font-weight: 600;
          }

          .zyco-radius__engineering-note {
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

          .zyco-radius__note-title {
            margin: 0 0 12px;
            color: #ffffff;
            font-size: 18px;
            line-height: 1.25;
            font-weight: 850;
            letter-spacing: 0;
          }

          .zyco-radius__note-text {
            margin: 0;
          }

          .zyco-radius__note-text + .zyco-radius__note-text {
            margin-top: 8px;
          }

          .zyco-radius__grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 18px;
          }

          .zyco-radius-card {
            min-height: 474px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 24px;
            border: 1px solid rgba(255, 255, 255, 0.14);
            border-radius: 24px;
            background:
              radial-gradient(circle at top left, rgba(96, 165, 250, 0.2), transparent 42%),
              linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.05));
            box-shadow: 0 12px 34px rgba(0, 0, 0, 0.22);
            backdrop-filter: blur(16px);
            transition:
              transform 0.25s ease,
              border-color 0.25s ease,
              box-shadow 0.25s ease,
              background 0.25s ease;
            position: relative;
            overflow: hidden;
          }

          .zyco-radius-card::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, #38bdf8, #2563eb, transparent);
            opacity: 0.75;
          }

          .zyco-radius-card:hover {
            transform: translateY(-7px);
            border-color: rgba(147, 197, 253, 0.36);
            box-shadow: 0 22px 48px rgba(37, 99, 235, 0.26);
            background:
              radial-gradient(circle at top left, rgba(96, 165, 250, 0.3), transparent 45%),
              linear-gradient(145deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.07));
          }

          .zyco-radius-card__title {
            margin: 0 0 18px;
            color: #ffffff;
            font-size: 22px;
            line-height: 1.25;
            font-weight: 850;
            letter-spacing: 0;
            overflow-wrap: anywhere;
          }

          .zyco-radius-card__specs {
            display: grid;
            gap: 10px;
            margin: 0 0 18px;
          }

          .zyco-radius-card__spec {
            display: flex;
            justify-content: space-between;
            gap: 14px;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(191, 219, 254, 0.14);
          }

          .zyco-radius-card__label {
            color: #93c5fd;
            font-size: 12px;
            line-height: 1.35;
            font-weight: 900;
            letter-spacing: 0.7px;
            text-transform: uppercase;
          }

          .zyco-radius-card__value {
            color: #ffffff;
            font-size: 14px;
            line-height: 1.4;
            font-weight: 800;
            text-align: right;
            overflow-wrap: anywhere;
          }

          .zyco-radius-card__note-label {
            margin: 0 0 8px;
            color: #93c5fd;
            font-size: 12px;
            font-weight: 900;
            letter-spacing: 0.7px;
            text-transform: uppercase;
          }

          .zyco-radius-card__note {
            margin: 0 0 24px;
            color: #cbd5e1;
            font-size: 14px;
            line-height: 1.65;
            font-weight: 600;
          }

          .zyco-radius-card__action {
            min-height: 46px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            align-self: flex-start;
            box-sizing: border-box;
            padding: 0 18px;
            border-radius: 16px;
            background:
              linear-gradient(135deg, #1e3a8a 0%, #2563eb 48%, #60a5fa 100%);
            color: #ffffff;
            font-size: 15px;
            font-weight: 800;
            text-decoration: none;
            box-shadow: 0 12px 30px rgba(37, 99, 235, 0.34);
            transition:
              transform 0.25s ease,
              box-shadow 0.25s ease;
          }

          .zyco-radius-card__action:hover {
            transform: translateY(-2px);
            box-shadow: 0 18px 38px rgba(37, 99, 235, 0.42);
          }

          .zyco-radius__panel {
            margin-top: 22px;
            padding: 24px;
            border: 1px solid rgba(147, 197, 253, 0.2);
            border-radius: 28px;
            background:
              linear-gradient(145deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.05));
            box-shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
            backdrop-filter: blur(18px);
          }

          .zyco-radius__faq {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }

          .zyco-radius__faq-item {
            padding: 18px;
            border: 1px solid rgba(147, 197, 253, 0.18);
            border-radius: 20px;
            background: rgba(15, 23, 42, 0.22);
          }

          .zyco-radius__question {
            margin: 0 0 8px;
            color: #ffffff;
            font-size: 15px;
            line-height: 1.45;
            font-weight: 850;
          }

          .zyco-radius__answer {
            margin: 0;
            color: #cbd5e1;
            font-size: 14px;
            line-height: 1.65;
            font-weight: 600;
          }

          .zyco-radius__tools {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
          }

          .zyco-radius__tools .zyco-radius-card__action {
            border: 1px solid rgba(96, 165, 250, 0.18);
            transition:
              transform 0.25s ease,
              box-shadow 0.25s ease,
              border-color 0.25s ease;
          }

          .zyco-radius__tools .zyco-radius-card__action:hover {
            border-color: rgba(191, 219, 254, 0.72);
          }

          @media (max-width: 980px) {
            .zyco-radius__grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .zyco-radius__title {
              font-size: 38px;
            }
          }

          @media (max-width: 640px) {
            .zyco-radius {
              padding: 28px 14px;
            }

            .zyco-radius__header {
              padding: 24px;
              border-radius: 24px;
            }

            .zyco-tool-back-to-hub {
              width: 100%;
              margin-bottom: 16px;
              padding: 10px 14px;
              text-align: center;
            }

            .zyco-radius__title {
              font-size: 32px;
            }

            .zyco-radius__subtitle {
              font-size: 16px;
            }

            .zyco-radius__engineering-note {
              padding: 16px;
              font-size: 13px;
            }

            .zyco-radius__grid {
              grid-template-columns: 1fr;
              gap: 14px;
            }

            .zyco-radius__faq {
              grid-template-columns: 1fr;
            }

            .zyco-radius__panel {
              padding: 22px;
              border-radius: 24px;
            }

            .zyco-radius-card {
              min-height: 0;
              padding: 22px;
            }

            .zyco-radius-card__spec {
              display: grid;
              gap: 4px;
            }

            .zyco-radius-card__value {
              text-align: left;
              white-space: normal;
            }

            .zyco-radius-card__action {
              width: 100%;
            }
          }
        `}
      </style>

      <main className='zyco-radius'>
        <section className='zyco-radius__shell'>
          <header className='zyco-radius__header'>
            <a
              aria-label={backToEngineeringToolsLabel}
              className='zyco-tool-back-to-hub'
              href='/engineering-tools'
            >
              {backToEngineeringToolsLabel}
            </a>

            <LanguageSwitcher
              className='zyco-page-language-switcher'
              language={language}
              setLanguage={setLanguage}
            />

            <p className='zyco-radius__eyebrow'>
              {t.common.engineeringReference}
            </p>

            <h1 className='zyco-radius__title'>
              {page.title}
            </h1>

            <p className='zyco-radius__subtitle'>
              {page.subtitle}
            </p>

            <div className='zyco-radius__engineering-note'>
              <h2 className='zyco-radius__note-title'>
                {t.common.engineeringOverview}
              </h2>

              <p className='zyco-radius__note-text'>
                {page.overview}
              </p>

              {page.notes.map((note) => (
                <p
                  className='zyco-radius__note-text'
                  key={note}
                >
                  {note}
                </p>
              ))}
            </div>
          </header>

          <div className='zyco-radius__grid'>
            {materials.map((material) => (
              <article
                className='zyco-radius-card'
                key={material.name}
              >
                <div>
                  <h2 className='zyco-radius-card__title'>
                    {t.materialNames[material.materialKey]}
                  </h2>

                  <dl className='zyco-radius-card__specs'>
                    {fields.map(([labelKey, key]) => (
                      <div
                        className='zyco-radius-card__spec'
                        key={labelKey}
                      >
                        <dt className='zyco-radius-card__label'>
                          {page.fields[labelKey]}
                        </dt>

                        <dd className='zyco-radius-card__value'>
                          {getRadiusDisplayValue(material[key])}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <p className='zyco-radius-card__note-label'>
                    {t.common.applicationNote}
                  </p>

                  <p className='zyco-radius-card__note'>
                    {t.materialNotes[material.materialKey]}
                  </p>
                </div>

                <a
                  className='zyco-radius-card__action'
                  href={`/engineering-tools/press-brake-calculator?material=${material.materialKey}`}
                >
                  {t.common.calculateBendingForce} {'\u2192'}
                </a>
              </article>
            ))}
          </div>

          <section
            className='zyco-radius__panel'
            aria-labelledby='inside-radius-faq'
          >
            <h2
              className='zyco-radius__note-title'
              id='inside-radius-faq'
            >
              {page.faqTitle}
            </h2>

            <div className='zyco-radius__faq'>
              {page.faq.map(([question, answer]) => (
                <article
                  className='zyco-radius__faq-item'
                  key={question}
                >
                  <h3 className='zyco-radius__question'>
                    {question}
                  </h3>

                  <p className='zyco-radius__answer'>
                    {answer}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section
            className='zyco-radius__panel'
            aria-labelledby='inside-radius-related-tools'
          >
            <h2
              className='zyco-radius__note-title'
              id='inside-radius-related-tools'
            >
              {t.common.relatedEngineeringTools}
            </h2>

            <nav
              className='zyco-radius__tools'
              aria-label={t.common.relatedToolsAria}
            >
              {relatedTools.map((tool) => (
                <a
                  className='zyco-radius-card__action'
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
