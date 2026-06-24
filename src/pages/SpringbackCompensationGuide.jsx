import { useEffect } from 'react'
import LanguageSwitcher from '../components/LanguageSwitcher.jsx'
import EngineeringCTA from '../components/EngineeringCTA.jsx'
import {
  ZYCO_PUBLISHER,
  createFAQPageStructuredData,
  getSiteUrl,
  setPageSEO,
  setStructuredData,
} from '../utils/seo.js'

const routePath = '/engineering-tools/springback-compensation-guide'

const relatedTools = [
  ['pressBrakeCalculator', '/engineering-tools/press-brake-calculator'],
  ['bendAllowanceCalculator', '/engineering-tools/bend-allowance-calculator'],
  ['kFactorGuide', '/engineering-tools/k-factor-guide'],
  ['bendDeductionGuide', '/engineering-tools/bend-deduction-guide'],
  ['materialDatabase', '/engineering-tools/material-database'],
  ['springbackDatabase', '/engineering-tools/springback-database'],
  ['springbackCompensationGuide', routePath],
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
  ['aluminumBendingGuide', '/engineering-tools/aluminum-bending-guide'],
]

const content = {
  en: {
    back: '\u2190 Back to Engineering Tools',
    eyebrow: 'Engineering Guide',
    title: 'Springback Compensation Guide',
    subtitle: 'Learn how sheet metal springback compensation is applied in real press brake production through angle correction, press brake overbending, tooling choices and verified trial bends.',
    what: {
      title: 'What Is Springback Compensation?',
      text: 'Springback compensation is the controlled adjustment made before unloading so a formed sheet relaxes close to its specified angle. Unlike a springback database, which supplies experience-based reference values, this guide explains how to apply those references through press brake angle correction and production verification.',
    },
    why: {
      title: 'Why Springback Happens',
      text: 'During bending, part of the material deforms plastically while part remains elastically stressed. When the punch releases, elastic recovery opens the angle. Air bending springback is especially visible because the sheet is not forced fully into a die angle. Higher strength, changed radius or changed restraint can alter that recovery.',
    },
    factorsTitle: 'Factors Affecting Springback',
    factors: ['Material grade', 'Yield strength', 'Tensile strength', 'Sheet thickness', 'V-opening', 'Inside radius', 'Bend angle', 'Grain direction', 'Part length', 'Tooling wear', 'Machine rigidity', 'Bending method'],
    principle: {
      title: 'Springback Compensation Principle',
      text: 'Springback is not a fixed value. Theoretical or database values are starting references only. For a 90 degree target bend, if experience indicates approximately 2 degrees of recovery, the press brake may usually form to approximately 88 degrees so the released part returns close to 90 degrees. The final correction must be confirmed by trial bending with the production material, tools and machine.',
    },
    diagram: {
      title: 'Compensated Angle to Final Angle',
      intro: 'A lightweight production sequence: overbend, unload, then measure the recovered angle.',
      svgTitle: 'Animated springback compensation sequence',
      svgDescription: 'Three CAD-style stages showing a sheet formed to a compensated 88 degree angle, released from the punch, and recovered close to a final 90 degree target.',
      step1: 'Compensated Angle',
      step2: 'Punch Release',
      step3: 'Final Angle',
      target: 'Target Angle',
      springback: 'Springback',
      recovery: 'Material Recovery',
    },
    methods: {
      title: 'Practical Compensation Methods',
      cards: [
        ['Angle overbending', 'Program a slightly tighter angle than the target, then establish the accepted correction from measured trial pieces.'],
        ['CNC angle correction', 'Use controller correction or an angle measurement system to refine the programmed stroke for the actual batch.'],
        ['Trial bending', 'Bend a coupon or first-off part with production tooling, measure it after unloading and adjust before releasing the batch.'],
        ['Material database reference', 'Use strength and grade data to select a sensible first setup; it cannot replace measurement.'],
        ['Springback database reference', 'Start with experience-based recovery ranges, then qualify them for thickness, radius, V-opening and bend method.'],
        ['V-die adjustment', 'Changing V-opening changes natural radius, force and sheet metal bending springback; re-verify angle and flange feasibility.'],
        ['Tooling condition check', 'Worn shoulders, damaged punches or inconsistent seating can make press brake tooling compensation unstable.'],
      ],
    },
    materials: {
      title: 'Material-Based Compensation Notes',
      cards: [
        ['Mild steel', 'Often gives a stable baseline for routine air bends, but grade and batch variation still require first-off confirmation.'],
        ['Stainless steel', 'Usually needs greater attention than mild steel because stronger elastic recovery often requires more bending angle compensation.'],
        ['Aluminum', 'Alloy and temper strongly influence recovery and crack risk; do not transfer one correction blindly between tempers.'],
        ['High-strength steel', 'Use conservative correction steps, suitable radii and carefully selected V dies because high strength raises recovery and tooling demand.'],
      ],
    },
    production: {
      title: 'Real Press Brake Production Advice',
      items: [
        'Record qualified correction with grade, heat or batch, thickness, grain direction, V-opening, punch radius, method and machine.',
        'Recheck correction when a coil or material batch changes; material sold under the same grade can still bend differently.',
        "For stainless steel bending, many fabricators use 80°-82° punches and dies to help compensate for the material's higher springback. Compared with standard-angle tooling, acute-angle tooling can reduce the amount of angle correction required during production, although the final selection should still be verified by material grade, thickness and bending method.",
        'For precision bends, use a measured trial bend before production and verify again after tool changes or maintenance.',
        'Treat CNC press brake springback correction as an iterative process that combines material, tooling, machine response and inspection results.',
        'Do not solve an angle problem by overbending alone when the tooling is worn, the V opening is unsuitable or machine deflection is contributing.',
      ],
    },
    faqTitle: 'Frequently Asked Questions',
    faq: [
      ['What is springback compensation in press brake bending?', 'It is an intentional forming adjustment that accounts for elastic recovery after unloading so the finished bend reaches the required angle more closely.'],
      ['How do you compensate springback in sheet metal bending?', 'Start from material and tooling references, apply a controlled overbend or CNC angle correction, measure a trial bend and refine the setting.'],
      ['Why does stainless steel spring back more than mild steel?', 'Stainless steel commonly has higher strength and stronger elastic recovery, so an air-bent angle often opens more after unloading.'],
      ['Does V-opening affect springback?', 'Yes. V-opening changes the natural inside radius, forming force and strain distribution, so angle correction should be checked after a V-die change.'],
      ['Is springback compensation the same for all materials?', 'No. Grade, temper, thickness, strength, rolling direction and bending method all change the practical compensation.'],
      ['Why is trial bending still necessary?', 'Reference values cannot capture the exact material batch, tooling condition, machine response and dimensional tolerance of a real job.'],
    ],
    relatedTitle: 'Related Engineering Tools',
    relatedAria: 'Related engineering tools',
    relatedLabels: {
      pressBrakeCalculator: 'Press Brake Calculator', bendAllowanceCalculator: 'Bend Allowance Calculator', materialDatabase: 'Material Database', springbackDatabase: 'Springback Database', springbackCompensationGuide: 'Springback Compensation Guide', vDieSelectionTool: 'V Die Selection Tool', insideRadiusGuide: 'Inside Radius Guide', airBendingGuide: 'Air Bending Guide', bottomingVsCoiningGuide: 'Bottoming vs Coining Guide', bendSequenceGuide: 'Bend Sequence Guide', pressBrakeTonnageGuide: 'Press Brake Tonnage Guide', vDieOpeningGuide: 'V-Opening Guide', toolingSelectionGuide: 'Tooling Selection Guide', crowningGuide: 'Crowning Guide', stainlessSteelBendingGuide: 'Stainless Steel Guide', aluminumBendingGuide: 'Aluminum Guide', minimumFlangeLengthGuide: 'Minimum Flange Guide', bendDeductionGuide: 'Bend Deduction Guide', kFactorGuide: 'K-Factor Guide',
    },
  },
  zh: {
    back: '\u2190 返回工程工具中心', eyebrow: '工程指南', title: '回弹补偿指南',
    subtitle: '说明实际折弯生产中如何通过角度修正、过弯补偿、模具选择和试折确认实施钣金回弹补偿。',
    what: { title: '什么是回弹补偿？', text: '回弹补偿是在卸载前对成形角度进行有控制的调整，使板材释放后接近图纸要求的角度。回弹数据库提供按材料整理的经验参考值，而本指南关注如何将参考值落实到折弯机角度修正与生产验证。' },
    why: { title: '为什么会发生回弹', text: '折弯过程中，材料一部分产生塑性变形，另一部分仍保留弹性应力。冲头回程卸载后，弹性恢复会使角度张开。空气折弯没有将板材完全压入固定模角，因此对材料强度、半径和约束变化更敏感。' },
    factorsTitle: '影响回弹的因素',
    factors: ['材料牌号', '屈服强度', '抗拉强度', '板厚', 'V 开口', '内 R 角', '折弯角度', '轧制纹向', '工件长度', '模具磨损', '设备刚性', '折弯方式'],
    principle: { title: '回弹补偿原理', text: '回弹不是固定值，理论值或数据库数值只能作为初始参考。例如目标角度为 90 度时，如果经验判断卸载后约回弹 2 度，折弯机通常可以先成形至约 88 度，使工件释放后回到接近 90 度。最终修正量必须使用生产材料、实际模具和设备进行试折确认。' },
    diagram: { title: '补偿角度到最终角度', intro: '轻量工程演示：先过弯、再卸载、最后测量恢复后的角度。', svgTitle: '回弹补偿动画示意图', svgDescription: '三阶段展示板材先折至补偿角 88 度，冲头释放后产生回弹，最后接近目标角 90 度。', step1: '补偿角度', step2: '冲头释放', step3: '最终角度', target: '目标角度', springback: '回弹', recovery: '材料恢复' },
    methods: { title: '实际补偿方法', cards: [['过弯补偿', '程序中先采用略小于目标的角度，并以实测试折件确定合格修正量。'], ['CNC 角度修正', '使用控制系统修正或角度测量反馈，针对当前材料批次微调滑块行程。'], ['试折确认', '用生产模具试折样件或首件，卸载测量后再放行批量生产。'], ['材料数据库参考', '根据牌号和强度选择合理初始设定，但不能替代测量。'], ['回弹数据库参考', '先采用经验回弹范围，再结合板厚、半径、V 开口和折弯方式确认。'], ['V 模调整', 'V 开口变化会改变自然内半径、吨位和回弹，调整后必须重新验证角度与翻边条件。'], ['模具状态检查', '下模肩部磨损、冲头损伤或贴合不稳会造成角度补偿不稳定。']] },
    materials: { title: '按材料进行补偿的注意事项', cards: [['普通低碳钢', '常规空气折弯中通常易于建立稳定基准，但更换牌号或批次仍应确认首件。'], ['不锈钢', '通常比普通低碳钢更需关注回弹，较强的弹性恢复往往需要更明显的角度补偿。'], ['铝材', '合金与状态对回弹及开裂风险影响明显，不应在不同状态间直接套用修正量。'], ['高强钢', '回弹及模具负荷更高，应谨慎分步修正角度，并匹配内半径和 V 型模选择。']] },
    production: { title: '真实折弯生产建议', items: ['按牌号、炉批或卷批、板厚、纹向、V 开口、冲头半径、折弯方式和设备记录验证后的修正量。', '换卷或换批后重新核对；同一材料牌号的不同批次也可能需要重新校正。', '对于不锈钢折弯，可考虑使用 80°-82° 的冲头和模具。不锈钢通常具有更高的回弹，标准角度模具可能无法提供同样有效的回弹补偿。', '精密折弯必须在投产前进行实测试折，并在换模或设备维护后复核。', 'CNC 回弹修正不是输入一个固定数值，而是结合材料、模具、设备响应与检测结果持续校正。', '出现角度偏差时还应检查模具磨损、V 开口和设备挠度，不能只增加过弯量。'] },
    faqTitle: '常见问题',
    faq: [['折弯机加工中的回弹补偿是什么？', '它是在卸载前有意识调整成形角度，用来抵消材料弹性恢复，使成品角度更接近要求。'], ['钣金折弯如何进行回弹补偿？', '先参考材料和模具数据，再进行可控过弯或 CNC 角度修正，通过试折测量逐步校准。'], ['为什么不锈钢比普通低碳钢回弹更明显？', '不锈钢通常具有更高强度和更强弹性恢复，空气折弯卸载后的角度更容易张开。'], ['V 开口会影响回弹吗？', '会。V 开口会改变自然内半径、成形力和应变分布，换 V 模后应重新检查角度修正。'], ['所有材料都能使用相同回弹补偿吗？', '不能。牌号、状态、板厚、强度、纹向和折弯方式都会改变实际补偿量。'], ['为什么仍然必须试折？', '参考值无法完整覆盖真实工件的材料批次、模具状态、设备响应和尺寸公差。']],
    relatedTitle: '相关工程工具', relatedAria: '相关工程工具',
    relatedLabels: { pressBrakeCalculator: '折弯机计算器', bendAllowanceCalculator: '折弯展开计算器', materialDatabase: '材料数据库', springbackDatabase: '回弹数据库', springbackCompensationGuide: '回弹补偿指南', vDieSelectionTool: 'V 型模具选择工具', insideRadiusGuide: '内半径指南', airBendingGuide: '空气折弯指南', bottomingVsCoiningGuide: '压底折弯与压印折弯指南', bendSequenceGuide: '折弯顺序指南', pressBrakeTonnageGuide: '折弯机吨位指南', vDieOpeningGuide: 'V 开口指南', toolingSelectionGuide: '模具选型指南', crowningGuide: '挠度补偿指南', stainlessSteelBendingGuide: '不锈钢折弯指南', aluminumBendingGuide: '铝板折弯指南', minimumFlangeLengthGuide: '最小翻边指南', bendDeductionGuide: '折弯扣除量指南', kFactorGuide: 'K 因子指南' },
  },
  ru: {
    back: '\u2190 Назад к инженерным инструментам', eyebrow: 'Инженерное руководство', title: 'Руководство по компенсации пружинения',
    subtitle: 'Практическое руководство по компенсации пружинения листа с помощью коррекции угла на листогибе, перегиба, выбора V-матрицы и подтвержденной пробной гибки.',
    what: { title: 'Что такое компенсация пружинения?', text: 'Компенсация пружинения - это управляемая корректировка угла до разгрузки, чтобы после упругого восстановления деталь приблизилась к заданному углу. База пружинения дает справочные значения, а это руководство показывает, как применять их в производственной настройке.' },
    why: { title: 'Почему возникает пружинение', text: 'При гибке материал частично переходит в пластическое состояние, но часть напряжений остается упругой. После подъема пуансона угол раскрывается. При воздушной гибке этот эффект особенно заметен, поскольку лист не полностью прижат к углу матрицы.' },
    factorsTitle: 'Факторы, влияющие на пружинение',
    factors: ['Марка материала', 'Предел текучести', 'Предел прочности', 'Толщина листа', 'Раскрытие V-матрицы', 'Внутренний радиус', 'Угол гиба', 'Направление проката', 'Длина детали', 'Износ оснастки', 'Жесткость станка', 'Метод гибки'],
    principle: { title: 'Принцип компенсации пружинения', text: 'Пружинение не является постоянной величиной; расчет и справочные таблицы служат только начальной точкой. Для требуемого угла 90 градусов при ожидаемом восстановлении примерно 2 градуса листогиб обычно может сформировать около 88 градусов, чтобы после разгрузки получить угол, близкий к 90. Настройку подтверждают пробной гибкой на рабочем материале и оснастке.' },
    diagram: { title: 'От компенсированного угла к готовому', intro: 'Производственная последовательность: перегиб, разгрузка, измерение восстановленного угла.', svgTitle: 'Схема компенсации пружинения', svgDescription: 'Три стадии: гибка до компенсированного угла 88 градусов, освобождение пуансона и восстановление примерно до целевого угла 90 градусов.', step1: 'Компенсированный угол', step2: 'Освобождение пуансона', step3: 'Готовый угол', target: 'Целевой угол', springback: 'Пружинение', recovery: 'Восстановление материала' },
    methods: { title: 'Практические методы компенсации', cards: [['Перегиб по углу', 'Задайте немного более закрытый угол и утвердите поправку после измерения пробной детали.'], ['Коррекция угла CNC', 'Используйте поправку ЧПУ или измерение угла для уточнения хода под конкретную партию.'], ['Пробная гибка', 'Изготовьте образец рабочей оснасткой, измерьте его после разгрузки и только затем запускайте серию.'], ['Справочник материалов', 'Данные по марке и прочности помогают выбрать первое приближение, но не заменяют контроль.'], ['База пружинения', 'Начните со справочного диапазона и подтвердите его для толщины, радиуса, V-матрицы и метода.'], ['Изменение V-матрицы', 'Раскрытие меняет естественный радиус, усилие и пружинение; угол необходимо проверить заново.'], ['Проверка оснастки', 'Изношенные плечи матрицы и поврежденный пуансон снижают стабильность коррекции.']] },
    materials: { title: 'Замечания по материалам', cards: [['Низкоуглеродистая сталь', 'Часто дает устойчивую базу, но новая партия или марка требует проверки первой детали.'], ['Нержавеющая сталь', 'Обычно требует больше внимания, чем мягкая сталь, из-за более заметного упругого восстановления.'], ['Алюминий', 'Сплав и состояние сильно влияют на возврат и риск трещин; поправку нельзя переносить без проверки.'], ['Высокопрочная сталь', 'Требует осторожной ступенчатой коррекции, подходящего радиуса и консервативного выбора V-матрицы.']] },
    production: { title: 'Рекомендации для реального производства', items: ['Записывайте подтвержденную поправку вместе с маркой, партией, толщиной, направлением проката, V-матрицей, радиусом пуансона, методом и станком.', 'После замены рулона или партии проверяйте настройку заново: одна марка материала может гнуться по-разному.', 'При гибке нержавеющей стали рассмотрите применение пуансона и матрицы с углом 80°-82°. Нержавеющая сталь обычно имеет более высокое пружинение, а стандартная оснастка может обеспечивать менее эффективную компенсацию пружинения.', 'Для точных деталей обязательна измеренная пробная гибка до запуска серии и повторная проверка после смены оснастки.', 'Коррекция пружинения на CNC - это последовательное уточнение по материалу, инструменту, станку и результатам измерений.', 'При ошибке угла проверьте износ оснастки, раскрытие V и прогиб станка, а не только увеличивайте перегиб.'] },
    faqTitle: 'Часто задаваемые вопросы',
    faq: [['Что такое компенсация пружинения при гибке на листогибе?', 'Это преднамеренная корректировка формуемого угла для учета упругого раскрытия детали после разгрузки.'], ['Как компенсировать пружинение при гибке листа?', 'Используйте справочные данные, задайте управляемый перегиб или коррекцию ЧПУ, затем измерьте пробный гиб и уточните настройку.'], ['Почему нержавеющая сталь пружинит больше мягкой стали?', 'У нее обычно выше прочность и выраженнее упругое восстановление, поэтому угол после разгрузки раскрывается больше.'], ['Влияет ли раскрытие V-матрицы на пружинение?', 'Да. Оно изменяет естественный радиус, усилие и распределение деформации; после смены матрицы угол проверяют вновь.'], ['Одинакова ли компенсация для всех материалов?', 'Нет. На нее влияют марка, состояние, толщина, прочность, направление проката и способ гибки.'], ['Почему нужна пробная гибка?', 'Справочные значения не учитывают точно текущую партию, состояние оснастки, станок и допуски детали.']],
    relatedTitle: 'Связанные инженерные инструменты', relatedAria: 'Связанные инженерные инструменты',
    relatedLabels: { pressBrakeCalculator: 'Калькулятор листогиба', bendAllowanceCalculator: 'Калькулятор припуска на гиб', materialDatabase: 'База материалов', springbackDatabase: 'База пружинения', springbackCompensationGuide: 'Руководство по компенсации пружинения', vDieSelectionTool: 'Подбор V-матрицы', insideRadiusGuide: 'Справочник внутреннего радиуса', airBendingGuide: 'Руководство по воздушной гибке', bottomingVsCoiningGuide: 'Bottoming и Coining: руководство', bendSequenceGuide: 'Руководство по последовательности гибки', pressBrakeTonnageGuide: 'Руководство по тоннажу', vDieOpeningGuide: 'Руководство по раскрытию V-матрицы', toolingSelectionGuide: 'Выбор оснастки', crowningGuide: 'Компенсация прогиба', stainlessSteelBendingGuide: 'Гибка нержавеющей стали', aluminumBendingGuide: 'Гибка алюминия', minimumFlangeLengthGuide: 'Минимальная длина полки', bendDeductionGuide: 'Вычет гиба', kFactorGuide: 'Руководство по K-фактору' },
  },
  es: {
    back: '\u2190 Volver a herramientas de ingeniería', eyebrow: 'Guía de ingeniería', title: 'Guía de compensación de recuperación elástica',
    subtitle: 'Aprenda a aplicar la compensación de springback en producción mediante corrección angular de plegadora, sobreplegado, selección de matriz V y pliegues de prueba verificados.',
    what: { title: '¿Qué es la compensación de recuperación elástica?', text: 'Es un ajuste controlado del ángulo antes de descargar la pieza para que, al recuperar elasticidad, quede cerca del ángulo especificado. La base de datos aporta referencias empíricas; esta guía explica cómo convertirlas en ajustes de producción.' },
    why: { title: 'Por qué se produce la recuperación elástica', text: 'Durante el plegado una parte del material se deforma plásticamente y otra conserva tensiones elásticas. Al retirar el punzón, el ángulo se abre. En plegado al aire el efecto es más visible porque la chapa no adopta por completo el ángulo de la matriz.' },
    factorsTitle: 'Factores que afectan la recuperación elástica',
    factors: ['Calidad del material', 'Límite elástico', 'Resistencia a tracción', 'Espesor', 'Abertura V', 'Radio interior', 'Ángulo de pliegue', 'Dirección de laminación', 'Longitud de pieza', 'Desgaste del utillaje', 'Rigidez de máquina', 'Método de plegado'],
    principle: { title: 'Principio de compensación', text: 'La recuperación elástica no es un valor fijo; la teoría y las tablas solo ofrecen un punto inicial. Para un objetivo de 90 grados, si la experiencia indica aproximadamente 2 grados de recuperación, la plegadora normalmente puede conformar aproximadamente a 88 grados para que la pieza descargada vuelva cerca de 90. La corrección final exige un pliegue de prueba con material y utillaje de producción.' },
    diagram: { title: 'Del ángulo compensado al ángulo final', intro: 'Secuencia de taller: sobreplegar, descargar y medir el ángulo recuperado.', svgTitle: 'Diagrama animado de compensación de retorno', svgDescription: 'Tres etapas muestran una chapa plegada a 88 grados compensados, la liberación del punzón y el retorno cerca del objetivo de 90 grados.', step1: 'Ángulo compensado', step2: 'Liberación del punzón', step3: 'Ángulo final', target: 'Ángulo objetivo', springback: 'Retorno elástico', recovery: 'Recuperación del material' },
    methods: { title: 'Métodos prácticos de compensación', cards: [['Sobreplegado angular', 'Programe un ángulo algo más cerrado y valide la corrección midiendo piezas de prueba.'], ['Corrección angular CNC', 'Utilice la corrección del control o medición de ángulo para ajustar la carrera a cada lote.'], ['Pliegue de prueba', 'Pliegue una probeta con el utillaje real, mida tras descargar y libere la producción solo después.'], ['Referencia de materiales', 'La calidad y resistencia orientan el primer ajuste, pero no sustituyen la medición.'], ['Referencia de springback', 'Parta de rangos empíricos y califíquelos para espesor, radio, abertura V y método.'], ['Ajuste de matriz V', 'La abertura cambia radio natural, fuerza y retorno; vuelva a verificar ángulo y pestaña.'], ['Estado del utillaje', 'Hombros gastados o punzones dañados vuelven inestable la compensación.']] },
    materials: { title: 'Notas de compensación según material', cards: [['Acero dulce', 'Suele ofrecer una base estable, aunque una calidad o lote nuevo requiere confirmar la primera pieza.'], ['Acero inoxidable', 'Normalmente exige más atención que el acero dulce porque su recuperación elástica es mayor.'], ['Aluminio', 'La aleación y el temple afectan mucho el retorno y el riesgo de grieta; compruebe cada condición.'], ['Acero de alta resistencia', 'Requiere correcciones prudentes, radios compatibles y selección conservadora de la matriz V.']] },
    production: { title: 'Consejos para producción real en plegadora', items: ['Registre la corrección validada con calidad, lote, espesor, dirección, abertura V, radio de punzón, método y máquina.', 'Compruebe de nuevo al cambiar bobina o lote; la misma calidad nominal puede requerir otra corrección.', 'Para el plegado de acero inoxidable, considere usar punzones y matrices de 80°-82°. El acero inoxidable suele presentar mayor retorno elástico, y el utillaje de ángulo estándar puede ofrecer una compensación de springback menos eficaz.', 'Los pliegues de precisión requieren prueba medida antes de producir y nueva comprobación tras cambiar utillaje.', 'La corrección CNC de springback es iterativa: combina material, herramientas, respuesta de máquina e inspección.', 'Si falla el ángulo, revise desgaste, abertura V y flexión de máquina antes de limitarse a aumentar el sobreplegado.'] },
    faqTitle: 'Preguntas frecuentes',
    faq: [['¿Qué es la compensación de recuperación elástica en una plegadora?', 'Es un ajuste intencionado del ángulo de conformado para compensar la apertura elástica tras descargar la pieza.'], ['¿Cómo se compensa el springback en chapa?', 'Use referencias de material y utillaje, aplique un sobreplegado o corrección CNC controlada y refine mediante una prueba medida.'], ['¿Por qué el inoxidable recupera más que el acero dulce?', 'Normalmente posee mayor resistencia y recuperación elástica, por lo que el ángulo se abre más al descargar.'], ['¿La abertura V afecta la recuperación?', 'Sí; cambia el radio natural, la fuerza y la deformación, por lo que hay que revisar la corrección al cambiar matriz.'], ['¿La compensación es igual para todos los materiales?', 'No. Influyen calidad, temple, espesor, resistencia, laminación y método de plegado.'], ['¿Por qué sigue siendo necesario un pliegue de prueba?', 'Las tablas no reproducen exactamente el lote, el desgaste del utillaje, la máquina ni la tolerancia real.']],
    relatedTitle: 'Herramientas de ingeniería relacionadas', relatedAria: 'Herramientas de ingeniería relacionadas',
    relatedLabels: { pressBrakeCalculator: 'Calculadora de plegadora', bendAllowanceCalculator: 'Calculadora de desarrollo', materialDatabase: 'Base de datos de materiales', springbackDatabase: 'Base de datos de retorno elástico', springbackCompensationGuide: 'Guía de compensación de retorno', vDieSelectionTool: 'Selección de matriz V', insideRadiusGuide: 'Guía de radio interior', airBendingGuide: 'Guía de plegado al aire', bottomingVsCoiningGuide: 'Guía de Bottoming y Coining', bendSequenceGuide: 'Guía de secuencia de plegado', pressBrakeTonnageGuide: 'Guía de tonelaje', vDieOpeningGuide: 'Guía de abertura V', toolingSelectionGuide: 'Guía de utillaje', crowningGuide: 'Guía de compensación de flecha', stainlessSteelBendingGuide: 'Guía de acero inoxidable', aluminumBendingGuide: 'Guía de aluminio', minimumFlangeLengthGuide: 'Guía de pestaña mínima', bendDeductionGuide: 'Guía de deducción', kFactorGuide: 'Guía del factor K' },
  },
  tr: {
    back: '\u2190 Mühendislik araçlarına dön', eyebrow: 'Mühendislik kılavuzu', title: 'Geri Esneme Kompanzasyonu Kılavuzu',
    subtitle: 'Sac bükümde geri esnemeyi; abkant açı düzeltmesi, aşırı büküm, V kalıp seçimi ve doğrulanmış deneme bükümleriyle üretime uygulama kılavuzu.',
    what: { title: 'Geri esneme kompanzasyonu nedir?', text: 'Yük kalktıktan sonra parçanın istenen açıya yaklaşması için şekillendirme açısının kontrollü olarak düzeltilmesidir. Veritabanı deneyime dayalı başlangıç değerleri verir; bu sayfa bu değerlerin üretimde nasıl uygulanacağını açıklar.' },
    why: { title: 'Geri esneme neden oluşur?', text: 'Büküm sırasında malzemenin bir bölümü plastik şekil alırken bir bölümü elastik gerilme taşır. Zımba geri çekildiğinde elastik toparlanma açıyı açar. Sac kalıp açısına tamamen bastırılmadığı için havada bükmede etki daha belirgindir.' },
    factorsTitle: 'Geri esnemeyi etkileyen faktörler',
    factors: ['Malzeme kalitesi', 'Akma dayanımı', 'Çekme dayanımı', 'Sac kalınlığı', 'V açıklığı', 'İç radyüs', 'Büküm açısı', 'Hadde yönü', 'Parça boyu', 'Takım aşınması', 'Makine rijitliği', 'Büküm yöntemi'],
    principle: { title: 'Geri esneme kompanzasyonu prensibi', text: 'Geri esneme sabit bir değer değildir; hesap veya tablo değerleri yalnızca başlangıç referansıdır. Hedef 90 derece ve tecrübeye göre toparlanma yaklaşık 2 derece ise abkant, parça serbest kaldığında 90 dereceye yaklaşması için genellikle yaklaşık 88 dereceye şekillendirebilir. Nihai düzeltme üretim malzemesi ve takımıyla yapılan deneme bükümüyle doğrulanır.' },
    diagram: { title: 'Kompanzasyon açısından son açıya', intro: 'Atölye sırası: aşırı büküm, boşaltma, toparlanmış açıyı ölçme.', svgTitle: 'Geri esneme kompanzasyonu animasyon şeması', svgDescription: 'Sacın 88 derece kompanzasyon açısına bükülmesi, zımba serbest kalması ve 90 derece hedefe yakın toparlanması.', step1: 'Kompanzasyon Açısı', step2: 'Zımba Serbest', step3: 'Son Açı', target: 'Hedef Açı', springback: 'Geri Esneme', recovery: 'Malzeme Toparlanması' },
    methods: { title: 'Pratik kompanzasyon yöntemleri', cards: [['Açıda aşırı büküm', 'Hedeften biraz daha kapalı açı programlayın ve ölçülen deneme parçasıyla düzeltmeyi onaylayın.'], ['CNC açı düzeltmesi', 'Kontrolör düzeltmesi veya açı ölçümünü kullanarak gerçek parti için strok ayarını hassaslaştırın.'], ['Deneme bükümü', 'Üretim takımıyla numune bükün, yük kalktıktan sonra ölçün ve sonra seri üretimi başlatın.'], ['Malzeme veri referansı', 'Kalite ve dayanım ilk ayara yön verir, ancak ölçümün yerini tutmaz.'], ['Geri esneme veri referansı', 'Deneyime dayalı aralıktan başlayın; kalınlık, radyüs, V açıklığı ve yönteme göre doğrulayın.'], ['V kalıp ayarı', 'V açıklığı doğal radyüsü, kuvveti ve geri esnemeyi değiştirir; açı tekrar kontrol edilmelidir.'], ['Takım durumu kontrolü', 'Aşınmış kalıp omuzları veya hasarlı zımba düzeltme kararlılığını bozar.']] },
    materials: { title: 'Malzemeye göre kompanzasyon notları', cards: [['Yumuşak çelik', 'Genellikle kararlı bir başlangıç sağlar; yeni kalite veya parti için ilk parça yine kontrol edilmelidir.'], ['Paslanmaz çelik', 'Daha kuvvetli elastik toparlanma nedeniyle çoğunlukla yumuşak çelikten daha dikkatli açı kompanzasyonu ister.'], ['Alüminyum', 'Alaşım ve temper geri esneme ile çatlama riskini ciddi biçimde etkiler; ayar doğrudan taşınmamalıdır.'], ['Yüksek dayanımlı çelik', 'Dikkatli kademeli düzeltme, uygun radyüs ve muhafazakar V kalıp seçimi gerektirir.']] },
    production: { title: 'Gerçek abkant üretimi için öneriler', items: ['Doğrulanan düzeltmeyi kalite, parti, kalınlık, hadde yönü, V açıklığı, zımba radyüsü, yöntem ve makineyle birlikte kaydedin.', 'Rulo veya parti değişiminde ayarı yeniden kontrol edin; aynı kalite adı farklı büküm davranışı gösterebilir.', 'Paslanmaz çelik bükümünde 80°-82° zımba ve kalıp takımı kullanmayı değerlendirin. Paslanmaz çelik genellikle daha yüksek geri esneme gösterir ve standart açılı takımlar daha az etkili geri esneme kompanzasyonu sağlayabilir.', 'Hassas bükümlerde seri öncesi ölçülen deneme bükümü ve takım değişimi sonrası tekrar doğrulama zorunludur.', 'CNC geri esneme düzeltmesi sabit sayı girmek değil; malzeme, takım, makine ve ölçüm sonucuyla yinelenen bir süreçtir.', 'Açı sapmasında yalnızca aşırı bükümü artırmak yerine takım aşınması, V açıklığı ve makine sehmini inceleyin.'] },
    faqTitle: 'Sık sorulan sorular',
    faq: [['Abkant bükmede geri esneme kompanzasyonu nedir?', 'Yük kaldırıldıktan sonraki elastik açılmayı karşılamak için şekillendirme açısına bilinçli düzeltme uygulanmasıdır.'], ['Sac bükümde geri esneme nasıl kompanze edilir?', 'Malzeme ve takım referansıyla başlayın, kontrollü aşırı büküm veya CNC düzeltmesi uygulayın ve ölçülen denemeyle ayarı geliştirin.'], ['Paslanmaz çelik neden yumuşak çelikten daha çok geri esner?', 'Genellikle dayanımı ve elastik toparlanması daha yüksektir; bu nedenle yük kalkınca açı daha fazla açılır.'], ['V açıklığı geri esnemeyi etkiler mi?', 'Evet. Doğal radyüsü, kuvveti ve deformasyon dağılımını değiştirir; kalıp değişince açı yeniden doğrulanır.'], ['Kompanzasyon her malzemede aynı mıdır?', 'Hayır. Kalite, temper, kalınlık, dayanım, hadde yönü ve büküm yöntemi ayarı değiştirir.'], ['Deneme bükümü neden gereklidir?', 'Referans tabloları gerçek parti, takım durumu, makine yanıtı ve parça toleransını tam temsil edemez.']],
    relatedTitle: 'İlgili mühendislik araçları', relatedAria: 'İlgili mühendislik araçları',
    relatedLabels: { pressBrakeCalculator: 'Abkant pres hesaplayıcısı', bendAllowanceCalculator: 'Büküm payı hesaplayıcısı', materialDatabase: 'Malzeme veritabanı', springbackDatabase: 'Geri esneme veritabanı', springbackCompensationGuide: 'Geri esneme kompanzasyonu kılavuzu', vDieSelectionTool: 'V kalıp seçim aracı', insideRadiusGuide: 'İç radyüs kılavuzu', airBendingGuide: 'Havada büküm kılavuzu', bottomingVsCoiningGuide: 'Bottoming ve Coining Kılavuzu', bendSequenceGuide: 'Büküm Sırası Kılavuzu', pressBrakeTonnageGuide: 'Abkant tonaj kılavuzu', vDieOpeningGuide: 'V açıklığı kılavuzu', toolingSelectionGuide: 'Takım seçim kılavuzu', crowningGuide: 'Sehim kompanzasyonu kılavuzu', stainlessSteelBendingGuide: 'Paslanmaz büküm kılavuzu', aluminumBendingGuide: 'Alüminyum büküm kılavuzu', minimumFlangeLengthGuide: 'Minimum flanş kılavuzu', bendDeductionGuide: 'Büküm düşümü kılavuzu', kFactorGuide: 'K-faktörü kılavuzu' },
  },
  id: {
    back: '\u2190 Kembali ke Engineering Tools', eyebrow: 'Panduan teknik', title: 'Panduan Kompensasi Springback',
    subtitle: 'Panduan penerapan kompensasi springback pada produksi press brake melalui koreksi sudut, overbending, pemilihan V-die, dan trial bending yang terukur.',
    what: { title: 'Apa itu kompensasi springback?', text: 'Kompensasi springback adalah penyesuaian sudut pembentukan sebelum beban dilepas agar komponen yang pulih elastis mendekati sudut gambar. Database memberi nilai referensi berbasis pengalaman; panduan ini menjelaskan penerapannya di produksi.' },
    why: { title: 'Mengapa springback terjadi', text: 'Saat bending, sebagian material mengalami deformasi plastis sedangkan sebagian masih menyimpan tegangan elastis. Setelah punch naik, pemulihan elastis membuka sudut. Pada air bending pengaruh ini lebih terlihat karena lembaran tidak dipaksa mengikuti seluruh sudut die.' },
    factorsTitle: 'Faktor yang memengaruhi springback',
    factors: ['Grade material', 'Yield strength', 'Tensile strength', 'Ketebalan lembaran', 'Bukaan V', 'Radius dalam', 'Sudut bending', 'Arah serat', 'Panjang komponen', 'Keausan tooling', 'Kekakuan mesin', 'Metode bending'],
    principle: { title: 'Prinsip kompensasi springback', text: 'Springback bukan nilai tetap; nilai teori atau database hanya menjadi acuan awal. Untuk target 90 derajat, bila pengalaman menunjukkan pemulihan sekitar 2 derajat, press brake biasanya dapat membentuk kira-kira 88 derajat agar setelah dilepas komponen kembali mendekati 90 derajat. Koreksi akhir wajib dibuktikan dengan trial bending memakai material, tooling, dan mesin produksi.' },
    diagram: { title: 'Dari sudut kompensasi ke sudut akhir', intro: 'Urutan praktis: overbend, lepaskan beban, lalu ukur sudut hasil pemulihan.', svgTitle: 'Diagram animasi kompensasi springback', svgDescription: 'Tiga tahap menunjukkan lembaran dibentuk pada sudut kompensasi 88 derajat, punch dilepas, lalu pulih mendekati target 90 derajat.', step1: 'Sudut Kompensasi', step2: 'Punch Dilepas', step3: 'Sudut Akhir', target: 'Sudut Target', springback: 'Springback', recovery: 'Pemulihan Material' },
    methods: { title: 'Metode kompensasi praktis', cards: [['Angle overbending', 'Programkan sudut sedikit lebih tertutup lalu sahkan koreksi dengan komponen uji yang diukur.'], ['Koreksi sudut CNC', 'Gunakan koreksi kontroler atau pengukuran sudut untuk menyetel stroke sesuai batch aktual.'], ['Trial bending', 'Tekuk kupon dengan tooling produksi, ukur setelah beban dilepas, lalu baru lepaskan pekerjaan massal.'], ['Referensi database material', 'Data grade dan kekuatan membantu memilih setup awal, namun tidak menggantikan pengukuran.'], ['Referensi database springback', 'Mulai dari rentang empiris dan validasi berdasarkan tebal, radius, bukaan V, serta metode.'], ['Penyesuaian V-die', 'Perubahan bukaan V mengubah radius alami, gaya, dan springback; periksa kembali sudutnya.'], ['Pemeriksaan tooling', 'Bahu die aus atau punch rusak dapat membuat kompensasi tidak konsisten.']] },
    materials: { title: 'Catatan kompensasi berdasarkan material', cards: [['Baja karbon rendah', 'Sering menjadi dasar yang stabil, tetapi grade atau batch baru tetap memerlukan konfirmasi first-off.'], ['Stainless steel', 'Biasanya perlu perhatian lebih daripada baja karbon rendah karena pemulihan elastisnya lebih besar.'], ['Aluminium', 'Paduan dan temper sangat memengaruhi pemulihan serta risiko retak; jangan memindahkan koreksi tanpa uji.'], ['Baja kekuatan tinggi', 'Memerlukan koreksi bertahap yang hati-hati, radius sesuai, dan pemilihan V-die yang konservatif.']] },
    production: { title: 'Saran produksi press brake nyata', items: ['Catat koreksi yang tervalidasi beserta grade, batch, ketebalan, arah serat, bukaan V, radius punch, metode, dan mesin.', 'Periksa kembali saat coil atau batch berganti; material dengan grade nominal sama dapat memerlukan koreksi baru.', 'Untuk bending stainless steel, pertimbangkan penggunaan punch dan die 80°-82°. Stainless steel umumnya memiliki springback lebih tinggi, dan tooling sudut standar dapat memberikan kompensasi springback yang kurang efektif.', 'Bending presisi memerlukan trial bend terukur sebelum produksi dan validasi ulang setelah penggantian tooling.', 'Koreksi springback CNC adalah proses iteratif yang menggabungkan material, tooling, respons mesin, dan hasil inspeksi.', 'Saat sudut menyimpang, periksa keausan tooling, bukaan V, dan defleksi mesin sebelum hanya menambah overbend.'] },
    faqTitle: 'Pertanyaan umum',
    faq: [['Apa itu kompensasi springback pada bending press brake?', 'Ini adalah koreksi yang disengaja pada sudut pembentukan untuk mengimbangi pembukaan elastis setelah beban dilepas.'], ['Bagaimana mengompensasi springback pada bending lembaran?', 'Mulai dari referensi material dan tooling, terapkan overbend atau koreksi CNC terkontrol, lalu sempurnakan dari trial bend terukur.'], ['Mengapa stainless steel lebih banyak springback daripada baja karbon rendah?', 'Stainless umumnya memiliki kekuatan dan pemulihan elastis lebih tinggi sehingga sudut lebih terbuka setelah dilepas.'], ['Apakah bukaan V memengaruhi springback?', 'Ya. Bukaan V mengubah radius alami, gaya, dan distribusi regangan, sehingga koreksi harus dicek saat die berubah.'], ['Apakah kompensasi sama untuk semua material?', 'Tidak. Grade, temper, ketebalan, kekuatan, arah serat, dan metode bending semuanya berpengaruh.'], ['Mengapa trial bending masih diperlukan?', 'Nilai referensi tidak dapat mewakili persis batch material, kondisi tooling, respons mesin, dan toleransi pekerjaan nyata.']],
    relatedTitle: 'Alat teknik terkait', relatedAria: 'Alat teknik terkait',
    relatedLabels: { pressBrakeCalculator: 'Kalkulator press brake', bendAllowanceCalculator: 'Kalkulator bend allowance', materialDatabase: 'Database material', springbackDatabase: 'Database springback', springbackCompensationGuide: 'Panduan kompensasi springback', vDieSelectionTool: 'Alat pemilihan V-die', insideRadiusGuide: 'Panduan radius dalam', airBendingGuide: 'Panduan tekuk udara', bottomingVsCoiningGuide: 'Panduan Bottoming vs Coining', bendSequenceGuide: 'Panduan Urutan Bending', pressBrakeTonnageGuide: 'Panduan tonase press brake', vDieOpeningGuide: 'Panduan bukaan V', toolingSelectionGuide: 'Panduan pemilihan tooling', crowningGuide: 'Panduan kompensasi lendutan', stainlessSteelBendingGuide: 'Panduan tekuk stainless', aluminumBendingGuide: 'Panduan tekuk aluminium', minimumFlangeLengthGuide: 'Panduan flange minimum', bendDeductionGuide: 'Panduan bend deduction', kFactorGuide: 'Panduan K-factor' },
  },
}

const CompensationDiagram = ({ labels }) => (
  <section className='zyco-comp__panel zyco-comp__diagram' aria-labelledby='springback-diagram-title'>
    <p className='zyco-comp__eyebrow'>{labels.title}</p>
    <h2 className='zyco-comp__section-title' id='springback-diagram-title'>{labels.title}</h2>
    <p className='zyco-comp__copy'>{labels.intro}</p>
    <svg viewBox='0 0 960 300' role='img' aria-labelledby='comp-svg-title comp-svg-desc'>
      <title id='comp-svg-title'>{labels.svgTitle}</title>
      <desc id='comp-svg-desc'>{labels.svgDescription}</desc>
      <g className='zyco-comp__stage zyco-comp__stage--one'>
        <text x='56' y='36'>{labels.step1}</text>
        <path className='zyco-comp__die' d='M38 230 L92 274 L146 230 M174 230 L228 274 L282 230' />
        <path className='zyco-comp__sheet' d='M46 188 L122 252 L208 188' />
        <path className='zyco-comp__punch' d='M108 66 V142 L122 161 L136 142 V66' />
        <path className='zyco-comp__arc' d='M87 209 A50 50 0 0 1 157 209' />
        <text className='zyco-comp__number' x='96' y='198'>88°</text>
        <text className='zyco-comp__note' x='46' y='288'>{labels.target}: 90°</text>
      </g>
      <g className='zyco-comp__stage zyco-comp__stage--two'>
        <text x='362' y='36'>{labels.step2}</text>
        <path className='zyco-comp__die' d='M344 230 L398 274 L452 230 M480 230 L534 274 L588 230' />
        <path className='zyco-comp__sheet zyco-comp__sheet--recover' d='M352 188 L428 252 L514 188' />
        <path className='zyco-comp__punch zyco-comp__punch--release' d='M414 66 V142 L428 161 L442 142 V66' />
        <path className='zyco-comp__arrow' d='M470 164 C492 146 502 126 504 102' />
        <text className='zyco-comp__note' x='456' y='94'>{labels.springback}</text>
        <text className='zyco-comp__note' x='352' y='288'>{labels.recovery}</text>
      </g>
      <g className='zyco-comp__stage zyco-comp__stage--three'>
        <text x='672' y='36'>{labels.step3}</text>
        <path className='zyco-comp__die' d='M650 230 L704 274 L758 230 M786 230 L840 274 L894 230' />
        <path className='zyco-comp__sheet zyco-comp__sheet--final' d='M658 184 L734 252 L810 184' />
        <path className='zyco-comp__arc' d='M699 209 A50 50 0 0 1 769 209' />
        <text className='zyco-comp__number' x='708' y='198'>90°</text>
        <text className='zyco-comp__note' x='658' y='288'>{labels.target}: 90°</text>
      </g>
    </svg>
  </section>
)

const createStructuredData = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'TechArticle',
      headline: 'Springback Compensation Guide | Press Brake Angle Correction',
      description: content.en.subtitle,
      url: getSiteUrl(routePath),
      author: ZYCO_PUBLISHER,
      publisher: ZYCO_PUBLISHER,
      about: ['springback compensation', 'press brake angle correction', 'press brake overbending', 'sheet metal bending springback'],
    },
    createFAQPageStructuredData(content.en.faq),
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Engineering Tools', item: getSiteUrl('/engineering-tools') },
        { '@type': 'ListItem', position: 2, name: 'Springback Compensation Guide', item: getSiteUrl(routePath) },
      ],
    },
  ],
})

const Card = ({ title, text }) => (
  <article className='zyco-comp__card'>
    <h3>{title}</h3>
    <p>{text}</p>
  </article>
)

export default function SpringbackCompensationGuide({ language = 'en', setLanguage = () => {} }) {
  const page = content[language] || content.en

  useEffect(() => {
    setPageSEO({
      title: 'Springback Compensation Guide | Press Brake Angle Correction',
      description: 'Learn how to compensate sheet metal springback in press brake bending using angle correction, overbending, V-die selection, material behavior, and practical trial bending experience.',
      keywords: 'springback compensation, sheet metal springback compensation, press brake angle correction, bending angle compensation, air bending springback, press brake overbending, CNC press brake springback correction, sheet metal bending springback, press brake tooling compensation',
      canonicalPath: routePath,
    })
    setStructuredData({ id: 'springback-compensation-guide-jsonld', data: createStructuredData() })
  }, [])

  return (
    <>
      <style>{`
        .zyco-comp { min-height:100vh; padding:42px 22px; box-sizing:border-box; color:#fff; font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif; background:radial-gradient(circle at 16% 10%,rgba(96,165,250,.3),transparent 30%),radial-gradient(circle at 84% 12%,rgba(14,165,233,.2),transparent 27%),linear-gradient(145deg,#071224 0%,#0b1f3f 47%,#12366e 100%); }
        .zyco-comp__shell { width:min(1160px,100%); margin:0 auto; }
        .zyco-comp__hero,.zyco-comp__panel { position:relative; margin-bottom:18px; padding:28px; border:1px solid rgba(147,197,253,.19); border-radius:26px; background:linear-gradient(145deg,rgba(255,255,255,.12),rgba(255,255,255,.045)); box-shadow:0 20px 58px rgba(0,0,0,.24); backdrop-filter:blur(16px); }
        .zyco-comp__hero { padding:32px; }
        .zyco-comp__back,.zyco-comp__tool { display:inline-flex; align-items:center; justify-content:center; box-sizing:border-box; text-decoration:none; font-size:15px; font-weight:800; transition:all .25s ease; }
        .zyco-comp__back { width:fit-content; max-width:min(100%,480px); min-height:44px; margin:0 0 22px; padding:0 16px; border:1px solid rgba(147,197,253,.46); border-radius:999px; background:linear-gradient(145deg,rgba(15,23,42,.34),rgba(37,99,235,.12)); color:#bfdbfe; }
        .zyco-comp__tool { min-height:46px; padding:0 18px; border:1px solid rgba(147,197,253,.38); border-radius:14px; color:#dbeafe; background:rgba(30,64,175,.32); box-shadow:none; }
        .zyco-comp__back:hover { transform:translateY(-2px); border-color:rgba(125,211,252,.7); color:#fff; background:rgba(37,99,235,.42); box-shadow:0 14px 32px rgba(37,99,235,.32),0 0 0 1px rgba(125,211,252,.16); }
        .zyco-comp__tool:hover { transform:translateY(-4px); border-color:rgba(125,211,252,.7); color:#fff; background:rgba(37,99,235,.4); box-shadow:0 14px 30px rgba(56,189,248,.22),0 7px 22px rgba(2,8,23,.22); }
        .zyco-comp__eyebrow { margin:0 0 12px; color:#93c5fd; font-size:12px; font-weight:850; letter-spacing:2.2px; text-transform:uppercase; }
        .zyco-comp__title { margin:0; color:#fff; font-size:clamp(34px,5vw,48px); line-height:1.08; font-weight:900; }
        .zyco-comp__subtitle { max-width:850px; margin:15px 0 0; color:#dbeafe; font-size:17px; line-height:1.72; font-weight:600; }
        .zyco-comp__section-title { margin:0 0 13px; color:#fff; font-size:23px; line-height:1.28; font-weight:850; }
        .zyco-comp__copy { margin:0; color:#dbeafe; font-size:15px; line-height:1.78; font-weight:570; }
        .zyco-comp__grid,.zyco-comp__cards { display:grid; gap:18px; grid-template-columns:repeat(2,minmax(0,1fr)); }
        .zyco-comp__cards--four { grid-template-columns:repeat(4,minmax(0,1fr)); }
        .zyco-comp__card { padding:18px; border:1px solid rgba(191,219,254,.12); border-radius:18px; background:rgba(30,64,112,.3); }
        .zyco-comp__card h3 { margin:0 0 9px; color:#eff6ff; font-size:17px; line-height:1.4; }
        .zyco-comp__card p { margin:0; color:#dbeafe; font-size:14px; line-height:1.68; }
        .zyco-comp__factors,.zyco-comp__list,.zyco-comp__faq { display:grid; gap:11px; margin:14px 0 0; padding:0; list-style:none; }
        .zyco-comp__factors { grid-template-columns:repeat(4,minmax(0,1fr)); }
        .zyco-comp__factors li,.zyco-comp__list li,.zyco-comp__faq article { padding:14px 17px; border:1px solid rgba(191,219,254,.12); border-radius:16px; background:rgba(30,64,112,.29); color:#dbeafe; font-size:14px; line-height:1.65; }
        .zyco-comp__factors li { display:flex; align-items:center; justify-content:center; text-align:center; }
        .zyco-comp__list li::before { content:""; display:inline-block; width:7px; height:7px; margin:0 11px 2px 0; border-radius:999px; background:#38bdf8; }
        .zyco-comp__faq h3 { margin:0 0 7px; color:#eff6ff; font-size:16px; line-height:1.48; }
        .zyco-comp__faq p { margin:0; color:#dbeafe; font-size:14px; line-height:1.65; }
        .zyco-comp__tools { display:flex; flex-wrap:wrap; gap:12px; }
        .zyco-comp__diagram svg { display:block; width:100%; height:auto; margin:20px 0 0; border:1px solid rgba(125,211,252,.13); border-radius:20px; background:rgba(8,29,60,.46); }
        .zyco-comp__diagram text { fill:#dbeafe; font:700 15px Inter,system-ui,sans-serif; }
        .zyco-comp__diagram .zyco-comp__note { fill:#93c5fd; font-size:12px; }
        .zyco-comp__diagram .zyco-comp__number { fill:#7dd3fc; font-size:19px; font-weight:900; }
        .zyco-comp__die { fill:none; stroke:#3b82f6; stroke-width:7; stroke-linejoin:round; }
        .zyco-comp__sheet { fill:none; stroke:#e0f2fe; stroke-width:7; stroke-linecap:round; stroke-linejoin:round; }
        .zyco-comp__punch { fill:rgba(56,189,248,.25); stroke:#60a5fa; stroke-width:4; stroke-linejoin:round; }
        .zyco-comp__arc { fill:none; stroke:#38bdf8; stroke-width:2; stroke-dasharray:4 5; }
        .zyco-comp__arrow { fill:none; stroke:#38bdf8; stroke-width:3; stroke-linecap:round; stroke-dasharray:7 5; }
        .zyco-comp__stage { opacity:.35; animation:zyco-comp-stage 9s ease-in-out infinite; }
        .zyco-comp__stage--two { animation-delay:3s; }
        .zyco-comp__stage--three { animation-delay:6s; }
        .zyco-comp__punch--release { animation:zyco-comp-release 9s ease-in-out infinite 3s; }
        .zyco-comp__sheet--recover { animation:zyco-comp-recovery 9s ease-in-out infinite 3s; transform-origin:428px 252px; }
        @keyframes zyco-comp-stage { 0%,27% { opacity:1; } 34%,100% { opacity:.35; } }
        @keyframes zyco-comp-release { 0%,5% { transform:translateY(0); } 16%,27% { transform:translateY(-35px); } 35%,100% { transform:translateY(0); } }
        @keyframes zyco-comp-recovery { 0%,5% { transform:scaleX(1); } 16%,27% { transform:scaleX(1.05); } 35%,100% { transform:scaleX(1); } }
        @media (prefers-reduced-motion:reduce) { .zyco-comp__stage,.zyco-comp__punch--release,.zyco-comp__sheet--recover { animation:none; opacity:1; } }
        @media (max-width:960px) { .zyco-comp__cards--four,.zyco-comp__factors { grid-template-columns:repeat(2,minmax(0,1fr)); } }
        @media (max-width:760px) { .zyco-comp { padding:22px 14px; } .zyco-comp__hero,.zyco-comp__panel { padding:22px; border-radius:22px; } .zyco-comp__grid,.zyco-comp__cards,.zyco-comp__cards--four,.zyco-comp__factors { grid-template-columns:1fr; } .zyco-comp__diagram svg { min-height:210px; } }
        @media (max-width:640px) { .zyco-comp__back,.zyco-comp__tool { width:100%; } }
      `}</style>
      <main className='zyco-comp'>
        <div className='zyco-comp__shell'>
          <header className='zyco-comp__hero'>
            <a className='zyco-comp__back' href='/engineering-tools' aria-label={page.back}>{page.back}</a>
            <LanguageSwitcher className='zyco-page-language-switcher' language={language} setLanguage={setLanguage} />
            <p className='zyco-comp__eyebrow'>{page.eyebrow}</p>
            <h1 className='zyco-comp__title'>{page.title}</h1>
            <p className='zyco-comp__subtitle'>{page.subtitle}</p>
          </header>
          <div className='zyco-comp__grid'>
            <section className='zyco-comp__panel' aria-labelledby='comp-what'><h2 className='zyco-comp__section-title' id='comp-what'>{page.what.title}</h2><p className='zyco-comp__copy'>{page.what.text}</p></section>
            <section className='zyco-comp__panel' aria-labelledby='comp-why'><h2 className='zyco-comp__section-title' id='comp-why'>{page.why.title}</h2><p className='zyco-comp__copy'>{page.why.text}</p></section>
          </div>
          <section className='zyco-comp__panel' aria-labelledby='comp-factors'><h2 className='zyco-comp__section-title' id='comp-factors'>{page.factorsTitle}</h2><ul className='zyco-comp__factors'>{page.factors.map((factor) => <li key={factor}>{factor}</li>)}</ul></section>
          <section className='zyco-comp__panel' aria-labelledby='comp-principle'><h2 className='zyco-comp__section-title' id='comp-principle'>{page.principle.title}</h2><p className='zyco-comp__copy'>{page.principle.text}</p></section>
          <CompensationDiagram labels={page.diagram} />
          <section className='zyco-comp__panel' aria-labelledby='comp-methods'><h2 className='zyco-comp__section-title' id='comp-methods'>{page.methods.title}</h2><div className='zyco-comp__cards'>{page.methods.cards.map(([title, text]) => <Card key={title} title={title} text={text} />)}</div></section>
          <section className='zyco-comp__panel' aria-labelledby='comp-materials'><h2 className='zyco-comp__section-title' id='comp-materials'>{page.materials.title}</h2><div className='zyco-comp__cards zyco-comp__cards--four'>{page.materials.cards.map(([title, text]) => <Card key={title} title={title} text={text} />)}</div></section>
          <section className='zyco-comp__panel' aria-labelledby='comp-production'><h2 className='zyco-comp__section-title' id='comp-production'>{page.production.title}</h2><ul className='zyco-comp__list'>{page.production.items.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section className='zyco-comp__panel' aria-labelledby='comp-faq'><h2 className='zyco-comp__section-title' id='comp-faq'>{page.faqTitle}</h2><div className='zyco-comp__faq'>{page.faq.map(([question, answer]) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}</div></section>
          <EngineeringCTA language={language} />
          <section className='zyco-comp__panel' aria-labelledby='comp-related'><h2 className='zyco-comp__section-title' id='comp-related'>{page.relatedTitle}</h2><nav className='zyco-comp__tools' aria-label={page.relatedAria}>{relatedTools.map(([key, href]) => <a className='zyco-comp__tool' href={href} key={key}>{page.relatedLabels[key]}</a>)}</nav></section>
        </div>
      </main>
    </>
  )
}
