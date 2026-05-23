import { useEffect } from 'react'
import LanguageSwitcher from '../components/LanguageSwitcher.jsx'
import { getEngineeringText } from '../languages/engineeringText.js'
import {
  getSiteUrl,
  setPageSEO,
  setStructuredData,
} from '../utils/seo.js'

const routePath = '/engineering/press-brake-tonnage-guide'

const englishContent = {
  eyebrow: 'Engineering Guide',
  title: 'Press Brake Tonnage Guide',
  subtitle:
    'A structured reference for understanding bending force, production capacity and machine selection.',
  introTitle: 'Introduction',
  intro:
    'This guide page is being prepared as a practical companion to the ZYCO Press Brake Calculator. Detailed engineering content will be added in a later stage.',
  formulaTitle: 'Tonnage Formula',
  formulaLabel: 'Reference formula framework',
  formula:
    'Formula notation and engineering assumptions will be documented here.',
  formulaNote:
    'The final published guide will explain units, assumptions and application limits.',
  factorsTitle: 'Factors That Influence Tonnage',
  factors: [
    ['Material', 'Strength changes the force required for forming.'],
    ['Thickness', 'Thicker sheet increases bending demand quickly.'],
    ['Bend length', 'Longer bends require greater total force.'],
    ['V-opening', 'Die selection affects force and forming geometry.'],
  ],
  capacityTitle: 'Recommended Machine Capacity',
  capacityText:
    'Machine selection should consider calculated force together with stable continuous production capacity.',
  capacityCards: [
    ['Calculated load', 'Establish the required bending force.'],
    ['Production margin', 'Allow capacity for repeat operation.'],
    ['Machine choice', 'Select a suitable ZYCO model range.'],
  ],
  chartTitle: 'Tonnage Chart',
  chartText:
    'A reference chart layout is reserved here for commonly used material and thickness conditions.',
  chartHeaders: ['Thickness', 'V-opening', 'Force reference'],
  chartRows: [
    ['Coming soon', '--', 'Guide data pending'],
    ['Coming soon', '--', 'Guide data pending'],
    ['Coming soon', '--', 'Guide data pending'],
  ],
  faqTitle: 'Frequently Asked Questions',
  faq: [
    [
      'What does press brake tonnage mean?',
      'It describes the forming force required for a bending operation.',
    ],
    [
      'Why does machine capacity need margin?',
      'Production planning should account for stable operation rather than only rated maximum force.',
    ],
    [
      'Where can I calculate a specific job?',
      'Use the ZYCO Press Brake Calculator in the related tools section.',
    ],
  ],
}

const localizedContent = {
  zh: {
    eyebrow: '工程指南',
    title: '折弯机吨位指南',
    subtitle: '用于了解折弯力、生产能力与设备选型的结构化参考页面。',
    introTitle: '简介',
    intro: '本页面将作为 ZYCO 折弯机计算器的实用配套指南，后续阶段将补充完整工程内容。',
    formulaTitle: '吨位公式',
    formulaLabel: '参考公式框架',
    formula: '公式表达式与工程假设将在此处补充说明。',
    formulaNote: '正式内容将补充单位、假设条件和适用边界。',
    factorsTitle: '影响吨位的因素',
    factors: [
      ['材料', '材料强度会改变成形所需的力。'],
      ['板厚', '板材越厚，折弯需求增长越快。'],
      ['折弯长度', '折弯线越长，总力需求越大。'],
      ['V 槽宽度', '模具选择会影响力和成形几何。'],
    ],
    capacityTitle: '推荐机器能力',
    capacityText: '设备选型应同时考虑计算吨位与持续生产下的稳定能力。',
    capacityCards: [
      ['计算负载', '确定工件所需的折弯力。'],
      ['生产余量', '为重复运行预留能力。'],
      ['设备选择', '匹配适合的 ZYCO 机型范围。'],
    ],
    chartTitle: '吨位表',
    chartText: '这里预留常用材料和板厚条件下的参考吨位表结构。',
    chartHeaders: ['板厚', 'V 槽宽度', '力参考'],
    chartRows: [
      ['即将提供', '--', '数据待补充'],
      ['即将提供', '--', '数据待补充'],
      ['即将提供', '--', '数据待补充'],
    ],
    faqTitle: '常见问题',
    faq: [
      ['折弯机吨位是什么？', '它表示一次折弯操作所需的成形力。'],
      ['为什么设备能力需要余量？', '生产规划应关注稳定运行，而不仅是最大额定力。'],
      ['在哪里计算具体工件？', '请使用相关工具中的 ZYCO 折弯机计算器。'],
    ],
  },
  ru: {
    eyebrow: 'Инженерное руководство',
    title: 'Руководство по тоннажу листогибочного пресса',
    subtitle:
      'Структурированный справочник по усилию гибки, производственной мощности и выбору станка.',
    introTitle: 'Введение',
    intro:
      'Эта страница готовится как практическое дополнение к калькулятору листогибочного пресса ZYCO. Подробные инженерные материалы будут добавлены позднее.',
    formulaTitle: 'Формула тоннажа',
    formulaLabel: 'Схема справочной формулы',
    formula: 'Здесь будут описаны обозначения формулы и инженерные допущения.',
    formulaNote:
      'В окончательной версии будут приведены единицы измерения, допущения и границы применения.',
    factorsTitle: 'Факторы, влияющие на тоннаж',
    factors: [
      ['Материал', 'Прочность материала изменяет требуемое усилие формовки.'],
      ['Толщина', 'С увеличением толщины листа требуемое усилие быстро растет.'],
      ['Длина гиба', 'Более длинный гиб требует большего общего усилия.'],
      ['V-раскрытие', 'Выбор матрицы влияет на усилие и геометрию формовки.'],
    ],
    capacityTitle: 'Рекомендуемая мощность станка',
    capacityText:
      'При выборе станка следует учитывать расчетное усилие и стабильную мощность при непрерывном производстве.',
    capacityCards: [
      ['Расчетная нагрузка', 'Определите усилие, необходимое для детали.'],
      ['Производственный запас', 'Предусмотрите мощность для повторной работы.'],
      ['Выбор станка', 'Выберите подходящий диапазон моделей ZYCO.'],
    ],
    chartTitle: 'Таблица тоннажа',
    chartText:
      'Здесь зарезервирована структура справочной таблицы для типовых материалов и толщин.',
    chartHeaders: ['Толщина', 'V-раскрытие', 'Справочное усилие'],
    chartRows: [
      ['Скоро', '--', 'Данные готовятся'],
      ['Скоро', '--', 'Данные готовятся'],
      ['Скоро', '--', 'Данные готовятся'],
    ],
    faqTitle: 'Частые вопросы',
    faq: [
      ['Что означает тоннаж листогибочного пресса?', 'Это усилие формовки, необходимое для операции гибки.'],
      ['Почему для мощности станка нужен запас?', 'При планировании производства важна стабильная работа, а не только максимальное номинальное усилие.'],
      ['Где рассчитать конкретную деталь?', 'Используйте калькулятор листогибочного пресса ZYCO в разделе связанных инструментов.'],
    ],
  },
  es: {
    eyebrow: 'Guía de ingeniería',
    title: 'Guía de tonelaje para plegadoras',
    subtitle:
      'Referencia estructurada para comprender la fuerza de plegado, la capacidad de producción y la selección de máquina.',
    introTitle: 'Introducción',
    intro:
      'Esta página se prepara como complemento práctico de la calculadora de plegadora ZYCO. El contenido técnico detallado se añadirá en una fase posterior.',
    formulaTitle: 'Fórmula de tonelaje',
    formulaLabel: 'Marco de fórmula de referencia',
    formula: 'Aquí se documentarán la notación de la fórmula y los supuestos de ingeniería.',
    formulaNote:
      'La guía publicada explicará las unidades, los supuestos y los límites de aplicación.',
    factorsTitle: 'Factores que influyen en el tonelaje',
    factors: [
      ['Material', 'La resistencia cambia la fuerza necesaria para el conformado.'],
      ['Espesor', 'Una chapa más gruesa incrementa rápidamente la demanda de plegado.'],
      ['Longitud de plegado', 'Los pliegues más largos requieren mayor fuerza total.'],
      ['Abertura V', 'La selección de matriz influye en la fuerza y la geometría.'],
    ],
    capacityTitle: 'Capacidad recomendada de máquina',
    capacityText:
      'La selección de máquina debe considerar la fuerza calculada y la capacidad estable para producción continua.',
    capacityCards: [
      ['Carga calculada', 'Determine la fuerza requerida para el plegado.'],
      ['Margen de producción', 'Reserve capacidad para operaciones repetidas.'],
      ['Selección de máquina', 'Seleccione una gama adecuada de modelos ZYCO.'],
    ],
    chartTitle: 'Tabla de tonelaje',
    chartText:
      'Aquí se reserva el diseño de una tabla de referencia para materiales y espesores habituales.',
    chartHeaders: ['Espesor', 'Abertura V', 'Fuerza de referencia'],
    chartRows: [
      ['Próximamente', '--', 'Datos pendientes'],
      ['Próximamente', '--', 'Datos pendientes'],
      ['Próximamente', '--', 'Datos pendientes'],
    ],
    faqTitle: 'Preguntas frecuentes',
    faq: [
      ['¿Qué significa el tonelaje de una plegadora?', 'Describe la fuerza de conformado necesaria para una operación de plegado.'],
      ['¿Por qué la capacidad de la máquina necesita margen?', 'La planificación de producción debe considerar la operación estable, no solo la fuerza nominal máxima.'],
      ['¿Dónde puedo calcular un trabajo específico?', 'Utilice la calculadora de plegadora ZYCO en la sección de herramientas relacionadas.'],
    ],
  },
  tr: {
    eyebrow: 'Mühendislik Kılavuzu',
    title: 'Abkant Pres Tonaj Kılavuzu',
    subtitle:
      'Bükme kuvveti, üretim kapasitesi ve makine seçimini anlamak için yapılandırılmış referans.',
    introTitle: 'Giriş',
    intro:
      'Bu sayfa ZYCO Abkant Pres Hesaplayıcısının pratik tamamlayıcısı olarak hazırlanmaktadır. Ayrıntılı mühendislik içeriği sonraki aşamada eklenecektir.',
    formulaTitle: 'Tonaj Formülü',
    formulaLabel: 'Referans formül çerçevesi',
    formula: 'Formül gösterimi ve mühendislik varsayımları burada açıklanacaktır.',
    formulaNote:
      'Yayımlanacak kılavuz birimleri, varsayımları ve uygulama sınırlarını açıklayacaktır.',
    factorsTitle: 'Tonajı Etkileyen Faktörler',
    factors: [
      ['Malzeme', 'Mukavemet, şekillendirme için gereken kuvveti değiştirir.'],
      ['Kalınlık', 'Daha kalın sac, bükme ihtiyacını hızla artırır.'],
      ['Büküm uzunluğu', 'Daha uzun bükümler daha yüksek toplam kuvvet gerektirir.'],
      ['V açıklığı', 'Kalıp seçimi kuvveti ve şekillendirme geometrisini etkiler.'],
    ],
    capacityTitle: 'Önerilen Makine Kapasitesi',
    capacityText:
      'Makine seçiminde hesaplanan kuvvet ile sürekli üretim için kararlı kapasite birlikte değerlendirilmelidir.',
    capacityCards: [
      ['Hesaplanan yük', 'Parça için gereken bükme kuvvetini belirleyin.'],
      ['Üretim payı', 'Tekrarlı çalışma için kapasite ayırın.'],
      ['Makine seçimi', 'Uygun ZYCO model aralığını seçin.'],
    ],
    chartTitle: 'Tonaj Tablosu',
    chartText:
      'Yaygın malzeme ve kalınlık koşullarına yönelik referans tablo düzeni burada ayrılmıştır.',
    chartHeaders: ['Kalınlık', 'V açıklığı', 'Kuvvet referansı'],
    chartRows: [
      ['Yakında', '--', 'Veriler hazırlanıyor'],
      ['Yakında', '--', 'Veriler hazırlanıyor'],
      ['Yakında', '--', 'Veriler hazırlanıyor'],
    ],
    faqTitle: 'Sık Sorulan Sorular',
    faq: [
      ['Abkant pres tonajı ne anlama gelir?', 'Bir bükme işlemi için gereken şekillendirme kuvvetini ifade eder.'],
      ['Makine kapasitesinde neden pay gerekir?', 'Üretim planlaması yalnızca azami nominal kuvveti değil, kararlı çalışmayı da dikkate almalıdır.'],
      ['Belirli bir işi nerede hesaplayabilirim?', 'İlgili araçlar bölümündeki ZYCO Abkant Pres Hesaplayıcısını kullanın.'],
    ],
  },
  id: {
    eyebrow: 'Panduan Teknik',
    title: 'Panduan Tonase Press Brake',
    subtitle:
      'Referensi terstruktur untuk memahami gaya bending, kapasitas produksi, dan pemilihan mesin.',
    introTitle: 'Pendahuluan',
    intro:
      'Halaman ini disiapkan sebagai pendamping praktis Kalkulator Press Brake ZYCO. Konten teknik terperinci akan ditambahkan pada tahap berikutnya.',
    formulaTitle: 'Formula Tonase',
    formulaLabel: 'Kerangka formula referensi',
    formula: 'Notasi formula dan asumsi teknik akan dijelaskan di bagian ini.',
    formulaNote:
      'Panduan final akan menjelaskan unit, asumsi, dan batas penerapan.',
    factorsTitle: 'Faktor yang Mempengaruhi Tonase',
    factors: [
      ['Material', 'Kekuatan material mengubah gaya yang diperlukan untuk pembentukan.'],
      ['Ketebalan', 'Pelat yang lebih tebal meningkatkan kebutuhan bending dengan cepat.'],
      ['Panjang bending', 'Bending yang lebih panjang membutuhkan gaya total lebih besar.'],
      ['Bukaan V', 'Pemilihan die memengaruhi gaya dan geometri pembentukan.'],
    ],
    capacityTitle: 'Kapasitas Mesin yang Direkomendasikan',
    capacityText:
      'Pemilihan mesin harus mempertimbangkan gaya hasil perhitungan dan kapasitas stabil untuk produksi kontinu.',
    capacityCards: [
      ['Beban terhitung', 'Tentukan gaya bending yang dibutuhkan.'],
      ['Margin produksi', 'Sediakan kapasitas untuk operasi berulang.'],
      ['Pilihan mesin', 'Pilih rentang model ZYCO yang sesuai.'],
    ],
    chartTitle: 'Tabel Tonase',
    chartText:
      'Struktur tabel referensi untuk material dan ketebalan yang umum disediakan di sini.',
    chartHeaders: ['Ketebalan', 'Bukaan V', 'Referensi gaya'],
    chartRows: [
      ['Segera hadir', '--', 'Data sedang disiapkan'],
      ['Segera hadir', '--', 'Data sedang disiapkan'],
      ['Segera hadir', '--', 'Data sedang disiapkan'],
    ],
    faqTitle: 'Pertanyaan Umum',
    faq: [
      ['Apa arti tonase press brake?', 'Tonase menjelaskan gaya pembentukan yang diperlukan untuk operasi bending.'],
      ['Mengapa kapasitas mesin memerlukan margin?', 'Perencanaan produksi harus mempertimbangkan operasi stabil, bukan hanya gaya nominal maksimum.'],
      ['Di mana saya dapat menghitung pekerjaan tertentu?', 'Gunakan Kalkulator Press Brake ZYCO pada bagian alat terkait.'],
    ],
  },
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
    key: 'airBendingGuide',
    href: '/engineering-tools/air-bending-guide',
  },
  {
    key: 'pressBrakeTonnageGuide',
    href: '/engineering/press-brake-tonnage-guide',
  },
]

const seoDescription =
  'Explore the ZYCO press brake tonnage guide structure for bending force, load factors, recommended machine capacity, tonnage charts and practical calculation references.'

const createPageStructuredData = () => ({
  '@type': 'WebPage',
  name: englishContent.title,
  description: seoDescription,
  url: getSiteUrl(routePath),
  isPartOf: {
    '@type': 'WebSite',
    name: 'ZYCO Engineering Hub',
    url: getSiteUrl('/engineering-tools'),
  },
})

const createArticleStructuredData = () => ({
  '@type': 'TechArticle',
  headline: englishContent.title,
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
  mainEntityOfPage: getSiteUrl(routePath),
})

const createFAQStructuredData = () => ({
  '@type': 'FAQPage',
  mainEntity: englishContent.faq.map(([question, answer]) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer,
    },
  })),
})

const getPageContent = (language) => ({
  ...englishContent,
  ...(localizedContent[language] || {}),
})

export default function PressBrakeTonnageGuide({
  language = 'en',
  setLanguage = () => {},
}) {
  useEffect(() => {
    setPageSEO({
      title: 'Press Brake Tonnage Guide | ZYCO Engineering Hub',
      description: seoDescription,
      keywords:
        'press brake tonnage guide, press brake capacity, bending force formula, press brake tonnage chart, press brake machine selection',
      canonicalPath: routePath,
    })

    setStructuredData({
      id: 'press-brake-tonnage-guide-jsonld',
      data: {
        '@context': 'https://schema.org',
        '@graph': [
          createPageStructuredData(),
          createArticleStructuredData(),
          createFAQStructuredData(),
        ],
      },
    })
  }, [])

  const t = getEngineeringText(language)
  const page = getPageContent(language)
  const backToEngineeringToolsLabel =
    language === 'zh'
      ? '返回工程工具中心'
      : t.pages.air.backToEngineeringTools

  return (
    <>
      <style>
        {`
          .zyco-tonnage-guide {
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

          .zyco-tonnage-guide::before {
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

          .zyco-tonnage-guide__shell {
            width: min(1180px, 100%);
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }

          .zyco-tonnage-guide__hero {
            position: relative;
            padding: 38px 36px;
            margin-bottom: 22px;
            border: 1px solid rgba(191, 219, 254, 0.2);
            border-radius: 30px;
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.06));
            backdrop-filter: blur(16px);
            box-shadow: 0 28px 68px rgba(2, 8, 23, 0.2);
          }

          .zyco-tonnage-guide__back {
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

          .zyco-tonnage-guide__back:hover,
          .zyco-tonnage-guide__tool:hover {
            transform: translateY(-2px);
            border-color: rgba(191, 219, 254, 0.72);
            color: #ffffff;
          }

          .zyco-tonnage-guide__back:focus-visible,
          .zyco-tonnage-guide__tool:focus-visible {
            outline: 3px solid rgba(147, 197, 253, 0.46);
            outline-offset: 3px;
          }

          .zyco-tonnage-guide__eyebrow {
            color: #7dd3fc;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 0.2em;
            text-transform: uppercase;
          }

          .zyco-tonnage-guide__title {
            max-width: 820px;
            margin: 14px 0 18px;
            font-size: clamp(36px, 5vw, 56px);
            line-height: 1.08;
            letter-spacing: -0.055em;
          }

          .zyco-tonnage-guide__subtitle {
            max-width: 760px;
            margin: 0;
            color: #dbeafe;
            font-size: 18px;
            line-height: 1.72;
          }

          .zyco-tonnage-guide__panel {
            padding: 28px;
            margin-top: 18px;
            border: 1px solid rgba(191, 219, 254, 0.16);
            border-radius: 25px;
            background: rgba(10, 30, 61, 0.48);
            backdrop-filter: blur(12px);
          }

          .zyco-tonnage-guide__section-title {
            margin: 0 0 14px;
            color: #ffffff;
            font-size: 25px;
            letter-spacing: -0.035em;
          }

          .zyco-tonnage-guide__copy {
            margin: 0;
            color: #cbd5e1;
            font-size: 16px;
            line-height: 1.75;
          }

          .zyco-tonnage-guide__grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px;
          }

          .zyco-tonnage-guide__formula {
            padding: 22px;
            margin-top: 18px;
            border-radius: 18px;
            background: linear-gradient(135deg, rgba(37, 99, 235, 0.25), rgba(14, 165, 233, 0.12));
            border: 1px solid rgba(125, 211, 252, 0.22);
          }

          .zyco-tonnage-guide__label {
            display: block;
            margin-bottom: 12px;
            color: #7dd3fc;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 0.12em;
            text-transform: uppercase;
          }

          .zyco-tonnage-guide__equation {
            margin: 0;
            color: #ffffff;
            font-size: clamp(17px, 2vw, 21px);
            line-height: 1.6;
            font-weight: 650;
          }

          .zyco-tonnage-guide__cards {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 14px;
            margin-top: 18px;
          }

          .zyco-tonnage-guide__card,
          .zyco-tonnage-guide__factor {
            padding: 18px;
            border-radius: 18px;
            background: rgba(30, 64, 112, 0.36);
            border: 1px solid rgba(191, 219, 254, 0.13);
          }

          .zyco-tonnage-guide__card strong,
          .zyco-tonnage-guide__factor strong {
            display: block;
            margin-bottom: 8px;
            color: #eff6ff;
          }

          .zyco-tonnage-guide__card span,
          .zyco-tonnage-guide__factor span {
            color: #bfdbfe;
            font-size: 14px;
            line-height: 1.65;
          }

          .zyco-tonnage-guide__factors {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }

          .zyco-tonnage-guide__table-wrap {
            margin-top: 18px;
            overflow-x: auto;
            border-radius: 18px;
            border: 1px solid rgba(191, 219, 254, 0.16);
          }

          .zyco-tonnage-guide__table {
            width: 100%;
            border-collapse: collapse;
            min-width: 480px;
          }

          .zyco-tonnage-guide__table th,
          .zyco-tonnage-guide__table td {
            padding: 14px 16px;
            border-bottom: 1px solid rgba(191, 219, 254, 0.1);
            text-align: left;
          }

          .zyco-tonnage-guide__table th {
            color: #bae6fd;
            background: rgba(30, 64, 112, 0.38);
            font-size: 13px;
          }

          .zyco-tonnage-guide__table td {
            color: #e2e8f0;
            font-size: 14px;
          }

          .zyco-tonnage-guide__faq {
            display: grid;
            gap: 12px;
          }

          .zyco-tonnage-guide__faq-item {
            padding: 18px 20px;
            border-radius: 18px;
            background: rgba(30, 64, 112, 0.3);
            border: 1px solid rgba(191, 219, 254, 0.12);
          }

          .zyco-tonnage-guide__faq-item h3 {
            margin: 0 0 8px;
            font-size: 16px;
          }

          .zyco-tonnage-guide__tools {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 12px;
          }

          .zyco-tonnage-guide__tool {
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

          .zyco-tonnage-guide__tool:hover {
            box-shadow: 0 18px 38px rgba(37, 99, 235, 0.42);
          }

          @media (max-width: 760px) {
            .zyco-tonnage-guide {
              padding: 22px 14px;
            }

            .zyco-tonnage-guide__hero,
            .zyco-tonnage-guide__panel {
              padding: 22px;
              border-radius: 22px;
            }

            .zyco-tonnage-guide__grid,
            .zyco-tonnage-guide__factors,
            .zyco-tonnage-guide__cards {
              grid-template-columns: 1fr;
            }

          }

          @media (max-width: 640px) {
            .zyco-tonnage-guide__back,
            .zyco-tonnage-guide__tool {
              width: 100%;
            }
          }
        `}
      </style>

      <main className='zyco-tonnage-guide'>
        <div className='zyco-tonnage-guide__shell'>
          <header className='zyco-tonnage-guide__hero'>
            <a
              aria-label={backToEngineeringToolsLabel}
              className='zyco-tonnage-guide__back'
              href='/engineering-tools'
            >
              {backToEngineeringToolsLabel}
            </a>

            <LanguageSwitcher
              className='zyco-page-language-switcher'
              language={language}
              setLanguage={setLanguage}
            />

            <p className='zyco-tonnage-guide__eyebrow'>
              {page.eyebrow}
            </p>

            <h1 className='zyco-tonnage-guide__title'>
              {page.title}
            </h1>

            <p className='zyco-tonnage-guide__subtitle'>
              {page.subtitle}
            </p>
          </header>

          <section
            className='zyco-tonnage-guide__panel'
            aria-labelledby='tonnage-guide-intro'
          >
            <h2
              className='zyco-tonnage-guide__section-title'
              id='tonnage-guide-intro'
            >
              {page.introTitle}
            </h2>

            <p className='zyco-tonnage-guide__copy'>
              {page.intro}
            </p>
          </section>

          <div className='zyco-tonnage-guide__grid'>
            <section
              className='zyco-tonnage-guide__panel'
              aria-labelledby='tonnage-guide-formula'
            >
              <h2
                className='zyco-tonnage-guide__section-title'
                id='tonnage-guide-formula'
              >
                {page.formulaTitle}
              </h2>

              <div className='zyco-tonnage-guide__formula'>
                <span className='zyco-tonnage-guide__label'>
                  {page.formulaLabel}
                </span>
                <p className='zyco-tonnage-guide__equation'>
                  {page.formula}
                </p>
              </div>

              <p className='zyco-tonnage-guide__copy'>
                {page.formulaNote}
              </p>
            </section>

            <section
              className='zyco-tonnage-guide__panel'
              aria-labelledby='tonnage-guide-factors'
            >
              <h2
                className='zyco-tonnage-guide__section-title'
                id='tonnage-guide-factors'
              >
                {page.factorsTitle}
              </h2>

              <div className='zyco-tonnage-guide__factors'>
                {page.factors.map(([factor, explanation]) => (
                  <article
                    className='zyco-tonnage-guide__factor'
                    key={factor}
                  >
                    <strong>{factor}</strong>
                    <span>{explanation}</span>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <section
            className='zyco-tonnage-guide__panel'
            aria-labelledby='tonnage-guide-capacity'
          >
            <h2
              className='zyco-tonnage-guide__section-title'
              id='tonnage-guide-capacity'
            >
              {page.capacityTitle}
            </h2>

            <p className='zyco-tonnage-guide__copy'>
              {page.capacityText}
            </p>

            <div className='zyco-tonnage-guide__cards'>
              {page.capacityCards.map(([title, description]) => (
                <article
                  className='zyco-tonnage-guide__card'
                  key={title}
                >
                  <strong>{title}</strong>
                  <span>{description}</span>
                </article>
              ))}
            </div>
          </section>

          <section
            className='zyco-tonnage-guide__panel'
            aria-labelledby='tonnage-guide-chart'
          >
            <h2
              className='zyco-tonnage-guide__section-title'
              id='tonnage-guide-chart'
            >
              {page.chartTitle}
            </h2>

            <p className='zyco-tonnage-guide__copy'>
              {page.chartText}
            </p>

            <div className='zyco-tonnage-guide__table-wrap'>
              <table className='zyco-tonnage-guide__table'>
                <thead>
                  <tr>
                    {page.chartHeaders.map((header) => (
                      <th key={header}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {page.chartRows.map((row, index) => (
                    <tr key={`${row[0]}-${index}`}>
                      {row.map((cell) => (
                        <td key={cell}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section
            className='zyco-tonnage-guide__panel'
            aria-labelledby='tonnage-guide-faq'
          >
            <h2
              className='zyco-tonnage-guide__section-title'
              id='tonnage-guide-faq'
            >
              {page.faqTitle}
            </h2>

            <div className='zyco-tonnage-guide__faq'>
              {page.faq.map(([question, answer]) => (
                <article
                  className='zyco-tonnage-guide__faq-item'
                  key={question}
                >
                  <h3>{question}</h3>
                  <p className='zyco-tonnage-guide__copy'>{answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section
            className='zyco-tonnage-guide__panel'
            aria-labelledby='tonnage-guide-related-tools'
          >
            <h2
              className='zyco-tonnage-guide__section-title'
              id='tonnage-guide-related-tools'
            >
              {t.common.relatedEngineeringTools}
            </h2>

            <nav
              className='zyco-tonnage-guide__tools'
              aria-label={t.common.relatedToolsAria}
            >
              {relatedTools.map((tool) => (
                <a
                  className='zyco-tonnage-guide__tool'
                  href={tool.href}
                  key={tool.key}
                >
                  {t.relatedTools[tool.key]}
                </a>
              ))}
            </nav>
          </section>
        </div>
      </main>
    </>
  )
}
