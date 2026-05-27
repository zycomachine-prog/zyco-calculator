import { useEffect } from 'react'
import BendDeductionDiagram from '../components/BendDeductionDiagram.jsx'
import LanguageSwitcher from '../components/LanguageSwitcher.jsx'
import { getEngineeringText } from '../languages/engineeringText.js'
import {
  ZYCO_PUBLISHER,
  createFAQPageStructuredData,
  getSiteUrl,
  setPageSEO,
  setStructuredData,
} from '../utils/seo.js'

const routePath = '/engineering/bend-deduction-guide'
const relatedTools = [
  ['pressBrakeCalculator', '/engineering-tools/press-brake-calculator'],
  ['bendAllowanceCalculator', '/engineering-tools/bend-allowance-calculator'],
  ['kFactorGuide', '/engineering/k-factor-guide'],
  ['bendDeductionGuide', routePath],
  ['materialDatabase', '/engineering-tools/material-database'],
  ['springbackDatabase', '/engineering-tools/springback-database'],
  ['springbackCompensationGuide', '/springback-compensation-guide'],
  ['vDieSelectionTool', '/engineering-tools/v-die-selection'],
  ['insideRadiusGuide', '/engineering-tools/inside-radius-guide'],
  ['airBendingGuide', '/engineering-tools/air-bending-guide'],
  ['bottomingVsCoiningGuide', '/engineering-tools/bottoming-vs-coining-guide'],
  ['bendSequenceGuide', '/engineering-tools/bend-sequence-guide'],
  ['pressBrakeTonnageGuide', '/engineering/press-brake-tonnage-guide'],
  ['vDieOpeningGuide', '/engineering/how-to-choose-press-brake-v-die-opening'],
  ['minimumFlangeLengthGuide', '/engineering/minimum-flange-length-guide'],
  ['toolingSelectionGuide', '/engineering/press-brake-tooling-selection-guide'],
  ['crowningGuide', '/engineering/press-brake-crowning-guide'],
  ['stainlessSteelBendingGuide', '/engineering/stainless-steel-bending-guide'],
  ['aluminumBendingGuide', '/engineering/aluminum-bending-guide'],
]

const content = {
  en: {
    back: '← Back to Engineering Tools', eyebrow: 'Engineering Guide', title: 'Bend Deduction Guide',
    subtitle: 'Professional guide for understanding bend deduction, bend allowance, K-factor and flat pattern calculation in press brake sheet metal bending.',
    seoDescription: 'Engineering guide to sheet metal bend deduction formula, bend deduction vs bend allowance, K factor, inside radius and accurate press brake flat pattern calculation.',
    intro: { title: 'What Is Bend Deduction?', text: 'Bend deduction (BD) is the amount subtracted from formed outside dimensions to obtain the cut flat pattern. It is the geometric correction between a finished part measured over its outer faces and the material length before bending. BD does not stand alone: bend allowance (BA), inside radius, thickness, bend angle and K-factor describe the same bend from different engineering viewpoints.' },
    distinction: { title: 'Bend Deduction vs Bend Allowance', text: 'Bend allowance is the developed arc length along the neutral axis through the bend zone. Bend deduction is the total reduction taken from the sum of outside flange dimensions. They are linked but are not interchangeable. Many shop-floor blank errors begin when a BA value is entered where outside-dimension development requires BD.' },
    formula: { title: 'Core Formula and Engineering Meaning', label: 'Outside-dimension development', equations: ['BD = 2 x OSSB - BA', 'Flat Length = Sum of Outside Flange Dimensions - Bend Deduction'], text: 'OSSB is the outside setback from the virtual sharp corner to each tangent point. For a 90-degree formed corner, the two outside legs include material that geometrically overlaps the bend region; BD removes that over-count while BA returns the actual neutral-axis length used in the bend.' },
    geometry: { title: 'Outside Setback and Bend Geometry', text: 'Outside setback varies with angle, material thickness and actual inside radius. A 90-degree bend is the clearest reference case, but acute or open angles shift tangent points and therefore change both setback and deduction. CAD output is a starting value; tooling geometry, a shop calculation and trial-bend measurement must agree before production release.' },
    neutral: { title: 'K-Factor and Neutral Axis', text: 'K-factor locates the neutral axis as a fraction of material thickness from the inside surface. The neutral axis is not normally at mid-thickness because the inner fibers compress and the outer fibers stretch. Material condition, V opening, formed inside radius and air bending, bottoming or coining practice influence the practical K-factor. An incorrect value changes BA and therefore changes BD and the finished flange location.' },
    influence: { title: 'Material and Tooling Influence', cards: [['Mild steel', 'A useful baseline for air-bend deduction tables, provided thickness, V opening and measured radius stay controlled.'], ['Stainless steel', 'Stronger springback and material variation make test bending and angle/radius correction particularly important.'], ['Aluminum', 'Temper, surface protection and radius growth can shift dimensional results even when required force is modest.'], ['Punch and V-die', 'V opening and punch radius influence the formed inside radius; any radius change modifies both BA and BD.']] },
    table: { title: 'Practical Bend Deduction Reference Table', intro: 'Production tendencies for establishing a controlled trial plan, not fixed deduction numbers.', headers: ['Material / Condition', 'Typical Bend Behavior', 'Deduction Sensitivity', 'Engineering Notes'], rows: [['Mild steel / stable batch', 'Usually repeatable in established air-bend setups', 'Medium', 'Build baseline values by thickness, V opening and angle.'], ['Stainless steel / brushed or protected face', 'Higher springback; visible contact often matters', 'High', 'Record overbend, actual radius and film/tooling condition.'], ['Aluminum / formable temper', 'Lower force but softer surface and radius response', 'Medium to high', 'Control alloy/temper and protect cosmetic faces.'], ['Any material / changed V opening', 'Natural radius and contact geometry change', 'High', 'Do not reuse old BD until a test bend is measured.']], note: 'These values and trends are engineering references. Actual bend deduction should be verified with material, tooling and production trial data.' },
    mistakes: { title: 'Common Bend Deduction Mistakes', items: ['Confusing bend allowance with bend deduction in the flat-pattern calculation.', 'Using outside dimensions incorrectly or mixing inside and outside drawing conventions.', 'Ignoring K-factor or applying an unverified default to a precision part.', 'Assuming one deduction value fits mild steel, stainless steel and aluminum.', 'Ignoring the actual formed inside radius after changing the V-die or punch.', 'Using calculator output without a measured trial bend.', 'Mixing assumptions for air bending, bottoming and coining in one table.'] },
    improve: { title: 'How to Improve Flat Pattern Accuracy', items: ['Measure the real inside radius on representative formed parts.', 'Record actual bend deduction by material, thickness, angle and tooling set.', 'Calibrate development values with test bends before batch production.', 'Keep separate validated data for stainless steel and aluminum.', 'Keep punch, V opening and orientation consistent when reusing records.', 'Feed inspection and production results back into controlled deduction tables.'] },
    notes: { title: 'Engineering Notes', items: ['Treat bend deduction as production data, not only a theoretical formula.', 'CAD development values may require workshop correction after a measured setup bend.', 'Press brake condition, tooling, material batch and operator setup all influence final dimensions.', 'A stable tooling setup and recorded bend sequence improve repeatability.'] },
    faqTitle: 'Frequently Asked Questions', faq: [
      ['What is bend deduction in sheet metal?', 'It is the amount removed from summed outside flange dimensions to calculate the flat blank before bending.'],
      ['What is the difference between bend deduction and bend allowance?', 'BA is neutral-axis arc length inside the bend; BD is the correction deducted from outside dimensions.'],
      ['How do you calculate bend deduction?', 'For the chosen geometry, use BD = 2 x OSSB - BA, then subtract BD from the sum of outside flange dimensions.'],
      ['Why does K-factor affect bend deduction?', 'K-factor changes neutral-axis position and bend allowance; because BD contains BA, the resulting deduction changes.'],
      ['Does material type change bend deduction?', 'Yes. Material behavior, springback and the radius formed with a given tool set affect the practical value.'],
      ['Why is my flat pattern dimension wrong after bending?', 'Common causes are incorrect drawing convention, radius or K-factor assumptions, changed tooling, springback or lack of trial calibration.'],
      ['Should bend deduction be verified by test bending?', 'Yes. A measured test bend is the reliable way to qualify deduction data for production.'],
    ],
    relatedTitle: 'Related Engineering Tools', relatedAria: 'Related engineering tools',
    diagram: { eyebrow: 'Engineering Diagram', title: 'Bend deduction geometry: formed part to flat pattern', svgTitle: 'Bend deduction geometry diagram', svgDescription: 'A formed 90 degree sheet metal bend and flat pattern showing outside dimensions, inside radius, material thickness, neutral axis, outside setback, bend allowance and bend deduction.', formed: 'FORMED 90° BEND', flat: 'FLAT PATTERN', outsideA: 'outside flange A', outsideB: 'outside flange B', insideRadius: 'inside radius', neutralAxis: 'neutral axis', thickness: 'thickness', ossb: 'OSSB', formedCaption: 'outside-dimension reference', flatLength: 'flat length', ba: 'bend allowance (BA)', bd: 'bend deduction (BD)', flatCaption: 'developed blank reference', formulaCaption: 'outside dimensions converted to flat length' },
  },
  zh: {
    back: '← 返回工程工具中心', eyebrow: '工程指南', title: '折弯扣除量指南',
    subtitle: '面向折弯机钣金加工的专业指南，系统说明折弯扣除量、折弯展开量、K 因子与展开尺寸计算。',
    intro: { title: '什么是折弯扣除量？', text: '折弯扣除量（BD）是根据成形后的外形尺寸计算下料展开尺寸时，需要从外侧法兰尺寸总和中扣除的量。它连接了成品外表面尺寸与折弯前毛坯长度。BD 不能脱离折弯展开量（BA）、内半径、板厚、折弯角度和 K 因子单独理解，因为这些量描述的是同一折弯区域。' },
    distinction: { title: '折弯扣除量与折弯展开量的区别', text: '折弯展开量表示折弯区域中性层的弧长；折弯扣除量表示从外侧尺寸总和中扣去的总量。二者相互关联，但绝不是同一个数值。许多车间展开误差，正是由于在按外尺寸展开时把 BA 当成了 BD。' },
    formula: { title: '核心公式与工程含义', label: '按外形尺寸展开', equations: ['BD = 2 x OSSB - BA', '展开长度 = 外侧法兰尺寸总和 - 折弯扣除量'], text: 'OSSB 是虚拟尖角至切点的外侧退让量。对于最常见的 90° 折弯，两条外侧尺寸在折弯区域存在几何重叠；BD 用于消除这一重复计入，而 BA 则补回中性层在弯曲区实际占用的材料长度。' },
    geometry: { title: '外侧退让量与折弯几何', text: '外侧退让量由折弯角度、板厚和实际内半径共同决定。90° 是最直观的校核示例，而锐角或开角折弯会移动切点位置，使 setback 和 deduction 随之改变。CAD 输出应作为起始数据，最终还必须结合实际模具、车间计算和试折测量结果校准。' },
    neutral: { title: 'K 因子与中性层', text: 'K 因子表示中性层相对于板材内表面的厚度位置。由于内侧受压、外侧受拉，中性层通常不在板厚中心。材料状态、V 开口、实际内半径，以及空气折弯、压底或压印工艺都会影响实用 K 因子。K 因子错误会直接改变 BA，继而改变 BD 与成品法兰尺寸。' },
    influence: { title: '材料与模具影响', cards: [['低碳钢', '在板厚、V 开口和测得内半径受控时，可作为空气折弯扣除表的常用基准。'], ['不锈钢', '回弹更明显且材料波动更敏感，试折、角度修正与内 R 核验更重要。'], ['铝板', '状态、表面保护方式和半径增长会影响展开精度，即使所需折弯力较低。'], ['冲头与 V 型下模', 'V 开口和冲头圆角会改变实际内半径，因此 BA 与 BD 都会随之变化。']] },
    table: { title: '实用折弯扣除量参考表', intro: '以下趋势用于制定受控试折方案，并非固定扣除数值。', headers: ['材料 / 状态', '典型折弯表现', '扣除量敏感度', '工程说明'], rows: [['低碳钢 / 稳定批次', '已验证空气折弯设定下通常重复性较好', '中等', '按板厚、V 开口和角度建立基准值。'], ['不锈钢 / 拉丝或覆膜表面', '回弹较强，接触痕迹通常也需控制', '高', '记录过折量、实际内 R 与保护/模具状态。'], ['铝板 / 可成形状态', '吨位较低，但表面柔软且半径响应敏感', '中至高', '控制合金状态并保护外观面。'], ['任意材料 / 更换 V 开口', '自然内 R 和接触几何发生变化', '高', '测量试折件前不得沿用旧 BD。']], note: '这些数值与趋势为工程参考。实际折弯扣除量应结合材料、模具和试折生产数据进行验证。' },
    mistakes: { title: '常见折弯扣除量错误', items: ['在展开计算中混淆折弯展开量 BA 与折弯扣除量 BD。', '外尺寸使用不正确，或将内尺寸与外尺寸标注规则混用。', '忽略 K 因子，或在精密零件上直接套用未经验证的默认值。', '认为低碳钢、不锈钢和铝板可使用同一扣除数值。', '更换 V 型下模或冲头后仍忽略实际成形内半径。', '只使用计算器结果而不进行测量试折。', '在同一数据表中混用空气折弯、压底和压印工艺假设。'] },
    improve: { title: '如何提高展开尺寸精度', items: ['在代表性成形件上测量真实内半径。', '按材料、板厚、角度和模具组合记录实际折弯扣除量。', '批量生产前通过试折校准展开数值。', '为不锈钢与铝板分别建立已验证数据。', '重复使用记录时保持冲头、V 开口与装夹方向一致。', '利用检验和生产反馈持续更新受控扣除表。'] },
    notes: { title: '工程说明', items: ['折弯扣除量应作为生产数据管理，而不仅仅是理论公式。', 'CAD 展开值在测量设定试折后可能需要车间修正。', '折弯机状态、模具、材料批次与操作设定都会影响最终尺寸。', '稳定的模具设定和记录完整的折弯顺序能提高重复性。'] },
    faqTitle: '常见问题', faq: [
      ['钣金中的折弯扣除量是什么？', '它是从外侧法兰尺寸总和中扣除、用于计算折弯前平板毛坯尺寸的量。'],
      ['折弯扣除量与折弯展开量有什么区别？', 'BA 是折弯区域中性层弧长；BD 是由外侧尺寸换算展开长度时需要扣除的修正量。'],
      ['如何计算折弯扣除量？', '对于确定的几何条件，使用 BD = 2 x OSSB - BA，再从外侧法兰尺寸总和中扣除 BD。'],
      ['K 因子为什么会影响折弯扣除量？', 'K 因子改变中性层位置和 BA，而 BD 的计算包含 BA，因此扣除量也会改变。'],
      ['材料类型会改变折弯扣除量吗？', '会。材料行为、回弹以及在选定模具上形成的内半径都会影响实际数值。'],
      ['为什么折弯后我的展开尺寸不正确？', '常见原因包括尺寸标注基准错误、半径或 K 因子假设错误、更换模具、回弹变化以及没有试折校准。'],
      ['折弯扣除量是否需要通过试折验证？', '需要。经测量的试折件是确认生产扣除数据最可靠的方法。'],
    ],
    relatedTitle: '相关工程工具', relatedAria: '相关工程工具',
    diagram: { eyebrow: '工程图示', title: '折弯扣除量几何关系：从成形件到展开板', svgTitle: '折弯扣除量几何图', svgDescription: '90 度钣金折弯件与展开板对比图，标示外侧尺寸、内半径、板厚、中性层、外侧退让量、折弯展开量与折弯扣除量。', formed: '90° 成形折弯', flat: '展开板', outsideA: '外侧法兰 A', outsideB: '外侧法兰 B', insideRadius: '内半径', neutralAxis: '中性层', thickness: '板厚', ossb: '外侧退让量 OSSB', formedCaption: '外尺寸参考', flatLength: '展开长度', ba: '折弯展开量 BA', bd: '折弯扣除量 BD', flatCaption: '毛坯展开参考', formulaCaption: '将外侧尺寸转换为展开长度' },
  },
  ru: {
    back: '← Назад к инженерным инструментам', eyebrow: 'Инженерное руководство', title: 'Руководство по вычету гиба',
    subtitle: 'Профессиональное руководство по вычету и припуску на гиб, K-фактору и расчету развертки листа на листогибочном прессе.',
    intro: { title: 'Что такое вычет гиба?', text: 'Вычет гиба (BD) - величина, которую вычитают из суммы наружных размеров сформированных полок для получения размера плоской заготовки. Это поправка между деталью, измеренной по наружным поверхностям, и длиной листа до гибки. BD следует рассматривать вместе с припуском на гиб (BA), внутренним радиусом, толщиной, углом и K-фактором.' },
    distinction: { title: 'Вычет гиба и припуск на гиб', text: 'Припуск на гиб - это длина дуги нейтрального слоя в зоне изгиба. Вычет гиба - общая поправка, снимаемая с суммы наружных размеров. Эти значения связаны, но не взаимозаменяемы. Подстановка BA вместо BD при развертке по наружным размерам часто приводит к браку.' },
    formula: { title: 'Основная формула и ее инженерный смысл', label: 'Развертка по наружным размерам', equations: ['BD = 2 x OSSB - BA', 'Длина развертки = сумма наружных размеров полок - вычет гиба'], text: 'OSSB - наружный отступ от виртуальной острой вершины до касательной. Для распространенного гиба 90° наружные полки дважды учитывают часть зоны изгиба; BD устраняет это перекрытие, а BA учитывает фактическую длину нейтрального слоя.' },
    geometry: { title: 'Наружный отступ и геометрия гиба', text: 'Наружный отступ зависит от угла, толщины и фактически полученного внутреннего радиуса. Гиб 90° удобен как базовый пример, однако при открытом или остром угле точки касания смещаются, изменяя отступ и вычет. Данные CAD необходимо подтвердить расчетом цеха и измеренным пробным гибом.' },
    neutral: { title: 'K-фактор и нейтральный слой', text: 'K-фактор задает положение нейтрального слоя относительно внутренней поверхности листа. Из-за сжатия внутри и растяжения снаружи он обычно не лежит посередине толщины. Материал, раскрытие V-матрицы, внутренний радиус и метод гибки влияют на рабочий K-фактор. Ошибка изменяет BA, затем BD и размер готовой полки.' },
    influence: { title: 'Влияние материала и оснастки', cards: [['Низкоуглеродистая сталь', 'Удобная база таблиц для воздушной гибки при контролируемых толщине, матрице и радиусе.'], ['Нержавеющая сталь', 'Более сильное пружинение требует пробной гибки и проверки угла и радиуса.'], ['Алюминий', 'Состояние сплава, защита поверхности и изменение радиуса влияют на точность развертки.'], ['Пуансон и V-матрица', 'Раскрытие и радиус пуансона меняют внутренний радиус, а значит BA и BD.']] },
    table: { title: 'Практическая справочная таблица', intro: 'Тенденции для планирования проверяемой пробной гибки, а не фиксированные нормативные числа.', headers: ['Материал / состояние', 'Типичное поведение', 'Чувствительность вычета', 'Инженерные примечания'], rows: [['Низкоуглеродистая сталь / стабильная партия', 'Хорошая повторяемость при освоенной настройке', 'Средняя', 'Фиксируйте толщину, V-раскрытие и угол.'], ['Нержавеющая сталь / видимая поверхность', 'Больше пружинение, важен след инструмента', 'Высокая', 'Записывайте перегиб, радиус и защитную пленку.'], ['Алюминий / формуемое состояние', 'Меньшее усилие, чувствительная поверхность и радиус', 'Средняя-высокая', 'Контролируйте сплав, состояние и защиту.'], ['Любой материал / новая V-матрица', 'Меняется естественный радиус', 'Высокая', 'Не применяйте старый BD без пробного замера.']], note: 'Значения и тенденции приведены как инженерная справка. Фактический вычет гиба необходимо проверять на материале, оснастке и данных пробного производства.' },
    mistakes: { title: 'Распространенные ошибки', items: ['Путаница между BA и BD при расчете развертки.', 'Неверное применение наружных размеров или смешение баз измерения.', 'Игнорирование K-фактора либо непроверенное значение для точной детали.', 'Применение одного вычета к стали, нержавеющей стали и алюминию.', 'Игнорирование фактического внутреннего радиуса после смены оснастки.', 'Использование результата калькулятора без пробного гиба.', 'Смешение допущений воздушной гибки, гибки с дожимом и чеканки.'] },
    improve: { title: 'Как повысить точность развертки', items: ['Измеряйте фактический внутренний радиус на типовых деталях.', 'Ведите BD по материалу, толщине, углу и комплекту инструмента.', 'Калибруйте данные пробными гибами до запуска партии.', 'Разделяйте проверенные данные для нержавеющей стали и алюминия.', 'При повторном применении сохраняйте пуансон и V-матрицу.', 'Обновляйте таблицы по результатам контроля производства.'] },
    notes: { title: 'Инженерные примечания', items: ['Вычет гиба является производственными данными, а не только формулой.', 'Развертка CAD может потребовать цеховой корректировки после пробного гиба.', 'Станок, оснастка, партия материала и настройка оператора влияют на размер.', 'Стабильная оснастка и записанная последовательность повышают повторяемость.'] },
    faqTitle: 'Частые вопросы', faq: [['Что такое вычет гиба листового металла?', 'Это величина, вычитаемая из суммы наружных размеров полок для расчета плоской заготовки.'], ['Чем вычет гиба отличается от припуска?', 'BA является длиной нейтральной дуги, а BD - поправкой наружных размеров для получения развертки.'], ['Как рассчитать вычет гиба?', 'Для выбранной геометрии применяют BD = 2 x OSSB - BA и вычитают BD из суммы наружных полок.'], ['Почему K-фактор влияет на вычет?', 'Он меняет положение нейтрального слоя и BA, поэтому меняется и BD.'], ['Материал изменяет вычет гиба?', 'Да, пружинение, сформированный радиус и состояние материала меняют практическое значение.'], ['Почему размер развертки после гибки неверен?', 'Причиной могут быть неверная база размеров, радиус, K-фактор, смена инструмента или отсутствие калибровки.'], ['Нужна ли пробная гибка?', 'Да, измеренная пробная деталь подтверждает данные для производства.']],
    relatedTitle: 'Связанные инженерные инструменты', relatedAria: 'Связанные инженерные инструменты',
    diagram: { eyebrow: 'Инженерная схема', title: 'Геометрия вычета гиба: от детали к развертке', svgTitle: 'Схема геометрии вычета гиба', svgDescription: 'Гибка 90 градусов и развертка с наружными размерами, внутренним радиусом, толщиной, нейтральным слоем, отступом, припуском и вычетом.', formed: 'ГИБ 90°', flat: 'РАЗВЕРТКА', outsideA: 'наружная полка A', outsideB: 'наружная полка B', insideRadius: 'внутренний радиус', neutralAxis: 'нейтральный слой', thickness: 'толщина', ossb: 'OSSB', formedCaption: 'база наружных размеров', flatLength: 'длина развертки', ba: 'припуск на гиб BA', bd: 'вычет гиба BD', flatCaption: 'база заготовки', formulaCaption: 'переход от наружных размеров к развертке' },
  },
  es: {
    back: '← Volver a herramientas de ingeniería', eyebrow: 'Guía de ingeniería', title: 'Guía de deducción de plegado',
    subtitle: 'Guía profesional para comprender la deducción y el desarrollo de plegado, el factor K y el cálculo del patrón plano en chapa plegada.',
    intro: { title: '¿Qué es la deducción de plegado?', text: 'La deducción de plegado (BD) es la cantidad que se resta de la suma de dimensiones exteriores de las alas conformadas para obtener el patrón plano. Conecta la pieza terminada, medida por sus caras exteriores, con la longitud de chapa antes del plegado. Debe evaluarse junto con el desarrollo de plegado (BA), radio interior, espesor, ángulo y factor K.' },
    distinction: { title: 'Deducción frente a desarrollo de plegado', text: 'El bend allowance es la longitud de arco de la fibra neutra dentro de la zona doblada. La bend deduction es la corrección total que se resta de las dimensiones exteriores. Están relacionadas, pero no son equivalentes. Usar BA como BD en un desarrollo basado en cotas exteriores es una fuente frecuente de errores.' },
    formula: { title: 'Fórmula central y significado técnico', label: 'Desarrollo desde cotas exteriores', equations: ['BD = 2 x OSSB - BA', 'Longitud plana = suma de alas exteriores - deducción de plegado'], text: 'OSSB es el retroceso exterior desde la esquina viva virtual hasta la tangencia. En un pliegue común de 90°, las dos cotas exteriores contabilizan en exceso parte de la curva; BD retira ese solape y BA devuelve la longitud real recorrida por la fibra neutra.' },
    geometry: { title: 'Retroceso exterior y geometría', text: 'El retroceso exterior cambia con el ángulo, espesor y radio interior real. El pliegue de 90° es una referencia clara, pero ángulos abiertos o agudos desplazan las tangencias y modifican la deducción. La salida CAD debe confirmarse con geometría de utillaje y una probeta medida.' },
    neutral: { title: 'Factor K y fibra neutra', text: 'El factor K sitúa la fibra neutra como fracción del espesor desde la cara interior. Normalmente no está en el centro porque las fibras internas se comprimen y las externas se alargan. Material, abertura V, radio formado y método de plegado modifican el valor práctico; un K erróneo altera BA, BD y la posición final del ala.' },
    influence: { title: 'Influencia de material y utillaje', cards: [['Acero dulce', 'Base útil para tablas de plegado al aire cuando espesor, V y radio se mantienen controlados.'], ['Acero inoxidable', 'Su mayor retorno elástico exige pruebas y corrección rigurosa de ángulo y radio.'], ['Aluminio', 'El temple, la protección superficial y el crecimiento del radio afectan la precisión.'], ['Punzón y matriz V', 'La abertura y el radio del punzón cambian el radio interior y, con ello, BA y BD.']] },
    table: { title: 'Tabla práctica de referencia', intro: 'Tendencias para definir ensayos controlados, no valores normativos absolutos.', headers: ['Material / condición', 'Comportamiento típico', 'Sensibilidad de deducción', 'Notas técnicas'], rows: [['Acero dulce / lote estable', 'Repetible con ajuste establecido', 'Media', 'Registre espesor, V y ángulo.'], ['Inoxidable / superficie visible', 'Mayor retorno y control de marcas', 'Alta', 'Registre sobreplegado, radio y protección.'], ['Aluminio / temple conformable', 'Menor fuerza y superficie sensible', 'Media-alta', 'Controle aleación, temple y acabado.'], ['Cualquier material / nueva abertura V', 'Cambia el radio natural', 'Alta', 'No reutilice BD sin plegado de prueba.']], note: 'Estos valores y tendencias son referencias de ingeniería. La deducción real debe verificarse con el material, el utillaje y los datos de pruebas de producción.' },
    mistakes: { title: 'Errores habituales', items: ['Confundir BA y BD al calcular el patrón plano.', 'Aplicar mal cotas exteriores o mezclar convenciones de acotación.', 'Ignorar el factor K o usar un valor no validado en piezas precisas.', 'Suponer una única deducción para acero, inoxidable y aluminio.', 'Ignorar el radio interior real tras cambiar el utillaje.', 'Utilizar un cálculo sin plegado de prueba medido.', 'Mezclar supuestos de plegado al aire, fondo y acuñado.'] },
    improve: { title: 'Cómo mejorar la precisión del patrón plano', items: ['Mida el radio interior real en piezas representativas.', 'Registre BD por material, espesor, ángulo y conjunto de herramientas.', 'Calibre con pruebas antes de fabricar lotes.', 'Separe los datos validados de inoxidable y aluminio.', 'Mantenga punzón y abertura V cuando reutilice registros.', 'Actualice tablas con resultados de inspección y producción.'] },
    notes: { title: 'Notas de ingeniería', items: ['Trate la deducción como dato de producción y no solo como fórmula.', 'La salida CAD puede necesitar corrección de taller tras una prueba medida.', 'Máquina, utillaje, lote de material y preparación del operario influyen en la medida final.', 'Un montaje estable mejora la repetibilidad.'] },
    faqTitle: 'Preguntas frecuentes', faq: [['¿Qué es la deducción de plegado en chapa?', 'Es la cantidad restada de las alas exteriores sumadas para calcular el plano antes de plegar.'], ['¿Cuál es la diferencia entre deducción y desarrollo?', 'BA es el arco de la fibra neutra y BD es la corrección que se resta de cotas exteriores.'], ['¿Cómo se calcula BD?', 'Se utiliza BD = 2 x OSSB - BA y se resta el resultado de la suma de alas exteriores.'], ['¿Por qué influye el factor K?', 'Modifica la posición de la fibra neutra y BA, por lo que también modifica BD.'], ['¿Cambia BD según el material?', 'Sí; retorno elástico, radio formado y condición del material alteran el valor práctico.'], ['¿Por qué falla mi longitud plana?', 'Suele deberse a cotas, radio o K incorrectos, cambios de herramienta o falta de calibración.'], ['¿Debe verificarse con un plegado de prueba?', 'Sí; una probeta medida permite validar los datos de producción.']],
    relatedTitle: 'Herramientas de ingeniería relacionadas', relatedAria: 'Herramientas de ingeniería relacionadas',
    diagram: { eyebrow: 'Diagrama técnico', title: 'Geometría de deducción: de la pieza al patrón plano', svgTitle: 'Diagrama de geometría de deducción', svgDescription: 'Pliegue de 90 grados y patrón plano con dimensiones exteriores, radio, espesor, fibra neutra, retroceso, desarrollo y deducción.', formed: 'PLIEGUE 90°', flat: 'PATRÓN PLANO', outsideA: 'ala exterior A', outsideB: 'ala exterior B', insideRadius: 'radio interior', neutralAxis: 'fibra neutra', thickness: 'espesor', ossb: 'OSSB', formedCaption: 'referencia exterior', flatLength: 'longitud plana', ba: 'desarrollo BA', bd: 'deducción BD', flatCaption: 'referencia de corte', formulaCaption: 'conversión de cotas exteriores a plano' },
  },
  tr: {
    back: '← Mühendislik araçlarına dön', eyebrow: 'Mühendislik kılavuzu', title: 'Büküm düşümü kılavuzu',
    subtitle: 'Abkant sac bükümünde büküm düşümü, büküm payı, K-faktörü ve açınım hesabını anlamaya yönelik profesyonel kılavuz.',
    intro: { title: 'Büküm düşümü nedir?', text: 'Büküm düşümü (BD), bükülmüş parçanın dış flanş ölçüleri toplamından çıkarılarak düz kesim boyunu veren değerdir. Bitmiş parçanın dış yüzey ölçülerini büküm öncesi sac uzunluğuna bağlar. BD; büküm payı (BA), iç radyüs, kalınlık, açı ve K-faktörüyle birlikte değerlendirilmelidir.' },
    distinction: { title: 'Büküm düşümü ve büküm payı', text: 'Büküm payı, büküm bölgesindeki nötr eksenin yay uzunluğudur. Büküm düşümü ise dış ölçü toplamından indirilen toplam düzeltmedir. Bağlantılıdırlar fakat aynı kavram değildirler. Dış ölçüyle açınımda BA yerine BD kullanılması gereken yerde yapılan karışıklık sık hata nedenidir.' },
    formula: { title: 'Temel formül ve mühendislik anlamı', label: 'Dış ölçülerden açınım', equations: ['BD = 2 x OSSB - BA', 'Düz boy = dış flanş ölçüleri toplamı - büküm düşümü'], text: 'OSSB, sanal keskin köşeden teğet noktasına kadar dış setback değeridir. Yaygın 90° bükümde dış ölçüler büküm alanının bir kısmını fazla sayar; BD bu örtüşmeyi çıkarır, BA ise nötr eksenin gerçek malzeme boyunu temsil eder.' },
    geometry: { title: 'Dış setback ve büküm geometrisi', text: 'Dış setback açı, sac kalınlığı ve oluşan gerçek iç radyüsle değişir. 90° büküm temel kontrol örneğidir; açık veya dar açılarda teğet noktaları değiştiğinden düşüm de değişir. CAD verisi, takım geometrisi ve ölçülmüş deneme bükümüyle onaylanmalıdır.' },
    neutral: { title: 'K-faktörü ve nötr eksen', text: 'K-faktörü nötr eksenin iç yüzeyden itibaren kalınlık içindeki konumunu belirtir. İç lifler sıkışıp dış lifler uzadığı için nötr eksen genellikle merkezde değildir. Malzeme, V açıklığı, iç radyüs ve büküm yöntemi pratik K değerini etkiler; yanlış K, BA ve BD üzerinden nihai flanş ölçüsünü kaydırır.' },
    influence: { title: 'Malzeme ve takım etkisi', cards: [['Yumuşak çelik', 'Kalınlık, V açıklığı ve radyüs kontrol altında olduğunda hava büküm tabloları için iyi bir temeldir.'], ['Paslanmaz çelik', 'Daha güçlü geri esneme, deneme bükümünü ve açı/radyüs doğrulamasını kritik hale getirir.'], ['Alüminyum', 'Temper, yüzey koruması ve radyüs büyümesi açınım hassasiyetini etkiler.'], ['Zımba ve V kalıp', 'V açıklığı ve zımba radyüsü iç radyüsü, dolayısıyla BA ve BD değerlerini değiştirir.']] },
    table: { title: 'Pratik büküm düşümü referans tablosu', intro: 'Sabit standart değerler değil, kontrollü deneme planı oluşturmak için üretim eğilimleridir.', headers: ['Malzeme / durum', 'Tipik davranış', 'Düşüm hassasiyeti', 'Mühendislik notu'], rows: [['Yumuşak çelik / stabil parti', 'Oturmuş ayarda tekrarlanabilir', 'Orta', 'Kalınlık, V ve açıyı kaydedin.'], ['Paslanmaz / görünür yüzey', 'Yüksek geri esneme ve iz kontrolü', 'Yüksek', 'Fazla bükümü, radyüsü ve korumayı kaydedin.'], ['Alüminyum / şekillenebilir temper', 'Düşük kuvvet, hassas yüzey', 'Orta-yüksek', 'Alaşım, temper ve yüzeyi kontrol edin.'], ['Her malzeme / değişen V', 'Doğal radyüs değişir', 'Yüksek', 'Ölçmeden eski BD kullanmayın.']], note: 'Bu değerler ve eğilimler mühendislik referansıdır. Gerçek büküm düşümü malzeme, takım ve üretim deneme verileriyle doğrulanmalıdır.' },
    mistakes: { title: 'Yaygın hatalar', items: ['Açınım hesabında BA ile BD değerlerini karıştırmak.', 'Dış ölçüleri yanlış kullanmak veya ölçülendirme esaslarını karıştırmak.', 'K-faktörünü göz ardı etmek ya da doğrulanmamış değer kullanmak.', 'Tüm malzemeler için tek düşüm değeri varsaymak.', 'Takım değişiminden sonra gerçek iç radyüsü ihmal etmek.', 'Ölçülen deneme bükümü olmadan hesap sonucuna güvenmek.', 'Hava büküm, tabana basma ve ezme varsayımlarını karıştırmak.'] },
    improve: { title: 'Açınım hassasiyeti nasıl iyileştirilir?', items: ['Temsili parçaların gerçek iç radyüsünü ölçün.', 'BD değerini malzeme, kalınlık, açı ve takım setine göre kaydedin.', 'Seri üretim öncesi deneme bükümüyle kalibre edin.', 'Paslanmaz ve alüminyum için ayrı doğrulanmış veri tutun.', 'Kayıtları kullanırken zımba ve V açıklığını sabit tutun.', 'Kontrol sonuçlarıyla tabloları güncelleyin.'] },
    notes: { title: 'Mühendislik notları', items: ['Büküm düşümünü yalnızca teori değil, üretim verisi olarak yönetin.', 'CAD açınımı ölçülmüş bir denemeden sonra atölye düzeltmesi gerektirebilir.', 'Abkant, takım, malzeme partisi ve operatör ayarı son ölçüyü etkiler.', 'Kararlı takım kurulumu tekrarlanabilirliği artırır.'] },
    faqTitle: 'Sık sorulan sorular', faq: [['Sac metalde büküm düşümü nedir?', 'Düz kesim boyunu hesaplamak için dış flanş ölçüleri toplamından çıkarılan değerdir.'], ['Büküm düşümü ile büküm payı arasındaki fark nedir?', 'BA nötr eksen yay uzunluğudur; BD dış ölçülerden çıkarılan açınım düzeltmesidir.'], ['Büküm düşümü nasıl hesaplanır?', 'BD = 2 x OSSB - BA uygulanır ve sonuç dış flanş toplamından çıkarılır.'], ['K-faktörü neden etkiler?', 'Nötr eksen ve BA değerini değiştirir; buna bağlı olarak BD değişir.'], ['Malzeme türü BD değerini değiştirir mi?', 'Evet; geri esneme, oluşan radyüs ve malzeme durumu pratik değeri etkiler.'], ['Açınımım neden yanlış çıkıyor?', 'Yanlış ölçü esası, radyüs, K değeri, takım değişimi veya deneme eksikliği neden olabilir.'], ['Deneme bükümü gerekli midir?', 'Evet; ölçülmüş deneme parçası üretim verisini doğrular.']],
    relatedTitle: 'İlgili mühendislik araçları', relatedAria: 'İlgili mühendislik araçları',
    diagram: { eyebrow: 'Mühendislik çizimi', title: 'Büküm düşümü geometrisi: bükülmüş parçadan açınıma', svgTitle: 'Büküm düşümü geometrisi', svgDescription: 'Dış ölçüler, iç radyüs, kalınlık, nötr eksen, setback, büküm payı ve düşümü gösteren 90 derece büküm ile açınım.', formed: '90° BÜKÜM', flat: 'AÇINIM', outsideA: 'dış flanş A', outsideB: 'dış flanş B', insideRadius: 'iç radyüs', neutralAxis: 'nötr eksen', thickness: 'kalınlık', ossb: 'OSSB', formedCaption: 'dış ölçü referansı', flatLength: 'düz boy', ba: 'büküm payı BA', bd: 'büküm düşümü BD', flatCaption: 'kesim referansı', formulaCaption: 'dış ölçülerin açınıma dönüşümü' },
  },
  id: {
    back: '← Kembali ke alat teknik', eyebrow: 'Panduan teknik', title: 'Panduan bend deduction',
    subtitle: 'Panduan profesional untuk memahami bend deduction, bend allowance, K-factor, dan perhitungan flat pattern pada bending pelat dengan press brake.',
    intro: { title: 'Apa itu bend deduction?', text: 'Bend deduction (BD) adalah nilai yang dikurangi dari jumlah dimensi flange luar pada part yang sudah terbentuk untuk memperoleh panjang blank datar. Nilai ini menghubungkan ukuran luar komponen jadi dengan panjang pelat sebelum bending. BD harus dipahami bersama bend allowance (BA), radius dalam, ketebalan, sudut tekuk, dan K-factor.' },
    distinction: { title: 'Bend deduction dan bend allowance', text: 'Bend allowance adalah panjang busur sumbu netral di area tekuk. Bend deduction adalah koreksi total yang dikurangi dari dimensi luar. Keduanya saling terkait tetapi bukan nilai yang sama. Kesalahan flat pattern sering terjadi saat BA dipakai sebagai BD untuk gambar berdimensi luar.' },
    formula: { title: 'Rumus inti dan arti teknik', label: 'Pengembangan dari dimensi luar', equations: ['BD = 2 x OSSB - BA', 'Panjang datar = jumlah dimensi flange luar - bend deduction'], text: 'OSSB adalah outside setback dari sudut tajam virtual ke titik singgung. Pada bending 90° yang umum, dua ukuran luar menghitung berlebih sebagian zona tekuk; BD membuang tumpang tindih itu, sedangkan BA mewakili panjang material pada sumbu netral.' },
    geometry: { title: 'Outside setback dan geometri tekuk', text: 'Outside setback berubah menurut sudut, ketebalan, dan radius dalam aktual. Bending 90° merupakan contoh referensi paling mudah, tetapi sudut terbuka atau tajam memindahkan titik singgung dan mengubah deduction. Output CAD perlu dikonfirmasi melalui tooling aktual dan trial bending yang diukur.' },
    neutral: { title: 'K-factor dan sumbu netral', text: 'K-factor menunjukkan posisi sumbu netral sebagai fraksi ketebalan dari permukaan dalam. Sumbu ini umumnya tidak tepat di tengah karena bagian dalam tertekan dan bagian luar meregang. Material, bukaan V, radius terbentuk dan metode bending memengaruhi K-factor praktis; nilai yang salah mengubah BA, BD, dan dimensi flange jadi.' },
    influence: { title: 'Pengaruh material dan tooling', cards: [['Baja lunak', 'Acuan baik untuk tabel air bending bila ketebalan, bukaan V dan radius terkontrol.'], ['Stainless steel', 'Springback yang lebih kuat membuat trial bending serta koreksi sudut dan radius sangat penting.'], ['Aluminium', 'Temper, perlindungan permukaan dan perubahan radius memengaruhi akurasi bentangan.'], ['Punch dan V-die', 'Bukaan V dan radius punch mengubah radius dalam, sehingga BA dan BD ikut berubah.']] },
    table: { title: 'Tabel referensi praktis bend deduction', intro: 'Tren produksi untuk menyusun pengujian terkendali, bukan angka standar mutlak.', headers: ['Material / kondisi', 'Perilaku tekuk umum', 'Sensitivitas deduction', 'Catatan teknik'], rows: [['Baja lunak / batch stabil', 'Cukup berulang pada setup tervalidasi', 'Sedang', 'Catat ketebalan, V dan sudut.'], ['Stainless / permukaan terlihat', 'Springback lebih tinggi dan bekas perlu dikontrol', 'Tinggi', 'Catat overbend, radius dan pelindung.'], ['Aluminium / temper mampu bentuk', 'Gaya rendah namun permukaan sensitif', 'Sedang-tinggi', 'Kontrol alloy, temper dan finish.'], ['Material apa pun / V berubah', 'Radius alami berubah', 'Tinggi', 'Jangan gunakan BD lama tanpa trial.']], note: 'Nilai dan tren ini merupakan referensi teknik. Bend deduction aktual harus diverifikasi dengan material, tooling, dan data uji produksi.' },
    mistakes: { title: 'Kesalahan bend deduction yang umum', items: ['Mencampur BA dan BD dalam perhitungan flat pattern.', 'Menggunakan dimensi luar secara keliru atau mencampur basis dimensi.', 'Mengabaikan K-factor atau memakai nilai yang belum divalidasi.', 'Menganggap satu deduction berlaku untuk semua material.', 'Mengabaikan radius dalam aktual setelah mengganti tooling.', 'Menggunakan hasil kalkulator tanpa trial bending terukur.', 'Mencampur asumsi air bending, bottoming, dan coining.'] },
    improve: { title: 'Cara meningkatkan akurasi flat pattern', items: ['Ukur radius dalam aktual pada part perwakilan.', 'Rekam BD berdasarkan material, ketebalan, sudut dan set tooling.', 'Kalibrasikan nilai dengan trial bending sebelum produksi batch.', 'Pisahkan data tervalidasi untuk stainless steel dan aluminium.', 'Pertahankan punch dan bukaan V saat menggunakan data lama.', 'Perbarui tabel dari hasil inspeksi dan produksi.'] },
    notes: { title: 'Catatan teknik', items: ['Kelola bend deduction sebagai data produksi, bukan rumus teori saja.', 'Nilai bentangan CAD mungkin perlu koreksi bengkel setelah trial terukur.', 'Press brake, tooling, batch material dan setup operator memengaruhi ukuran akhir.', 'Setup tooling yang stabil meningkatkan repeatability.'] },
    faqTitle: 'Pertanyaan umum', faq: [['Apa itu bend deduction pada pelat?', 'Nilai yang dikurangi dari jumlah flange luar untuk menghitung blank datar sebelum bending.'], ['Apa beda bend deduction dan bend allowance?', 'BA adalah panjang busur sumbu netral; BD adalah koreksi yang dikurangi dari dimensi luar.'], ['Bagaimana menghitung bend deduction?', 'Gunakan BD = 2 x OSSB - BA, lalu kurangi BD dari jumlah dimensi flange luar.'], ['Mengapa K-factor berpengaruh?', 'K-factor mengubah posisi sumbu netral dan BA, sehingga BD ikut berubah.'], ['Apakah jenis material mengubah BD?', 'Ya; springback, radius terbentuk dan kondisi material mengubah nilai praktis.'], ['Mengapa ukuran flat pattern saya salah?', 'Penyebab umum ialah basis dimensi, radius atau K yang salah, tooling berubah, atau belum kalibrasi.'], ['Haruskah BD diverifikasi dengan trial bending?', 'Ya; part trial yang diukur adalah dasar andal untuk data produksi.']],
    relatedTitle: 'Alat teknik terkait', relatedAria: 'Alat teknik terkait',
    diagram: { eyebrow: 'Diagram teknik', title: 'Geometri bend deduction: dari part terbentuk ke flat pattern', svgTitle: 'Diagram geometri bend deduction', svgDescription: 'Bending 90 derajat dan flat pattern dengan dimensi luar, radius dalam, ketebalan, sumbu netral, setback, bend allowance dan bend deduction.', formed: 'TEKUK 90°', flat: 'FLAT PATTERN', outsideA: 'flange luar A', outsideB: 'flange luar B', insideRadius: 'radius dalam', neutralAxis: 'sumbu netral', thickness: 'ketebalan', ossb: 'OSSB', formedCaption: 'referensi dimensi luar', flatLength: 'panjang datar', ba: 'bend allowance BA', bd: 'bend deduction BD', flatCaption: 'referensi blank', formulaCaption: 'konversi dimensi luar ke flat pattern' },
  },
}

const createStructuredData = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Bend Deduction Guide',
      description: content.en.seoDescription,
      url: getSiteUrl(routePath),
      publisher: ZYCO_PUBLISHER,
    },
    {
      '@type': 'TechArticle',
      headline: 'Bend Deduction Guide',
      description: content.en.seoDescription,
      url: getSiteUrl(routePath),
      author: ZYCO_PUBLISHER,
      publisher: ZYCO_PUBLISHER,
      about: ['Bend deduction', 'Bend allowance', 'K-factor', 'Sheet metal flat pattern calculation', 'Press brake bending'],
    },
    createFAQPageStructuredData(content.en.faq),
  ],
})

function Card({ title, text }) {
  return <article className='zyco-bd__card'><h3>{title}</h3><p>{text}</p></article>
}

export default function BendDeductionGuide({ language = 'en', setLanguage = () => {} }) {
  const page = content[language] || content.en
  const sharedText = getEngineeringText(language)

  useEffect(() => {
    setPageSEO({
      title: 'Bend Deduction Guide | Sheet Metal Flat Pattern Calculation | ZYCO',
      description: content.en.seoDescription,
      keywords: 'bend deduction, bend deduction formula, sheet metal bend deduction, press brake bend deduction, bend deduction vs bend allowance, K factor bend deduction, flat pattern calculation, sheet metal bend allowance and deduction',
      canonicalPath: routePath,
    })
    setStructuredData({ id: 'bend-deduction-guide-jsonld', data: createStructuredData() })
  }, [])

  return (
    <>
      <style>{`
        .zyco-bd { min-height:100vh; box-sizing:border-box; padding:52px 22px; background:radial-gradient(circle at 16% 12%,rgba(96,165,250,.34),transparent 30%),radial-gradient(circle at 84% 20%,rgba(14,165,233,.22),transparent 28%),linear-gradient(145deg,#071224 0%,#0b1f3f 42%,#12366e 74%,#1d4ed8 100%); color:#fff; font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; position:relative; overflow:hidden; }
        .zyco-bd::before { content:""; position:absolute; inset:0; background-image:linear-gradient(rgba(96,165,250,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(96,165,250,.08) 1px,transparent 1px); background-size:42px 42px; mask-image:linear-gradient(to bottom,rgba(0,0,0,.9),transparent 78%); pointer-events:none; }
        .zyco-bd__shell { width:min(1180px,100%); margin:0 auto; position:relative; z-index:1; }
        .zyco-bd__hero { padding:38px 36px; margin-bottom:22px; border:1px solid rgba(191,219,254,.2); border-radius:30px; background:linear-gradient(145deg,rgba(255,255,255,.14),rgba(255,255,255,.06)); backdrop-filter:blur(16px); box-shadow:0 28px 68px rgba(2,8,23,.2); }
        .zyco-bd__back,.zyco-bd__tool { display:inline-flex; align-items:center; justify-content:center; box-sizing:border-box; text-decoration:none; font-size:15px; font-weight:800; transition:all .25s ease; }
        .zyco-bd__back { width:fit-content; max-width:min(100%,480px); min-height:44px; margin:0 0 22px; padding:0 16px; border:1px solid rgba(147,197,253,.46); border-radius:999px; background:linear-gradient(145deg,rgba(15,23,42,.34),rgba(37,99,235,.12)); color:#bfdbfe; }
        .zyco-bd__back:hover { transform:translateY(-2px); border-color:rgba(125,211,252,.7); color:#fff; background:rgba(37,99,235,.42); box-shadow:0 14px 32px rgba(37,99,235,.32),0 0 0 1px rgba(125,211,252,.16); }
        .zyco-bd__eyebrow { margin:0; color:#7dd3fc; font-size:12px; font-weight:800; letter-spacing:.2em; text-transform:uppercase; }
        .zyco-bd__title { max-width:920px; margin:14px 0 18px; font-size:clamp(34px,5vw,54px); line-height:1.08; letter-spacing:-.05em; }
        .zyco-bd__subtitle { max-width:970px; margin:0; color:#dbeafe; font-size:18px; line-height:1.72; }
        .zyco-bd__panel { padding:28px; margin-top:18px; border:1px solid rgba(191,219,254,.16); border-radius:25px; background:rgba(10,30,61,.48); backdrop-filter:blur(12px); }
        .zyco-bd__section-title { margin:0 0 14px; color:#fff; font-size:25px; letter-spacing:-.035em; }
        .zyco-bd__copy { margin:0; color:#cbd5e1; font-size:16px; line-height:1.75; }
        .zyco-bd__grid,.zyco-bd__cards { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:18px; }
        .zyco-bd__cards { gap:12px; margin-top:16px; }
        .zyco-bd__card { padding:18px; border:1px solid rgba(191,219,254,.13); border-radius:18px; background:rgba(30,64,112,.34); }
        .zyco-bd__card h3 { margin:0 0 8px; color:#eff6ff; font-size:16px; line-height:1.45; }
        .zyco-bd__card p { margin:0; color:#bfdbfe; font-size:14px; line-height:1.65; }
        .zyco-bd__formula { display:grid; gap:11px; padding:20px; margin:17px 0; border:1px solid rgba(125,211,252,.22); border-radius:18px; background:rgba(37,99,235,.14); }
        .zyco-bd__formula-label { color:#7dd3fc; font-size:12px; font-weight:800; letter-spacing:.14em; text-transform:uppercase; }
        .zyco-bd__equation { color:#fff; font-size:clamp(18px,2.5vw,25px); font-weight:800; letter-spacing:.01em; }
        .zyco-bd__table-wrap { overflow-x:auto; border:1px solid rgba(191,219,254,.16); border-radius:18px; margin-top:18px; }
        .zyco-bd__table { width:100%; min-width:800px; border-collapse:collapse; }
        .zyco-bd__table th,.zyco-bd__table td { padding:14px 16px; border-bottom:1px solid rgba(191,219,254,.1); text-align:left; }
        .zyco-bd__table th { color:#bae6fd; background:rgba(30,64,112,.38); font-size:13px; }
        .zyco-bd__table td { color:#e2e8f0; font-size:14px; line-height:1.55; }
        .zyco-bd__reference { margin:16px 0 0; color:#93c5fd; font-size:14px; line-height:1.65; font-weight:650; }
        .zyco-bd__list,.zyco-bd__faq { display:grid; gap:12px; padding:0; margin:0; list-style:none; }
        .zyco-bd__list li,.zyco-bd__faq article { padding:17px 20px; border:1px solid rgba(191,219,254,.12); border-radius:18px; background:rgba(30,64,112,.3); }
        .zyco-bd__list { margin-top:14px; }
        .zyco-bd__faq h3 { margin:0 0 8px; color:#eff6ff; font-size:16px; line-height:1.5; }
        .zyco-bd__tools { display:flex; flex-wrap:wrap; gap:12px; }
        .zyco-bd__tool { min-height:46px; padding:0 18px; border:1px solid rgba(147,197,253,.38); border-radius:14px; background:rgba(30,64,175,.32); color:#dbeafe; box-shadow:none; }
        .zyco-bd__tool:hover { transform:translateY(-4px); border-color:rgba(125,211,252,.7); color:#fff; background:rgba(37,99,235,.4); box-shadow:0 14px 30px rgba(56,189,248,.22),0 7px 22px rgba(2,8,23,.22); }
        @media (max-width:840px) { .zyco-bd__grid,.zyco-bd__cards { grid-template-columns:1fr; } }
        @media (max-width:760px) { .zyco-bd { padding:22px 14px; } .zyco-bd__hero,.zyco-bd__panel { padding:22px; border-radius:22px; } .zyco-bd__subtitle { font-size:16px; } }
        @media (max-width:640px) { .zyco-bd__back,.zyco-bd__tool { width:100%; } }
      `}</style>
      <main className='zyco-bd'>
        <div className='zyco-bd__shell'>
          <header className='zyco-bd__hero'>
            <a className='zyco-bd__back' href='/engineering' aria-label={page.back}>{page.back}</a>
            <LanguageSwitcher className='zyco-page-language-switcher' language={language} setLanguage={setLanguage} />
            <p className='zyco-bd__eyebrow'>{page.eyebrow}</p>
            <h1 className='zyco-bd__title'>{page.title}</h1>
            <p className='zyco-bd__subtitle'>{page.subtitle}</p>
          </header>
          <section className='zyco-bd__panel' aria-labelledby='bd-intro'><h2 className='zyco-bd__section-title' id='bd-intro'>{page.intro.title}</h2><p className='zyco-bd__copy'>{page.intro.text}</p></section>
          <BendDeductionDiagram labels={page.diagram} />
          <section className='zyco-bd__panel' aria-labelledby='bd-distinction'><h2 className='zyco-bd__section-title' id='bd-distinction'>{page.distinction.title}</h2><p className='zyco-bd__copy'>{page.distinction.text}</p></section>
          <section className='zyco-bd__panel' aria-labelledby='bd-formula'><h2 className='zyco-bd__section-title' id='bd-formula'>{page.formula.title}</h2><div className='zyco-bd__formula'><span className='zyco-bd__formula-label'>{page.formula.label}</span>{page.formula.equations.map((equation) => <div className='zyco-bd__equation' key={equation}>{equation}</div>)}</div><p className='zyco-bd__copy'>{page.formula.text}</p></section>
          <div className='zyco-bd__grid'>
            <section className='zyco-bd__panel' aria-labelledby='bd-geometry'><h2 className='zyco-bd__section-title' id='bd-geometry'>{page.geometry.title}</h2><p className='zyco-bd__copy'>{page.geometry.text}</p></section>
            <section className='zyco-bd__panel' aria-labelledby='bd-neutral'><h2 className='zyco-bd__section-title' id='bd-neutral'>{page.neutral.title}</h2><p className='zyco-bd__copy'>{page.neutral.text}</p></section>
          </div>
          <section className='zyco-bd__panel' aria-labelledby='bd-influence'><h2 className='zyco-bd__section-title' id='bd-influence'>{page.influence.title}</h2><div className='zyco-bd__cards'>{page.influence.cards.map(([title, text]) => <Card key={title} title={title} text={text} />)}</div></section>
          <section className='zyco-bd__panel' aria-labelledby='bd-table'><h2 className='zyco-bd__section-title' id='bd-table'>{page.table.title}</h2><p className='zyco-bd__copy'>{page.table.intro}</p><div className='zyco-bd__table-wrap'><table className='zyco-bd__table'><thead><tr>{page.table.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{page.table.rows.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div><p className='zyco-bd__reference'>{page.table.note}</p></section>
          <div className='zyco-bd__grid'>
            <section className='zyco-bd__panel' aria-labelledby='bd-mistakes'><h2 className='zyco-bd__section-title' id='bd-mistakes'>{page.mistakes.title}</h2><ul className='zyco-bd__list'>{page.mistakes.items.map((item) => <li className='zyco-bd__copy' key={item}>{item}</li>)}</ul></section>
            <section className='zyco-bd__panel' aria-labelledby='bd-improve'><h2 className='zyco-bd__section-title' id='bd-improve'>{page.improve.title}</h2><ul className='zyco-bd__list'>{page.improve.items.map((item) => <li className='zyco-bd__copy' key={item}>{item}</li>)}</ul></section>
          </div>
          <section className='zyco-bd__panel' aria-labelledby='bd-notes'><h2 className='zyco-bd__section-title' id='bd-notes'>{page.notes.title}</h2><ul className='zyco-bd__list'>{page.notes.items.map((item) => <li className='zyco-bd__copy' key={item}>{item}</li>)}</ul></section>
          <section className='zyco-bd__panel' aria-labelledby='bd-faq'><h2 className='zyco-bd__section-title' id='bd-faq'>{page.faqTitle}</h2><div className='zyco-bd__faq'>{page.faq.map(([question, answer]) => <article key={question}><h3>{question}</h3><p className='zyco-bd__copy'>{answer}</p></article>)}</div></section>
          <section className='zyco-bd__panel' aria-labelledby='bd-related'><h2 className='zyco-bd__section-title' id='bd-related'>{page.relatedTitle}</h2><nav className='zyco-bd__tools' aria-label={page.relatedAria}>{relatedTools.map(([key, href]) => <a className='zyco-bd__tool' href={href} key={key}>{sharedText.relatedTools[key]}</a>)}</nav></section>
        </div>
      </main>
    </>
  )
}
