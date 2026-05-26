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
    factor: '1.00',
    yieldStrength: '180–280 MPa',
    tensileStrength: '300–450 MPa',
    springbackRange: '0.6°–1.3°',
    insideRadiusReference: '1T–1.5T',
  },
  {
    name: 'Galvanized Steel',
    materialKey: 'galvanizedSteel',
    factor: '1.05',
    yieldStrength: '200–300 MPa',
    tensileStrength: '320–460 MPa',
    springbackRange: '0.8°–1.6°',
    insideRadiusReference: '1.2T–1.6T',
  },
  {
    name: 'Stainless Steel 201',
    materialKey: 'stainless201',
    factor: '1.76',
    yieldStrength: '260–380 MPa',
    tensileStrength: '600–850 MPa',
    springbackRange: '2.2°–3.8°',
    insideRadiusReference: '1.4T–2T',
  },
  {
    name: 'Stainless Steel 304',
    materialKey: 'stainless304',
    factor: '1.62',
    yieldStrength: '215–300 MPa',
    tensileStrength: '520–750 MPa',
    springbackRange: '1.8°–3.0°',
    insideRadiusReference: '1.3T–1.8T',
  },
  {
    name: 'Aluminum',
    materialKey: 'aluminum',
    factor: '0.65',
    yieldStrength: '70–160 MPa',
    tensileStrength: '150–250 MPa',
    springbackRange: '1.2°–2.8°',
    insideRadiusReference: '1T–2T',
  },
  {
    name: 'Brass',
    materialKey: 'brass',
    factor: '0.60',
    yieldStrength: '100–250 MPa',
    tensileStrength: '250–500 MPa',
    springbackRange: '0.4°–1.2°',
    insideRadiusReference: '1T–1.5T',
  },
]

const fields = [
  ['factor', 'factor'],
  ['yieldStrength', 'yieldStrength'],
  ['tensileStrength', 'tensileStrength'],
  ['standardAutoVDie', 'standardAutoVDie'],
  ['insideRadiusReference', 'insideRadiusReference'],
  ['springbackRange', 'springbackRange'],
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

export default function MaterialDatabase({
  language = 'en',
  setLanguage = () => {},
}) {
  useEffect(() => {
    const englishPage = getEngineeringText('en').pages.material

    setPageSEO({
      title: 'Sheet Metal Bending Material Database | ZYCO',
      description:
        'Reference common sheet metal bending materials including mild steel, galvanized steel, stainless steel, aluminum and brass. Compare material factor, strength range, inside radius and springback reference.',
      keywords:
        'sheet metal material database, press brake material factor, stainless steel bending, aluminum bending, material strength for bending, springback material reference',
      canonicalPath: '/engineering-tools/material-database',
    })

    setStructuredData({
      id: 'material-database-jsonld',
      data: {
        '@context': 'https://schema.org',
        '@graph': [
          createWebApplicationStructuredData({
            name: 'Material Database',
            description:
              'Reference common sheet metal bending materials including mild steel, galvanized steel, stainless steel, aluminum and brass. Compare material factor, strength range, inside radius and springback reference.',
            path: '/engineering-tools/material-database',
          }),
          createFAQPageStructuredData(englishPage.faq),
        ],
      },
    })
  }, [])

  const t = getEngineeringText(language)
  const page = t.pages.material
  const backToEngineeringToolsLabel =
    backToEngineeringToolsLabels[language] ||
    backToEngineeringToolsLabels.en
  const getMaterialDisplayValue = (material, key) => {
    if (key === 'standardAutoVDie') {
      return page.values.standardAutoVDie
    }

    return material[key]
  }

  return (
    <>
      <style>
        {`
          .zyco-materials {
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

          .zyco-materials::before {
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

          .zyco-materials::after {
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

          .zyco-materials__shell {
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

          .zyco-materials__header {
            margin-bottom: 34px;
            padding: 34px;
            border: 1px solid rgba(147, 197, 253, 0.2);
            border-radius: 28px;
            background:
              linear-gradient(145deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.05));
            box-shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
            backdrop-filter: blur(18px);
          }

          .zyco-materials__eyebrow {
            margin: 0 0 14px;
            color: #93c5fd;
            font-size: 13px;
            font-weight: 800;
            letter-spacing: 2.4px;
            text-transform: uppercase;
          }

          .zyco-materials__title {
            margin: 0;
            color: #ffffff;
            font-size: 46px;
            line-height: 1.08;
            font-weight: 900;
            letter-spacing: 0;
            text-shadow: 0 0 28px rgba(96, 165, 250, 0.35);
          }

          .zyco-materials__subtitle {
            max-width: 680px;
            margin: 16px 0 0;
            color: #bfdbfe;
            font-size: 18px;
            line-height: 1.7;
            font-weight: 600;
          }

          .zyco-materials__engineering-note {
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

          .zyco-materials__note-title {
            margin: 0 0 12px;
            color: #ffffff;
            font-size: 18px;
            line-height: 1.25;
            font-weight: 850;
            letter-spacing: 0;
          }

          .zyco-materials__note-text {
            margin: 0;
          }

          .zyco-materials__note-text + .zyco-materials__note-text {
            margin-top: 6px;
          }

          .zyco-materials__note-rule {
            margin: 4px 0 0;
            color: #ffffff;
            font-weight: 800;
          }

          .zyco-materials__grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 18px;
          }

          .zyco-material-card {
            min-height: 438px;
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

          .zyco-material-card::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, #38bdf8, #2563eb, transparent);
            opacity: 0.75;
          }

          .zyco-material-card:hover {
            transform: translateY(-7px);
            border-color: rgba(147, 197, 253, 0.36);
            box-shadow: 0 22px 48px rgba(37, 99, 235, 0.26);
            background:
              radial-gradient(circle at top left, rgba(96, 165, 250, 0.3), transparent 45%),
              linear-gradient(145deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.07));
          }

          .zyco-material-card__title {
            margin: 0 0 18px;
            color: #ffffff;
            font-size: 22px;
            line-height: 1.25;
            font-weight: 850;
            letter-spacing: 0;
            overflow-wrap: anywhere;
          }

          .zyco-material-card__specs {
            display: grid;
            gap: 10px;
            margin: 0 0 18px;
          }

          .zyco-material-card__spec {
            display: flex;
            justify-content: space-between;
            gap: 14px;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(191, 219, 254, 0.14);
          }

          .zyco-material-card__label {
            color: #93c5fd;
            font-size: 12px;
            line-height: 1.35;
            font-weight: 900;
            letter-spacing: 0.7px;
            text-transform: uppercase;
          }

          .zyco-material-card__value {
            color: #ffffff;
            font-size: 14px;
            line-height: 1.4;
            font-weight: 800;
            text-align: right;
            overflow-wrap: anywhere;
          }

          .zyco-material-card__reference {
            margin: 16px 0 18px;
            padding: 12px 14px;
            border: 1px solid rgba(147, 197, 253, 0.18);
            border-radius: 16px;
            background: rgba(15, 23, 42, 0.22);
          }

          .zyco-material-card__reference-label {
            margin: 0 0 5px;
            color: #93c5fd;
            font-size: 11px;
            line-height: 1.35;
            font-weight: 900;
            letter-spacing: 0.7px;
            text-transform: uppercase;
          }

          .zyco-material-card__reference-value {
            margin: 0;
            color: #dbeafe;
            font-size: 13px;
            line-height: 1.55;
            font-weight: 750;
          }

          .zyco-material-card__note-label {
            margin: 0 0 8px;
            color: #93c5fd;
            font-size: 12px;
            font-weight: 900;
            letter-spacing: 0.7px;
            text-transform: uppercase;
          }

          .zyco-material-card__note {
            margin: 0 0 24px;
            color: #cbd5e1;
            font-size: 14px;
            line-height: 1.65;
            font-weight: 600;
          }

          .zyco-material-card__calculator-note {
            max-width: 280px;
            margin: 0 0 12px;
            color: #bfdbfe;
            font-size: 13px;
            line-height: 1.55;
            font-weight: 650;
          }

          .zyco-material-card__action {
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

          .zyco-material-card__action:hover {
            transform: translateY(-2px);
            box-shadow: 0 18px 38px rgba(37, 99, 235, 0.42);
          }

          .zyco-materials__panel {
            margin-top: 22px;
            padding: 24px;
            border: 1px solid rgba(147, 197, 253, 0.2);
            border-radius: 28px;
            background:
              linear-gradient(145deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.05));
            box-shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
            backdrop-filter: blur(18px);
          }

          .zyco-materials__faq {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }

          .zyco-materials__faq-item {
            padding: 18px;
            border: 1px solid rgba(147, 197, 253, 0.18);
            border-radius: 20px;
            background: rgba(15, 23, 42, 0.22);
          }

          .zyco-materials__question {
            margin: 0 0 8px;
            color: #ffffff;
            font-size: 15px;
            line-height: 1.45;
            font-weight: 850;
          }

          .zyco-materials__answer {
            margin: 0;
            color: #cbd5e1;
            font-size: 14px;
            line-height: 1.65;
            font-weight: 600;
          }

          .zyco-materials__tools {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
          }

          .zyco-materials__tools .zyco-material-card__action {
            border: 1px solid rgba(147, 197, 253, 0.38);
            border-radius: 14px;
            background: rgba(30, 64, 175, 0.32);
            color: #dbeafe;
            box-shadow: none;
            transition: all 0.25s ease;
          }

          .zyco-materials__tools .zyco-material-card__action:hover {
            transform: translateY(-4px);
            border-color: rgba(125, 211, 252, 0.7);
            color: #ffffff;
            background: rgba(37, 99, 235, 0.4);
            box-shadow: 0 14px 30px rgba(56, 189, 248, 0.22), 0 7px 22px rgba(2, 8, 23, 0.22);
          }

          @media (max-width: 980px) {
            .zyco-materials__grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .zyco-materials__title {
              font-size: 38px;
            }
          }

          @media (max-width: 640px) {
            .zyco-materials {
              padding: 28px 14px;
            }

            .zyco-materials__header {
              padding: 24px;
              border-radius: 24px;
            }

            .zyco-tool-back-to-hub {
              width: 100%;
              margin-bottom: 16px;
              padding: 10px 14px;
              text-align: center;
            }

            .zyco-materials__title {
              font-size: 32px;
            }

            .zyco-materials__subtitle {
              font-size: 16px;
            }

            .zyco-materials__engineering-note {
              padding: 16px;
              font-size: 13px;
            }

            .zyco-materials__grid {
              grid-template-columns: 1fr;
              gap: 14px;
            }

            .zyco-materials__faq {
              grid-template-columns: 1fr;
            }

            .zyco-materials__panel {
              padding: 22px;
              border-radius: 24px;
            }

            .zyco-material-card {
              min-height: 0;
              padding: 22px;
            }

            .zyco-material-card__spec {
              display: grid;
              gap: 4px;
            }

            .zyco-material-card__value {
              text-align: left;
              white-space: normal;
            }

            .zyco-material-card__action {
              width: 100%;
            }
          }
        `}
      </style>

      <main className='zyco-materials'>
        <section className='zyco-materials__shell'>
          <header className='zyco-materials__header'>
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

            <p className='zyco-materials__eyebrow'>
              {t.common.engineeringReference}
            </p>

            <h1 className='zyco-materials__title'>
              {page.title}
            </h1>

            <p className='zyco-materials__subtitle'>
              {page.subtitle}
            </p>

            <div className='zyco-materials__engineering-note'>
              <h2 className='zyco-materials__note-title'>
                {t.common.engineeringOverview}
              </h2>

              <p className='zyco-materials__note-text'>
                {page.overview}
              </p>

              <p className='zyco-materials__note-text'>
                {page.notes[0]}
              </p>

              {page.notes.slice(1, 4).map((note) => (
                <p
                  className='zyco-materials__note-rule'
                  key={note}
                >
                  {note}
                </p>
              ))}

              <p className='zyco-materials__note-text'>
                {page.notes[4]}
              </p>
            </div>
          </header>

          <div className='zyco-materials__grid'>
            {materials.map((material) => (
              <article
                className='zyco-material-card'
                key={material.name}
              >
                <div>
                  <h2 className='zyco-material-card__title'>
                    {t.materialNames[material.materialKey]}
                  </h2>

                  <dl className='zyco-material-card__specs'>
                    {fields.map(([labelKey, key]) => (
                      <div key={labelKey}>
                        <div className='zyco-material-card__spec'>
                          <dt className='zyco-material-card__label'>
                            {page.fields[labelKey]}
                          </dt>

                          <dd className='zyco-material-card__value'>
                            {getMaterialDisplayValue(material, key)}
                          </dd>
                        </div>

                        {key === 'springbackRange' && (
                          <div className='zyco-material-card__reference'>
                            <p className='zyco-material-card__reference-label'>
                              {t.common.referenceCondition}
                            </p>

                            <p className='zyco-material-card__reference-value'>
                              {page.values.springbackReferenceCondition}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </dl>

                  <p className='zyco-material-card__note-label'>
                    {t.common.applicationNote}
                  </p>

                  <p className='zyco-material-card__note'>
                    {t.materialNotes[material.materialKey]}
                  </p>
                </div>

                <div>
                  <p className='zyco-material-card__calculator-note'>
                    {page.calculatorNote}
                  </p>

                  <a
                    className='zyco-material-card__action'
                    href={`/engineering-tools/press-brake-calculator?material=${material.materialKey}`}
                  >
                    {t.common.calculateBendingForce} {'\u2192'}
                  </a>
                </div>
              </article>
            ))}
          </div>

          <section
            className='zyco-materials__panel'
            aria-labelledby='material-faq'
          >
            <h2
              className='zyco-materials__note-title'
              id='material-faq'
            >
              {page.faqTitle}
            </h2>

            <div className='zyco-materials__faq'>
              {page.faq.map(([question, answer]) => (
                <article
                  className='zyco-materials__faq-item'
                  key={question}
                >
                  <h3 className='zyco-materials__question'>
                    {question}
                  </h3>

                  <p className='zyco-materials__answer'>
                    {answer}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section
            className='zyco-materials__panel'
            aria-labelledby='material-related-tools'
          >
            <h2
              className='zyco-materials__note-title'
              id='material-related-tools'
            >
              {t.common.relatedEngineeringTools}
            </h2>

            <nav
              className='zyco-materials__tools'
              aria-label={t.common.relatedToolsAria}
            >
              {relatedTools.map((tool) => (
                <a
                  className='zyco-material-card__action'
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
