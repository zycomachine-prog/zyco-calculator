import { useEffect } from 'react'
import EngineeringCTA from '../components/EngineeringCTA.jsx'
import LanguageSwitcher from '../components/LanguageSwitcher.jsx'
import { getEngineeringText } from '../languages/engineeringText.js'
import { getSiteUrl, setPageSEO, setStructuredData } from '../utils/seo.js'

const routePath = '/engineering-tools/press-brake-controller-selection-guide'

const relatedTools = [
  ['pressBrakeCalculator', '/engineering-tools/press-brake-calculator'],
  ['pressBrakeTonnageGuide', '/engineering-tools/press-brake-tonnage-guide'],
  ['vDieOpeningGuide', '/engineering-tools/how-to-choose-press-brake-v-die-opening'],
  ['vDieSelectionTool', '/engineering-tools/v-die-selection'],
  ['springbackDatabase', '/engineering-tools/springback-database'],
  ['springbackCompensationGuide', '/engineering-tools/springback-compensation-guide'],
  ['bendSequenceGuide', '/engineering-tools/bend-sequence-guide'],
  ['crowningGuide', '/engineering-tools/press-brake-crowning-guide'],
  ['toolingSelectionGuide', '/engineering-tools/press-brake-tooling-selection-guide'],
]

const englishFaq = [
  ['What is the difference between NC and CNC press brake controllers?', 'NC controllers usually manage simpler positioning and angle data with limited automatic compensation. CNC controllers coordinate synchronized ram control, backgauge axes, crowning or deflection compensation, graphical programming and production data for more stable bending.'],
  ['How many axes does a CNC press brake controller need?', 'A practical CNC press brake commonly starts from Y1/Y2 plus X and R. Higher configurations add Z1/Z2, X2/R2 and CNC crowning when parts require multi-station backgauge positioning, longer bends or stronger process repeatability.'],
  ['Is 2D graphical programming enough for most users?', 'Yes. For many sheet metal factories, 2D drawing programming is enough for standard profiles, boxes, brackets, panels and mixed daily production when the machine configuration is correctly selected.'],
  ['When should I choose a 3D press brake controller?', 'Choose a 3D controller when complex parts, collision review, multi-bend visualization, CAD-driven programming or offline engineering workflow are more important than the lowest machine cost.'],
  ['Is EASYCAT ET18 suitable for export CNC press brakes?', 'Yes. ET18 is a practical export-ready CNC option with a 21.5-inch high-resolution touch screen, standard 4+1 axes, expansion up to 8+1 axes, 2D drawing programming and CAD import.'],
  ['How do EASYCAT ET16 and ET18 help control machine cost?', 'They provide practical CNC functionality and stable operation without forcing every project into a high-end 3D controller. This helps ZYCO match machine configuration, user skill level and budget more accurately.'],
  ['What is the difference between Delem DA53TX and DA58TX?', 'DA53TX is generally selected for compact CNC configurations and essential touch operation. DA58TX is a higher graphical step with stronger programming comfort for users who need more visual operation and flexibility.'],
  ['Should I choose the controller first or the press brake configuration first?', 'Start from the press brake configuration and application. Material, bend length, precision target, backgauge requirement, crowning need and programming workflow should decide the controller level.'],
]

const controllerRows = [
  ['EASYCAT', 'ET16', 'High-value CNC', 'Practical CNC axis control for standard machines', 'Touch CNC operation and 2D-oriented production', 'Practical production support', 'Cost-controlled CNC press brakes and export projects', 'High-value'],
  ['EASYCAT', 'ET18', 'Recommended advanced value CNC', 'Standard 4+1: Y1/Y2/X/R + crowning or deflection compensation; expandable to 8+1 axes', '21.5-inch high-resolution touch screen, 2D drawing programming', 'CAD import; suitable for higher-configuration CNC projects', 'Standard and higher-configuration CNC press brakes', 'High-value'],
  ['Delem', 'DA53TX', 'Compact CNC', 'Common Y1/Y2 and backgauge configurations', 'Touch CNC programming', 'Basic production workflow support', 'Reliable daily CNC bending', 'Mid'],
  ['Delem', 'DA58TX', 'Graphical CNC', 'Multi-axis CNC configurations', '2D graphical programming', 'Improved file and production workflow support', 'Factories needing stronger visual programming', 'Mid-high'],
  ['Delem', 'DA66S', 'Advanced CNC', 'Higher-axis machine configurations', 'Advanced 2D/3D-oriented programming workflow', 'CAD/offline-oriented workflow depending on package', 'Complex bending and flexible production', 'High'],
  ['Delem', 'DA69S', 'Premium CNC', 'Advanced multi-axis and high-end configurations', '3D graphical programming level', 'CAD and offline programming workflow', 'Complex parts, high-mix production and premium machines', 'Premium'],
  ['Cybelec', 'CT8', 'Entry CNC', 'Basic CNC axis configurations', 'Simple touch programming', 'Limited to practical daily workflow', 'Standard economical CNC press brakes', 'Mid'],
  ['Cybelec', 'CT12', 'Graphical CNC', 'Multi-axis CNC configurations', '2D graphical programming', 'Practical CAD/programming workflow depending on setup', 'General CNC production with better visualization', 'Mid-high'],
  ['Cybelec', 'CT15', 'Advanced graphical CNC', 'Higher-axis configurations', 'Advanced graphical programming', 'CAD/offline workflow depending on package', 'Complex profiles and flexible production', 'High'],
  ['ESA', 'ESA630', 'Entry CNC', 'Standard CNC machine axes', 'Practical CNC programming', 'Basic support depending on setup', 'Standard CNC bending', 'Mid'],
  ['ESA', 'ESA640', 'Mid CNC', 'Standard to mid CNC axes', 'Graphical CNC operation', 'Practical support depending on setup', 'General production machines', 'Mid'],
  ['ESA', 'ESA650', 'Mid-high CNC', 'Expanded CNC configurations', 'Improved graphical programming', 'CAD support depending on package', 'Flexible production', 'Mid-high'],
  ['ESA', 'ESA660', 'Advanced CNC', 'Higher-axis CNC configurations', 'Advanced graphical programming', 'CAD/offline support depending on package', 'Complex bending and better productivity', 'High'],
  ['ESA', 'ESA840', 'Advanced CNC', 'Multi-axis CNC machines', 'Advanced visual programming', 'CAD/offline support depending on package', 'Higher-end CNC press brakes', 'High'],
  ['ESA', 'ESA850', 'Advanced CNC', 'Multi-axis and automation-ready configurations', 'Advanced graphical workflow', 'CAD/offline support depending on package', 'High-mix production and advanced machines', 'High'],
  ['ESA', 'ESA860', 'High-end CNC', 'Advanced multi-axis CNC configurations', 'High-end graphical programming', 'CAD/offline support depending on package', 'Complex parts and production data workflow', 'Premium'],
  ['ESA', 'ESA875', 'Premium CNC', 'High-end multi-axis configurations', 'Premium graphical programming', 'CAD/offline support depending on package', 'Advanced industrial CNC press brakes', 'Premium'],
  ['ESA', 'ESA890', 'Premium 3D CNC', 'High-end multi-axis configurations', '3D programming level', 'CAD/offline programming workflow', 'Premium complex-part production', 'Premium'],
]

const baseContent = {
  en: {
    back: 'Back to Engineering Tools',
    eyebrow: 'Engineering Guide',
    title: 'Press Brake Controller Selection Guide: NC vs CNC, Axis Control, 2D/3D Programming and Cost Control',
    subtitle: 'Choose press brake controllers by machine configuration, axis quantity, programming workflow, stability, application scenario and machine cost control.',
    seoTitle: 'Press Brake Controller Selection Guide | EASYCAT, Delem, Cybelec & ESA Comparison',
    seoDescription: 'Learn how to choose the right press brake controller based on axis configuration, 2D/3D programming, offline software, stability, machine cost control and bending applications. Compare EASYCAT ET16/ET18, Delem, Cybelec and ESA CNC systems.',
    keywords: 'press brake controller selection, NC vs CNC press brake, EASYCAT ET16, EASYCAT ET18, Delem DA53TX, Delem DA58TX, Cybelec CT12, ESA press brake controller',
    labels: {
      quickAnswer: 'Quick Answer: Which Controller Should You Choose?',
      logic: 'Start From Machine Configuration, Not Brand Name',
      ncCnc: 'NC vs CNC Press Brake Controllers',
      axes: 'Understanding Press Brake Axis Control',
      easycat: 'Recommended Cost-Effective CNC Options: EASYCAT ET16 and ET18',
      comparison: 'Controller Comparison: EASYCAT vs Delem vs Cybelec vs ESA',
      delem: 'Delem Controller Selection',
      cybelec: 'Cybelec Controller Selection',
      esa: 'ESA Controller Selection',
      scenarios: 'Controller Recommendations by Application Scenario',
      mistakes: 'Common Mistakes When Choosing a Press Brake Controller',
      advice: 'Practical Buying Advice from ZYCO',
      faq: 'Frequently Asked Questions',
      related: 'Related Engineering Tools',
    },
    quickHeaders: ['Production need', 'Recommended controller level', 'Suggested models'],
    comparisonHeaders: ['Brand', 'Model', 'Suggested level', 'Axis capability', 'Programming level', 'CAD / offline support', 'Best application', 'Cost position'],
    scenarioHeaders: ['Application scenario', 'Recommended controller type', 'Recommended models', 'Why it fits'],
    intro: [
      'The best controller is not the most expensive screen on the market. It is the controller that matches the press brake structure, axis package, operator workflow, part complexity and target selling price.',
      'For ZYCO projects, controller selection is part of machine engineering. Y1/Y2 synchronization, X/R backgauge, Z1/Z2 fingers, X2/R2 independent movement and CNC crowning should be selected before comparing brands.',
    ],
    quickRows: [
      ['Simple positioning and low-cost bending', 'NC or entry CNC', 'Basic NC, CT8, ESA630'],
      ['Standard export CNC press brake', 'Cost-effective CNC with Y1/Y2/X/R and compensation', 'EASYCAT ET16, EASYCAT ET18, DA53TX'],
      ['Daily mixed sheet metal production', '2D graphical CNC', 'EASYCAT ET18, DA58TX, CT12, ESA650'],
      ['Complex parts and offline workflow', 'Advanced 2D / 3D CNC', 'DA66S, DA69S, CT15, ESA860, ESA890'],
      ['Premium automation and high-mix production', 'High-end multi-axis CNC', 'DA69S, ESA875, ESA890'],
    ],
    logic: [
      'Begin with the required machine configuration: bending length, tonnage, hydraulic synchronization, backgauge travel, crowning method, tooling plan and production mix.',
      'After the machine configuration is clear, choose the controller level that can actually use those axes and functions. A high-end controller cannot compensate for a machine that lacks the required axis hardware, while an entry controller can limit a well-equipped machine.',
    ],
    ncCncCards: [
      ['NC controllers', 'Best for simple, repeatable bending where cost is critical and axis demand is limited. They reduce machine price but provide less process guidance and automation.'],
      ['CNC controllers', 'Recommended when synchronized Y1/Y2, backgauge axes, compensation, program storage, graphical programming and repeatable batch control matter.'],
      ['2D CNC', 'A strong practical choice for most factories because operators can draw profiles, check bend steps and produce standard parts without a full 3D workflow.'],
      ['3D CNC', 'Best for complex parts, collision review, CAD-driven process planning and factories that value offline programming efficiency over initial machine cost.'],
    ],
    axes: [
      ['Y1/Y2', 'Independent left and right ram synchronization for accurate CNC bending.'],
      ['X', 'Backgauge depth positioning for flange size control.'],
      ['R', 'Backgauge height adjustment for different bend stations and part geometries.'],
      ['Z1/Z2', 'Movable backgauge fingers for wide, tapered or multi-station parts.'],
      ['X2/R2', 'Independent second backgauge axes for asymmetric positioning and advanced parts.'],
      ['Crowning', 'CNC crowning or deflection compensation keeps long bends more consistent along the length.'],
    ],
    easycat: [
      'ZYCO recommends EASYCAT ET16 and ET18 as high-value CNC controller options when the project needs stable CNC functionality, export-ready operation and careful machine cost control.',
      'EASYCAT ET18 is especially suitable for standard and higher-configuration CNC press brake projects: standard 4+1 axes, expandable up to 8+1 axes, 21.5-inch high-resolution touch screen, 2D drawing programming and CAD import.',
    ],
    brandSections: {
      delem: [
        ['DA53TX', 'Compact CNC choice for standard synchronized press brakes and practical daily production.'],
        ['DA58TX', 'Better graphical programming comfort for factories that want stronger 2D operation.'],
        ['DA66S', 'Advanced CNC level for higher-configuration machines and more flexible programming.'],
        ['DA69S', 'Premium 3D-oriented choice for complex parts, offline workflow and high-end CNC machines.'],
      ],
      cybelec: [
        ['CT8', 'Entry CNC option for economical standard configurations.'],
        ['CT12', 'Graphical CNC option for broader daily production and clearer 2D operation.'],
        ['CT15', 'Advanced graphical CNC option for more complex bending and higher productivity.'],
      ],
      esa: [
        ['ESA630 / ESA640', 'Practical CNC levels for standard machine configurations.'],
        ['ESA650 / ESA660', 'Mid to advanced CNC options for expanded axes and stronger graphical workflow.'],
        ['ESA840 / ESA850', 'Advanced controller levels for higher-configuration CNC projects.'],
        ['ESA860 / ESA875 / ESA890', 'High-end and premium selections for complex parts, multi-axis machines and 3D/offline-oriented workflows.'],
      ],
    },
    scenarioRows: [
      ['Low-cost standard bending', 'NC or entry CNC', 'CT8, ESA630, basic NC', 'Keeps machine price low when part complexity and axis demand are limited.'],
      ['Cost-controlled export CNC press brake', 'High-value CNC', 'EASYCAT ET16, EASYCAT ET18', 'Balances stable CNC functionality, practical programming and machine cost control.'],
      ['General cabinet, bracket and panel production', '2D graphical CNC', 'EASYCAT ET18, DA58TX, CT12, ESA650', '2D drawing programming covers most common profiles efficiently.'],
      ['Long bends requiring angle consistency', 'CNC with crowning or compensation', 'EASYCAT ET18, DA66S, ESA850', 'Y1/Y2 plus compensation improves repeatability across the bending length.'],
      ['Complex high-mix production', 'Advanced 3D / offline CNC', 'DA69S, ESA875, ESA890', '3D visualization and offline workflow reduce setup risk for complex jobs.'],
    ],
    mistakes: [
      'Selecting a controller by brand before defining the machine axis package.',
      'Buying a 3D controller for simple parts where 2D CNC would control cost better.',
      'Ignoring crowning control on long-bed machines and high-tonnage bending.',
      'Underestimating Z1/Z2, X2/R2 and backgauge needs for complex or asymmetric parts.',
      'Forgetting operator skill level, language workflow, service access and program storage requirements.',
    ],
    advice: [
      'For standard CNC press brakes, first confirm Y1/Y2/X/R and whether CNC crowning is required.',
      'For many export projects, EASYCAT ET16 or ET18 offers a practical balance between CNC capability, stability and machine cost.',
      'Use DA69S, ESA875, ESA890 or similar high-end controllers when 3D programming, CAD/offline workflow and complex bend planning are essential to the customer.',
    ],
    faq: englishFaq,
  },
}

const localizedText = {
  zh: {
    back: '返回工程工具',
    eyebrow: '工程指南',
    subtitle: '根据机器配置、轴数、编程方式、稳定性、应用场景和机器成本控制选择折弯机控制系统。',
    labels: {
      quickAnswer: '快速建议：应该选择哪种控制系统？',
      logic: '从机器配置开始，而不是先看品牌',
      ncCnc: 'NC 与 CNC 折弯机控制系统',
      axes: '理解折弯机轴控制',
      easycat: '高性价比 CNC 推荐：EASYCAT ET16 和 ET18',
      comparison: '控制系统对比：EASYCAT、Delem、Cybelec、ESA',
      delem: 'Delem 控制系统选择',
      cybelec: 'Cybelec 控制系统选择',
      esa: 'ESA 控制系统选择',
      scenarios: '按应用场景推荐控制系统',
      mistakes: '选择控制系统的常见错误',
      advice: 'ZYCO 实用采购建议',
      faq: '常见问题',
      related: '相关工程工具',
    },
  },
  ru: {
    back: 'Назад к инженерным инструментам',
    eyebrow: 'Инженерное руководство',
    subtitle: 'Выбирайте контроллер по конфигурации станка, числу осей, программированию, стабильности, применению и контролю стоимости.',
    labels: {
      quickAnswer: 'Краткий ответ: какой контроллер выбрать?',
      logic: 'Начинайте с конфигурации станка, а не с бренда',
      ncCnc: 'NC и CNC контроллеры листогиба',
      axes: 'Понимание осей листогибочного пресса',
      easycat: 'Экономичные CNC варианты: EASYCAT ET16 и ET18',
      comparison: 'Сравнение контроллеров: EASYCAT, Delem, Cybelec, ESA',
      delem: 'Выбор контроллеров Delem',
      cybelec: 'Выбор контроллеров Cybelec',
      esa: 'Выбор контроллеров ESA',
      scenarios: 'Рекомендации по сценариям применения',
      mistakes: 'Типичные ошибки выбора контроллера',
      advice: 'Практические советы ZYCO',
      faq: 'Частые вопросы',
      related: 'Связанные инженерные инструменты',
    },
  },
  es: {
    back: 'Volver a herramientas de ingeniería',
    eyebrow: 'Guía de ingeniería',
    subtitle: 'Seleccione el control por configuración de máquina, ejes, programación, estabilidad, aplicación y control del costo.',
    labels: {
      quickAnswer: 'Respuesta rápida: ¿qué control elegir?',
      logic: 'Empiece por la configuración de la máquina, no por la marca',
      ncCnc: 'Controles NC y CNC para plegadora',
      axes: 'Comprender el control de ejes',
      easycat: 'Opciones CNC rentables: EASYCAT ET16 y ET18',
      comparison: 'Comparación: EASYCAT, Delem, Cybelec y ESA',
      delem: 'Selección de controles Delem',
      cybelec: 'Selección de controles Cybelec',
      esa: 'Selección de controles ESA',
      scenarios: 'Recomendaciones por aplicación',
      mistakes: 'Errores comunes al elegir un control',
      advice: 'Consejos prácticos de ZYCO',
      faq: 'Preguntas frecuentes',
      related: 'Herramientas relacionadas',
    },
  },
  tr: {
    back: 'Mühendislik araçlarına dön',
    eyebrow: 'Mühendislik kılavuzu',
    subtitle: 'Kontrol sistemi seçimini makine konfigürasyonu, eksen sayısı, programlama, kararlılık, uygulama ve maliyet kontrolüne göre yapın.',
    labels: {
      quickAnswer: 'Hızlı cevap: hangi kontrol seçilmeli?',
      logic: 'Markadan önce makine konfigürasyonundan başlayın',
      ncCnc: 'Abkant pres NC ve CNC kontrolleri',
      axes: 'Abkant pres eksen kontrolünü anlamak',
      easycat: 'Uygun maliyetli CNC seçenekleri: EASYCAT ET16 ve ET18',
      comparison: 'Karşılaştırma: EASYCAT, Delem, Cybelec ve ESA',
      delem: 'Delem kontrol seçimi',
      cybelec: 'Cybelec kontrol seçimi',
      esa: 'ESA kontrol seçimi',
      scenarios: 'Uygulama senaryosuna göre öneriler',
      mistakes: 'Kontrol seçerken yaygın hatalar',
      advice: 'ZYCO pratik satın alma önerileri',
      faq: 'Sık sorulan sorular',
      related: 'İlgili mühendislik araçları',
    },
  },
  id: {
    back: 'Kembali ke alat teknik',
    eyebrow: 'Panduan Teknik',
    subtitle: 'Pilih controller berdasarkan konfigurasi mesin, jumlah sumbu, pemrograman, stabilitas, aplikasi, dan kontrol biaya mesin.',
    labels: {
      quickAnswer: 'Jawaban cepat: controller mana yang dipilih?',
      logic: 'Mulai dari konfigurasi mesin, bukan nama merek',
      ncCnc: 'Controller NC dan CNC press brake',
      axes: 'Memahami kontrol sumbu press brake',
      easycat: 'Opsi CNC hemat biaya: EASYCAT ET16 dan ET18',
      comparison: 'Perbandingan: EASYCAT, Delem, Cybelec, ESA',
      delem: 'Pemilihan controller Delem',
      cybelec: 'Pemilihan controller Cybelec',
      esa: 'Pemilihan controller ESA',
      scenarios: 'Rekomendasi menurut aplikasi',
      mistakes: 'Kesalahan umum saat memilih controller',
      advice: 'Saran pembelian praktis dari ZYCO',
      faq: 'Pertanyaan umum',
      related: 'Alat teknik terkait',
    },
  },
}

const content = Object.fromEntries(
  ['en', 'zh', 'ru', 'es', 'tr', 'id'].map((language) => [
    language,
    {
      ...baseContent.en,
      ...localizedText[language],
      labels: {
        ...baseContent.en.labels,
        ...(localizedText[language]?.labels || {}),
      },
    },
  ])
)

const createStructuredData = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: baseContent.en.title,
      description: baseContent.en.seoDescription,
      url: getSiteUrl(routePath),
      isPartOf: { '@type': 'WebSite', name: 'ZYCO Engineering Hub', url: getSiteUrl('/engineering-tools') },
    },
    {
      '@type': 'TechArticle',
      headline: baseContent.en.title,
      description: baseContent.en.seoDescription,
      author: { '@type': 'Organization', name: 'ZYCO' },
      publisher: { '@type': 'Organization', name: 'ZYCO', url: getSiteUrl('/') },
      mainEntityOfPage: getSiteUrl(routePath),
    },
    {
      '@type': 'FAQPage',
      mainEntity: englishFaq.map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Engineering Tools', item: getSiteUrl('/engineering-tools') },
        { '@type': 'ListItem', position: 2, name: baseContent.en.title, item: getSiteUrl(routePath) },
      ],
    },
  ],
})

function Card({ title, text }) {
  return (
    <article className='zyco-controller__card'>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}

function Table({ headers, rows, minWidth = 760 }) {
  return (
    <div className='zyco-controller__table-wrap'>
      <table className='zyco-controller__table' style={{ minWidth }}>
        <thead>
          <tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join('|')}>
              {row.map((cell) => <td key={cell}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function BrandList({ items }) {
  return (
    <div className='zyco-controller__cards'>
      {items.map(([title, text]) => <Card key={title} title={title} text={text} />)}
    </div>
  )
}

export default function PressBrakeControllerSelectionGuide({
  language = 'en',
  setLanguage = () => {},
}) {
  const page = content[language] || content.en
  const sharedText = getEngineeringText(language)

  useEffect(() => {
    setPageSEO({
      title: page.seoTitle,
      description: baseContent.en.seoDescription,
      keywords: page.keywords,
      canonicalPath: routePath,
    })
    setStructuredData({
      id: 'press-brake-controller-selection-guide-jsonld',
      data: createStructuredData(),
    })
  }, [page.keywords, page.seoTitle])

  return (
    <>
      <style>
        {`
          .zyco-controller {
            min-height: 100vh;
            box-sizing: border-box;
            padding: 52px 22px;
            background:
              radial-gradient(circle at 16% 12%, rgba(96, 165, 250, 0.34), transparent 30%),
              radial-gradient(circle at 84% 20%, rgba(14, 165, 233, 0.22), transparent 28%),
              linear-gradient(145deg, #071224 0%, #0b1f3f 42%, #12366e 74%, #1d4ed8 100%);
            color: #ffffff;
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            position: relative;
            overflow: hidden;
          }
          .zyco-controller::before {
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
          .zyco-controller__shell { width: min(1180px, 100%); margin: 0 auto; position: relative; z-index: 1; }
          .zyco-controller__hero {
            padding: 38px 36px; margin-bottom: 22px; border: 1px solid rgba(191,219,254,0.2);
            border-radius: 30px; background: linear-gradient(145deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06));
            backdrop-filter: blur(16px); box-shadow: 0 28px 68px rgba(2,8,23,0.2);
          }
          .zyco-controller__back, .zyco-controller__tool {
            display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; text-decoration: none;
            color: #ffffff; font-size: 15px; font-weight: 800; transition: all .25s ease;
          }
          .zyco-controller__back {
            width: fit-content; max-width: min(100%, 460px); min-height: 44px; margin: 0 0 22px; padding: 0 16px;
            border: 1px solid rgba(147,197,253,0.46); border-radius: 999px;
            background: linear-gradient(145deg, rgba(15,23,42,0.34), rgba(37,99,235,0.12)); color: #bfdbfe;
          }
          .zyco-controller__back:hover, .zyco-controller__tool:hover { transform: translateY(-3px); border-color: rgba(125,211,252,0.7); color: #fff; background: rgba(37,99,235,0.42); box-shadow: 0 14px 32px rgba(37,99,235,0.28); }
          .zyco-controller__eyebrow { margin: 0; color: #7dd3fc; font-size: 12px; font-weight: 800; letter-spacing: .2em; text-transform: uppercase; }
          .zyco-controller__title { max-width: 980px; margin: 14px 0 18px; font-size: clamp(32px, 4.8vw, 52px); line-height: 1.08; letter-spacing: 0; }
          .zyco-controller__subtitle { max-width: 850px; margin: 0; color: #dbeafe; font-size: 18px; line-height: 1.72; }
          .zyco-controller__panel {
            padding: 28px; margin-top: 18px; border: 1px solid rgba(191,219,254,0.16); border-radius: 25px;
            background: rgba(10,30,61,0.48); backdrop-filter: blur(12px);
          }
          .zyco-controller__section-title { margin: 0 0 14px; color: #fff; font-size: 25px; letter-spacing: 0; }
          .zyco-controller__copy { margin: 0; color: #cbd5e1; font-size: 16px; line-height: 1.75; }
          .zyco-controller__copy + .zyco-controller__copy { margin-top: 10px; }
          .zyco-controller__grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
          .zyco-controller__cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: 16px; }
          .zyco-controller__card, .zyco-controller__item {
            padding: 18px; border: 1px solid rgba(191,219,254,0.13); border-radius: 18px; background: rgba(30,64,112,0.34);
          }
          .zyco-controller__card h3, .zyco-controller__item h3 { margin: 0 0 8px; color: #eff6ff; font-size: 16px; line-height: 1.35; }
          .zyco-controller__card p, .zyco-controller__item p { margin: 0; color: #bfdbfe; font-size: 14px; line-height: 1.65; }
          .zyco-controller__table-wrap { overflow-x: auto; border: 1px solid rgba(191,219,254,0.16); border-radius: 18px; margin-top: 18px; }
          .zyco-controller__table { width: 100%; border-collapse: collapse; }
          .zyco-controller__table th, .zyco-controller__table td { padding: 14px 16px; border-bottom: 1px solid rgba(191,219,254,0.1); text-align: left; vertical-align: top; }
          .zyco-controller__table th { color: #bae6fd; background: rgba(30,64,112,0.38); font-size: 13px; white-space: nowrap; }
          .zyco-controller__table td { color: #e2e8f0; font-size: 14px; line-height: 1.55; }
          .zyco-controller__list, .zyco-controller__faq { display: grid; gap: 12px; padding: 0; margin: 0; list-style: none; }
          .zyco-controller__list li, .zyco-controller__faq article {
            padding: 17px 20px; border: 1px solid rgba(191,219,254,0.12); border-radius: 18px; background: rgba(30,64,112,0.3);
          }
          .zyco-controller__faq h3 { margin: 0 0 8px; color: #eff6ff; font-size: 17px; line-height: 1.4; }
          .zyco-controller__tools { display: flex; flex-wrap: wrap; gap: 12px; }
          .zyco-controller__tool {
            min-height: 46px; padding: 0 18px; border: 1px solid rgba(147,197,253,0.38); border-radius: 14px;
            color: #dbeafe; background: rgba(30,64,175,0.32); box-shadow: none;
          }
          @media (max-width: 900px) { .zyco-controller__grid, .zyco-controller__cards { grid-template-columns: 1fr; } }
          @media (max-width: 760px) {
            .zyco-controller { padding: 22px 14px; }
            .zyco-controller__hero, .zyco-controller__panel { padding: 22px; border-radius: 22px; }
            .zyco-controller__subtitle { font-size: 16px; }
          }
          @media (max-width: 640px) { .zyco-controller__back, .zyco-controller__tool { width: 100%; } }
        `}
      </style>
      <main className='zyco-controller'>
        <div className='zyco-controller__shell'>
          <header className='zyco-controller__hero'>
            <a className='zyco-controller__back' href='/engineering-tools' aria-label={page.back}>{page.back}</a>
            <LanguageSwitcher className='zyco-page-language-switcher' language={language} setLanguage={setLanguage} />
            <p className='zyco-controller__eyebrow'>{page.eyebrow}</p>
            <h1 className='zyco-controller__title'>{page.title}</h1>
            <p className='zyco-controller__subtitle'>{page.subtitle}</p>
          </header>

          <section className='zyco-controller__panel'>
            {page.intro.map((item) => <p className='zyco-controller__copy' key={item}>{item}</p>)}
          </section>

          <section className='zyco-controller__panel'>
            <h2 className='zyco-controller__section-title'>{page.labels.quickAnswer}</h2>
            <Table headers={page.quickHeaders} rows={page.quickRows} />
          </section>

          <section className='zyco-controller__panel'>
            <h2 className='zyco-controller__section-title'>{page.labels.logic}</h2>
            {page.logic.map((item) => <p className='zyco-controller__copy' key={item}>{item}</p>)}
          </section>

          <section className='zyco-controller__panel'>
            <h2 className='zyco-controller__section-title'>{page.labels.ncCnc}</h2>
            <BrandList items={page.ncCncCards} />
          </section>

          <section className='zyco-controller__panel'>
            <h2 className='zyco-controller__section-title'>{page.labels.axes}</h2>
            <BrandList items={page.axes} />
          </section>

          <section className='zyco-controller__panel'>
            <h2 className='zyco-controller__section-title'>{page.labels.easycat}</h2>
            {page.easycat.map((item) => <p className='zyco-controller__copy' key={item}>{item}</p>)}
          </section>

          <section className='zyco-controller__panel'>
            <h2 className='zyco-controller__section-title'>{page.labels.comparison}</h2>
            <Table headers={page.comparisonHeaders} rows={controllerRows} minWidth={1180} />
          </section>

          <div className='zyco-controller__grid'>
            <section className='zyco-controller__panel'>
              <h2 className='zyco-controller__section-title'>{page.labels.delem}</h2>
              <BrandList items={page.brandSections.delem} />
            </section>
            <section className='zyco-controller__panel'>
              <h2 className='zyco-controller__section-title'>{page.labels.cybelec}</h2>
              <BrandList items={page.brandSections.cybelec} />
            </section>
          </div>

          <section className='zyco-controller__panel'>
            <h2 className='zyco-controller__section-title'>{page.labels.esa}</h2>
            <BrandList items={page.brandSections.esa} />
          </section>

          <section className='zyco-controller__panel'>
            <h2 className='zyco-controller__section-title'>{page.labels.scenarios}</h2>
            <Table headers={page.scenarioHeaders} rows={page.scenarioRows} />
          </section>

          <div className='zyco-controller__grid'>
            <section className='zyco-controller__panel'>
              <h2 className='zyco-controller__section-title'>{page.labels.mistakes}</h2>
              <ul className='zyco-controller__list'>
                {page.mistakes.map((item) => <li className='zyco-controller__copy' key={item}>{item}</li>)}
              </ul>
            </section>
            <section className='zyco-controller__panel'>
              <h2 className='zyco-controller__section-title'>{page.labels.advice}</h2>
              <ul className='zyco-controller__list'>
                {page.advice.map((item) => <li className='zyco-controller__copy' key={item}>{item}</li>)}
              </ul>
            </section>
          </div>

          <section className='zyco-controller__panel'>
            <h2 className='zyco-controller__section-title'>{page.labels.faq}</h2>
            <div className='zyco-controller__faq'>
              {page.faq.map(([question, answer]) => (
                <article key={question}>
                  <h3>{question}</h3>
                  <p className='zyco-controller__copy'>{answer}</p>
                </article>
              ))}
            </div>
          </section>

          <EngineeringCTA language={language} />

          <section className='zyco-controller__panel'>
            <h2 className='zyco-controller__section-title'>{page.labels.related}</h2>
            <nav className='zyco-controller__tools' aria-label={page.labels.related}>
              {relatedTools.map(([key, href]) => (
                <a className='zyco-controller__tool' href={href} key={key}>{sharedText.relatedTools[key]}</a>
              ))}
            </nav>
          </section>
        </div>
      </main>
    </>
  )
}
