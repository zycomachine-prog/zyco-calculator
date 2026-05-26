import { useEffect } from 'react'
import KFactorNeutralAxisDiagram from '../components/KFactorNeutralAxisDiagram.jsx'
import LanguageSwitcher from '../components/LanguageSwitcher.jsx'
import { getEngineeringText } from '../languages/engineeringText.js'
import {
  ZYCO_PUBLISHER,
  createFAQPageStructuredData,
  getSiteUrl,
  setPageSEO,
  setStructuredData,
} from '../utils/seo.js'

const routePath = '/engineering/k-factor-guide'
const relatedTools = [
  ['pressBrakeCalculator', '/engineering-tools/press-brake-calculator'],
  ['materialDatabase', '/engineering-tools/material-database'],
  ['vDieSelectionTool', '/engineering-tools/v-die-selection'],
  ['insideRadiusGuide', '/engineering-tools/inside-radius-guide'],
  ['springbackDatabase', '/engineering-tools/springback-database'],
  ['springbackCompensationGuide', '/springback-compensation-guide'],
  ['bendAllowanceCalculator', '/engineering-tools/bend-allowance-calculator'],
  ['kFactorGuide', routePath],
  ['bendDeductionGuide', '/engineering/bend-deduction-guide'],
  ['airBendingGuide', '/engineering-tools/air-bending-guide'],
  ['bottomingVsCoiningGuide', '/engineering-tools/bottoming-vs-coining-guide'],
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
    back: '← Back to Engineering Tools',
    eyebrow: 'Engineering Guide',
    title: 'K-Factor Guide',
    subtitle: 'Professional guide for understanding K-factor, neutral axis location, bend allowance, bend deduction and flat pattern accuracy in press brake bending.',
    what: { title: 'What Is K-Factor?', text: 'K-factor is the ratio between the neutral axis distance from the inside surface and the material thickness. In sheet metal development it locates the line whose length is used through the bend zone.', formula: 'K = t / T', where: 't = neutral axis distance from inside surface; T = material thickness.', note: 'K-factor is not a material constant or one universal number. It is an engineering parameter affected by the actual bend setup.' },
    neutral: { title: 'Neutral Axis in Sheet Metal Bending', text: 'During bending, outside fibers stretch and inside fibers compress. The neutral axis is the zone with the least length change. It normally shifts toward the inside surface rather than remaining exactly at mid-thickness. As strain, radius and material response change, the practical neutral-axis position can also move.' },
    allowance: { title: 'How K-Factor Affects Bend Allowance', formula: 'BA = A × π / 180 × (R + K × T)', definitions: ['A = bend angle', 'R = inside radius', 'T = material thickness', 'K × T = neutral axis offset from the inside surface'], text: 'Because K × T forms part of the developed neutral-axis radius, changing K-factor changes bend allowance directly, even if angle, nominal thickness and specified radius remain unchanged.' },
    deduction: { title: 'K-Factor and Bend Deduction', formula: 'BD = 2 × OSSB − BA', text: 'Bend deduction depends on bend allowance. If the K-factor is incorrect, BA is incorrect, BD is then incorrect, and the flat pattern length moves away from the dimension required on the formed part.' },
    range: {
      title: 'Typical K-Factor Reference Range',
      headers: ['Bending Condition', 'Typical K-Factor Range', 'Engineering Notes'],
      rows: [
        ['Air bending', '0.30 - 0.45', 'Natural radius and material variation make test data important.'],
        ['Bottom bending', '0.30 - 0.40', 'Controlled seating can improve repeatability once setup is qualified.'],
        ['Coining', '0.25 - 0.35', 'High compression changes material flow; use dedicated data.'],
        ['Large radius bending', '0.40 - 0.50', 'Neutral axis may approach mid-thickness as R/T increases.'],
        ['Soft aluminum', '0.33 - 0.45', 'Alloy and temper must remain part of the record.'],
        ['Stainless steel', '0.32 - 0.45', 'Strength and springback require careful calibration.'],
      ],
      note: 'These K-factor values are engineering references. Actual values depend on material, inside radius, tooling, bend method and production calibration.',
    },
    materials: {
      title: 'Material Influence on K-Factor',
      cards: [
        ['Mild steel', 'Mild steel often provides stable baseline data for a controlled air-bend setup, but each thickness and tooling combination still needs verification.'],
        ['Stainless steel', 'Higher strength and springback make measured radius, angle compensation and calibrated development data especially important.'],
        ['Aluminum', 'Alloy and temper affect ductility, formed radius and neutral-axis behavior; do not merge soft and hardened material records.'],
      ],
    },
    tooling: { title: 'Tooling and Inside Radius Influence', text: 'V opening influences the natural inside radius in air bending, and punch radius can dominate when it is large relative to the bend. Since inside radius defines the neutral-axis arc path, a tooling change can produce different BA and BD values on the same material thickness. Record the actual V die and punch radius with every qualified value.' },
    methods: {
      title: 'Air Bending vs Bottoming vs Coining',
      cards: [
        ['Air bending', 'Offers flexibility but has more radius and angle variation from material, V opening and springback.'],
        ['Bottoming', 'Under controlled setup it can hold radius and angle more consistently, so qualified data may repeat more closely.'],
        ['Coining', 'Uses high pressure to change material flow; its practical K-factor assumptions should not be mixed with air-bend records.'],
      ],
    },
    calibration: { title: 'How to Calibrate K-Factor in Production', intro: 'Production-grade development data starts with a controlled bend coupon:', steps: ['Make a test bend using the production material and intended tooling.', 'Measure the formed flange dimensions and resulting angle.', 'Measure the actual inside radius, not only the drawing value.', 'Compare the achieved part with the programmed flat pattern result.', 'Adjust the K-factor or bend deduction table until the developed blank reproduces the required geometry.', 'Record the qualified value by material, thickness, V die, punch radius, angle and bend method.'] },
    mistakes: { title: 'Common K-Factor Mistakes', items: ['Using one K-factor for every material and thickness.', 'Ignoring actual inside radius after a tooling change.', 'Mixing air-bending and bottoming results in one table.', 'Accepting a CAD default without shop verification.', 'Ignoring batch, temper or thickness variation in material.', 'Confusing sheet metal K-factor with an unrelated K-value from another engineering field.'] },
    notes: { title: 'Engineering Notes', items: ['Treat K-factor as calibrated production data rather than only a theoretical input.', 'CAD defaults are sensible starting points, not final production truth.', 'Consistent tooling setup, orientation and inspection method improve repeatability.', 'High-accuracy parts require real bend-test data before release.', 'Build internal K-factor or bend deduction tables for common material, thickness and tooling combinations.'] },
    faqTitle: 'Frequently Asked Questions',
    faq: [
      ['What is K-factor in sheet metal bending?', 'It describes the neutral-axis position as a fraction of sheet thickness measured from the inside bend surface.'],
      ['How is K-factor calculated?', 'Use K = t / T, where t is the distance from the inside surface to the neutral axis and T is sheet thickness.'],
      ['What is a typical K-factor for sheet metal?', 'Values are often in the approximate 0.30 to 0.50 range, but the usable value must be qualified for material, radius, tooling and bend method.'],
      ['Does K-factor change with material?', 'Yes. Material strength, ductility, temper and springback behavior influence the practical neutral-axis location.'],
      ['How does K-factor affect bend allowance?', 'K-factor determines K × T in the BA formula, so changing it directly changes developed bend length.'],
      ['Is K-factor the same for air bending and bottoming?', 'No. The bend method changes contact, radius control and material flow, so data should be maintained separately.'],
      ['Why does my CAD flat pattern not match the real part?', 'The common causes are uncalibrated K-factor or BD, incorrect actual radius, changed tooling, material variation or springback compensation.'],
    ],
    relatedTitle: 'Related Engineering Tools',
    relatedAria: 'Related engineering tools',
    diagram: { eyebrow: 'Engineering Diagram', title: 'K-factor neutral axis location and developed bend length', svgTitle: 'K-factor neutral axis diagram', svgDescription: 'Bent sheet section showing material thickness, inside surface, neutral axis offset, inside radius and the bend allowance region in a flat pattern.', bentSection: 'BENT SECTION', flatPattern: 'FLAT PATTERN REFERENCE', thickness: 'material thickness', offset: 'neutral axis offset', insideSurface: 'inside surface', neutralAxis: 'neutral axis', insideRadius: 'inside radius', baArc: 'bend allowance (BA)', relationship: 'DEVELOPMENT CHAIN', flatLength: 'flat pattern length', verify: 'verify with a measured trial bend' },
  },
  zh: {
    back: '← 返回工程工具中心', eyebrow: '工程指南', title: 'K 因子指南',
    subtitle: '面向折弯机钣金加工的专业指南，系统说明 K 因子、中性层位置、折弯展开量、折弯扣除量与展开尺寸精度。',
    what: { title: '什么是 K 因子？', text: 'K 因子是中性层到板材内侧表面的距离与板厚之比。在钣金展开计算中，它用于确定折弯区内参与展开长度计算的中性层位置。', formula: 'K = t / T', where: 't = 中性层到内侧表面的距离；T = 材料厚度。', note: 'K 因子不是材料常数，也不是通用固定值，而是由实际折弯条件决定的工程参数。' },
    neutral: { title: '钣金折弯中的中性层', text: '折弯时，外侧纤维被拉伸，内侧纤维受压缩；中性层是长度变化最小的区域。它通常向板材内侧偏移，而不是固定在板厚中心。随着应变、半径和材料响应变化，实际中性层位置也会变化。' },
    allowance: { title: 'K 因子如何影响折弯展开量', formula: 'BA = A × π / 180 × (R + K × T)', definitions: ['A = 折弯角度', 'R = 内半径', 'T = 材料厚度', 'K × T = 中性层相对内表面的偏移距离'], text: 'K × T 是中性层展开半径的一部分，因此即使角度、名义板厚和指定半径不变，K 因子的变化也会直接改变 BA。' },
    deduction: { title: 'K 因子与折弯扣除量', formula: 'BD = 2 × OSSB − BA', text: 'BD 与 BA 直接相关。K 因子错误会导致 BA 错误，进一步导致 BD 与最终展开长度偏离成品要求。' },
    range: { title: '典型 K 因子工程参考范围', headers: ['折弯条件', '典型 K 因子范围', '工程说明'], rows: [['空气折弯', '0.30 - 0.45', '自然内半径和材料波动使试折数据非常重要。'], ['压底折弯', '0.30 - 0.40', '受控贴合设定经验证后重复性通常较好。'], ['压印折弯', '0.25 - 0.35', '高压改变材料流动，应建立独立数据。'], ['大半径折弯', '0.40 - 0.50', 'R/T 增大时中性层可能更接近板厚中心。'], ['软态铝板', '0.33 - 0.45', '合金与状态必须纳入记录。'], ['不锈钢', '0.32 - 0.45', '强度和回弹要求谨慎校准。']], note: '这些 K 因子数值为工程参考值。实际数值会受材料、内半径、模具、折弯方式和生产校准影响。' },
    materials: { title: '材料对 K 因子的影响', cards: [['低碳钢', '在受控空气折弯设定下通常适合建立稳定基准，但每种板厚与模具组合仍须验证。'], ['不锈钢', '更高强度和较明显回弹使实际半径测量、角度补偿和展开校准尤其重要。'], ['铝板', '合金与状态会影响延性、成形半径和中性层行为，软态与硬态数据不应混用。']] },
    tooling: { title: '模具与内半径影响', text: '空气折弯中 V 开口会影响自然内半径；当冲头圆角相对较大时，冲头半径也可能主导成形半径。内半径决定中性层弧线路径，所以同一板厚更换模具后会得到不同 BA 与 BD。合格数据必须记录 V 型下模和冲头半径。' },
    methods: { title: '空气折弯、压底折弯与压印折弯', cards: [['空气折弯', '灵活性高，但材料、V 开口和回弹带来的半径与角度变动更明显。'], ['压底折弯', '在受控设置下可获得更一致的半径和角度，验证后的数据更容易重复。'], ['压印折弯', '利用较高压力改变材料流动，其实际 K 因子假设不应与空气折弯记录混用。']] },
    calibration: { title: '如何在生产中校准 K 因子', intro: '工程级展开数据应从受控试折样件开始：', steps: ['用生产材料和计划使用的模具进行试折。', '测量成形后的法兰尺寸与实际角度。', '测量实际内半径，而不是只采用图纸标注。', '将成形结果与程序使用的展开尺寸进行比较。', '调整 K 因子或折弯扣除表，直到毛坯能稳定获得要求几何。', '按材料、板厚、V 型模、冲头半径、角度和折弯方式记录验证值。'] },
    mistakes: { title: '常见 K 因子错误', items: ['所有材料和板厚沿用同一个 K 因子。', '更换模具后忽略实际内半径。', '将空气折弯与压底数据混在同一张表中。', '直接采用 CAD 默认值而不进行车间验证。', '忽视材料批次、状态或厚度差异。', '将钣金 K 因子与其它工程领域的 K 值混淆。'] },
    notes: { title: '工程说明', items: ['K 因子最好按经过校准的生产数据管理，而不仅是理论输入。', 'CAD 默认值可以作为起点，但不能视为最终生产真值。', '稳定的模具设置、方向和检验方法能改善重复性。', '高精度零件在放行前需要真实试折数据。', '工厂应针对常用材料、板厚和模具组合建立内部 K 因子或 BD 数据表。'] },
    faqTitle: '常见问题', faq: [['钣金折弯中的 K 因子是什么？', '它表示从折弯内表面测量的中性层位置占板厚的比例。'], ['K 因子如何计算？', '使用 K = t / T，其中 t 为内表面到中性层距离，T 为板厚。'], ['钣金常见 K 因子是多少？', '工程参考通常约为 0.30 至 0.50，但可用值必须结合材料、半径、模具和折弯方式验证。'], ['K 因子会随材料改变吗？', '会。材料强度、延性、状态和回弹会影响实际中性层位置。'], ['K 因子如何影响 BA？', '它决定 BA 公式中的 K × T，因此会直接改变展开弧长。'], ['空气折弯和压底折弯的 K 因子相同吗？', '不相同。接触状态、半径控制和材料流动不同，应分别维护数据。'], ['为什么 CAD 展开尺寸与实物不符？', '常见原因是未校准的 K 因子或 BD、实际半径错误、模具变动、材料差异或回弹补偿不足。']],
    relatedTitle: '相关工程工具', relatedAria: '相关工程工具',
    diagram: { eyebrow: '工程图示', title: 'K 因子中性层位置与折弯展开长度', svgTitle: 'K 因子中性层示意图', svgDescription: '钣金折弯截面图，标注板厚、内表面、中性层偏移、内半径以及展开毛坯中的折弯展开量区域。', bentSection: '折弯截面', flatPattern: '展开参考', thickness: '材料厚度', offset: '中性层偏移', insideSurface: '内侧表面', neutralAxis: '中性层', insideRadius: '内半径', baArc: '折弯展开量 BA', relationship: '展开尺寸传递关系', flatLength: '展开长度', verify: '通过实测试折进行验证' },
  },
  ru: {
    back: '← Назад к инженерным инструментам', eyebrow: 'Инженерное руководство', title: 'Руководство по K-фактору',
    subtitle: 'Профессиональное руководство по K-фактору, положению нейтрального слоя, припуску и вычету гиба, а также точности развертки при гибке на листогибе.',
    what: { title: 'Что такое K-фактор?', text: 'K-фактор является отношением расстояния от внутренней поверхности листа до нейтрального слоя к толщине материала. В расчете развертки он задает линию, по длине которой учитывается зона гиба.', formula: 'K = t / T', where: 't = расстояние от внутренней поверхности до нейтрального слоя; T = толщина материала.', note: 'K-фактор не является постоянным свойством материала или универсальным числом: это технологический параметр реальной настройки.' },
    neutral: { title: 'Нейтральный слой при гибке листа', text: 'При гибке наружные волокна растягиваются, а внутренние сжимаются. Нейтральный слой изменяет длину минимально и обычно смещается к внутренней стороне, а не остается в середине толщины. Его фактическое положение меняется с деформацией, радиусом и поведением материала.' },
    allowance: { title: 'Влияние K-фактора на припуск на гиб', formula: 'BA = A × π / 180 × (R + K × T)', definitions: ['A = угол гиба', 'R = внутренний радиус', 'T = толщина материала', 'K × T = смещение нейтрального слоя от внутренней поверхности'], text: 'Так как K × T входит в радиус развертки нейтрального слоя, изменение K-фактора непосредственно меняет BA.' },
    deduction: { title: 'K-фактор и вычет гиба', formula: 'BD = 2 × OSSB − BA', text: 'Вычет гиба зависит от BA. Ошибка K-фактора дает ошибку BA, затем BD и в итоге длины плоской заготовки.' },
    range: { title: 'Типовые справочные диапазоны K-фактора', headers: ['Условие гибки', 'Типовой диапазон', 'Инженерное примечание'], rows: [['Воздушная гибка', '0.30 - 0.45', 'Естественный радиус требует проверки пробным гибом.'], ['Гибка до дна', '0.30 - 0.40', 'После квалификации настройка обычно повторяемее.'], ['Чеканка', '0.25 - 0.35', 'Высокое давление меняет течение материала.'], ['Большой радиус', '0.40 - 0.50', 'При росте R/T нейтральный слой смещается к середине.'], ['Мягкий алюминий', '0.33 - 0.45', 'Записывайте сплав и состояние.'], ['Нержавеющая сталь', '0.32 - 0.45', 'Прочность и пружинение требуют калибровки.']], note: 'Эти значения K-фактора являются инженерными ориентирами. Реальные значения зависят от материала, внутреннего радиуса, оснастки, метода гибки и производственной калибровки.' },
    materials: { title: 'Влияние материала', cards: [['Низкоуглеродистая сталь', 'Часто дает стабильную исходную базу, однако комбинацию толщины и оснастки следует проверять.'], ['Нержавеющая сталь', 'Повышенные прочность и пружинение требуют измерения радиуса и калибровки развертки.'], ['Алюминий', 'Сплав и состояние влияют на пластичность, радиус и положение нейтрального слоя.']] },
    tooling: { title: 'Влияние оснастки и внутреннего радиуса', text: 'Раскрытие V-матрицы определяет естественный радиус при воздушной гибке, а крупный радиус пуансона может задавать форму напрямую. Изменение радиуса изменяет путь нейтрального слоя, поэтому одинаковая толщина дает другие BA и BD с другой оснасткой.' },
    methods: { title: 'Воздушная гибка, гибка до дна и чеканка', cards: [['Воздушная гибка', 'Гибкая технология, но вариации радиуса и угла заметнее.'], ['Гибка до дна', 'При контролируемой настройке радиус и угол повторяются стабильнее.'], ['Чеканка', 'Высокое давление меняет течение материала; данные нельзя смешивать с воздушной гибкой.']] },
    calibration: { title: 'Калибровка K-фактора в производстве', intro: 'Рабочие данные получают по контролируемому образцу:', steps: ['Выполните пробный гиб производственного материала нужной оснасткой.', 'Измерьте полки и фактический угол.', 'Измерьте реальный внутренний радиус.', 'Сравните деталь с рассчитанной разверткой.', 'Скорректируйте K-фактор или таблицу BD.', 'Запишите материал, толщину, V-матрицу, радиус пуансона, угол и метод гибки.'] },
    mistakes: { title: 'Типичные ошибки', items: ['Один K-фактор для всех материалов.', 'Игнорирование фактического радиуса.', 'Смешение данных воздушной гибки и гибки до дна.', 'Применение значения CAD без проверки в цехе.', 'Игнорирование различий партии и состояния материала.', 'Путаница с коэффициентом K из иных инженерных задач.'] },
    notes: { title: 'Инженерные примечания', items: ['Рассматривайте K-фактор как калиброванные производственные данные.', 'Значение CAD является отправной точкой, а не окончательным результатом.', 'Постоянная настройка оснастки повышает повторяемость.', 'Точные детали требуют реального пробного гиба.', 'Создавайте внутренние таблицы K-фактора или BD для рабочих сочетаний.'] },
    faqTitle: 'Частые вопросы', faq: [['Что означает K-фактор при гибке листа?', 'Это положение нейтрального слоя как доля толщины от внутренней поверхности.'], ['Как рассчитать K-фактор?', 'Используйте K = t / T, где t - расстояние до нейтрального слоя, T - толщина листа.'], ['Какой K-фактор является типовым?', 'Ориентир часто лежит в диапазоне 0.30-0.50, но производственное значение требует проверки.'], ['Зависит ли K-фактор от материала?', 'Да, на него влияют прочность, пластичность, состояние и пружинение.'], ['Как K-фактор влияет на BA?', 'Через член K × T он напрямую изменяет длину дуги BA.'], ['Одинаков ли K-фактор для воздушной гибки и гибки до дна?', 'Нет, эти методы следует калибровать отдельно.'], ['Почему развертка CAD не совпадает с деталью?', 'Проверьте K-фактор или BD, фактический радиус, оснастку, материал и компенсацию пружинения.']],
    relatedTitle: 'Связанные инженерные инструменты', relatedAria: 'Связанные инженерные инструменты',
    diagram: { eyebrow: 'Инженерная схема', title: 'Положение нейтрального слоя и длина развертки', svgTitle: 'Схема нейтрального слоя K-фактора', svgDescription: 'Сечение гиба с толщиной листа, внутренней поверхностью, нейтральным слоем, радиусом и зоной припуска на плоской развертке.', bentSection: 'СЕЧЕНИЕ ГИБА', flatPattern: 'РАЗВЕРТКА', thickness: 'толщина листа', offset: 'смещение слоя', insideSurface: 'внутренняя поверхность', neutralAxis: 'нейтральный слой', insideRadius: 'внутренний радиус', baArc: 'припуск на гиб BA', relationship: 'ЦЕПОЧКА РАСЧЕТА', flatLength: 'длина развертки', verify: 'проверить измеренным пробным гибом' },
  },
  es: {
    back: '← Volver a herramientas de ingeniería', eyebrow: 'Guía de ingeniería', title: 'Guía del factor K',
    subtitle: 'Guía profesional para comprender el factor K, la posición del eje neutro, el desarrollo, la deducción de plegado y la precisión del patrón plano en plegadora.',
    what: { title: '¿Qué es el factor K?', text: 'El factor K es la relación entre la distancia del eje neutro a la cara interior y el espesor del material. En el desarrollo de chapa localiza la línea cuya longitud se emplea en la zona plegada.', formula: 'K = t / T', where: 't = distancia desde la cara interior al eje neutro; T = espesor del material.', note: 'No es una constante del material ni un número universal: es un parámetro técnico de la configuración real.' },
    neutral: { title: 'Eje neutro en el plegado de chapa', text: 'Durante el plegado las fibras exteriores se estiran y las interiores se comprimen. El eje neutro cambia mínimamente de longitud y suele desplazarse hacia el interior, no quedar exactamente en el centro del espesor. Su posición práctica varía con deformación, radio y material.' },
    allowance: { title: 'Cómo afecta el factor K al desarrollo', formula: 'BA = A × π / 180 × (R + K × T)', definitions: ['A = ángulo de plegado', 'R = radio interior', 'T = espesor del material', 'K × T = separación del eje neutro respecto a la cara interior'], text: 'Como K × T forma parte del radio desarrollado del eje neutro, una variación del factor K modifica directamente BA.' },
    deduction: { title: 'Factor K y deducción de plegado', formula: 'BD = 2 × OSSB − BA', text: 'BD depende de BA. Un factor K erróneo produce un BA incorrecto, luego un BD incorrecto y finalmente un patrón plano fuera de medida.' },
    range: { title: 'Rangos orientativos del factor K', headers: ['Condición de plegado', 'Rango típico', 'Notas técnicas'], rows: [['Plegado al aire', '0.30 - 0.45', 'El radio natural exige validar con prueba.'], ['Plegado a fondo', '0.30 - 0.40', 'Una puesta a punto controlada puede ser más repetible.'], ['Acuñado', '0.25 - 0.35', 'La alta presión modifica el flujo del material.'], ['Plegado de radio grande', '0.40 - 0.50', 'Al crecer R/T, el eje puede acercarse al centro.'], ['Aluminio blando', '0.33 - 0.45', 'Registrar aleación y temple.'], ['Acero inoxidable', '0.32 - 0.45', 'Resistencia y retorno requieren calibración.']], note: 'Estos valores del factor K son referencias de ingeniería. Los valores reales dependen del material, radio interior, utillaje, método de plegado y calibración de producción.' },
    materials: { title: 'Influencia del material', cards: [['Acero dulce', 'Suele ofrecer una base estable, aunque cada espesor y utillaje debe verificarse.'], ['Acero inoxidable', 'Mayor resistencia y retorno elástico exigen medir radio y calibrar el desarrollo.'], ['Aluminio', 'La aleación y el temple afectan ductilidad, radio formado y comportamiento del eje neutro.']] },
    tooling: { title: 'Influencia del utillaje y radio interior', text: 'La abertura V afecta el radio natural en plegado al aire y un punzón de gran radio puede dominar la geometría. Como el radio interior define el recorrido del eje neutro, cambiar utillaje produce valores BA y BD diferentes incluso con el mismo espesor.' },
    methods: { title: 'Plegado al aire, a fondo y acuñado', cards: [['Plegado al aire', 'Es flexible, pero presenta mayor variación de radio y ángulo.'], ['Plegado a fondo', 'Con ajuste controlado puede repetir radio y ángulo de forma más consistente.'], ['Acuñado', 'Cambia el flujo del material por alta presión; sus datos deben mantenerse separados.']] },
    calibration: { title: 'Cómo calibrar el factor K en producción', intro: 'Los datos fiables parten de una probeta controlada:', steps: ['Realice un plegado de prueba con material y utillaje de producción.', 'Mida cotas formadas y ángulo real.', 'Mida el radio interior real.', 'Compare la pieza con el patrón plano programado.', 'Ajuste el factor K o la tabla BD.', 'Registre material, espesor, matriz V, radio de punzón, ángulo y método.'] },
    mistakes: { title: 'Errores comunes del factor K', items: ['Usar un solo factor K para todos los materiales.', 'Ignorar el radio interior real.', 'Mezclar datos de plegado al aire y a fondo.', 'Aceptar el valor CAD sin validación de taller.', 'Ignorar lote, temple o variación de espesor.', 'Confundirlo con un valor K de otra disciplina técnica.'] },
    notes: { title: 'Notas de ingeniería', items: ['Trate el factor K como dato de producción calibrado.', 'Los valores CAD son puntos de partida, no la verdad final.', 'Un montaje de utillaje constante mejora la repetibilidad.', 'Las piezas de alta precisión necesitan prueba real.', 'Cree tablas internas de factor K o BD para combinaciones habituales.'] },
    faqTitle: 'Preguntas frecuentes', faq: [['¿Qué es el factor K en plegado de chapa?', 'Es la posición del eje neutro expresada como fracción del espesor desde la cara interior.'], ['¿Cómo se calcula el factor K?', 'Se usa K = t / T, donde t es la distancia al eje neutro y T el espesor.'], ['¿Cuál es un factor K típico?', 'Como referencia suele encontrarse entre 0.30 y 0.50, pero debe validarse para producción.'], ['¿Cambia con el material?', 'Sí; resistencia, ductilidad, temple y retorno influyen.'], ['¿Cómo afecta a BA?', 'Define K × T en la fórmula y cambia directamente la longitud desarrollada.'], ['¿Es igual para plegado al aire y a fondo?', 'No; conviene mantener datos calibrados por método.'], ['¿Por qué no coincide mi patrón CAD con la pieza?', 'Revise factor K o BD, radio real, utillaje, material y compensación del retorno.']],
    relatedTitle: 'Herramientas de ingeniería relacionadas', relatedAria: 'Herramientas de ingeniería relacionadas',
    diagram: { eyebrow: 'Diagrama técnico', title: 'Posición del eje neutro y longitud desarrollada', svgTitle: 'Diagrama del eje neutro para factor K', svgDescription: 'Sección plegada con espesor, cara interior, desplazamiento del eje neutro, radio interior y zona de desarrollo en el patrón plano.', bentSection: 'SECCIÓN PLEGADA', flatPattern: 'PATRÓN PLANO', thickness: 'espesor', offset: 'desplazamiento', insideSurface: 'cara interior', neutralAxis: 'eje neutro', insideRadius: 'radio interior', baArc: 'desarrollo BA', relationship: 'CADENA DE DESARROLLO', flatLength: 'longitud plana', verify: 'verificar con plegado de prueba medido' },
  },
  tr: {
    back: '← Mühendislik araçlarına dön', eyebrow: 'Mühendislik kılavuzu', title: 'K-Faktörü Kılavuzu',
    subtitle: 'Abkant bükmede K-faktörünü, nötr eksen konumunu, büküm payını, büküm düşümünü ve açınım doğruluğunu anlamaya yönelik profesyonel kılavuz.',
    what: { title: 'K-Faktörü Nedir?', text: 'K-faktörü, nötr eksenin iç yüzeyden uzaklığının malzeme kalınlığına oranıdır. Sac açınımında büküm bölgesindeki uzunluk hesabının dayandığı hattı belirler.', formula: 'K = t / T', where: 't = iç yüzeyden nötr eksene uzaklık; T = malzeme kalınlığı.', note: 'K-faktörü bir malzeme sabiti veya evrensel sayı değildir; gerçek büküm kurulumuna bağlı bir mühendislik parametresidir.' },
    neutral: { title: 'Sac Bükmede Nötr Eksen', text: 'Bükme sırasında dış lifler uzar, iç lifler sıkışır. Nötr eksen uzunluğu en az değişen bölgedir ve çoğu zaman kalınlık merkezinde kalmayıp iç yüzeye yaklaşır. Gerinim, radyüs ve malzeme davranışı değişince pratik konumu da değişebilir.' },
    allowance: { title: 'K-Faktörü Büküm Payını Nasıl Etkiler?', formula: 'BA = A × π / 180 × (R + K × T)', definitions: ['A = büküm açısı', 'R = iç radyüs', 'T = malzeme kalınlığı', 'K × T = nötr eksenin iç yüzeye göre ofseti'], text: 'K × T nötr eksen açınım yarıçapının parçasıdır; bu nedenle K-faktörü değiştiğinde BA doğrudan değişir.' },
    deduction: { title: 'K-Faktörü ve Büküm Düşümü', formula: 'BD = 2 × OSSB − BA', text: 'BD, BA değerine bağlıdır. Yanlış K-faktörü BA ve ardından BD hatasına, sonuçta yanlış düz açınıma neden olur.' },
    range: { title: 'Tipik K-Faktörü Referans Aralıkları', headers: ['Büküm Koşulu', 'Tipik Aralık', 'Mühendislik Notu'], rows: [['Havada bükme', '0.30 - 0.45', 'Doğal radyüs için deneme verisi önemlidir.'], ['Tabana bükme', '0.30 - 0.40', 'Kontrollü kurulum tekrarlanabilirliği artırabilir.'], ['Ezerek bükme', '0.25 - 0.35', 'Yüksek basınç malzeme akışını değiştirir.'], ['Büyük radyüslü bükme', '0.40 - 0.50', 'R/T arttıkça nötr eksen merkeze yaklaşabilir.'], ['Yumuşak alüminyum', '0.33 - 0.45', 'Alaşım ve temper kaydedilmelidir.'], ['Paslanmaz çelik', '0.32 - 0.45', 'Dayanım ve geri esneme kalibrasyon gerektirir.']], note: 'Bu K-faktörü değerleri mühendislik referansıdır. Gerçek değerler malzemeye, iç radyüse, takıma, büküm yöntemine ve üretim kalibrasyonuna bağlıdır.' },
    materials: { title: 'Malzemenin K-Faktörüne Etkisi', cards: [['Yumuşak çelik', 'Kontrollü kurulumda sağlam başlangıç verisi sunabilir; her kalınlık ve takım yine doğrulanmalıdır.'], ['Paslanmaz çelik', 'Yüksek dayanım ve geri esneme, ölçülmüş radyüs ve kalibre açınım gerektirir.'], ['Alüminyum', 'Alaşım ve temper, sünekliği, radyüsü ve nötr eksen davranışını etkiler.']] },
    tooling: { title: 'Takım ve İç Radyüs Etkisi', text: 'Havada bükmede V açıklığı doğal iç radyüsü etkiler; büyük uç radyüslü zımba geometrinin belirleyicisi olabilir. İç radyüs nötr eksen yolunu belirlediğinden takım değişikliği aynı kalınlıkta farklı BA ve BD üretir.' },
    methods: { title: 'Havada Bükme, Tabana Bükme ve Ezerek Bükme', cards: [['Havada bükme', 'Esnektir, ancak radyüs ve açı değişimi daha yüksektir.'], ['Tabana bükme', 'Kontrollü ayarda radyüs ve açı daha tutarlı tekrar edebilir.'], ['Ezerek bükme', 'Yüksek basınç malzeme akışını değiştirir; verileri ayrı tutulmalıdır.']] },
    calibration: { title: 'Üretimde K-Faktörü Kalibrasyonu', intro: 'Güvenilir açınım verisi kontrollü numuneden başlar:', steps: ['Üretim malzemesi ve planlanan takımla deneme bükümü yapın.', 'Şekillenmiş ölçüleri ve gerçek açıyı ölçün.', 'Gerçek iç radyüsü ölçün.', 'Parçayı programlanan açınımla karşılaştırın.', 'K-faktörünü veya BD tablosunu ayarlayın.', 'Malzeme, kalınlık, V kalıp, zımba radyüsü, açı ve yöntem ile kaydedin.'] },
    mistakes: { title: 'Yaygın K-Faktörü Hataları', items: ['Tüm malzemelerde tek K-faktörü kullanmak.', 'Gerçek iç radyüsü yok saymak.', 'Havada ve tabana bükme verisini karıştırmak.', 'CAD varsayılanını atölye doğrulaması olmadan kullanmak.', 'Parti veya temper farklarını yok saymak.', 'Başka alanlardaki K değeriyle karıştırmak.'] },
    notes: { title: 'Mühendislik Notları', items: ['K-faktörünü kalibre üretim verisi olarak yönetin.', 'CAD varsayılanları başlangıçtır, son doğrulama değildir.', 'Tutarlı takım kurulumu tekrarlanabilirliği geliştirir.', 'Hassas parçalar gerçek deneme verisi ister.', 'Yaygın kombinasyonlar için kurum içi K-faktörü veya BD tabloları oluşturun.'] },
    faqTitle: 'Sık Sorulan Sorular', faq: [['Sac bükmede K-faktörü nedir?', 'İç yüzeyden ölçülen nötr eksen konumunun sac kalınlığına oranıdır.'], ['K-faktörü nasıl hesaplanır?', 'K = t / T kullanılır; t nötr eksen mesafesi, T sac kalınlığıdır.'], ['Tipik K-faktörü nedir?', 'Referans olarak çoğu zaman 0.30-0.50 aralığı görülür, ancak üretim için doğrulanmalıdır.'], ['Malzemeye göre değişir mi?', 'Evet; dayanım, süneklik, temper ve geri esneme etkiler.'], ['BA değerini nasıl etkiler?', 'Formüldeki K × T terimini belirleyerek açınım uzunluğunu doğrudan değiştirir.'], ['Havada ve tabana bükmede aynı mıdır?', 'Hayır; yöntemler ayrı kalibre edilmelidir.'], ['CAD açınımım neden gerçek parçaya uymuyor?', 'K-faktörü veya BD, gerçek radyüs, takım, malzeme ve geri esneme telafisini kontrol edin.']],
    relatedTitle: 'İlgili mühendislik araçları', relatedAria: 'İlgili mühendislik araçları',
    diagram: { eyebrow: 'Mühendislik diyagramı', title: 'Nötr eksen konumu ve açınım uzunluğu', svgTitle: 'K-faktörü nötr eksen diyagramı', svgDescription: 'Kalınlık, iç yüzey, nötr eksen ofseti, iç radyüs ve açınım üzerindeki büküm payı alanını gösteren bükülmüş sac kesiti.', bentSection: 'BÜKÜM KESİTİ', flatPattern: 'AÇINIM REFERANSI', thickness: 'malzeme kalınlığı', offset: 'nötr eksen ofseti', insideSurface: 'iç yüzey', neutralAxis: 'nötr eksen', insideRadius: 'iç radyüs', baArc: 'büküm payı BA', relationship: 'AÇINIM ZİNCİRİ', flatLength: 'açınım boyu', verify: 'ölçülmüş deneme bükümüyle doğrulayın' },
  },
  id: {
    back: '← Kembali ke pusat alat teknik', eyebrow: 'Panduan teknik', title: 'Panduan K-Factor',
    subtitle: 'Panduan profesional untuk memahami K-factor, posisi sumbu netral, bend allowance, bend deduction, dan akurasi flat pattern pada bending press brake.',
    what: { title: 'Apa Itu K-Factor?', text: 'K-factor adalah rasio jarak sumbu netral dari permukaan dalam terhadap ketebalan material. Dalam pengembangan plat, parameter ini menentukan garis panjang pada zona tekuk.', formula: 'K = t / T', where: 't = jarak sumbu netral dari permukaan dalam; T = ketebalan material.', note: 'K-factor bukan konstanta material atau angka universal, melainkan parameter teknik dari setup bending aktual.' },
    neutral: { title: 'Sumbu Netral pada Bending Plat', text: 'Saat ditekuk, serat luar meregang dan serat dalam terkompresi. Sumbu netral adalah zona dengan perubahan panjang paling kecil dan biasanya bergeser ke sisi dalam, bukan tepat di tengah ketebalan. Posisi praktisnya berubah bersama regangan, radius, dan respons material.' },
    allowance: { title: 'Pengaruh K-Factor terhadap Bend Allowance', formula: 'BA = A × π / 180 × (R + K × T)', definitions: ['A = sudut tekuk', 'R = radius dalam', 'T = ketebalan material', 'K × T = offset sumbu netral dari permukaan dalam'], text: 'Karena K × T merupakan bagian dari radius pengembangan sumbu netral, perubahan K-factor langsung mengubah BA.' },
    deduction: { title: 'K-Factor dan Bend Deduction', formula: 'BD = 2 × OSSB − BA', text: 'BD bergantung pada BA. K-factor yang salah menghasilkan BA dan BD yang salah, sehingga panjang flat pattern menyimpang dari dimensi komponen jadi.' },
    range: { title: 'Rentang Referensi K-Factor', headers: ['Kondisi Bending', 'Rentang Tipikal', 'Catatan Teknik'], rows: [['Air bending', '0.30 - 0.45', 'Radius alami perlu divalidasi melalui trial bend.'], ['Bottom bending', '0.30 - 0.40', 'Setup terkendali dapat lebih konsisten setelah divalidasi.'], ['Coining', '0.25 - 0.35', 'Tekanan tinggi mengubah aliran material.'], ['Bending radius besar', '0.40 - 0.50', 'Saat R/T meningkat, sumbu netral dapat mendekati tengah.'], ['Aluminium lunak', '0.33 - 0.45', 'Paduan dan temper harus dicatat.'], ['Stainless steel', '0.32 - 0.45', 'Kekuatan dan springback memerlukan kalibrasi.']], note: 'Nilai K-factor ini adalah referensi teknik. Nilai aktual bergantung pada material, radius dalam, tooling, metode bending, dan kalibrasi produksi.' },
    materials: { title: 'Pengaruh Material terhadap K-Factor', cards: [['Baja karbon rendah', 'Sering memberikan data dasar yang stabil, tetapi setiap kombinasi ketebalan dan tooling tetap harus diverifikasi.'], ['Stainless steel', 'Kekuatan dan springback lebih tinggi membutuhkan pengukuran radius serta kalibrasi pengembangan.'], ['Aluminium', 'Paduan dan temper memengaruhi keuletan, radius terbentuk, dan perilaku sumbu netral.']] },
    tooling: { title: 'Pengaruh Tooling dan Radius Dalam', text: 'Bukaan V memengaruhi radius dalam alami pada air bending, sedangkan radius punch yang besar dapat mendominasi geometri. Karena radius dalam menentukan jalur sumbu netral, perubahan tooling dapat menghasilkan BA dan BD berbeda pada ketebalan yang sama.' },
    methods: { title: 'Air Bending, Bottoming, dan Coining', cards: [['Air bending', 'Fleksibel, tetapi variasi radius dan sudut lebih besar.'], ['Bottom bending', 'Dengan setup terkendali, radius dan sudut dapat lebih konsisten.'], ['Coining', 'Tekanan tinggi mengubah aliran material; datanya harus dipisahkan dari air bending.']] },
    calibration: { title: 'Cara Mengalibrasi K-Factor dalam Produksi', intro: 'Data pengembangan yang andal dimulai dari kupon uji terkendali:', steps: ['Lakukan trial bend dengan material produksi dan tooling yang direncanakan.', 'Ukur dimensi flange hasil bentuk dan sudut aktual.', 'Ukur radius dalam aktual.', 'Bandingkan komponen dengan hasil flat pattern terprogram.', 'Sesuaikan K-factor atau tabel BD.', 'Catat material, ketebalan, V-die, radius punch, sudut, dan metode bending.'] },
    mistakes: { title: 'Kesalahan Umum K-Factor', items: ['Memakai satu K-factor untuk semua material.', 'Mengabaikan radius dalam aktual.', 'Mencampur data air bending dan bottoming.', 'Menggunakan default CAD tanpa verifikasi workshop.', 'Mengabaikan perbedaan batch atau temper.', 'Mencampur K-factor ini dengan nilai K bidang teknik lain.'] },
    notes: { title: 'Catatan Teknik', items: ['Kelola K-factor sebagai data produksi terkalibrasi.', 'Default CAD adalah titik awal, bukan hasil akhir.', 'Setup tooling yang konsisten meningkatkan keterulangan.', 'Komponen presisi tinggi memerlukan data trial bend nyata.', 'Bangun tabel internal K-factor atau BD untuk kombinasi yang rutin.'] },
    faqTitle: 'Pertanyaan Umum', faq: [['Apa itu K-factor pada bending plat?', 'K-factor menyatakan posisi sumbu netral sebagai fraksi ketebalan yang diukur dari permukaan dalam.'], ['Bagaimana K-factor dihitung?', 'Gunakan K = t / T, dengan t jarak ke sumbu netral dan T ketebalan plat.'], ['Berapa K-factor tipikal?', 'Referensi sering berada sekitar 0.30-0.50, tetapi nilai produksi harus divalidasi.'], ['Apakah berubah menurut material?', 'Ya; kekuatan, keuletan, temper, dan springback memengaruhinya.'], ['Bagaimana pengaruhnya terhadap BA?', 'K-factor menetapkan K × T pada formula BA sehingga langsung mengubah panjang pengembangan.'], ['Apakah sama untuk air bending dan bottoming?', 'Tidak; data setiap metode perlu dikalibrasi terpisah.'], ['Mengapa flat pattern CAD tidak cocok dengan komponen nyata?', 'Periksa K-factor atau BD, radius aktual, tooling, variasi material, dan kompensasi springback.']],
    relatedTitle: 'Alat teknik terkait', relatedAria: 'Alat teknik terkait',
    diagram: { eyebrow: 'Diagram teknik', title: 'Posisi sumbu netral dan panjang pengembangan', svgTitle: 'Diagram sumbu netral K-factor', svgDescription: 'Penampang plat tertekuk yang menampilkan ketebalan, permukaan dalam, offset sumbu netral, radius dalam, dan area bend allowance pada flat pattern.', bentSection: 'PENAMPANG TEKUK', flatPattern: 'REFERENSI FLAT PATTERN', thickness: 'ketebalan material', offset: 'offset sumbu netral', insideSurface: 'permukaan dalam', neutralAxis: 'sumbu netral', insideRadius: 'radius dalam', baArc: 'bend allowance BA', relationship: 'RANTAI PENGEMBANGAN', flatLength: 'panjang flat pattern', verify: 'verifikasi dengan trial bend terukur' },
  },
}

const createStructuredData = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'K-Factor Guide',
      description: content.en.subtitle,
      url: getSiteUrl(routePath),
      publisher: ZYCO_PUBLISHER,
    },
    {
      '@type': 'TechArticle',
      headline: 'K-Factor Guide for Sheet Metal Bending',
      description: content.en.subtitle,
      url: getSiteUrl(routePath),
      author: ZYCO_PUBLISHER,
      publisher: ZYCO_PUBLISHER,
      about: ['sheet metal K-factor', 'neutral axis', 'bend allowance', 'bend deduction', 'flat pattern'],
    },
    createFAQPageStructuredData(content.en.faq),
  ],
})

const InfoCard = ({ title, text }) => (
  <article className='zyco-kfactor__card'>
    <h3>{title}</h3>
    <p>{text}</p>
  </article>
)

export default function KFactorGuide({ language = 'en', setLanguage = () => {} }) {
  const page = content[language] || content.en
  const sharedText = getEngineeringText(language)

  useEffect(() => {
    setPageSEO({
      title: 'K-Factor Guide for Sheet Metal Bending | ZYCO Engineering Hub',
      description: 'Engineering guide to sheet metal K-factor formula, neutral axis location, bend allowance, bend deduction and calibrated press brake flat pattern accuracy.',
      keywords: 'K-factor, sheet metal K-factor, K-factor formula, K-factor bend allowance, K-factor bend deduction, neutral axis sheet metal, sheet metal flat pattern, press brake K-factor',
      canonicalPath: routePath,
    })
    setStructuredData({ id: 'k-factor-guide-jsonld', data: createStructuredData() })
  }, [])

  return (
    <>
      <style>{`
        .zyco-kfactor { min-height:100vh; padding:42px 22px; box-sizing:border-box; color:#fff; font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif; background:radial-gradient(circle at 16% 10%,rgba(96,165,250,.3),transparent 30%),radial-gradient(circle at 84% 12%,rgba(14,165,233,.2),transparent 27%),linear-gradient(145deg,#071224 0%,#0b1f3f 47%,#12366e 100%); }
        .zyco-kfactor__shell { width:min(1160px,100%); margin:0 auto; }
        .zyco-kfactor__hero,.zyco-kfactor__panel { position:relative; margin-bottom:18px; padding:28px; border:1px solid rgba(147,197,253,.19); border-radius:26px; background:linear-gradient(145deg,rgba(255,255,255,.12),rgba(255,255,255,.045)); box-shadow:0 20px 58px rgba(0,0,0,.24); backdrop-filter:blur(16px); }
        .zyco-kfactor__hero { padding:32px; }
        .zyco-kfactor__back,.zyco-kfactor__tool { display:inline-flex; align-items:center; justify-content:center; box-sizing:border-box; text-decoration:none; font-size:15px; font-weight:800; transition:transform .24s ease,box-shadow .24s ease,border-color .24s ease,color .24s ease; }
        .zyco-kfactor__back { width:fit-content; max-width:min(100%,480px); min-height:44px; margin:0 0 22px; padding:0 16px; border:1px solid rgba(147,197,253,.46); border-radius:999px; background:linear-gradient(145deg,rgba(15,23,42,.34),rgba(37,99,235,.12)); color:#bfdbfe; }
        .zyco-kfactor__tool { min-height:46px; padding:0 18px; border:1px solid rgba(96,165,250,.18); border-radius:16px; color:#fff; background:linear-gradient(135deg,#1e3a8a 0%,#2563eb 48%,#60a5fa 100%); box-shadow:0 12px 30px rgba(37,99,235,.34); }
        .zyco-kfactor__back:hover,.zyco-kfactor__tool:hover { transform:translateY(-2px); border-color:rgba(191,219,254,.72); color:#fff; }
        .zyco-kfactor__tool:hover { box-shadow:0 18px 38px rgba(37,99,235,.42); }
        .zyco-kfactor__eyebrow { margin:0 0 12px; color:#93c5fd; font-size:12px; font-weight:850; letter-spacing:2.2px; text-transform:uppercase; }
        .zyco-kfactor__title { margin:0; color:#fff; font-size:clamp(34px,5vw,48px); line-height:1.08; font-weight:900; }
        .zyco-kfactor__subtitle { max-width:820px; margin:15px 0 0; color:#dbeafe; font-size:17px; line-height:1.72; font-weight:600; }
        .zyco-kfactor__section-title { margin:0 0 13px; color:#fff; font-size:23px; line-height:1.28; font-weight:850; }
        .zyco-kfactor__copy { margin:0; color:#dbeafe; font-size:15px; line-height:1.78; font-weight:570; }
        .zyco-kfactor__copy + .zyco-kfactor__copy { margin-top:12px; }
        .zyco-kfactor__formula { margin:15px 0; padding:18px 20px; border:1px solid rgba(125,211,252,.22); border-radius:17px; color:#eff6ff; background:rgba(30,64,112,.44); font-size:clamp(18px,2.2vw,22px); font-weight:850; letter-spacing:.02em; }
        .zyco-kfactor__formula small { display:block; margin-top:10px; color:#bfdbfe; font-size:13px; font-weight:650; letter-spacing:0; }
        .zyco-kfactor__grid,.zyco-kfactor__cards { display:grid; gap:18px; grid-template-columns:repeat(2,minmax(0,1fr)); }
        .zyco-kfactor__cards--three { grid-template-columns:repeat(3,minmax(0,1fr)); }
        .zyco-kfactor__card { padding:18px; border:1px solid rgba(191,219,254,.12); border-radius:18px; background:rgba(30,64,112,.3); }
        .zyco-kfactor__card h3 { margin:0 0 9px; color:#eff6ff; font-size:17px; }
        .zyco-kfactor__card p { margin:0; color:#dbeafe; font-size:14px; line-height:1.68; }
        .zyco-kfactor__definitions,.zyco-kfactor__list,.zyco-kfactor__faq { display:grid; gap:11px; margin:14px 0 0; padding:0; list-style:none; }
        .zyco-kfactor__definitions { grid-template-columns:repeat(2,minmax(0,1fr)); }
        .zyco-kfactor__definitions li,.zyco-kfactor__list li,.zyco-kfactor__faq article { padding:14px 17px; border:1px solid rgba(191,219,254,.12); border-radius:16px; background:rgba(30,64,112,.29); color:#dbeafe; font-size:14px; line-height:1.65; }
        .zyco-kfactor__steps { counter-reset:kstep; }
        .zyco-kfactor__steps li::before { counter-increment:kstep; content:counter(kstep) ". "; color:#7dd3fc; font-weight:850; }
        .zyco-kfactor__table-wrap { margin-top:15px; overflow-x:auto; border:1px solid rgba(191,219,254,.14); border-radius:18px; }
        .zyco-kfactor__table { width:100%; min-width:710px; border-collapse:collapse; }
        .zyco-kfactor__table th,.zyco-kfactor__table td { padding:13px 15px; text-align:left; border-bottom:1px solid rgba(191,219,254,.1); }
        .zyco-kfactor__table th { color:#bae6fd; background:rgba(30,64,112,.42); font-size:13px; }
        .zyco-kfactor__table td { color:#e2e8f0; font-size:14px; line-height:1.55; }
        .zyco-kfactor__reference { margin:15px 0 0; color:#93c5fd; font-size:14px; line-height:1.68; font-weight:650; }
        .zyco-kfactor__faq h3 { margin:0 0 7px; color:#eff6ff; font-size:16px; }
        .zyco-kfactor__faq p { margin:0; color:#dbeafe; font-size:14px; line-height:1.65; }
        .zyco-kfactor__tools { display:flex; flex-wrap:wrap; gap:12px; }
        @media (max-width:880px) { .zyco-kfactor__grid,.zyco-kfactor__cards,.zyco-kfactor__cards--three { grid-template-columns:1fr; } }
        @media (max-width:760px) { .zyco-kfactor { padding:22px 14px; } .zyco-kfactor__hero,.zyco-kfactor__panel { padding:22px; border-radius:22px; } .zyco-kfactor__subtitle { font-size:16px; } .zyco-kfactor__definitions { grid-template-columns:1fr; } }
        @media (max-width:640px) { .zyco-kfactor__back,.zyco-kfactor__tool { width:100%; } }
      `}</style>
      <main className='zyco-kfactor'>
        <div className='zyco-kfactor__shell'>
          <header className='zyco-kfactor__hero'>
            <a className='zyco-kfactor__back' href='/engineering' aria-label={page.back}>{page.back}</a>
            <LanguageSwitcher className='zyco-page-language-switcher' language={language} setLanguage={setLanguage} />
            <p className='zyco-kfactor__eyebrow'>{page.eyebrow}</p>
            <h1 className='zyco-kfactor__title'>{page.title}</h1>
            <p className='zyco-kfactor__subtitle'>{page.subtitle}</p>
          </header>

          <section className='zyco-kfactor__panel' aria-labelledby='kfactor-what'>
            <h2 className='zyco-kfactor__section-title' id='kfactor-what'>{page.what.title}</h2>
            <p className='zyco-kfactor__copy'>{page.what.text}</p>
            <div className='zyco-kfactor__formula'>{page.what.formula}<small>{page.what.where}</small></div>
            <p className='zyco-kfactor__copy'>{page.what.note}</p>
          </section>

          <KFactorNeutralAxisDiagram labels={page.diagram} />

          <section className='zyco-kfactor__panel' aria-labelledby='kfactor-neutral'>
            <h2 className='zyco-kfactor__section-title' id='kfactor-neutral'>{page.neutral.title}</h2>
            <p className='zyco-kfactor__copy'>{page.neutral.text}</p>
          </section>

          <div className='zyco-kfactor__grid'>
            <section className='zyco-kfactor__panel' aria-labelledby='kfactor-ba'>
              <h2 className='zyco-kfactor__section-title' id='kfactor-ba'>{page.allowance.title}</h2>
              <div className='zyco-kfactor__formula'>{page.allowance.formula}</div>
              <ul className='zyco-kfactor__definitions'>{page.allowance.definitions.map((item) => <li key={item}>{item}</li>)}</ul>
              <p className='zyco-kfactor__copy' style={{ marginTop: '14px' }}>{page.allowance.text}</p>
            </section>
            <section className='zyco-kfactor__panel' aria-labelledby='kfactor-bd'>
              <h2 className='zyco-kfactor__section-title' id='kfactor-bd'>{page.deduction.title}</h2>
              <div className='zyco-kfactor__formula'>{page.deduction.formula}</div>
              <p className='zyco-kfactor__copy'>{page.deduction.text}</p>
            </section>
          </div>

          <section className='zyco-kfactor__panel' aria-labelledby='kfactor-range'>
            <h2 className='zyco-kfactor__section-title' id='kfactor-range'>{page.range.title}</h2>
            <div className='zyco-kfactor__table-wrap'>
              <table className='zyco-kfactor__table'>
                <thead><tr>{page.range.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
                <tbody>{page.range.rows.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
            <p className='zyco-kfactor__reference'>{page.range.note}</p>
          </section>

          <section className='zyco-kfactor__panel' aria-labelledby='kfactor-material'>
            <h2 className='zyco-kfactor__section-title' id='kfactor-material'>{page.materials.title}</h2>
            <div className='zyco-kfactor__cards zyco-kfactor__cards--three'>{page.materials.cards.map(([title, text]) => <InfoCard key={title} title={title} text={text} />)}</div>
          </section>

          <div className='zyco-kfactor__grid'>
            <section className='zyco-kfactor__panel' aria-labelledby='kfactor-tooling'>
              <h2 className='zyco-kfactor__section-title' id='kfactor-tooling'>{page.tooling.title}</h2>
              <p className='zyco-kfactor__copy'>{page.tooling.text}</p>
            </section>
            <section className='zyco-kfactor__panel' aria-labelledby='kfactor-methods'>
              <h2 className='zyco-kfactor__section-title' id='kfactor-methods'>{page.methods.title}</h2>
              <div className='zyco-kfactor__cards'>{page.methods.cards.map(([title, text]) => <InfoCard key={title} title={title} text={text} />)}</div>
            </section>
          </div>

          <div className='zyco-kfactor__grid'>
            <section className='zyco-kfactor__panel' aria-labelledby='kfactor-calibration'>
              <h2 className='zyco-kfactor__section-title' id='kfactor-calibration'>{page.calibration.title}</h2>
              <p className='zyco-kfactor__copy'>{page.calibration.intro}</p>
              <ol className='zyco-kfactor__list zyco-kfactor__steps'>{page.calibration.steps.map((step) => <li key={step}>{step}</li>)}</ol>
            </section>
            <section className='zyco-kfactor__panel' aria-labelledby='kfactor-mistakes'>
              <h2 className='zyco-kfactor__section-title' id='kfactor-mistakes'>{page.mistakes.title}</h2>
              <ul className='zyco-kfactor__list'>{page.mistakes.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
          </div>

          <section className='zyco-kfactor__panel' aria-labelledby='kfactor-notes'>
            <h2 className='zyco-kfactor__section-title' id='kfactor-notes'>{page.notes.title}</h2>
            <ul className='zyco-kfactor__list'>{page.notes.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          <section className='zyco-kfactor__panel' aria-labelledby='kfactor-faq'>
            <h2 className='zyco-kfactor__section-title' id='kfactor-faq'>{page.faqTitle}</h2>
            <div className='zyco-kfactor__faq'>{page.faq.map(([question, answer]) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}</div>
          </section>

          <section className='zyco-kfactor__panel' aria-labelledby='kfactor-related'>
            <h2 className='zyco-kfactor__section-title' id='kfactor-related'>{page.relatedTitle}</h2>
            <nav className='zyco-kfactor__tools' aria-label={page.relatedAria}>
              {relatedTools.map(([key, href]) => <a className='zyco-kfactor__tool' href={href} key={key}>{sharedText.relatedTools[key]}</a>)}
            </nav>
          </section>
        </div>
      </main>
    </>
  )
}
