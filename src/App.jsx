import {
  useState,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import CountUp from 'react-countup'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export default function App() {
  const [isMobile, setIsMobile] =
  useState(
    typeof window !== 'undefined'
      ? window.innerWidth < 900
      : false
  )

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
    '1px solid #3b82f6'

  e.target.style.boxShadow =
`
0 0 0 4px rgba(59,130,246,0.15),
0 0 25px rgba(59,130,246,0.15),
`

e.target.style.transform =
  'translateY(-2px)'
}

const handleBlur = (e) => {
  e.target.style.border =
    '1px solid rgba(148,163,184,0.25)'

  e.target.style.boxShadow =
  '0 6px 18px rgba(15,23,42,0.05)'

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
const [language, setLanguage] = useState('EN')

const thicknessRef = useRef(null)

const lengthRef = useRef(null)

const vdieRef = useRef(null)

const materialRef = useRef(null)

const [thickness, setThickness] =
  useState('')

const [length, setLength] =
  useState('')

const [material, setMaterial] =
  useState('mildSteel')
const [isExportingPDF, setIsExportingPDF] =
  useState(false)
// 手动V槽
const [customVdie, setCustomVdie] =
  useState('')

// 自动推荐V槽
const getVdie = (t) => {
  const T = Number(t)

  if (T < 8) return T * 8

  if (T < 25) return T * 10

  return T * 12
}

// 推荐V槽（固定显示）
const recommendedVdie =
  thickness !== ''
    ? getVdie(Number(thickness))
    : ''

// 实际计算V槽
const vDie =
  customVdie !== ''
    ? Number(customVdie)
    : recommendedVdie || ''

  // 材料系数
  const materialFactors = {
    mildSteel: 1,
    galvanizedSteel: 1.05,
    stainless201: 1.76,
    stainless304: 1.62,
    aluminum: 0.65,
    brass: 0.6,
  }

  // 折弯力计算
  const calculateForce = () => {
    const T = Number(thickness)
    const L = Number(length)
    const V = Number(vDie)

    if (!T || !L || !V) return 0

    const factor =
      materialFactors[material] || 1

    const tonnage =
      (1.34 *
        T *
        T *
        L *
        factor) /
      V /
      20

    return Number(tonnage.toFixed(2))
  }

  // 自动实时计算
  const tonnage = useMemo(() => {
  return calculateForce()
}, [
  thickness,
  length,
  vDie,
  material,
])

  // 机型库
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

  // 多语言
  const texts = {
    EN: {
      title: 'ZYCO Press Brake Calculator',
      subtitle:
        'Professional Bending Force Calculation System',
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
materials: {
  mildSteel: 'Mild Steel',
  galvanizedSteel: 'Galvanized Steel',
  stainless201: 'Stainless 201',
  stainless304: 'Stainless 304',
  aluminum: 'Aluminum',
  brass: 'Brass',
},

downloadPdf:
  'DOWNLOAD PDF REPORT',
    },

    CN: {
      title: 'ZYCO折弯机计算器',
      subtitle: '专业力弯曲计算系统',
      result: '计算结果',
      machine: '推荐型号',
      vdie: '推荐V型模具',
      whatsapp: 'WhatsApp 联系方式',
      custom: '定制机型',
      ton: '吨',
      diagram: '折弯机示意图',
      thickness: '板厚 (mm)',
      length: '折弯长度 (mm)',
      thicknessLabel: '板厚',
lengthLabel: '长度',
vdieLabel: 'V槽',
materialLabel: '材料',

systemOnline: '系统运行中',

hybridServo: '电液伺服',
cncControl: '数控系统',
accuracy: '±0.01毫米',
energySaving: '高效节能',

calcDetails: '计算详情',

detailThickness: '板厚',
detailLength: '长度',
detailVdie: 'V槽',
materialFactor: '材料系数',
materials: {
  mildSteel: '普通钢',
  galvanizedSteel: '镀锌钢',
  stainless201: '201不锈钢',
  stainless304: '304不锈钢',
  aluminum: '铝',
  brass: '黄铜',
},
downloadPdf: '下载PDF报告',
    },

    RU: {
      title: 'Калькулятор листогиба ZYCO',
      subtitle:
        'Профессиональная система расчета усилия гибки',
      result: 'Результат',
      machine: 'Рекомендуемая модель',
      vdie: 'Рекомендуемый V-паз',
      whatsapp: 'WhatsApp',
      custom: 'Индивидуальная модель',
      ton: 'Тонн',
      diagram: 'СХЕМА ГИБКИ',
      thickness: 'Толщина (мм)',
      length: 'Длина (мм)',
      thicknessLabel: 'ТОЛЩИНА',
lengthLabel: 'ДЛИНА',
vdieLabel: 'V-ПАЗ',
materialLabel: 'МАТЕРИАЛ',

systemOnline: 'СИСТЕМА АКТИВНА',

hybridServo: 'Гибридный сервопривод',
cncControl: 'ЧПУ управление',
accuracy: '±0.01мм',
energySaving: 'Энергосбережение',

calcDetails: 'ДЕТАЛИ РАСЧЕТА',

detailThickness: 'Толщина',
detailLength: 'Длина',
detailVdie: 'V-Паз',
materialFactor: 'Коэффициент материала',
materials: {
  mildSteel: 'Углеродистая сталь',
  galvanizedSteel: 'Оцинкованная сталь',
  stainless201: 'Нерж. сталь 201',
  stainless304: 'Нерж. сталь 304',
  aluminum: 'Алюминий',
  brass: 'Латунь',
},
downloadPdf:
  'СКАЧАТЬ PDF ОТЧЕТ',
    },

    ES: {
      title: 'Calculadora de Plegado ZYCO',
      subtitle:
        'Sistema profesional de cálculo de fuerza',
      result: 'Resultado',
      machine: 'Máquina recomendada',
      vdie: 'Matriz V recomendada',
      whatsapp: 'WhatsApp',
      custom: 'Máquina personalizada',
      ton: 'Ton',
      diagram: 'DIAGRAMA DE PLEGADO',
      thickness: 'Espesor (mm)',
      length: 'Longitud (mm)',
      thicknessLabel: 'ESPESOR',
lengthLabel: 'LONGITUD',
vdieLabel: 'MATRIZ V',
materialLabel: 'MATERIAL',

systemOnline: 'SISTEMA EN LÍNEA',

hybridServo: 'Servo Híbrido',
cncControl: 'Control CNC',
accuracy: '±0.01mm',
energySaving: 'Ahorro de Energía',

calcDetails: 'DETALLES DE CÁLCULO',

detailThickness: 'Espesor',
detailLength: 'Longitud',
detailVdie: 'Matriz V',
materialFactor: 'Factor del Material',
materials: {
  mildSteel: 'Acero al carbono',
  galvanizedSteel: 'Acero galvanizado',
  stainless201: 'Acero inoxidable 201',
  stainless304: 'Acero inoxidable 304',
  aluminum: 'Aluminio',
  brass: 'Latón',
},
downloadPdf: 'DESCARGAR INFORME PDF',
    },

    TR: {
      title: 'ZYCO Abkant Hesaplayıcı',
      subtitle:
        'Profesyonel Bükme Kuvveti Hesaplama Sistemi',
      result: 'Sonuç',
      machine: 'Önerilen Makine',
      vdie: 'Önerilen V Kalıp',
      whatsapp: 'WhatsApp',
      custom: 'Özel Makine',
      ton: 'Ton',
      diagram: 'BÜKÜM ŞEMASI',
      thickness: 'Kalınlık (mm)',
      length: 'Uzunluk (mm)',
      thicknessLabel: 'KALINLIK',
lengthLabel: 'UZUNLUK',
vdieLabel: 'V KALIP',
materialLabel: 'MALZEME',

systemOnline: 'SİSTEM AKTİF',

hybridServo: 'Hibrit Servo',
cncControl: 'CNC Kontrol',
accuracy: '±0.01mm',
energySaving: 'Enerji Tasarrufu',

calcDetails: 'HESAPLAMA DETAYLARI',

detailThickness: 'Kalınlık',
detailLength: 'Uzunluk',
detailVdie: 'V Kalıp',
materialFactor: 'Malzeme Katsayısı',
materials: {
  mildSteel: 'Karbon Çelik',
  galvanizedSteel: 'Galvanizli Çelik',
  stainless201: 'Paslanmaz 201',
  stainless304: 'Paslanmaz 304',
  aluminum: 'Alüminyum',
  brass: 'Pirinç',
},
downloadPdf: 'PDF RAPORUNU İNDİR',
    },

    ID: {
      title: 'Kalkulator Press Brake ZYCO',
      subtitle:
        'Sistem Perhitungan Gaya Tekuk Profesional',
      result: 'Hasil',
      machine: 'Mesin Rekomendasi',
      vdie: 'V Die Rekomendasi',
      whatsapp: 'WhatsApp',
      custom: 'Mesin Khusus',
      ton: 'Ton',
      diagram: 'DIAGRAM TEKUK',
      thickness: 'Ketebalan (mm)',
      length: 'Panjang (mm)',
      thicknessLabel: 'KETEBALAN',
lengthLabel: 'PANJANG',
vdieLabel: 'V DIE',
materialLabel: 'MATERIAL',

systemOnline: 'SISTEM AKTIF',

hybridServo: 'Servo Hybrid',
cncControl: 'Kontrol CNC',
accuracy: '±0.01mm',
energySaving: 'Hemat Energi',

calcDetails: 'DETAIL PERHITUNGAN',

detailThickness: 'Ketebalan',
detailLength: 'Panjang',
detailVdie: 'V Die',
materialFactor: 'Faktor Material',
materials: {
  mildSteel: 'Baja Ringan',
  galvanizedSteel: 'Baja Galvanis',
  stainless201: 'Stainless 201',
  stainless304: 'Stainless 304',
  aluminum: 'Aluminium',
  brass: 'Kuningan',
},
downloadPdf: 'UNDUH LAPORAN PDF',
    },
  }

  const t = texts[language]
const titleFontSize = {
  EN: isMobile ? '28px' : '52px',
  CN: isMobile ? '30px' : '52px',
  ES: isMobile ? '24px' : '42px',
  RU: isMobile ? '22px' : '40px',
  TR: isMobile ? '24px' : '42px',
  ID: isMobile ? '24px' : '42px',
}
  // 推荐机型
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

    if (
      ton >= Number(tonnage) &&
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
`
const svgAnimationPlayState =
  isExportingPDF
    ? 'paused'
    : 'running'
const downloadPDF = async () => {
  try {
    setIsExportingPDF(true)

    await new Promise((resolve) =>
      setTimeout(resolve, 300)
    )

    // 修复输入框文字位置
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

const pdf = new jsPDF(
  'p',
  'mm',
  'a4'
)

const pdfWidth =
  pdf.internal.pageSize.getWidth()

const pdfHeight =
  pdf.internal.pageSize.getHeight()

// 原始canvas尺寸
const imgWidth = canvas.width

const imgHeight = canvas.height

// 每页对应的canvas像素高度
const pageHeightPx = Math.floor(
  (imgWidth * pdfHeight) / pdfWidth
)

let renderedHeight = 0

let pageIndex = 0

while (pageIndex * pageHeightPx < imgHeight) {

  const pageCanvas =
    document.createElement('canvas')

  const pageCtx =
    pageCanvas.getContext('2d')

  pageCanvas.width = imgWidth

  pageCanvas.height = Math.min(
    pageHeightPx,
    imgHeight -
      pageIndex * pageHeightPx
  )

  pageCtx.fillStyle = '#ffffff'

  pageCtx.fillRect(
    0,
    0,
    pageCanvas.width,
    pageCanvas.height
  )

  pageCtx.drawImage(
    canvas,
    0,
    pageIndex * pageHeightPx,
    imgWidth,
    pageCanvas.height,
    0,
    0,
    imgWidth,
    pageCanvas.height
  )

  const imgData =
    pageCanvas.toDataURL(
      'image/png'
    )

  if (pageIndex > 0) {
    pdf.addPage()
  }

  const renderHeight =
    (pageCanvas.height *
      pdfWidth) /
    pageCanvas.width

  pdf.addImage(
    imgData,
    'PNG',
    0,
    0,
    pdfWidth,
    renderHeight,
    undefined,
    'FAST'
  )

  pageIndex++
}

// 创建分页canvas
const pageCanvas =
  document.createElement('canvas')

const pageCtx =
  pageCanvas.getContext('2d')


pdf.save(
  'ZYCO-Bending-Report.pdf'
)

    // 恢复样式
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
circle at 0% 0%,
rgba(59,130,246,0.16),
transparent 28%
),

radial-gradient(
circle at 100% 100%,
rgba(14,165,233,0.12),
transparent 32%
),

radial-gradient(
circle at 50% 20%,
rgba(96,165,250,0.10),
transparent 40%
),

linear-gradient(
180deg,
#f4f8ff 0%,
#e2e8f0 45%,
#dbeafe 100%
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
        rgba(255,255,255,0.06) 1px,
        transparent 1px
      ),
      linear-gradient(
        90deg,
        rgba(255,255,255,0.06) 1px,
        transparent 1px
      )
    `,
    backgroundSize: '40px 40px',
    opacity: 0.25,
    pointerEvents: 'none',
  }}
/>
      <div
  id='pdf-report'
style={{
  width: '100%',
  maxWidth: '1100px',
  boxSizing: 'border-box',
overflowX: 'hidden',
maxWidth: '100%',
    minWidth: 0,
  margin: '0 auto',
  boxSizing: 'border-box',
  overflow: 'visible',

  background: 'rgba(255,255,255,0.96)',

  borderRadius: isMobile
    ? '22px'
    : '32px',

  padding: isMobile
    ? '10px'
    : '18px',
          backdropFilter: 'blur(10px)',
          boxShadow:
`
0 30px 90px rgba(15,23,42,0.12),
0 0 0 1px rgba(255,255,255,0.45),
inset 0 1px 0 rgba(255,255,255,0.75)
`,
border:
  '1px solid rgba(255,255,255,0.65)',
        }}
      >
{/* 顶部 */}
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
    : '#eaf1ff',

  padding: '10px 18px',

  borderRadius: '999px',

  position: 'relative',

  zIndex: 2,

  boxShadow:
    isExportingPDF
      ? 'none'
      : '0 4px 15px rgba(59,130,246,0.08)',
}}
    >
      <div
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '999px',
          background: '#2563eb',
        }}
      />

      <span
        style={{
  fontSize: '14px',

  fontWeight: '700',

  color: '#1e3a8a',

  opacity: 1,

  position: 'relative',

  zIndex: 3,

  letterSpacing: '1px',
}}
      >
        ZYCO INDUSTRIAL SYSTEM
      </span>
    </div>

    {/* 标题扫描光 */}
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
  isExportingPDF
    ? 'none'
    : 'titleScan 4s linear infinite',
          pointerEvents: 'none',
        }}
      />

      <h1
        style={{
          fontSize: titleFontSize[language],

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
        'linear-gradient(180deg,#0f172a 0%,#2563eb 100%)',

      WebkitBackgroundClip:
        'text',

      WebkitTextFillColor:
        'transparent',
    }),

          textShadow:
            `
            0 2px 10px rgba(59,130,246,0.08),
            0 0 30px rgba(96,165,250,0.08)
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
  value={language}
  onChange={(e) =>
    setLanguage(e.target.value)
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

        {/* 输入区域 */}
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
'linear-gradient(180deg,#f8fbff 0%,#eef4ff 100%)',
            padding: '12px',
            borderRadius: '24px',
            border:
'1px solid rgba(148,163,184,0.15)',
boxShadow:
'0 10px 30px rgba(15,23,42,0.04)',
backdropFilter: 'blur(12px)',

          }}
        >
          <div style={fieldWrap}>
  <div style={labelStyle}>
  {t.thicknessLabel}
</div>

<div style={inputWrapStyle}>
  <input
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
    style={inputStyle}
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
    style={inputStyle}
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
    style={inputStyle}
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
  style={inputStyle}
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

        {/* 结果区域 */}
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
              display: 'grid',
              gridTemplateColumns:
  isMobile
    ? '1fr'
    : '1fr 1fr',
              gap: '30px',
            }}
          >
            {/* 左侧 */}
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
            </div>

            {/* 右侧 */}
            <div
              style={{
background:
'rgba(255,255,255,0.06)',

borderRadius: '24px',

padding: '16px',

boxShadow:
'inset 0 0 40px rgba(59,130,246,0.18),0 10px 30px rgba(0,0,0,0.18)',

border:
'1px solid rgba(148,163,184,0.15)',
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

              <svg
  width='100%'
  height={isMobile ? '220' : '280'}
  viewBox='0 0 500 420'
  style={{
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
{/* 左液压油缸 */}
<rect
  x='170'
  y='10'
  width='10'
  height='80'
  rx='4'
  fill='#94a3b8'
>
  <animate
    attributeName='height'
    values='80;92;80'
    dur='2.4s'
    repeatCount='indefinite'
    begin={
  isExportingPDF
    ? 'indefinite'
    : '0s'
}
  />
</rect>

{/* 右液压油缸 */}
<rect
  x='320'
  y='10'
  width='10'
  height='80'
  rx='4'
  fill='#94a3b8'
>
  <animate
    attributeName='height'
    values='80;92;80'
    dur='2.4s'
    repeatCount='indefinite'
  />
</rect>
{/* HUD扫描背景 */}
<rect
  x='0'
  y='0'
  width='500'
  height='420'
  fill='url(#scanGrid)'
  opacity='0.08'
/>
{/* 上模压板 */}
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
<animateTransform
  attributeName='transform'
  type='translate'
  values='0 0;0 14;0 0'
  dur='2.4s'
  repeatCount='indefinite'
  calcMode='spline'
  keySplines='0.42 0 0.2 1;0.42 0 0.58 1'
  keyTimes='0;0.55;1'
  begin={
  isExportingPDF
    ? 'indefinite'
    : '0s'
}
/>
</rect>

{/* 上模主体 */}
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
  <animateTransform
    attributeName='transform'
    type='translate'
    values='0 0;0 12;0 0'
    dur='2.4s'
    repeatCount='indefinite'
  />
</path>

{/* 上模高光 */}
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
  <animateTransform
    attributeName='transform'
    type='translate'
    values='0 0;0 12;0 0'
    dur='2.4s'
    repeatCount='indefinite'
  />
</line>

<rect
  x='120'
  y='188'
  width='260'
  height='3'
  fill='url(#scanLine)'
  opacity='0.8'
>

  <animate
    attributeName='y'
    values='188;215;188'
    dur='2.4s'
    repeatCount='indefinite'
  />

</rect>
{/* 板材 */}
{/* 板材弯曲动画 */}
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
</path>


{/* 下模主体 */}
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

{/* V槽深度 */}
<path
  d='
  M220 250
  L250 295
  L280 250
  '
  fill='#0f172a'
/>

{/* 下模顶部高光 */}
<line
  x1='180'
  y1='250'
  x2='320'
  y2='250'
  stroke='#cbd5e1'
  strokeWidth='3'
  opacity='0.6'
/>

{/* 下模底座 */}
<rect
  x='90'
  y='320'
  width='320'
  height='42'
  rx='10'
  fill='#334155'
/>

{/* 底座高光 */}
<rect
  x='100'
  y='327'
  width='300'
  height='3'
  rx='2'
  fill='#94a3b8'
  opacity='0.35'
/>

                {/* 压力箭头 */}
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
/></line>


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

<animate
 attributeName='opacity'
 values='0.4;1;0.4'
 dur='2.4s'
 repeatCount='indefinite'
/>

PRESS </text>



                {/* V槽文字 */}
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

                {/* 板厚 */}
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
                {/* 压力冲击波 */}
<circle
  cx='250'
  cy='210'
  r='8'
  fill='none'
  stroke='#60a5fa'
  strokeWidth='3'
  opacity='0.5'
>
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
</circle>
              </svg>
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
      fontSize: '14px',

      letterSpacing: '2px',

      color: '#93c5fd',

      marginBottom: '16px',
    }}
  >
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
    <div style={detailCardStyle}>
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

    <div style={detailCardStyle}>
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

    <div style={detailCardStyle}>
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

    <div style={detailCardStyle}>
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

const inputStyle = {
  height: '58px',
  lineHeight: 'normal',

paddingTop: '16px',

paddingBottom: '16px',

  borderRadius: '18px',

  border:
    '1px solid rgba(148,163,184,0.18)',

  paddingLeft: '22px',

  paddingRight: '54px',

  fontSize: '16px',

  fontWeight: '600',

  width: '100%',

  boxSizing: 'border-box',

  background:
    'linear-gradient(180deg,#ffffff 0%,#f1f5ff 100%)',

  backdropFilter: 'blur(10px)',

  color: '#0f172a',

  outline: 'none',

  transition: 'all 0.25s ease',

  boxShadow:
    '0 6px 18px rgba(15,23,42,0.05)',

  transform: 'translateY(0px)',

  willChange: 'transform',

  caretColor: '#2563eb',

  appearance: 'none',

  WebkitAppearance: 'none',

  MozAppearance: 'none',

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

  color: '#64748b',

  fontSize: '14px',

  fontWeight: '700',

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
