import { useEffect, useMemo, useState } from 'react'
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
    naturalInsideRadiusFactor: 0.16,
    minimumSafeInsideRadius: '0.8T\u20131T',
    recommendedInsideRadius: '1T\u20131.5T',
  },
  {
    name: 'Galvanized Steel',
    materialKey: 'galvanizedSteel',
    naturalInsideRadiusFactor: 0.16,
    minimumSafeInsideRadius: '1T\u20131.2T',
    recommendedInsideRadius: '1.2T\u20131.6T',
  },
  {
    name: 'Stainless Steel 201',
    materialKey: 'stainless201',
    naturalInsideRadiusFactor: 0.18,
    minimumSafeInsideRadius: '1T\u20131.3T',
    recommendedInsideRadius: '1.4T\u20132T',
  },
  {
    name: 'Stainless Steel 304',
    materialKey: 'stainless304',
    naturalInsideRadiusFactor: 0.18,
    minimumSafeInsideRadius: '1T\u20131.3T',
    recommendedInsideRadius: '1.3T\u20131.8T',
  },
  {
    name: 'Aluminum',
    materialKey: 'aluminum',
    naturalInsideRadiusFactor: 0.14,
    minimumSafeInsideRadius: '0.8T\u20131.5T',
    recommendedInsideRadius: '1T\u20132T',
  },
  {
    name: 'Brass',
    materialKey: 'brass',
    naturalInsideRadiusFactor: 0.16,
    minimumSafeInsideRadius: '0.8T\u20131T',
    recommendedInsideRadius: '1T\u20131.5T',
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
    key: 'bendAllowanceCalculator',
    href: '/engineering-tools/bend-allowance-calculator',
  },
  {
    key: 'airBendingGuide',
    href: '/engineering-tools/air-bending-guide',
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

const getStandardAutoVDie = (thickness) => {
  if (thickness < 8) return thickness * 8

  if (thickness < 25) return thickness * 10

  return thickness * 12
}

const formatNumber = (value) =>
  Number.isInteger(value)
    ? String(value)
    : value.toFixed(1).replace(/\.0$/, '')

const formatNaturalInsideRadius = (value) =>
  `\u2248 ${value.toFixed(1)} mm`

export default function VDieSelection({
  language = 'en',
  setLanguage = () => {},
}) {
  useEffect(() => {
    const englishPage = getEngineeringText('en').pages.vdie

    setPageSEO({
      title: 'V Die Selection Tool for Press Brake Bending | ZYCO',
      description:
        'Select recommended V-die opening for press brake air bending based on material and thickness. Understand standard V-opening rules, inside radius influence, tonnage effect and cracking risk.',
      keywords:
        'V die selection, V opening calculator, press brake tooling, press brake die selection, air bending V die, sheet metal V die',
      canonicalPath: '/engineering-tools/v-die-selection',
    })

    setStructuredData({
      id: 'v-die-selection-jsonld',
      data: {
        '@context': 'https://schema.org',
        '@graph': [
          createWebApplicationStructuredData({
            name: 'V Die Selection Tool',
            description:
              'Select recommended V-die opening for press brake air bending based on material and thickness. Understand standard V-opening rules, inside radius influence, tonnage effect and cracking risk.',
            path: '/engineering-tools/v-die-selection',
          }),
          createFAQPageStructuredData(englishPage.faq),
        ],
      },
    })
  }, [])

  const t = getEngineeringText(language)
  const page = t.pages.vdie
  const backToEngineeringToolsLabel =
    backToEngineeringToolsLabels[language] ||
    backToEngineeringToolsLabels.en
  const [materialKey, setMaterialKey] = useState('mildSteel')
  const [thickness, setThickness] = useState('')

  const selectedMaterial = materials.find(
    (material) => material.materialKey === materialKey
  ) || materials[0]

  const result = useMemo(() => {
    const thicknessValue = Number(thickness)

    if (!thickness || !Number.isFinite(thicknessValue) || thicknessValue <= 0) {
      return null
    }

    const standardAutoVDie = getStandardAutoVDie(thicknessValue)
    const estimatedNaturalInsideRadius =
      standardAutoVDie * selectedMaterial.naturalInsideRadiusFactor

    return {
      standardAutoVDie: `${formatNumber(standardAutoVDie)} mm`,
      estimatedNaturalInsideRadius: formatNaturalInsideRadius(
        estimatedNaturalInsideRadius
      ),
      minimumSafeInsideRadius: selectedMaterial.minimumSafeInsideRadius,
      recommendedInsideRadius: selectedMaterial.recommendedInsideRadius,
      materialAdjustmentAdvice: t.common.materialAdjustmentAdvice,
    }
  }, [
    language,
    selectedMaterial,
    thickness,
  ])

  const outputRows = [
    [
      page.output.standardRule,
      page.output.standardRuleValue,
    ],
    [page.output.standardAutoVDie, result?.standardAutoVDie || '--'],
    [
      page.output.estimatedNaturalInsideRadius,
      result?.estimatedNaturalInsideRadius || '--',
    ],
    [page.output.minimumSafeInsideRadius, result?.minimumSafeInsideRadius || '--'],
    [page.output.recommendedInsideRadius, result?.recommendedInsideRadius || '--'],
    [page.output.materialAdjustmentAdvice, result?.materialAdjustmentAdvice || '--'],
  ]

  return (
    <>
      <style>
        {`
          .zyco-vdie {
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

          .zyco-vdie::before {
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

          .zyco-vdie::after {
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

          .zyco-vdie__shell {
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

          .zyco-vdie__header,
          .zyco-vdie-card {
            border: 1px solid rgba(147, 197, 253, 0.2);
            border-radius: 28px;
            background:
              linear-gradient(145deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.05));
            box-shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
            backdrop-filter: blur(18px);
          }

          .zyco-vdie__header {
            margin-bottom: 34px;
            padding: 34px;
          }

          .zyco-vdie__eyebrow {
            margin: 0 0 14px;
            color: #93c5fd;
            font-size: 13px;
            font-weight: 800;
            letter-spacing: 2.4px;
            text-transform: uppercase;
          }

          .zyco-vdie__title {
            margin: 0;
            color: #ffffff;
            font-size: 46px;
            line-height: 1.08;
            font-weight: 900;
            letter-spacing: 0;
            text-shadow: 0 0 28px rgba(96, 165, 250, 0.35);
          }

          .zyco-vdie__subtitle {
            max-width: 720px;
            margin: 16px 0 0;
            color: #bfdbfe;
            font-size: 18px;
            line-height: 1.7;
            font-weight: 600;
          }

          .zyco-vdie__engineering-note {
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

          .zyco-vdie__note-title {
            margin: 0 0 12px;
            color: #ffffff;
            font-size: 18px;
            line-height: 1.25;
            font-weight: 850;
            letter-spacing: 0;
          }

          .zyco-vdie__note-text {
            margin: 0;
          }

          .zyco-vdie__grid {
            display: grid;
            grid-template-columns: minmax(300px, 0.82fr) minmax(0, 1.18fr);
            gap: 18px;
            align-items: stretch;
          }

          .zyco-vdie-card {
            box-sizing: border-box;
            padding: 24px;
            position: relative;
            overflow: hidden;
            transition:
              transform 0.25s ease,
              border-color 0.25s ease,
              box-shadow 0.25s ease,
              background 0.25s ease;
          }

          .zyco-vdie-card::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, #38bdf8, #2563eb, transparent);
            opacity: 0.75;
          }

          .zyco-vdie-card:hover {
            transform: translateY(-7px);
            border-color: rgba(147, 197, 253, 0.36);
            box-shadow: 0 22px 48px rgba(37, 99, 235, 0.26);
            background:
              radial-gradient(circle at top left, rgba(96, 165, 250, 0.3), transparent 45%),
              linear-gradient(145deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.07));
          }

          .zyco-vdie-card__title {
            margin: 0 0 20px;
            color: #ffffff;
            font-size: 22px;
            line-height: 1.25;
            font-weight: 850;
            letter-spacing: 0;
          }

          .zyco-vdie-form {
            display: grid;
            gap: 18px;
          }

          .zyco-vdie-field {
            display: grid;
            gap: 8px;
          }

          .zyco-vdie-field__label {
            padding-left: 6px;
            color: #93c5fd;
            font-size: 12px;
            font-weight: 900;
            letter-spacing: 1.1px;
            text-transform: uppercase;
          }

          .zyco-vdie-field__control {
            width: 100%;
            height: 58px;
            box-sizing: border-box;
            padding: 0 18px;
            border: 1px solid rgba(148, 163, 184, 0.18);
            border-radius: 18px;
            outline: none;
            background: linear-gradient(180deg, #ffffff 0%, #f1f5ff 100%);
            color: #0f172a;
            font-size: 16px;
            font-weight: 700;
            box-shadow: 0 6px 18px rgba(15, 23, 42, 0.05);
            transition:
              transform 0.25s ease,
              border-color 0.25s ease,
              box-shadow 0.25s ease;
          }

          .zyco-vdie-field__control:focus {
            transform: translateY(-2px);
            border-color: #3b82f6;
            box-shadow:
              0 0 0 4px rgba(59, 130, 246, 0.15),
              0 0 25px rgba(59, 130, 246, 0.15);
          }

          .zyco-vdie-results {
            display: grid;
            gap: 12px;
            margin: 0 0 24px;
          }

          .zyco-vdie-result {
            display: grid;
            grid-template-columns: minmax(180px, 0.7fr) minmax(0, 1.3fr);
            gap: 16px;
            align-items: start;
            padding: 16px;
            border: 1px solid rgba(191, 219, 254, 0.16);
            border-radius: 18px;
            background: rgba(15, 23, 42, 0.24);
          }

          .zyco-vdie-result__label {
            color: #93c5fd;
            font-size: 12px;
            line-height: 1.35;
            font-weight: 900;
            letter-spacing: 0.7px;
            text-transform: uppercase;
          }

          .zyco-vdie-result__value {
            margin: 0;
            color: #ffffff;
            font-size: 15px;
            line-height: 1.55;
            font-weight: 800;
            overflow-wrap: anywhere;
          }

          .zyco-vdie-card__action {
            min-height: 50px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            padding: 0 20px;
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

          .zyco-vdie-card__action:hover {
            transform: translateY(-2px);
            box-shadow: 0 18px 38px rgba(37, 99, 235, 0.42);
          }

          .zyco-vdie__panel {
            margin-top: 22px;
            padding: 24px;
            border: 1px solid rgba(147, 197, 253, 0.2);
            border-radius: 28px;
            background:
              linear-gradient(145deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.05));
            box-shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
            backdrop-filter: blur(18px);
          }

          .zyco-vdie__faq {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }

          .zyco-vdie__faq-item {
            padding: 18px;
            border: 1px solid rgba(147, 197, 253, 0.18);
            border-radius: 20px;
            background: rgba(15, 23, 42, 0.22);
          }

          .zyco-vdie__question {
            margin: 0 0 8px;
            color: #ffffff;
            font-size: 15px;
            line-height: 1.45;
            font-weight: 850;
          }

          .zyco-vdie__answer {
            margin: 0;
            color: #cbd5e1;
            font-size: 14px;
            line-height: 1.65;
            font-weight: 600;
          }

          .zyco-vdie__tools {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
          }

          @media (max-width: 900px) {
            .zyco-vdie__grid {
              grid-template-columns: 1fr;
            }

            .zyco-vdie__title {
              font-size: 38px;
            }
          }

          @media (max-width: 640px) {
            .zyco-vdie {
              padding: 28px 14px;
            }

            .zyco-vdie__header,
            .zyco-vdie-card {
              padding: 24px;
              border-radius: 24px;
            }

            .zyco-tool-back-to-hub {
              width: 100%;
              margin-bottom: 16px;
              padding: 10px 14px;
              text-align: center;
            }

            .zyco-vdie__title {
              font-size: 32px;
            }

            .zyco-vdie__subtitle {
              font-size: 16px;
            }

            .zyco-vdie__engineering-note {
              padding: 16px;
              font-size: 13px;
            }

            .zyco-vdie-result {
              grid-template-columns: 1fr;
              gap: 6px;
            }

            .zyco-vdie__faq {
              grid-template-columns: 1fr;
            }

            .zyco-vdie__panel {
              padding: 22px;
              border-radius: 24px;
            }

            .zyco-vdie-card__action {
              width: 100%;
            }
          }
        `}
      </style>

      <main className='zyco-vdie'>
        <section className='zyco-vdie__shell'>
          <header className='zyco-vdie__header'>
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

            <p className='zyco-vdie__eyebrow'>
              {t.common.engineeringReference}
            </p>

            <h1 className='zyco-vdie__title'>
              {page.title}
            </h1>

            <p className='zyco-vdie__subtitle'>
              {page.subtitle}
            </p>

            <section
              className='zyco-vdie__engineering-note'
              aria-labelledby='vdie-engineering-overview'
            >
              <h2
                className='zyco-vdie__note-title'
                id='vdie-engineering-overview'
              >
                {t.common.engineeringOverview}
              </h2>

              <p className='zyco-vdie__note-text'>
                {page.overview}
              </p>
            </section>
          </header>

          <div className='zyco-vdie__grid'>
            <article className='zyco-vdie-card'>
              <h2 className='zyco-vdie-card__title'>
                {t.common.inputParameters}
              </h2>

              <div className='zyco-vdie-form'>
                <label className='zyco-vdie-field'>
                  <span className='zyco-vdie-field__label'>
                    {t.common.material}
                  </span>

                  <select
                    className='zyco-vdie-field__control'
                    value={materialKey}
                    onChange={(event) =>
                      setMaterialKey(event.target.value)
                    }
                  >
                    {materials.map((material) => (
                      <option
                        key={material.materialKey}
                        value={material.materialKey}
                      >
                        {t.materialNames[material.materialKey]}
                      </option>
                    ))}
                  </select>
                </label>

                <label className='zyco-vdie-field'>
                  <span className='zyco-vdie-field__label'>
                    {t.common.thickness}
                  </span>

                  <input
                    className='zyco-vdie-field__control'
                    min='0'
                    step='0.1'
                    type='number'
                    value={thickness}
                    onChange={(event) =>
                      setThickness(event.target.value)
                    }
                    placeholder={t.common.enterSheetThickness}
                  />
                </label>
              </div>
            </article>

            <article className='zyco-vdie-card'>
              <h2 className='zyco-vdie-card__title'>
                {t.common.selectionOutput}
              </h2>

              <dl className='zyco-vdie-results'>
                {outputRows.map(([label, value]) => (
                  <div
                    className='zyco-vdie-result'
                    key={label}
                  >
                    <dt className='zyco-vdie-result__label'>
                      {label}
                    </dt>

                    <dd className='zyco-vdie-result__value'>
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <a
                className='zyco-vdie-card__action'
                href={`/engineering-tools/press-brake-calculator?material=${materialKey}`}
              >
                {t.common.calculateBendingForce} {'\u2192'}
              </a>
            </article>
          </div>

          <section
            className='zyco-vdie__panel'
            aria-labelledby='vdie-faq'
          >
            <h2
              className='zyco-vdie-card__title'
              id='vdie-faq'
            >
              {page.faqTitle}
            </h2>

            <div className='zyco-vdie__faq'>
              {page.faq.map(([question, answer]) => (
                <article
                  className='zyco-vdie__faq-item'
                  key={question}
                >
                  <h3 className='zyco-vdie__question'>
                    {question}
                  </h3>

                  <p className='zyco-vdie__answer'>
                    {answer}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section
            className='zyco-vdie__panel'
            aria-labelledby='vdie-related-tools'
          >
            <h2
              className='zyco-vdie-card__title'
              id='vdie-related-tools'
            >
              {t.common.relatedEngineeringTools}
            </h2>

            <nav
              className='zyco-vdie__tools'
              aria-label={t.common.relatedToolsAria}
            >
              {relatedTools.map((tool) => (
                <a
                  className='zyco-vdie-card__action'
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
