import { useEffect } from 'react'
import LanguageSwitcher from '../components/LanguageSwitcher.jsx'
import VDieOpeningDiagram from '../components/VDieOpeningDiagram.jsx'
import { getEngineeringText } from '../languages/engineeringText.js'
import {
  getSiteUrl,
  setPageSEO,
  setStructuredData,
} from '../utils/seo.js'

const routePath = '/engineering/how-to-choose-press-brake-v-die-opening'

const relatedTools = [
  ['pressBrakeCalculator', '/engineering-tools/press-brake-calculator'],
  ['materialDatabase', '/engineering-tools/material-database'],
  ['vDieSelectionTool', '/engineering-tools/v-die-selection'],
  ['insideRadiusGuide', '/engineering-tools/inside-radius-guide'],
  ['springbackDatabase', '/engineering-tools/springback-database'],
  ['springbackCompensationGuide', '/springback-compensation-guide'],
  ['bendAllowanceCalculator', '/engineering-tools/bend-allowance-calculator'],
  ['kFactorGuide', '/engineering/k-factor-guide'],
  ['bendDeductionGuide', '/engineering/bend-deduction-guide'],
  ['airBendingGuide', '/engineering-tools/air-bending-guide'],
  ['pressBrakeTonnageGuide', '/engineering/press-brake-tonnage-guide'],
  ['vDieOpeningGuide', '/engineering/how-to-choose-press-brake-v-die-opening'],
  ['minimumFlangeLengthGuide', '/engineering/minimum-flange-length-guide'],
  ['toolingSelectionGuide', '/engineering/press-brake-tooling-selection-guide'],
  ['crowningGuide', '/engineering/press-brake-crowning-guide'],
  ['stainlessSteelBendingGuide', '/engineering/stainless-steel-bending-guide'],
  ['aluminumBendingGuide', '/engineering/aluminum-bending-guide'],
]

const englishContent = {
  back: '← Back to Engineering Tools',
  eyebrow: 'Engineering Guide',
  title: 'How to Choose Press Brake V-Die Opening',
  subtitle:
    'A practical reference for selecting V-die opening in air bending while balancing force, inside radius and process stability.',
  introTitle: 'Introduction',
  intro:
    'V-die opening is a primary tooling decision in press brake air bending. It affects required tonnage, natural inside radius, minimum flange support and the sensitivity of the bend to material variation.',
  principlesTitle: 'V-Die Selection Principles',
  principles: [
    ['Part geometry', 'Confirm flange length and inside-radius requirement before selecting the opening.'],
    ['Machine capacity', 'A wider opening generally reduces forming force and tool loading.'],
    ['Material condition', 'Harder or less ductile sheet may require a less severe forming condition.'],
  ],
  rangeTitle: 'Recommended V Opening Range',
  rangeIntro:
    'A common initial reference for air bending is to choose the opening as a multiple of material thickness, followed by job-specific verification.',
  rangeCards: [
    ['Thin sheet', 'Approximately 6T to 8T'],
    ['General fabrication', 'Approximately 8T'],
    ['Thicker or harder material', 'Approximately 8T to 12T'],
  ],
  materialTitle: 'Material Influence',
  materialText:
    'Material strength and ductility affect cracking risk, tonnage and angle recovery. Stainless and high-strength grades commonly need additional checking.',
  thicknessTitle: 'Thickness Influence',
  thicknessText:
    'Increasing thickness raises forming load quickly and usually requires a larger opening to maintain a practical bend condition.',
  springbackTitle: 'Springback Influence',
  springbackText:
    'Opening choice affects bend radius and forming restraint, which can influence springback compensation during production setup.',
  radiusTitle: 'Inside Radius Relationship',
  radiusText:
    'In air bending, the formed inside radius is commonly influenced by the V opening rather than being defined only by the punch nose. Wider openings generally produce larger natural radii.',
  chartTitle: 'Common V-Die Chart',
  chartIntro:
    'Initial reference only. Confirm flange limits, tooling load rating and trial-bend results before production.',
  chartHeaders: ['Material thickness', 'Initial V-opening reference', 'Check point'],
  chartRows: [
    ['1 to 2 mm', '6T to 8T', 'Surface marking and small flange support'],
    ['3 to 6 mm', '8T', 'Tonnage and target inside radius'],
    ['8 to 12 mm', '8T to 12T', 'Tool load and material ductility'],
  ],
  diagram: {
    eyebrow: 'Tooling Diagram',
    title: 'V-Die opening and air-bending geometry',
    svgTitle: 'Press brake V-die opening diagram',
    svgDescription:
      'Technical diagram showing a punch forming sheet metal over a V die with V opening, inside radius and bend angle callouts.',
    punch: 'Punch',
    sheetMetal: 'Sheet Metal',
    vDie: 'V Die',
    vOpening: 'V Opening',
    insideRadius: 'Inside Radius',
    bendAngle: 'Bend Angle',
  },
  faqTitle: 'Frequently Asked Questions',
  faq: [
    ['Does a wider V opening reduce tonnage?', 'Generally yes. A wider opening increases the forming span and normally reduces required air-bending force.'],
    ['Does V opening affect inside radius?', 'Yes. In air bending, a wider V opening normally creates a larger natural inside radius.'],
    ['Is one opening suitable for every material?', 'No. Material strength, thickness, surface requirements and flange geometry should be checked together.'],
  ],
  notesTitle: 'Engineering Notes',
  notes: [
    'Use the opening range as a setup reference, not a substitute for tooling-capacity checks.',
    'Verify minimum flange support and specified inside radius before releasing a job.',
    'Use trial bends when material grade, thickness tolerance or surface requirement is critical.',
  ],
  relatedTitle: 'Related Engineering Tools',
  relatedAria: 'Related engineering tools',
  relatedLabels: {
    pressBrakeCalculator: 'Press Brake Calculator',
    materialDatabase: 'Material Database',
    vDieSelectionTool: 'V Die Selection Tool',
    insideRadiusGuide: 'Inside Radius Guide',
    springbackDatabase: 'Springback Database',
    bendAllowanceCalculator: 'Bend Allowance Calculator',
    bendDeductionGuide: 'Bend Deduction Guide',
    airBendingGuide: 'Air Bending Guide',
    pressBrakeTonnageGuide: 'Press Brake Tonnage Guide',
    vDieOpeningGuide: 'How to Choose Press Brake V-Die Opening',
    toolingSelectionGuide: 'Press Brake Tooling Selection Guide',
    crowningGuide: 'Press Brake Crowning Guide',
    stainlessSteelBendingGuide: 'Stainless Steel Bending Guide',
    aluminumBendingGuide: 'Aluminum Bending Guide',
    minimumFlangeLengthGuide: 'Minimum Flange Length Guide',
  },
}

const localizedContent = {
  zh: {
    back: '← 返回工程工具中心',
    eyebrow: '工程指南',
    title: '如何选择折弯机 V 型模开口',
    subtitle: '用于在空气折弯中平衡吨位、内圆角与工艺稳定性的 V 型模开口选择参考。',
    introTitle: '简介',
    intro: 'V 型模开口是折弯机空气折弯中的关键模具选择参数，会影响所需吨位、自然内圆角、最小法兰支撑以及折弯对材料波动的敏感程度。',
    principlesTitle: 'V 型模选择原则',
    principles: [
      ['零件几何', '选择开口前，应先确认法兰长度与内圆角要求。'],
      ['设备能力', '较大的开口通常能够降低成形力和模具载荷。'],
      ['材料状态', '强度更高或延展性较低的板材通常需要更温和的成形条件。'],
    ],
    rangeTitle: '推荐 V 型模开口范围',
    rangeIntro: '空气折弯初步选型通常以板厚倍数确定开口，再结合具体工件进行核验。',
    rangeCards: [
      ['薄板', '约为 6T 至 8T'],
      ['常规钣金加工', '约为 8T'],
      ['较厚或较硬材料', '约为 8T 至 12T'],
    ],
    materialTitle: '材料影响',
    materialText: '材料强度与延展性会影响开裂风险、吨位和角度回弹。不锈钢与高强钢通常需要额外核验。',
    thicknessTitle: '板厚影响',
    thicknessText: '板厚增加会快速提高成形载荷，通常需要更大的开口以保持合理的折弯条件。',
    springbackTitle: '回弹影响',
    springbackText: '开口选择会影响折弯半径与成形约束，从而影响生产设定中的回弹补偿。',
    radiusTitle: '内圆角关系',
    radiusText: '在空气折弯中，成形内圆角通常受到 V 型模开口影响，而不仅由冲头圆角决定。较宽开口通常会形成较大的自然内圆角。',
    chartTitle: '常用 V 型模参考表',
    chartIntro: '以下仅用于初步参考。投产前应核对法兰限制、模具额定载荷和试折结果。',
    chartHeaders: ['板厚', '初始 V 型模开口参考', '核对重点'],
    chartRows: [
      ['1 至 2 mm', '6T 至 8T', '表面压痕与小法兰支撑'],
      ['3 至 6 mm', '8T', '吨位与目标内圆角'],
      ['8 至 12 mm', '8T 至 12T', '模具载荷与材料延展性'],
    ],
    diagram: {
      eyebrow: '模具示意图',
      title: 'V 型模开口与空气折弯几何关系',
      svgTitle: '折弯机 V 型模开口示意图',
      svgDescription: '展示冲头、板材、V 型模、V 型模开口、内圆角与折弯角的工程示意图。',
      punch: '冲头',
      sheetMetal: '板材',
      vDie: 'V 型模',
      vOpening: 'V 型模开口',
      insideRadius: '内圆角',
      bendAngle: '折弯角',
    },
    faqTitle: '常见问题',
    faq: [
      ['增大 V 型模开口会降低吨位吗？', '通常会。较宽开口增大成形跨距，一般会降低空气折弯所需力。'],
      ['V 型模开口会影响内圆角吗？', '会。在空气折弯中，较宽开口通常形成较大的自然内圆角。'],
      ['一种开口是否适用于所有材料？', '不适用。应综合核对材料强度、板厚、表面要求与法兰几何。'],
    ],
    notesTitle: '工程说明',
    notes: [
      '开口范围用于工艺设定参考，不能替代模具承载能力核对。',
      '放行工件前，应核实最小法兰支撑与指定内圆角要求。',
      '当材料牌号、厚度公差或表面要求关键时，应进行试折验证。',
    ],
    relatedTitle: '相关工程工具',
    relatedAria: '相关工程工具',
    relatedLabels: {
      pressBrakeCalculator: '折弯机计算器',
      materialDatabase: '材料数据库',
      vDieSelectionTool: 'V 型模选择工具',
      insideRadiusGuide: '内圆角指南',
      springbackDatabase: '回弹数据库',
    bendAllowanceCalculator: '折弯展开计算器',
    bendDeductionGuide: '折弯扣除量指南',
      airBendingGuide: '空气折弯指南',
      pressBrakeTonnageGuide: '折弯机吨位指南',
      vDieOpeningGuide: '如何选择折弯机 V 型模开口',
      toolingSelectionGuide: '折弯机模具选型指南',
      crowningGuide: '折弯机挠度补偿指南',
      stainlessSteelBendingGuide: '不锈钢折弯指南',
    aluminumBendingGuide: '铝板折弯指南',
    minimumFlangeLengthGuide: '最小翻边长度指南',
    },
  },
  ru: {
    back: '← Назад к инженерным инструментам',
    eyebrow: 'Инженерное руководство',
    title: 'Как выбрать раскрытие V-матрицы для листогибочного пресса',
    subtitle: 'Практический справочник по выбору раскрытия V-матрицы для воздушной гибки с учетом усилия, внутреннего радиуса и стабильности процесса.',
    introTitle: 'Введение',
    intro: 'Раскрытие V-матрицы является основным параметром оснастки при воздушной гибке. Оно влияет на требуемое усилие, естественный внутренний радиус, поддержку минимальной полки и чувствительность гиба к изменению материала.',
    principlesTitle: 'Принципы выбора V-матрицы',
    principles: [
      ['Геометрия детали', 'Перед выбором раскрытия проверьте длину полки и требуемый внутренний радиус.'],
      ['Мощность станка', 'Большее раскрытие обычно уменьшает усилие формования и нагрузку на инструмент.'],
      ['Состояние материала', 'Более твердый или менее пластичный лист может требовать более щадящего режима формования.'],
    ],
    rangeTitle: 'Рекомендуемый диапазон раскрытия V-матрицы',
    rangeIntro: 'Для первоначального выбора при воздушной гибке часто используют раскрытие, кратное толщине материала, с последующей проверкой детали.',
    rangeCards: [
      ['Тонкий лист', 'Примерно 6T-8T'],
      ['Обычное производство', 'Примерно 8T'],
      ['Толстый или твердый материал', 'Примерно 8T-12T'],
    ],
    materialTitle: 'Влияние материала',
    materialText: 'Прочность и пластичность материала влияют на риск трещин, усилие и восстановление угла. Нержавеющие и высокопрочные марки обычно требуют дополнительной проверки.',
    thicknessTitle: 'Влияние толщины',
    thicknessText: 'Рост толщины быстро увеличивает нагрузку формования и обычно требует большего раскрытия для практичного режима гибки.',
    springbackTitle: 'Влияние пружинения',
    springbackText: 'Выбор раскрытия влияет на радиус и ограничение формования, а значит и на компенсацию пружинения при наладке.',
    radiusTitle: 'Связь с внутренним радиусом',
    radiusText: 'При воздушной гибке внутренний радиус часто определяется раскрытием V-матрицы, а не только радиусом пуансона. Более широкое раскрытие обычно образует больший естественный радиус.',
    chartTitle: 'Типовая таблица V-матриц',
    chartIntro: 'Только начальный ориентир. Перед производством проверьте ограничения полки, допустимую нагрузку оснастки и результаты пробной гибки.',
    chartHeaders: ['Толщина материала', 'Начальное раскрытие V', 'Проверяемый параметр'],
    chartRows: [
      ['1-2 мм', '6T-8T', 'Следы на поверхности и поддержка узкой полки'],
      ['3-6 мм', '8T', 'Усилие и требуемый внутренний радиус'],
      ['8-12 мм', '8T-12T', 'Нагрузка инструмента и пластичность'],
    ],
    diagram: {
      eyebrow: 'Схема оснастки',
      title: 'Раскрытие V-матрицы и геометрия воздушной гибки',
      svgTitle: 'Схема раскрытия V-матрицы листогибочного пресса',
      svgDescription: 'Инженерная схема пуансона, листа, V-матрицы, раскрытия, внутреннего радиуса и угла гибки.',
      punch: 'Пуансон',
      sheetMetal: 'Лист',
      vDie: 'V-матрица',
      vOpening: 'Раскрытие V',
      insideRadius: 'Внутренний радиус',
      bendAngle: 'Угол гибки',
    },
    faqTitle: 'Частые вопросы',
    faq: [
      ['Уменьшает ли широкое раскрытие усилие?', 'Как правило, да. Более широкое раскрытие увеличивает пролет формования и снижает усилие воздушной гибки.'],
      ['Влияет ли раскрытие V на внутренний радиус?', 'Да. При воздушной гибке более широкое раскрытие обычно создает больший естественный внутренний радиус.'],
      ['Подходит ли одно раскрытие для всех материалов?', 'Нет. Прочность материала, толщину, требования к поверхности и геометрию полки проверяют совместно.'],
    ],
    notesTitle: 'Инженерные примечания',
    notes: [
      'Используйте диапазон раскрытия для наладки, а не вместо проверки допустимой нагрузки инструмента.',
      'Перед запуском детали проверьте минимальную поддержку полки и заданный внутренний радиус.',
      'При критичных марке материала, допуске толщины или поверхности выполняйте пробные гибы.',
    ],
    relatedTitle: 'Связанные инженерные инструменты',
    relatedAria: 'Связанные инженерные инструменты',
    relatedLabels: {
      pressBrakeCalculator: 'Калькулятор листогиба',
      materialDatabase: 'База материалов',
      vDieSelectionTool: 'Выбор V-матрицы',
      insideRadiusGuide: 'Справочник внутреннего радиуса',
      springbackDatabase: 'База пружинения',
    bendAllowanceCalculator: 'Калькулятор припуска на гиб',
    bendDeductionGuide: 'Руководство по вычету гиба',
      airBendingGuide: 'Руководство по воздушной гибке',
      pressBrakeTonnageGuide: 'Руководство по тоннажу пресса',
      vDieOpeningGuide: 'Как выбрать раскрытие V-матрицы листогибочного пресса',
      toolingSelectionGuide: 'Руководство по выбору оснастки листогибочного пресса',
      crowningGuide: 'Руководство по компенсации прогиба листогиба',
      stainlessSteelBendingGuide: 'Руководство по гибке нержавеющей стали',
    aluminumBendingGuide: 'Руководство по гибке алюминия',
    minimumFlangeLengthGuide: 'Руководство по минимальной длине полки',
    },
  },
  es: {
    back: '← Volver al centro de herramientas de ingeniería',
    eyebrow: 'Guía de ingeniería',
    title: 'Cómo elegir la abertura de matriz V para una plegadora',
    subtitle: 'Referencia práctica para seleccionar la abertura de matriz V en plegado al aire equilibrando fuerza, radio interior y estabilidad del proceso.',
    introTitle: 'Introducción',
    intro: 'La abertura de matriz V es una decisión principal de utillaje en el plegado al aire. Afecta al tonelaje requerido, al radio interior natural, al soporte mínimo de pestaña y a la sensibilidad ante variaciones del material.',
    principlesTitle: 'Principios de selección de matriz V',
    principles: [
      ['Geometría de pieza', 'Compruebe la longitud de pestaña y el radio interior requerido antes de elegir la abertura.'],
      ['Capacidad de máquina', 'Una abertura mayor suele reducir la fuerza de conformado y la carga del utillaje.'],
      ['Estado del material', 'Una chapa más dura o menos dúctil puede requerir una condición de conformado menos severa.'],
    ],
    rangeTitle: 'Rango recomendado de abertura V',
    rangeIntro: 'Como referencia inicial para plegado al aire se suele seleccionar una abertura múltiplo del espesor y verificar después la pieza concreta.',
    rangeCards: [
      ['Chapa fina', 'Aproximadamente 6T a 8T'],
      ['Fabricación general', 'Aproximadamente 8T'],
      ['Material grueso o duro', 'Aproximadamente 8T a 12T'],
    ],
    materialTitle: 'Influencia del material',
    materialText: 'La resistencia y ductilidad influyen en el riesgo de grieta, tonelaje y recuperación angular. Los inoxidables y aceros de alta resistencia suelen requerir comprobación adicional.',
    thicknessTitle: 'Influencia del espesor',
    thicknessText: 'Al aumentar el espesor, la carga de conformado crece rápidamente y normalmente se necesita una abertura mayor.',
    springbackTitle: 'Influencia del retorno elástico',
    springbackText: 'La abertura afecta al radio y a la restricción de conformado, por lo que puede influir en la compensación del retorno elástico.',
    radiusTitle: 'Relación con el radio interior',
    radiusText: 'En plegado al aire, el radio interior suele estar influido por la abertura V y no únicamente por el radio del punzón. Las aberturas mayores suelen generar radios naturales mayores.',
    chartTitle: 'Tabla habitual de matrices V',
    chartIntro: 'Referencia inicial únicamente. Verifique límites de pestaña, carga admisible del utillaje y resultados de prueba antes de producir.',
    chartHeaders: ['Espesor del material', 'Referencia inicial de abertura V', 'Punto de comprobación'],
    chartRows: [
      ['1 a 2 mm', '6T a 8T', 'Marcas superficiales y soporte de pestaña corta'],
      ['3 a 6 mm', '8T', 'Tonelaje y radio interior requerido'],
      ['8 a 12 mm', '8T a 12T', 'Carga de utillaje y ductilidad'],
    ],
    diagram: {
      eyebrow: 'Diagrama de utillaje',
      title: 'Abertura de matriz V y geometría de plegado al aire',
      svgTitle: 'Diagrama de abertura de matriz V para plegadora',
      svgDescription: 'Diagrama técnico con punzón, chapa, matriz V, abertura V, radio interior y ángulo de plegado.',
      punch: 'Punzón',
      sheetMetal: 'Chapa',
      vDie: 'Matriz V',
      vOpening: 'Abertura V',
      insideRadius: 'Radio interior',
      bendAngle: 'Ángulo de plegado',
    },
    faqTitle: 'Preguntas frecuentes',
    faq: [
      ['¿Una abertura V mayor reduce el tonelaje?', 'Generalmente sí. Una abertura mayor incrementa el tramo de conformado y suele reducir la fuerza necesaria.'],
      ['¿La abertura V afecta al radio interior?', 'Sí. En plegado al aire, una abertura mayor suele crear un radio interior natural mayor.'],
      ['¿Una abertura sirve para todos los materiales?', 'No. Deben comprobarse conjuntamente resistencia, espesor, superficie y geometría de pestaña.'],
    ],
    notesTitle: 'Notas de ingeniería',
    notes: [
      'Utilice el rango de abertura como referencia de preparación, no como sustituto de la verificación de carga del utillaje.',
      'Compruebe el soporte mínimo de pestaña y el radio interior especificado antes de liberar el trabajo.',
      'Realice pruebas de plegado cuando sean críticos el grado, la tolerancia de espesor o la superficie.',
    ],
    relatedTitle: 'Herramientas de ingeniería relacionadas',
    relatedAria: 'Herramientas de ingeniería relacionadas',
    relatedLabels: {
      pressBrakeCalculator: 'Calculadora de plegadora',
      materialDatabase: 'Base de datos de materiales',
      vDieSelectionTool: 'Selección de matriz V',
      insideRadiusGuide: 'Guía de radio interior',
      springbackDatabase: 'Base de datos de retorno elástico',
    bendAllowanceCalculator: 'Calculadora de desarrollo de plegado',
    bendDeductionGuide: 'Guía de deducción de plegado',
      airBendingGuide: 'Guía de plegado al aire',
      pressBrakeTonnageGuide: 'Guía de tonelaje para plegadoras',
      vDieOpeningGuide: 'Cómo elegir la abertura de matriz V para una plegadora',
      toolingSelectionGuide: 'Guía de selección de utillaje para plegadora',
      crowningGuide: 'Guía de compensación de flecha para plegadoras',
      stainlessSteelBendingGuide: 'Guía de plegado de acero inoxidable',
    aluminumBendingGuide: 'Guía de plegado de aluminio',
    minimumFlangeLengthGuide: 'Guía de longitud mínima de pestaña',
    },
  },
  tr: {
    back: '← Mühendislik araçları merkezine dön',
    eyebrow: 'Mühendislik Kılavuzu',
    title: 'Abkant Pres İçin V Kalıp Açıklığı Nasıl Seçilir',
    subtitle: 'Havada bükmede kuvvet, iç radyüs ve proses kararlılığını dengeleyen V kalıp açıklığı seçimi için pratik referans.',
    introTitle: 'Giriş',
    intro: 'V kalıp açıklığı, abkant pres havada bükme işleminin temel takım seçimlerinden biridir. Gerekli tonajı, doğal iç radyüsü, asgari flanş desteğini ve malzeme değişimine duyarlılığı etkiler.',
    principlesTitle: 'V Kalıp Seçim İlkeleri',
    principles: [
      ['Parça geometrisi', 'Açıklık seçiminden önce flanş uzunluğunu ve iç radyüs gereksinimini doğrulayın.'],
      ['Makine kapasitesi', 'Daha geniş bir açıklık genellikle şekillendirme kuvvetini ve takım yükünü azaltır.'],
      ['Malzeme durumu', 'Daha sert veya sünekliği düşük sac daha yumuşak bir şekillendirme koşulu gerektirebilir.'],
    ],
    rangeTitle: 'Önerilen V Açıklığı Aralığı',
    rangeIntro: 'Havada bükme için ilk referans olarak açıklık çoğunlukla malzeme kalınlığının katı şeklinde seçilir ve daha sonra iş parçasıyla doğrulanır.',
    rangeCards: [
      ['İnce sac', 'Yaklaşık 6T ile 8T'],
      ['Genel imalat', 'Yaklaşık 8T'],
      ['Kalın veya sert malzeme', 'Yaklaşık 8T ile 12T'],
    ],
    materialTitle: 'Malzeme Etkisi',
    materialText: 'Malzeme dayanımı ve sünekliği çatlama riskini, tonajı ve açı geri dönüşünü etkiler. Paslanmaz ve yüksek dayanımlı sınıflar genellikle ek kontrol gerektirir.',
    thicknessTitle: 'Kalınlık Etkisi',
    thicknessText: 'Kalınlık arttıkça şekillendirme yükü hızla artar ve uygulanabilir büküm koşulu için genellikle daha büyük açıklık gerekir.',
    springbackTitle: 'Geri Esneme Etkisi',
    springbackText: 'Açıklık seçimi büküm radyüsünü ve şekillendirme kısıtlamasını etkileyerek üretim ayarındaki geri esneme telafisini değiştirebilir.',
    radiusTitle: 'İç Radyüs İlişkisi',
    radiusText: 'Havada bükmede oluşan iç radyüs çoğu zaman yalnızca zımba ucundan değil, V açıklığından etkilenir. Daha geniş açıklıklar genellikle daha büyük doğal radyüs oluşturur.',
    chartTitle: 'Yaygın V Kalıp Tablosu',
    chartIntro: 'Yalnızca ilk referanstır. Üretimden önce flanş sınırlarını, takım yük değerini ve deneme bükümü sonuçlarını doğrulayın.',
    chartHeaders: ['Malzeme kalınlığı', 'İlk V açıklığı referansı', 'Kontrol noktası'],
    chartRows: [
      ['1 ile 2 mm', '6T ile 8T', 'Yüzey izi ve kısa flanş desteği'],
      ['3 ile 6 mm', '8T', 'Tonaj ve hedef iç radyüs'],
      ['8 ile 12 mm', '8T ile 12T', 'Takım yükü ve süneklik'],
    ],
    diagram: {
      eyebrow: 'Takım Şeması',
      title: 'V kalıp açıklığı ve havada bükme geometrisi',
      svgTitle: 'Abkant pres V kalıp açıklığı şeması',
      svgDescription: 'Zımba, sac, V kalıp, V açıklığı, iç radyüs ve büküm açısını gösteren teknik şema.',
      punch: 'Zımba',
      sheetMetal: 'Sac',
      vDie: 'V Kalıp',
      vOpening: 'V Açıklığı',
      insideRadius: 'İç Radyüs',
      bendAngle: 'Büküm Açısı',
    },
    faqTitle: 'Sık Sorulan Sorular',
    faq: [
      ['Daha geniş V açıklığı tonajı azaltır mı?', 'Genellikle evet. Daha geniş açıklık şekillendirme açıklığını artırır ve gerekli havada bükme kuvvetini azaltır.'],
      ['V açıklığı iç radyüsü etkiler mi?', 'Evet. Havada bükmede daha geniş bir açıklık genellikle daha büyük doğal iç radyüs oluşturur.'],
      ['Tek bir açıklık her malzeme için uygun mudur?', 'Hayır. Malzeme dayanımı, kalınlık, yüzey gereksinimi ve flanş geometrisi birlikte kontrol edilmelidir.'],
    ],
    notesTitle: 'Mühendislik Notları',
    notes: [
      'Açıklık aralığını takım yük kontrolünün yerine değil, ayar referansı olarak kullanın.',
      'İşi serbest bırakmadan önce asgari flanş desteğini ve belirtilen iç radyüsü doğrulayın.',
      'Malzeme sınıfı, kalınlık toleransı veya yüzey gereksinimi kritikse deneme bükümü uygulayın.',
    ],
    relatedTitle: 'İlgili mühendislik araçları',
    relatedAria: 'İlgili mühendislik araçları',
    relatedLabels: {
      pressBrakeCalculator: 'Abkant pres hesaplayıcısı',
      materialDatabase: 'Malzeme veritabanı',
      vDieSelectionTool: 'V kalıp seçim aracı',
      insideRadiusGuide: 'İç radyüs kılavuzu',
      springbackDatabase: 'Geri esneme veritabanı',
    bendAllowanceCalculator: 'Büküm payı hesaplayıcısı',
    bendDeductionGuide: 'Büküm Düşümü Kılavuzu',
      airBendingGuide: 'Havada bükme kılavuzu',
      pressBrakeTonnageGuide: 'Abkant pres tonaj kılavuzu',
      vDieOpeningGuide: 'Abkant Pres İçin V Kalıp Açıklığı Nasıl Seçilir',
      toolingSelectionGuide: 'Abkant pres takım seçimi kılavuzu',
      crowningGuide: 'Abkant pres sehim kompanzasyonu kılavuzu',
      stainlessSteelBendingGuide: 'Paslanmaz Çelik Büküm Kılavuzu',
    aluminumBendingGuide: 'Alüminyum Büküm Kılavuzu',
    minimumFlangeLengthGuide: 'Minimum Flanş Boyu Kılavuzu',
    },
  },
  id: {
    back: '← Kembali ke pusat alat teknik',
    eyebrow: 'Panduan Teknik',
    title: 'Cara Memilih Bukaan Cetakan V Press Brake',
    subtitle: 'Referensi praktis untuk memilih bukaan cetakan V pada tekuk udara dengan menyeimbangkan gaya, radius dalam, dan kestabilan proses.',
    introTitle: 'Pendahuluan',
    intro: 'Bukaan cetakan V merupakan keputusan perkakas utama pada proses tekuk udara press brake. Nilainya memengaruhi tonase yang diperlukan, radius dalam alami, dukungan sayap minimum, dan kepekaan tekukan terhadap variasi material.',
    principlesTitle: 'Prinsip Pemilihan Cetakan V',
    principles: [
      ['Geometri komponen', 'Pastikan panjang sayap dan kebutuhan radius dalam sebelum memilih bukaan.'],
      ['Kapasitas mesin', 'Bukaan yang lebih lebar umumnya menurunkan gaya pembentukan dan beban perkakas.'],
      ['Kondisi material', 'Lembaran yang lebih keras atau kurang ulet dapat memerlukan kondisi pembentukan yang lebih ringan.'],
    ],
    rangeTitle: 'Rentang Bukaan V yang Disarankan',
    rangeIntro: 'Referensi awal tekuk udara umumnya memilih bukaan sebagai kelipatan ketebalan material, kemudian memverifikasinya pada komponen.',
    rangeCards: [
      ['Lembaran tipis', 'Sekitar 6T hingga 8T'],
      ['Fabrikasi umum', 'Sekitar 8T'],
      ['Material lebih tebal atau keras', 'Sekitar 8T hingga 12T'],
    ],
    materialTitle: 'Pengaruh Material',
    materialText: 'Kekuatan dan keuletan material memengaruhi risiko retak, tonase, dan pemulihan sudut. Baja tahan karat dan baja berkekuatan tinggi biasanya memerlukan pemeriksaan tambahan.',
    thicknessTitle: 'Pengaruh Ketebalan',
    thicknessText: 'Peningkatan ketebalan menaikkan beban pembentukan dengan cepat dan biasanya memerlukan bukaan lebih besar agar kondisi tekuk tetap praktis.',
    springbackTitle: 'Pengaruh Pegas Balik',
    springbackText: 'Pemilihan bukaan memengaruhi radius tekuk dan pengekangan pembentukan, sehingga dapat memengaruhi kompensasi pegas balik saat penyetelan produksi.',
    radiusTitle: 'Hubungan Radius Dalam',
    radiusText: 'Pada tekuk udara, radius dalam yang terbentuk umumnya dipengaruhi bukaan V, bukan hanya radius ujung pons. Bukaan yang lebih lebar biasanya menghasilkan radius alami lebih besar.',
    chartTitle: 'Tabel Cetakan V Umum',
    chartIntro: 'Hanya sebagai referensi awal. Pastikan batas sayap, nilai beban perkakas, dan hasil uji tekuk sebelum produksi.',
    chartHeaders: ['Ketebalan material', 'Referensi awal bukaan V', 'Titik pemeriksaan'],
    chartRows: [
      ['1 hingga 2 mm', '6T hingga 8T', 'Bekas permukaan dan dukungan sayap pendek'],
      ['3 hingga 6 mm', '8T', 'Tonase dan target radius dalam'],
      ['8 hingga 12 mm', '8T hingga 12T', 'Beban perkakas dan keuletan material'],
    ],
    diagram: {
      eyebrow: 'Diagram Perkakas',
      title: 'Bukaan cetakan V dan geometri tekuk udara',
      svgTitle: 'Diagram bukaan cetakan V press brake',
      svgDescription: 'Diagram teknis yang menampilkan pons, lembaran, cetakan V, bukaan V, radius dalam, dan sudut tekuk.',
      punch: 'Pons',
      sheetMetal: 'Lembaran',
      vDie: 'Cetakan V',
      vOpening: 'Bukaan V',
      insideRadius: 'Radius Dalam',
      bendAngle: 'Sudut Tekuk',
    },
    faqTitle: 'Pertanyaan Umum',
    faq: [
      ['Apakah bukaan V yang lebih lebar menurunkan tonase?', 'Umumnya ya. Bukaan yang lebih lebar menambah bentang pembentukan dan biasanya menurunkan gaya tekuk udara.'],
      ['Apakah bukaan V memengaruhi radius dalam?', 'Ya. Pada tekuk udara, bukaan lebih lebar biasanya menghasilkan radius dalam alami yang lebih besar.'],
      ['Apakah satu bukaan sesuai untuk semua material?', 'Tidak. Kekuatan material, ketebalan, kebutuhan permukaan, dan geometri sayap harus diperiksa bersama.'],
    ],
    notesTitle: 'Catatan Teknik',
    notes: [
      'Gunakan rentang bukaan sebagai referensi penyetelan, bukan pengganti pemeriksaan kapasitas beban perkakas.',
      'Periksa dukungan sayap minimum dan radius dalam yang ditentukan sebelum melepas pekerjaan.',
      'Lakukan uji tekuk apabila mutu material, toleransi ketebalan, atau kebutuhan permukaan bersifat kritis.',
    ],
    relatedTitle: 'Alat teknik terkait',
    relatedAria: 'Alat teknik terkait',
    relatedLabels: {
      pressBrakeCalculator: 'Kalkulator press brake',
      materialDatabase: 'Basis data material',
      vDieSelectionTool: 'Alat pemilihan cetakan V',
      insideRadiusGuide: 'Panduan radius dalam',
      springbackDatabase: 'Basis data pegas balik',
    bendAllowanceCalculator: 'Kalkulator kelonggaran tekuk',
    bendDeductionGuide: 'Panduan Bend Deduction',
      airBendingGuide: 'Panduan tekuk udara',
      pressBrakeTonnageGuide: 'Panduan tonase press brake',
      vDieOpeningGuide: 'Cara Memilih Bukaan Cetakan V Press Brake',
      toolingSelectionGuide: 'Panduan pemilihan perkakas mesin tekuk',
      crowningGuide: 'Panduan kompensasi lendutan press brake',
      stainlessSteelBendingGuide: 'Panduan Tekuk Stainless Steel',
    aluminumBendingGuide: 'Panduan Tekuk Aluminium',
    minimumFlangeLengthGuide: 'Panduan Panjang Flange Minimum',
    },
  },
}

const engineeringContent = {
  en: {
    intro:
      'Selecting a V opening is not just choosing a number from a chart. In an air-bending job, the opening sets the support span under the sheet and therefore influences force, the naturally formed radius, flange support, marking and repeatability. A usable selection must suit the drawing, the material batch, the tooling rating and the production run.',
    principlesTitle: 'V Opening Selection Core Rules',
    principlesIntro:
      'For mild-steel air bending, 6T to 8T is widely used because it is usually the workable balance between force, a controllable natural radius and sufficient support for common flanges. It is a starting window, not an automatic approval.',
    principles: [
      ['Why 6T to 8T is common', 'At roughly 6T to 8T, ordinary sheet can usually bend without excessive load while keeping the radius and short-flange support practical. Begin here, then verify radius, flange and tonnage.'],
      ['Smaller V opening', 'A narrow die can produce a tighter radius and support a shorter flange, but force rises sharply. Shoulder marks, coating damage, tool wear and cracking risk also rise.'],
      ['Larger V opening', 'A wider die lowers tonnage and is gentler on tooling and visible surfaces, but produces a larger inside radius, requires a longer supported flange and can increase springback sensitivity.'],
      ['Stable production choice', 'For repeated work, avoid choosing the narrowest opening that merely achieves one test part. Reserve capacity for thickness variation, grain direction, wear and material-lot changes.'],
    ],
    rangeIntro:
      'The ratios below are shop-floor starting points for air bending. A narrow opening is selected only when flange or radius control requires it and the available tonnage and material ductility are confirmed.',
    rangeCards: [
      ['6T range', 'Tighter radius or limited flange; check force, marks and crack tendency closely.'],
      ['8T range', 'Typical production baseline for general mild-steel sheet and balanced repeatability.'],
      ['10T to 12T range', 'Useful for heavy, hard or surface-sensitive work when radius and flange geometry allow.'],
    ],
    materialSelectionTitle: 'Material Influence on V Die Selection',
    materialSelectionIntro:
      'The same thickness does not mean the same bending condition. Tensile strength, ductility, finish and accepted inside radius determine whether the opening must be widened or the surface protected.',
    materialCards: [
      ['Mild Steel', 'Often starts at 6T to 8T. It normally gives predictable radius formation and moderate springback, making it the reference condition for tooling trials.'],
      ['Stainless Steel', 'Higher force and greater springback are common. A less severe opening and protective film are often considered because polished faces show shoulder marking easily.'],
      ['Aluminum', 'Lower force does not remove the risk of cosmetic marking or cracking in hard tempers. Protect visible surfaces and avoid forcing an unnecessarily tight radius.'],
      ['High Strength Steel', 'Use a larger opening and generous radius unless the material specification proves otherwise. Narrow dies increase load concentration, microcrack risk and long-term shoulder wear.'],
    ],
    flangeTitle: 'Minimum Flange Length',
    flangeText:
      'A flange must remain supported on the die shoulders as the punch enters. Increasing V opening moves the support points farther apart; a short leg may drop into the opening before angle control is established.',
    flangeCards: [
      ['Short flange risk', 'If the leg is too short for the selected V, it can tip, slide or be pulled into the die, producing angle scatter and dimensional drift.'],
      ['Common shop-floor mistake', 'Operators sometimes widen the die to reduce tonnage, then discover that a return flange no longer sits reliably on both shoulders.'],
      ['Release check', 'Before production, place the shortest flange on the actual tooling and confirm stable support through a slow trial bend, especially on unequal legs.'],
    ],
    mistakesTitle: 'Common V Die Selection Mistakes',
    mistakes: [
      ['V opening too small', 'Excess force, small-radius cracking and accelerated shoulder wear are frequent results.'],
      ['V opening too large', 'The bend radius grows and short flanges can lose support or fall into the opening.'],
      ['Incorrect tooling matching', 'Punch radius, die angle, V width and load rating must suit the drawing and the material together.'],
      ['Narrow die used to force a radius', 'Using extra tonnage to force a tight shape may exceed tool or machine limits without delivering stable production.'],
      ['Surface marking ignored', 'Stainless, aluminum and prefinished parts often need clean tooling, film or anti-mark protection before a long run.'],
    ],
    chartTitle: 'Thickness vs Recommended V Opening',
    chartIntro:
      'Initial air-bending references for ordinary production. Confirm material grade, shortest flange, required radius and tooling load before release.',
    chartHeaders: ['Thickness', 'Initial V opening', 'Approximate inside radius', 'Production check'],
    chartRows: [
      ['1.0 mm', '6 to 8 mm', '1.0 to 1.3 mm', 'Marking and small flange support'],
      ['2.0 mm', '12 to 16 mm', '2.0 to 2.6 mm', 'Coating protection and angle repeatability'],
      ['3.0 mm', '18 to 24 mm', '3.0 to 4.0 mm', 'Force and drawing radius'],
      ['4.0 mm', '24 to 32 mm', '4.0 to 5.2 mm', 'Tool rating and batch variation'],
      ['6.0 mm', '48 to 60 mm', '7.0 to 10.0 mm', 'Flange length and capacity margin'],
      ['8.0 mm', '64 to 80 mm', '10.0 to 13.0 mm', 'Heavy tooling and ductility'],
    ],
    radiusChartTitle: 'Approximate Inside Radius',
    radiusChartIntro:
      'For air bending, the natural inside radius follows the die opening more than the punch nose until the punch is too large or bottoming occurs. These ratios are practical starting observations, not inspection tolerances.',
    radiusChartHeaders: ['Opening selection', 'Radius tendency', 'Typical reason to select', 'Required confirmation'],
    radiusChartRows: [
      ['About 6T', 'Tighter natural radius', 'Short flange or smaller radius demand', 'Force, marking and cracking'],
      ['About 8T', 'Balanced natural radius', 'General production air bending', 'Trial angle and lot variation'],
      ['About 10T to 12T', 'Larger natural radius', 'Harder, thicker or surface-critical sheet', 'Drawing radius and flange support'],
    ],
    trendChartTitle: 'General Air Bending Trend',
    trendChartIntro:
      'Opening choice changes several process outcomes at the same time; improving one condition can create a different production constraint.',
    trendChartHeaders: ['V opening change', 'Tonnage', 'Inside radius / springback', 'Tooling and stability'],
    trendChartRows: [
      ['Narrower opening', 'Increases', 'Smaller radius; compensation may become sensitive', 'Higher marks and shoulder load'],
      ['Balanced opening', 'Moderate', 'Predictable for normal batches', 'Usually the most repeatable setup'],
      ['Wider opening', 'Decreases', 'Larger radius; springback influence increases', 'Lower tool load, but needs longer flange'],
    ],
    faq: [
      ['Why is 8T often used as the first setup?', 'It is commonly a practical compromise: force is manageable, the natural radius is usable for many drawings, and ordinary flanges retain support. It must still be checked against the actual part.'],
      ['Should stainless use the same V opening as mild steel?', 'Not automatically. Stainless normally requires more force and exhibits more springback; surface marking can also be more visible. A wider opening or surface protection may be appropriate.'],
      ['Can I widen the V opening to solve a tonnage shortage?', 'Only after checking the required radius and minimum flange. Reducing force by widening the die can make a short flange unstable or produce an unacceptable radius.'],
      ['Why do marks appear along the die shoulders?', 'The sheet carries high contact pressure at the shoulders during sliding and rotation. Narrow openings, dirty tooling and decorative material increase the risk.'],
    ],
    notesTitle: 'Engineering Experience Notes',
    notes: [
      'For continuous production, do not plan a process that repeatedly operates near the maximum rated machine or tooling load. A larger practical opening can improve load margin and tool life.',
      'On thick plate or high-strength steel, confirm the material certificate, grain direction and permitted bend radius before selecting an aggressive narrow die.',
      'A die that survives a short trial may still show rapid shoulder wear during a long run if the opening concentrates load unnecessarily.',
      'For exposed stainless, aluminum or coated parts, clean the shoulders and evaluate protective film or anti-mark tooling before approving the process.',
      'In volume production, record the successful V opening, punch radius, material batch and measured first-off angle; stable setup records prevent repeat faults.'],
  },
  zh: {
    intro: '选择 V 型模开口不是简单查表取数。空气折弯时，开口决定板材下方的支撑跨距，进而影响吨位、自然成形内圆角、法兰支撑、表面压痕和批量重复性。可投入生产的选型必须同时满足图纸、材料批次、模具额定载荷与生产节拍。',
    principlesTitle: 'V 型模开口选择核心规则',
    principlesIntro: '对于普通低碳钢空气折弯，6T 至 8T 被广泛采用，是因为这一范围通常能在成形力、可控自然内圆角以及常见法兰支撑之间取得可操作的平衡。它是起始窗口，不是免检结论。',
    principles: [
      ['为什么常用 6T 至 8T', '在约 6T 至 8T 范围内，常用板材一般不会产生过高载荷，同时半径与短边支撑仍较实用。应以此起步，再核对半径、法兰和吨位。'],
      ['较小 V 开口', '可获得更紧的内圆角并支撑更短法兰，但成形力显著升高，模肩压痕、涂层损伤、模具磨损和开裂风险都会增加。'],
      ['较大 V 开口', '可降低吨位并减轻模具和可视表面负担，但会形成更大的内圆角，需要更长受支撑法兰，并可能提高回弹敏感性。'],
      ['稳定生产选择', '重复生产时，不要仅凭一件试样合格就采用最窄开口；应为板厚波动、轧制方向、磨损和材料批次变化保留余量。'],
    ],
    rangeIntro: '以下倍数是空气折弯的车间起始参考。只有在短法兰或小半径确实需要，并且吨位与材料延展性得到确认时，才应选用偏窄开口。',
    rangeCards: [
      ['6T 范围', '适用于较紧半径或受限法兰；必须重点检查吨位、压痕与裂纹倾向。'],
      ['8T 范围', '普通低碳钢钣金生产的常用基准，兼顾负载与重复稳定性。'],
      ['10T 至 12T 范围', '适用于厚板、较硬材料或表面敏感工件，前提是半径和法兰几何允许。'],
    ],
    materialSelectionTitle: '材料对 V 型模选择的影响',
    materialSelectionIntro: '相同板厚并不代表相同折弯工况。抗拉强度、延展性、表面状态和允许内圆角共同决定是否需要放大开口或保护表面。',
    materialCards: [
      ['低碳钢', '通常从 6T 至 8T 起步，圆角形成较可预测，回弹适中，是试模与工艺建立的基准工况。'],
      ['不锈钢', '常见更高成形力和更大回弹。抛光表面对模肩压痕敏感，通常应考虑较温和开口与保护膜。'],
      ['铝材', '所需力较低并不等于没有外观压痕或硬状态开裂风险。可视面应保护，不宜强行追求过紧圆角。'],
      ['高强钢', '除非材料规范明确允许，否则宜使用更大开口与更充分半径。窄模会加剧载荷集中、微裂纹风险和长期模肩磨损。'],
    ],
    flangeTitle: '最小法兰长度',
    flangeText: '冲头进入时，法兰必须持续支撑在两侧模肩上。V 开口增大后，支点间距变大；短边可能在角度尚未建立前滑落进入开口。',
    flangeCards: [
      ['短边风险', '若法兰相对所选开口过短，工件可能倾斜、滑移或掉入模口，导致角度波动与尺寸漂移。'],
      ['常见车间错误', '为降低吨位而临时换用宽模后，才发现回边无法稳定搭在两侧模肩上，这是常见失误。'],
      ['放行检查', '投产前应将最短法兰放在实际模具上，以慢速试折确认全行程支撑稳定，尤其是不等边零件。'],
    ],
    mistakesTitle: '常见 V 型模选型错误',
    mistakes: [
      ['V 开口过小', '常造成过高成形力、小半径开裂以及模肩加速磨损。'],
      ['V 开口过大', '内圆角增大，短法兰可能失去支撑或掉入开口。'],
      ['模具匹配错误', '冲头半径、下模角度、V 宽度和额定载荷必须与图纸及材料共同匹配。'],
      ['用窄模强行压小圆角', '以额外吨位强压形状，可能超过机床或模具限制，却仍无法获得稳定批量结果。'],
      ['忽略表面压痕', '不锈钢、铝材与预涂层工件在长批次前通常需要洁净模肩、保护膜或防压痕方案。'],
    ],
    chartTitle: '板厚与推荐 V 型模开口',
    chartIntro: '以下为空气折弯普通生产的初始参考。放行前应确认材料牌号、最短法兰、目标半径以及模具承载能力。',
    chartHeaders: ['板厚', '初始 V 开口', '近似内圆角', '生产核对重点'],
    chartRows: [
      ['1.0 mm', '6 至 8 mm', '1.0 至 1.3 mm', '表面压痕与小法兰支撑'],
      ['2.0 mm', '12 至 16 mm', '2.0 至 2.6 mm', '涂层保护与角度重复性'],
      ['3.0 mm', '18 至 24 mm', '3.0 至 4.0 mm', '吨位与图纸半径'],
      ['4.0 mm', '24 至 32 mm', '4.0 至 5.2 mm', '模具额定值与批次波动'],
      ['6.0 mm', '48 至 60 mm', '7.0 至 10.0 mm', '法兰长度与能力余量'],
      ['8.0 mm', '64 至 80 mm', '10.0 至 13.0 mm', '重型模具与延展性'],
    ],
    radiusChartTitle: '近似内圆角趋势',
    radiusChartIntro: '在空气折弯中，未进入压底状态前，自然内圆角更多受下模开口影响，而非仅由冲头尖端决定。以下为工艺起始观察，不是检验公差。',
    radiusChartHeaders: ['开口选择', '圆角趋势', '典型选用原因', '必须确认项目'],
    radiusChartRows: [
      ['约 6T', '自然内圆角较紧', '短法兰或较小半径需求', '吨位、压痕与开裂'],
      ['约 8T', '自然内圆角平衡', '常规批量空气折弯', '试折角度与材料批次'],
      ['约 10T 至 12T', '自然内圆角较大', '较硬、较厚或表面关键板材', '图纸半径与法兰支撑'],
    ],
    trendChartTitle: '空气折弯总体趋势',
    trendChartIntro: '开口调整会同时改变多个工艺结果；解决一个问题时，往往会引入另一项生产约束。',
    trendChartHeaders: ['V 开口变化', '吨位', '内圆角 / 回弹', '模具与稳定性'],
    trendChartRows: [
      ['开口变窄', '升高', '圆角变小；补偿可能更敏感', '压痕和模肩负载增加'],
      ['平衡开口', '适中', '普通批次较可预测', '通常最利于重复生产'],
      ['开口变宽', '降低', '圆角变大；回弹影响增加', '模具负载降低，但需更长法兰'],
    ],
    faq: [
      ['为什么常以 8T 作为初始设定？', '它通常是实用折中点：载荷可控，自然半径适用于较多图纸，普通法兰也有足够支撑；但仍须对实际零件验证。'],
      ['不锈钢能否直接使用低碳钢相同开口？', '不能直接套用。不锈钢通常需要更高力并有更明显回弹，表面压痕也更易见，可能需要较宽开口或表面保护。'],
      ['吨位不足时能否直接放大 V 开口？', '只能在核对目标内圆角和最小法兰后进行。宽模虽能降低力，但可能让短边不稳或使圆角超差。'],
      ['为什么模肩会出现长条压痕？', '板材在旋转滑移过程中于模肩承受较高接触压力。窄开口、模面污染和装饰面材料会加大风险。'],
    ],
    notesTitle: '工程经验说明',
    notes: [
      '连续生产时，不应规划长期贴近机床或模具额定极限的工艺；在几何允许时采用较大的合理开口，有助于保留负载余量并延长模具寿命。',
      '厚板或高强钢选模前，应核对材料证明、轧制方向与许可折弯半径，避免以偏窄模具冒险成形。',
      '能通过短时试折的模具，在长批次中仍可能因载荷过度集中而迅速产生模肩磨损。',
      '对于外观不锈钢、铝板或涂层件，放行前应清洁模肩，并验证保护膜或防压痕模具方案。',
      '批量生产应记录成功的 V 开口、冲头半径、材料批次和首件实测角度，稳定记录可避免重复故障。'],
  },
  ru: {
    intro: 'Выбор раскрытия V-матрицы - это не простое чтение таблицы. При воздушной гибке раскрытие задает пролет опоры под листом и тем самым влияет на усилие, естественный внутренний радиус, поддержку полки, следы на поверхности и повторяемость. Производственный выбор должен учитывать чертеж, партию материала, паспортную нагрузку оснастки и объем выпуска.',
    principlesTitle: 'Основные правила выбора раскрытия V',
    principlesIntro: 'Для воздушной гибки низкоуглеродистой стали часто применяют 6T-8T: этот диапазон обычно дает рабочий баланс между усилием, управляемым естественным радиусом и опорой типовых полок. Это начальная зона, а не автоматическое разрешение.',
    principles: [
      ['Почему часто выбирают 6T-8T', 'В диапазоне около 6T-8T обычный лист обычно гнется без чрезмерной нагрузки, а радиус и поддержка короткой полки остаются практичными. Далее проверяют радиус, полку и усилие.'],
      ['Малое раскрытие V', 'Позволяет получить меньший радиус и поддержать короткую полку, но резко повышает усилие, следы на плечах, износ инструмента и риск трещин.'],
      ['Большое раскрытие V', 'Снижает усилие и щадит инструмент и видимые поверхности, но дает больший радиус, требует более длинной полки и усиливает чувствительность к пружинению.'],
      ['Стабильность серии', 'Для повторяемой работы не выбирайте самое узкое раскрытие только по одному пробному образцу; оставляйте запас на толщину, направление прокатки, износ и смену партии.'],
    ],
    rangeIntro: 'Приведенные коэффициенты являются начальными цеховыми ориентирами для воздушной гибки. Узкую матрицу выбирают только при необходимости по полке или радиусу после проверки усилия и пластичности.',
    rangeCards: [
      ['Диапазон 6T', 'Для меньшего радиуса или ограниченной полки; особенно проверяйте усилие, следы и склонность к трещинам.'],
      ['Диапазон 8T', 'Типовая производственная база для обычной низкоуглеродистой стали с хорошей повторяемостью.'],
      ['Диапазон 10T-12T', 'Для толстого, твердого или чувствительного к поверхности листа, если позволяют радиус и геометрия полки.'],
    ],
    materialSelectionTitle: 'Влияние материала на выбор V-матрицы',
    materialSelectionIntro: 'Одинаковая толщина не означает одинаковый режим гибки. Прочность, пластичность, отделка и допустимый внутренний радиус определяют необходимость увеличить раскрытие или защитить поверхность.',
    materialCards: [
      ['Низкоуглеродистая сталь', 'Часто начинают с 6T-8T. Радиус формируется предсказуемо, а пружинение умеренно, поэтому материал удобен как базовый для проб оснастки.'],
      ['Нержавеющая сталь', 'Обычно требует большего усилия и имеет большее пружинение. Полированные поверхности легко получают следы от плеч, поэтому рассматривают более щадящее раскрытие и пленку.'],
      ['Алюминий', 'Меньшее усилие не исключает косметических следов или трещин в твердых состояниях. Видимые поверхности защищают и не принуждают к излишне малому радиусу.'],
      ['Высокопрочная сталь', 'Если спецификация не подтверждает иное, применяют большее раскрытие и достаточный радиус. Узкие матрицы усиливают концентрацию нагрузки, микротрещины и износ плеч.'],
    ],
    flangeTitle: 'Минимальная длина полки',
    flangeText: 'При ходе пуансона полка должна сохранять опору на обоих плечах матрицы. Чем больше раскрытие V, тем дальше точки опоры; короткая сторона может провалиться в раскрытие до стабилизации угла.',
    flangeCards: [
      ['Риск короткой полки', 'Недостаточно длинная полка наклоняется, скользит или затягивается в матрицу, вызывая разброс угла и размеров.'],
      ['Частая ошибка в цехе', 'Раскрытие увеличивают для снижения усилия, а затем обнаруживают, что обратная полка уже не лежит устойчиво на двух плечах.'],
      ['Проверка перед запуском', 'Установите самую короткую полку на фактическую оснастку и выполните медленный пробный гиб, особенно для неравных сторон.'],
    ],
    mistakesTitle: 'Распространенные ошибки выбора V-матрицы',
    mistakes: [
      ['Слишком малое раскрытие', 'Часто приводит к чрезмерному усилию, трещинам малого радиуса и ускоренному износу плеч.'],
      ['Слишком большое раскрытие', 'Увеличивает радиус, а короткая полка может потерять опору или провалиться.'],
      ['Неверное сочетание инструмента', 'Радиус пуансона, угол матрицы, ширина V и допустимая нагрузка должны вместе соответствовать чертежу и материалу.'],
      ['Узкая матрица ради малого радиуса', 'Дополнительное усилие может превысить лимит станка или инструмента, не обеспечив устойчивую серию.'],
      ['Игнорирование следов', 'Для нержавеющей стали, алюминия и окрашенных деталей перед серией нужны чистые плечи, пленка или защита от отметин.'],
    ],
    chartTitle: 'Толщина и рекомендуемое раскрытие V',
    chartIntro: 'Начальные ориентиры воздушной гибки для обычного производства. Перед запуском подтвердите марку, самую короткую полку, требуемый радиус и нагрузку оснастки.',
    chartHeaders: ['Толщина', 'Начальное раскрытие V', 'Примерный внутренний радиус', 'Проверка в производстве'],
    chartRows: [
      ['1,0 мм', '6-8 мм', '1,0-1,3 мм', 'Следы и опора малой полки'],
      ['2,0 мм', '12-16 мм', '2,0-2,6 мм', 'Защита покрытия и повторяемость угла'],
      ['3,0 мм', '18-24 мм', '3,0-4,0 мм', 'Усилие и радиус чертежа'],
      ['4,0 мм', '24-32 мм', '4,0-5,2 мм', 'Нагрузка инструмента и разброс партии'],
      ['6,0 мм', '48-60 мм', '7,0-10,0 мм', 'Длина полки и запас мощности'],
      ['8,0 мм', '64-80 мм', '10,0-13,0 мм', 'Тяжелая оснастка и пластичность'],
    ],
    radiusChartTitle: 'Приближенный внутренний радиус',
    radiusChartIntro: 'При воздушной гибке до режима калибровки естественный внутренний радиус в большей степени следует раскрытию матрицы, чем носику пуансона. Это стартовые наблюдения процесса, не допуски контроля.',
    radiusChartHeaders: ['Выбор раскрытия', 'Тенденция радиуса', 'Типичная причина выбора', 'Что подтвердить'],
    radiusChartRows: [
      ['Около 6T', 'Меньший естественный радиус', 'Короткая полка или малый радиус', 'Усилие, следы и трещины'],
      ['Около 8T', 'Сбалансированный радиус', 'Обычная серийная воздушная гибка', 'Пробный угол и партия'],
      ['Около 10T-12T', 'Больший естественный радиус', 'Твердый, толстый или декоративный лист', 'Радиус чертежа и опора полки'],
    ],
    trendChartTitle: 'Общая тенденция воздушной гибки',
    trendChartIntro: 'Изменение раскрытия одновременно изменяет несколько результатов процесса: устранение одной проблемы может создать другое ограничение.',
    trendChartHeaders: ['Изменение V', 'Усилие', 'Радиус / пружинение', 'Оснастка и стабильность'],
    trendChartRows: [
      ['Уже', 'Растет', 'Радиус меньше; компенсация чувствительнее', 'Больше следов и нагрузки плеч'],
      ['Сбалансированное', 'Умеренное', 'Предсказуемо для обычных партий', 'Обычно лучшая повторяемость'],
      ['Шире', 'Снижается', 'Радиус больше; влияние пружинения растет', 'Меньше нагрузка, но нужна длинная полка'],
    ],
    faq: [
      ['Почему 8T часто берут первым вариантом?', 'Это практический компромисс: приемлемая нагрузка, подходящий для многих чертежей естественный радиус и достаточная опора обычных полок. Фактическую деталь все равно проверяют.'],
      ['Можно ли для нержавеющей стали применять то же раскрытие, что для обычной стали?', 'Не автоматически. Нержавеющая сталь обычно требует большего усилия, сильнее пружинит и легче показывает следы; может понадобиться большее раскрытие или защита поверхности.'],
      ['Можно ли просто увеличить V при недостатке усилия?', 'Только после проверки радиуса и минимальной полки. Снижение усилия широкой матрицей может сделать короткую сторону неустойчивой или увеличить радиус сверх допуска.'],
      ['Почему появляются полосы на плечах матрицы?', 'Лист при вращении и скольжении испытывает высокое контактное давление на плечах. Узкая матрица, грязный инструмент и декоративная поверхность увеличивают риск.'],
    ],
    notesTitle: 'Практические инженерные примечания',
    notes: [
      'Для непрерывного производства не планируйте постоянную работу у предельной нагрузки станка или инструмента; допустимое более широкое раскрытие сохраняет запас и срок службы.',
      'Для толстого листа и высокопрочной стали до выбора узкой матрицы проверьте сертификат материала, направление прокатки и разрешенный радиус.',
      'Инструмент, выдержавший короткую пробу, в длинной серии может быстро изнашиваться из-за чрезмерной концентрации нагрузки на плечах.',
      'Для видимой нержавеющей стали, алюминия и покрытых деталей очистите плечи и испытайте пленку или защитную оснастку.',
      'В серийном выпуске записывайте успешное раскрытие V, радиус пуансона, партию материала и угол первой детали.'],
  },
  es: {
    intro: 'Seleccionar la abertura V no consiste únicamente en leer una tabla. En plegado al aire, la abertura establece la distancia de apoyo bajo la chapa y por ello afecta a fuerza, radio interior natural, apoyo de pestaña, marcado y repetibilidad. La elección de producción debe servir al plano, al lote de material, a la carga admisible del utillaje y al volumen de trabajo.',
    principlesTitle: 'Reglas principales para seleccionar la abertura V',
    principlesIntro: 'En plegado al aire de acero dulce se utiliza mucho 6T a 8T porque suele equilibrar fuerza, radio natural controlable y apoyo de pestañas habituales. Es un punto inicial, no una aprobación automática.',
    principles: [
      ['Por qué es habitual 6T a 8T', 'En torno a 6T a 8T, la chapa común suele plegarse sin carga excesiva y conserva un radio y apoyo de pestaña corta utilizables. Después deben comprobarse radio, pestaña y tonelaje.'],
      ['Abertura V menor', 'Puede lograr radio más cerrado y apoyar una pestaña más corta, pero aumenta fuertemente la fuerza, las marcas, el desgaste y el riesgo de grieta.'],
      ['Abertura V mayor', 'Reduce tonelaje y castiga menos el utillaje y las superficies vistas, pero genera radio mayor, necesita pestaña apoyada más larga y puede aumentar la sensibilidad al retorno elástico.'],
      ['Selección estable para serie', 'En trabajo repetitivo no elija la abertura más estrecha solo porque funcione una probeta; deje margen para espesor, dirección de laminación, desgaste y cambio de lote.'],
    ],
    rangeIntro: 'Estas relaciones son puntos iniciales de taller para plegado al aire. Solo debe elegirse una abertura estrecha cuando la pestaña o el radio lo exijan y se hayan confirmado tonelaje y ductilidad.',
    rangeCards: [
      ['Rango 6T', 'Para radio más cerrado o pestaña limitada; revise de cerca fuerza, marcas y tendencia a agrietarse.'],
      ['Rango 8T', 'Base habitual de producción para acero dulce general y repetibilidad equilibrada.'],
      ['Rango 10T a 12T', 'Útil con material grueso, duro o de superficie sensible si radio y pestaña lo permiten.'],
    ],
    materialSelectionTitle: 'Influencia del material en la selección de matriz V',
    materialSelectionIntro: 'El mismo espesor no implica la misma condición de plegado. Resistencia, ductilidad, acabado y radio aceptable determinan si debe ampliarse la abertura o protegerse la superficie.',
    materialCards: [
      ['Acero dulce', 'Suele iniciarse en 6T a 8T. Ofrece formación de radio predecible y retorno moderado, por lo que es la condición de referencia en pruebas.'],
      ['Acero inoxidable', 'Son habituales mayor fuerza y mayor retorno. Las caras pulidas muestran fácilmente marcas de hombro; se consideran abertura menos severa y película protectora.'],
      ['Aluminio', 'La menor fuerza no elimina marcas estéticas ni grietas en temples duros. Proteja superficies vistas y evite imponer un radio innecesariamente cerrado.'],
      ['Acero de alta resistencia', 'Use mayor abertura y radio generoso salvo confirmación del material. Las matrices estrechas concentran carga, aumentan microgrietas y desgastan los hombros.'],
    ],
    flangeTitle: 'Longitud mínima de pestaña',
    flangeText: 'La pestaña debe permanecer apoyada en los hombros de la matriz durante la entrada del punzón. Al aumentar V, los puntos de apoyo se separan y una pata corta puede caer dentro antes de controlar el ángulo.',
    flangeCards: [
      ['Riesgo de pestaña corta', 'Si la pata es demasiado corta para la V elegida, puede inclinarse, deslizarse o entrar en la matriz, generando dispersión angular y dimensional.'],
      ['Error frecuente de taller', 'Se amplía la matriz para reducir tonelaje y después se descubre que una pestaña de retorno ya no apoya de forma fiable en ambos hombros.'],
      ['Comprobación de liberación', 'Coloque la pestaña más corta sobre el utillaje real y confirme el apoyo mediante una prueba lenta, especialmente en patas desiguales.'],
    ],
    mistakesTitle: 'Errores comunes al seleccionar matriz V',
    mistakes: [
      ['Abertura V demasiado pequeña', 'Produce con frecuencia fuerza excesiva, grieta por radio pequeño y desgaste acelerado de hombros.'],
      ['Abertura V demasiado grande', 'Aumenta el radio y una pestaña corta puede perder apoyo o caer dentro.'],
      ['Combinación de utillaje incorrecta', 'Radio de punzón, ángulo de matriz, ancho V y carga admisible deben corresponder al plano y al material.'],
      ['Matriz estrecha para forzar radio', 'Aplicar tonelaje extra puede exceder límites sin entregar una producción estable.'],
      ['Ignorar marcado superficial', 'Inoxidable, aluminio y chapa preacabada suelen requerir utillaje limpio, película o protección antimarcas.'],
    ],
    chartTitle: 'Espesor y abertura V recomendada',
    chartIntro: 'Referencias iniciales para plegado al aire de producción normal. Confirme calidad, pestaña más corta, radio exigido y carga del utillaje antes de liberar.',
    chartHeaders: ['Espesor', 'Abertura V inicial', 'Radio interior aproximado', 'Control de producción'],
    chartRows: [
      ['1,0 mm', '6 a 8 mm', '1,0 a 1,3 mm', 'Marcado y apoyo de pestaña pequeña'],
      ['2,0 mm', '12 a 16 mm', '2,0 a 2,6 mm', 'Protección de acabado y repetibilidad'],
      ['3,0 mm', '18 a 24 mm', '3,0 a 4,0 mm', 'Tonelaje y radio del plano'],
      ['4,0 mm', '24 a 32 mm', '4,0 a 5,2 mm', 'Carga de utillaje y variación de lote'],
      ['6,0 mm', '48 a 60 mm', '7,0 a 10,0 mm', 'Longitud de pestaña y margen'],
      ['8,0 mm', '64 a 80 mm', '10,0 a 13,0 mm', 'Utillaje pesado y ductilidad'],
    ],
    radiusChartTitle: 'Radio interior aproximado',
    radiusChartIntro: 'En plegado al aire, antes de calibrar a fondo, el radio interior natural sigue más a la abertura que a la punta del punzón. Son observaciones iniciales de proceso, no tolerancias.',
    radiusChartHeaders: ['Selección de abertura', 'Tendencia del radio', 'Motivo habitual', 'Confirmación necesaria'],
    radiusChartRows: [
      ['Aprox. 6T', 'Radio natural más cerrado', 'Pestaña corta o radio reducido', 'Fuerza, marcas y grieta'],
      ['Aprox. 8T', 'Radio equilibrado', 'Producción general al aire', 'Ángulo de prueba y lote'],
      ['Aprox. 10T a 12T', 'Radio natural mayor', 'Chapa dura, gruesa o estética', 'Radio de plano y apoyo'],
    ],
    trendChartTitle: 'Tendencia general del plegado al aire',
    trendChartIntro: 'La abertura modifica simultáneamente varios resultados; resolver una condición puede crear otra restricción de producción.',
    trendChartHeaders: ['Cambio de V', 'Tonelaje', 'Radio / retorno', 'Utillaje y estabilidad'],
    trendChartRows: [
      ['Más estrecha', 'Aumenta', 'Radio menor; compensación sensible', 'Más marcas y carga en hombros'],
      ['Equilibrada', 'Moderado', 'Predecible para lotes normales', 'Generalmente más repetible'],
      ['Más ancha', 'Disminuye', 'Radio mayor; aumenta efecto del retorno', 'Menor carga, exige pestaña larga'],
    ],
    faq: [
      ['¿Por qué se suele comenzar con 8T?', 'Suele ser un compromiso práctico: carga manejable, radio natural útil para muchos planos y apoyo suficiente para pestañas ordinarias. La pieza real debe verificarse.'],
      ['¿Debe usarse en inoxidable la misma V que en acero dulce?', 'No automáticamente. El inoxidable suele exigir más fuerza, recuperar más ángulo y mostrar más las marcas; puede convenir una abertura mayor o protección.'],
      ['¿Puedo ampliar V para resolver falta de tonelaje?', 'Solo después de comprobar radio requerido y pestaña mínima. La reducción de fuerza puede volver inestable una pata corta o producir un radio inaceptable.'],
      ['¿Por qué aparecen marcas en los hombros?', 'Durante el giro y deslizamiento, la chapa soporta alta presión de contacto sobre los hombros. La V estrecha, suciedad y acabado decorativo aumentan el riesgo.'],
    ],
    notesTitle: 'Notas de experiencia de ingeniería',
    notes: [
      'En producción continua no planifique operar repetidamente cerca del límite de máquina o utillaje; una abertura práctica mayor puede dar margen y vida útil.',
      'Con chapa gruesa o acero de alta resistencia, compruebe certificado, dirección de laminación y radio permitido antes de usar una matriz agresivamente estrecha.',
      'Un útil que supera una prueba corta puede sufrir desgaste rápido de hombros en una serie larga si la carga está muy concentrada.',
      'En inoxidable visto, aluminio o chapa revestida, limpie hombros y evalúe película o protección antimarcas antes de aprobar.',
      'En gran serie registre abertura V, radio de punzón, lote de material y ángulo de primera pieza para evitar fallos repetidos.'],
  },
  tr: {
    intro: 'V açıklığı seçimi yalnızca bir tablodan sayı almak değildir. Havada bükmede açıklık, sacın altındaki destek açıklığını belirler; bu nedenle kuvveti, doğal iç radyüsü, flanş desteğini, yüzey izini ve tekrarlanabilirliği etkiler. Üretime uygun seçim; resme, malzeme partisine, takım yük değerine ve üretim miktarına uymalıdır.',
    principlesTitle: 'V Açıklığı Seçiminin Temel Kuralları',
    principlesIntro: 'Yumuşak çeliğin havada bükülmesinde 6T ile 8T yaygındır; çünkü genellikle kuvvet, kontrol edilebilir doğal radyüs ve normal flanş desteği arasında uygulanabilir bir denge sağlar. Bu bir başlangıç aralığıdır, otomatik onay değildir.',
    principles: [
      ['Neden çoğunlukla 6T ile 8T', 'Yaklaşık 6T ile 8T aralığında sıradan sac, aşırı yük olmadan bükülebilir ve kısa flanş desteği ile radyüs pratik kalır. Ardından radyüs, flanş ve tonaj doğrulanır.'],
      ['Daha küçük V açıklığı', 'Daha sıkı radyüs ve daha kısa flanş desteği sağlayabilir; ancak kuvvet, omuz izi, kaplama hasarı, takım aşınması ve çatlama riski hızla artar.'],
      ['Daha büyük V açıklığı', 'Tonajı düşürür, takımı ve görünür yüzeyi korur; ancak daha büyük iç radyüs oluşturur, daha uzun destekli flanş ister ve geri esnemeye duyarlılığı artırabilir.'],
      ['Kararlı üretim seçimi', 'Tekrarlı işlerde yalnızca bir deneme parçası tuttu diye en dar açıklığı seçmeyin; kalınlık, hadde yönü, aşınma ve parti değişimi için pay bırakın.'],
    ],
    rangeIntro: 'Aşağıdaki oranlar havada bükme için atölye başlangıç değerleridir. Dar açıklık yalnızca flanş veya radyüs gerektirdiğinde ve tonaj ile süneklik doğrulandığında seçilmelidir.',
    rangeCards: [
      ['6T aralığı', 'Sıkı radyüs veya sınırlı flanş için; kuvveti, izleri ve çatlak eğilimini dikkatle kontrol edin.'],
      ['8T aralığı', 'Genel yumuşak çelik üretiminde dengeli tekrarlanabilirlik için tipik başlangıç.'],
      ['10T ile 12T aralığı', 'Radyüs ve flanş izin veriyorsa kalın, sert veya yüzeyi hassas işler için uygundur.'],
    ],
    materialSelectionTitle: 'Malzemenin V Kalıp Seçimine Etkisi',
    materialSelectionIntro: 'Aynı kalınlık aynı bükme koşulu anlamına gelmez. Dayanım, süneklik, yüzey ve kabul edilen iç radyüs; açıklığın büyütülmesi veya yüzeyin korunması gereğini belirler.',
    materialCards: [
      ['Yumuşak Çelik', 'Çoğu zaman 6T ile 8T ile başlanır. Radyüs oluşumu öngörülebilir ve geri esneme orta düzeydedir; takım denemelerinde referans durumdur.'],
      ['Paslanmaz Çelik', 'Daha yüksek kuvvet ve daha fazla geri esneme yaygındır. Parlak yüzeyler omuz izini kolay gösterir; daha yumuşak açıklık ve koruyucu film düşünülebilir.'],
      ['Alüminyum', 'Düşük kuvvet, kozmetik iz veya sert temperde çatlama riskini ortadan kaldırmaz. Görünür yüzeyi koruyun ve gereksiz sıkı radyüs zorlamayın.'],
      ['Yüksek Dayanımlı Çelik', 'Malzeme şartnamesi aksini kanıtlamadıkça daha büyük açıklık ve yeterli radyüs kullanın. Dar kalıp yük yoğunlaşmasını, mikro çatlağı ve omuz aşınmasını artırır.'],
    ],
    flangeTitle: 'Minimum Flanş Uzunluğu',
    flangeText: 'Zımba inerken flanş, kalıbın iki omzunda destekli kalmalıdır. V açıklığı büyüdükçe destek noktaları uzaklaşır; kısa kenar açı kurulmadan açıklığın içine düşebilir.',
    flangeCards: [
      ['Kısa flanş riski', 'Seçilen V için kenar kısa ise eğilebilir, kayabilir veya kalıba çekilebilir; açı dağılımı ve ölçü sapması oluşur.'],
      ['Yaygın atölye hatası', 'Tonajı azaltmak için kalıp genişletilir, sonra geri dönüş flanşının iki omuzda güvenle durmadığı görülür.'],
      ['Üretim öncesi kontrol', 'En kısa flanşı gerçek takım üzerinde yerleştirip özellikle eşit olmayan kenarlarda yavaş bir deneme bükümüyle desteği doğrulayın.'],
    ],
    mistakesTitle: 'Yaygın V Kalıp Seçim Hataları',
    mistakes: [
      ['V açıklığı çok küçük', 'Aşırı kuvvet, küçük radyüs çatlağı ve hızlı omuz aşınması sık görülen sonuçlardır.'],
      ['V açıklığı çok büyük', 'Radyüs büyür; kısa flanş desteğini kaybedebilir veya açıklığa düşebilir.'],
      ['Yanlış takım eşleştirmesi', 'Zımba radyüsü, kalıp açısı, V genişliği ve yük değeri resim ile malzemeye birlikte uygun olmalıdır.'],
      ['Radyüs için dar kalıbı zorlamak', 'Fazla tonaj, kararlı seri sağlamadan makine veya takım sınırını aşabilir.'],
      ['Yüzey izini göz ardı etmek', 'Paslanmaz, alüminyum ve kaplı parçalar uzun seri öncesi temiz takım, film veya iz önleyici çözüm ister.'],
    ],
    chartTitle: 'Kalınlığa Göre Önerilen V Açıklığı',
    chartIntro: 'Normal havada bükme üretimi için ilk referanslar. Serbest bırakmadan önce malzeme sınıfını, en kısa flanşı, gereken radyüsü ve takım yükünü doğrulayın.',
    chartHeaders: ['Kalınlık', 'İlk V açıklığı', 'Yaklaşık iç radyüs', 'Üretim kontrolü'],
    chartRows: [
      ['1,0 mm', '6-8 mm', '1,0-1,3 mm', 'Yüzey izi ve küçük flanş desteği'],
      ['2,0 mm', '12-16 mm', '2,0-2,6 mm', 'Kaplama koruması ve açı tekrarı'],
      ['3,0 mm', '18-24 mm', '3,0-4,0 mm', 'Tonaj ve resim radyüsü'],
      ['4,0 mm', '24-32 mm', '4,0-5,2 mm', 'Takım değeri ve parti farkı'],
      ['6,0 mm', '48-60 mm', '7,0-10,0 mm', 'Flanş uzunluğu ve kapasite payı'],
      ['8,0 mm', '64-80 mm', '10,0-13,0 mm', 'Ağır takım ve süneklik'],
    ],
    radiusChartTitle: 'Yaklaşık İç Radyüs',
    radiusChartIntro: 'Havada bükmede tabana basma başlamadan önce doğal iç radyüs, zımba burnundan çok kalıp açıklığını izler. Bu değerler proses başlangıç gözlemidir, kontrol toleransı değildir.',
    radiusChartHeaders: ['Açıklık seçimi', 'Radyüs eğilimi', 'Tipik seçim nedeni', 'Doğrulanacak konu'],
    radiusChartRows: [
      ['Yaklaşık 6T', 'Daha sıkı doğal radyüs', 'Kısa flanş veya küçük radyüs isteği', 'Kuvvet, iz ve çatlak'],
      ['Yaklaşık 8T', 'Dengeli doğal radyüs', 'Genel seri havada bükme', 'Deneme açısı ve parti değişimi'],
      ['Yaklaşık 10T-12T', 'Daha büyük doğal radyüs', 'Sert, kalın veya görünür yüzeyli sac', 'Resim radyüsü ve flanş desteği'],
    ],
    trendChartTitle: 'Genel Havada Bükme Eğilimi',
    trendChartIntro: 'Açıklık seçimi birden fazla proses sonucunu aynı anda değiştirir; bir sorunu iyileştirmek başka bir üretim sınırı yaratabilir.',
    trendChartHeaders: ['V değişimi', 'Tonaj', 'Radyüs / geri esneme', 'Takım ve kararlılık'],
    trendChartRows: [
      ['Daralır', 'Artar', 'Radyüs küçülür; telafi hassaslaşabilir', 'Daha fazla iz ve omuz yükü'],
      ['Dengeli', 'Orta', 'Normal partilerde öngörülebilir', 'Genelde en tekrarlanabilir ayar'],
      ['Genişler', 'Azalır', 'Radyüs büyür; geri esneme etkisi artar', 'Yük düşük, daha uzun flanş gerekir'],
    ],
    faq: [
      ['Neden ilk ayar olarak sıkça 8T kullanılır?', 'Çoğu zaman uygulanabilir bir dengedir: yük yönetilebilir, doğal radyüs birçok resme uyar ve normal flanşlar destekli kalır. Gerçek parça yine de doğrulanmalıdır.'],
      ['Paslanmaz için yumuşak çelikle aynı V kullanılmalı mı?', 'Otomatik olarak hayır. Paslanmaz genellikle daha fazla kuvvet ve geri esneme gösterir, izler daha görünürdür; geniş açıklık veya yüzey koruması uygun olabilir.'],
      ['Tonaj yetersizliğini V açıklığını büyüterek çözebilir miyim?', 'Yalnızca gereken radyüs ve minimum flanş kontrolünden sonra. Kuvvet azalırken kısa kenar kararsızlaşabilir veya radyüs kabul dışına çıkabilir.'],
      ['Kalıp omuzlarında neden çizgi izleri oluşur?', 'Sac dönüp kayarken omuzlarda yüksek temas basıncı taşır. Dar açıklık, kirli takım ve dekoratif yüzey riski artırır.'],
    ],
    notesTitle: 'Mühendislik Deneyimi Notları',
    notes: [
      'Sürekli üretimde makine veya takım azami yüküne yakın kalıcı bir proses planlamayın; uygun daha geniş açıklık yük payını ve takım ömrünü artırabilir.',
      'Kalın levha veya yüksek dayanımlı çelikte dar kalıp seçmeden önce malzeme sertifikasını, hadde yönünü ve izin verilen büküm radyüsünü doğrulayın.',
      'Kısa denemeyi geçen bir takım, yük omuzlarda yoğunlaşırsa uzun seride hızlı aşınabilir.',
      'Görünür paslanmaz, alüminyum veya kaplı parçalar için omuzları temizleyin ve film ya da iz önleyici takımı değerlendirin.',
      'Seri üretimde başarılı V açıklığını, zımba radyüsünü, malzeme partisini ve ilk parça açısını kayıt altına alın.'],
  },
  id: {
    intro: 'Memilih bukaan V bukan sekadar mengambil angka dari tabel. Pada tekuk udara, bukaan menentukan bentang tumpuan di bawah lembaran sehingga memengaruhi gaya, radius dalam alami, dukungan sayap, bekas permukaan, dan pengulangan hasil. Pemilihan produksi harus sesuai gambar, lot material, rating beban perkakas, dan jumlah produksi.',
    principlesTitle: 'Aturan Inti Pemilihan Bukaan V',
    principlesIntro: 'Untuk tekuk udara baja lunak, 6T hingga 8T banyak digunakan karena umumnya menyeimbangkan gaya, radius alami yang terkendali, dan dukungan sayap umum. Nilai ini adalah jendela awal, bukan persetujuan otomatis.',
    principles: [
      ['Mengapa 6T hingga 8T umum', 'Pada kisaran sekitar 6T hingga 8T, lembaran biasa umumnya dapat ditekuk tanpa beban berlebihan dan dukungan sayap pendek tetap praktis. Selanjutnya verifikasi radius, sayap, dan tonase.'],
      ['Bukaan V lebih kecil', 'Dapat menghasilkan radius lebih rapat dan menopang sayap lebih pendek, tetapi gaya, bekas bahu, kerusakan lapisan, keausan perkakas, dan risiko retak meningkat.'],
      ['Bukaan V lebih besar', 'Menurunkan tonase serta lebih ringan bagi perkakas dan permukaan terlihat, tetapi menghasilkan radius lebih besar, memerlukan sayap lebih panjang, dan dapat meningkatkan kepekaan pegas balik.'],
      ['Pilihan produksi stabil', 'Untuk pekerjaan berulang, jangan memilih bukaan tersempit hanya karena satu sampel berhasil; sisakan margin bagi variasi tebal, arah pengerolan, keausan, dan pergantian lot.'],
    ],
    rangeIntro: 'Rasio berikut adalah titik awal bengkel untuk tekuk udara. Bukaan sempit dipilih hanya jika sayap atau radius mengharuskannya dan tonase serta keuletan telah dipastikan.',
    rangeCards: [
      ['Rentang 6T', 'Untuk radius lebih rapat atau sayap terbatas; periksa gaya, bekas, dan kecenderungan retak secara teliti.'],
      ['Rentang 8T', 'Dasar produksi umum untuk baja lunak dengan pengulangan yang seimbang.'],
      ['Rentang 10T hingga 12T', 'Berguna untuk material tebal, keras, atau sensitif permukaan jika radius dan sayap memungkinkan.'],
    ],
    materialSelectionTitle: 'Pengaruh Material pada Pemilihan Cetakan V',
    materialSelectionIntro: 'Ketebalan yang sama tidak berarti kondisi tekuk yang sama. Kekuatan tarik, keuletan, hasil akhir permukaan, dan radius yang diterima menentukan apakah bukaan perlu diperbesar atau permukaan dilindungi.',
    materialCards: [
      ['Baja Lunak', 'Umumnya dimulai pada 6T hingga 8T. Pembentukan radius cukup dapat diprediksi dan pegas balik sedang, sehingga menjadi kondisi acuan uji perkakas.'],
      ['Baja Tahan Karat', 'Gaya dan pegas balik yang lebih tinggi lazim terjadi. Permukaan poles mudah memperlihatkan bekas bahu; bukaan lebih ringan dan film pelindung sering dipertimbangkan.'],
      ['Aluminium', 'Gaya lebih rendah tidak menghilangkan risiko bekas kosmetik atau retak pada temper keras. Lindungi sisi terlihat dan jangan memaksa radius terlalu rapat.'],
      ['Baja Kekuatan Tinggi', 'Gunakan bukaan lebih besar dan radius memadai kecuali spesifikasi material membuktikan sebaliknya. Cetakan sempit menambah konsentrasi beban, retak mikro, dan aus bahu.'],
    ],
    flangeTitle: 'Panjang Sayap Minimum',
    flangeText: 'Sayap harus tetap ditumpu pada kedua bahu cetakan ketika pons turun. Saat bukaan V membesar, titik tumpu menjauh; sisi pendek dapat jatuh ke dalam bukaan sebelum sudut terkendali.',
    flangeCards: [
      ['Risiko sayap pendek', 'Jika sisi terlalu pendek untuk V yang dipilih, komponen dapat miring, bergeser, atau tertarik ke cetakan sehingga sudut dan dimensi menyebar.'],
      ['Kesalahan bengkel umum', 'Cetakan diperlebar untuk mengurangi tonase, lalu ditemukan bahwa sayap balik tidak lagi duduk stabil pada kedua bahu.'],
      ['Pemeriksaan pelepasan', 'Letakkan sayap terpendek pada perkakas aktual dan lakukan uji tekuk lambat untuk memastikan tumpuan, terutama pada sisi tidak sama.'],
    ],
    mistakesTitle: 'Kesalahan Umum Pemilihan Cetakan V',
    mistakes: [
      ['Bukaan V terlalu kecil', 'Sering menyebabkan gaya berlebihan, retak radius kecil, dan keausan bahu yang cepat.'],
      ['Bukaan V terlalu besar', 'Radius membesar dan sayap pendek dapat kehilangan tumpuan atau jatuh ke bukaan.'],
      ['Pasangan perkakas tidak tepat', 'Radius pons, sudut cetakan, lebar V, dan rating beban harus sesuai gambar dan material secara bersamaan.'],
      ['Memaksa radius dengan cetakan sempit', 'Tonase tambahan dapat melampaui batas mesin atau perkakas tanpa menghasilkan produksi yang stabil.'],
      ['Mengabaikan bekas permukaan', 'Baja tahan karat, aluminium, dan komponen berlapis sering memerlukan perkakas bersih, film, atau perlindungan anti-bekas.'],
    ],
    chartTitle: 'Ketebalan dan Bukaan V yang Disarankan',
    chartIntro: 'Referensi awal untuk produksi tekuk udara umum. Pastikan mutu material, sayap terpendek, radius yang diminta, dan beban perkakas sebelum pelepasan.',
    chartHeaders: ['Ketebalan', 'Bukaan V awal', 'Perkiraan radius dalam', 'Pemeriksaan produksi'],
    chartRows: [
      ['1,0 mm', '6-8 mm', '1,0-1,3 mm', 'Bekas dan tumpuan sayap kecil'],
      ['2,0 mm', '12-16 mm', '2,0-2,6 mm', 'Perlindungan lapisan dan pengulangan sudut'],
      ['3,0 mm', '18-24 mm', '3,0-4,0 mm', 'Tonase dan radius gambar'],
      ['4,0 mm', '24-32 mm', '4,0-5,2 mm', 'Rating perkakas dan variasi lot'],
      ['6,0 mm', '48-60 mm', '7,0-10,0 mm', 'Panjang sayap dan margin kapasitas'],
      ['8,0 mm', '64-80 mm', '10,0-13,0 mm', 'Perkakas berat dan keuletan'],
    ],
    radiusChartTitle: 'Perkiraan Radius Dalam',
    radiusChartIntro: 'Pada tekuk udara sebelum proses bottoming, radius dalam alami lebih mengikuti bukaan cetakan daripada ujung pons. Nilai ini adalah pengamatan awal proses, bukan toleransi inspeksi.',
    radiusChartHeaders: ['Pilihan bukaan', 'Kecenderungan radius', 'Alasan umum memilih', 'Konfirmasi wajib'],
    radiusChartRows: [
      ['Sekitar 6T', 'Radius alami lebih rapat', 'Sayap pendek atau kebutuhan radius kecil', 'Gaya, bekas, dan retak'],
      ['Sekitar 8T', 'Radius alami seimbang', 'Produksi tekuk udara umum', 'Sudut uji dan variasi lot'],
      ['Sekitar 10T-12T', 'Radius alami lebih besar', 'Lembaran keras, tebal, atau tampilan kritis', 'Radius gambar dan tumpuan sayap'],
    ],
    trendChartTitle: 'Tren Umum Tekuk Udara',
    trendChartIntro: 'Pilihan bukaan mengubah beberapa hasil proses sekaligus; memperbaiki satu kondisi dapat menimbulkan batas produksi lain.',
    trendChartHeaders: ['Perubahan V', 'Tonase', 'Radius / pegas balik', 'Perkakas dan kestabilan'],
    trendChartRows: [
      ['Lebih sempit', 'Naik', 'Radius lebih kecil; kompensasi lebih peka', 'Bekas dan beban bahu lebih tinggi'],
      ['Seimbang', 'Sedang', 'Dapat diprediksi pada lot normal', 'Biasanya paling berulang'],
      ['Lebih lebar', 'Turun', 'Radius lebih besar; pengaruh pegas balik naik', 'Beban turun, perlu sayap lebih panjang'],
    ],
    faq: [
      ['Mengapa 8T sering dipakai sebagai setelan awal?', 'Nilai ini umumnya merupakan kompromi praktis: beban terkendali, radius alami berguna untuk banyak gambar, dan sayap biasa tetap tertumpu. Komponen nyata tetap harus diuji.'],
      ['Apakah baja tahan karat memakai V yang sama dengan baja lunak?', 'Tidak secara otomatis. Baja tahan karat umumnya memerlukan gaya lebih besar, lebih banyak pegas balik, dan bekas lebih terlihat; bukaan lebih besar atau perlindungan permukaan mungkin tepat.'],
      ['Dapatkah saya memperlebar V untuk mengatasi kekurangan tonase?', 'Hanya setelah memeriksa radius yang diminta dan sayap minimum. Pengurangan gaya dapat membuat sisi pendek tidak stabil atau menghasilkan radius yang tidak diterima.'],
      ['Mengapa muncul bekas garis pada bahu cetakan?', 'Lembaran mengalami tekanan kontak tinggi pada bahu saat berputar dan bergeser. Bukaan sempit, perkakas kotor, dan permukaan dekoratif memperbesar risiko.'],
    ],
    notesTitle: 'Catatan Pengalaman Teknik',
    notes: [
      'Untuk produksi berkelanjutan, jangan merencanakan proses yang terus bekerja dekat beban maksimum mesin atau perkakas; bukaan praktis yang lebih besar dapat menambah margin dan umur perkakas.',
      'Pada pelat tebal atau baja kekuatan tinggi, periksa sertifikat material, arah pengerolan, dan radius tekuk yang diizinkan sebelum memilih cetakan sempit.',
      'Perkakas yang lolos uji singkat tetap dapat cepat aus pada seri panjang jika beban terkonsentrasi berlebihan pada bahu.',
      'Untuk baja tahan karat tampak, aluminium, atau komponen berlapis, bersihkan bahu dan evaluasi film atau perkakas anti-bekas sebelum persetujuan.',
      'Dalam produksi volume tinggi, catat bukaan V, radius pons, lot material, dan sudut benda pertama yang berhasil untuk mencegah kegagalan berulang.'],
  },
}

const getPageContent = (language) => ({
  ...englishContent,
  ...(localizedContent[language] || {}),
  ...(engineeringContent.en || {}),
  ...(engineeringContent[language] || {}),
})

const seoDescription =
  'Learn how to choose press brake V-die opening for air bending, including thickness reference ranges, inside radius influence, springback considerations and tooling selection notes.'

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

function TextCard({ title, text }) {
  return (
    <article className='zyco-v-guide__card'>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}

function EngineeringTable({
  headers,
  rows,
}) {
  return (
    <div className='zyco-v-guide__table-wrap'>
      <table className='zyco-v-guide__table'>
        <thead>
          <tr>
            {headers.map((heading) => (
              <th key={heading}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell) => (
                <td key={cell}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function PressBrakeVDieOpeningGuide({
  language = 'en',
  setLanguage = () => {},
}) {
  useEffect(() => {
    setPageSEO({
      title: 'How to Choose Press Brake V-Die Opening | ZYCO Engineering Hub',
      description: seoDescription,
      keywords:
        'press brake V die opening, choose V die, air bending V opening, V die chart, inside radius V die, press brake tooling selection',
      canonicalPath: routePath,
    })

    setStructuredData({
      id: 'press-brake-v-die-opening-guide-jsonld',
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

  const page = getPageContent(language)
  const sharedText = getEngineeringText(language)

  return (
    <>
      <style>
        {`
          .zyco-v-guide {
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

          .zyco-v-guide::before {
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

          .zyco-v-guide__shell {
            width: min(1180px, 100%);
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }

          .zyco-v-guide__hero {
            padding: 38px 36px;
            margin-bottom: 22px;
            border: 1px solid rgba(191, 219, 254, 0.2);
            border-radius: 30px;
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.06));
            backdrop-filter: blur(16px);
            box-shadow: 0 28px 68px rgba(2, 8, 23, 0.2);
          }

          .zyco-v-guide__back {
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
            background: linear-gradient(145deg, rgba(15, 23, 42, 0.34), rgba(37, 99, 235, 0.12));
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

          .zyco-v-guide__back:hover,
          .zyco-v-guide__tool:hover {
            transform: translateY(-2px);
            border-color: rgba(191, 219, 254, 0.72);
            color: #ffffff;
          }

          .zyco-v-guide__back:focus-visible,
          .zyco-v-guide__tool:focus-visible {
            outline: 3px solid rgba(147, 197, 253, 0.46);
            outline-offset: 3px;
          }

          .zyco-v-guide__eyebrow {
            margin: 0;
            color: #7dd3fc;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 0.2em;
            text-transform: uppercase;
          }

          .zyco-v-guide__title {
            max-width: 880px;
            margin: 14px 0 18px;
            color: #ffffff;
            font-size: clamp(34px, 5vw, 54px);
            line-height: 1.08;
            letter-spacing: -0.05em;
          }

          .zyco-v-guide__subtitle {
            max-width: 800px;
            margin: 0;
            color: #dbeafe;
            font-size: 18px;
            line-height: 1.72;
          }

          .zyco-v-guide__panel {
            padding: 28px;
            margin-top: 18px;
            border: 1px solid rgba(191, 219, 254, 0.16);
            border-radius: 25px;
            background: rgba(10, 30, 61, 0.48);
            backdrop-filter: blur(12px);
          }

          .zyco-v-guide__section-title {
            margin: 0 0 14px;
            color: #ffffff;
            font-size: 25px;
            letter-spacing: -0.035em;
          }

          .zyco-v-guide__copy {
            margin: 0;
            color: #cbd5e1;
            font-size: 16px;
            line-height: 1.75;
          }

          .zyco-v-guide__grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px;
          }

          .zyco-v-guide__three {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 14px;
            margin-top: 18px;
          }

          .zyco-v-guide__cards {
            display: grid;
            gap: 12px;
            margin-top: 16px;
          }

          .zyco-v-guide__cards--range {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .zyco-v-guide__cards--two {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .zyco-v-guide__card {
            padding: 18px;
            border: 1px solid rgba(191, 219, 254, 0.13);
            border-radius: 18px;
            background: rgba(30, 64, 112, 0.34);
            transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
          }

          .zyco-v-guide__card:hover {
            transform: translateY(-2px);
            border-color: rgba(191, 219, 254, 0.25);
            box-shadow: 0 12px 24px rgba(30, 64, 175, 0.12);
          }

          .zyco-v-guide__card h3 {
            margin: 0 0 8px;
            color: #eff6ff;
            font-size: 16px;
          }

          .zyco-v-guide__card p {
            margin: 0;
            color: #bfdbfe;
            font-size: 14px;
            line-height: 1.65;
          }

          .zyco-v-guide__table-wrap {
            margin-top: 18px;
            overflow-x: auto;
            border: 1px solid rgba(191, 219, 254, 0.16);
            border-radius: 18px;
          }

          .zyco-v-guide__table {
            width: 100%;
            min-width: 600px;
            border-collapse: collapse;
          }

          .zyco-v-guide__table th,
          .zyco-v-guide__table td {
            padding: 14px 16px;
            border-bottom: 1px solid rgba(191, 219, 254, 0.1);
            text-align: left;
          }

          .zyco-v-guide__table th {
            color: #bae6fd;
            background: rgba(30, 64, 112, 0.38);
            font-size: 13px;
          }

          .zyco-v-guide__table td {
            color: #e2e8f0;
            font-size: 14px;
            line-height: 1.55;
          }

          .zyco-v-guide__faq,
          .zyco-v-guide__notes {
            display: grid;
            gap: 12px;
          }

          .zyco-v-guide__faq-item {
            padding: 18px 20px;
            border: 1px solid rgba(191, 219, 254, 0.12);
            border-radius: 18px;
            background: rgba(30, 64, 112, 0.3);
          }

          .zyco-v-guide__faq-item h3 {
            margin: 0 0 8px;
            color: #ffffff;
            font-size: 16px;
          }

          .zyco-v-guide__tools {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
          }

          .zyco-v-guide__tool {
            min-height: 46px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            padding: 0 18px;
            border: 1px solid rgba(96, 165, 250, 0.18);
            border-radius: 16px;
            background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 48%, #60a5fa 100%);
            color: #ffffff;
            font-size: 15px;
            font-weight: 800;
            text-decoration: none;
            box-shadow: 0 12px 30px rgba(37, 99, 235, 0.34);
            transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          }

          .zyco-v-guide__tool:hover {
            box-shadow: 0 18px 38px rgba(37, 99, 235, 0.42);
          }

          @media (max-width: 840px) {
            .zyco-v-guide__three,
            .zyco-v-guide__cards--range,
            .zyco-v-guide__cards--two {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 760px) {
            .zyco-v-guide {
              padding: 22px 14px;
            }

            .zyco-v-guide__hero,
            .zyco-v-guide__panel {
              padding: 22px;
              border-radius: 22px;
            }

            .zyco-v-guide__grid {
              grid-template-columns: 1fr;
            }

            .zyco-v-guide__subtitle {
              font-size: 16px;
            }
          }

          @media (max-width: 640px) {
            .zyco-v-guide__back,
            .zyco-v-guide__tool {
              width: 100%;
            }
          }
        `}
      </style>

      <main className='zyco-v-guide'>
        <div className='zyco-v-guide__shell'>
          <header className='zyco-v-guide__hero'>
            <a
              className='zyco-v-guide__back'
              href='/engineering-tools'
              aria-label={page.back}
            >
              {page.back}
            </a>

            <LanguageSwitcher
              className='zyco-page-language-switcher'
              language={language}
              setLanguage={setLanguage}
            />

            <p className='zyco-v-guide__eyebrow'>{page.eyebrow}</p>
            <h1 className='zyco-v-guide__title'>{page.title}</h1>
            <p className='zyco-v-guide__subtitle'>{page.subtitle}</p>
          </header>

          <section
            className='zyco-v-guide__panel'
            aria-labelledby='v-guide-intro'
          >
            <h2
              className='zyco-v-guide__section-title'
              id='v-guide-intro'
            >
              {page.introTitle}
            </h2>
            <p className='zyco-v-guide__copy'>{page.intro}</p>
          </section>

          <VDieOpeningDiagram labels={page.diagram} />

          <div className='zyco-v-guide__grid'>
            <section
              className='zyco-v-guide__panel'
              aria-labelledby='v-guide-principles'
            >
              <h2
                className='zyco-v-guide__section-title'
                id='v-guide-principles'
              >
                {page.principlesTitle}
              </h2>
              <p className='zyco-v-guide__copy'>{page.principlesIntro}</p>
              <div className='zyco-v-guide__cards'>
                {page.principles.map(([title, text]) => (
                  <TextCard
                    key={title}
                    title={title}
                    text={text}
                  />
                ))}
              </div>
            </section>

            <section
              className='zyco-v-guide__panel'
              aria-labelledby='v-guide-range'
            >
              <h2
                className='zyco-v-guide__section-title'
                id='v-guide-range'
              >
                {page.rangeTitle}
              </h2>
              <p className='zyco-v-guide__copy'>{page.rangeIntro}</p>
              <div className='zyco-v-guide__cards'>
                {page.rangeCards.map(([title, text]) => (
                  <TextCard
                    key={title}
                    title={title}
                    text={text}
                  />
                ))}
              </div>
            </section>
          </div>

          <section className='zyco-v-guide__three'>
            <TextCard
              title={page.materialTitle}
              text={page.materialText}
            />
            <TextCard
              title={page.thicknessTitle}
              text={page.thicknessText}
            />
            <TextCard
              title={page.springbackTitle}
              text={page.springbackText}
            />
          </section>

          <section
            className='zyco-v-guide__panel'
            aria-labelledby='v-guide-material-selection'
          >
            <h2
              className='zyco-v-guide__section-title'
              id='v-guide-material-selection'
            >
              {page.materialSelectionTitle}
            </h2>
            <p className='zyco-v-guide__copy'>{page.materialSelectionIntro}</p>
            <div className='zyco-v-guide__cards zyco-v-guide__cards--two'>
              {page.materialCards.map(([title, text]) => (
                <TextCard
                  key={title}
                  title={title}
                  text={text}
                />
              ))}
            </div>
          </section>

          <div className='zyco-v-guide__grid'>
            <section
              className='zyco-v-guide__panel'
              aria-labelledby='v-guide-flange'
            >
              <h2
                className='zyco-v-guide__section-title'
                id='v-guide-flange'
              >
                {page.flangeTitle}
              </h2>
              <p className='zyco-v-guide__copy'>{page.flangeText}</p>
              <div className='zyco-v-guide__cards'>
                {page.flangeCards.map(([title, text]) => (
                  <TextCard
                    key={title}
                    title={title}
                    text={text}
                  />
                ))}
              </div>
            </section>

            <section
              className='zyco-v-guide__panel'
              aria-labelledby='v-guide-mistakes'
            >
              <h2
                className='zyco-v-guide__section-title'
                id='v-guide-mistakes'
              >
                {page.mistakesTitle}
              </h2>
              <div className='zyco-v-guide__cards'>
                {page.mistakes.map(([title, text]) => (
                  <TextCard
                    key={title}
                    title={title}
                    text={text}
                  />
                ))}
              </div>
            </section>
          </div>

          <section
            className='zyco-v-guide__panel'
            aria-labelledby='v-guide-radius'
          >
            <h2
              className='zyco-v-guide__section-title'
              id='v-guide-radius'
            >
              {page.radiusTitle}
            </h2>
            <p className='zyco-v-guide__copy'>{page.radiusText}</p>
          </section>

          <section
            className='zyco-v-guide__panel'
            aria-labelledby='v-guide-chart'
          >
            <h2
              className='zyco-v-guide__section-title'
              id='v-guide-chart'
            >
              {page.chartTitle}
            </h2>
            <p className='zyco-v-guide__copy'>{page.chartIntro}</p>
            <EngineeringTable
              headers={page.chartHeaders}
              rows={page.chartRows}
            />
          </section>

          <div className='zyco-v-guide__grid'>
            <section
              className='zyco-v-guide__panel'
              aria-labelledby='v-guide-radius-chart'
            >
              <h2
                className='zyco-v-guide__section-title'
                id='v-guide-radius-chart'
              >
                {page.radiusChartTitle}
              </h2>
              <p className='zyco-v-guide__copy'>{page.radiusChartIntro}</p>
              <EngineeringTable
                headers={page.radiusChartHeaders}
                rows={page.radiusChartRows}
              />
            </section>

            <section
              className='zyco-v-guide__panel'
              aria-labelledby='v-guide-trend-chart'
            >
              <h2
                className='zyco-v-guide__section-title'
                id='v-guide-trend-chart'
              >
                {page.trendChartTitle}
              </h2>
              <p className='zyco-v-guide__copy'>{page.trendChartIntro}</p>
              <EngineeringTable
                headers={page.trendChartHeaders}
                rows={page.trendChartRows}
              />
            </section>
          </div>

          <section
            className='zyco-v-guide__panel'
            aria-labelledby='v-guide-faq'
          >
            <h2
              className='zyco-v-guide__section-title'
              id='v-guide-faq'
            >
              {page.faqTitle}
            </h2>
            <div className='zyco-v-guide__faq'>
              {page.faq.map(([question, answer]) => (
                <article
                  className='zyco-v-guide__faq-item'
                  key={question}
                >
                  <h3>{question}</h3>
                  <p className='zyco-v-guide__copy'>{answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section
            className='zyco-v-guide__panel'
            aria-labelledby='v-guide-notes'
          >
            <h2
              className='zyco-v-guide__section-title'
              id='v-guide-notes'
            >
              {page.notesTitle}
            </h2>
            <div className='zyco-v-guide__notes'>
              {page.notes.map((note) => (
                <article
                  className='zyco-v-guide__faq-item'
                  key={note}
                >
                  <p className='zyco-v-guide__copy'>{note}</p>
                </article>
              ))}
            </div>
          </section>

          <section
            className='zyco-v-guide__panel'
            aria-labelledby='v-guide-related'
          >
            <h2
              className='zyco-v-guide__section-title'
              id='v-guide-related'
            >
              {page.relatedTitle}
            </h2>
            <nav
              className='zyco-v-guide__tools'
              aria-label={page.relatedAria}
            >
              {relatedTools.map(([key, href]) => (
                <a
                  className='zyco-v-guide__tool'
                  href={href}
                  key={key}
                >
                  {page.relatedLabels[key] || sharedText.relatedTools[key]}
                </a>
              ))}
            </nav>
          </section>
        </div>
      </main>
    </>
  )
}
