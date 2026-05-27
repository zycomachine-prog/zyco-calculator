import { useEffect } from 'react'
import LanguageSwitcher from '../components/LanguageSwitcher.jsx'
import CrowningDiagram from '../components/CrowningDiagram.jsx'
import { getEngineeringText } from '../languages/engineeringText.js'
import {
  getSiteUrl,
  setPageSEO,
  setStructuredData,
} from '../utils/seo.js'

const routePath = '/engineering/press-brake-crowning-guide'

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
  ['bottomingVsCoiningGuide', '/engineering-tools/bottoming-vs-coining-guide'],
  ['bendSequenceGuide', '/engineering-tools/bend-sequence-guide'],
  ['pressBrakeTonnageGuide', '/engineering/press-brake-tonnage-guide'],
  ['vDieOpeningGuide', '/engineering/how-to-choose-press-brake-v-die-opening'],
  ['minimumFlangeLengthGuide', '/engineering/minimum-flange-length-guide'],
  ['toolingSelectionGuide', '/engineering/press-brake-tooling-selection-guide'],
  ['crowningGuide', routePath],
  ['stainlessSteelBendingGuide', '/engineering/stainless-steel-bending-guide'],
  ['aluminumBendingGuide', '/engineering/aluminum-bending-guide'],
]

const content = {
  en: {
    back: '← Back to Engineering Tools',
    eyebrow: 'Engineering Guide',
    title: 'Press Brake Crowning Guide',
    subtitle: 'Engineering reference for compensating machine deflection and holding consistent angles across long press brake bends.',
    seoDescription: 'Engineering guide to press brake crowning, mechanical and hydraulic compensation, long-bend angle consistency, setup diagnosis and CNC adjustment.',
    keywords: 'press brake crowning, crowning compensation, hydraulic crowning, mechanical crowning, long bend angle accuracy, press brake deflection',
    what: { title: 'What Is Press Brake Crowning', text: 'During a long bend, load causes the ram and bed to deflect in opposite directions. The center of the tooling then penetrates the sheet less than the ends, commonly leaving the middle angle more open. Crowning introduces a controlled counter-curve or support force in the lower beam so effective penetration remains uniform along the bending length.' },
    why: {
      title: 'Why Crowning Is Important',
      cards: [
        ['Angle consistency', 'Correct compensation limits center-to-end angle deviation on long doors, panels and enclosures.'],
        ['Production stability', 'A verified crowning value improves batch repeatability instead of relying on repeated operator correction.'],
        ['Lower rework', 'Uniform bends reduce correction strokes, rejected long parts and downstream assembly mismatch.'],
        ['CNC accuracy', 'Programmed compensation helps a capable press brake deliver its commanded angle over the full usable length.'],
      ],
    },
    systems: {
      title: 'Mechanical Crowning vs Hydraulic Crowning',
      intro: 'Both systems address frame deflection, but the actuation, response and maintenance profile differ.',
      headers: ['System', 'Control and precision', 'Maintenance and stability'],
      rows: [
        ['Mechanical wedge crowning', 'Opposed wedge sets create a repeatable bed curve; CNC drives can position the wedges with fine resolution.', 'Low hydraulic dependency and strong long-term repeatability; keep sliding interfaces clean and calibrated.'],
        ['Hydraulic crowning', 'Cylinders under the table develop compensation pressure under CNC command and respond readily to changing jobs.', 'Excellent programmable response; oil condition, seals, sensors and pressure balance affect stability.'],
      ],
    },
    accuracy: {
      title: 'How Crowning Affects Bending Accuracy',
      text: 'Required compensation follows the actual load distribution, not bend length alone. Increased thickness or material strength raises tonnage and frame deflection. A smaller V-die opening also raises load, while segmented or non-uniform tooling can change its distribution. Crowning must therefore be matched to material, thickness, V opening, tonnage, bend length and machine stiffness.',
    },
    problems: {
      title: 'Common Crowning Problems',
      cards: [
        ['Under-crowning', 'The center stays more open than the ends because compensation is below actual deflection.'],
        ['Over-crowning', 'The center becomes tighter than the ends after excessive compensation.'],
        ['Uneven angle profile', 'Off-center loading, dirty or mismatched tooling, or poorly balanced compensation can produce irregular angles.'],
        ['Setup and material errors', 'Wrong tooling, thickness variation, yield-strength changes and operator over-adjustment can imitate a crowning fault.'],
      ],
    },
    adjustment: {
      title: 'Crowning Adjustment Tips',
      steps: [
        'Confirm tooling alignment, V opening, sheet thickness, material batch and bend length before editing compensation.',
        'Start from the CNC crowning table or proven job record for the selected tonnage and geometry.',
        'Perform a full-length test bend and measure angles near both ends and at the center with a consistent method.',
        'Increase compensation when the center is too open; reduce it when the center is too tight, using small controlled changes.',
        'Record the accepted value with material, thickness, V opening, bend length and tooling for repeat production.',
      ],
    },
    notes: {
      title: 'Engineering Notes',
      items: [
        'Crowning is a compensation system, not a cure for a flexible frame, damaged tooling, poor alignment or inconsistent material.',
        'Machine rigidity and precise, rated tooling remain fundamental to long-bend accuracy and long-term production stability.',
        'Use compensation together with material data, V opening, calculated tonnage and effective bending length; a saved value should be rechecked whenever those inputs change.',
      ],
    },
    faqTitle: 'Frequently Asked Questions',
    faq: [
      ['What is crowning in a press brake?', 'Crowning is controlled compensation in the bed or lower beam that offsets ram and table deflection during bending.'],
      ['Why is crowning necessary for long bends?', 'Long bends develop greater total loading and visible center-to-end angle error when frame deflection is not compensated.'],
      ['What causes uneven bend angles?', 'Frame deflection, incorrect compensation, nonuniform tooling, material variation, off-center loading and poor setup can all contribute.'],
      ['Mechanical vs hydraulic crowning?', 'Mechanical systems position wedge profiles; hydraulic systems apply programmable support pressure. Both can be accurate when maintained and calibrated.'],
      ['Can crowning correct all angle problems?', 'No. It cannot replace correct tooling, stable material, sufficient machine stiffness, alignment or sound bending parameters.'],
      ['How do I adjust crowning correctly?', 'Use a verified starting table, make a full-length test bend, measure center and ends, then adjust incrementally and document the production value.'],
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
    diagram: {
      eyebrow: 'Compensation Diagram',
      title: 'Long-bend deflection and crowning response',
      svgTitle: 'Press brake crowning compensation diagram',
      svgDescription: 'Comparison of an uncompensated long bend with center angle error and a crowned bend with uniform angle response.',
      without: 'Without crowning',
      with: 'With crowning compensation',
      centerError: 'Center angle error',
      deflection: 'Ram and bed deflection',
      compensation: 'Counter-curve support',
      consistent: 'Consistent angle along length',
      loadPath: 'LOAD PATH CONTROL',
      caption: 'Compensation is set against real tonnage, tooling span and bending length.',
    },
  },
  zh: {
    back: '← 返回工程工具中心',
    eyebrow: '工程指南',
    title: '折弯机挠度补偿指南',
    subtitle: '用于补偿机器挠曲并在长工件折弯中保持全长角度一致性的工程参考。',
    seoDescription: '折弯机挠度补偿工程指南，涵盖机械式与液压式补偿、长板角度一致性、故障诊断以及 CNC 调整方法。',
    keywords: '折弯机挠度补偿, 机械补偿, 液压补偿, 长板折弯精度, 角度一致性, CNC 补偿',
    what: { title: '什么是折弯机挠度补偿', text: '长距离折弯时，载荷会使滑块和工作台向相反方向挠曲。中部模具对板材的实际压入量低于两端，常表现为中部角度偏大。挠度补偿通过在下梁产生受控反拱曲线或支撑力，使有效压入量沿折弯长度保持均匀。' },
    why: { title: '为什么挠度补偿重要', cards: [['角度一致性', '正确补偿可限制长门板、面板和机柜件的中部与端部角度偏差。'], ['批量稳定性', '验证后的补偿值能够提高重复生产一致性，减少依赖人工反复修正。'], ['减少返工', '均匀折弯有助于减少校正行程、长件报废和后续装配不匹配。'], ['CNC 精度', '程序化补偿使具备能力的折弯机在有效长度上更好地实现指令角度。']] },
    systems: { title: '机械式补偿与液压式补偿', intro: '两种系统均用于抵消机架挠曲，但执行方式、响应和维护重点不同。', headers: ['系统', '控制与精度', '维护与稳定性'], rows: [['机械斜楔补偿', '相对运动的斜楔组形成可重复的工作台反拱；CNC 驱动可实现精细定位。', '对液压系统依赖较低，长期重复性良好；应保持滑动面清洁并定期校准。'], ['液压补偿', '工作台下方油缸按 CNC 指令建立补偿压力，对工件变更响应灵活。', '程序响应优秀；油液、密封、传感器和压力平衡会影响稳定性。']] },
    accuracy: { title: '挠度补偿如何影响折弯精度', text: '所需补偿取决于实际载荷分布，而不仅是长度。板厚或材料强度增加会提高吨位与机架挠曲；较小的 V 型模开口同样会提高载荷；分段或不均匀模具还会改变载荷分布。因此补偿必须结合材料、板厚、V 开口、吨位、折弯长度与机器刚性设定。' },
    problems: { title: '常见挠度补偿问题', cards: [['补偿不足', '补偿量低于实际挠曲时，中部角度仍会比两端偏大。'], ['补偿过度', '补偿过大后，中部角度会比两端更紧。'], ['角度沿长度不均', '偏载、模具污损或不匹配、补偿平衡不良都可能形成不规则角度。'], ['设定与材料错误', '模具选错、板厚波动、强度变化和操作员过度调整可能被误判为补偿故障。']] },
    adjustment: { title: '挠度补偿调整要点', steps: ['调整补偿前，确认模具对中、V 开口、板厚、材料批次与折弯长度。', '依据所选吨位和几何条件，从 CNC 补偿表或已验证工艺记录开始。', '进行全长试折，并以一致方法测量两端和中部角度。', '中部角度偏大时小幅增加补偿；中部偏小时小幅降低补偿。', '将合格补偿值与材料、板厚、V 开口、折弯长度及模具信息共同记录。'] },
    notes: { title: '工程说明', items: ['挠度补偿是补偿系统，不能弥补机架刚性不足、模具损伤、对中不良或材料不一致。', '机器刚性与精密且额定承载合适的模具，仍是长折弯精度和长期稳定生产的基础。', '补偿应结合材料数据、V 开口、计算吨位和有效折弯长度使用；任何输入变化后都应重新核验已保存数值。'] },
    faqTitle: '常见问题',
    faq: [['折弯机中的挠度补偿是什么？', '它是在折弯过程中通过工作台或下梁的受控补偿，抵消滑块和工作台挠曲的系统。'], ['为什么长折弯需要挠度补偿？', '长工件的总载荷更大，如果不补偿机架挠曲，中部与端部的角度偏差会更明显。'], ['什么会造成折弯角度不均？', '机架挠曲、补偿错误、模具不均、材料波动、偏心载荷和设定不当都可能导致角度不均。'], ['机械式与液压式补偿有什么不同？', '机械系统定位斜楔轮廓，液压系统施加可编程支撑压力；维护和校准正确时二者都可达到高精度。'], ['补偿能解决全部角度问题吗？', '不能。它不能替代正确模具、稳定材料、足够机器刚性、对中和合理折弯参数。'], ['如何正确调整补偿？', '从验证过的起始表开始，全长试折并测量中部和两端，再小步调整并记录生产数值。']],
    relatedTitle: '相关工程工具',
    relatedAria: '相关工程工具',
    relatedLabels: { pressBrakeCalculator: '折弯机计算器', materialDatabase: '材料数据库', vDieSelectionTool: 'V 型模具选择工具', insideRadiusGuide: '内半径指南', springbackDatabase: '回弹数据库', bendAllowanceCalculator: '折弯展开计算器', bendDeductionGuide: '折弯扣除量指南', airBendingGuide: '空气折弯指南', pressBrakeTonnageGuide: '折弯机吨位指南', vDieOpeningGuide: '如何选择折弯机 V 型模开口', minimumFlangeLengthGuide: '最小翻边长度指南', toolingSelectionGuide: '折弯机模具选型指南', crowningGuide: '折弯机挠度补偿指南', stainlessSteelBendingGuide: '不锈钢折弯指南', aluminumBendingGuide: '铝板折弯指南' },
    diagram: { eyebrow: '补偿示意图', title: '长板挠曲与挠度补偿响应', svgTitle: '折弯机挠度补偿示意图', svgDescription: '对比未补偿时的中部角度误差与补偿后均匀的长工件折弯角度。', without: '无挠度补偿', with: '启用挠度补偿', centerError: '中部角度偏差', deflection: '滑块与工作台挠曲', compensation: '反拱支撑', consistent: '全长角度一致', loadPath: '载荷路径控制', caption: '补偿值应依据实际吨位、模具跨度与折弯长度设定。' },
  },
  ru: {
    back: '← Назад к инженерным инструментам', eyebrow: 'Инженерное руководство', title: 'Руководство по компенсации прогиба листогиба', subtitle: 'Инженерная справка по компенсации прогиба станка и обеспечению постоянного угла на длинных гибах.', seoDescription: 'Инженерное руководство по компенсации прогиба листогибочного пресса: механические и гидравлические системы, точность длинного гиба, диагностика и настройка ЧПУ.', keywords: 'компенсация прогиба листогиба, механический crowning, гидравлическая компенсация, точность длинного гиба, ЧПУ компенсация',
    what: { title: 'Что такое компенсация прогиба листогиба', text: 'При длинном гибе нагрузка отклоняет ползун и стол в противоположных направлениях. В центре инструмент проникает в лист меньше, чем по краям, и угол обычно остается более раскрытым. Система компенсации создает управляемый обратный прогиб или поддерживающее усилие нижней балки, выравнивая рабочее проникновение по длине.' },
    why: { title: 'Почему компенсация важна', cards: [['Постоянство угла', 'Правильная компенсация уменьшает разницу углов между центром и концами длинных панелей и дверей.'], ['Стабильность серии', 'Проверенное значение повышает повторяемость партии без постоянных ручных поправок.'], ['Меньше переделок', 'Равномерный гиб снижает число исправлений, брака длинных деталей и проблем сборки.'], ['Точность ЧПУ', 'Программируемая компенсация помогает реализовать заданный угол по всей рабочей длине.']] },
    systems: { title: 'Механическая и гидравлическая компенсация', intro: 'Обе системы компенсируют прогиб рамы, но отличаются приводом, реакцией и обслуживанием.', headers: ['Система', 'Управление и точность', 'Обслуживание и стабильность'], rows: [['Механические клинья', 'Встречные клинья формируют повторяемую кривую стола; привод ЧПУ точно задает положение.', 'Низкая зависимость от гидравлики и хорошая долговременная повторяемость; нужны чистота и калибровка.'], ['Гидравлическая компенсация', 'Цилиндры под столом создают давление по команде ЧПУ и быстро адаптируются к новой задаче.', 'Высокая программная гибкость; состояние масла, уплотнений, датчиков и баланс давления влияют на результат.']] },
    accuracy: { title: 'Влияние компенсации на точность гибки', text: 'Необходимая компенсация определяется распределением нагрузки, а не только длиной. Толщина и прочность материала увеличивают усилие и прогиб рамы. Малое раскрытие V-матрицы также увеличивает нагрузку, а сегментированный или неоднородный инструмент меняет ее распределение. Настройка должна учитывать материал, толщину, V-раскрытие, тоннаж, длину гиба и жесткость станка.' },
    problems: { title: 'Типичные проблемы компенсации', cards: [['Недостаточная компенсация', 'Центр остается более раскрытым, чем края, когда компенсация ниже фактического прогиба.'], ['Избыточная компенсация', 'При слишком большой поправке центр получается более закрытым, чем края.'], ['Неравномерный профиль угла', 'Смещенная нагрузка, грязный или несогласованный инструмент и дисбаланс системы дают нерегулярный результат.'], ['Ошибки установки и материала', 'Неверная оснастка, разброс толщины и прочности или чрезмерная ручная коррекция могут выглядеть как неисправность компенсации.']] },
    adjustment: { title: 'Рекомендации по настройке', steps: ['До изменения компенсации проверьте соосность инструмента, раскрытие V, толщину, партию материала и длину гиба.', 'Начните с таблицы компенсации ЧПУ или подтвержденной карты операции для данного усилия и геометрии.', 'Выполните пробный гиб полной длины и одинаковым способом измерьте углы по краям и в центре.', 'Если центр раскрыт больше, понемногу увеличивайте компенсацию; если меньше, уменьшайте ее.', 'Запишите принятое значение вместе с материалом, толщиной, V-раскрытием, длиной и оснасткой.'] },
    notes: { title: 'Инженерные примечания', items: ['Компенсация не устраняет недостаточную жесткость рамы, поврежденную оснастку, нарушение центровки или нестабильный материал.', 'Жесткость станка и точная оснастка с допустимой нагрузкой остаются основой точности длинного гиба.', 'Используйте компенсацию совместно с данными материала, V-раскрытием, расчетным усилием и длиной гиба; при изменении любого условия значение нужно перепроверить.'] },
    faqTitle: 'Часто задаваемые вопросы',
    faq: [['Что такое компенсация прогиба в листогибе?', 'Это управляемая коррекция стола или нижней балки, компенсирующая прогиб ползуна и стола при гибке.'], ['Почему она нужна для длинных гибов?', 'На длинном гибе общая нагрузка больше, и без компенсации отклонение угла между центром и концами становится заметнее.'], ['Почему углы гиба неодинаковы?', 'Причиной могут быть прогиб, неверная компенсация, неодинаковая оснастка, материал, смещенная нагрузка или настройка.'], ['Механическая или гидравлическая система?', 'Механическая позиционирует клинья, гидравлическая задает давление поддержки; обе точны при исправном обслуживании.'], ['Исправляет ли компенсация все ошибки угла?', 'Нет. Она не заменяет корректную оснастку, стабильный материал, жесткость, центровку и параметры процесса.'], ['Как правильно настроить компенсацию?', 'Начните с проверенной таблицы, сделайте полный пробный гиб, измерьте центр и края, затем корректируйте малыми шагами.']],
    relatedTitle: 'Связанные инженерные инструменты', relatedAria: 'Связанные инженерные инструменты',
    relatedLabels: { pressBrakeCalculator: 'Калькулятор листогиба', materialDatabase: 'База материалов', vDieSelectionTool: 'Выбор V-матрицы', insideRadiusGuide: 'Справочник внутреннего радиуса', springbackDatabase: 'База пружинения', bendAllowanceCalculator: 'Калькулятор припуска на гиб', bendDeductionGuide: 'Руководство по вычету гиба', airBendingGuide: 'Руководство по воздушной гибке', pressBrakeTonnageGuide: 'Руководство по тоннажу пресса', vDieOpeningGuide: 'Выбор раскрытия V-матрицы', minimumFlangeLengthGuide: 'Руководство по минимальной длине полки', toolingSelectionGuide: 'Выбор оснастки листогиба', crowningGuide: 'Руководство по компенсации прогиба', stainlessSteelBendingGuide: 'Руководство по гибке нержавеющей стали', aluminumBendingGuide: 'Руководство по гибке алюминия' },
    diagram: { eyebrow: 'Схема компенсации', title: 'Прогиб длинной детали и действие компенсации', svgTitle: 'Схема компенсации прогиба листогиба', svgDescription: 'Сравнение длинного гиба без компенсации с ошибкой в центре и гиба с равномерным углом после компенсации.', without: 'Без компенсации', with: 'С компенсацией прогиба', centerError: 'Ошибка угла в центре', deflection: 'Прогиб ползуна и стола', compensation: 'Обратная поддержка', consistent: 'Постоянный угол по длине', loadPath: 'УПРАВЛЕНИЕ НАГРУЗКОЙ', caption: 'Значение задают по фактическому усилию, пролету оснастки и длине гиба.' },
  },
  es: {
    back: '← Volver a herramientas de ingeniería', eyebrow: 'Guía de ingeniería', title: 'Guía de compensación de flecha para plegadoras', subtitle: 'Referencia técnica para compensar la flexión de la máquina y mantener ángulos uniformes en plegados largos.', seoDescription: 'Guía técnica sobre compensación de flecha en plegadoras, sistemas mecánicos e hidráulicos, precisión en pliegues largos, diagnóstico y ajuste CNC.', keywords: 'compensación de flecha plegadora, coronación plegadora, compensación hidráulica, plegado largo, precisión angular CNC',
    what: { title: 'Qué es la compensación de flecha', text: 'Durante un plegado largo, la carga flexiona el pisón y la bancada en sentidos opuestos. El utillaje penetra menos en el centro que en los extremos y el ángulo central suele quedar más abierto. La compensación introduce una contracurva controlada o fuerza de apoyo en la viga inferior para uniformar la penetración efectiva a lo largo del pliegue.' },
    why: { title: 'Por qué es importante', cards: [['Uniformidad angular', 'Una compensación correcta limita la diferencia de ángulo entre centro y extremos en paneles largos.'], ['Estabilidad de producción', 'Un valor verificado mejora la repetibilidad del lote sin correcciones manuales continuas.'], ['Menos reproceso', 'Los pliegues uniformes reducen correcciones, rechazos de piezas largas y problemas de montaje.'], ['Precisión CNC', 'La compensación programada ayuda a entregar el ángulo ordenado en toda la longitud útil.']] },
    systems: { title: 'Compensación mecánica frente a hidráulica', intro: 'Ambos sistemas contrarrestan la flexión del bastidor, con distinta actuación, respuesta y mantenimiento.', headers: ['Sistema', 'Control y precisión', 'Mantenimiento y estabilidad'], rows: [['Cuñas mecánicas', 'Conjuntos de cuñas opuestas generan una curva repetible de la bancada; el CNC puede posicionarlas con resolución fina.', 'Baja dependencia hidráulica y buena repetibilidad a largo plazo; requiere limpieza y calibración.'], ['Compensación hidráulica', 'Cilindros bajo la mesa producen presión según la orden CNC y responden con facilidad a cambios de trabajo.', 'Respuesta programable excelente; aceite, sellos, sensores y equilibrio de presión afectan la estabilidad.']] },
    accuracy: { title: 'Cómo afecta a la precisión de plegado', text: 'La compensación requerida depende de la distribución real de carga, no solo de la longitud. El mayor espesor o resistencia aumenta tonelaje y flexión del bastidor. Una abertura V menor también aumenta la carga; el utillaje segmentado o no uniforme cambia su distribución. Por ello, la compensación debe corresponder a material, espesor, abertura V, tonelaje, longitud y rigidez de máquina.' },
    problems: { title: 'Problemas comunes de compensación', cards: [['Compensación insuficiente', 'El centro queda más abierto que los extremos cuando la corrección no alcanza la flexión real.'], ['Compensación excesiva', 'El centro queda más cerrado que los extremos por una corrección demasiado alta.'], ['Ángulo irregular', 'Carga descentrada, utillaje sucio o desigual y compensación desequilibrada generan variación a lo largo.'], ['Errores de preparación o material', 'Utillaje erróneo, variación de espesor o resistencia y ajustes excesivos pueden parecer un fallo de compensación.']] },
    adjustment: { title: 'Consejos de ajuste', steps: ['Confirme alineación del utillaje, abertura V, espesor, lote de material y longitud antes de cambiar la compensación.', 'Parta de la tabla CNC o del registro probado para el tonelaje y la geometría seleccionados.', 'Haga un pliegue de prueba de longitud completa y mida ángulos en extremos y centro con el mismo método.', 'Aumente poco a poco si el centro queda abierto; reduzca si queda demasiado cerrado.', 'Registre el valor aceptado junto con material, espesor, abertura V, longitud y utillaje.'] },
    notes: { title: 'Notas de ingeniería', items: ['La compensación no corrige un bastidor flexible, utillaje dañado, mala alineación o material inconsistente.', 'La rigidez de máquina y el utillaje preciso con carga admisible siguen siendo esenciales para la precisión en piezas largas.', 'Ajuste junto con datos del material, abertura V, tonelaje calculado y longitud efectiva; verifique de nuevo si cualquiera cambia.'] },
    faqTitle: 'Preguntas frecuentes',
    faq: [['¿Qué es la compensación en una plegadora?', 'Es una corrección controlada en la bancada o viga inferior que contrarresta la flexión del pisón y la mesa durante el plegado.'], ['¿Por qué hace falta en pliegues largos?', 'La carga total mayor produce diferencias visibles entre el ángulo del centro y el de los extremos si no se compensa.'], ['¿Qué causa ángulos desiguales?', 'Flexión del bastidor, compensación incorrecta, utillaje desigual, variación del material, carga descentrada o mala puesta a punto.'], ['¿Compensación mecánica o hidráulica?', 'La mecánica posiciona cuñas; la hidráulica aplica presión de apoyo programable. Ambas pueden ser precisas con mantenimiento correcto.'], ['¿Puede corregir todos los problemas angulares?', 'No. No sustituye un utillaje correcto, material estable, rigidez suficiente, alineación ni buenos parámetros.'], ['¿Cómo se ajusta correctamente?', 'Use una tabla inicial validada, realice una prueba completa, mida centro y extremos y ajuste de forma incremental.']],
    relatedTitle: 'Herramientas de ingeniería relacionadas', relatedAria: 'Herramientas de ingeniería relacionadas',
    relatedLabels: { pressBrakeCalculator: 'Calculadora de plegadora', materialDatabase: 'Base de datos de materiales', vDieSelectionTool: 'Selección de matriz V', insideRadiusGuide: 'Guía de radio interior', springbackDatabase: 'Base de datos de retorno elástico', bendAllowanceCalculator: 'Calculadora de desarrollo de plegado', bendDeductionGuide: 'Guía de deducción de plegado', airBendingGuide: 'Guía de plegado al aire', pressBrakeTonnageGuide: 'Guía de tonelaje para plegadoras', vDieOpeningGuide: 'Selección de abertura de matriz V', minimumFlangeLengthGuide: 'Guía de longitud mínima de pestaña', toolingSelectionGuide: 'Guía de selección de utillaje', crowningGuide: 'Guía de compensación de flecha', stainlessSteelBendingGuide: 'Guía de plegado de acero inoxidable', aluminumBendingGuide: 'Guía de plegado de aluminio' },
    diagram: { eyebrow: 'Diagrama de compensación', title: 'Flexión en plegado largo y respuesta de compensación', svgTitle: 'Diagrama de compensación de flecha de plegadora', svgDescription: 'Comparación de un pliegue largo sin compensación y con error central frente a uno compensado con ángulo uniforme.', without: 'Sin compensación', with: 'Con compensación', centerError: 'Error angular central', deflection: 'Flexión de pisón y bancada', compensation: 'Soporte de contracurva', consistent: 'Ángulo uniforme en la longitud', loadPath: 'CONTROL DE CARGA', caption: 'La compensación se define con el tonelaje real, la luz del utillaje y la longitud de plegado.' },
  },
  tr: {
    back: '← Mühendislik araçlarına dön', eyebrow: 'Mühendislik Kılavuzu', title: 'Abkant pres sehim kompanzasyonu kılavuzu', subtitle: 'Uzun bükümlerde makine sehimini dengelemek ve boy boyunca tutarlı açı elde etmek için mühendislik referansı.', seoDescription: 'Abkant pres sehim kompanzasyonu; mekanik ve hidrolik sistemler, uzun büküm açı doğruluğu, teşhis ve CNC ayarı için mühendislik kılavuzu.', keywords: 'abkant pres sehim kompanzasyonu, mekanik taçlandırma, hidrolik kompanzasyon, uzun büküm doğruluğu, CNC açı ayarı',
    what: { title: 'Abkant pres sehim kompanzasyonu nedir', text: 'Uzun bir bükümde yük, üst tabla ile alt tablayı zıt yönlerde sehimlendirir. Takım merkezde saca uçlara göre daha az nüfuz eder ve orta açı çoğunlukla daha açık kalır. Kompanzasyon, alt kirişte kontrollü bir karşı eğri veya destek kuvveti oluşturarak etkili nüfuzu büküm boyunca eşitler.' },
    why: { title: 'Kompanzasyon neden önemlidir', cards: [['Açı tutarlılığı', 'Doğru kompanzasyon uzun panel ve kapılarda merkez ile uçlar arasındaki açı farkını sınırlar.'], ['Üretim kararlılığı', 'Doğrulanmış değer, sürekli operatör düzeltmesi yerine seri tekrarlanabilirliğini artırır.'], ['Daha az yeniden işleme', 'Eşit bükümler düzeltme vuruşlarını, uzun parça reddini ve montaj uyumsuzluğunu azaltır.'], ['CNC doğruluğu', 'Programlanmış kompanzasyon komut açısının kullanılabilir boy boyunca uygulanmasına yardımcı olur.']] },
    systems: { title: 'Mekanik ve hidrolik kompanzasyon', intro: 'İki sistem de gövde sehimini dengeler; tahrik, tepki ve bakım profilleri farklıdır.', headers: ['Sistem', 'Kontrol ve hassasiyet', 'Bakım ve kararlılık'], rows: [['Mekanik kama sistemi', 'Karşılıklı kamalar tekrarlanabilir tabla eğrisi oluşturur; CNC tahriki ince konumlandırma sağlar.', 'Hidrolik bağımlılığı düşüktür ve uzun dönem tekrarı güçlüdür; sürtünme yüzeyleri temiz ve kalibre tutulmalıdır.'], ['Hidrolik kompanzasyon', 'Tabla altı silindirler CNC komutuyla destek basıncı oluşturur ve iş değişimine hızlı yanıt verir.', 'Programlanabilir tepkisi yüksektir; yağ, conta, sensör ve basınç dengesi kararlılığı etkiler.']] },
    accuracy: { title: 'Büküm doğruluğuna etkisi', text: 'Gerekli kompanzasyon yalnızca boya değil gerçek yük dağılımına bağlıdır. Kalınlık veya malzeme dayanımı arttığında tonaj ve gövde sehimi artar. Daha dar V açıklığı yükü artırır; parçalı ya da eşit olmayan takım dağılımı değiştirir. Bu nedenle ayar malzeme, kalınlık, V açıklığı, tonaj, büküm boyu ve makine rijitliği ile eşleştirilmelidir.' },
    problems: { title: 'Yaygın kompanzasyon sorunları', cards: [['Eksik kompanzasyon', 'Düzeltme gerçek sehimden düşük olduğunda merkez uçlardan daha açık kalır.'], ['Aşırı kompanzasyon', 'Düzeltme fazla olduğunda merkez uçlardan daha kapalı oluşur.'], ['Düzensiz açı profili', 'Merkez dışı yük, kirli veya uyumsuz takım ve dengesiz destek boy boyunca sapma yaratabilir.'], ['Ayar ve malzeme hataları', 'Yanlış takım, kalınlık veya dayanım değişimi ve aşırı operatör ayarı kompanzasyon arızası gibi görünebilir.']] },
    adjustment: { title: 'Kompanzasyon ayar ipuçları', steps: ['Kompanzasyonu değiştirmeden önce takım hizasını, V açıklığını, kalınlığı, malzeme partisini ve büküm boyunu doğrulayın.', 'Seçili tonaj ve geometri için CNC tablosundan veya onaylanmış iş kaydından başlayın.', 'Tam boy deneme bükümü yapın ve uçlar ile merkezde açıları aynı yöntemle ölçün.', 'Merkez açık kalıyorsa küçük adımlarla artırın; fazla kapalıysa azaltın.', 'Kabul edilen değeri malzeme, kalınlık, V açıklığı, boy ve takım bilgisiyle kaydedin.'] },
    notes: { title: 'Mühendislik notları', items: ['Kompanzasyon, esnek gövdeyi, hasarlı takımı, kötü hizalamayı veya tutarsız malzemeyi gideren evrensel bir çözüm değildir.', 'Makine rijitliği ve doğru yük sınıfındaki hassas takım uzun büküm doğruluğunun temeli olmaya devam eder.', 'Ayarı malzeme verisi, V açıklığı, hesaplanan tonaj ve etkin büküm boyuyla birlikte kullanın; bunlar değişirse kayıtlı değeri yeniden kontrol edin.'] },
    faqTitle: 'Sık sorulan sorular',
    faq: [['Abkant preste kompanzasyon nedir?', 'Büküm sırasında üst ve alt tablanın sehimini dengeleyen, alt tabla veya kirişte kontrollü düzeltmedir.'], ['Uzun bükümler için neden gereklidir?', 'Toplam yük arttığından, kompanzasyon olmadan merkez ile uçlar arasındaki açı farkı görünür hale gelir.'], ['Düzensiz büküm açıları neden oluşur?', 'Gövde sehimi, yanlış düzeltme, eşit olmayan takım, malzeme değişimi, merkez dışı yük ve kötü kurulum neden olabilir.'], ['Mekanik mi hidrolik mi?', 'Mekanik sistem kamaları konumlandırır; hidrolik sistem programlanabilir destek basıncı uygular. Bakımlı iken ikisi de hassas olabilir.'], ['Tüm açı problemlerini düzeltir mi?', 'Hayır. Doğru takım, kararlı malzeme, yeterli rijitlik, hizalama ve doğru proses ayarlarının yerini tutmaz.'], ['Doğru ayar nasıl yapılır?', 'Doğrulanmış bir başlangıç tablosu kullanın, tam boy deneme bükümü ölçün ve küçük adımlarla kayıtlı üretim değerine ulaşın.']],
    relatedTitle: 'İlgili mühendislik araçları', relatedAria: 'İlgili mühendislik araçları',
    relatedLabels: { pressBrakeCalculator: 'Abkant pres hesaplayıcısı', materialDatabase: 'Malzeme veritabanı', vDieSelectionTool: 'V kalıp seçim aracı', insideRadiusGuide: 'İç radyüs kılavuzu', springbackDatabase: 'Geri esneme veritabanı', bendAllowanceCalculator: 'Büküm payı hesaplayıcısı', bendDeductionGuide: 'Büküm Düşümü Kılavuzu', airBendingGuide: 'Havada bükme kılavuzu', pressBrakeTonnageGuide: 'Abkant pres tonaj kılavuzu', vDieOpeningGuide: 'V kalıp açıklığı seçimi', minimumFlangeLengthGuide: 'Minimum Flanş Boyu Kılavuzu', toolingSelectionGuide: 'Abkant pres takım seçimi kılavuzu', crowningGuide: 'Abkant pres sehim kompanzasyonu kılavuzu', stainlessSteelBendingGuide: 'Paslanmaz Çelik Büküm Kılavuzu', aluminumBendingGuide: 'Alüminyum Büküm Kılavuzu' },
    diagram: { eyebrow: 'Kompanzasyon şeması', title: 'Uzun büküm sehimi ve kompanzasyon tepkisi', svgTitle: 'Abkant pres sehim kompanzasyonu şeması', svgDescription: 'Merkez açı hatası bulunan kompanzasyonsuz uzun büküm ile düzgün açılı kompanzasyonlu bükümün karşılaştırması.', without: 'Kompanzasyonsuz', with: 'Kompanzasyonlu', centerError: 'Merkez açı hatası', deflection: 'Üst ve alt tabla sehimi', compensation: 'Karşı eğri desteği', consistent: 'Boy boyunca tutarlı açı', loadPath: 'YÜK YOLU KONTROLÜ', caption: 'Kompanzasyon gerçek tonaj, takım açıklığı ve büküm boyuna göre ayarlanır.' },
  },
  id: {
    back: '← Kembali ke alat teknik', eyebrow: 'Panduan Teknik', title: 'Panduan kompensasi lendutan press brake', subtitle: 'Referensi teknik untuk mengimbangi lendutan mesin dan menjaga sudut seragam pada tekukan panjang.', seoDescription: 'Panduan teknik kompensasi lendutan press brake, sistem mekanis dan hidrolik, akurasi tekukan panjang, diagnosis, dan penyetelan CNC.', keywords: 'kompensasi lendutan press brake, crowning mekanis, crowning hidrolik, akurasi tekukan panjang, penyetelan CNC',
    what: { title: 'Apa itu kompensasi lendutan press brake', text: 'Saat menekuk panjang, beban melendutkan ram dan meja ke arah yang berlawanan. Perkakas di tengah menekan plat lebih sedikit daripada di ujung sehingga sudut tengah biasanya lebih terbuka. Kompensasi menciptakan lengkung balik atau gaya dukung terkendali pada balok bawah agar penetrasi efektif merata sepanjang tekukan.' },
    why: { title: 'Mengapa kompensasi penting', cards: [['Keseragaman sudut', 'Kompensasi yang benar membatasi selisih sudut tengah dan ujung pada panel atau pintu panjang.'], ['Stabilitas produksi', 'Nilai yang telah diverifikasi meningkatkan pengulangan batch tanpa koreksi operator berulang.'], ['Mengurangi pengerjaan ulang', 'Tekukan seragam mengurangi langkah koreksi, produk panjang yang ditolak, dan ketidakcocokan perakitan.'], ['Akurasi CNC', 'Kompensasi terprogram membantu mesin menghasilkan sudut perintah sepanjang area kerja.']] },
    systems: { title: 'Kompensasi mekanis dibanding hidrolik', intro: 'Keduanya menanggulangi lendutan rangka, tetapi penggerak, respons, dan perawatannya berbeda.', headers: ['Sistem', 'Kontrol dan presisi', 'Perawatan dan stabilitas'], rows: [['Baji mekanis', 'Pasangan baji menghasilkan kurva meja yang berulang; penggerak CNC dapat memosisikannya dengan halus.', 'Ketergantungan hidrolik rendah dan pengulangan jangka panjang kuat; permukaan geser perlu bersih dan terkalibrasi.'], ['Kompensasi hidrolik', 'Silinder di bawah meja menghasilkan tekanan dukung atas perintah CNC dan cepat menanggapi perubahan pekerjaan.', 'Respons pemrograman sangat baik; oli, seal, sensor, dan keseimbangan tekanan memengaruhi stabilitas.']] },
    accuracy: { title: 'Pengaruh terhadap akurasi bending', text: 'Kompensasi yang diperlukan mengikuti distribusi beban nyata, bukan panjang saja. Ketebalan atau kekuatan material lebih besar meningkatkan tonase dan lendutan rangka. Bukaan V yang lebih kecil juga menaikkan beban, sementara tooling bersegmen atau tidak seragam mengubah distribusinya. Karena itu penyetelan harus sesuai material, ketebalan, bukaan V, tonase, panjang tekuk, dan kekakuan mesin.' },
    problems: { title: 'Masalah kompensasi yang umum', cards: [['Kompensasi kurang', 'Tengah tetap lebih terbuka daripada ujung bila koreksi di bawah lendutan aktual.'], ['Kompensasi berlebih', 'Tengah menjadi lebih tertutup daripada ujung bila koreksi terlalu besar.'], ['Profil sudut tidak merata', 'Beban tidak di tengah, tooling kotor atau tidak cocok, dan dukungan tak seimbang dapat menimbulkan variasi sepanjang tekukan.'], ['Kesalahan setup dan material', 'Tooling salah, perubahan ketebalan atau kekuatan, serta koreksi operator berlebih dapat tampak seperti kerusakan kompensasi.']] },
    adjustment: { title: 'Kiat penyetelan kompensasi', steps: ['Pastikan kesejajaran tooling, bukaan V, ketebalan, batch material, dan panjang tekuk sebelum mengubah kompensasi.', 'Mulai dari tabel kompensasi CNC atau catatan pekerjaan yang terbukti untuk tonase dan geometri tersebut.', 'Lakukan tekuk uji sepanjang penuh dan ukur sudut di kedua ujung serta tengah dengan metode konsisten.', 'Tambah kompensasi sedikit demi sedikit bila tengah terlalu terbuka; kurangi bila tengah terlalu rapat.', 'Catat nilai yang diterima bersama material, ketebalan, bukaan V, panjang tekuk, dan tooling.'] },
    notes: { title: 'Catatan teknik', items: ['Kompensasi bukan solusi untuk rangka yang terlalu lentur, tooling rusak, penyelarasan buruk, atau material yang tidak konsisten.', 'Kekakuan mesin dan tooling presisi dengan kapasitas tepat tetap menjadi dasar akurasi tekukan panjang.', 'Gunakan kompensasi bersama data material, bukaan V, tonase terhitung, dan panjang efektif; periksa ulang nilai tersimpan bila input berubah.'] },
    faqTitle: 'Pertanyaan yang sering diajukan',
    faq: [['Apa itu kompensasi pada press brake?', 'Ini adalah koreksi terkendali pada meja atau balok bawah yang mengimbangi lendutan ram dan meja ketika menekuk.'], ['Mengapa diperlukan untuk tekukan panjang?', 'Beban total lebih besar membuat perbedaan sudut tengah dan ujung terlihat bila lendutan rangka tidak dikompensasi.'], ['Apa penyebab sudut tekuk tidak merata?', 'Lendutan rangka, kompensasi salah, tooling tidak seragam, variasi material, beban tidak di tengah, dan setup buruk.'], ['Mekanis atau hidrolik?', 'Sistem mekanis memosisikan profil baji; sistem hidrolik memberi tekanan dukung terprogram. Keduanya akurat bila terawat.'], ['Dapatkah kompensasi memperbaiki semua masalah sudut?', 'Tidak. Kompensasi tidak menggantikan tooling yang tepat, material stabil, kekakuan cukup, keselarasan, atau parameter proses yang benar.'], ['Bagaimana menyetelnya dengan benar?', 'Gunakan tabel awal terverifikasi, lakukan tekuk uji penuh, ukur tengah dan ujung, lalu sesuaikan sedikit demi sedikit dan dokumentasikan.']],
    relatedTitle: 'Alat teknik terkait', relatedAria: 'Alat teknik terkait',
    relatedLabels: { pressBrakeCalculator: 'Kalkulator press brake', materialDatabase: 'Database material', vDieSelectionTool: 'Alat pemilihan V-die', insideRadiusGuide: 'Panduan radius dalam', springbackDatabase: 'Database springback', bendAllowanceCalculator: 'Kalkulator bend allowance', bendDeductionGuide: 'Panduan Bend Deduction', airBendingGuide: 'Panduan tekuk udara', pressBrakeTonnageGuide: 'Panduan tonase press brake', vDieOpeningGuide: 'Pemilihan bukaan cetakan V', minimumFlangeLengthGuide: 'Panduan Panjang Flange Minimum', toolingSelectionGuide: 'Panduan pemilihan perkakas mesin tekuk', crowningGuide: 'Panduan kompensasi lendutan press brake', stainlessSteelBendingGuide: 'Panduan Tekuk Stainless Steel', aluminumBendingGuide: 'Panduan Tekuk Aluminium' },
    diagram: { eyebrow: 'Diagram kompensasi', title: 'Lendutan tekukan panjang dan respons kompensasi', svgTitle: 'Diagram kompensasi lendutan press brake', svgDescription: 'Perbandingan tekukan panjang tanpa kompensasi dengan galat sudut tengah dan tekukan terkompensasi dengan sudut seragam.', without: 'Tanpa kompensasi', with: 'Dengan kompensasi', centerError: 'Galat sudut tengah', deflection: 'Lendutan ram dan meja', compensation: 'Dukungan lengkung balik', consistent: 'Sudut seragam sepanjang tekukan', loadPath: 'KONTROL JALUR BEBAN', caption: 'Kompensasi disetel berdasarkan tonase nyata, bentang tooling, dan panjang tekuk.' },
  },
}

const createStructuredData = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: content.en.title,
      description: content.en.seoDescription,
      url: getSiteUrl(routePath),
      isPartOf: {
        '@type': 'WebSite',
        name: 'ZYCO Engineering Hub',
        url: getSiteUrl('/engineering-tools'),
      },
    },
    {
      '@type': 'TechArticle',
      headline: content.en.title,
      description: content.en.seoDescription,
      author: { '@type': 'Organization', name: 'ZYCO' },
      publisher: { '@type': 'Organization', name: 'ZYCO', url: getSiteUrl('/') },
      mainEntityOfPage: getSiteUrl(routePath),
    },
    {
      '@type': 'FAQPage',
      mainEntity: content.en.faq.map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
  ],
})

function Card({ title, text }) {
  return (
    <article className='zyco-crowning__card'>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}

export default function PressBrakeCrowningGuide({
  language = 'en',
  setLanguage = () => {},
}) {
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
      id: 'press-brake-crowning-guide-jsonld',
      data: createStructuredData(),
    })
  }, [])

  return (
    <>
      <style>
        {`
          .zyco-crowning {
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
          .zyco-crowning::before {
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
          .zyco-crowning__shell { width: min(1180px, 100%); margin: 0 auto; position: relative; z-index: 1; }
          .zyco-crowning__hero {
            padding: 38px 36px; margin-bottom: 22px; border: 1px solid rgba(191,219,254,0.2);
            border-radius: 30px; background: linear-gradient(145deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06));
            backdrop-filter: blur(16px); box-shadow: 0 28px 68px rgba(2,8,23,0.2);
          }
          .zyco-crowning__back, .zyco-crowning__tool {
            display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; text-decoration: none;
            color: #ffffff; font-size: 15px; font-weight: 800; transition: all .25s ease;
          }
          .zyco-crowning__back {
            width: fit-content; max-width: min(100%, 460px); min-height: 44px; margin: 0 0 22px; padding: 0 16px;
            border: 1px solid rgba(147,197,253,0.46); border-radius: 999px;
            background: linear-gradient(145deg, rgba(15,23,42,0.34), rgba(37,99,235,0.12)); color: #bfdbfe;
          }
          .zyco-crowning__back:hover { transform: translateY(-2px); border-color: rgba(125,211,252,0.7); color: #fff; background: rgba(37,99,235,0.42); box-shadow: 0 14px 32px rgba(37,99,235,0.32), 0 0 0 1px rgba(125,211,252,0.16); }
          .zyco-crowning__eyebrow { margin: 0; color: #7dd3fc; font-size: 12px; font-weight: 800; letter-spacing: .2em; text-transform: uppercase; }
          .zyco-crowning__title { max-width: 900px; margin: 14px 0 18px; font-size: clamp(34px, 5vw, 54px); line-height: 1.08; letter-spacing: -.05em; }
          .zyco-crowning__subtitle { max-width: 830px; margin: 0; color: #dbeafe; font-size: 18px; line-height: 1.72; }
          .zyco-crowning__panel {
            padding: 28px; margin-top: 18px; border: 1px solid rgba(191,219,254,0.16); border-radius: 25px;
            background: rgba(10,30,61,0.48); backdrop-filter: blur(12px);
          }
          .zyco-crowning__section-title { margin: 0 0 14px; color: #fff; font-size: 25px; letter-spacing: -.035em; }
          .zyco-crowning__copy { margin: 0; color: #cbd5e1; font-size: 16px; line-height: 1.75; }
          .zyco-crowning__grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
          .zyco-crowning__cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: 16px; }
          .zyco-crowning__card, .zyco-crowning__item {
            padding: 18px; border: 1px solid rgba(191,219,254,0.13); border-radius: 18px; background: rgba(30,64,112,0.34);
          }
          .zyco-crowning__card h3, .zyco-crowning__item h3 { margin: 0 0 8px; color: #eff6ff; font-size: 16px; }
          .zyco-crowning__card p { margin: 0; color: #bfdbfe; font-size: 14px; line-height: 1.65; }
          .zyco-crowning__table-wrap { overflow-x: auto; border: 1px solid rgba(191,219,254,0.16); border-radius: 18px; margin-top: 18px; }
          .zyco-crowning__table { width: 100%; min-width: 680px; border-collapse: collapse; }
          .zyco-crowning__table th, .zyco-crowning__table td { padding: 14px 16px; border-bottom: 1px solid rgba(191,219,254,0.1); text-align: left; }
          .zyco-crowning__table th { color: #bae6fd; background: rgba(30,64,112,0.38); font-size: 13px; }
          .zyco-crowning__table td { color: #e2e8f0; font-size: 14px; line-height: 1.55; }
          .zyco-crowning__list, .zyco-crowning__faq { display: grid; gap: 12px; padding: 0; margin: 0; list-style: none; }
          .zyco-crowning__list li, .zyco-crowning__faq article {
            padding: 17px 20px; border: 1px solid rgba(191,219,254,0.12); border-radius: 18px; background: rgba(30,64,112,0.3);
          }
          .zyco-crowning__tools { display: flex; flex-wrap: wrap; gap: 12px; }
          .zyco-crowning__tool {
            min-height: 46px; padding: 0 18px; border: 1px solid rgba(147,197,253,0.38); border-radius: 14px;
            color: #dbeafe; background: rgba(30,64,175,0.32); box-shadow: none;
          }
          .zyco-crowning__tool:hover { transform: translateY(-4px); border-color: rgba(125,211,252,0.7); color: #fff; background: rgba(37,99,235,0.4); box-shadow: 0 14px 30px rgba(56,189,248,0.22), 0 7px 22px rgba(2,8,23,0.22); }
          @media (max-width: 840px) { .zyco-crowning__grid, .zyco-crowning__cards { grid-template-columns: 1fr; } }
          @media (max-width: 760px) {
            .zyco-crowning { padding: 22px 14px; }
            .zyco-crowning__hero, .zyco-crowning__panel { padding: 22px; border-radius: 22px; }
            .zyco-crowning__subtitle { font-size: 16px; }
          }
          @media (max-width: 640px) { .zyco-crowning__back, .zyco-crowning__tool { width: 100%; } }
        `}
      </style>
      <main className='zyco-crowning'>
        <div className='zyco-crowning__shell'>
          <header className='zyco-crowning__hero'>
            <a className='zyco-crowning__back' href='/engineering' aria-label={page.back}>{page.back}</a>
            <LanguageSwitcher className='zyco-page-language-switcher' language={language} setLanguage={setLanguage} />
            <p className='zyco-crowning__eyebrow'>{page.eyebrow}</p>
            <h1 className='zyco-crowning__title'>{page.title}</h1>
            <p className='zyco-crowning__subtitle'>{page.subtitle}</p>
          </header>

          <section className='zyco-crowning__panel' aria-labelledby='crowning-what'>
            <h2 className='zyco-crowning__section-title' id='crowning-what'>{page.what.title}</h2>
            <p className='zyco-crowning__copy'>{page.what.text}</p>
          </section>

          <CrowningDiagram labels={page.diagram} />

          <section className='zyco-crowning__panel' aria-labelledby='crowning-why'>
            <h2 className='zyco-crowning__section-title' id='crowning-why'>{page.why.title}</h2>
            <div className='zyco-crowning__cards'>
              {page.why.cards.map(([title, text]) => <Card key={title} title={title} text={text} />)}
            </div>
          </section>

          <section className='zyco-crowning__panel' aria-labelledby='crowning-systems'>
            <h2 className='zyco-crowning__section-title' id='crowning-systems'>{page.systems.title}</h2>
            <p className='zyco-crowning__copy'>{page.systems.intro}</p>
            <div className='zyco-crowning__table-wrap'>
              <table className='zyco-crowning__table'>
                <thead><tr>{page.systems.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
                <tbody>{page.systems.rows.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
          </section>

          <div className='zyco-crowning__grid'>
            <section className='zyco-crowning__panel' aria-labelledby='crowning-accuracy'>
              <h2 className='zyco-crowning__section-title' id='crowning-accuracy'>{page.accuracy.title}</h2>
              <p className='zyco-crowning__copy'>{page.accuracy.text}</p>
            </section>
            <section className='zyco-crowning__panel' aria-labelledby='crowning-problems'>
              <h2 className='zyco-crowning__section-title' id='crowning-problems'>{page.problems.title}</h2>
              <div className='zyco-crowning__cards'>
                {page.problems.cards.map(([title, text]) => <Card key={title} title={title} text={text} />)}
              </div>
            </section>
          </div>

          <div className='zyco-crowning__grid'>
            <section className='zyco-crowning__panel' aria-labelledby='crowning-adjustment'>
              <h2 className='zyco-crowning__section-title' id='crowning-adjustment'>{page.adjustment.title}</h2>
              <ol className='zyco-crowning__list'>
                {page.adjustment.steps.map((step) => <li className='zyco-crowning__copy' key={step}>{step}</li>)}
              </ol>
            </section>
            <section className='zyco-crowning__panel' aria-labelledby='crowning-notes'>
              <h2 className='zyco-crowning__section-title' id='crowning-notes'>{page.notes.title}</h2>
              <ul className='zyco-crowning__list'>
                {page.notes.items.map((note) => <li className='zyco-crowning__copy' key={note}>{note}</li>)}
              </ul>
            </section>
          </div>

          <section className='zyco-crowning__panel' aria-labelledby='crowning-faq'>
            <h2 className='zyco-crowning__section-title' id='crowning-faq'>{page.faqTitle}</h2>
            <div className='zyco-crowning__faq'>
              {page.faq.map(([question, answer]) => (
                <article key={question}>
                  <h3>{question}</h3>
                  <p className='zyco-crowning__copy'>{answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section className='zyco-crowning__panel' aria-labelledby='crowning-related'>
            <h2 className='zyco-crowning__section-title' id='crowning-related'>{page.relatedTitle}</h2>
            <nav className='zyco-crowning__tools' aria-label={page.relatedAria}>
              {relatedTools.map(([key, href]) => (
                <a className='zyco-crowning__tool' href={href} key={key}>{page.relatedLabels[key] || sharedText.relatedTools[key]}</a>
              ))}
            </nav>
          </section>
        </div>
      </main>
    </>
  )
}
