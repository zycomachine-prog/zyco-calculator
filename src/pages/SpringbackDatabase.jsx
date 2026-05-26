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
    range: '0.6°–1.3°',
  },
  {
    name: 'Galvanized Steel',
    materialKey: 'galvanizedSteel',
    range: '0.8°–1.6°',
  },
  {
    name: 'Stainless Steel 201',
    materialKey: 'stainless201',
    range: '2.2°–3.8°',
  },
  {
    name: 'Stainless Steel 304',
    materialKey: 'stainless304',
    range: '1.8°–3.0°',
  },
  {
    name: 'Aluminum',
    materialKey: 'aluminum',
    range: '1.2°–2.8°',
  },
  {
    name: 'Brass',
    materialKey: 'brass',
    range: '0.4°–1.2°',
  },
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
    key: 'springbackCompensationGuide',
    href: '/springback-compensation-guide',
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
    key: 'bottomingVsCoiningGuide',
    href: '/engineering-tools/bottoming-vs-coining-guide',
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

const fields = [
  ['range', 'range'],
  ['reference', 'reference'],
  ['sensitivity', 'sensitivity'],
  ['factors', 'factors'],
]

export default function SpringbackDatabase({
  language = 'en',
  setLanguage = () => {},
}) {
  const t = getEngineeringText(language)
  const page = t.pages.springback
  const backToEngineeringToolsLabel =
    backToEngineeringToolsLabels[language] ||
    backToEngineeringToolsLabels.en
  const getSpringbackDisplayValue = (material, key) => {
    if (key === 'reference') {
      return page.values.reference
    }

    if (key === 'sensitivity') {
      return page.values.sensitivity[material.materialKey] || material[key]
    }

    if (key === 'factors') {
      return page.values.factors[material.materialKey] || material[key]
    }

    return material[key] || '--'
  }

  useEffect(() => {
    const englishPage = getEngineeringText('en').pages.springback

    setPageSEO({
      title: 'Sheet Metal Springback Database for Press Brake Bending | ZYCO',
      description:
        'Reference typical springback ranges for mild steel, stainless steel, aluminum, galvanized steel and brass in press brake air bending. Understand how material, V-opening and inside radius affect springback.',
      keywords:
        'springback database, sheet metal springback, press brake springback, stainless steel springback, air bending springback, springback angle',
      canonicalPath: '/engineering-tools/springback-database',
    })

    setStructuredData({
      id: 'springback-database-jsonld',
      data: {
        '@context': 'https://schema.org',
        '@graph': [
          createWebApplicationStructuredData({
            name: 'Springback Database',
            description:
              'Reference typical springback ranges for mild steel, stainless steel, aluminum, galvanized steel and brass in press brake air bending. Understand how material, V-opening and inside radius affect springback.',
            path: '/engineering-tools/springback-database',
          }),
          createFAQPageStructuredData(englishPage.faq),
        ],
      },
    })
  }, [])

  return (
    <>
      <style>
        {`
          .zyco-springback {
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

          .zyco-springback::before {
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

          .zyco-springback::after {
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

          .zyco-springback__shell {
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
            transition: all 0.25s ease;
          }

          .zyco-tool-back-to-hub:hover {
            transform: translateY(-2px);
            border-color: rgba(125, 211, 252, 0.7);
            background: rgba(37, 99, 235, 0.42);
            color: #ffffff;
            box-shadow:
              0 14px 32px rgba(37, 99, 235, 0.32),
              0 0 0 1px rgba(125, 211, 252, 0.16);
          }

          .zyco-tool-back-to-hub:focus-visible {
            outline: 3px solid rgba(147, 197, 253, 0.46);
            outline-offset: 3px;
          }

          .zyco-springback__header,
          .zyco-springback__panel {
            border: 1px solid rgba(147, 197, 253, 0.2);
            border-radius: 28px;
            background:
              linear-gradient(145deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.05));
            box-shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
            backdrop-filter: blur(18px);
          }

          .zyco-springback__header {
            margin-bottom: 22px;
            padding: 34px;
          }

          .zyco-springback__eyebrow {
            margin: 0 0 14px;
            color: #93c5fd;
            font-size: 13px;
            font-weight: 800;
            letter-spacing: 2.4px;
            text-transform: uppercase;
          }

          .zyco-springback__title {
            margin: 0;
            color: #ffffff;
            font-size: 46px;
            line-height: 1.08;
            font-weight: 900;
            letter-spacing: 0;
            text-shadow: 0 0 28px rgba(96, 165, 250, 0.35);
          }

          .zyco-springback__subtitle {
            max-width: 760px;
            margin: 16px 0 0;
            color: #bfdbfe;
            font-size: 18px;
            line-height: 1.7;
            font-weight: 600;
          }

          .zyco-springback__panel {
            margin-bottom: 22px;
            padding: 24px;
          }

          .zyco-springback__panel-title {
            margin: 0 0 12px;
            color: #ffffff;
            font-size: 22px;
            line-height: 1.28;
            font-weight: 850;
            letter-spacing: 0;
          }

          .zyco-springback__panel-text {
            max-width: 960px;
            margin: 0;
            color: #dbeafe;
            font-size: 15px;
            line-height: 1.75;
            font-weight: 650;
          }

          .zyco-springback__factor-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin: 18px 0 0;
            padding: 0;
            list-style: none;
          }

          .zyco-springback__factor {
            padding: 9px 12px;
            border: 1px solid rgba(147, 197, 253, 0.22);
            border-radius: 999px;
            background: rgba(15, 23, 42, 0.28);
            color: #bfdbfe;
            font-size: 13px;
            line-height: 1.3;
            font-weight: 800;
          }

          .zyco-springback__grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 18px;
            margin-bottom: 22px;
          }

          .zyco-springback-card {
            min-height: 470px;
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
            transform: translateY(0);
            transition:
              transform 0.25s ease,
              border-color 0.25s ease,
              box-shadow 0.25s ease,
              background 0.25s ease;
            position: relative;
            overflow: hidden;
          }

          .zyco-springback-card::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, #38bdf8, #2563eb, transparent);
            opacity: 0.75;
          }

          .zyco-springback-card:hover {
            transform: translateY(-7px);
            border-color: rgba(147, 197, 253, 0.36);
            box-shadow: 0 22px 48px rgba(37, 99, 235, 0.26);
            background:
              radial-gradient(circle at top left, rgba(96, 165, 250, 0.3), transparent 45%),
              linear-gradient(145deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.07));
          }

          .zyco-springback-card__title {
            margin: 0 0 18px;
            color: #ffffff;
            font-size: 21px;
            line-height: 1.28;
            font-weight: 850;
            letter-spacing: 0;
          }

          .zyco-springback-card__specs {
            display: grid;
            gap: 10px;
            margin: 0 0 20px;
          }

          .zyco-springback-card__spec {
            margin: 0;
            padding: 12px 14px;
            border: 1px solid rgba(147, 197, 253, 0.16);
            border-radius: 16px;
            background: rgba(15, 23, 42, 0.2);
          }

          .zyco-springback-card__label {
            margin: 0 0 5px;
            color: #93c5fd;
            font-size: 11px;
            line-height: 1.35;
            font-weight: 900;
            letter-spacing: 0.7px;
            text-transform: uppercase;
          }

          .zyco-springback-card__value {
            margin: 0;
            color: #dbeafe;
            font-size: 14px;
            line-height: 1.55;
            font-weight: 750;
          }

          .zyco-springback-card__note-label {
            margin: 0 0 8px;
            color: #93c5fd;
            font-size: 12px;
            font-weight: 900;
            letter-spacing: 0.7px;
            text-transform: uppercase;
          }

          .zyco-springback-card__note {
            margin: 0 0 22px;
            color: #cbd5e1;
            font-size: 14px;
            line-height: 1.65;
            font-weight: 600;
          }

          .zyco-springback-card__action,
          .zyco-springback-tool-link {
            min-height: 46px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
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

          .zyco-springback-card__action:hover,
          .zyco-springback-tool-link:hover {
            transform: translateY(-2px);
            box-shadow: 0 18px 38px rgba(37, 99, 235, 0.42);
          }

          .zyco-springback__notes {
            display: grid;
            gap: 8px;
            margin: 0;
            padding: 0;
            list-style: none;
          }

          .zyco-springback__note {
            margin: 0;
            color: #dbeafe;
            font-size: 14px;
            line-height: 1.7;
            font-weight: 650;
          }

          .zyco-springback__faq {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }

          .zyco-springback__faq-item {
            padding: 18px;
            border: 1px solid rgba(147, 197, 253, 0.18);
            border-radius: 20px;
            background: rgba(15, 23, 42, 0.22);
          }

          .zyco-springback__question {
            margin: 0 0 8px;
            color: #ffffff;
            font-size: 15px;
            line-height: 1.45;
            font-weight: 850;
          }

          .zyco-springback__answer {
            margin: 0;
            color: #cbd5e1;
            font-size: 14px;
            line-height: 1.65;
            font-weight: 600;
          }

          .zyco-springback__tools {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
          }

          .zyco-springback__tools .zyco-springback-tool-link {
            border: 1px solid rgba(147, 197, 253, 0.38);
            border-radius: 14px;
            background: rgba(30, 64, 175, 0.32);
            color: #dbeafe;
            box-shadow: none;
            transition: all 0.25s ease;
          }

          .zyco-springback__tools .zyco-springback-tool-link:hover {
            transform: translateY(-4px);
            border-color: rgba(125, 211, 252, 0.7);
            color: #ffffff;
            background: rgba(37, 99, 235, 0.4);
            box-shadow: 0 14px 30px rgba(56, 189, 248, 0.22), 0 7px 22px rgba(2, 8, 23, 0.22);
          }

          @media (max-width: 980px) {
            .zyco-springback__grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .zyco-springback__title {
              font-size: 38px;
            }
          }

          @media (max-width: 720px) {
            .zyco-springback__faq {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 640px) {
            .zyco-springback {
              padding: 28px 14px;
            }

            .zyco-springback__header,
            .zyco-springback__panel {
              padding: 22px;
              border-radius: 24px;
            }

            .zyco-tool-back-to-hub {
              width: 100%;
              margin-bottom: 16px;
              padding: 10px 14px;
              text-align: center;
            }

            .zyco-springback__title {
              font-size: 32px;
            }

            .zyco-springback__subtitle {
              font-size: 16px;
            }

            .zyco-springback__grid {
              grid-template-columns: 1fr;
              gap: 14px;
            }

            .zyco-springback-card {
              min-height: 0;
              padding: 22px;
            }

            .zyco-springback-tool-link {
              width: 100%;
            }
          }
        `}
      </style>

      <main className='zyco-springback'>
        <section className='zyco-springback__shell'>
          <header className='zyco-springback__header'>
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

            <p className='zyco-springback__eyebrow'>
              {t.common.engineeringReference}
            </p>

            <h1 className='zyco-springback__title'>
              {page.title}
            </h1>

            <p className='zyco-springback__subtitle'>
              {page.subtitle}
            </p>
          </header>

          <section
            className='zyco-springback__panel'
            aria-labelledby='springback-engineering-overview'
          >
            <h2
              className='zyco-springback__panel-title'
              id='springback-engineering-overview'
            >
              {page.overviewTitle}
            </h2>

            <p className='zyco-springback__panel-text'>
              {page.overview}
            </p>

            <ul className='zyco-springback__factor-list'>
              {page.factors.map((factor) => (
                <li
                  className='zyco-springback__factor'
                  key={factor}
                >
                  {factor}
                </li>
              ))}
            </ul>
          </section>

          <div className='zyco-springback__grid'>
            {materials.map((material) => (
              <article
                className='zyco-springback-card'
                key={material.name}
              >
                <div>
                  <h2 className='zyco-springback-card__title'>
                    {t.materialNames[material.materialKey]}
                  </h2>

                  <dl className='zyco-springback-card__specs'>
                    {fields.map(([labelKey, key]) => (
                      <div
                        className='zyco-springback-card__spec'
                        key={labelKey}
                      >
                        <dt className='zyco-springback-card__label'>
                          {page.fields[labelKey]}
                        </dt>

                        <dd className='zyco-springback-card__value'>
                          {getSpringbackDisplayValue(material, key)}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <p className='zyco-springback-card__note-label'>
                    {t.common.engineeringNote}
                  </p>

                  <p className='zyco-springback-card__note'>
                    {t.materialNotes[material.materialKey]}
                  </p>
                </div>

                <a
                  className='zyco-springback-card__action'
                  href={`/engineering-tools/press-brake-calculator?material=${material.materialKey}`}
                >
                  {t.common.calculateBendingForce} {'\u2192'}
                </a>
              </article>
            ))}
          </div>

          <section
            className='zyco-springback__panel'
            aria-labelledby='springback-reference-notes'
          >
            <h2
              className='zyco-springback__panel-title'
              id='springback-reference-notes'
            >
              {t.common.engineeringReferenceNotes}
            </h2>

            <ul className='zyco-springback__notes'>
              {page.notes.map((note) => (
                <li
                  className='zyco-springback__note'
                  key={note}
                >
                  {note}
                </li>
              ))}

            </ul>
          </section>

          <section
            className='zyco-springback__panel'
            aria-labelledby='springback-faq'
          >
            <h2
              className='zyco-springback__panel-title'
              id='springback-faq'
            >
              {page.faqTitle}
            </h2>

            <div className='zyco-springback__faq'>
              {page.faq.map(([question, answer]) => (
                <article
                  className='zyco-springback__faq-item'
                  key={question}
                >
                  <h3 className='zyco-springback__question'>
                    {question}
                  </h3>

                  <p className='zyco-springback__answer'>
                    {answer}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section
            className='zyco-springback__panel'
            aria-labelledby='springback-related-tools'
          >
            <h2
              className='zyco-springback__panel-title'
              id='springback-related-tools'
            >
              {t.common.relatedEngineeringTools}
            </h2>

            <nav
              className='zyco-springback__tools'
              aria-label={t.common.relatedToolsAria}
            >
              {relatedTools.map((tool) => (
                <a
                  className='zyco-springback-tool-link'
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
