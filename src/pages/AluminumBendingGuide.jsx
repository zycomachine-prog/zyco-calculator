import { useEffect } from 'react'
import AluminumBendingDiagram from '../components/AluminumBendingDiagram.jsx'
import LanguageSwitcher from '../components/LanguageSwitcher.jsx'
import { getEngineeringText } from '../languages/engineeringText.js'
import {
  getSiteUrl,
  setPageSEO,
  setStructuredData,
} from '../utils/seo.js'

const routePath = '/engineering-tools/aluminum-bending-guide'

const relatedTools = [
  ['pressBrakeCalculator', '/engineering-tools/press-brake-calculator'],
  ['bendAllowanceCalculator', '/engineering-tools/bend-allowance-calculator'],
  ['kFactorGuide', '/engineering-tools/k-factor-guide'],
  ['bendDeductionGuide', '/engineering-tools/bend-deduction-guide'],
  ['materialDatabase', '/engineering-tools/material-database'],
  ['springbackDatabase', '/engineering-tools/springback-database'],
  ['springbackCompensationGuide', '/engineering-tools/springback-compensation-guide'],
  ['vDieSelectionTool', '/engineering-tools/v-die-selection-tool'],
  ['insideRadiusGuide', '/engineering-tools/inside-radius-guide'],
  ['airBendingGuide', '/engineering-tools/air-bending-guide'],
  ['bottomingVsCoiningGuide', '/engineering-tools/bottoming-vs-coining-guide'],
  ['bendSequenceGuide', '/engineering-tools/bend-sequence-guide'],
  ['pressBrakeTonnageGuide', '/engineering-tools/press-brake-tonnage-guide'],
  ['vDieOpeningGuide', '/engineering-tools/how-to-choose-press-brake-v-die-opening'],
  ['minimumFlangeLengthGuide', '/engineering-tools/minimum-flange-length-guide'],
  ['toolingSelectionGuide', '/engineering-tools/press-brake-tooling-selection-guide'],
  ['crowningGuide', '/engineering-tools/press-brake-crowning-guide'],
  ['stainlessSteelBendingGuide', '/engineering-tools/stainless-steel-bending-guide'],
  ['aluminumBendingGuide', routePath],
]

const content = {
  en: {
    back: '← Back to Engineering Tools',
    eyebrow: 'Engineering Guide',
    title: 'Aluminum Bending Guide',
    subtitle: 'Professional engineering reference for aluminum sheet bending, springback behavior, surface protection and tooling selection.',
    seoDescription: 'Engineering guide to aluminum press brake bending: 5052 and 6061 aluminum bending, springback, V die opening, bend radius, cracking and reducing aluminum die marks.',
    keywords: 'aluminum bending, aluminum press brake bending, aluminum springback, aluminum V die opening, aluminum bend radius, reduce aluminum die marks, aluminum bending cracking, 6061 aluminum bending, 5052 aluminum bending',
    why: {
      title: 'Why Aluminum Is Different in Bending',
      text: 'Aluminum bending differs greatly from stainless steel. Most common sheet alloys are softer and have lower yield strength, so required tonnage is usually lower; however, the sheet deforms and scratches more easily. Aluminum can flow around tooling with a larger natural inside radius tendency, while hard tempers may still crack at an aggressive radius. Springback remains meaningful because modulus and temper matter. A short flange can lose support or distort, and a visible panel can fail on appearance long before its angle fails inspection.',
    },
    grades: {
      title: 'Common Aluminum Grades for Bending',
      intro: 'Alloy and temper must be identified on the job record. The tendencies below are production references, not substitutes for certificate data and trial bends.',
      headers: ['Grade', 'Typical forming behavior', 'Setup attention'],
      rows: [
        ['5052 aluminum', 'Generally offers the best forming behavior of these common choices, especially in appropriate sheet tempers.', 'A strong starting choice for formed enclosures and visible panels; still verify radius and finish protection.'],
        ['6061 aluminum', 'Higher-strength tempers, especially T6, carry a materially higher cracking risk in tight bends.', 'Use a more generous inside radius and check bend direction, temper and outer-fiber cracking before release.'],
        ['3003 aluminum', 'Typically soft and easy to form with low bending resistance.', 'Well suited to gentle formed work, but soft surfaces are easily marked or distorted by dirty tooling.'],
      ],
    },
    sections: [
      ['tonnage', 'Tonnage Requirement for Aluminum', 'Aluminum normally requires lower press brake force than stainless steel at comparable thickness and length because its forming strength is lower. That does not make tonnage irrelevant: thickness still drives force growth strongly, and selecting a small V opening sharply increases load, contact pressure and marking. Confirm both machine reserve and die rating even where the estimated force appears modest.'],
      ['springback', 'Springback Behavior of Aluminum', 'Springback exists even in soft aluminum. Alloy and temper change elastic recovery significantly: 6061-T6 will not respond like softer 3003 or a formable 5052 temper. CNC angle correction, documented overbend and trial bends remain important when angle tolerance or batch repeatability matters.'],
      ['v-die', 'V-Die Selection for Aluminum', 'A V opening that is too small concentrates pressure at the shoulders and can leave obvious lines in the sheet or protective finish. A larger compatible opening may reduce marking, but it also increases the naturally formed inside radius and flange-support requirement. Selection must balance appearance, drawing radius, flange geometry, dimensional accuracy and permitted tonnage.'],
      ['surface', 'Surface Protection and Mark Prevention', 'Aluminum scratches easily, and anodized or brushed aluminum makes even light dragging and shoulder imprints visible. Keep the die and sheet clean; validate protective film, urethane film or another barrier where cosmetic surfaces cross the shoulders. No-mark tooling, polished dies and a suitable die shoulder radius can reduce contact damage, but every barrier or softer contact condition should be confirmed for angle repeatability.'],
      ['radius', 'Inside Radius and Cracking', 'An unnecessarily sharp inside radius raises outer-fiber strain and cracking risk, with 6061-T6 particularly sensitive. A larger radius commonly improves forming stability and lowers crack tendency. Rolling direction matters: bending parallel to unfavorable grain flow can reduce margin, so grain direction and bend-line orientation should be reviewed for tight-radius or critical parts.'],
      ['tooling', 'Tooling Selection for Aluminum', 'Use polished tooling with a smooth die shoulder for finished aluminum. Anti-mark dies or urethane protection can be appropriate for cosmetic panels, while the punch radius should support the specified inside radius without concentrating pressure. Soft material flow makes local dirt, damaged shoulders and overly sharp contact zones especially visible in production.'],
    ],
    problems: {
      title: 'Common Aluminum Bending Problems',
      cards: [
        ['Surface scratches', 'Debris, handling or sliding contact damages anodized, brushed or exposed faces.'],
        ['Die marks', 'High shoulder pressure or rough contact lines imprint cosmetic aluminum.'],
        ['Cracking', 'A tight radius, hard temper or unfavorable grain direction overloads the outside surface.'],
        ['Flange distortion', 'Soft material or insufficient support causes a flange to wave, roll or lose location.'],
        ['Excessive radius growth', 'An opening selected for low marks may produce a radius above drawing intent.'],
        ['Angle inconsistency', 'Temper, sheet thickness, protection and tooling cleanliness shift springback and seating.'],
        ['Material stretching', 'Local pressure or unsupported geometry pulls a dimension beyond tolerance.'],
        ['Cosmetic defects', 'Marks acceptable on structural work may reject visible finished aluminum panels.'],
      ],
    },
    notes: {
      title: 'Engineering Notes',
      items: [
        'Differences between aluminum alloys and tempers are substantial; do not release one setting as universal aluminum practice.',
        'For decorative aluminum, surface acceptance is often harder to control than the final angle.',
        'In batch production, control tooling cleanliness and inspect film condition at defined intervals.',
        '6061, especially harder tempers, is not a sensible candidate for an extremely small inside radius without validation.',
        'Anodized parts require the protection plan, bend direction and acceptable mark standard to be agreed before forming.',
      ],
    },
    faqTitle: 'Frequently Asked Questions',
    faq: [
      ['Is aluminum easier to bend than stainless steel?', 'It commonly needs less force because it is softer, but surface protection, deformation and alloy-dependent cracking can make production control equally demanding.'],
      ['Which aluminum grade bends best?', '5052 is commonly selected for strong formability, while 3003 is also very formable; temper, radius and finished-surface requirements still govern the job.'],
      ['Why does 6061 aluminum crack during bending?', 'Higher-strength tempers such as 6061-T6 tolerate less severe forming, especially with a tight radius or unfavorable grain orientation.'],
      ['How can I reduce marks on aluminum?', 'Use clean polished contact faces, verified film or urethane protection, low-mark tooling and a V opening that does not concentrate unnecessary pressure.'],
      ['What V die opening should be used for aluminum?', 'Start from a thickness-based air-bending reference, then verify inside radius, flange support, surface finish, alloy temper and tonnage with trial parts.'],
      ['Does aluminum spring back?', 'Yes. Springback changes with alloy, temper, radius and tooling, so angle correction and trial bending remain necessary.'],
      ['Why does aluminum bend radius become larger?', 'In air bending the V opening strongly influences the natural inside radius; a wider opening or softer material flow can produce a larger radius.'],
    ],
    relatedTitle: 'Related Engineering Tools',
    relatedAria: 'Related engineering tools',
    relatedLabels: {
      pressBrakeCalculator: 'Press Brake Calculator', materialDatabase: 'Material Database', vDieSelectionTool: 'V Die Selection Tool', insideRadiusGuide: 'Inside Radius Guide', springbackDatabase: 'Springback Database', bendAllowanceCalculator: 'Bend Allowance Calculator', bendDeductionGuide: 'Bend Deduction Guide', airBendingGuide: 'Air Bending Guide', pressBrakeTonnageGuide: 'Press Brake Tonnage Guide', vDieOpeningGuide: 'How to Choose Press Brake V-Die Opening', minimumFlangeLengthGuide: 'Minimum Flange Length Guide', toolingSelectionGuide: 'Press Brake Tooling Selection Guide', crowningGuide: 'Press Brake Crowning Guide', stainlessSteelBendingGuide: 'Stainless Steel Bending Guide', aluminumBendingGuide: 'Aluminum Bending Guide',
    },
    diagram: { eyebrow: 'Bending Characteristics Diagram', title: 'Aluminum bending characteristics', svgTitle: 'Aluminum press brake bending characteristics diagram', svgDescription: 'Polished punch and V die bending protected aluminum sheet with callouts for springback, marking and radius.', punch: 'Polished punch', film: 'Protective film', sheet: 'Aluminum sheet', vDie: 'V die', springback: 'Springback angle', markZone: 'Surface mark zone', insideRadius: 'Larger inside radius', caption: 'For visible aluminum, radius, protection and shoulder contact must be approved together with the angle.' },
  },
  zh: {
    back: '← 返回工程工具中心',
    eyebrow: '工程指南',
    title: '铝板折弯指南',
    subtitle: '面向铝板折弯、回弹行为、表面保护与模具选择的专业工程参考。',
    why: { title: '为什么铝板折弯不同', text: '铝板折弯与不锈钢折弯有明显差异。常用铝板更软、屈服强度更低，因此通常所需吨位较低，但也更容易变形和划伤。铝材在模具间流动时往往形成偏大的自然内半径，而较硬状态在过小内半径折弯时仍可能出现开裂。回弹不能忽略，因为合金与状态都会影响卸载后的角度；短法兰还可能失稳或变形，外观件也常常在角度合格前先因表面缺陷报废。' },
    grades: { title: '常用折弯铝合金牌号', intro: '工艺记录必须明确合金与状态。下表属于生产参考，最终仍应以材质证明和试折结果为依据。', headers: ['牌号', '典型成形表现', '设定重点'], rows: [['5052 铝板', '在这些常用选项中通常具有较好的成形表现，适当状态下尤其适合折弯。', '适合成形外壳与可视面板的起始选择，但仍需确认内 R 和表面保护。'], ['6061 铝板', '较高强度状态，尤其 T6，在小半径折弯中开裂风险明显更高。', '应采用更宽松的内半径，并在放行前核对状态、折弯方向和外表面裂纹。'], ['3003 铝板', '通常较软、容易成形且折弯阻力较低。', '适合温和成形件，但柔软表面也容易因脏污模具而压伤或变形。']] },
    sections: [
      ['tonnage', '铝板所需折弯吨位', '在板厚和折弯长度相近时，铝板因成形强度较低，通常比不锈钢需要更低的折弯力。但吨位并非无需关注：板厚仍会显著推高载荷，过小的 V 开口会快速增加吨位、接触压力和压痕风险。即使估算载荷较低，也仍应确认设备吨位余量以及下模承载能力。'],
      ['springback', '铝板回弹行为', '即使是较软的铝板也存在回弹。合金和状态会明显改变弹性恢复，6061-T6 的角度响应不能按较软的 3003 或可成形 5052 状态处理。角度公差或批量一致性要求较高时，仍需使用 CNC 角度修正、记录过折量并进行试折。'],
      ['v-die', '铝板 V 型下模选择', 'V 开口过小会在肩部集中压力，在板面或保护层上留下明显线痕。较大的兼容开口有助于减轻压痕，但也会增大自然内半径和法兰支撑长度要求。选型必须平衡外观、图纸内 R、法兰几何、尺寸精度与可用吨位。'],
      ['surface', '表面保护与压痕预防', '铝板容易划伤，阳极氧化或拉丝铝板会清楚显示轻微拖伤和肩部压痕。应保持模具与板材清洁，并在外观面跨越下模肩部时验证保护膜、聚氨酯膜或其它隔离层。无痕模具、抛光下模和合适的肩部圆角可减少接触损伤，但加入保护介质后仍须复核角度重复性。'],
      ['radius', '内半径与开裂', '过小的内半径会明显提高材料外侧拉伸应变与开裂风险，其中 6061-T6 尤为敏感。增大半径通常可以提高成形稳定性并降低裂纹倾向。轧制方向同样重要：对于小半径或关键件，应评估纹理方向与折弯线方向，避免在不利方向上压缩工艺余量。'],
      ['tooling', '铝板模具选择', '成品铝板宜采用抛光模具和平滑下模肩部。外观面板可考虑防压痕下模或聚氨酯保护，冲头圆角则应支撑规定内半径而不造成压力集中。材料较软意味着局部污物、肩部损伤和过尖接触区会在批量生产中更明显地显现。'],
    ],
    problems: { title: '常见铝板折弯问题', cards: [['表面划伤', '灰尘、搬运或滑动接触损坏阳极氧化、拉丝或裸露表面。'], ['下模压痕', '肩部压力过高或接触面粗糙会在外观铝板上形成线痕。'], ['开裂', '过小半径、硬状态或不利纹理方向会使外表面承受过高应变。'], ['法兰变形', '软质材料或支撑不足会导致法兰起浪、翻卷或定位不稳。'], ['半径过大', '为降低压痕而采用的开口可能形成超出图纸意图的内 R。'], ['角度不一致', '状态、板厚、保护介质和模具清洁程度会改变回弹与就位。'], ['材料拉伸', '局部压力或缺乏支撑的几何形状会把尺寸拉出公差。'], ['外观缺陷', '结构件可接受的痕迹，可能导致可视铝面板不合格。']] },
    notes: { title: '工程说明', items: ['不同铝合金及状态之间差异很大，不应将单一设定作为通用铝板工艺。', '对于装饰性铝板，表面质量通常比最终角度更难稳定控制。', '批量生产必须控制模具清洁度，并按规定间隔检查保护膜状态。', '6061，尤其较硬状态，不适合在未经验证时采用极小内 R。', '阳极氧化件必须在折弯前确定保护方案、折弯方向和允许压痕标准。'] },
    faqTitle: '常见问题',
    faq: [['铝板是否比不锈钢更容易折弯？', '通常因材料更软而所需力更低，但表面保护、变形和牌号相关的开裂控制同样具有工程难度。'], ['哪种铝合金最适合折弯？', '5052 常因良好成形性而被选用，3003 也较易成形；最终仍取决于状态、半径和表面要求。'], ['6061 铝板折弯时为什么会开裂？', '6061-T6 等较高强度状态对激进成形承受能力较低，小半径或不利纹理方向会进一步增加开裂风险。'], ['如何减少铝板压痕？', '使用清洁抛光接触面、经过验证的保护膜或聚氨酯层、低痕模具以及避免过度集中压力的 V 开口。'], ['铝板应使用多大的 V 型模开口？', '从板厚对应的空气折弯参考值起步，再通过试件核对内半径、法兰支撑、表面、状态和吨位。'], ['铝板会发生回弹吗？', '会。回弹随合金、状态、半径和模具而变化，因此仍需要角度修正和试折。'], ['为什么铝板折弯后的内半径偏大？', '在空气折弯中，V 开口会显著影响自然内半径；较宽开口或较软材料流动都可能形成更大的半径。']],
    relatedTitle: '相关工程工具', relatedAria: '相关工程工具',
    relatedLabels: { pressBrakeCalculator: '折弯机计算器', materialDatabase: '材料数据库', vDieSelectionTool: 'V 型模具选择工具', insideRadiusGuide: '内半径指南', springbackDatabase: '回弹数据库', bendAllowanceCalculator: '折弯展开计算器', bendDeductionGuide: '折弯扣除量指南', airBendingGuide: '空气折弯指南', pressBrakeTonnageGuide: '折弯机吨位指南', vDieOpeningGuide: '如何选择折弯机 V 型模开口', minimumFlangeLengthGuide: '最小翻边长度指南', toolingSelectionGuide: '折弯机模具选型指南', crowningGuide: '折弯机挠度补偿指南', stainlessSteelBendingGuide: '不锈钢折弯指南', aluminumBendingGuide: '铝板折弯指南' },
    diagram: { eyebrow: '折弯特性图', title: '铝板折弯特性', svgTitle: '铝板折弯机加工特性图', svgDescription: '抛光冲头和 V 型下模折弯带保护层铝板，并标示回弹、压痕和内半径。', punch: '抛光冲头', film: '保护膜', sheet: '铝板', vDie: 'V 型下模', springback: '回弹角', markZone: '表面压痕区', insideRadius: '偏大内半径', caption: '可视铝板的半径、保护方式与肩部接触状态必须随角度结果一并批准。' },
  },
  ru: {
    back: '← Назад к инженерным инструментам', eyebrow: 'Инженерное руководство', title: 'Руководство по гибке алюминия', subtitle: 'Профессиональный инженерный справочник по гибке алюминиевого листа, пружинению, защите поверхности и выбору оснастки.',
    why: { title: 'Почему алюминий ведет себя иначе при гибке', text: 'Гибка алюминия существенно отличается от гибки нержавеющей стали. Распространенные алюминиевые листы мягче и имеют меньший предел текучести, поэтому обычно требуют меньшего усилия, но легче деформируются и царапаются. При воздушной гибке часто формируется больший естественный внутренний радиус, а твердые состояния сплава могут растрескиваться при слишком малом радиусе. Пружинение сохраняется, поскольку зависят модуль и состояние материала; короткая полка может потерять устойчивость, а видимая деталь часто бракуется по поверхности раньше, чем по углу.' },
    grades: { title: 'Распространенные алюминиевые сплавы для гибки', intro: 'Сплав и состояние должны быть указаны в маршрутной карте. Эти тенденции являются производственной отправной точкой и требуют проверки сертификатом и пробной гибкой.', headers: ['Сплав', 'Типичное формование', 'Контроль настройки'], rows: [['Алюминий 5052', 'Обычно показывает наилучшую формуемость среди этих распространенных вариантов в подходящем состоянии.', 'Практичный выбор для формованных корпусов и видимых панелей; проверяйте радиус и защиту.'], ['Алюминий 6061', 'Более прочные состояния, особенно T6, имеют значительно больший риск трещин при тесной гибке.', 'Назначайте больший внутренний радиус и проверяйте состояние, направление и наружную поверхность.'], ['Алюминий 3003', 'Как правило, мягкий и легко формуется при небольшом сопротивлении гибке.', 'Подходит для мягкого формования, но легко получает следы и деформации от грязной оснастки.']] },
    sections: [['tonnage', 'Усилие гибки алюминия', 'При сопоставимой толщине и длине алюминий обычно требует меньшего усилия, чем нержавеющая сталь, из-за меньшей прочности формования. Однако толщина по-прежнему резко увеличивает нагрузку, а малое раскрытие V быстро повышает усилие, давление контакта и риск следов. Проверяйте запас станка и допустимую нагрузку матрицы.'], ['springback', 'Пружинение алюминия', 'Пружинение существует даже у мягкого алюминия. Сплав и состояние существенно меняют возврат угла: 6061-T6 не следует настраивать как мягкий 3003 или формуемый 5052. Для точных углов и серийной повторяемости необходимы пробные гибы, коррекция CNC и записанный перегиб.'], ['v-die', 'Выбор V-матрицы для алюминия', 'Слишком малое раскрытие концентрирует давление на плечах и оставляет заметные линии на листе или покрытии. Более широкое допустимое раскрытие может снизить следы, но увеличивает естественный внутренний радиус и требование к опоре полки. Балансируйте внешний вид, радиус чертежа, геометрию полки, точность и усилие.'], ['surface', 'Защита поверхности и предотвращение следов', 'Алюминий легко царапается, а анодированная или шлифованная поверхность показывает даже слабое протягивание и отпечатки плеч. Содержите лист и матрицу чистыми; для видимых поверхностей проверяйте защитную пленку, полиуретановую пленку или другой барьер. Оснастка без следов, полированные матрицы и подходящий радиус плеч уменьшают повреждение, но требуют проверки повторяемости угла.'], ['radius', 'Внутренний радиус и трещины', 'Чрезмерно малый внутренний радиус повышает деформацию наружных волокон и риск трещин, особенно у 6061-T6. Больший радиус обычно улучшает стабильность. Для критичных деталей оцените направление прокатки и ориентацию линии гиба, поскольку неблагоприятное направление уменьшает технологический запас.'], ['tooling', 'Оснастка для алюминия', 'Для готовой алюминиевой поверхности применяйте полированную оснастку с гладким плечом матрицы. Для декоративных панелей уместны матрицы с пониженным следом или полиуретановая защита; радиус пуансона должен поддерживать заданный внутренний радиус без концентрации давления.']],
    problems: { title: 'Типовые проблемы гибки алюминия', cards: [['Царапины поверхности', 'Загрязнение, перенос или скольжение портят анодированную, шлифованную либо открытую поверхность.'], ['Следы матрицы', 'Высокое давление или грубое плечо отпечатывают видимый алюминий.'], ['Трещины', 'Малый радиус, твердое состояние или неблагоприятное направление перегружают наружный слой.'], ['Деформация полки', 'Мягкий материал или слабая опора вызывают волну либо потерю положения.'], ['Избыточный рост радиуса', 'Раскрытие, выбранное ради уменьшения следов, может превысить радиус чертежа.'], ['Нестабильный угол', 'Состояние, толщина, пленка и чистота оснастки меняют пружинение.'], ['Растяжение материала', 'Локальное давление или неподдержанная геометрия выводят размер из допуска.'], ['Дефекты внешнего вида', 'Следы, допустимые на конструкции, бракуют видимую панель.']] },
    notes: { title: 'Инженерные замечания', items: ['Различия между сплавами и состояниями алюминия значительны; единой настройки для всего алюминия нет.', 'Для декоративного алюминия качество поверхности зачастую труднее стабилизировать, чем угол.', 'В серийном производстве контролируйте чистоту оснастки и состояние пленки по заданному интервалу.', '6061, особенно в твердом состоянии, не подходит для крайне малого внутреннего радиуса без проверки.', 'Для анодированных деталей план защиты, направление гиба и допустимые следы определяют до формования.'] },
    faqTitle: 'Часто задаваемые вопросы', faq: [['Алюминий легче гнуть, чем нержавеющую сталь?', 'Обычно он требует меньшего усилия, но защита поверхности, деформация и зависимый от сплава риск трещин требуют строгого контроля.'], ['Какой алюминиевый сплав лучше гнется?', '5052 часто выбирают за хорошую формуемость, а 3003 также легко формуется; состояние, радиус и поверхность остаются решающими.'], ['Почему алюминий 6061 трескается при гибке?', 'Высокопрочные состояния, например 6061-T6, хуже переносят малый радиус и неблагоприятную ориентацию зерна.'], ['Как уменьшить следы на алюминии?', 'Используйте чистые полированные поверхности, проверенную пленку или полиуретан, малоследную оснастку и подходящее раскрытие V.'], ['Какое раскрытие V использовать для алюминия?', 'Начинайте с справочного значения по толщине и проверяйте радиус, опору полки, поверхность, состояние и усилие пробными деталями.'], ['Пружинит ли алюминий?', 'Да. Пружинение зависит от сплава, состояния, радиуса и оснастки, поэтому нужны проба и коррекция угла.'], ['Почему радиус алюминиевого гиба становится больше?', 'При воздушной гибке естественный радиус сильно зависит от раскрытия V; широкое раскрытие или течение мягкого материала увеличивают радиус.']],
    relatedTitle: 'Связанные инженерные инструменты', relatedAria: 'Связанные инженерные инструменты',
    relatedLabels: { pressBrakeCalculator: 'Калькулятор листогиба', materialDatabase: 'База материалов', vDieSelectionTool: 'Выбор V-матрицы', insideRadiusGuide: 'Справочник внутреннего радиуса', springbackDatabase: 'База пружинения', bendAllowanceCalculator: 'Калькулятор припуска на гиб', bendDeductionGuide: 'Руководство по вычету гиба', airBendingGuide: 'Руководство по воздушной гибке', pressBrakeTonnageGuide: 'Руководство по тоннажу пресса', vDieOpeningGuide: 'Как выбрать раскрытие V-матрицы', minimumFlangeLengthGuide: 'Руководство по минимальной длине полки', toolingSelectionGuide: 'Руководство по выбору оснастки', crowningGuide: 'Руководство по компенсации прогиба', stainlessSteelBendingGuide: 'Руководство по гибке нержавеющей стали', aluminumBendingGuide: 'Руководство по гибке алюминия' },
    diagram: { eyebrow: 'Схема характеристик гибки', title: 'Характеристики гибки алюминия', svgTitle: 'Схема гибки алюминия на листогибе', svgDescription: 'Полированный пуансон и V-матрица формуют защищенный алюминиевый лист с обозначением пружинения, следов и радиуса.', punch: 'Полированный пуансон', film: 'Защитная пленка', sheet: 'Алюминиевый лист', vDie: 'V-матрица', springback: 'Угол пружинения', markZone: 'Зона следа', insideRadius: 'Больший внутренний радиус', caption: 'Для видимого алюминия радиус, защиту и контакт плеч утверждают вместе с углом.' },
  },
  es: {
    back: '← Volver al centro de herramientas de ingeniería', eyebrow: 'Guía de ingeniería', title: 'Guía de plegado de aluminio', subtitle: 'Referencia profesional de ingeniería para plegado de chapa de aluminio, retorno elástico, protección superficial y selección de utillaje.',
    why: { title: 'Por qué el aluminio es diferente al plegarlo', text: 'El plegado de aluminio difiere mucho del acero inoxidable. Las chapas de aluminio habituales son más blandas y de menor límite elástico, por lo que normalmente exigen menos tonelaje, pero se deforman y rayan con mayor facilidad. El material tiende a formar un radio interior natural mayor, mientras que los temples duros pueden agrietarse con radios agresivos. El retorno elástico sigue existiendo porque dependen la aleación y el temple; una pestaña corta puede volverse inestable y una pieza visible puede rechazarse por acabado antes que por ángulo.' },
    grades: { title: 'Calidades comunes de aluminio para plegado', intro: 'La aleación y el temple deben figurar en la hoja de proceso. Estas tendencias son referencias de taller que deben confirmarse mediante certificado y pruebas.', headers: ['Calidad', 'Comportamiento típico', 'Atención en la preparación'], rows: [['Aluminio 5052', 'Generalmente ofrece el mejor comportamiento de conformado entre estas opciones comunes en un temple adecuado.', 'Buen punto de partida para envolventes y paneles visibles; compruebe radio y protección.'], ['Aluminio 6061', 'Los temples más resistentes, especialmente T6, presentan mayor riesgo de grieta en pliegues cerrados.', 'Aplique un radio interior más generoso y verifique temple, dirección y cara exterior.'], ['Aluminio 3003', 'Habitualmente es blando y de fácil conformado con baja resistencia al plegado.', 'Adecuado para formado suave, aunque su superficie marca y deforma con facilidad.']] },
    sections: [['tonnage', 'Tonelaje requerido para aluminio', 'A espesor y longitud comparables, el aluminio suele requerir menos fuerza que el inoxidable por su menor resistencia de conformado. Aun así, el espesor aumenta fuertemente la carga y una abertura V pequeña incrementa rápidamente tonelaje, presión de contacto y marcado. Verifique reserva de máquina y capacidad de matriz.'], ['springback', 'Retorno elástico del aluminio', 'Incluso el aluminio blando presenta retorno elástico. Aleación y temple modifican mucho la recuperación: el 6061-T6 no se comporta como un 3003 blando o un 5052 conformable. La corrección CNC, el sobreplegado registrado y las pruebas siguen siendo necesarios para tolerancia y repetición.'], ['v-die', 'Selección de matriz V para aluminio', 'Una abertura demasiado pequeña concentra la presión en los hombros y puede dejar líneas visibles. Una abertura compatible mayor puede reducir marcas, pero aumenta el radio interior natural y el apoyo necesario de pestaña. Equilibre acabado, radio del plano, geometría, precisión y tonelaje.'], ['surface', 'Protección superficial y prevención de marcas', 'El aluminio se raya con facilidad y el anodizado o cepillado muestra arrastres y huellas ligeras. Mantenga limpia la matriz y la chapa; valide película protectora, película de uretano u otra barrera en caras visibles. Las matrices pulidas, herramientas sin marca y un radio de hombro apropiado reducen daños, pero deben comprobarse en la repetición angular.'], ['radius', 'Radio interior y agrietamiento', 'Un radio interior innecesariamente cerrado eleva la deformación exterior y el riesgo de grieta, especialmente en 6061-T6. Un radio mayor suele estabilizar el conformado. La dirección de laminación influye: en piezas críticas compruebe la orientación de la línea de pliegue respecto del grano.'], ['tooling', 'Selección de utillaje para aluminio', 'Utilice utillaje pulido y hombros suaves para aluminio acabado. En paneles cosméticos pueden ser apropiadas matrices antimarca o protección de uretano; el radio del punzón debe cumplir el radio especificado sin concentrar presión.']],
    problems: { title: 'Problemas comunes al plegar aluminio', cards: [['Rayas superficiales', 'Suciedad, manipulación o deslizamiento dañan caras anodizadas o cepilladas.'], ['Marcas de matriz', 'La presión alta o un hombro áspero imprime el aluminio visible.'], ['Grietas', 'Radio cerrado, temple duro o dirección desfavorable sobrecargan la cara exterior.'], ['Deformación de pestaña', 'Material blando o apoyo insuficiente producen ondulación o pérdida de posición.'], ['Radio excesivo', 'Una abertura elegida para reducir marcas puede superar el radio deseado.'], ['Ángulo inconsistente', 'Temple, espesor, protección y limpieza alteran el retorno.'], ['Estiramiento del material', 'Presión local o geometría sin apoyo sacan dimensiones de tolerancia.'], ['Defectos cosméticos', 'Una marca admisible en estructura puede rechazar un panel visible.']] },
    notes: { title: 'Notas de ingeniería', items: ['Las diferencias entre aleaciones y temples de aluminio son amplias; no trate una preparación como universal.', 'En aluminio decorativo, la calidad superficial suele ser más difícil de controlar que el ángulo.', 'En producción por lotes, controle limpieza del utillaje y estado de la película a intervalos definidos.', 'El 6061, en especial en temples duros, no es adecuado para radios interiores mínimos sin validación.', 'Las piezas anodizadas requieren planificar protección, dirección de plegado y criterio de marcas antes de formar.'] },
    faqTitle: 'Preguntas frecuentes', faq: [['¿El aluminio es más fácil de plegar que el inoxidable?', 'Suele requerir menos fuerza, pero la superficie, la deformación y las grietas según aleación exigen control riguroso.'], ['¿Qué calidad de aluminio se pliega mejor?', 'El 5052 suele seleccionarse por su buena formabilidad y el 3003 también conforma bien; mandan temple, radio y acabado.'], ['¿Por qué se agrieta el aluminio 6061 al plegarlo?', 'Los temples resistentes como 6061-T6 toleran peor un radio pequeño o una orientación desfavorable del grano.'], ['¿Cómo reduzco las marcas en aluminio?', 'Use contactos limpios y pulidos, película o uretano validado, utillaje de baja marca y una abertura V que no concentre presión.'], ['¿Qué abertura V debe utilizarse para aluminio?', 'Parta de una referencia por espesor y confirme radio, apoyo de pestaña, acabado, temple y tonelaje con pruebas.'], ['¿El aluminio presenta retorno elástico?', 'Sí; cambia con la aleación, temple, radio y utillaje, por lo que se requiere corrección y prueba.'], ['¿Por qué aumenta el radio de plegado del aluminio?', 'En plegado al aire la abertura V influye fuertemente en el radio natural; una abertura mayor o el flujo blando lo agrandan.']],
    relatedTitle: 'Herramientas de ingeniería relacionadas', relatedAria: 'Herramientas de ingeniería relacionadas',
    relatedLabels: { pressBrakeCalculator: 'Calculadora de plegadora', materialDatabase: 'Base de datos de materiales', vDieSelectionTool: 'Selección de matriz V', insideRadiusGuide: 'Guía de radio interior', springbackDatabase: 'Base de datos de retorno elástico', bendAllowanceCalculator: 'Calculadora de desarrollo de plegado', bendDeductionGuide: 'Guía de deducción de plegado', airBendingGuide: 'Guía de plegado al aire', pressBrakeTonnageGuide: 'Guía de tonelaje para plegadoras', vDieOpeningGuide: 'Cómo elegir la abertura de matriz V', minimumFlangeLengthGuide: 'Guía de longitud mínima de pestaña', toolingSelectionGuide: 'Guía de selección de utillaje', crowningGuide: 'Guía de compensación de flecha', stainlessSteelBendingGuide: 'Guía de plegado de acero inoxidable', aluminumBendingGuide: 'Guía de plegado de aluminio' },
    diagram: { eyebrow: 'Diagrama de características', title: 'Características de plegado del aluminio', svgTitle: 'Diagrama de plegado de aluminio en plegadora', svgDescription: 'Punzón pulido y matriz V forman aluminio protegido con indicaciones de retorno, marcado y radio.', punch: 'Punzón pulido', film: 'Película protectora', sheet: 'Chapa de aluminio', vDie: 'Matriz V', springback: 'Ángulo de retorno', markZone: 'Zona de marcado', insideRadius: 'Radio interior mayor', caption: 'En aluminio visible, radio, protección y contacto del hombro se aprueban junto con el ángulo.' },
  },
  tr: {
    back: '← Mühendislik araçları merkezine dön', eyebrow: 'Mühendislik Kılavuzu', title: 'Alüminyum Büküm Kılavuzu', subtitle: 'Alüminyum sac bükme, geri esneme davranışı, yüzey koruması ve takım seçimi için profesyonel mühendislik referansı.',
    why: { title: 'Alüminyum Bükmede Neden Farklıdır', text: 'Alüminyum bükme paslanmaz çelikten önemli ölçüde farklıdır. Yaygın alüminyum saclar daha yumuşak ve düşük akma dayanımlı olduğundan genellikle daha az tonaj ister; buna karşılık kolayca şekil bozar ve çizilir. Takım üzerinde daha büyük doğal iç radyüs oluşturma eğilimi vardır, sert temperler ise dar radyüste çatlayabilir. Alaşım ve temper geri esnemeyi etkiler; kısa flanş kararsızlaşabilir ve görünür bir parça açıdan önce yüzey kusuru nedeniyle reddedilebilir.' },
    grades: { title: 'Bükme İçin Yaygın Alüminyum Kaliteleri', intro: 'Alaşım ve temper iş kaydında tanımlanmalıdır. Aşağıdaki eğilimler sertifika ve deneme bükümünün yerine geçmez.', headers: ['Kalite', 'Tipik şekillenme', 'Kurulum dikkati'], rows: [['5052 alüminyum', 'Uygun sac temperinde bu yaygın seçenekler arasında genellikle en iyi şekillenme davranışını verir.', 'Şekillendirilmiş gövde ve görünür panel için iyi başlangıçtır; radyüs ve korumayı doğrulayın.'], ['6061 alüminyum', 'Özellikle T6 gibi yüksek dayanımlı temperlerde dar bükümde çatlama riski daha yüksektir.', 'Daha cömert iç radyüs uygulayın; temperi, yönü ve dış yüzeyi kontrol edin.'], ['3003 alüminyum', 'Genellikle yumuşaktır ve düşük bükme direnciyle kolay şekillenir.', 'Hafif şekillendirme için uygundur, ancak yumuşak yüzey kirli takımla kolayca iz yapar.']] },
    sections: [['tonnage', 'Alüminyum İçin Tonaj Gereksinimi', 'Benzer kalınlık ve uzunlukta alüminyum, düşük şekillendirme dayanımı nedeniyle paslanmaz çeliğe göre genellikle daha az kuvvet ister. Bununla birlikte kalınlık yükü güçlü biçimde artırır ve küçük V açıklığı tonajı, temas basıncını ve iz riskini hızla yükseltir. Makine payını ve kalıp kapasitesini doğrulayın.'], ['springback', 'Alüminyumda Geri Esneme Davranışı', 'Yumuşak alüminyumda bile geri esneme vardır. Alaşım ve temper açısal geri dönüşü belirgin biçimde değiştirir; 6061-T6, yumuşak 3003 veya şekillenebilir 5052 gibi davranmaz. Hassas açı ve seri tekrar için CNC düzeltmesi, kayıtlı aşırı bükme ve deneme bükümü gerekir.'], ['v-die', 'Alüminyum İçin V Kalıp Seçimi', 'Aşırı küçük V açıklığı omuzlarda basıncı yoğunlaştırır ve sac ya da koruyucu yüzeyde belirgin çizgiler bırakabilir. Daha büyük uygun açıklık izi azaltabilir, ancak doğal iç radyüsü ve gerekli flanş desteğini büyütür. Görünüm, teknik resim radyüsü, geometri, ölçü doğruluğu ve tonaj dengelenmelidir.'], ['surface', 'Yüzey Koruması ve İz Önleme', 'Alüminyum kolay çizilir; eloksallı veya fırçalanmış yüzey hafif sürüklenmeyi ve omuz izini gösterir. Sacı ve kalıbı temiz tutun; görünür yüzeylerde koruyucu film, üretan film veya başka bir bariyeri doğrulayın. İz bırakmayan takım, parlatılmış kalıp ve uygun omuz radyüsü hasarı azaltabilir; açı tekrarı ayrıca kontrol edilmelidir.'], ['radius', 'İç Radyüs ve Çatlama', 'Gereksiz derecede keskin bir iç radyüs dış lif gerilmesini ve çatlama riskini artırır; 6061-T6 özellikle duyarlıdır. Daha büyük radyüs çoğunlukla şekillendirme kararlılığını iyileştirir. Kritik veya küçük radyüslü parçalarda hadde yönünü ve büküm çizgisi yönünü değerlendirin.'], ['tooling', 'Alüminyum İçin Takım Seçimi', 'Bitmiş alüminyum için pürüzsüz kalıp omuzlu parlatılmış takım kullanın. Kozmetik panellerde iz önleyici kalıp veya üretan koruma uygun olabilir; zımba radyüsü basıncı yoğunlaştırmadan istenen iç radyüsü desteklemelidir.']],
    problems: { title: 'Yaygın Alüminyum Büküm Sorunları', cards: [['Yüzey çizikleri', 'Kir, taşıma veya kayma eloksallı ya da fırçalanmış yüzeyi bozar.'], ['Kalıp izleri', 'Yüksek omuz basıncı veya pürüzlü temas görünür alüminyumu izler.'], ['Çatlama', 'Dar radyüs, sert temper veya elverişsiz hadde yönü dış yüzeyi aşırı zorlar.'], ['Flanş deformasyonu', 'Yumuşak malzeme veya yetersiz destek dalgalanma ve konum kaybı üretir.'], ['Aşırı radyüs büyümesi', 'İzi azaltmak için seçilen açıklık teknik resim radyüsünü aşabilir.'], ['Açı tutarsızlığı', 'Temper, kalınlık, koruma ve takım temizliği geri esnemeyi değiştirir.'], ['Malzeme uzaması', 'Yerel basınç veya desteksiz geometri ölçüyü tolerans dışına çeker.'], ['Kozmetik kusurlar', 'Yapısal bir işte kabul edilebilen iz, görünür paneli reddettirebilir.']] },
    notes: { title: 'Mühendislik Notları', items: ['Alüminyum alaşımları ve temperleri arasındaki farklar büyüktür; tek ayarı genel kural saymayın.', 'Dekoratif alüminyumda yüzey kalitesini kontrol etmek çoğu zaman son açıdan daha zordur.', 'Seri üretimde takım temizliğini yönetin ve film durumunu belirli aralıklarla inceleyin.', '6061, özellikle sert temperlerde, doğrulama olmadan çok küçük iç R için uygun değildir.', 'Eloksallı parçalar için koruma planı, büküm yönü ve kabul edilebilir iz standardı önceden belirlenmelidir.'] },
    faqTitle: 'Sık Sorulan Sorular', faq: [['Alüminyum paslanmaz çelikten daha kolay mı bükülür?', 'Genellikle daha az kuvvet ister, ancak yüzey, deformasyon ve alaşıma bağlı çatlama sıkı kontrol gerektirir.'], ['En iyi bükülen alüminyum kalitesi hangisidir?', '5052 iyi şekillenebilirliği nedeniyle sık seçilir; 3003 de kolay şekillenir, ancak temper, radyüs ve yüzey şartı belirleyicidir.'], ['6061 alüminyum bükmede neden çatlar?', '6061-T6 gibi yüksek dayanımlı temperler dar radyüse ve elverişsiz tane yönüne daha az dayanır.'], ['Alüminyum üzerindeki izleri nasıl azaltırım?', 'Temiz parlatılmış temaslar, doğrulanmış film veya üretan, düşük izli takım ve basıncı gereksiz yoğunlaştırmayan V açıklığı kullanın.'], ['Alüminyum için hangi V kalıp açıklığı kullanılmalı?', 'Kalınlığa dayalı bir başlangıç referansı kullanın; radyüs, flanş desteği, yüzey, temper ve tonajı deneme parçalarıyla doğrulayın.'], ['Alüminyum geri esner mi?', 'Evet. Alaşım, temper, radyüs ve takıma göre değişir; açı düzeltmesi ve deneme gerekir.'], ['Alüminyum büküm radyüsü neden büyür?', 'Havada bükmede doğal iç radyüs V açıklığından güçlü biçimde etkilenir; daha geniş açıklık veya yumuşak akış radyüsü büyütebilir.']],
    relatedTitle: 'İlgili mühendislik araçları', relatedAria: 'İlgili mühendislik araçları',
    relatedLabels: { pressBrakeCalculator: 'Abkant pres hesaplayıcısı', materialDatabase: 'Malzeme veritabanı', vDieSelectionTool: 'V kalıp seçim aracı', insideRadiusGuide: 'İç radyüs kılavuzu', springbackDatabase: 'Geri esneme veritabanı', bendAllowanceCalculator: 'Büküm payı hesaplayıcısı', bendDeductionGuide: 'Büküm Düşümü Kılavuzu', airBendingGuide: 'Havada bükme kılavuzu', pressBrakeTonnageGuide: 'Abkant pres tonaj kılavuzu', vDieOpeningGuide: 'V kalıp açıklığı seçim kılavuzu', minimumFlangeLengthGuide: 'Minimum Flanş Boyu Kılavuzu', toolingSelectionGuide: 'Abkant pres takım seçimi kılavuzu', crowningGuide: 'Abkant pres sehim kompanzasyonu kılavuzu', stainlessSteelBendingGuide: 'Paslanmaz Çelik Büküm Kılavuzu', aluminumBendingGuide: 'Alüminyum Büküm Kılavuzu' },
    diagram: { eyebrow: 'Büküm Karakteristiği Şeması', title: 'Alüminyum büküm karakteristiği', svgTitle: 'Abkant pres alüminyum büküm şeması', svgDescription: 'Parlatılmış zımba ve V kalıp, korumalı alüminyum sacı geri esneme, iz ve radyüs işaretleriyle büker.', punch: 'Parlatılmış zımba', film: 'Koruyucu film', sheet: 'Alüminyum sac', vDie: 'V kalıp', springback: 'Geri esneme açısı', markZone: 'Yüzey iz bölgesi', insideRadius: 'Daha büyük iç radyüs', caption: 'Görünür alüminyumda radyüs, koruma ve omuz teması açıyla birlikte onaylanmalıdır.' },
  },
  id: {
    back: '← Kembali ke pusat alat teknik', eyebrow: 'Panduan Teknik', title: 'Panduan Tekuk Aluminium', subtitle: 'Referensi teknik profesional untuk penekukan lembaran aluminium, perilaku springback, perlindungan permukaan, dan pemilihan perkakas.',
    why: { title: 'Mengapa Aluminium Berbeda Saat Ditekuk', text: 'Penekukan aluminium sangat berbeda dari stainless steel. Lembaran aluminium umum lebih lunak dan memiliki kekuatan luluh lebih rendah sehingga biasanya memerlukan tonase lebih kecil, tetapi lebih mudah berubah bentuk dan tergores. Aluminium cenderung menghasilkan radius dalam alami yang lebih besar, sedangkan temper keras tetap dapat retak pada radius agresif. Springback tetap ada karena paduan dan temper berpengaruh; flange pendek dapat tidak stabil, dan komponen terlihat sering ditolak karena permukaan sebelum sudutnya gagal.' },
    grades: { title: 'Grade Aluminium Umum untuk Penekukan', intro: 'Paduan dan temper harus ditentukan dalam catatan pekerjaan. Kecenderungan ini merupakan acuan produksi yang tetap memerlukan sertifikat serta uji tekuk.', headers: ['Grade', 'Perilaku pembentukan umum', 'Perhatian penyetelan'], rows: [['Aluminium 5052', 'Umumnya memberi perilaku pembentukan terbaik di antara pilihan umum ini dalam temper lembaran yang sesuai.', 'Titik awal baik untuk casing dan panel terlihat; verifikasi radius serta perlindungan.'], ['Aluminium 6061', 'Temper berkekuatan lebih tinggi, terutama T6, memiliki risiko retak yang lebih tinggi pada tekukan ketat.', 'Gunakan radius dalam lebih besar dan periksa temper, arah, serta permukaan luar.'], ['Aluminium 3003', 'Biasanya lunak dan mudah dibentuk dengan tahanan tekuk rendah.', 'Sesuai untuk pembentukan ringan, namun permukaannya mudah berbekas atau berubah bentuk.']] },
    sections: [['tonnage', 'Kebutuhan Tonase untuk Aluminium', 'Pada ketebalan dan panjang serupa, aluminium biasanya memerlukan gaya lebih rendah daripada stainless steel karena kekuatan pembentukannya lebih rendah. Namun ketebalan tetap menaikkan beban secara kuat, dan bukaan V kecil cepat meningkatkan tonase, tekanan kontak, serta risiko bekas. Pastikan cadangan mesin dan kapasitas die.'], ['springback', 'Perilaku Springback Aluminium', 'Springback ada bahkan pada aluminium lunak. Paduan dan temper sangat mengubah pemulihan sudut: 6061-T6 tidak dapat disetel seperti 3003 lunak atau 5052 yang mudah dibentuk. Koreksi sudut CNC, overbend tercatat, dan uji tekuk tetap penting bagi toleransi serta pengulangan batch.'], ['v-die', 'Pemilihan V-Die untuk Aluminium', 'Bukaan terlalu kecil memusatkan tekanan di bahu dan dapat meninggalkan garis jelas pada lembaran atau lapisan pelindung. Bukaan lebih besar yang sesuai dapat mengurangi bekas, tetapi memperbesar radius dalam alami dan kebutuhan dukungan flange. Seimbangkan penampilan, radius gambar, geometri, ketelitian, dan tonase.'], ['surface', 'Perlindungan Permukaan dan Pencegahan Bekas', 'Aluminium mudah tergores; permukaan anodized atau brushed menampilkan gores seret serta bekas bahu ringan. Jaga lembaran dan die bersih; validasi film pelindung, film urethane, atau penghalang lain pada permukaan terlihat. Perkakas no-mark, die dipoles, dan radius bahu yang sesuai mengurangi kerusakan, tetapi pengulangan sudut tetap harus diperiksa.'], ['radius', 'Radius Dalam dan Retak', 'Radius dalam yang terlalu tajam meningkatkan regangan serat luar dan risiko retak, terutama pada 6061-T6. Radius lebih besar biasanya meningkatkan kestabilan pembentukan. Untuk komponen kritis atau radius kecil, kaji arah rolling dan orientasi garis tekuk terhadap arah serat.'], ['tooling', 'Pemilihan Perkakas untuk Aluminium', 'Gunakan perkakas dipoles dengan bahu die halus untuk aluminium jadi. Die anti-bekas atau perlindungan urethane dapat sesuai untuk panel kosmetik; radius punch harus mendukung radius dalam yang ditentukan tanpa memusatkan tekanan.']],
    problems: { title: 'Masalah Umum Penekukan Aluminium', cards: [['Gores permukaan', 'Kotoran, penanganan, atau geseran merusak permukaan anodized maupun brushed.'], ['Bekas die', 'Tekanan bahu tinggi atau kontak kasar mencetak aluminium yang terlihat.'], ['Retak', 'Radius ketat, temper keras, atau arah serat buruk membebani permukaan luar.'], ['Distorsi flange', 'Material lunak atau dukungan kurang menyebabkan gelombang maupun kehilangan posisi.'], ['Radius terlalu besar', 'Bukaan yang dipilih untuk mengurangi bekas dapat melampaui radius gambar.'], ['Sudut tidak konsisten', 'Temper, ketebalan, pelindung, dan kebersihan perkakas menggeser springback.'], ['Material meregang', 'Tekanan lokal atau geometri tanpa dukungan membawa ukuran keluar toleransi.'], ['Cacat kosmetik', 'Bekas yang dapat diterima pada struktur bisa menolak panel terlihat.']] },
    notes: { title: 'Catatan Teknik', items: ['Perbedaan antar paduan dan temper aluminium besar; jangan menganggap satu setelan berlaku umum.', 'Untuk aluminium dekoratif, mutu permukaan sering lebih sulit dikendalikan daripada sudut akhir.', 'Dalam produksi batch, kendalikan kebersihan perkakas dan periksa kondisi film pada interval yang ditentukan.', '6061, khususnya temper keras, tidak sesuai untuk radius dalam sangat kecil tanpa validasi.', 'Komponen anodized memerlukan rencana perlindungan, arah tekuk, dan standar bekas yang disepakati sebelum forming.'] },
    faqTitle: 'Pertanyaan Umum', faq: [['Apakah aluminium lebih mudah ditekuk daripada stainless steel?', 'Biasanya memerlukan gaya lebih kecil, tetapi permukaan, deformasi, dan retak yang bergantung paduan tetap menuntut kontrol ketat.'], ['Grade aluminium mana yang paling baik untuk ditekuk?', '5052 sering dipilih karena formability baik dan 3003 juga mudah dibentuk; temper, radius, dan permukaan tetap menentukan.'], ['Mengapa aluminium 6061 retak saat ditekuk?', 'Temper kuat seperti 6061-T6 kurang menoleransi radius kecil atau orientasi serat yang tidak menguntungkan.'], ['Bagaimana mengurangi bekas pada aluminium?', 'Gunakan kontak bersih dan dipoles, film atau urethane tervalidasi, perkakas rendah bekas, serta bukaan V yang tidak memusatkan tekanan.'], ['Bukaan V die apa yang digunakan untuk aluminium?', 'Mulai dari referensi berbasis ketebalan lalu konfirmasi radius, dukungan flange, permukaan, temper, dan tonase melalui sampel.'], ['Apakah aluminium mengalami springback?', 'Ya. Springback berubah menurut paduan, temper, radius, dan perkakas sehingga koreksi sudut serta uji tekuk diperlukan.'], ['Mengapa radius tekuk aluminium menjadi lebih besar?', 'Pada air bending, bukaan V sangat memengaruhi radius alami; bukaan lebih lebar atau aliran material lunak dapat memperbesarnya.']],
    relatedTitle: 'Alat teknik terkait', relatedAria: 'Alat teknik terkait',
    relatedLabels: { pressBrakeCalculator: 'Kalkulator press brake', materialDatabase: 'Database material', vDieSelectionTool: 'Alat pemilihan V-die', insideRadiusGuide: 'Panduan radius dalam', springbackDatabase: 'Database springback', bendAllowanceCalculator: 'Kalkulator bend allowance', bendDeductionGuide: 'Panduan Bend Deduction', airBendingGuide: 'Panduan tekuk udara', pressBrakeTonnageGuide: 'Panduan tonase press brake', vDieOpeningGuide: 'Pemilihan bukaan cetakan V', minimumFlangeLengthGuide: 'Panduan Panjang Flange Minimum', toolingSelectionGuide: 'Panduan pemilihan perkakas', crowningGuide: 'Panduan kompensasi lendutan', stainlessSteelBendingGuide: 'Panduan Tekuk Stainless Steel', aluminumBendingGuide: 'Panduan Tekuk Aluminium' },
    diagram: { eyebrow: 'Diagram Karakteristik Tekuk', title: 'Karakteristik penekukan aluminium', svgTitle: 'Diagram penekukan aluminium pada press brake', svgDescription: 'Punch dipoles dan V-die menekuk aluminium terlindungi dengan tanda springback, bekas, dan radius.', punch: 'Punch dipoles', film: 'Film pelindung', sheet: 'Lembaran aluminium', vDie: 'V-die', springback: 'Sudut springback', markZone: 'Zona bekas permukaan', insideRadius: 'Radius dalam lebih besar', caption: 'Untuk aluminium terlihat, radius, perlindungan, dan kontak bahu disetujui bersama hasil sudut.' },
  },
}

function createStructuredData() {
  const page = content.en
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', name: page.title, description: page.seoDescription, url: getSiteUrl(routePath) },
      {
        '@type': 'TechArticle',
        headline: page.title,
        description: page.seoDescription,
        author: { '@type': 'Organization', name: 'ZYCO' },
        publisher: { '@type': 'Organization', name: 'ZYCO', url: getSiteUrl('/') },
        mainEntityOfPage: getSiteUrl(routePath),
      },
      {
        '@type': 'FAQPage',
        mainEntity: page.faq.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
    ],
  }
}

function Card({ title, text }) {
  return <article className='zyco-aluminum__card'><h3>{title}</h3><p>{text}</p></article>
}

export default function AluminumBendingGuide({ language = 'en', setLanguage = () => {} }) {
  const page = content[language] || content.en
  const sharedText = getEngineeringText(language)

  useEffect(() => {
    setPageSEO({
      title: `${content.en.title} | ZYCO Engineering Hub`,
      description: content.en.seoDescription,
      keywords: content.en.keywords,
      canonicalPath: routePath,
    })
    setStructuredData({
      id: 'aluminum-bending-guide-jsonld',
      data: createStructuredData(),
    })
  }, [])

  return (
    <>
      <style>
        {`
          .zyco-aluminum { min-height:100vh; box-sizing:border-box; padding:52px 22px; background:radial-gradient(circle at 16% 12%,rgba(96,165,250,.34),transparent 30%),radial-gradient(circle at 84% 20%,rgba(14,165,233,.22),transparent 28%),linear-gradient(145deg,#071224 0%,#0b1f3f 42%,#12366e 74%,#1d4ed8 100%); color:#fff; font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; position:relative; overflow:hidden; }
          .zyco-aluminum::before { content:""; position:absolute; inset:0; background-image:linear-gradient(rgba(96,165,250,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(96,165,250,.08) 1px,transparent 1px); background-size:42px 42px; mask-image:linear-gradient(to bottom,rgba(0,0,0,.9),transparent 78%); pointer-events:none; }
          .zyco-aluminum__shell { width:min(1180px,100%); margin:0 auto; position:relative; z-index:1; }
          .zyco-aluminum__hero { padding:38px 36px; margin-bottom:22px; border:1px solid rgba(191,219,254,.2); border-radius:30px; background:linear-gradient(145deg,rgba(255,255,255,.14),rgba(255,255,255,.06)); backdrop-filter:blur(16px); box-shadow:0 28px 68px rgba(2,8,23,.2); }
          .zyco-aluminum__back, .zyco-aluminum__tool { display:inline-flex; align-items:center; justify-content:center; box-sizing:border-box; text-decoration:none; color:#fff; font-size:15px; font-weight:800; transition:all .25s ease; }
          .zyco-aluminum__back { width:fit-content; max-width:min(100%,480px); min-height:44px; margin:0 0 22px; padding:0 16px; border:1px solid rgba(147,197,253,.46); border-radius:999px; background:linear-gradient(145deg,rgba(15,23,42,.34),rgba(37,99,235,.12)); color:#bfdbfe; }
          .zyco-aluminum__back:hover { transform:translateY(-2px); border-color:rgba(125,211,252,.7); color:#fff; background:rgba(37,99,235,.42); box-shadow:0 14px 32px rgba(37,99,235,.32),0 0 0 1px rgba(125,211,252,.16); }
          .zyco-aluminum__eyebrow { margin:0; color:#7dd3fc; font-size:12px; font-weight:800; letter-spacing:.2em; text-transform:uppercase; }
          .zyco-aluminum__title { max-width:920px; margin:14px 0 18px; font-size:clamp(34px,5vw,54px); line-height:1.08; letter-spacing:-.05em; }
          .zyco-aluminum__subtitle { max-width:900px; margin:0; color:#dbeafe; font-size:18px; line-height:1.72; }
          .zyco-aluminum__panel { padding:28px; margin-top:18px; border:1px solid rgba(191,219,254,.16); border-radius:25px; background:rgba(10,30,61,.48); backdrop-filter:blur(12px); }
          .zyco-aluminum__section-title { margin:0 0 14px; color:#fff; font-size:25px; letter-spacing:-.035em; }
          .zyco-aluminum__copy { margin:0; color:#cbd5e1; font-size:16px; line-height:1.75; }
          .zyco-aluminum__grid, .zyco-aluminum__cards { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:18px; }
          .zyco-aluminum__cards { gap:12px; margin-top:16px; }
          .zyco-aluminum__card { padding:18px; border:1px solid rgba(191,219,254,.13); border-radius:18px; background:rgba(30,64,112,.34); }
          .zyco-aluminum__card h3 { margin:0 0 8px; color:#eff6ff; font-size:16px; line-height:1.45; }
          .zyco-aluminum__card p { margin:0; color:#bfdbfe; font-size:14px; line-height:1.65; }
          .zyco-aluminum__table-wrap { overflow-x:auto; border:1px solid rgba(191,219,254,.16); border-radius:18px; margin-top:18px; }
          .zyco-aluminum__table { width:100%; min-width:700px; border-collapse:collapse; }
          .zyco-aluminum__table th, .zyco-aluminum__table td { padding:14px 16px; border-bottom:1px solid rgba(191,219,254,.1); text-align:left; }
          .zyco-aluminum__table th { color:#bae6fd; background:rgba(30,64,112,.38); font-size:13px; }
          .zyco-aluminum__table td { color:#e2e8f0; font-size:14px; line-height:1.55; }
          .zyco-aluminum__list, .zyco-aluminum__faq { display:grid; gap:12px; padding:0; margin:0; list-style:none; }
          .zyco-aluminum__list li, .zyco-aluminum__faq article { padding:17px 20px; border:1px solid rgba(191,219,254,.12); border-radius:18px; background:rgba(30,64,112,.3); }
          .zyco-aluminum__faq h3 { margin:0 0 8px; color:#eff6ff; font-size:16px; }
          .zyco-aluminum__tools { display:flex; flex-wrap:wrap; gap:12px; }
          .zyco-aluminum__tool { min-height:46px; padding:0 18px; border:1px solid rgba(147,197,253,.38); border-radius:14px; color:#dbeafe; background:rgba(30,64,175,.32); box-shadow:none; }
          .zyco-aluminum__tool:hover { transform:translateY(-4px); border-color:rgba(125,211,252,.7); color:#fff; background:rgba(37,99,235,.4); box-shadow:0 14px 30px rgba(56,189,248,.22),0 7px 22px rgba(2,8,23,.22); }
          @media (max-width:840px) { .zyco-aluminum__grid, .zyco-aluminum__cards { grid-template-columns:1fr; } }
          @media (max-width:760px) { .zyco-aluminum { padding:22px 14px; } .zyco-aluminum__hero, .zyco-aluminum__panel { padding:22px; border-radius:22px; } .zyco-aluminum__subtitle { font-size:16px; } }
          @media (max-width:640px) { .zyco-aluminum__back, .zyco-aluminum__tool { width:100%; } }
        `}
      </style>
      <main className='zyco-aluminum'>
        <div className='zyco-aluminum__shell'>
          <header className='zyco-aluminum__hero'>
            <a className='zyco-aluminum__back' href='/engineering' aria-label={page.back}>{page.back}</a>
            <LanguageSwitcher className='zyco-page-language-switcher' language={language} setLanguage={setLanguage} />
            <p className='zyco-aluminum__eyebrow'>{page.eyebrow}</p>
            <h1 className='zyco-aluminum__title'>{page.title}</h1>
            <p className='zyco-aluminum__subtitle'>{page.subtitle}</p>
          </header>
          <section className='zyco-aluminum__panel' aria-labelledby='aluminum-why'>
            <h2 className='zyco-aluminum__section-title' id='aluminum-why'>{page.why.title}</h2>
            <p className='zyco-aluminum__copy'>{page.why.text}</p>
          </section>
          <AluminumBendingDiagram labels={page.diagram} />
          <section className='zyco-aluminum__panel' aria-labelledby='aluminum-grades'>
            <h2 className='zyco-aluminum__section-title' id='aluminum-grades'>{page.grades.title}</h2>
            <p className='zyco-aluminum__copy'>{page.grades.intro}</p>
            <div className='zyco-aluminum__table-wrap'>
              <table className='zyco-aluminum__table'>
                <thead><tr>{page.grades.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
                <tbody>{page.grades.rows.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
          </section>
          <div className='zyco-aluminum__grid'>
            {page.sections.map(([id, title, text]) => (
              <section className='zyco-aluminum__panel' aria-labelledby={`aluminum-${id}`} key={id}>
                <h2 className='zyco-aluminum__section-title' id={`aluminum-${id}`}>{title}</h2>
                <p className='zyco-aluminum__copy'>{text}</p>
              </section>
            ))}
          </div>
          <section className='zyco-aluminum__panel' aria-labelledby='aluminum-problems'>
            <h2 className='zyco-aluminum__section-title' id='aluminum-problems'>{page.problems.title}</h2>
            <div className='zyco-aluminum__cards'>{page.problems.cards.map(([title, text]) => <Card key={title} title={title} text={text} />)}</div>
          </section>
          <section className='zyco-aluminum__panel' aria-labelledby='aluminum-notes'>
            <h2 className='zyco-aluminum__section-title' id='aluminum-notes'>{page.notes.title}</h2>
            <ul className='zyco-aluminum__list'>{page.notes.items.map((note) => <li className='zyco-aluminum__copy' key={note}>{note}</li>)}</ul>
          </section>
          <section className='zyco-aluminum__panel' aria-labelledby='aluminum-faq'>
            <h2 className='zyco-aluminum__section-title' id='aluminum-faq'>{page.faqTitle}</h2>
            <div className='zyco-aluminum__faq'>{page.faq.map(([question, answer]) => <article key={question}><h3>{question}</h3><p className='zyco-aluminum__copy'>{answer}</p></article>)}</div>
          </section>
          <section className='zyco-aluminum__panel' aria-labelledby='aluminum-related'>
            <h2 className='zyco-aluminum__section-title' id='aluminum-related'>{page.relatedTitle}</h2>
            <nav className='zyco-aluminum__tools' aria-label={page.relatedAria}>
              {relatedTools.map(([key, href]) => <a className='zyco-aluminum__tool' href={href} key={key}>{page.relatedLabels[key] || sharedText.relatedTools[key]}</a>)}
            </nav>
          </section>
        </div>
      </main>
    </>
  )
}
