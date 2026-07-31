import { useEffect, useMemo, useState } from 'react'
import EngineeringCTA from '../components/EngineeringCTA.jsx'
import LanguageSwitcher from '../components/LanguageSwitcher.jsx'
import { engineeringTools } from '../data/engineeringTools.js'
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

const backToEngineeringToolsLabels = {
  en: '← Back to Engineering Tools',
  zh: '← 返回工程工具中心',
  ru: '← Назад к инженерным инструментам',
  es: '← Volver a herramientas de ingeniería',
  tr: '← Mühendislik araçlarına dön',
  id: '← Kembali ke Engineering Tools',
}

const capacityCalculatorLinkContent = {
  en: {
    title: 'Can Your Existing Press Brake Make This Part?',
    description:
      'After calculating the flat pattern, use the Press Brake Capacity Calculator to check whether the sheet thickness, bend length and required V-die opening are within the capacity of your existing machine.',
    button: 'Check Press Brake Capacity →',
  },
  zh: {
    title: '现有折弯机能否加工该零件？',
    description:
      '完成板材展开计算后，使用折弯机能力计算器，根据现有机器吨位检查板厚、折弯长度和所需 V 型模开口是否在设备能力范围内。',
    button: '检查折弯机能力 →',
  },
  ru: {
    title: 'Сможет ли ваш листогибочный пресс изготовить эту деталь?',
    description:
      'После расчета развертки используйте калькулятор возможностей листогибочного пресса, чтобы проверить, соответствуют ли толщина листа, длина гиба и требуемое раскрытие V-матрицы возможностям имеющегося станка.',
    button: 'Проверить возможности пресса →',
  },
  es: {
    title: '¿Puede su plegadora actual fabricar esta pieza?',
    description:
      'Después de calcular el desarrollo de la chapa, use la calculadora de capacidad de plegadora para comprobar si el espesor, la longitud de plegado y la abertura V necesaria están dentro de la capacidad de su máquina.',
    button: 'Comprobar la capacidad →',
  },
  tr: {
    title: 'Mevcut abkant presiniz bu parçayı üretebilir mi?',
    description:
      'Sac açınımını hesapladıktan sonra, sac kalınlığının, büküm uzunluğunun ve gerekli V kalıp açıklığının mevcut makinenizin kapasitesi içinde olup olmadığını kontrol etmek için abkant pres kapasite hesaplayıcısını kullanın.',
    button: 'Abkant kapasitesini kontrol et →',
  },
  id: {
    title: 'Apakah press brake Anda dapat membuat benda kerja ini?',
    description:
      'Setelah menghitung panjang bentangan, gunakan kalkulator kapasitas press brake untuk memeriksa apakah ketebalan pelat, panjang tekuk, dan bukaan V-die yang diperlukan masih berada dalam kapasitas mesin yang tersedia.',
    button: 'Periksa kapasitas press brake →',
  },
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
  const capacityLink =
    capacityCalculatorLinkContent[language] ||
    capacityCalculatorLinkContent.en
  const backToEngineeringToolsLabel =
    backToEngineeringToolsLabels[language] ||
    backToEngineeringToolsLabels.en
  const [materialKey, setMaterialKey] = useState('mildSteel')
  const [thickness, setThickness] = useState('2')
  const [insideRadius, setInsideRadius] = useState('2.6')
  const [bendAngle, setBendAngle] = useState('90')
  const [kFactor, setKFactor] = useState('0.33')
  const [dimensionType, setDimensionType] = useState('straightFlange')
  const [flangeA, setFlangeA] = useState('50')
  const [flangeB, setFlangeB] = useState('50')
  const [isManualRadiusOverride, setIsManualRadiusOverride] =
    useState(false)

  useEffect(() => {
    const englishPage = getEngineeringText('en').pages.bend
    const seoDescription =
      'Calculate bend allowance, bend deduction and flat pattern length from thickness, inside radius, bend angle and K-factor, with bend allowance chart guidance.'

    setPageSEO({
      title: 'Bend Allowance Calculator & Chart for Flat Patterns | ZYCO',
      description: seoDescription,
      keywords:
        'bend allowance calculator, bend allowance chart, bending allowance chart, bend allowance, bend deduction calculator, K factor calculator, flat pattern calculator, sheet metal development, outside setback',
      canonicalPath: '/engineering-tools/bend-allowance-calculator',
    })

    setStructuredData({
      id: 'bend-allowance-calculator-jsonld',
      data: {
        '@context': 'https://schema.org',
        '@graph': [
          createWebApplicationStructuredData({
            name: 'Bend Allowance Calculator',
            description: seoDescription,
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
    const flangeAValue = Number(flangeA)
    const flangeBValue = Number(flangeB)

    const hasValidInputs = [
      thicknessValue,
      insideRadiusValue,
      bendAngleValue,
      kFactorValue,
      flangeAValue,
      flangeBValue,
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
    const flatPatternLength =
      dimensionType === 'outsideDimensions'
        ? flangeAValue + flangeBValue - bendDeduction
        : flangeAValue + flangeBValue + bendAllowance

    return {
      flatPatternLength,
      bendAllowance,
      outsideSetback,
      bendDeduction,
    }
  }, [
    bendAngle,
    dimensionType,
    flangeA,
    flangeB,
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
      page.output.flatPatternLength,
      result ? formatMillimeters(result.flatPatternLength) : '--',
      true,
    ],
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

          .zyco-bend-method {
            display: grid;
            gap: 10px;
            margin: 0 0 18px;
          }

          .zyco-bend-method__title {
            margin: 0;
            padding-left: 6px;
            color: #93c5fd;
            font-size: 12px;
            font-weight: 900;
            letter-spacing: 1.1px;
            text-transform: uppercase;
          }

          .zyco-bend-method__cards {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }

          .zyco-bend-method__card {
            display: grid;
            gap: 8px;
            width: 100%;
            padding: 16px 18px;
            border: 1px solid rgba(148, 163, 184, 0.22);
            border-radius: 20px;
            background:
              radial-gradient(circle at top left, rgba(37, 99, 235, 0.18), transparent 50%),
              rgba(15, 23, 42, 0.3);
            color: #e2e8f0;
            text-align: left;
            cursor: pointer;
            white-space: normal;
            overflow-wrap: anywhere;
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
            transition:
              transform 0.2s ease,
              border-color 0.2s ease,
              box-shadow 0.2s ease,
              background 0.2s ease;
          }

          .zyco-bend-method__card:hover {
            transform: translateY(-2px);
            border-color: rgba(125, 211, 252, 0.42);
            box-shadow: 0 14px 30px rgba(15, 23, 42, 0.22);
          }

          .zyco-bend-method__card:focus-visible {
            outline: none;
            border-color: #7dd3fc;
            box-shadow:
              0 0 0 4px rgba(59, 130, 246, 0.16),
              0 14px 30px rgba(15, 23, 42, 0.22);
          }

          .zyco-bend-method__card--active {
            border-color: rgba(125, 211, 252, 0.56);
            background:
              radial-gradient(circle at top left, rgba(56, 189, 248, 0.28), transparent 52%),
              rgba(30, 64, 175, 0.28);
            box-shadow:
              0 18px 34px rgba(37, 99, 235, 0.22),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
          }

          .zyco-bend-method__card-title {
            color: #ffffff;
            font-size: 15px;
            line-height: 1.45;
            font-weight: 850;
          }

          .zyco-bend-method__card-formula {
            color: #7dd3fc;
            font-size: 15px;
            line-height: 1.4;
            font-weight: 900;
            letter-spacing: 0.2px;
          }

          .zyco-bend-method__card-description {
            color: #cbd5e1;
            font-size: 13px;
            line-height: 1.6;
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

          .zyco-bend-result--primary {
            grid-column: 1 / -1;
            border-color: rgba(125, 211, 252, 0.42);
            background:
              radial-gradient(circle at top left, rgba(56, 189, 248, 0.32), transparent 52%),
              rgba(15, 23, 42, 0.38);
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

          .zyco-bend-diagram {
            margin: 0 0 24px;
            padding: 18px;
            border: 1px solid rgba(125, 211, 252, 0.28);
            border-radius: 20px;
            background:
              linear-gradient(145deg, rgba(15, 23, 42, 0.42), rgba(30, 64, 175, 0.2));
          }

          .zyco-bend-diagram__heading {
            margin: 0 0 6px;
            color: #ffffff;
            font-size: 18px;
            line-height: 1.35;
            font-weight: 850;
          }

          .zyco-bend-diagram__mode {
            margin: 0 0 12px;
            color: #7dd3fc;
            font-size: 13px;
            line-height: 1.45;
            font-weight: 800;
          }

          .zyco-bend-diagram__svg {
            display: block;
            width: 100%;
            height: auto;
          }

          .zyco-bend-diagram__views {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }

          .zyco-bend-diagram__view {
            min-width: 0;
            padding: 12px;
            border: 1px solid rgba(147, 197, 253, 0.18);
            border-radius: 16px;
            background: rgba(15, 23, 42, 0.28);
          }

          .zyco-bend-diagram__view-title {
            margin: 0 0 8px;
            color: #bfdbfe;
            font-size: 12px;
            line-height: 1.4;
            font-weight: 900;
            letter-spacing: 0.5px;
            text-transform: uppercase;
          }

          .zyco-bend-diagram__calculation {
            display: grid;
            align-content: center;
            min-height: 210px;
            gap: 18px;
            padding: 4px 0;
          }

          .zyco-bend-diagram__flow {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 1fr);
            gap: 5px;
            align-items: stretch;
          }

          .zyco-bend-diagram__step {
            display: grid;
            align-content: center;
            gap: 5px;
            min-width: 0;
            min-height: 92px;
            padding: 8px 5px;
            border: 1px solid rgba(125, 211, 252, 0.34);
            border-radius: 12px;
            background: rgba(30, 64, 175, 0.28);
            text-align: center;
          }

          .zyco-bend-diagram__step--correction {
            border: 2px dashed #facc15;
            background: rgba(250, 204, 21, 0.08);
          }

          .zyco-bend-diagram__step-value {
            color: #ffffff;
            font-size: 17px;
            line-height: 1.2;
            font-weight: 900;
          }

          .zyco-bend-diagram__step--correction .zyco-bend-diagram__step-value {
            color: #facc15;
          }

          .zyco-bend-diagram__step-label {
            color: #bfdbfe;
            font-size: 9px;
            line-height: 1.35;
            font-weight: 750;
            overflow-wrap: anywhere;
          }

          .zyco-bend-diagram__flow-arrow {
            align-self: center;
            color: #7dd3fc;
            font-size: 16px;
            font-weight: 900;
          }

          .zyco-bend-diagram__equation-line {
            color: #ffffff;
            font-size: 19px;
            line-height: 1.2;
            font-weight: 900;
            text-align: center;
            white-space: nowrap;
          }

          .zyco-bend-diagram__note {
            margin: 10px 0 0;
            color: #dbeafe;
            font-size: 13px;
            line-height: 1.6;
            font-weight: 650;
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

          .bend-allowance-capacity-link {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 22px;
            margin-top: 22px;
            padding: 22px 24px;
            border: 1px solid rgba(147, 197, 253, 0.24);
            border-radius: 24px;
            background:
              linear-gradient(145deg, rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.05));
            box-shadow: 0 18px 48px rgba(0, 0, 0, 0.24);
            backdrop-filter: blur(16px);
          }

          .bend-allowance-capacity-link__copy {
            min-width: 0;
            color: #ffffff;
            overflow-wrap: anywhere;
          }

          .bend-allowance-capacity-link__button {
            flex: 0 0 auto;
            min-height: 46px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            padding: 0 18px;
            border: 1px solid rgba(147, 197, 253, 0.4);
            border-radius: 16px;
            background:
              linear-gradient(135deg, #1e3a8a, #2563eb 55%, #60a5fa);
            color: #ffffff;
            font-size: 14px;
            line-height: 1.35;
            font-weight: 850;
            text-align: center;
            text-decoration: none;
            transition: all 0.25s ease;
          }

          .bend-allowance-capacity-link__button:hover {
            transform: translateY(-3px);
            border-color: rgba(125, 211, 252, 0.78);
            background:
              linear-gradient(135deg, #1e40af, #2563eb 50%, #7dd3fc);
            box-shadow: 0 16px 34px rgba(37, 99, 235, 0.34);
          }

          .bend-allowance-capacity-link__button:focus-visible {
            outline: 3px solid rgba(125, 211, 252, 0.72);
            outline-offset: 3px;
          }

          @media (max-width: 980px) {
            .zyco-bend__grid,
            .zyco-bend-results {
              grid-template-columns: 1fr;
            }

            .bend-allowance-capacity-link {
              align-items: stretch;
              flex-direction: column;
            }

            .bend-allowance-capacity-link__button {
              width: 100%;
            }

            .zyco-bend__title {
              font-size: 38px;
            }
          }

          @media (max-width: 720px) {
            .zyco-bend__faq,
            .zyco-bend-method__cards,
            .zyco-bend-diagram__views {
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
              <section
                aria-labelledby='bend-measurement-method'
                className='zyco-bend-method'
              >
                <h2
                  className='zyco-bend-method__title'
                  id='bend-measurement-method'
                >
                  {page.measurementMethodTitle}
                </h2>

                <div className='zyco-bend-method__cards'>
                  <button
                    aria-pressed={dimensionType === 'straightFlange'}
                    className={`zyco-bend-method__card${
                      dimensionType === 'straightFlange'
                        ? ' zyco-bend-method__card--active'
                        : ''
                    }`}
                    type='button'
                    onClick={() => setDimensionType('straightFlange')}
                  >
                    <span className='zyco-bend-method__card-title'>
                      {page.measurementStraightTitle}
                    </span>
                    <span className='zyco-bend-method__card-formula'>
                      {page.measurementStraightFormula}
                    </span>
                    <span className='zyco-bend-method__card-description'>
                      {page.measurementStraightDescription}
                    </span>
                  </button>

                  <button
                    aria-pressed={dimensionType === 'outsideDimensions'}
                    className={`zyco-bend-method__card${
                      dimensionType === 'outsideDimensions'
                        ? ' zyco-bend-method__card--active'
                        : ''
                    }`}
                    type='button'
                    onClick={() => setDimensionType('outsideDimensions')}
                  >
                    <span className='zyco-bend-method__card-title'>
                      {page.measurementOutsideTitle}
                    </span>
                    <span className='zyco-bend-method__card-formula'>
                      {page.measurementOutsideFormula}
                    </span>
                    <span className='zyco-bend-method__card-description'>
                      {page.measurementOutsideDescription}
                    </span>
                  </button>
                </div>
              </section>

              <figure className='zyco-bend-diagram'>
                <figcaption>
                  <h2 className='zyco-bend-diagram__heading'>
                    {page.dimensionMethodDiagram}
                  </h2>
                  <p className='zyco-bend-diagram__mode'>
                    {dimensionType === 'straightFlange'
                      ? page.straightFlangeDiagramTitle
                      : page.outsideDimensionsDiagramTitle}
                  </p>
                </figcaption>

                {dimensionType === 'straightFlange' ? (
                  <div className='zyco-bend-diagram__views'>
                    <div className='zyco-bend-diagram__view'>
                      <p className='zyco-bend-diagram__view-title'>{page.bentPartView}</p>
                      <svg aria-label={page.bentPartView} className='zyco-bend-diagram__svg' role='img' viewBox='0 0 300 220'>
                        <defs>
                          <marker id='bend-arrow-tangent' markerHeight='7' markerWidth='7' orient='auto-start-reverse' refX='3.5' refY='3.5'>
                            <path d='M0,0 L7,3.5 L0,7 Z' fill='#7dd3fc' />
                          </marker>
                        </defs>
                        <path d='M92 28 V150 Q92 174 116 174 H270' fill='none' stroke='#3b82f6' strokeLinecap='round' strokeWidth='24' />
                        <path d='M92 28 V150 Q92 174 116 174 H270' fill='none' stroke='#bfdbfe' strokeLinecap='round' strokeWidth='2' />
                        <line x1='53' x2='53' y1='28' y2='150' stroke='#7dd3fc' markerStart='url(#bend-arrow-tangent)' markerEnd='url(#bend-arrow-tangent)' />
                        <line x1='65' x2='102' y1='28' y2='28' stroke='#7dd3fc' strokeDasharray='4 4' />
                        <line x1='65' x2='102' y1='150' y2='150' stroke='#7dd3fc' strokeDasharray='4 4' />
                        <text x='34' y='94' fill='#ffffff' fontSize='18' fontWeight='900' textAnchor='middle'>A</text>
                        <line x1='116' x2='270' y1='204' y2='204' stroke='#7dd3fc' markerStart='url(#bend-arrow-tangent)' markerEnd='url(#bend-arrow-tangent)' />
                        <line x1='116' x2='116' y1='184' y2='212' stroke='#7dd3fc' strokeDasharray='4 4' />
                        <line x1='270' x2='270' y1='184' y2='212' stroke='#7dd3fc' strokeDasharray='4 4' />
                        <text x='193' y='199' fill='#ffffff' fontSize='18' fontWeight='900' textAnchor='middle'>B</text>
                        <circle cx='104' cy='162' r='25' fill='#0f172a' stroke='#facc15' strokeDasharray='5 4' strokeWidth='2' />
                        <text x='142' y='126' fill='#facc15' fontSize='12' fontWeight='800'>{page.bendArea}</text>
                        <line x1='137' x2='119' y1='130' y2='146' stroke='#facc15' />
                      </svg>
                    </div>

                    <div className='zyco-bend-diagram__view'>
                      <p className='zyco-bend-diagram__view-title'>{page.flatPatternView}</p>
                      <svg aria-label={page.flatPatternView} className='zyco-bend-diagram__svg' role='img' viewBox='0 0 300 220'>
                        <defs>
                          <marker id='bend-arrow-flat' markerHeight='7' markerWidth='7' orient='auto-start-reverse' refX='3.5' refY='3.5'>
                            <path d='M0,0 L7,3.5 L0,7 Z' fill='#7dd3fc' />
                          </marker>
                        </defs>
                        <rect x='18' y='72' width='108' height='48' rx='4' fill='#2563eb' stroke='#93c5fd' />
                        <rect x='126' y='72' width='48' height='48' fill='#0f172a' stroke='#facc15' strokeDasharray='6 4' strokeWidth='2' />
                        <rect x='174' y='72' width='108' height='48' rx='4' fill='#2563eb' stroke='#93c5fd' />
                        <text x='72' y='102' fill='#ffffff' fontSize='18' fontWeight='900' textAnchor='middle'>A</text>
                        <text x='150' y='102' fill='#facc15' fontSize='15' fontWeight='900' textAnchor='middle'>BA</text>
                        <text x='228' y='102' fill='#ffffff' fontSize='18' fontWeight='900' textAnchor='middle'>B</text>
                        <line x1='18' x2='282' y1='155' y2='155' stroke='#7dd3fc' strokeWidth='2' markerStart='url(#bend-arrow-flat)' markerEnd='url(#bend-arrow-flat)' />
                        <text x='150' y='187' fill='#dbeafe' fontSize='18' fontWeight='900' textAnchor='middle'>L = A + B + BA</text>
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div className='zyco-bend-diagram__views'>
                    <div className='zyco-bend-diagram__view'>
                      <p className='zyco-bend-diagram__view-title'>{page.outsideDimensionView}</p>
                      <svg aria-label={page.outsideDimensionView} className='zyco-bend-diagram__svg' role='img' viewBox='0 0 300 220'>
                        <defs>
                          <marker id='bend-arrow-outside' markerHeight='7' markerWidth='7' orient='auto-start-reverse' refX='3.5' refY='3.5'>
                            <path d='M0,0 L7,3.5 L0,7 Z' fill='#7dd3fc' />
                          </marker>
                        </defs>
                        <path d='M105 25 V154 H270' fill='none' stroke='#3b82f6' strokeLinecap='round' strokeLinejoin='round' strokeWidth='24' />
                        <path d='M105 25 V154 H270' fill='none' stroke='#bfdbfe' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' />
                        <line x1='50' x2='50' y1='25' y2='166' stroke='#7dd3fc' markerStart='url(#bend-arrow-outside)' markerEnd='url(#bend-arrow-outside)' />
                        <line x1='62' x2='105' y1='25' y2='25' stroke='#7dd3fc' strokeDasharray='4 4' />
                        <line x1='62' x2='105' y1='166' y2='166' stroke='#7dd3fc' strokeDasharray='4 4' />
                        <text x='31' y='101' fill='#ffffff' fontSize='18' fontWeight='900' textAnchor='middle'>A</text>
                        <line x1='93' x2='270' y1='202' y2='202' stroke='#7dd3fc' markerStart='url(#bend-arrow-outside)' markerEnd='url(#bend-arrow-outside)' />
                        <line x1='93' x2='93' y1='174' y2='210' stroke='#7dd3fc' strokeDasharray='4 4' />
                        <line x1='270' x2='270' y1='174' y2='210' stroke='#7dd3fc' strokeDasharray='4 4' />
                        <text x='181' y='197' fill='#ffffff' fontSize='18' fontWeight='900' textAnchor='middle'>B</text>
                      </svg>
                    </div>

                    <div className='zyco-bend-diagram__view'>
                      <p className='zyco-bend-diagram__view-title'>{page.calculationView}</p>
                      <div className='zyco-bend-diagram__calculation'>
                        <div className='zyco-bend-diagram__flow'>
                          <div className='zyco-bend-diagram__step'>
                            <span className='zyco-bend-diagram__step-value'>A + B</span>
                            <span className='zyco-bend-diagram__step-label'>{page.outsideDimensionsSum}</span>
                          </div>
                          <span aria-hidden='true' className='zyco-bend-diagram__flow-arrow'>→</span>
                          <div className='zyco-bend-diagram__step zyco-bend-diagram__step--correction'>
                            <span className='zyco-bend-diagram__step-value'>− BD</span>
                            <span className='zyco-bend-diagram__step-label'>{page.bdCorrection}</span>
                          </div>
                          <span aria-hidden='true' className='zyco-bend-diagram__flow-arrow'>→</span>
                          <div className='zyco-bend-diagram__step'>
                            <span className='zyco-bend-diagram__step-value'>L</span>
                            <span className='zyco-bend-diagram__step-label'>{page.flatPatternLengthShort}</span>
                          </div>
                        </div>
                        <div className='zyco-bend-diagram__equation-line'>L = A + B − BD</div>
                      </div>
                    </div>
                  </div>
                )}

                <p className='zyco-bend-diagram__note'>
                  {dimensionType === 'straightFlange'
                    ? page.straightFlangeDiagramNote
                    : page.outsideDimensionsDiagramNote}
                </p>
              </figure>

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

                <label className='zyco-bend-field'>
                  <span className='zyco-bend-field__label'>
                    {page.flangeA}
                  </span>

                  <input
                    className='zyco-bend-field__control'
                    min='0'
                    step='0.1'
                    type='number'
                    value={flangeA}
                    onChange={(event) => setFlangeA(event.target.value)}
                  />
                </label>

                <label className='zyco-bend-field'>
                  <span className='zyco-bend-field__label'>
                    {page.flangeB}
                  </span>

                  <input
                    className='zyco-bend-field__control'
                    min='0'
                    step='0.1'
                    type='number'
                    value={flangeB}
                    onChange={(event) => setFlangeB(event.target.value)}
                  />
                </label>
              </div>
            </article>

            <article className='zyco-bend-card'>
              <h2 className='zyco-bend-card__title'>
                {t.common.calculationOutput}
              </h2>

              <dl className='zyco-bend-results'>
                {outputRows.map(([label, value, isPrimary]) => (
                  <div
                    className={`zyco-bend-result${isPrimary ? ' zyco-bend-result--primary' : ''}`}
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
                  BA = θ × π / 180 × (R + K × T)
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

                <li className='zyco-bend__formula-item'>
                  {page.formulaStraightFlange}
                </li>

                <li className='zyco-bend__formula-item'>
                  {page.formulaOutsideDimensions}
                </li>

                <li className='zyco-bend__formula-item'>
                  {page.formulaFlatPatternWhere}
                </li>
              </ul>

              <p className='zyco-bend__text'>
                {page.formulaNote}
              </p>

              <div className='zyco-bend__actions'>
                <a
                  className='zyco-bend__action'
                  href='/engineering-tools/v-die-selection-tool'
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

          <section className='bend-allowance-capacity-link'>
            <div className='bend-allowance-capacity-link__copy'>
              <h2
                style={{
                  margin: '0 0 8px',
                  fontSize: '21px',
                  lineHeight: 1.35,
                  fontWeight: 850,
                }}
              >
                {capacityLink.title}
              </h2>
              <p
                style={{
                  margin: 0,
                  color: '#cbd5e1',
                  fontSize: '15px',
                  lineHeight: 1.68,
                  fontWeight: 600,
                }}
              >
                {capacityLink.description}
              </p>
            </div>

            <a
              className='bend-allowance-capacity-link__button'
              href='/engineering-tools/press-brake-capacity-calculator'
            >
              {capacityLink.button}
            </a>
          </section>

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

          <EngineeringCTA language={language} />

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
              {engineeringTools.map((tool) => (
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
