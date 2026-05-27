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
    recommendedKFactor: 0.33,
    naturalInsideRadiusFactor: 0.16,
  },
  {
    name: 'Galvanized Steel',
    materialKey: 'galvanizedSteel',
    recommendedKFactor: 0.33,
    naturalInsideRadiusFactor: 0.16,
  },
  {
    name: 'Stainless Steel 201',
    materialKey: 'stainless201',
    recommendedKFactor: 0.35,
    naturalInsideRadiusFactor: 0.18,
  },
  {
    name: 'Stainless Steel 304',
    materialKey: 'stainless304',
    recommendedKFactor: 0.35,
    naturalInsideRadiusFactor: 0.18,
  },
  {
    name: 'Aluminum',
    materialKey: 'aluminum',
    recommendedKFactor: 0.4,
    naturalInsideRadiusFactor: 0.14,
  },
  {
    name: 'Brass',
    materialKey: 'brass',
    recommendedKFactor: 0.35,
    naturalInsideRadiusFactor: 0.16,
  },
]

const relatedTools = [
  {
    key: 'pressBrakeCalculator',
    href: '/engineering-tools/press-brake-calculator',
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
    key: 'materialDatabase',
    href: '/engineering-tools/material-database',
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
    key: 'vDieSelectionTool',
    href: '/engineering-tools/v-die-selection',
  },
  {
    key: 'insideRadiusGuide',
    href: '/engineering-tools/inside-radius-guide',
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
    key: 'bendSequenceGuide',
    href: '/engineering-tools/bend-sequence-guide',
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

const formatMillimeters = (value) => `${value.toFixed(2)} mm`
const formatAutoInsideRadius = (value) => `\u2248 ${value.toFixed(1)} mm`
const formatRadiusInput = (value) => value.toFixed(1)

const getStandardAutoVDie = (thickness) => {
  if (thickness < 8) return thickness * 8

  if (thickness < 25) return thickness * 10

  return thickness * 12
}

export default function BendAllowanceCalculator({
  language = 'en',
  setLanguage = () => {},
}) {
  const t = getEngineeringText(language)
  const page = t.pages.bend
  const backToEngineeringToolsLabel =
    backToEngineeringToolsLabels[language] ||
    backToEngineeringToolsLabels.en
  const [materialKey, setMaterialKey] = useState('mildSteel')
  const [thickness, setThickness] = useState('2')
  const [insideRadius, setInsideRadius] = useState('2.6')
  const [bendAngle, setBendAngle] = useState('90')
  const [kFactor, setKFactor] = useState('0.33')
  const [isManualRadiusOverride, setIsManualRadiusOverride] =
    useState(false)

  useEffect(() => {
    const englishPage = getEngineeringText('en').pages.bend

    setPageSEO({
      title: 'Bend Allowance Calculator for Sheet Metal Flat Pattern | ZYCO',
      description:
        'Calculate bend allowance, outside setback and bend deduction for sheet metal bending using thickness, inside radius, bend angle and K-factor. Useful for flat pattern and development reference.',
      keywords:
        'bend allowance calculator, bend deduction calculator, K factor calculator, flat pattern calculator, sheet metal development, outside setback',
      canonicalPath: '/engineering-tools/bend-allowance-calculator',
    })

    setStructuredData({
      id: 'bend-allowance-calculator-jsonld',
      data: {
        '@context': 'https://schema.org',
        '@graph': [
          createWebApplicationStructuredData({
            name: 'Bend Allowance Calculator',
            description:
              'Calculate bend allowance, outside setback and bend deduction for sheet metal bending using thickness, inside radius, bend angle and K-factor. Useful for flat pattern and development reference.',
            path: '/engineering-tools/bend-allowance-calculator',
          }),
          createFAQPageStructuredData(englishPage.faq),
        ],
      },
    })
  }, [])

  const selectedMaterial =
    materials.find((material) => material.materialKey === materialKey) ||
    materials[0]

  const autoEstimatedInsideRadius = useMemo(() => {
    const thicknessValue = Number(thickness)
    const bendAngleValue = Number(bendAngle)

    if (!Number.isFinite(thicknessValue) || thicknessValue <= 0) {
      return null
    }

    const standardAutoVDie = getStandardAutoVDie(thicknessValue)
    const baseRadius =
      standardAutoVDie * selectedMaterial.naturalInsideRadiusFactor
    const rawAngleFactor = Number.isFinite(bendAngleValue)
      ? 1 + (bendAngleValue - 90) * 0.002
      : 1
    const angleFactor = Math.min(
      1.08,
      Math.max(0.94, rawAngleFactor)
    )

    return baseRadius * angleFactor
  }, [
    bendAngle,
    selectedMaterial,
    thickness,
  ])

  useEffect(() => {
    if (
      isManualRadiusOverride ||
      autoEstimatedInsideRadius === null
    ) {
      return
    }

    setInsideRadius(formatRadiusInput(autoEstimatedInsideRadius))
  }, [
    autoEstimatedInsideRadius,
    isManualRadiusOverride,
  ])

  const result = useMemo(() => {
    const thicknessValue = Number(thickness)
    const insideRadiusValue = Number(insideRadius)
    const bendAngleValue = Number(bendAngle)
    const kFactorValue = Number(kFactor)

    const hasValidInputs = [
      thicknessValue,
      insideRadiusValue,
      bendAngleValue,
      kFactorValue,
    ].every((value) => Number.isFinite(value) && value > 0)

    if (!hasValidInputs) {
      return null
    }

    const angleRadians = (bendAngleValue * Math.PI) / 180
    const halfAngleRadians = ((bendAngleValue / 2) * Math.PI) / 180
    const bendAllowance =
      angleRadians *
      (insideRadiusValue + kFactorValue * thicknessValue)
    const outsideSetback =
      Math.tan(halfAngleRadians) *
      (insideRadiusValue + thicknessValue)
    const bendDeduction = 2 * outsideSetback - bendAllowance

    return {
      bendAllowance,
      outsideSetback,
      bendDeduction,
    }
  }, [
    bendAngle,
    insideRadius,
    kFactor,
    thickness,
  ])

  const handleMaterialChange = (event) => {
    const nextMaterialKey = event.target.value
    const nextMaterial =
      materials.find((material) => material.materialKey === nextMaterialKey) ||
      materials[0]

    setMaterialKey(nextMaterialKey)
    setKFactor(nextMaterial.recommendedKFactor.toFixed(2))
  }

  const handleInsideRadiusChange = (event) => {
    setInsideRadius(event.target.value)
    setIsManualRadiusOverride(true)
  }

  const useAutoEstimatedRadius = () => {
    if (autoEstimatedInsideRadius === null) {
      return
    }

    setInsideRadius(formatRadiusInput(autoEstimatedInsideRadius))
    setIsManualRadiusOverride(false)
  }

  const outputRows = [
    [
      page.output.bendAllowance,
      result ? formatMillimeters(result.bendAllowance) : '--',
    ],
    [
      page.output.outsideSetback,
      result ? formatMillimeters(result.outsideSetback) : '--',
    ],
    [
      page.output.bendDeduction,
      result ? formatMillimeters(result.bendDeduction) : '--',
    ],
  ]

  return (
    <>
      <style>
        {`
          .zyco-bend {
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

          .zyco-bend::before {
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

          .zyco-bend::after {
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

          .zyco-bend__shell {
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

          .zyco-bend__header,
          .zyco-bend-card,
          .zyco-bend__panel {
            border: 1px solid rgba(147, 197, 253, 0.2);
            border-radius: 28px;
            background:
              linear-gradient(145deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.05));
            box-shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
            backdrop-filter: blur(18px);
          }

          .zyco-bend__header {
            margin-bottom: 34px;
            padding: 34px;
          }

          .zyco-bend__eyebrow {
            margin: 0 0 14px;
            color: #93c5fd;
            font-size: 13px;
            font-weight: 800;
            letter-spacing: 2.4px;
            text-transform: uppercase;
          }

          .zyco-bend__title {
            margin: 0;
            color: #ffffff;
            font-size: 46px;
            line-height: 1.08;
            font-weight: 900;
            letter-spacing: 0;
            text-shadow: 0 0 28px rgba(96, 165, 250, 0.35);
          }

          .zyco-bend__subtitle {
            max-width: 760px;
            margin: 16px 0 0;
            color: #bfdbfe;
            font-size: 18px;
            line-height: 1.7;
            font-weight: 600;
          }

          .zyco-bend__grid {
            display: grid;
            grid-template-columns: minmax(300px, 0.9fr) minmax(0, 1.1fr);
            gap: 18px;
            align-items: stretch;
          }

          .zyco-bend-card,
          .zyco-bend__panel {
            box-sizing: border-box;
            padding: 24px;
            position: relative;
            overflow: hidden;
          }

          .zyco-bend-card {
            transition:
              transform 0.25s ease,
              border-color 0.25s ease,
              box-shadow 0.25s ease,
              background 0.25s ease;
          }

          .zyco-bend-card::before,
          .zyco-bend__panel::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, #38bdf8, #2563eb, transparent);
            opacity: 0.75;
          }

          .zyco-bend-card:hover {
            transform: translateY(-7px);
            border-color: rgba(147, 197, 253, 0.36);
            box-shadow: 0 22px 48px rgba(37, 99, 235, 0.26);
            background:
              radial-gradient(circle at top left, rgba(96, 165, 250, 0.3), transparent 45%),
              linear-gradient(145deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.07));
          }

          .zyco-bend-card__title,
          .zyco-bend__panel-title {
            margin: 0 0 20px;
            color: #ffffff;
            font-size: 22px;
            line-height: 1.25;
            font-weight: 850;
            letter-spacing: 0;
          }

          .zyco-bend-form {
            display: grid;
            gap: 16px;
          }

          .zyco-bend-field {
            display: grid;
            gap: 8px;
          }

          .zyco-bend-field__label {
            padding-left: 6px;
            color: #93c5fd;
            font-size: 12px;
            font-weight: 900;
            letter-spacing: 1.1px;
            text-transform: uppercase;
          }

          .zyco-bend-field__control {
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

          .zyco-bend-field__control:focus {
            transform: translateY(-2px);
            border-color: #3b82f6;
            box-shadow:
              0 0 0 4px rgba(59, 130, 246, 0.15),
              0 0 25px rgba(59, 130, 246, 0.15);
          }

          .zyco-bend-field__hint {
            margin: 0;
            color: #bfdbfe;
            font-size: 13px;
            line-height: 1.55;
            font-weight: 650;
          }

          .zyco-bend-radius-reference {
            display: grid;
            gap: 10px;
            padding: 14px;
            border: 1px solid rgba(147, 197, 253, 0.18);
            border-radius: 18px;
            background: rgba(15, 23, 42, 0.24);
          }

          .zyco-bend-radius-reference__value {
            margin: 0;
            color: #dbeafe;
            font-size: 14px;
            line-height: 1.6;
            font-weight: 750;
          }

          .zyco-bend-radius-reference__note {
            margin: 0;
            color: #bfdbfe;
            font-size: 13px;
            line-height: 1.6;
            font-weight: 650;
          }

          .zyco-bend-radius-reference__status {
            margin: 0;
            color: #facc15;
            font-size: 12px;
            line-height: 1.45;
            font-weight: 900;
            letter-spacing: 0.9px;
            text-transform: uppercase;
          }

          .zyco-bend-results {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 14px;
            margin: 0 0 22px;
          }

          .zyco-bend-result {
            padding: 20px;
            border: 1px solid rgba(191, 219, 254, 0.16);
            border-radius: 20px;
            background:
              radial-gradient(circle at top left, rgba(56, 189, 248, 0.18), transparent 48%),
              rgba(15, 23, 42, 0.28);
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
          }

          .zyco-bend-result__label {
            margin: 0 0 10px;
            color: #93c5fd;
            font-size: 12px;
            line-height: 1.35;
            font-weight: 900;
            letter-spacing: 0.7px;
            text-transform: uppercase;
          }

          .zyco-bend-result__value {
            margin: 0;
            color: #ffffff;
            font-size: 25px;
            line-height: 1.2;
            font-weight: 900;
            overflow-wrap: anywhere;
          }

          .zyco-bend__formula {
            display: grid;
            gap: 10px;
            margin: 0 0 24px;
            padding: 0;
            list-style: none;
          }

          .zyco-bend__formula-item {
            padding: 12px 14px;
            border: 1px solid rgba(147, 197, 253, 0.16);
            border-radius: 16px;
            background: rgba(15, 23, 42, 0.22);
            color: #dbeafe;
            font-size: 14px;
            line-height: 1.55;
            font-weight: 700;
          }

          .zyco-bend__actions,
          .zyco-bend__tools {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
          }

          .zyco-bend__tools .zyco-bend__action {
            border: 1px solid rgba(147, 197, 253, 0.38);
            border-radius: 14px;
            background: rgba(30, 64, 175, 0.32);
            color: #dbeafe;
            box-shadow: none;
            transition: all 0.25s ease;
          }

          .zyco-bend__tools .zyco-bend__action:hover {
            transform: translateY(-4px);
            border-color: rgba(125, 211, 252, 0.7);
            color: #ffffff;
            background: rgba(37, 99, 235, 0.4);
            box-shadow: 0 14px 30px rgba(56, 189, 248, 0.22), 0 7px 22px rgba(2, 8, 23, 0.22);
          }

          .zyco-bend__actions {
            margin-top: 24px;
          }

          .zyco-bend__action {
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

          button.zyco-bend__action {
            border: 0;
            cursor: pointer;
            font-family: inherit;
          }

          .zyco-bend__action:hover {
            transform: translateY(-2px);
            box-shadow: 0 18px 38px rgba(37, 99, 235, 0.42);
          }

          .zyco-bend__panel {
            margin-top: 22px;
          }

          .zyco-bend__text {
            max-width: 980px;
            margin: 0;
            color: #dbeafe;
            font-size: 15px;
            line-height: 1.75;
            font-weight: 650;
          }

          .zyco-bend__text + .zyco-bend__text {
            margin-top: 12px;
          }

          .zyco-bend__notes {
            display: grid;
            gap: 8px;
            margin: 0;
            padding: 0;
            list-style: none;
          }

          .zyco-bend__note {
            margin: 0;
            color: #dbeafe;
            font-size: 14px;
            line-height: 1.7;
            font-weight: 650;
          }

          .zyco-bend__faq {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }

          .zyco-bend__faq-item {
            padding: 18px;
            border: 1px solid rgba(147, 197, 253, 0.18);
            border-radius: 20px;
            background: rgba(15, 23, 42, 0.22);
          }

          .zyco-bend__question {
            margin: 0 0 8px;
            color: #ffffff;
            font-size: 15px;
            line-height: 1.45;
            font-weight: 850;
          }

          .zyco-bend__answer {
            margin: 0;
            color: #cbd5e1;
            font-size: 14px;
            line-height: 1.65;
            font-weight: 600;
          }

          @media (max-width: 980px) {
            .zyco-bend__grid,
            .zyco-bend-results {
              grid-template-columns: 1fr;
            }

            .zyco-bend__title {
              font-size: 38px;
            }
          }

          @media (max-width: 720px) {
            .zyco-bend__faq {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 640px) {
            .zyco-bend {
              padding: 28px 14px;
            }

            .zyco-bend__header,
            .zyco-bend-card,
            .zyco-bend__panel {
              padding: 22px;
              border-radius: 24px;
            }

            .zyco-tool-back-to-hub {
              width: 100%;
              margin-bottom: 16px;
              padding: 10px 14px;
              text-align: center;
            }

            .zyco-bend__title {
              font-size: 32px;
            }

            .zyco-bend__subtitle {
              font-size: 16px;
            }

            .zyco-bend__action {
              width: 100%;
            }
          }
        `}
      </style>

      <main className='zyco-bend'>
        <section className='zyco-bend__shell'>
          <header className='zyco-bend__header'>
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

            <p className='zyco-bend__eyebrow'>
              {t.common.engineeringCalculator}
            </p>

            <h1 className='zyco-bend__title'>
              {page.title}
            </h1>

            <p className='zyco-bend__subtitle'>
              {page.subtitle}
            </p>
          </header>

          <div className='zyco-bend__grid'>
            <article className='zyco-bend-card'>
              <h2 className='zyco-bend-card__title'>
                {t.common.inputParameters}
              </h2>

              <div className='zyco-bend-form'>
                <label className='zyco-bend-field'>
                  <span className='zyco-bend-field__label'>
                    {t.common.material}
                  </span>

                  <select
                    className='zyco-bend-field__control'
                    value={materialKey}
                    onChange={handleMaterialChange}
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

                <label className='zyco-bend-field'>
                  <span className='zyco-bend-field__label'>
                    {t.common.thickness}
                  </span>

                  <input
                    className='zyco-bend-field__control'
                    min='0'
                    step='0.1'
                    type='number'
                    value={thickness}
                    onChange={(event) => setThickness(event.target.value)}
                  />
                </label>

                <label className='zyco-bend-field'>
                  <span className='zyco-bend-field__label'>
                    {t.common.insideRadius}
                  </span>

                  <input
                    className='zyco-bend-field__control'
                    min='0'
                    step='0.1'
                    type='number'
                    value={insideRadius}
                    onChange={handleInsideRadiusChange}
                  />
                </label>

                <div className='zyco-bend-radius-reference'>
                  <p className='zyco-bend-radius-reference__value'>
                    {t.common.autoEstimatedInsideRadius}:{' '}
                    {autoEstimatedInsideRadius === null
                      ? '--'
                      : formatAutoInsideRadius(autoEstimatedInsideRadius)}
                  </p>

                  <p className='zyco-bend-radius-reference__note'>
                    {t.common.autoEstimatedInsideRadiusNote}
                  </p>

                  {isManualRadiusOverride && (
                    <p className='zyco-bend-radius-reference__status'>
                      {t.common.manualRadiusOverrideActive}
                    </p>
                  )}

                  <button
                    className='zyco-bend__action'
                    type='button'
                    onClick={useAutoEstimatedRadius}
                  >
                    {t.common.useAutoEstimatedRadius}
                  </button>
                </div>

                <label className='zyco-bend-field'>
                  <span className='zyco-bend-field__label'>
                    {t.common.bendAngle}
                  </span>

                  <input
                    className='zyco-bend-field__control'
                    min='0'
                    step='0.1'
                    type='number'
                    value={bendAngle}
                    onChange={(event) => setBendAngle(event.target.value)}
                  />
                </label>

                <label className='zyco-bend-field'>
                  <span className='zyco-bend-field__label'>
                    {t.common.kFactor}
                  </span>

                  <input
                    className='zyco-bend-field__control'
                    min='0'
                    step='0.01'
                    type='number'
                    value={kFactor}
                    onChange={(event) => setKFactor(event.target.value)}
                  />
                </label>

                <p className='zyco-bend-field__hint'>
                  {t.common.recommendedKFactorFor}{' '}
                  {t.materialNames[selectedMaterial.materialKey]}:{' '}
                  {selectedMaterial.recommendedKFactor.toFixed(2)}
                </p>
              </div>
            </article>

            <article className='zyco-bend-card'>
              <h2 className='zyco-bend-card__title'>
                {t.common.calculationOutput}
              </h2>

              <dl className='zyco-bend-results'>
                {outputRows.map(([label, value]) => (
                  <div
                    className='zyco-bend-result'
                    key={label}
                  >
                    <dt className='zyco-bend-result__label'>
                      {label}
                    </dt>

                    <dd className='zyco-bend-result__value'>
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <h3 className='zyco-bend-card__title'>
                {page.formulaReference}
              </h3>

              <p className='zyco-bend__text'>
                {page.formulaIntro}
              </p>

              <ul className='zyco-bend__formula'>
                <li className='zyco-bend__formula-item'>
                  BA = A × π / 180 × (R + K × T)
                </li>

                <li className='zyco-bend__formula-item'>
                  {page.formulaWhere}
                </li>

                <li className='zyco-bend__formula-item'>
                  {page.formulaOutsideSetback}
                </li>

                <li className='zyco-bend__formula-item'>
                  {page.formulaBendDeduction}
                </li>
              </ul>

              <p className='zyco-bend__text'>
                {page.formulaNote}
              </p>

              <div className='zyco-bend__actions'>
                <a
                  className='zyco-bend__action'
                  href='/engineering-tools/v-die-selection'
                >
                  {t.common.useEstimatedRadiusFromVDieTool} {'\u2192'}
                </a>

                <a
                  className='zyco-bend__action'
                  href={`/engineering-tools/press-brake-calculator?material=${materialKey}`}
                >
                  {t.common.calculateBendingForce} {'\u2192'}
                </a>
              </div>
            </article>
          </div>

          <section
            className='zyco-bend__panel'
            aria-labelledby='bend-allowance-engineering-overview'
          >
            <h2
              className='zyco-bend__panel-title'
              id='bend-allowance-engineering-overview'
            >
              {t.common.engineeringOverview}
            </h2>

            <p className='zyco-bend__text'>
              {page.overview}
            </p>

            <p className='zyco-bend__text'>
              {page.overview2}
            </p>
          </section>

          <section
            className='zyco-bend__panel'
            aria-labelledby='bend-allowance-reference-notes'
          >
            <h2
              className='zyco-bend__panel-title'
              id='bend-allowance-reference-notes'
            >
              {t.common.engineeringReferenceNotes}
            </h2>

            <ul className='zyco-bend__notes'>
              {page.notes.map((note) => (
                <li
                  className='zyco-bend__note'
                  key={note}
                >
                  {note}
                </li>
              ))}
            </ul>
          </section>

          <section
            className='zyco-bend__panel'
            aria-labelledby='bend-allowance-faq'
          >
            <h2
              className='zyco-bend__panel-title'
              id='bend-allowance-faq'
            >
              {page.faqTitle}
            </h2>

            <div className='zyco-bend__faq'>
              {page.faq.map(([question, answer]) => (
                <article
                  className='zyco-bend__faq-item'
                  key={question}
                >
                  <h3 className='zyco-bend__question'>
                    {question}
                  </h3>

                  <p className='zyco-bend__answer'>
                    {answer}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section
            className='zyco-bend__panel'
            aria-labelledby='bend-allowance-related-tools'
          >
            <h2
              className='zyco-bend__panel-title'
              id='bend-allowance-related-tools'
            >
              {t.common.relatedEngineeringTools}
            </h2>

            <nav
              className='zyco-bend__tools'
              aria-label={t.common.relatedToolsAria}
            >
              {relatedTools.map((tool) => (
                <a
                  className='zyco-bend__action'
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
