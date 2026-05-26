import {
  useState,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import CountUp from 'react-countup'
import { calculatorLanguageMap } from '../languages/engineeringText.js'
import {
  createWebApplicationStructuredData,
  setPageSEO,
  setStructuredData,
} from '../utils/seo.js'

const validMaterialKeys = [
  'mildSteel',
  'galvanizedSteel',
  'stainless201',
  'stainless304',
  'aluminum',
  'brass',
]

const relatedEngineeringTools = [
  {
    labelKey: 'pressBrakeCalculator',
    href: '/engineering-tools/press-brake-calculator',
  },
  {
    labelKey: 'materialDatabase',
    href: '/engineering-tools/material-database',
  },
  {
    labelKey: 'vDieSelectionTool',
    href: '/engineering-tools/v-die-selection',
  },
  {
    labelKey: 'insideRadiusGuide',
    href: '/engineering-tools/inside-radius-guide',
  },
  {
    labelKey: 'springbackDatabase',
    href: '/engineering-tools/springback-database',
  },
  {
    labelKey: 'springbackCompensationGuide',
    href: '/springback-compensation-guide',
  },
  {
    labelKey: 'bendAllowanceCalculator',
    href: '/engineering-tools/bend-allowance-calculator',
  },
  {
    labelKey: 'kFactorGuide',
    href: '/engineering/k-factor-guide',
  },
  {
    labelKey: 'bendDeductionGuide',
    href: '/engineering/bend-deduction-guide',
  },
  {
    labelKey: 'airBendingGuide',
    href: '/engineering-tools/air-bending-guide',
  },
  {
    labelKey: 'bottomingVsCoiningGuide',
    href: '/engineering-tools/bottoming-vs-coining-guide',
  },
  {
    labelKey: 'pressBrakeTonnageGuide',
    href: '/engineering/press-brake-tonnage-guide',
  },
  {
    labelKey: 'vDieOpeningGuide',
    href: '/engineering/how-to-choose-press-brake-v-die-opening',
  },
  {
    labelKey: 'minimumFlangeLengthGuide',
    href: '/engineering/minimum-flange-length-guide',
  },
  {
    labelKey: 'toolingSelectionGuide',
    href: '/engineering/press-brake-tooling-selection-guide',
  },
  {
    labelKey: 'crowningGuide',
    href: '/engineering/press-brake-crowning-guide',
  },
  {
    labelKey: 'stainlessSteelBendingGuide',
    href: '/engineering/stainless-steel-bending-guide',
  },
  {
    labelKey: 'aluminumBendingGuide',
    href: '/engineering/aluminum-bending-guide',
  },
]

const relatedToolFallbackLabels = {
  en: {
    airBendingGuide: 'Air Bending Guide',
  },
  zh: {
    airBendingGuide: '空气折弯指南',
  },
  ru: {
    airBendingGuide: 'Руководство по Air Bending',
  },
  es: {
    airBendingGuide: 'Guía de Air Bending',
  },
  tr: {
    airBendingGuide: 'Air Bending kılavuzu',
  },
  id: {
    airBendingGuide: 'Panduan Air Bending',
  },
}

relatedToolFallbackLabels.en.bottomingVsCoiningGuide = 'Bottoming vs Coining Guide'
relatedToolFallbackLabels.zh.bottomingVsCoiningGuide = '压底折弯与压印折弯指南'
relatedToolFallbackLabels.ru.bottomingVsCoiningGuide = 'Bottoming и Coining: руководство'
relatedToolFallbackLabels.es.bottomingVsCoiningGuide = 'Guía de Bottoming y Coining'
relatedToolFallbackLabels.tr.bottomingVsCoiningGuide = 'Bottoming ve Coining Kılavuzu'
relatedToolFallbackLabels.id.bottomingVsCoiningGuide = 'Panduan Bottoming vs Coining'

relatedToolFallbackLabels.en.springbackCompensationGuide = 'Springback Compensation Guide'
relatedToolFallbackLabels.zh.springbackCompensationGuide = '回弹补偿指南'
relatedToolFallbackLabels.ru.springbackCompensationGuide =
  'Руководство по компенсации пружинения'
relatedToolFallbackLabels.es.springbackCompensationGuide =
  'Guía de compensación de recuperación elástica'
relatedToolFallbackLabels.tr.springbackCompensationGuide =
  'Geri Esneme Kompanzasyonu Kılavuzu'
relatedToolFallbackLabels.id.springbackCompensationGuide =
  'Panduan Kompensasi Springback'

relatedToolFallbackLabels.en.pressBrakeTonnageGuide = 'Press Brake Tonnage Guide'
relatedToolFallbackLabels.zh.pressBrakeTonnageGuide = '折弯机吨位指南'
relatedToolFallbackLabels.ru.pressBrakeTonnageGuide =
  'Руководство по тоннажу листогибочного пресса'
relatedToolFallbackLabels.es.pressBrakeTonnageGuide =
  'Guía de tonelaje para plegadoras'
relatedToolFallbackLabels.tr.pressBrakeTonnageGuide = 'Abkant Pres Tonaj Kılavuzu'
relatedToolFallbackLabels.id.pressBrakeTonnageGuide = 'Panduan Tonase Press Brake'
relatedToolFallbackLabels.en.vDieOpeningGuide =
  'How to Choose Press Brake V-Die Opening'
relatedToolFallbackLabels.zh.vDieOpeningGuide = '如何选择折弯机 V 型模开口'
relatedToolFallbackLabels.ru.vDieOpeningGuide =
  'Как выбрать раскрытие V-матрицы листогибочного пресса'
relatedToolFallbackLabels.es.vDieOpeningGuide =
  'Cómo elegir la abertura de matriz V para una plegadora'
relatedToolFallbackLabels.tr.vDieOpeningGuide =
  'Abkant Pres İçin V Kalıp Açıklığı Nasıl Seçilir'
relatedToolFallbackLabels.id.vDieOpeningGuide =
  'Cara Memilih Bukaan Cetakan V Press Brake'
relatedToolFallbackLabels.en.toolingSelectionGuide =
  'Press Brake Tooling Selection Guide'
relatedToolFallbackLabels.zh.toolingSelectionGuide = '折弯机模具选型指南'
relatedToolFallbackLabels.ru.toolingSelectionGuide =
  'Руководство по выбору оснастки листогибочного пресса'
relatedToolFallbackLabels.es.toolingSelectionGuide =
  'Guía de selección de utillaje para plegadora'
relatedToolFallbackLabels.tr.toolingSelectionGuide =
  'Abkant pres takım seçimi kılavuzu'
relatedToolFallbackLabels.id.toolingSelectionGuide =
  'Panduan pemilihan perkakas mesin tekuk'
relatedToolFallbackLabels.en.crowningGuide = 'Press Brake Crowning Guide'
relatedToolFallbackLabels.zh.crowningGuide = '折弯机挠度补偿指南'
relatedToolFallbackLabels.ru.crowningGuide =
  'Руководство по компенсации прогиба листогиба'
relatedToolFallbackLabels.es.crowningGuide =
  'Guía de compensación de flecha para plegadoras'
relatedToolFallbackLabels.tr.crowningGuide =
  'Abkant pres sehim kompanzasyonu kılavuzu'
relatedToolFallbackLabels.id.crowningGuide =
  'Panduan kompensasi lendutan press brake'
relatedToolFallbackLabels.en.stainlessSteelBendingGuide = 'Stainless Steel Bending Guide'
relatedToolFallbackLabels.zh.stainlessSteelBendingGuide = '不锈钢折弯指南'
relatedToolFallbackLabels.ru.stainlessSteelBendingGuide =
  'Руководство по гибке нержавеющей стали'
relatedToolFallbackLabels.es.stainlessSteelBendingGuide =
  'Guía de plegado de acero inoxidable'
relatedToolFallbackLabels.tr.stainlessSteelBendingGuide =
  'Paslanmaz Çelik Büküm Kılavuzu'
relatedToolFallbackLabels.id.stainlessSteelBendingGuide =
  'Panduan Tekuk Stainless Steel'
relatedToolFallbackLabels.en.aluminumBendingGuide = 'Aluminum Bending Guide'
relatedToolFallbackLabels.zh.aluminumBendingGuide = '铝板折弯指南'
relatedToolFallbackLabels.ru.aluminumBendingGuide =
  'Руководство по гибке алюминия'
relatedToolFallbackLabels.es.aluminumBendingGuide =
  'Guía de plegado de aluminio'
relatedToolFallbackLabels.tr.aluminumBendingGuide =
  'Alüminyum Büküm Kılavuzu'
relatedToolFallbackLabels.id.aluminumBendingGuide =
  'Panduan Tekuk Aluminium'
relatedToolFallbackLabels.en.minimumFlangeLengthGuide = 'Minimum Flange Length Guide'
relatedToolFallbackLabels.zh.minimumFlangeLengthGuide = '最小翻边长度指南'
relatedToolFallbackLabels.ru.minimumFlangeLengthGuide =
  'Руководство по минимальной длине полки'
relatedToolFallbackLabels.es.minimumFlangeLengthGuide =
  'Guía de longitud mínima de pestaña'
relatedToolFallbackLabels.tr.minimumFlangeLengthGuide = 'Minimum Flanş Boyu Kılavuzu'
relatedToolFallbackLabels.id.minimumFlangeLengthGuide = 'Panduan Panjang Flange Minimum'
relatedToolFallbackLabels.en.bendDeductionGuide = 'Bend Deduction Guide'
relatedToolFallbackLabels.zh.bendDeductionGuide = '折弯扣除量指南'
relatedToolFallbackLabels.ru.bendDeductionGuide = 'Руководство по вычету гиба'
relatedToolFallbackLabels.es.bendDeductionGuide = 'Guía de deducción de plegado'
relatedToolFallbackLabels.tr.bendDeductionGuide = 'Büküm Düşümü Kılavuzu'
relatedToolFallbackLabels.id.bendDeductionGuide = 'Panduan Bend Deduction'
relatedToolFallbackLabels.en.kFactorGuide = 'K-Factor Guide'
relatedToolFallbackLabels.zh.kFactorGuide = 'K因子指南'
relatedToolFallbackLabels.ru.kFactorGuide = 'Руководство по K-фактору'
relatedToolFallbackLabels.es.kFactorGuide = 'Guía del factor K'
relatedToolFallbackLabels.tr.kFactorGuide = 'K-Faktörü Kılavuzu'
relatedToolFallbackLabels.id.kFactorGuide = 'Panduan K-Factor'

const getInitialMaterial = () => {
  if (typeof window === 'undefined') {
    return 'mildSteel'
  }

  const materialParam = new URLSearchParams(
    window.location.search
  ).get('material')

  return validMaterialKeys.includes(materialParam)
    ? materialParam
    : 'mildSteel'
}

export default function PressBrakeCalculator({
  language = 'en',
  setLanguage = () => {},
}) {
  const [isMobile, setIsMobile] =
  useState(
    typeof window !== 'undefined'
      ? window.innerWidth < 900
      : false
  )

useEffect(() => {
  setPageSEO({
    title: 'Press Brake Tonnage Calculator for Sheet Metal Bending | ZYCO',
    description:
      'Calculate press brake bending force for sheet metal air bending based on material, thickness, bend length and V-die opening. Estimate tonnage, machine capacity, inside radius and springback reference.',
    keywords:
      'press brake calculator, press brake tonnage calculator, bending force calculator, sheet metal bending calculator, V die opening, air bending force',
    canonicalPath: '/engineering-tools/press-brake-calculator',
  })

  setStructuredData({
    id: 'press-brake-calculator-jsonld',
    data: createWebApplicationStructuredData({
      name: 'Press Brake Tonnage Calculator',
      description:
        'Calculate press brake bending force for sheet metal air bending based on material, thickness, bend length and V-die opening. Estimate tonnage, machine capacity, inside radius and springback reference.',
      path: '/engineering-tools/press-brake-calculator',
    }),
  })
}, [])

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 900)
  }

  window.addEventListener(
    'resize',
    handleResize
  )

  return () =>
    window.removeEventListener(
      'resize',
      handleResize
    )
}, [])
  const handleFocus = (e) => {
  e.target.style.border =
    '1px solid rgba(14,165,233,0.72)'

  e.target.style.boxShadow =
`
0 0 0 4px rgba(14,165,233,0.12),
0 16px 34px rgba(15,23,42,0.12),
0 8px 24px rgba(37,99,235,0.12),
inset 0 1px 0 rgba(255,255,255,0.98)
`

e.target.style.transform =
  'translateY(-2px)'
}

const handleBlur = (e) => {
  e.target.style.border =
    '1px solid rgba(147,197,253,0.34)'

  e.target.style.boxShadow =
  '0 10px 24px rgba(15,23,42,0.06), inset 0 1px 0 rgba(255,255,255,0.96), inset 0 -10px 24px rgba(219,234,254,0.18)'

e.target.style.transform =
  'translateY(0px)'
}
const handleFeatureEnter = (e) => {
  e.currentTarget.style.transform =
    'translateY(-6px)'

  e.currentTarget.style.boxShadow =
    '0 18px 40px rgba(59,130,246,0.25)'
}

const handleFeatureLeave = (e) => {
  e.currentTarget.style.transform =
    'translateY(0px)'

  e.currentTarget.style.boxShadow =
    '0 10px 30px rgba(0,0,0,0.18)'
}
const calculatorLanguage =
  calculatorLanguageMap[language] || 'EN'

const calculatorToSharedLanguageMap =
  Object.fromEntries(
    Object.entries(calculatorLanguageMap).map(
      ([sharedLanguage, calculatorLanguageValue]) => [
        calculatorLanguageValue,
        sharedLanguage,
      ]
    )
  )

const relatedToolLanguage =
  calculatorToSharedLanguageMap[calculatorLanguage] || 'en'

const thicknessRef = useRef(null)

const lengthRef = useRef(null)

const vdieRef = useRef(null)

const materialRef = useRef(null)

const [thickness, setThickness] =
  useState('')

const [length, setLength] =
  useState('')

const [material, setMaterial] =
  useState(getInitialMaterial)
const [isExportingPDF, setIsExportingPDF] =
  useState(false)
// 鎵嬪姩V妲?
const [customVdie, setCustomVdie] =
  useState('')

// 鑷姩鎺ㄨ崘V妲?
const getVdie = (t) => {
  const T = Number(t)

  if (T < 8) return T * 8

  if (T < 25) return T * 10

  return T * 12
}

// 鎺ㄨ崘V妲斤紙鍥哄畾鏄剧ず锛?
const recommendedVdie =
  thickness !== ''
    ? getVdie(Number(thickness))
    : ''

// 瀹為檯璁＄畻V妲?
const vDie =
  customVdie !== ''
    ? Number(customVdie)
    : recommendedVdie || ''

  // 鏉愭枡绯绘暟
  const materialFactors = {
    mildSteel: 1,
    galvanizedSteel: 1.05,
    stainless201: 1.76,
    stainless304: 1.62,
    aluminum: 0.65,
    brass: 0.6,
  }

  const TONNAGE_CALIBRATION_FACTOR = 1.33

  const targetAngle = 90

  const springbackRanges = {
    mildSteel: { min: 0.6, max: 1.3 },
    galvanizedSteel: { min: 0.8, max: 1.6 },
    stainless201: { min: 2.2, max: 3.8 },
    stainless304: { min: 1.8, max: 3.0 },
    aluminum: { min: 1.2, max: 2.8 },
    brass: { min: 0.4, max: 1.2 },
  }

  const naturalInsideRadiusFactors = {
    mildSteel: 0.16,
    galvanizedSteel: 0.16,
    stainless201: 0.18,
    stainless304: 0.18,
    aluminum: 0.14,
    brass: 0.16,
  }

  // 鎶樺集鍔涜绠?
  const calculateForce = () => {
    const T = Number(thickness)
    const L = Number(length)
    const V = Number(vDie)

    if (!T || !L || !V) return 0

    const factor =
      materialFactors[material] || 1

    const tonnage =
      (TONNAGE_CALIBRATION_FACTOR *
        T *
        T *
        L *
        factor) /
      V /
      20

    return Number(tonnage.toFixed(2))
  }

  // 鑷姩瀹炴椂璁＄畻
  const tonnage = useMemo(() => {
  return calculateForce()
}, [
  thickness,
  length,
  vDie,
  material,
])

  const springbackEstimate = useMemo(() => {
  const T = Number(thickness)
  const V = Number(vDie)

  if (!T || !V) return null

  const materialRange =
    springbackRanges[material] ||
    springbackRanges.mildSteel

  const vRatio = Number(vDie) / Number(thickness)

  let vFactor = 1

  if (vRatio <= 6) {
    vFactor = 0.85
  } else if (vRatio <= 8) {
    vFactor = 1
  } else if (vRatio <= 10) {
    vFactor = 1.15
  } else {
    vFactor = 1.3
  }

  let thicknessFactor = 1

  if (T < 2) {
    thicknessFactor = 1.15
  } else if (T <= 6) {
    thicknessFactor = 1
  } else if (T <= 12) {
    thicknessFactor = 0.9
  } else {
    thicknessFactor = 0.8
  }

  let lengthFactor = 1

  if (Number(length) <= 1000) {
    lengthFactor = 0.95
  } else if (Number(length) <= 2500) {
    lengthFactor = 1
  } else if (Number(length) <= 4000) {
    lengthFactor = 1.08
  } else if (Number(length) <= 6000) {
    lengthFactor = 1.15
  } else {
    lengthFactor = 1.25
  }

  const clampSpringback = (value) =>
    Math.min(5.0, Math.max(0.2, value))

  const springbackMin =
    Number(
      clampSpringback(
        materialRange.min *
        vFactor *
        thicknessFactor *
        lengthFactor
      ).toFixed(1)
    )

  const springbackMax =
    Number(
      clampSpringback(
        materialRange.max *
        vFactor *
        thicknessFactor *
        lengthFactor
      ).toFixed(1)
    )

  const suggestedMinAngle =
    Number(
      (
        targetAngle -
        springbackMax
      ).toFixed(1)
    )

  const suggestedMaxAngle =
    Number(
      (
        targetAngle -
        springbackMin
      ).toFixed(1)
    )

  return {
    springbackMin,
    springbackMax,
    suggestedMinAngle,
    suggestedMaxAngle,
  }
}, [
  thickness,
  vDie,
  material,
])

  // 鏈哄瀷搴?
  const estimatedNaturalInsideRadius = useMemo(() => {
  const V = Number(vDie)

  if (!Number.isFinite(V) || V <= 0) return null

  const factor =
    naturalInsideRadiusFactors[material] ||
    naturalInsideRadiusFactors.mildSteel

  return V * factor
}, [
  vDie,
  material,
])

  const machineList = [
    [30, 1600],
    [40, 1600],
    [40, 2500],
    [50, 1600],
    [50, 2500],
    [63, 1600],
    [63, 2500],
    [80, 2500],
    [80, 3200],
    [100, 2500],
    [100, 3200],
    [100, 4000],
    [125, 2500],
    [125, 3200],
    [125, 4000],
    [135, 2500],
    [135, 3200],
    [135, 4000],
    [160, 2500],
    [160, 3200],
    [160, 4000],
    [160, 5000],
    [160, 6000],
    [200, 2500],
    [200, 3200],
    [200, 4000],
    [200, 5000],
    [200, 6000],
    [250, 2500],
    [250, 3200],
    [250, 4000],
    [250, 5000],
    [250, 6000],
    [300, 2500],
    [300, 3200],
    [300, 4000],
    [300, 5000],
    [300, 6000],
    [400, 3200],
    [400, 4000],
    [400, 5000],
    [400, 6000],
    [500, 3200],
    [500, 4000],
    [500, 5000],
    [500, 6000],
    [600, 4000],
    [600, 5000],
    [600, 6000],
  ]

  // 澶氳瑷€
  const texts = {
    EN: {
      title: 'ZYCO Press Brake Calculator',
      subtitle: 'Professional Bending Force Calculation System',
      result: 'Calculation Result',
      machine: 'Recommended Machine',
      vdie: 'Recommended V Die',
      whatsapp: 'WhatsApp Contact',
      custom: 'Custom Machine',
      ton: 'Ton',
      diagram: 'PRESS BRAKE DIAGRAM',
      thickness: 'Thickness (mm)',
      length: 'Length (mm)',
      thicknessLabel: 'THICKNESS',
      lengthLabel: 'LENGTH',
      vdieLabel: 'V DIE',
      materialLabel: 'MATERIAL',
      systemOnline: 'SYSTEM ONLINE',
      hybridServo: 'Hybrid Servo',
      cncControl: 'CNC Control',
      accuracy: '±0.01mm',
      energySaving: 'Energy Saving',
      calcDetails: 'CALCULATION DETAILS',
      detailThickness: 'Thickness',
      detailLength: 'Length',
      detailVdie: 'V Die',
      materialFactor: 'Material Factor',
      downloadPdf: 'DOWNLOAD PDF REPORT',
      springbackTitle: 'SPRINGBACK ESTIMATION',
      estimatedSpringback: 'Estimated Springback',
      suggestedBendAngle: 'Suggested Bend Angle',
      estimatedNaturalInsideRadiusTitle:
        'ESTIMATED NATURAL INSIDE RADIUS',
      estimatedNaturalInsideRadiusNote:
        'Estimated natural inside radius for air bending. Actual radius may vary depending on tooling geometry, material condition and bending method.',
      springbackNote:
        'Reference value for air bending. Actual springback may vary depending on material batch, tooling, machine condition and bending method. Suggested bend angle is for process reference only and may not be equal to the final input angle used in the press brake control system. Actual parameters should be adjusted according to machine controller, tooling and trial bending results.',
      springbackLengthNote:
        'Longer bending length may increase angle deviation due to machine, tooling and deflection effects.',
      machineAdviceTitle: 'MACHINE SELECTION ADVICE',
      machineAdviceNote:
        "For long-term stable operation, it is recommended to avoid continuous use near the machine's maximum rated tonnage. For high-load production conditions, selecting a larger machine model or increasing the V-die opening is recommended to reduce stress on tooling and machine components.",
      machineAdvisoryNote:
        "For long-term stable operation, it is recommended to avoid continuous use near the machine's maximum rated tonnage. For high-load production conditions, selecting a larger machine model or increasing the V-die opening is recommended to reduce stress on tooling and machine components.",
      engineeringOverviewTitle: 'Engineering Overview',
      engineeringOverviewText:
        'This press brake calculator estimates bending force for air bending based on sheet thickness, bend length, material factor and V-die opening. It is useful for early machine capacity checks, quotation review and tooling setup planning. Real production results can change with material tensile strength, die condition, punch radius, bend angle, grain direction, lubrication and machine deflection, so calculated tonnage should be treated as an engineering estimate rather than a substitute for trial bending.',
      relatedEngineeringToolsTitle: 'Related Engineering Tools',
      relatedTools: {
        pressBrakeCalculator: 'Press Brake Calculator',
        materialDatabase: 'Material Database',
        vDieSelectionTool: 'V Die Selection Tool',
        insideRadiusGuide: 'Inside Radius Guide',
        springbackDatabase: 'Springback Database',
        bendAllowanceCalculator: 'Bend Allowance Calculator',
        airBendingGuide: 'Air Bending Guide',
      },
      materials: {
        mildSteel: 'Mild Steel',
        galvanizedSteel: 'Galvanized Steel',
        stainless201: 'Stainless 201',
        stainless304: 'Stainless 304',
        aluminum: 'Aluminum',
        brass: 'Brass',
      },
    },
    CN: {
      title: 'ZYCO折弯机计算器',
      subtitle: '专业折弯力计算系统',
      result: '计算结果',
      machine: '推荐设备',
      vdie: '推荐V槽',
      whatsapp: 'WhatsApp 联系',
      custom: '定制设备',
      ton: '吨',
      diagram: '折弯机示意图',
      thickness: '板厚 (mm)',
      length: '长度 (mm)',
      thicknessLabel: '板厚',
      lengthLabel: '长度',
      vdieLabel: 'V槽',
      materialLabel: '材料',
      systemOnline: '系统在线',
      hybridServo: '混合伺服',
      cncControl: '数控系统',
      accuracy: '±0.01mm',
      energySaving: '节能',
      calcDetails: '计算详情',
      detailThickness: '板厚',
      detailLength: '长度',
      detailVdie: 'V槽',
      materialFactor: '材料系数',
      downloadPdf: '下载PDF报告',
      springbackTitle: '回弹估算',
      estimatedSpringback: '预估回弹',
      suggestedBendAngle: '建议折弯角度',
      estimatedNaturalInsideRadiusTitle:
        '预估自然内半径',
      estimatedNaturalInsideRadiusNote:
        '空气折弯的预估自然内半径。实际半径可能因模具几何形状、材料状态和折弯方式而变化。',
      springbackNote:
        '该数值为空气折弯经验参考值，实际回弹会因材料批次、模具、设备状态和折弯方式不同而变化。建议折弯角度仅供工艺参考，并不等同于折弯机系统最终输入角度。实际参数需根据设备系统、模具及试折结果进行调整。',
      springbackLengthNote:
        '较长折弯长度可能因设备、模具及挠度影响而增加角度偏差。',
      machineAdviceTitle: '设备选型建议',
      machineAdviceNote:
        '为保证设备长期稳定运行，建议避免长时间接近或达到机器最大额定压力使用。对于长期高负载工况，建议选择更大型号设备或适当增大 V 开口，以降低模具与设备负载。',
      machineAdvisoryNote:
        '为保证设备长期稳定运行，建议避免长时间接近或达到机器最大额定压力使用。对于长期高负载工况，建议选择更大型号设备或适当增大 V 开口，以降低模具与设备负载。',
      engineeringOverviewTitle: '工程说明',
      engineeringOverviewText:
        '这款折弯机计算器可根据板材厚度、折弯长度、材料系数和 V 型模具开口大小，估算空气折弯所需的折弯力。它适用于早期设备能力判断、报价审核和模具设定规划。实际生产结果会因材料抗拉强度、模具状态、冲头半径、折弯角度、纹理方向、润滑情况和机器挠度等因素而变化，因此计算出的吨位应视为工程估算值，而非试弯结果的替代。',
      relatedEngineeringToolsTitle: '相关工程工具',
      relatedTools: {
        pressBrakeCalculator: '折弯机计算器',
        materialDatabase: '材料数据库',
        vDieSelectionTool: 'V型模具选择工具',
        insideRadiusGuide: '内半径指南',
        springbackDatabase: '回弹数据库',
        bendAllowanceCalculator: '折弯展开计算器',
        airBendingGuide: '空气折弯指南',
      },
      materials: {
        mildSteel: '普通钢',
        galvanizedSteel: '镀锌钢',
        stainless201: '201不锈钢',
        stainless304: '304不锈钢',
        aluminum: '铝',
        brass: '黄铜',
      },
    },
    RU: {
      title: 'Калькулятор листогиба ZYCO',
      subtitle: 'Профессиональная система расчета усилия гибки',
      result: 'Результат расчета',
      machine: 'Рекомендуемый станок',
      vdie: 'Рекомендуемая V-матрица',
      whatsapp: 'Связаться в WhatsApp',
      custom: 'Индивидуальный станок',
      ton: 'Тонн',
      diagram: 'СХЕМА ЛИСТОГИБА',
      thickness: 'Толщина (мм)',
      length: 'Длина (мм)',
      thicknessLabel: 'ТОЛЩИНА',
      lengthLabel: 'ДЛИНА',
      vdieLabel: 'V-МАТРИЦА',
      materialLabel: 'МАТЕРИАЛ',
      systemOnline: 'СИСТЕМА ОНЛАЙН',
      hybridServo: 'Гибридный сервопривод',
      cncControl: 'ЧПУ управление',
      accuracy: '±0.01мм',
      energySaving: 'Энергосбережение',
      calcDetails: 'ДЕТАЛИ РАСЧЕТА',
      detailThickness: 'Толщина',
      detailLength: 'Длина',
      detailVdie: 'V-матрица',
      materialFactor: 'Коэффициент материала',
      downloadPdf: 'СКАЧАТЬ PDF ОТЧЕТ',
      springbackTitle: 'ОЦЕНКА ПРУЖИНЕНИЯ',
      estimatedSpringback: 'Оценочное пружинение',
      suggestedBendAngle: 'Рекомендуемый угол гибки',
      estimatedNaturalInsideRadiusTitle:
        'ОЦЕНОЧНЫЙ ЕСТЕСТВЕННЫЙ ВНУТРЕННИЙ РАДИУС',
      estimatedNaturalInsideRadiusNote:
        'Оценочный естественный внутренний радиус для воздушной гибки. Фактический радиус может меняться в зависимости от геометрии оснастки, состояния материала и метода гибки.',
      springbackNote:
        'Справочное значение для воздушной гибки. Фактическое пружинение может меняться в зависимости от партии материала, оснастки, состояния станка и метода гибки. Рекомендуемый угол гибки является только технологическим ориентиром и может не совпадать с окончательным углом ввода в системе управления листогибом. Фактические параметры следует корректировать с учетом контроллера станка, оснастки и результатов пробной гибки.',
      springbackLengthNote:
        'Большая длина гибки может увеличить отклонение угла из-за влияния станка, оснастки и прогиба.',
      machineAdviceTitle: 'СОВЕТ ПО ВЫБОРУ СТАНКА',
      machineAdviceNote:
        'Для долгосрочной стабильной работы рекомендуется избегать продолжительной эксплуатации вблизи максимального номинального усилия станка. При высоких производственных нагрузках рекомендуется выбрать более крупную модель станка или увеличить раскрытие V-матрицы, чтобы снизить нагрузку на оснастку и узлы станка.',
      machineAdvisoryNote:
        'Для долгосрочной стабильной работы рекомендуется избегать продолжительной эксплуатации вблизи максимального номинального усилия станка. При высоких производственных нагрузках рекомендуется выбрать более крупную модель станка или увеличить раскрытие V-матрицы, чтобы снизить нагрузку на оснастку и узлы станка.',
      engineeringOverviewTitle: 'Инженерный обзор',
      engineeringOverviewText:
        'Этот калькулятор листогиба оценивает усилие воздушной гибки на основе толщины листа, длины гиба, коэффициента материала и раскрытия V-матрицы. Он полезен для предварительной проверки мощности станка, оценки коммерческого предложения и планирования настройки оснастки. Фактический результат в производстве может изменяться из-за прочности материала на растяжение, состояния матрицы, радиуса пуансона, угла гибки, направления прокатки, смазки и прогиба станка, поэтому рассчитанный тоннаж следует рассматривать как инженерную оценку, а не замену пробной гибки.',
      relatedEngineeringToolsTitle: 'Связанные инженерные инструменты',
      relatedTools: {
        pressBrakeCalculator: 'Калькулятор листогиба',
        materialDatabase: 'База материалов',
        vDieSelectionTool: 'Выбор V-матрицы',
        insideRadiusGuide: 'Справочник внутреннего радиуса',
        springbackDatabase: 'База пружинения',
        bendAllowanceCalculator: 'Калькулятор припуска на гиб',
        airBendingGuide: 'Руководство по Air Bending',
      },
      materials: {
        mildSteel: 'Углеродистая сталь',
        galvanizedSteel: 'Оцинкованная сталь',
        stainless201: 'Нержавеющая сталь 201',
        stainless304: 'Нержавеющая сталь 304',
        aluminum: 'Алюминий',
        brass: 'Латунь',
      },
    },
    ES: {
      title: 'Calculadora de Plegado ZYCO',
      subtitle: 'Sistema profesional de cálculo de fuerza de plegado',
      result: 'Resultado del cálculo',
      machine: 'Máquina recomendada',
      vdie: 'Matriz V recomendada',
      whatsapp: 'Contacto WhatsApp',
      custom: 'Máquina personalizada',
      ton: 'Ton',
      diagram: 'DIAGRAMA DE PLEGADORA',
      thickness: 'Espesor (mm)',
      length: 'Longitud (mm)',
      thicknessLabel: 'ESPESOR',
      lengthLabel: 'LONGITUD',
      vdieLabel: 'MATRIZ V',
      materialLabel: 'MATERIAL',
      systemOnline: 'SISTEMA EN LÍNEA',
      hybridServo: 'Servo híbrido',
      cncControl: 'Control CNC',
      accuracy: '±0.01mm',
      energySaving: 'Ahorro de energía',
      calcDetails: 'DETALLES DE CÁLCULO',
      detailThickness: 'Espesor',
      detailLength: 'Longitud',
      detailVdie: 'Matriz V',
      materialFactor: 'Factor del material',
      downloadPdf: 'DESCARGAR INFORME PDF',
      springbackTitle: 'ESTIMACIÓN DE RETORNO ELÁSTICO',
      estimatedSpringback: 'Retorno elástico estimado',
      suggestedBendAngle: 'Ángulo de plegado sugerido',
      estimatedNaturalInsideRadiusTitle:
        'RADIO INTERIOR NATURAL ESTIMADO',
      estimatedNaturalInsideRadiusNote:
        'Radio interior natural estimado para plegado al aire. El radio real puede variar según la geometría del utillaje, el estado del material y el método de plegado.',
      springbackNote:
        'Valor de referencia para plegado al aire. El retorno elástico real puede variar según el lote del material, la herramienta, el estado de la máquina y el método de plegado. El ángulo de plegado sugerido es solo una referencia de proceso y puede no ser igual al ángulo final introducido en el sistema de control de la plegadora. Los parámetros reales deben ajustarse según el controlador de la máquina, la herramienta y los resultados de las pruebas de plegado.',
      springbackLengthNote:
        'Una mayor longitud de plegado puede aumentar la desviación del ángulo por efectos de la máquina, la herramienta y la deflexión.',
      machineAdviceTitle: 'CONSEJO DE SELECCIÓN DE MÁQUINA',
      machineAdviceNote:
        'Para una operación estable a largo plazo, se recomienda evitar el uso continuo cerca del tonelaje nominal máximo de la máquina. En condiciones de producción de alta carga, se recomienda seleccionar un modelo de máquina más grande o aumentar la abertura de la matriz V para reducir el esfuerzo sobre la herramienta y los componentes de la máquina.',
      machineAdvisoryNote:
        'Para una operación estable a largo plazo, se recomienda evitar el uso continuo cerca del tonelaje nominal máximo de la máquina. En condiciones de producción de alta carga, se recomienda seleccionar un modelo de máquina más grande o aumentar la abertura de la matriz V para reducir el esfuerzo sobre la herramienta y los componentes de la máquina.',
      engineeringOverviewTitle: 'Resumen de ingeniería',
      engineeringOverviewText:
        'Esta calculadora de plegadora estima la fuerza de plegado para plegado al aire según el espesor de la chapa, la longitud de plegado, el factor del material y la abertura de la matriz V. Es útil para verificaciones iniciales de capacidad de máquina, revisión de cotizaciones y planificación de ajustes de utillaje. Los resultados reales de producción pueden variar por la resistencia a la tracción del material, el estado de la matriz, el radio del punzón, el ángulo de plegado, la dirección de laminación, la lubricación y la deflexión de la máquina, por lo que el tonelaje calculado debe tratarse como una estimación de ingeniería y no como sustituto de una prueba de plegado.',
      relatedEngineeringToolsTitle: 'Herramientas de ingeniería relacionadas',
      relatedTools: {
        pressBrakeCalculator: 'Calculadora de plegadora',
        materialDatabase: 'Base de datos de materiales',
        vDieSelectionTool: 'Herramienta de selección de matriz V',
        insideRadiusGuide: 'Guía de radio interior',
        springbackDatabase: 'Base de datos de retorno elástico',
        bendAllowanceCalculator: 'Calculadora de desarrollo de plegado',
        airBendingGuide: 'Guía de Air Bending',
      },
      materials: {
        mildSteel: 'Acero dulce',
        galvanizedSteel: 'Acero galvanizado',
        stainless201: 'Acero inoxidable 201',
        stainless304: 'Acero inoxidable 304',
        aluminum: 'Aluminio',
        brass: 'Latón',
      },
    },
    TR: {
      title: 'ZYCO Abkant Pres Hesaplayıcı',
      subtitle: 'Profesyonel Bükme Kuvveti Hesaplama Sistemi',
      result: 'Hesaplama Sonucu',
      machine: 'Önerilen Makine',
      vdie: 'Önerilen V Kalıp',
      whatsapp: 'WhatsApp İletişim',
      custom: 'Özel Makine',
      ton: 'Ton',
      diagram: 'ABKANT PRES ŞEMASI',
      thickness: 'Kalınlık (mm)',
      length: 'Uzunluk (mm)',
      thicknessLabel: 'KALINLIK',
      lengthLabel: 'UZUNLUK',
      vdieLabel: 'V KALIP',
      materialLabel: 'MALZEME',
      systemOnline: 'SİSTEM ÇEVRİMİÇİ',
      hybridServo: 'Hibrit Servo',
      cncControl: 'CNC Kontrol',
      accuracy: '±0.01mm',
      energySaving: 'Enerji Tasarrufu',
      calcDetails: 'HESAPLAMA DETAYLARI',
      detailThickness: 'Kalınlık',
      detailLength: 'Uzunluk',
      detailVdie: 'V Kalıp',
      materialFactor: 'Malzeme Katsayısı',
      downloadPdf: 'PDF RAPORUNU İNDİR',
      springbackTitle: 'GERİ ESNEME TAHMİNİ',
      estimatedSpringback: 'Tahmini geri esneme',
      suggestedBendAngle: 'Önerilen bükme açısı',
      estimatedNaturalInsideRadiusTitle:
        'TAHMİNİ DOĞAL İÇ RADYÜS',
      estimatedNaturalInsideRadiusNote:
        'Havada bükme için tahmini doğal iç radyüs. Gerçek radyüs; takım geometrisi, malzeme durumu ve bükme yöntemine göre değişebilir.',
      springbackNote:
        'Havada bükme için referans değerdir. Gerçek geri esneme; malzeme partisi, takım, makine durumu ve bükme yöntemine göre değişebilir. Önerilen bükme açısı yalnızca proses referansı içindir ve abkant kontrol sisteminde kullanılan nihai giriş açısına eşit olmayabilir. Gerçek parametreler makine kontrolörü, takım ve deneme bükümü sonuçlarına göre ayarlanmalıdır.',
      springbackLengthNote:
        'Daha uzun bükme boyu, makine, takım ve sehim etkileri nedeniyle açı sapmasını artırabilir.',
      machineAdviceTitle: 'MAKİNE SEÇİM TAVSİYESİ',
      machineAdviceNote:
        'Uzun süreli kararlı çalışma için makinenin maksimum nominal tonajına yakın sürekli kullanımından kaçınılması önerilir. Yüksek yüklü üretim koşullarında, takım ve makine bileşenleri üzerindeki gerilimi azaltmak için daha büyük bir makine modeli seçilmesi veya V kalıp açıklığının artırılması önerilir.',
      machineAdvisoryNote:
        'Uzun süreli kararlı çalışma için makinenin maksimum nominal tonajına yakın sürekli kullanımından kaçınılması önerilir. Yüksek yüklü üretim koşullarında, takım ve makine bileşenleri üzerindeki gerilimi azaltmak için daha büyük bir makine modeli seçilmesi veya V kalıp açıklığının artırılması önerilir.',
      engineeringOverviewTitle: 'Mühendislik özeti',
      engineeringOverviewText:
        'Bu abkant pres hesaplayıcısı, sac kalınlığı, bükme uzunluğu, malzeme katsayısı ve V kalıp açıklığına göre havada bükme için gerekli bükme kuvvetini tahmin eder. Erken makine kapasitesi kontrolü, teklif değerlendirmesi ve takım ayarı planlaması için kullanışlıdır. Gerçek üretim sonuçları malzeme çekme dayanımı, kalıp durumu, zımba radyüsü, bükme açısı, hadde yönü, yağlama ve makine sehimi gibi etkenlere göre değişebilir; bu nedenle hesaplanan tonaj deneme bükümünün yerine geçen kesin değer değil, mühendislik tahmini olarak değerlendirilmelidir.',
      relatedEngineeringToolsTitle: 'İlgili mühendislik araçları',
      relatedTools: {
        pressBrakeCalculator: 'Abkant pres hesaplayıcısı',
        materialDatabase: 'Malzeme veritabanı',
        vDieSelectionTool: 'V kalıp seçim aracı',
        insideRadiusGuide: 'İç radyüs kılavuzu',
        springbackDatabase: 'Geri esneme veritabanı',
        bendAllowanceCalculator: 'Büküm payı hesaplayıcı',
        airBendingGuide: 'Air Bending kılavuzu',
      },
      materials: {
        mildSteel: 'Yumuşak Çelik',
        galvanizedSteel: 'Galvanizli Çelik',
        stainless201: 'Paslanmaz 201',
        stainless304: 'Paslanmaz 304',
        aluminum: 'Alüminyum',
        brass: 'Pirinç',
      },
    },
    ID: {
      title: 'Kalkulator Press Brake ZYCO',
      subtitle: 'Sistem Perhitungan Gaya Tekuk Profesional',
      result: 'Hasil Perhitungan',
      machine: 'Mesin Rekomendasi',
      vdie: 'V Die Rekomendasi',
      whatsapp: 'Kontak WhatsApp',
      custom: 'Mesin Khusus',
      ton: 'Ton',
      diagram: 'DIAGRAM PRESS BRAKE',
      thickness: 'Ketebalan (mm)',
      length: 'Panjang (mm)',
      thicknessLabel: 'KETEBALAN',
      lengthLabel: 'PANJANG',
      vdieLabel: 'V DIE',
      materialLabel: 'MATERIAL',
      systemOnline: 'SISTEM ONLINE',
      hybridServo: 'Servo Hybrid',
      cncControl: 'Kontrol CNC',
      accuracy: '±0.01mm',
      energySaving: 'Hemat Energi',
      calcDetails: 'DETAIL PERHITUNGAN',
      detailThickness: 'Ketebalan',
      detailLength: 'Panjang',
      detailVdie: 'V Die',
      materialFactor: 'Faktor Material',
      downloadPdf: 'UNDUH LAPORAN PDF',
      springbackTitle: 'ESTIMASI SPRINGBACK',
      estimatedSpringback: 'Springback perkiraan',
      suggestedBendAngle: 'Sudut tekuk yang disarankan',
      estimatedNaturalInsideRadiusTitle:
        'RADIUS DALAM ALAMI PERKIRAAN',
      estimatedNaturalInsideRadiusNote:
        'Radius dalam alami perkiraan untuk air bending. Radius aktual dapat berbeda tergantung geometri tooling, kondisi material, dan metode penekukan.',
      springbackNote:
        'Nilai referensi untuk air bending. Springback aktual dapat berbeda tergantung batch material, tooling, kondisi mesin, dan metode penekukan. Sudut tekuk yang disarankan hanya sebagai referensi proses dan belum tentu sama dengan sudut input akhir pada sistem kontrol press brake. Parameter aktual perlu disesuaikan berdasarkan controller mesin, tooling, dan hasil trial bending.',
      springbackLengthNote:
        'Panjang tekuk yang lebih besar dapat meningkatkan deviasi sudut akibat pengaruh mesin, tooling, dan defleksi.',
      machineAdviceTitle: 'SARAN PEMILIHAN MESIN',
      machineAdviceNote:
        'Untuk operasi jangka panjang yang stabil, disarankan menghindari penggunaan terus-menerus mendekati tonase maksimum mesin. Untuk kondisi produksi beban tinggi, disarankan memilih model mesin yang lebih besar atau memperbesar bukaan V-die untuk mengurangi beban pada tooling dan komponen mesin.',
      machineAdvisoryNote:
        'Untuk operasi jangka panjang yang stabil, disarankan menghindari penggunaan terus-menerus mendekati tonase maksimum mesin. Untuk kondisi produksi beban tinggi, disarankan memilih model mesin yang lebih besar atau memperbesar bukaan V-die untuk mengurangi beban pada tooling dan komponen mesin.',
      engineeringOverviewTitle: 'Ringkasan teknik',
      engineeringOverviewText:
        'Kalkulator press brake ini memperkirakan gaya tekuk untuk air bending berdasarkan ketebalan plat, panjang tekukan, faktor material, dan bukaan V-die. Alat ini berguna untuk pemeriksaan awal kapasitas mesin, evaluasi penawaran, dan perencanaan setelan tooling. Hasil produksi aktual dapat berubah karena kekuatan tarik material, kondisi die, radius punch, sudut tekuk, arah serat material, pelumasan, dan defleksi mesin, sehingga tonase hasil perhitungan harus diperlakukan sebagai estimasi teknik, bukan pengganti trial bending.',
      relatedEngineeringToolsTitle: 'Alat teknik terkait',
      relatedTools: {
        pressBrakeCalculator: 'Kalkulator press brake',
        materialDatabase: 'Database material',
        vDieSelectionTool: 'Alat pemilihan V-die',
        insideRadiusGuide: 'Panduan radius dalam',
        springbackDatabase: 'Database springback',
        bendAllowanceCalculator: 'Kalkulator allowance tekuk',
        airBendingGuide: 'Panduan Air Bending',
      },
      materials: {
        mildSteel: 'Baja Ringan',
        galvanizedSteel: 'Baja Galvanis',
        stainless201: 'Stainless 201',
        stainless304: 'Stainless 304',
        aluminum: 'Aluminium',
        brass: 'Kuningan',
      },
    },
  }

  const t = texts[calculatorLanguage]
const titleFontSize = {
  EN: isMobile ? '28px' : '52px',
  CN: isMobile ? '30px' : '52px',
  ES: isMobile ? '24px' : '42px',
  RU: isMobile ? '22px' : '40px',
  TR: isMobile ? '24px' : '42px',
  ID: isMobile ? '24px' : '42px',
}
const backToEngineeringToolsLabel =
  {
    EN: '← Back to Engineering Tools',
    CN: '← 返回工程工具中心',
    RU: '← Назад к инженерным инструментам',
    ES: '← Volver a herramientas de ingeniería',
    TR: '← Mühendislik araçlarına dön',
    ID: '← Kembali ke Engineering Tools',
  }[calculatorLanguage] ||
  '← Back to Engineering Tools'
  // 鎺ㄨ崘鏈哄瀷
 const getUtilizationRatio = (machineTonnage) => {
  if ([30, 40, 50].includes(machineTonnage)) {
    return 0.85
  }

  if ([300, 400, 500, 600].includes(machineTonnage)) {
    return 0.92
  }

  return 0.9
}
 const recommendMachine = () => {
  if (!thickness || !length) {
    return '--'
  }

  if (
    Number(tonnage) > 600 ||
    Number(length) > 6000
  ) {
    return t.custom
  }

  for (const machine of machineList) {
    const [ton, len] = machine
    const utilizationRatio = getUtilizationRatio(ton)

    if (
      Number(tonnage) / utilizationRatio <= ton &&
      len >= Number(length)
    ) {
      return `${ton}T/${len}`
    }
  }

  return t.custom
}
const animationStyle = `
@keyframes titleScan {
  0% {
    transform: translateX(-140%) skewX(-25deg);
  }

  100% {
    transform: translateX(520%) skewX(-25deg);
  }
}

@keyframes titleTextScan {
  0% {
    background-position: 260% 0;
  }

  100% {
    background-position: -160% 0;
  }
}

.zyco-press-brake-back-to-hub {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  max-width: min(100%, 460px);
  min-height: 46px;
  box-sizing: border-box;
  margin: 0 0 18px;
  padding: 0 18px;
  border-color: rgba(37, 99, 235, 0.5);
  border-style: solid;
  border-width: 1px;
  border-radius: 999px;
  background-color: #dbeafe;
  color: #0f2f6b;
  font-size: 14px;
  line-height: 1.35;
  font-weight: 850;
  text-decoration: none;
  box-shadow:
    0 10px 24px rgba(15, 23, 42, 0.13),
    0 4px 12px rgba(37, 99, 235, 0.12);
  transition: all 0.25s ease;
}

.zyco-press-brake-back-to-hub:hover {
  border-color: rgba(125, 211, 252, 0.7);
  background-color: rgba(37, 99, 235, 0.42);
  color: #ffffff;
  box-shadow:
    0 14px 32px rgba(37, 99, 235, 0.32),
    0 0 0 1px rgba(125, 211, 252, 0.16);
  transform: translateY(-2px);
}

.zyco-press-brake-back-to-hub:focus-visible {
  outline: 3px solid rgba(37, 99, 235, 0.28);
  outline-offset: 3px;
}

.zyco-press-brake-title-shine {
  position: relative;
}

.zyco-press-brake-title-shine::after {
  content: attr(data-title);
  position: absolute;
  inset: 0;
  color: transparent;
  background:
    linear-gradient(
      105deg,
      transparent 0%,
      transparent 42%,
      rgba(255, 255, 255, 0.74) 49%,
      rgba(226, 246, 255, 0.68) 52%,
      transparent 59%,
      transparent 100%
    );
  background-size: 240% 100%;
  background-position: 260% 0;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  pointer-events: none;
  animation: titleTextScan 7s linear infinite;
}

.zyco-press-brake-input:hover {
  border-color: rgba(14, 165, 233, 0.52) !important;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%) !important;
  box-shadow:
    0 14px 30px rgba(15, 23, 42, 0.08),
    0 0 0 3px rgba(14, 165, 233, 0.055),
    inset 0 1px 0 rgba(255, 255, 255, 0.98),
    inset 0 -10px 22px rgba(219, 234, 254, 0.16) !important;
}

@media (max-width: 640px) {
  .zyco-press-brake-back-to-hub {
    width: 100%;
    margin-bottom: 16px;
    padding: 10px 14px;
    text-align: center;
  }
}
`
const svgAnimationPlayState =
  isExportingPDF
    ? 'paused'
    : 'running'
const estimatedSpringbackValue =
  springbackEstimate
    ? `${springbackEstimate.springbackMin.toFixed(1)}° - ${springbackEstimate.springbackMax.toFixed(1)}°`
    : '--'

const estimatedNaturalInsideRadiusValue =
  estimatedNaturalInsideRadius
    ? `\u2248 ${estimatedNaturalInsideRadius.toFixed(1)} mm`
    : '--'

const suggestedBendAngleValue =
  springbackEstimate
    ? `${springbackEstimate.suggestedMinAngle.toFixed(1)}° - ${springbackEstimate.suggestedMaxAngle.toFixed(1)}°`
    : '--'
const downloadPDF = async () => {
  try {
    const { jsPDF } = await import('jspdf')
    const html2canvas = (await import('html2canvas')).default

    setIsExportingPDF(true)

    await new Promise((resolve) =>
      setTimeout(resolve, 300)
    )

    // 淇杈撳叆妗嗘枃瀛椾綅缃?
    const inputs =
      document.querySelectorAll(
        'input, select'
      )

    inputs.forEach((el) => {
      el.dataset.originalPaddingTop =
        el.style.paddingTop

      el.dataset.originalPaddingBottom =
        el.style.paddingBottom

      el.dataset.originalLineHeight =
        el.style.lineHeight

      el.style.paddingTop = '16px'
      el.style.paddingBottom = '16px'
      el.style.lineHeight = 'normal'
    })

    await new Promise((resolve) =>
      setTimeout(resolve, 100)
    )

    const input =
      document.getElementById(
        'pdf-report'
      )

    if (!input) {
      setIsExportingPDF(false)
      return
    }

    const canvas =
      await html2canvas(input, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        scrollY: -window.scrollY,
      })

const pdfWidth = 210

const pdfHeight =
  (canvas.height * pdfWidth) /
  canvas.width

const pdf = new jsPDF(
  'p',
  'mm',
  [pdfWidth, pdfHeight]
)

// 鍘熷canvas灏哄
const imgData =
  canvas.toDataURL('image/png')

pdf.addImage(
  imgData,
  'PNG',
  0,
  0,
  pdfWidth,
  pdfHeight,
  undefined,
  'FAST'
)


pdf.save(
  'ZYCO-Bending-Report.pdf'
)

    // 鎭㈠鏍峰紡
    inputs.forEach((el) => {
      el.style.paddingTop =
        el.dataset
          .originalPaddingTop || ''

      el.style.paddingBottom =
        el.dataset
          .originalPaddingBottom || ''

      el.style.lineHeight =
        el.dataset
          .originalLineHeight || ''
    })
  } catch (error) {
    console.error(error)
  } finally {
    setIsExportingPDF(false)
  }
}

  return (
  <>
    <style>{animationStyle}</style>

    <div
  style={{
    minHeight: '100vh',
    width: '100%',
    maxWidth: '100vw',
    overflowX: 'hidden',
    overflowY: 'visible',
    boxSizing: 'border-box',
        background: `
radial-gradient(
circle at 18% 12%,
rgba(96,165,250,0.28),
transparent 30%
),

radial-gradient(
circle at 82% 18%,
rgba(14,165,233,0.18),
transparent 28%
),

linear-gradient(
145deg,
#071224 0%,
#0b1f3f 42%,
#12366e 74%,
#1d4ed8 100%
)
`,
        padding: isMobile ? '10px' : '16px',
        fontFamily: 'Arial',
        position: 'relative',
       
      }}
    >
      <div
  style={{
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      linear-gradient(
        rgba(96,165,250,0.07) 1px,
        transparent 1px
      ),
      linear-gradient(
        90deg,
        rgba(96,165,250,0.07) 1px,
        transparent 1px
      )
    `,
    backgroundSize: '42px 42px',
    opacity: 0.9,
    maskImage:
      'linear-gradient(to bottom, rgba(0,0,0,0.88), transparent 78%)',
    pointerEvents: 'none',
      }}
/>
      <div
  id='pdf-report'
style={{
  width: '100%',
  maxWidth: '1100px',
  minWidth: 0,
  margin: '0 auto',
  boxSizing: 'border-box',

  overflowX: 'hidden',
  overflowY: 'visible',

  background:
    'linear-gradient(145deg,rgba(255,255,255,0.96),rgba(239,246,255,0.9))',

  borderRadius: isMobile
    ? '22px'
    : '32px',

  padding: isMobile
    ? '10px'
    : '18px',

  backdropFilter: 'blur(14px)',

  boxShadow:
`
0 30px 90px rgba(0,0,0,0.22),
0 0 0 1px rgba(147,197,253,0.22),
inset 0 1px 0 rgba(255,255,255,0.82)
`,

  border:
    '1px solid rgba(147,197,253,0.22)',
}}
      >
        <a
          aria-label={backToEngineeringToolsLabel}
          className='zyco-press-brake-back-to-hub'
          href='/engineering-tools'
        >
          {backToEngineeringToolsLabel}
        </a>

{/* 椤堕儴 */}
<div
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '20px',
    flexWrap: isMobile ? 'wrap' : 'nowrap',
  }}
>
  <div
  style={{
    flex: 1,
    minWidth: 0,
  }}
>
    <div
      style={{
  display: 'inline-flex',

  alignItems: 'center',

  gap: '10px',

  marginBottom:
    isExportingPDF
      ? '22px'
      : '12px',

  background:
  isExportingPDF
    ? 'rgba(219,234,254,1)'
    : 'rgba(239,246,255,0.82)',

  padding: '10px 18px',

  borderRadius: '999px',

  border:
    '1px solid rgba(147,197,253,0.42)',

  position: 'relative',

  zIndex: 2,

  boxShadow:
    isExportingPDF
      ? 'none'
      : '0 10px 26px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.86)',
  backdropFilter: 'blur(14px)',
}}
    >
      <div
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '999px',
          background: '#2563eb',
          boxShadow:
            '0 0 0 3px rgba(37,99,235,0.12), 0 0 12px rgba(37,99,235,0.24)',
        }}
      />

      <span
        style={{
  fontSize: '14px',

  fontWeight: '800',

  color: '#0f2f6b',

  opacity: 1,

  position: 'relative',

  zIndex: 3,

  letterSpacing: '1.2px',
}}
      >
        ZYCO INDUSTRIAL SYSTEM
      </span>
    </div>

    {/* 鏍囬鎵弿鍏?*/}
    <div
  style={{
    position: 'relative',
    display: 'block',
    width: '100%',
    overflow: 'hidden',
    paddingTop:
  isExportingPDF
    ? '8px'
    : '0px',
  }}
>
      <h1
        className={
          isExportingPDF
            ? undefined
            : 'zyco-press-brake-title-shine'
        }
        data-title={t.title}
        style={{
          fontSize: titleFontSize[calculatorLanguage],

            maxWidth: isMobile ? '100%' : '500px',
          margin: 0,

          color: '#0f172a',

          fontWeight: '900',

          letterSpacing: '-1.5px',

          lineHeight: '1.12',

          ...(isExportingPDF
  ? {
      color: '#1e3a8a',
      background: 'none',
      WebkitTextFillColor: '#1e3a8a',
    }
  : {
      background:
        'linear-gradient(180deg,#0f172a 0%,#1e3a8a 62%,#2563eb 100%)',

      WebkitBackgroundClip:
        'text',

      WebkitTextFillColor:
        'transparent',
    }),

          textShadow:
            `
            0 1px 2px rgba(15,23,42,0.05)
            `,
            wordBreak: 'break-word',
            whiteSpace: 'normal',
overflowWrap: 'break-word',
        }}
      >
        {t.title}
      </h1>
    </div>

   <p
  style={{
    color: '#64748b',
    marginTop: '14px',

    fontSize: isMobile
      ? '14px'
      : '16px',

    lineHeight: '1.7',

    maxWidth: '520px',

    letterSpacing: '0.3px',
  }}
>
      {t.subtitle}
    </p>
  </div>

<select
  className='zyco-press-brake-input'
  value={calculatorLanguage}
  onChange={(e) =>
    setLanguage(
      calculatorToSharedLanguageMap[e.target.value] ||
      'en'
    )
  }
  style={{
    ...inputStyle,
    width: isMobile ? '100%' : '240px',
    flexShrink: 0,
    paddingTop: '0px',
    paddingBottom: '0px',

    lineHeight: '58px',
  }}
  onFocus={handleFocus}
  onBlur={handleBlur}
>
    <option value='EN'>
      English
    </option>

    <option value='CN'>
      中文
    </option>

    <option value='RU'>
      Русский
    </option>

    <option value='ES'>
      Español
    </option>

    <option value='TR'>
      Türkçe
    </option>

    <option value='ID'>
      Indonesia
    </option>
  </select>
</div>

        {/* 杈撳叆鍖哄煙 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
  isMobile
    ? '1fr'
    : '1fr 1fr',
            gap: '12px',
            marginTop: '24px',
            background:
isExportingPDF
  ? '#f8fbff'
  : 'linear-gradient(145deg,rgba(255,255,255,0.94),rgba(239,246,255,0.82))',
            padding: '12px',
            borderRadius: '24px',
            border:
isExportingPDF
  ? '1px solid rgba(96,165,250,0.42)'
  : '1px solid rgba(147,197,253,0.24)',
boxShadow:
isExportingPDF
  ? '0 8px 18px rgba(15,23,42,0.08)'
  : '0 18px 44px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.82)',
backdropFilter:
  isExportingPDF
    ? 'none'
    : 'blur(14px)',

          }}
        >
          <div style={fieldWrap}>
  <div style={labelStyle}>
  {t.thicknessLabel}
</div>

<div style={inputWrapStyle}>
  <input
  className='zyco-press-brake-input'
  ref={thicknessRef}

  type='number'

  value={thickness}

  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      lengthRef.current?.focus()
    }
  }}
    onChange={(e) => {
      const value = e.target.value

      if (value === '') {
        setThickness('')
        return
      }

      const num = Number(value)

      if (num > 0 && num <= 100) {
        setThickness(value)
      }
    }}
    style={
      isExportingPDF
        ? pdfInputStyle
        : inputStyle
    }
    onFocus={handleFocus}
    onBlur={handleBlur}
    placeholder='3 mm'
  />

  <span style={unitStyle}>
    mm
  </span>
</div>

</div>


          <div style={fieldWrap}>
  <div style={labelStyle}>
    {t.lengthLabel}
  </div>

<div style={inputWrapStyle}>
  <input
  className='zyco-press-brake-input'
  ref={lengthRef}

  type='number'

  value={length}

  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      vdieRef.current?.focus()
    }
  }}
    onChange={(e) => {
      const value = e.target.value

      if (value === '') {
        setLength('')
        return
      }

      const num = Number(value)

      if (num > 0 && num <= 12000) {
        setLength(value)
      }
    }}
    style={
      isExportingPDF
        ? pdfInputStyle
        : inputStyle
    }
    onFocus={handleFocus}
    onBlur={handleBlur}
    placeholder='2500 mm'
  />

  <span style={unitStyle}>
    mm
  </span>
</div>

</div>

<div style={fieldWrap}>
  <div style={labelStyle}>
    {t.vdieLabel}
  </div>

<div style={inputWrapStyle}>
 <input
  className='zyco-press-brake-input'
  ref={vdieRef}

  type='number'

  value={customVdie}

  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      materialRef.current?.focus()
    }
  }}
    onChange={(e) => {
      const value = e.target.value

      if (value === '') {
        setCustomVdie('')
        return
      }

      const num = Number(value)

      if (num > 0 && num <= 1000) {
        setCustomVdie(value)
      }
    }}
    style={
      isExportingPDF
        ? pdfInputStyle
        : inputStyle
    }
    onFocus={handleFocus}
    onBlur={handleBlur}
    placeholder='AUTO'
  />

  <span style={unitStyle}>
    mm
  </span>
</div>

</div>


<div style={fieldWrap}>
  <div style={labelStyle}>
    {t.materialLabel}
  </div>

<select
  className='zyco-press-brake-input'
  ref={materialRef}

  value={material}

  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      e.target.blur()
    }
  }}
  onChange={(e) =>
    setMaterial(e.target.value)
  }
  style={
    isExportingPDF
      ? pdfInputStyle
      : inputStyle
  }
  onFocus={handleFocus}
  onBlur={handleBlur}
>
 <option value='mildSteel'>
  {t.materials.mildSteel}
</option>

<option value='galvanizedSteel'>
  {t.materials.galvanizedSteel}
</option>

<option value='stainless201'>
  {t.materials.stainless201}
</option>

<option value='stainless304'>
  {t.materials.stainless304}
</option>

<option value='aluminum'>
  {t.materials.aluminum}
</option>

<option value='brass'>
  {t.materials.brass}
</option>
</select>
</div>
          
        </div>

        {/* 缁撴灉鍖哄煙 */}
        <div
  style={{
    right: isMobile ? '10px' : '30px',
bottom: isMobile ? '10px' : '20px',

fontSize: isMobile
  ? '24px'
  : '42px',

    fontWeight: '900',

    color: 'rgba(255,255,255,0.04)',

    pointerEvents: 'none',

    letterSpacing: '2px',
  }}
>
  ZYCO
</div>
        <div
          style={{
            position: 'relative',
overflow: 'hidden',
width: '100%',
    boxSizing: 'border-box',
            marginTop: '18px',
            background:
`
radial-gradient(
circle at top left,
rgba(96,165,250,0.18),
transparent 30%
),

radial-gradient(
circle at bottom right,
rgba(59,130,246,0.22),
transparent 35%
),

linear-gradient(
145deg,
#071224 0%,
#102b63 45%,
#1d4ed8 100%
)
`,
            borderRadius:
  isExportingPDF
    ? '0px'
    : isMobile
      ? '22px'
      : '32px',
            padding: isMobile ? '8px' : '16px',
            color: '#fff',
            boxShadow:
'0 20px 60px rgba(37,99,235,0.18)',
          }}
        >
        <div
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '12px',
  }}
>
  <div
    style={{
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      background: '#22c55e',
      boxShadow:
        '0 0 12px #22c55e',
    }}
  />

  <span
  style={{
    fontSize: '12px',
    letterSpacing: '2px',
    color: '#93c5fd',
    fontWeight: '700',
  }}
>
  {t.systemOnline}
</span>
</div>
          <h2
            style={{
              fontSize: '28px',
              marginBottom: '20px',
            }}
          >
            {t.result}
          </h2>

         <div
  style={{
    fontSize:
  isMobile
    ? 'clamp(34px,10vw,52px)'
    : '78px',
        wordBreak:'break-word',
overflowWrap:'break-word',

fontWeight: '900',

marginBottom: '24px',

letterSpacing:
  isMobile ? '0px' : '1px',
fontVariantNumeric: 'tabular-nums',


color: '#ffffff',

lineHeight: '1',

textShadow:
  `
  0 0 35px rgba(96,165,250,0.65),
  0 0 80px rgba(59,130,246,0.25)
  `,

}}
>

            <>
<CountUp
  end={Number(tonnage) || 0}
  duration={0.6}
  decimals={2}
  separator=','
/>

<span
style={{
fontSize:
isMobile
? '22px'
: '30px',

marginLeft: '12px',

opacity: 0.82,

color: '#dbeafe',

fontWeight: '800',

textShadow:
'0 0 18px rgba(96,165,250,0.35)',

letterSpacing: '1px',

}}
>

{t.ton}

  </span>
</>

          </div>

          <div
            style={{
              marginBottom: '24px',
              padding: '18px',
              borderRadius: '22px',
              background:
                'linear-gradient(145deg,rgba(96,165,250,0.18),rgba(255,255,255,0.06))',
              border:
                '1px solid rgba(147,197,253,0.18)',
              boxShadow:
                '0 10px 30px rgba(0,0,0,0.16)',
              color: '#dbeafe',
            }}
          >
            <div
              style={{
                color: '#93c5fd',
                fontSize: '13px',
                letterSpacing: '2px',
                fontWeight: '800',
                marginBottom: '10px',
                textTransform: 'uppercase',
                wordBreak: 'break-word',
                overflowWrap: 'anywhere',
              }}
            >
              {t.estimatedNaturalInsideRadiusTitle}
            </div>

            <div
              style={{
                color: '#ffffff',
                fontSize: isMobile ? '28px' : '34px',
                fontWeight: '900',
                lineHeight: '1.1',
                marginBottom: '10px',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {estimatedNaturalInsideRadiusValue}
            </div>

            <div
              style={{
                color: '#bfdbfe',
                fontSize: '13px',
                lineHeight: '1.65',
                wordBreak: 'normal',
                overflowWrap: 'anywhere',
                whiteSpace: 'normal',
              }}
            >
              {t.estimatedNaturalInsideRadiusNote}
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
  isMobile
    ? '1fr'
    : '1fr 1fr',
              gap: '30px',
            }}
          >
            {/* 宸︿晶 */}
            <div
              style={{
                background:
'linear-gradient(145deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))',
                borderRadius: '24px',
                padding: '16px',
                border:
                  '1px solid rgba(255,255,255,0.14)',
                  boxShadow:
'0 10px 30px rgba(0,0,0,0.18)',
              }}
            >
              <div
                style={{
                  color: '#93c5fd',
                  fontSize: '14px',
                  letterSpacing: '2px',
                  fontVariantNumeric:
'tabular-nums',
                  marginBottom: '14px',
                }}
              >
                {t.machine}
              </div>

              <div
                style={{
                  fontSize: '34px',
                  fontWeight: '800',
                }}
              >
                {
  recommendMachine() === '--'
    ? ''
    : `ZYCO PB ${recommendMachine()}`
}
              </div>

             <div
  style={{
    marginTop: '30px',

    display: 'grid',

    gridTemplateColumns:
      isMobile
        ? '1fr'
        : '1fr 1fr',

    gap: '16px',

    perspective: '1000px',
  }}
>
                <div
  style={featureStyle}
  onMouseEnter={handleFeatureEnter}
  onMouseLeave={handleFeatureLeave}
>
  {t.hybridServo}
</div>

<div
  style={featureStyle}
  onMouseEnter={handleFeatureEnter}
  onMouseLeave={handleFeatureLeave}
>
  {t.cncControl}
</div>

<div
  style={featureStyle}
  onMouseEnter={handleFeatureEnter}
  onMouseLeave={handleFeatureLeave}
>
  {t.accuracy}
</div>

<div
  style={featureStyle}
  onMouseEnter={handleFeatureEnter}
  onMouseLeave={handleFeatureLeave}
>
  {t.energySaving}
</div>
              </div>

              <div
                style={{
                  marginTop: '30px',
                  fontSize: '22px',
                  color: '#dbeafe',
                }}
              >
                {t.vdie}

                <strong
                  style={{
                    color: '#fff',
                  }}
                >
                  {' '}
                  {recommendedVdie
  ? `${recommendedVdie} mm`
  : 'AUTO'}
                </strong>
              </div>

              <div style={machineAdvisoryStyle}>
                {t.machineAdviceNote}
              </div>
            </div>

            {/* 鍙充晶 */}
            <div
              style={{
background:
isExportingPDF
  ? 'linear-gradient(145deg,#123b87 0%,#1d4ed8 100%)'
  : 'rgba(255,255,255,0.06)',

borderRadius: '24px',

padding: '16px',

boxShadow:
isExportingPDF
  ? 'none'
  : 'inset 0 0 40px rgba(59,130,246,0.18),0 10px 30px rgba(0,0,0,0.18)',

border:
'1px solid rgba(148,163,184,0.15)',

display: 'flex',

flexDirection: 'column',
}}

            >
              <div
                style={{
                  fontSize: '14px',
                  letterSpacing: '2px',
                  color: '#9fb6ff',
                  marginBottom: '20px',
                }}
              >
                {t.diagram}
              </div>

<div
  style={{
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: isMobile ? '300px' : '360px',
    overflow: 'hidden',
  }}
>
<svg
  width='100%'
  height={
    isExportingPDF
      ? '240'
      : isMobile
        ? '220'
        : '280'
  }
  viewBox='0 0 500 460'
  style={{
    width: '100%',
    maxWidth: '520px',
    maxHeight: '100%',
    height:
      isExportingPDF
        ? '240px'
        : isMobile
          ? '220px'
          : '280px',
    display: 'block',
    margin: '0 auto',
    animationPlayState:
      svgAnimationPlayState,
  }}
>
              <pattern
  id='scanGrid'
  width='20'
  height='20'
  patternUnits='userSpaceOnUse'
>
  <path
    d='M20 0 L0 0 0 20'
    fill='none'
    stroke='#60a5fa'
    strokeWidth='0.6'
  />
</pattern>
               <defs>

  <linearGradient
    id='metalBlue'
    x1='0%'
    y1='0%'
    x2='100%'
    y2='0%'
  >
    <stop
      offset='0%'
      stopColor='#0ea5e9'
    />

    <stop
      offset='50%'
      stopColor='#7dd3fc'
    />

    <stop
      offset='100%'
      stopColor='#0284c7'
    />
  </linearGradient>

  <linearGradient
    id='upperDieMetal'
    x1='0%'
    y1='0%'
    x2='100%'
    y2='100%'
  >
    <stop
      offset='0%'
      stopColor='#f8fafc'
    />

    <stop
      offset='18%'
      stopColor='#ffffff'
    />

    <stop
      offset='45%'
      stopColor='#cbd5e1'
    />

    <stop
      offset='70%'
      stopColor='#f1f5f9'
    />

    <stop
      offset='100%'
      stopColor='#94a3b8'
    />
  </linearGradient>
  <linearGradient
  id='lowerDieMetal'
  x1='0%'
  y1='0%'
  x2='100%'
  y2='100%'
>
  <stop
    offset='0%'
    stopColor='#475569'
  />

  <stop
    offset='50%'
    stopColor='#94a3b8'
  />

  <stop
    offset='100%'
    stopColor='#334155'
  />
</linearGradient>

  <linearGradient
    id='scanLine'
    x1='0%'
    y1='0%'
    x2='100%'
    y2='0%'
  >
    <stop
      offset='0%'
      stopColor='#38bdf8'
      stopOpacity='0'
    />

    <stop
      offset='50%'
      stopColor='#93c5fd'
      stopOpacity='1'
    />

    <stop
      offset='100%'
      stopColor='#38bdf8'
      stopOpacity='0'
    />
  </linearGradient>

  <filter id='glow'>
    <feGaussianBlur
      stdDeviation='2'
      result='coloredBlur'
    />

    <feMerge>
      <feMergeNode in='coloredBlur' />

      <feMergeNode in='SourceGraphic' />
    </feMerge>
  </filter>

</defs>
<g transform='translate(-8, 34) scale(1.03)'>
{/* 宸︽恫鍘嬫补缂?*/}
<rect
  x='170'
  y='10'
  width='10'
  height='80'
  rx='4'
  fill='#94a3b8'
>
  {!isExportingPDF && (
    <animate
      attributeName='height'
      values='80;92;80'
      dur='2.4s'
      repeatCount='indefinite'
      begin='0s'
    />
  )}
</rect>

{/* 鍙虫恫鍘嬫补缂?*/}
<rect
  x='320'
  y='10'
  width='10'
  height='80'
  rx='4'
  fill='#94a3b8'
>
  {!isExportingPDF && (
    <animate
      attributeName='height'
      values='80;92;80'
      dur='2.4s'
      repeatCount='indefinite'
    />
  )}
</rect>
{/* HUD鎵弿鑳屾櫙 */}
<rect
  x='0'
  y='0'
  width='500'
  height='420'
  fill='url(#scanGrid)'
  opacity={
    isExportingPDF
      ? '0'
      : '0.08'
  }
/>
{/* 涓婃ā鍘嬫澘 */}
<rect
  x='185'
  y='18'
  width='130'
  height='28'
  rx='6'
  fill='#f8fafc'
  stroke='#ffffff'
strokeWidth='1.5'
  opacity='0.95'
>
{!isExportingPDF && (
  <animateTransform
    attributeName='transform'
    type='translate'
    values='0 0;0 14;0 0'
    dur='2.4s'
    repeatCount='indefinite'
    calcMode='spline'
    keySplines='0.42 0 0.2 1;0.42 0 0.58 1'
    keyTimes='0;0.55;1'
    begin='0s'
  />
)}
</rect>

{/* 涓婃ā涓讳綋 */}
<path
  d='
  M215 46
  L285 46
  L285 95
  L270 130
  L258 165
  L250 186
  L242 165
  L230 130
  L215 95
  Z
  '
  fill='url(#upperDieMetal)'
  stroke='#cbd5e1'
  strokeWidth='1.2'
>
  {!isExportingPDF && (
    <animateTransform
      attributeName='transform'
      type='translate'
      values='0 0;0 12;0 0'
      dur='2.4s'
      repeatCount='indefinite'
    />
  )}
</path>

{/* 涓婃ā楂樺厜 */}
<line
  x1='242'
  y1='58'
  x2='242'
  y2='150'
  stroke='#ffffff'
  strokeWidth='2.5'
  opacity='0.28'
  strokeLinecap='round'
>
  {!isExportingPDF && (
    <animateTransform
      attributeName='transform'
      type='translate'
      values='0 0;0 12;0 0'
      dur='2.4s'
      repeatCount='indefinite'
    />
  )}
</line>

<rect
  x='120'
  y='188'
  width='260'
  height='3'
  fill='url(#scanLine)'
  opacity='0.8'
>

  {!isExportingPDF && (
    <animate
      attributeName='y'
      values='188;215;188'
      dur='2.4s'
      repeatCount='indefinite'
    />
  )}

</rect>
{/* 鏉挎潗 */}
{/* 鏉挎潗寮洸鍔ㄧ敾 */}
<path
  d='
  M120 204
  Q250 204 380 204
  L380 214
  Q250 214 120 214
  Z
  '
  fill='#38bdf8'
  stroke='#e0f2fe'
  strokeWidth='2'
  filter='url(#glow)'
>
  {!isExportingPDF && (
    <>
      <animate
        attributeName='d'
        dur='2.4s'
        repeatCount='indefinite'
        values='
        M120 204 Q250 204 380 204 L380 214 Q250 214 120 214 Z;

        M120 204 Q250 228 380 204 L380 214 Q250 238 120 214 Z;

        M120 204 Q250 204 380 204 L380 214 Q250 214 120 214 Z
        '
      />

      <animate
        attributeName='opacity'
        values='0.7;1;0.7'
        dur='2.4s'
        repeatCount='indefinite'
      />
    </>
  )}
</path>


{/* 涓嬫ā涓讳綋 */}
<path
  d='
  M110 320
  L180 250
  L220 250
  L250 305
  L280 250
  L320 250
  L390 320
  Z
  '
  fill='url(#lowerDieMetal)'
  stroke='#94a3b8'
  strokeWidth='2'
  filter='url(#glow)'
/>

{/* V妲芥繁搴?*/}
<path
  d='
  M220 250
  L250 295
  L280 250
  '
  fill='#0f172a'
/>

{/* 涓嬫ā椤堕儴楂樺厜 */}
<line
  x1='180'
  y1='250'
  x2='320'
  y2='250'
  stroke='#cbd5e1'
  strokeWidth='3'
  opacity='0.6'
/>

{/* 涓嬫ā搴曞骇 */}
<rect
  x='90'
  y='320'
  width='320'
  height='42'
  rx='10'
  fill='#334155'
/>

{/* 搴曞骇楂樺厜 */}
<rect
  x='100'
  y='327'
  width='300'
  height='3'
  rx='2'
  fill='#94a3b8'
  opacity='0.35'
/>

                {/* 鍘嬪姏绠ご */}
                <line
x1='250'
y1='-10'
x2='250'
y2='25'
stroke='#fbbf24'
strokeWidth='5'
strokeLinecap='round'
filter='url(#glow)'

>

{!isExportingPDF && (
  <>
    <animate
      attributeName='stroke-opacity'
      values='0.3;1;0.3'
      dur='2.4s'
      repeatCount='indefinite'
    />

    <animate
      attributeName='stroke-width'
      values='4;6;4'
      dur='2.4s'
      repeatCount='indefinite'
    />
  </>
)}</line>


                <polygon
                  points='240,15 260,15 250,30'
                  fill='#fbbf24'
                />

                <text
x='270'
y='18'
fill='#fbbf24'
fontSize='20'
fontWeight='700'
opacity='0.95'

>

{!isExportingPDF && (
  <animate
    attributeName='opacity'
    values='0.4;1;0.4'
    dur='2.4s'
    repeatCount='indefinite'
  />
)}

PRESS </text>



                {/* V妲芥枃瀛?*/}
                <text
                  x='250'
                  y='390'
                  textAnchor='middle'
                  fill='#fff'
                  fontSize='24'
                  fontWeight='700'
                >
                  V = {vDie || 'AUTO'}
                </text>

                {/* 鏉垮帤 */}
                <text
                  x='395'
                  y='180'
                  fill='url(#metalBlue)'
                  filter='url(#glow)'
                  fontSize='24'
                  fontWeight='800'
                >
                  T = {thickness || '--'} mm
                </text>
                {/* 鍘嬪姏鍐插嚮娉?*/}
<circle
  cx='250'
  cy='210'
  r='8'
  fill='none'
  stroke='#60a5fa'
  strokeWidth='3'
  opacity='0.5'
>
  {!isExportingPDF && (
    <>
      <animate
        attributeName='r'
        values='8;55'
        dur='2.4s'
        repeatCount='indefinite'
      />

      <animate
        attributeName='opacity'
        values='0.45;0'
        dur='2.4s'
        repeatCount='indefinite'
      />
    </>
  )}
</circle>
</g>
              </svg>
            </div>
            </div>
          </div>
        </div>

<div
  style={{
    marginTop: '20px',

    padding: '18px',

    borderRadius: '24px',

    background:
      'rgba(255,255,255,0.06)',

    border:
      '1px solid rgba(255,255,255,0.12)',

    color: '#dbeafe',
  }}
>
  <div
    style={{
      display: 'inline-flex',

      alignItems: 'center',

      gap: '10px',

      fontSize: '14px',

      letterSpacing: '2.2px',

      color: '#1d4ed8',

      fontWeight: '900',

      textShadow:
        '0 1px 8px rgba(37,99,235,0.12)',

      marginBottom: '16px',
    }}
  >
    <span
      aria-hidden='true'
      style={{
        width: '28px',

        height: '3px',

        borderRadius: '999px',

        background:
          'linear-gradient(90deg,#38bdf8 0%,#2563eb 100%)',

        boxShadow:
          '0 0 10px rgba(37,99,235,0.22)',

        flexShrink: 0,
      }}
    />

    {t.calcDetails}
  </div>

  <div
    style={{
      display: 'grid',

      gridTemplateColumns:
        isMobile
          ? '1fr'
          : '1fr 1fr 1fr 1fr',

      gap: '14px',
    }}
  >
    <div
      style={
        calculatorLanguage === 'RU'
          ? russianDetailCardStyle
          : detailCardStyle
      }
    >
      {t.thicknessLabel}:
      <strong
  style={{
    color: '#ffffff',

    marginLeft: '6px',

    fontWeight: '800',
  }}
>
        {' '}
        {thickness || '--'} mm
      </strong>
    </div>

    <div
      style={
        calculatorLanguage === 'RU'
          ? russianDetailCardStyle
          : detailCardStyle
      }
    >
      {t.lengthLabel}:
      <strong
  style={{
    color: '#ffffff',

    marginLeft: '6px',

    fontWeight: '800',
  }}
>
        {' '}
        {length || '--'} mm
      </strong>
    </div>

    <div
      style={
        calculatorLanguage === 'RU'
          ? russianDetailCardStyle
          : detailCardStyle
      }
    >
      {t.vdieLabel}:
      <strong
  style={{
    color: '#ffffff',

    marginLeft: '6px',

    fontWeight: '800',
  }}
>
        {' '}
        {vDie || '--'} mm
      </strong>
    </div>

    <div
      style={
        calculatorLanguage === 'RU'
          ? russianDetailCardStyle
          : detailCardStyle
      }
    >
      {t.materialFactor}:
      <strong
  style={{
    color: '#ffffff',

    marginLeft: '6px',

    fontWeight: '800',
  }}
>
        {' '}
        {
          materialFactors[
            material
          ]
        }
      </strong>
    </div>
  </div>
</div>

<div
  style={{
    marginTop: '20px',

    padding: '18px',

    borderRadius: '24px',

    background:
`
radial-gradient(
circle at top left,
rgba(96,165,250,0.22),
transparent 35%
),

linear-gradient(
145deg,
#0b1f3f 0%,
#12366e 48%,
#1d4ed8 100%
)
`,

    border:
      '1px solid rgba(147,197,253,0.22)',

    color: '#dbeafe',

    boxShadow:
      '0 14px 38px rgba(37,99,235,0.18)',
  }}
>
  <div
    style={{
      fontSize: '14px',

      letterSpacing: '2px',

      color: '#bfdbfe',

      marginBottom: '16px',

      fontWeight: '800',

      wordBreak: 'break-word',

      overflowWrap: 'anywhere',
    }}
  >
    {t.springbackTitle}
  </div>

  <div
    style={{
      display: 'grid',

      gridTemplateColumns:
        isMobile
          ? '1fr'
          : '1fr 1fr',

      gap: '14px',
    }}
  >
    <div style={springbackCardStyle}>
      {t.estimatedSpringback}:
      <strong
        style={{
          color: '#ffffff',

          marginLeft: '6px',

          fontWeight: '900',

          wordBreak: 'break-word',

          overflowWrap: 'anywhere',
        }}
      >
        {' '}
        {estimatedSpringbackValue}
      </strong>
    </div>

    <div style={springbackCardStyle}>
      {t.suggestedBendAngle}:
      <strong
        style={{
          color: '#ffffff',

          marginLeft: '6px',

          fontWeight: '900',

          wordBreak: 'break-word',

          overflowWrap: 'anywhere',
        }}
      >
        {' '}
        {suggestedBendAngleValue}
      </strong>
    </div>
  </div>

  <div
    style={{
      marginTop: '14px',

      color: '#bfdbfe',

      fontSize: '13px',

      lineHeight: '1.7',

      wordBreak: 'normal',

      overflowWrap: 'anywhere',

      whiteSpace: 'normal',
    }}
  >
    {t.springbackNote}
  </div>

  <div
    style={{
      marginTop: '8px',

      color: '#dbeafe',

      fontSize: '12px',

      lineHeight: '1.6',

      wordBreak: 'normal',

      overflowWrap: 'anywhere',

      whiteSpace: 'normal',
    }}
  >
    {t.springbackLengthNote}
  </div>
</div>

<button
  onClick={downloadPDF}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      'translateY(-3px)'

    e.currentTarget.style.boxShadow =
      '0 20px 40px rgba(37,99,235,0.35)'
  }}

  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      'translateY(0px)'

    e.currentTarget.style.boxShadow =
      '0 12px 35px rgba(37,99,235,0.28)'
  }}

  style={{
    width: '100%',
    height: '54px',
    marginTop: '20px',
    border: 'none',
    borderRadius: '22px',

    background:
      'linear-gradient(135deg,#1e3a8a 0%,#2563eb 45%,#60a5fa 100%)',

    color: '#fff',

    fontSize: '18px',

    fontWeight: '700',

    cursor: 'pointer',

    transition: 'all 0.25s ease',

    transform: 'translateY(0px)',

    boxShadow:
      '0 12px 35px rgba(37,99,235,0.28)',

    position: 'relative',

    overflow: 'hidden',
  }}
>
  <span
    style={{
      position: 'relative',
      zIndex: 2,
    }}
  >
    {t.downloadPdf}
  </span>

  <div
    style={{
      position: 'absolute',
      top: 0,
      left: '-40%',
      width: '30%',
      height: '100%',

      background:
        'linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)',

      transform: 'skewX(-25deg)',

      animation:
        'titleScan 3s linear infinite',
    }}
  />
</button>

        {/* WhatsApp */}
        <a
          href='https://wa.me/8613813072498'
          target='_blank'
          rel='noopener noreferrer'
          style={{
            textDecoration: 'none',
          }}
        >
          <button
          onMouseEnter={(e) => {
  e.currentTarget.style.transform =
    'translateY(-3px)'
  e.currentTarget.style.boxShadow =
    '0 20px 40px rgba(34,197,94,0.45)'
}}

onMouseLeave={(e) => {
  e.currentTarget.style.transform =
    'translateY(0px)'
  e.currentTarget.style.boxShadow =
    '0 12px 35px rgba(34,197,94,0.38)'
}}
            style={{
              width: '100%',
              height: '54px',
              marginTop: '20px',
              border: 'none',
              borderRadius: '22px',
              background:
                'linear-gradient(135deg,#16a34a 0%,#22c55e 45%,#4ade80 100%)',
              color: '#fff',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
transform: 'translateY(0px)',
              boxShadow:
                '0 12px 35px rgba(34,197,94,0.38)',
                position: 'relative',
overflow: 'hidden',
            }}
          >
            <span
  style={{
    position: 'relative',
    zIndex: 2,
  }}
>
  {t.whatsapp}
</span>

<div
  style={{
    position: 'absolute',
    top: 0,
    left: '-40%',
    width: '30%',
    height: '100%',
    background:
      'linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)',
    transform: 'skewX(-25deg)',
    animation:
      'titleScan 3s linear infinite',
  }}
/>
          </button>
        </a>

        <section
          aria-labelledby='press-brake-engineering-overview'
          style={{
            marginTop: '24px',
            padding: isMobile ? '20px' : '24px 26px',
            border: '1px solid rgba(59,130,246,0.26)',
            borderRadius: '24px',
            background:
              isExportingPDF
                ? '#f8fbff'
                : 'linear-gradient(145deg,rgba(248,250,252,0.94),rgba(219,234,254,0.82))',
            boxShadow:
              isExportingPDF
                ? '0 8px 18px rgba(15,23,42,0.08)'
                : '0 18px 48px rgba(15,23,42,0.22), inset 0 1px 0 rgba(255,255,255,0.8)',
            backdropFilter:
              isExportingPDF
                ? 'none'
                : 'blur(18px)',
          }}
        >
          <h2
            id='press-brake-engineering-overview'
            style={{
              margin: '0 0 10px',
              color: '#1e3a8a',
              fontSize: isMobile ? '20px' : '22px',
              lineHeight: 1.28,
              fontWeight: 850,
            }}
          >
            {t.engineeringOverviewTitle}
          </h2>

          <p
            style={{
              maxWidth: '960px',
              margin: 0,
              color: '#334155',
              fontSize: isMobile ? '14px' : '15px',
              lineHeight: 1.72,
              fontWeight: 650,
            }}
          >
            {t.engineeringOverviewText}
          </p>
        </section>

        <section
          aria-labelledby='press-brake-related-tools'
          style={{
            marginTop: '16px',
            padding: isMobile ? '18px' : '20px 22px',
            border: '1px solid rgba(59,130,246,0.24)',
            borderRadius: '24px',
            background:
              isExportingPDF
                ? '#f8fbff'
                : 'linear-gradient(145deg,rgba(239,246,255,0.92),rgba(191,219,254,0.68))',
            boxShadow:
              isExportingPDF
                ? '0 8px 18px rgba(15,23,42,0.08)'
                : '0 14px 38px rgba(15,23,42,0.18), inset 0 1px 0 rgba(255,255,255,0.72)',
            backdropFilter:
              isExportingPDF
                ? 'none'
                : 'blur(18px)',
          }}
        >
          <h2
            id='press-brake-related-tools'
            style={{
              margin: '0 0 14px',
              color: '#1e3a8a',
              fontSize: isMobile ? '19px' : '21px',
              lineHeight: 1.28,
              fontWeight: 850,
            }}
          >
            {t.relatedEngineeringToolsTitle}
          </h2>

          <nav
            aria-label={t.relatedEngineeringToolsTitle}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile
                ? '1fr'
                : 'repeat(6, minmax(0, 1fr))',
              gap: '10px',
            }}
          >
            {relatedEngineeringTools.map((tool) => (
              <a
                href={tool.href}
                key={tool.labelKey}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    'translateY(-4px)'
                  e.currentTarget.style.boxShadow =
                    '0 14px 30px rgba(56,189,248,0.22), 0 7px 22px rgba(2,8,23,0.22)'
                  e.currentTarget.style.borderColor =
                    'rgba(125,211,252,0.7)'
                  e.currentTarget.style.color =
                    '#ffffff'
                  e.currentTarget.style.background =
                    'rgba(37,99,235,0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    'translateY(0px)'
                  e.currentTarget.style.boxShadow =
                    '0 8px 20px rgba(37,99,235,0.28)'
                  e.currentTarget.style.borderColor =
                    'rgba(147,197,253,0.38)'
                  e.currentTarget.style.color =
                    '#dbeafe'
                  e.currentTarget.style.background =
                    'rgba(30,64,175,0.32)'
                }}
                style={{
                  minHeight: '42px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'border-box',
                  padding: '0 14px',
                  border: '1px solid rgba(147,197,253,0.38)',
                  borderRadius: '14px',
                  background: 'rgba(30,64,175,0.32)',
                  color: '#dbeafe',
                  fontSize: isMobile ? '14px' : '13px',
                  fontWeight: 850,
                  lineHeight: 1.25,
                  textDecoration: 'none',
                  textAlign: 'center',
                  boxShadow: 'none',
                  transform: 'translateY(0px)',
                  transition:
                    'all 0.25s ease',
                  overflowWrap: 'anywhere',
                }}
              >
                {t.relatedTools[tool.labelKey] ||
                  relatedToolFallbackLabels[relatedToolLanguage]?.[
                    tool.labelKey
                  ] ||
                  relatedToolFallbackLabels.en[tool.labelKey]}
              </a>
            ))}
          </nav>
        </section>
      </div>
    </div>
  </>
)
}

const fieldWrap = {
display: 'flex',
flexDirection: 'column',
gap: '8px',
}

const labelStyle = {
fontSize: '12px',
fontWeight: '700',
letterSpacing: '1.5px',
color: '#64748b',
paddingLeft: '6px',
}
const featureStyle = {
  background:
    'linear-gradient(145deg,rgba(255,255,255,0.12),rgba(255,255,255,0.05))',

  border:
    '1px solid rgba(255,255,255,0.12)',

  borderRadius: '18px',

  padding: '18px',

  textAlign: 'center',

  color: '#ffffff',

  fontSize: '15px',

  fontWeight: '700',

  backdropFilter: 'blur(12px)',

  boxShadow:
    '0 10px 30px rgba(0,0,0,0.18)',

  transform:
    'translateY(0px)',

  transition:
    'all 0.25s ease',
    wordBreak: 'break-word',

overflowWrap: 'break-word',

whiteSpace: 'normal',

lineHeight: '1.4',
}

const machineAdvisoryStyle = {
  marginTop: '18px',

  padding: '14px 16px',

  borderRadius: '18px',

  background:
    'linear-gradient(145deg,rgba(96,165,250,0.14),rgba(255,255,255,0.06))',

  border:
    '1px solid rgba(147,197,253,0.16)',

  color: '#bfdbfe',

  fontSize: '13px',

  fontWeight: '600',

  lineHeight: '1.65',

  boxShadow: 'none',

  wordBreak: 'normal',

  overflowWrap: 'anywhere',

  whiteSpace: 'normal',
}

const inputStyle = {
  height: '58px',
  lineHeight: 'normal',

paddingTop: '16px',

paddingBottom: '16px',

  borderRadius: '18px',

  border:
    '1px solid rgba(147,197,253,0.34)',

  paddingLeft: '22px',

  paddingRight: '54px',

  fontSize: '16px',

  fontWeight: '600',

  width: '100%',

  boxSizing: 'border-box',

  background:
    'linear-gradient(180deg,#ffffff 0%,#fbfdff 100%)',

  backdropFilter: 'blur(10px)',

  color: '#0b1f3f',

  outline: 'none',

  transition: 'all 0.25s ease',

  boxShadow:
    '0 10px 24px rgba(15,23,42,0.06), inset 0 1px 0 rgba(255,255,255,0.96), inset 0 -10px 24px rgba(219,234,254,0.18)',

  transform: 'translateY(0px)',

  willChange: 'transform',

  caretColor: '#2563eb',

  appearance: 'none',

  WebkitAppearance: 'none',

  MozAppearance: 'none',

}
const pdfInputStyle = {
  ...inputStyle,

  background: '#ffffff',

  border:
    '1px solid rgba(96,165,250,0.48)',

  boxShadow:
    '0 4px 12px rgba(15,23,42,0.08)',

  backdropFilter: 'none',
}
const inputWrapStyle = {
  position: 'relative',
  width: '100%',
}

const unitStyle = {
  position: 'absolute',
  right: '18px',
  top: '50%',
  transform: 'translateY(-50%)',

  color: '#334155',

  fontSize: '14px',

  fontWeight: '800',

  pointerEvents: 'none',

  letterSpacing: '1px',
}
const detailCardStyle = {
  background:
    'linear-gradient(180deg,#183153 0%,#102544 100%)',

  border:
    '1px solid rgba(147,197,253,0.18)',

  borderRadius: '18px',

  padding: '18px',

  fontSize: '15px',

  fontWeight: '600',

  color: '#e2e8f0',

  boxShadow:
    '0 8px 24px rgba(0,0,0,0.18)',

  backdropFilter: 'blur(4px)',

  lineHeight: '1.6',
}

const russianDetailCardStyle = {
  ...detailCardStyle,

  display: 'flex',

  alignItems: 'center',

  justifyContent: 'center',

  flexWrap: 'wrap',

  textAlign: 'center',

  lineHeight: '1.45',

  whiteSpace: 'normal',

  wordBreak: 'normal',

  overflowWrap: 'anywhere',
}

const springbackCardStyle = {
  background:
    'linear-gradient(180deg,rgba(30,64,120,0.72) 0%,rgba(29,78,216,0.30) 100%)',

  border:
    '1px solid rgba(191,219,254,0.2)',

  borderRadius: '18px',

  padding: '18px',

  fontSize: '15px',

  fontWeight: '700',

  color: '#dbeafe',

  boxShadow: 'none',

  backdropFilter: 'none',

  lineHeight: '1.6',

  wordBreak: 'normal',

  overflowWrap: 'anywhere',

  whiteSpace: 'normal',
}
