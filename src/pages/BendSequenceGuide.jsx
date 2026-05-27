import { useEffect } from 'react'
import BendSequenceMotionDiagram from '../components/BendSequenceMotionDiagram.jsx'
import LanguageSwitcher from '../components/LanguageSwitcher.jsx'
import { getEngineeringText } from '../languages/engineeringText.js'
import {
  getSiteUrl,
  setPageSEO,
  setStructuredData,
} from '../utils/seo.js'

const routePath = '/engineering-tools/bend-sequence-guide'

const relatedTools = [
  ['pressBrakeCalculator', '/engineering-tools/press-brake-calculator'],
  ['bendAllowanceCalculator', '/engineering-tools/bend-allowance-calculator'],
  ['kFactorGuide', '/engineering/k-factor-guide'],
  ['bendDeductionGuide', '/engineering/bend-deduction-guide'],
  ['materialDatabase', '/engineering-tools/material-database'],
  ['springbackDatabase', '/engineering-tools/springback-database'],
  ['springbackCompensationGuide', '/springback-compensation-guide'],
  ['vDieSelectionTool', '/engineering-tools/v-die-selection'],
  ['insideRadiusGuide', '/engineering-tools/inside-radius-guide'],
  ['airBendingGuide', '/engineering-tools/air-bending-guide'],
  ['bottomingVsCoiningGuide', '/engineering-tools/bottoming-vs-coining-guide'],
  ['bendSequenceGuide', routePath],
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
    back: '\u2190 Back to Engineering Tools',
    eyebrow: 'Process Engineering Guide',
    title: 'Bend Sequence Guide',
    subtitle: 'Plan the correct press brake bending order to avoid interference, reduce rework, and improve sheet metal bending accuracy.',
    shopNote: 'A correct flat pattern and correct tonnage do not guarantee a producible part. The sequence must still leave clearance for the punch, die, backgauge, ram and operator handling.',
    definition: {
      title: 'What Is Bend Sequence?',
      paragraphs: [
        'Bend sequence is the planned order of bending operations used to form a sheet metal part safely and accurately on a press brake.',
        'A practical press brake bend sequence is never simply left to right. It is chosen from part shape, flange height and direction, punch and die space, machine daylight and throat, backgauge access, material springback and whether the operator can safely rotate and locate the part again.',
      ],
    },
    matters: {
      title: 'Why Bend Sequence Matters',
      intro: 'A poor sheet metal bending order can make a sound drawing impossible to run after the first bends close the work envelope.',
      items: [
        ['Avoid part collision', 'Previously formed returns must not hit the ram, holder or frame during the next stroke.'],
        ['Avoid tooling interference', 'A return flange or box wall must clear the punch body and V-die shoulders.'],
        ['Control angle accumulation', 'Critical datum bends should not inherit avoidable error from repeated handling and earlier angular drift.'],
        ['Keep flange access', 'Short or internal bends must remain seatable on the die and locatable on the backgauge.'],
        ['Improve repeatability', 'Fewer flips, rotations and improvised re-clamping reduce operator variation.'],
        ['Protect production', 'A proven order lowers scrap, rework, tool damage and collision risk to the machine.'],
      ],
    },
    rules: {
      title: 'Common Bend Sequence Rules',
      intro: 'These are experience-based guidelines, not fixed rules. A deep enclosure, gooseneck punch, special die or automated handling may require a different order.',
      items: [
        'Bend inner features before outer flanges when later access will become restricted.',
        'Form short flanges while they can still be supported on the die shoulders and reached by the backgauge.',
        'Use large simple bends early when they provide a stable locating face without closing later access.',
        'Leave closing bends and box bending sequence operations until the required internal bends are complete.',
        'Do not form a geometry that cannot be returned into the press brake for the remaining bend lines.',
        'Check tooling height, punch nose and body clearance, die opening, return-flange swing path and backgauge space.',
        'Plan springback correction and datum selection before the final critical bend.',
        'Reduce unnecessary part flipping and rotating, especially for long or finish-sensitive work.',
      ],
    },
    example: {
      title: 'Example: Wrong Bend Order vs Correct Bend Order',
      wrongTitle: 'Wrong Sequence',
      wrong: ['Bends the tall outside flange first.', 'Blocks access to the difficult inner bend line.', 'Brings the return flange into the upper-tool holder clearance zone.', 'Forces rework, an alternate tool, or a revised flat pattern.'],
      correctTitle: 'Correct Sequence',
      correct: ['Forms the internal or difficult bend while the blank is still open.', 'Keeps die support and backgauge access for the following operation.', 'Completes the outer flange only after tool clearance is verified.', 'Reduces collision exposure and gives more repeatable final dimensions.'],
    },
    tooling: {
      title: 'Bend Sequence and Tooling Interference',
      paragraphs: [
        'A bend order plan must be checked against the actual upper punch clearance, punch-holder width, die shoulder support and V opening. Return flanges and box walls can collide with a straight punch even when the bend line itself can sit above the V-die; a gooseneck punch may solve one obstruction but introduces its own load and depth limits.',
        'Also check whether the part can reach the backgauge after each bend and whether the folded leg swings into the ram, holder or adjacent tooling segment. V-die opening and minimum flange support remain linked decisions, not separate catalog selections.',
      ],
    },
    springback: {
      title: 'Bend Sequence and Springback',
      paragraphs: [
        'Sequence determines which formed leg becomes the reference for later positioning. If early bends drift open after unloading, each new location can carry angle or flange-position error into the finished part.',
        'For tolerance-critical work, qualify springback on the selected material batch and tool set, reserve adjustment for the final critical bend when practical, and record which bend was corrected during trial bending. A compensation value proven on an open test coupon should not be blindly applied after a closed box changes restraint and handling.',
      ],
    },
    production: {
      title: 'Practical Production Advice',
      items: [
        'Run a trial bend for precision parts; sequence, angle correction and final flange locations must be measured together.',
        'Review complex parts using the actual machine daylight, throat, tool height, segment layout and backgauge reach.',
        'Do not release a job only from flat pattern software output; software may not represent shop tooling or collision paths.',
        'Operators legitimately adjust the planned sequence for the available press brake, tool set and incoming material batch, provided the change is documented and inspected.',
        'Support long parts correctly and confirm crowning and handling orientation before accumulating multiple bends.',
        'Deep boxes and closing flanges demand extra interference checking before the final stroke commits the part shape.',
      ],
    },
    linksTitle: 'Sequence Planning References',
    linksIntro: 'Use these checks together when qualifying a bend order:',
    faqTitle: 'Frequently Asked Questions',
    faq: [
      ['What is a bend sequence in press brake bending?', 'It is the planned order in which bend lines are formed so the part remains accessible, correctly located and safe to complete on the press brake.'],
      ['Why is bend sequence important in sheet metal forming?', 'It prevents earlier flanges from blocking later work, reduces handling and angle accumulation, and protects tooling, machine and material from avoidable collisions or scrap.'],
      ['What happens if the bend order is wrong?', 'A return flange may obstruct the punch or holder, the backgauge may become unreachable, or dimensions may accumulate error; the part can require new tooling, rework or a new blank.'],
      ['How do you choose the correct bending sequence?', 'Review geometry, restricted bends, flange support, rotation, punch and V-die clearance, backgauge access, machine opening, springback and inspection datums before proving the order with a trial part.'],
      ['Does bend sequence affect springback?', 'Yes. The sequence changes restraint and the reference legs used for subsequent positioning, so springback correction and accumulated angle error can change.'],
      ['How does tooling interference affect bend sequence?', 'Previously formed legs must clear the punch body, holder, die shoulders and ram throughout loading and bending; if they do not, the bend must move earlier or use suitable tooling.'],
      ['Should complex parts be trial bent before production?', 'Yes. Trial bending verifies collision clearance, sequence, angle correction, dimensions and safe handling with the actual material, machine and tooling.'],
    ],
    diagram: {
      title: 'Wrong Bend Order vs Correct Bend Order',
      intro: 'Cross-section check of a two-bend return flange: the wrong first operation closes upper-tool access; the correct order forms the restricted inner bend before the tall return.',
      svgTitle: 'Press brake bend sequence tooling clearance comparison',
      svgDescription: 'Two press brake cross sections compare a tall outside flange colliding with the upper tool holder after a wrong first bend against a correct sequence that keeps clearance for an inner bend before closing the flange.',
      wrong: 'Wrong Sequence',
      wrongStep: 'OUTER FLANGE FIRST / INNER BEND BLOCKED',
      correct: 'Correct Sequence',
      correctStep: 'INNER BEND FIRST / CLOSING BEND SECOND',
      punch: 'Punch',
      vDie: 'V-Die',
      sheet: 'Sheet Metal',
      firstBend: 'First Bend',
      secondBend: 'Second Bend',
      collision: 'Collision Risk',
      correctOrder: 'Correct Bend Order',
      clearance: 'Tool Clearance',
      note: 'Clearance must be checked with the installed punch holder and segmented tooling, not only the punch tip profile.',
    },
  },
  zh: {
    back: '\u2190 返回工程工具中心', eyebrow: '折弯工艺指南', title: '折弯顺序指南',
    subtitle: '规划正确的折弯机折弯顺序，避免干涉和返工，提高钣金折弯精度。',
    shopNote: '展开尺寸和吨位计算正确，并不等于零件一定能折出来。工艺顺序还必须给上模、下模、后挡料、滑块及操作翻转留出空间。',
    definition: { title: '什么是折弯顺序？', paragraphs: ['折弯顺序，是在折弯机上安全、准确地完成钣金零件成形时，对各道折弯工序进行的先后规划。', '真实生产中的顺序绝不是简单从左到右。必须结合零件形状、翻边高度和方向、模具空间、机床开口和喉口、后挡料定位、材料回弹，以及操作者能否再次安全翻转和靠挡定位。'] },
    matters: { title: '为什么折弯顺序重要', intro: '顺序错误时，前面已经折好的边会直接挡住后续工序，原本可生产的图纸也可能在现场做不下去。', items: [['避免工件碰撞', '已成形的回边不能在下一刀碰上滑块、夹具或机身。'], ['避免模具干涉', '回边或箱体侧壁必须避开上模本体和 V 型模肩部。'], ['控制角度累积误差', '关键基准折弯不应叠加不必要的翻料误差和前序角度偏差。'], ['保持翻边可加工', '短边和内折边要在还能稳定压在模肩、还能靠到后挡料时完成。'], ['提高重复性', '减少翻面、旋转和临时重新定位，可降低操作波动。'], ['保护生产', '经验证的顺序能减少废品、返工、模具损伤和设备碰撞风险。']] },
    rules: { title: '常用折弯顺序规则', intro: '以下是根据车间经验总结的工艺原则，不是绝对规则。深箱件、鹅颈上模、特殊下模或自动上下料可能需要调整顺序。', items: ['后续空间会受限时，先折内侧结构，再折外侧翻边。', '短翻边应在仍能得到模肩支撑、仍能使用后挡料定位时先做。', '若大而简单的折弯能够提供稳定定位面且不封死后序空间，可优先完成。', '收口折弯和箱体闭合折弯通常放在内部必要折弯完成之后。', '不要先形成一个无法重新放回折弯机完成剩余折弯线的形状。', '核查模具高度、上模鼻尖与本体间隙、V 口、回边摆动路径及后挡空间。', '在最后一道关键折弯前确定回弹修正策略和检验基准。', '长件或外观件应尽量减少不必要的翻面和旋转。'] },
    example: { title: '示例：错误顺序与正确顺序', wrongTitle: '错误顺序', wrong: ['先折高的外侧翻边。', '内侧难折的折弯线被已经形成的回边挡住。', '回边进入上模夹具的干涉区域。', '最终只能返工、更换特殊模具或重新展开下料。'], correctTitle: '正确顺序', correct: ['板件仍为开放状态时先完成内部或难加工折弯。', '为下一道保留下模支撑和后挡料定位空间。', '确认模具间隙后再完成外侧翻边。', '降低碰撞风险，并提高最终尺寸重复性。'] },
    tooling: { title: '折弯顺序与模具干涉', paragraphs: ['顺序评审必须按现场实际使用的上模间隙、上模夹具宽度、下模肩部支撑和 V 型开口检查。即使折弯线能够对准 V 槽，回边或箱体侧壁仍可能碰到直剑上模；鹅颈上模可解决部分避让问题，但也受承载能力和深度限制。', '还要检查每一刀完成后能否继续靠到后挡料，以及翻起的边是否扫到滑块、夹具或相邻分段模具。V 开口与最小翻边支撑必须一起判断，不能各自孤立选型。'] },
    springback: { title: '折弯顺序与回弹', paragraphs: ['顺序决定哪一条已折边成为后续定位基准。如果前序折弯卸载后角度张开，后面的定位就可能把角度偏差或边长位置偏差继续带到成品。', '对于精密件，应在确定材料批次和模具组合后试弯，尽可能把最后关键折弯留作可修正工序，并记录试弯时修正的是哪一道。开放试片上验证的补偿值，不能不经确认直接套用到约束条件不同的封闭箱体。'] },
    production: { title: '实际生产建议', items: ['精密件仍必须试弯，顺序、角度修正和最终边长位置要一起测量。', '复杂件要按实际设备开口、喉口、模具高度、分段布置和后挡行程评审。', '不要只依赖展开软件输出放行生产；软件未必包含现场模具和碰撞路径。', '操作者会根据现有折弯机、模具和到料批次调整顺序，这是合理工艺行为，但变更必须记录并检验。', '长件要考虑托料、挠度补偿和搬运方向，避免多道折弯后累积扭曲。', '深箱件和收口边在最后一刀之前必须额外核查干涉。'] },
    linksTitle: '顺序规划关联参考', linksIntro: '确定折弯顺序时，应将以下项目一并校核：',
    faqTitle: '常见问题', faq: [['折弯机加工中的折弯顺序是什么？', '它是为保证零件可进入、可定位并能安全完成而安排的各条折弯线加工先后次序。'], ['为什么折弯顺序对钣金成形重要？', '正确顺序能避免先折好的边挡住后序，减少翻料和角度累积误差，并降低工件、模具和设备碰撞损伤。'], ['折弯顺序错误会发生什么？', '回边可能挡住上模或夹具、后挡料无法定位，尺寸也会累积偏差，严重时必须换模、返工或重新下料。'], ['如何选择正确的折弯顺序？', '在试制前检查几何形状、难加工折弯、翻边支撑、翻转路径、模具间隙、后挡空间、机床开口、回弹和检验基准。'], ['折弯顺序会影响回弹吗？', '会。顺序会改变零件约束状态和后续定位基准，因此回弹修正量和角度累积结果都可能不同。'], ['模具干涉如何影响折弯顺序？', '已成形边在上料和折弯全过程必须避开上模本体、夹具、模肩和滑块；无法避让的折弯应前移或使用合适模具。'], ['复杂零件量产前是否需要试弯？', '需要。试弯用于验证实际材料、机床和模具条件下的间隙、顺序、角度补偿、尺寸与操作安全性。']],
    diagram: { title: '错误折弯顺序与正确折弯顺序', intro: '两道回边截面对比：错误做法先折高外边，封住上模进入空间；正确做法先完成受限内折，再完成收口边。', svgTitle: '折弯顺序与模具间隙对比图', svgDescription: '左侧显示先折高外侧翻边后，工件回边与上模夹具干涉；右侧显示先折内弯并保留模具间隙后再完成外侧翻边。', wrong: '错误顺序', wrongStep: '先折外边 / 内折被挡住', correct: '正确顺序', correctStep: '先折内边 / 再做收口边', punch: '上模', vDie: 'V 型下模', sheet: '板材', firstBend: '第一刀', secondBend: '第二刀', collision: '碰撞风险', correctOrder: '正确折弯顺序', clearance: '模具间隙', note: '间隙必须按实际安装的上模夹具和分段模具核查，不能只看上模鼻尖轮廓。' },
  },
  ru: {
    back: '\u2190 К инженерным инструментам', eyebrow: 'Руководство по технологии', title: 'Руководство по последовательности гибки',
    subtitle: 'Планируйте порядок гибки на листогибочном прессе, чтобы исключить помехи, сократить переделку и повысить точность деталей.',
    shopNote: 'Верная развертка и расчет усилия еще не гарантируют выполнимость детали: порядок должен сохранять проход для пуансона, матрицы, заднего упора, балки и манипуляций оператора.',
    definition: { title: 'Что такое последовательность гибки?', paragraphs: ['Последовательность гибки - это заранее назначенный порядок операций, позволяющий безопасно и точно сформировать листовую деталь на листогибочном прессе.', 'В производстве это не простое движение слева направо. Учитывают форму детали, высоту и направление полок, пространство оснастки, раскрытие и зев станка, доступ заднего упора, пружинение материала и возможность безопасно перевернуть и снова базировать деталь.'] },
    matters: { title: 'Почему порядок гибки важен', intro: 'Неверный порядок может закрыть рабочее пространство уже выполненными гибами.', items: [['Исключить столкновение детали', 'Ранее отогнутые полки не должны ударять в балку, зажим или станину.'], ['Исключить помехи оснастки', 'Возвратная полка или стенка короба должна проходить мимо пуансона и плеч матрицы.'], ['Снизить накопление ошибок', 'Критические базовые гибы не должны наследовать лишнюю ошибку угла и перебазирования.'], ['Сохранить доступ к полке', 'Короткие и внутренние гибы выполняют, пока возможны опора и базирование.'], ['Повысить повторяемость', 'Меньше переворотов и поворотов означает меньший разброс операции.'], ['Защитить производство', 'Проверенный порядок уменьшает брак, переделку и риск повреждения инструмента или станка.']] },
    rules: { title: 'Практические правила последовательности', intro: 'Это рекомендации из практики, а не абсолютные правила: глубокий короб или специальный инструмент могут потребовать иного плана.', items: ['При ограниченном доступе внутренние элементы гнут до наружных полок.', 'Короткие полки выполняют до того, как крупная полка перекроет опору и задний упор.', 'Большой простой гиб можно выполнить раньше, если он дает устойчивую базу и не закрывает последующие операции.', 'Закрывающие гибы и формирование короба обычно оставляют напоследок.', 'Нельзя создавать форму, которую невозможно вернуть в станок для оставшихся линий гиба.', 'Проверяют высоту инструмента, носик и тело пуансона, раскрытие V-матрицы, траекторию полки и место для заднего упора.', 'До окончательного критического гиба определяют стратегию коррекции пружинения.', 'Сокращают лишние перевороты и вращения, особенно для длинных и декоративных деталей.'] },
    example: { title: 'Пример: неверный и правильный порядок', wrongTitle: 'Неверная последовательность', wrong: ['Сначала выполняется высокая наружная полка.', 'Она закрывает доступ к сложному внутреннему гибу.', 'Возникает столкновение с зоной держателя верхнего инструмента.', 'Требуется переделка, иной инструмент или новая заготовка.'], correctTitle: 'Правильная последовательность', correct: ['Сначала выполняется внутренний затрудненный гиб на открытой заготовке.', 'Сохраняются опора на матрице и доступ заднего упора.', 'Наружная полка замыкается после проверки прохода инструмента.', 'Снижается риск столкновения и повышается повторяемость размеров.'] },
    tooling: { title: 'Последовательность и помехи оснастки', paragraphs: ['Порядок проверяют по реальному зазору пуансона, ширине держателя, опоре плеч матрицы и раскрытию V. Стенка короба может столкнуться с прямым пуансоном, даже если линия гиба устанавливается над матрицей; гусиный пуансон помогает не всегда и имеет ограничения по нагрузке и глубине.', 'После каждого гиба проверяют доступ заднего упора и траекторию полки относительно балки, держателя и соседних сегментов. Выбор V-матрицы и минимальная длина полки оцениваются совместно.'] },
    springback: { title: 'Последовательность и пружинение', paragraphs: ['Порядок задает, какая отогнутая полка станет базой следующей установки. Раскрытие раннего угла после разгрузки может переносить ошибку в последующие размеры.', 'Для точных деталей пружинение квалифицируют на выбранной партии и комплекте оснастки, корректируют критический окончательный гиб и фиксируют результаты пробной гибки. Поправку с открытого образца нельзя без проверки переносить на закрытый короб.'] },
    production: { title: 'Рекомендации для производства', items: ['Точные детали требуют пробной гибки с контролем порядка, угла и положения полок.', 'Сложные детали оценивают по реальному раскрытию станка, зеву, высоте и сегментам инструмента, а также ходу заднего упора.', 'Не следует выпускать задание только по выводу программы развертки: она может не знать установленную оснастку и траекторию столкновения.', 'Оператор может адаптировать порядок к станку, инструменту и партии материала, но изменение документируют и контролируют.', 'Для длинных деталей проверяют поддержку, компенсацию прогиба и способ обращения.', 'Глубокие короба и замыкающие полки требуют дополнительной проверки столкновений.'] },
    linksTitle: 'Связанные проверки планирования', linksIntro: 'При утверждении порядка совместно используйте следующие справочники:',
    faqTitle: 'Часто задаваемые вопросы', faq: [['Что такое последовательность гибки на листогибе?', 'Это планируемый порядок формирования линий гиба, при котором деталь остается доступной, базируемой и безопасной для завершения.'], ['Почему последовательность важна при формовке листа?', 'Она предотвращает перекрытие последующих операций готовыми полками, уменьшает перебазирование и ошибки угла, защищает деталь, инструмент и станок.'], ['Что происходит при неверном порядке?', 'Полка может упереться в пуансон или держатель, задний упор станет недоступен, а размер накопит ошибку; может понадобиться иной инструмент, переделка или новая заготовка.'], ['Как выбрать правильную последовательность?', 'До пробной детали оценивают геометрию, затрудненные гибы, опору полки, повороты, зазор оснастки, задний упор, раскрытие станка, пружинение и базы контроля.'], ['Влияет ли порядок на пружинение?', 'Да. Он меняет закрепление и базовые полки последующих установок, поэтому меняются коррекция и накопленная ошибка угла.'], ['Как помехи инструмента влияют на порядок?', 'Уже согнутые полки должны проходить мимо тела пуансона, держателя, плеч матрицы и балки; иначе операцию переносят раньше или выбирают подходящую оснастку.'], ['Нужна ли пробная гибка сложных деталей?', 'Да. Она проверяет проход, порядок, коррекцию угла, размеры и безопасное обращение на фактических материале, станке и оснастке.']],
    diagram: { title: 'Неверный и правильный порядок гибки', intro: 'Сечение детали с двумя гибами: высокая наружная полка, выполненная первой, закрывает проход верхнего инструмента; внутренний гиб, выполненный первым, сохраняет доступ.', svgTitle: 'Сравнение последовательности гибки и прохода оснастки', svgDescription: 'Слева возвратная полка сталкивается с держателем верхнего инструмента; справа внутренний гиб выполнен первым и остается зазор для следующей операции.', wrong: 'Неверный порядок', wrongStep: 'СНАЧАЛА НАРУЖНАЯ ПОЛКА / ДОСТУП ЗАКРЫТ', correct: 'Правильный порядок', correctStep: 'СНАЧАЛА ВНУТРЕННИЙ ГИБ / ЗАТЕМ ЗАМЫКАНИЕ', punch: 'Пуансон', vDie: 'V-матрица', sheet: 'Лист', firstBend: 'Первый гиб', secondBend: 'Второй гиб', collision: 'Риск столкновения', correctOrder: 'Верный порядок', clearance: 'Зазор инструмента', note: 'Проход проверяют с установленным держателем пуансона и сегментами инструмента, а не только по профилю носика.' },
  },
  es: {
    back: '\u2190 Volver a herramientas de ingeniería', eyebrow: 'Guía de proceso', title: 'Guía de secuencia de plegado',
    subtitle: 'Planifique el orden correcto de plegado en plegadora para evitar interferencias, reducir retrabajos y mejorar la precisión de la chapa.',
    shopNote: 'Una chapa desarrollada correctamente y un tonelaje correcto no garantizan una pieza fabricable: la secuencia debe dejar paso al punzón, matriz, tope trasero, carnero y manipulación.',
    definition: { title: '¿Qué es la secuencia de plegado?', paragraphs: ['La secuencia de plegado es el orden planificado de operaciones utilizado para formar una pieza de chapa con seguridad y precisión en una plegadora.', 'En producción no consiste en plegar simplemente de izquierda a derecha. Se selecciona según geometría, altura y sentido de pestañas, espacio del utillaje, abertura y garganta de máquina, acceso al tope, retorno elástico y posibilidad real de girar y referenciar la pieza.'] },
    matters: { title: 'Por qué importa la secuencia', intro: 'Un orden incorrecto puede cerrar el espacio de trabajo con plegados ya terminados.', items: [['Evitar colisión de pieza', 'Las pestañas formadas no deben golpear el carnero, portaherramientas ni bastidor.'], ['Evitar interferencia del utillaje', 'Un retorno o pared de caja debe librar punzón y hombros de matriz.'], ['Reducir error acumulado', 'Los plegados de referencia no deben heredar errores evitables de ángulo y reposicionado.'], ['Mantener acceso', 'Las pestañas cortas o internas se forman mientras aún tienen apoyo y tope.'], ['Mejorar repetibilidad', 'Menos giros, volteos y reaprietes reducen variación del operario.'], ['Proteger producción', 'Un orden probado reduce chatarra, retrabajo y daños en herramienta o máquina.']] },
    rules: { title: 'Reglas prácticas de secuencia', intro: 'Son pautas basadas en experiencia, no reglas absolutas; cajas profundas o herramientas especiales pueden cambiar la decisión.', items: ['Pliegue elementos interiores antes que pestañas exteriores cuando el acceso vaya a limitarse.', 'Forme pestañas cortas antes de que una pestaña grande bloquee apoyo o tope.', 'Realice primero un pliegue grande y simple si crea una referencia estable sin cerrar operaciones posteriores.', 'Deje pliegues de cierre o secuencias de caja para las últimas operaciones.', 'No cree una forma que no pueda volver a introducirse para completar las líneas restantes.', 'Compruebe altura, nariz y cuerpo del punzón, abertura V, trayectoria del retorno y espacio del tope.', 'Considere la corrección de retorno antes del pliegue crítico final.', 'Reduzca volteos y giros innecesarios, especialmente en piezas largas o vistas.'] },
    example: { title: 'Ejemplo: orden incorrecto frente a correcto', wrongTitle: 'Secuencia incorrecta', wrong: ['Pliega primero la pestaña exterior alta.', 'Bloquea el acceso al pliegue interior difícil.', 'Coloca el retorno en la zona de colisión del portaherramientas superior.', 'Obliga a retrabajar, cambiar utillaje o cortar otra pieza.'], correctTitle: 'Secuencia correcta', correct: ['Forma primero el pliegue interior o difícil con la chapa abierta.', 'Mantiene apoyo de matriz y acceso al tope para la operación siguiente.', 'Cierra la pestaña exterior después de verificar el paso.', 'Reduce el riesgo de colisión y mejora la repetibilidad dimensional.'] },
    tooling: { title: 'Secuencia e interferencia del utillaje', paragraphs: ['El plan debe comprobarse con el paso real del punzón, ancho del portaherramientas, apoyo de hombros y abertura V. Una pared de caja puede chocar con un punzón recto aunque la línea entre en la matriz; un punzón cuello de cisne resuelve algunas obstrucciones, con límites de carga y profundidad.', 'También debe verificarse el acceso al tope tras cada pliegue y el barrido de la pestaña contra carnero, portaherramientas o segmentos vecinos. La abertura V y la pestaña mínima se deciden conjuntamente.'] },
    springback: { title: 'Secuencia y retorno elástico', paragraphs: ['La secuencia decide qué ala formada se convierte en referencia de posicionamiento. Si un ángulo temprano abre al descargar, puede trasladar error angular o posicional a la pieza terminada.', 'En piezas de tolerancia estrecha, califique el retorno con lote y utillaje elegidos, reserve ajuste para el pliegue crítico final cuando sea posible y registre la corrección en pruebas. Un cupón abierto no representa automáticamente la restricción de una caja cerrada.'] },
    production: { title: 'Consejos prácticos de producción', items: ['Las piezas de precisión aún necesitan plegado de prueba con medición de secuencia, ángulo y cotas.', 'Revise piezas complejas con abertura, garganta, altura y segmentos de herramienta y alcance del tope reales.', 'No libere el trabajo solo desde el desarrollo de software; puede no incluir utillaje ni rutas de colisión de taller.', 'El operario puede adaptar la secuencia a máquina, herramienta y lote, siempre documentando e inspeccionando el cambio.', 'Las piezas largas requieren apoyo, compensación de flecha y manejo controlado.', 'Cajas profundas y pestañas de cierre necesitan una verificación adicional de interferencia.'] },
    linksTitle: 'Referencias para planificar la secuencia', linksIntro: 'Use conjuntamente estas comprobaciones al validar el orden:',
    faqTitle: 'Preguntas frecuentes', faq: [['¿Qué es una secuencia de plegado en plegadora?', 'Es el orden planificado de formación de las líneas para que la pieza continúe accesible, localizable y segura de completar.'], ['¿Por qué es importante en conformado de chapa?', 'Evita que pestañas previas bloqueen operaciones, reduce manipulación y acumulación de errores, y protege herramienta, máquina y material.'], ['¿Qué ocurre si el orden es incorrecto?', 'Un retorno puede obstruir punzón o portaherramientas, perderse el tope o acumularse error dimensional; puede requerir otro útil, retrabajo o una chapa nueva.'], ['¿Cómo se elige la secuencia correcta?', 'Se revisan geometría, pliegues restringidos, apoyo, rotación, paso de herramienta, tope, abertura de máquina, retorno y referencias de inspección antes de probar una pieza.'], ['¿La secuencia afecta al retorno elástico?', 'Sí. Cambia la restricción y las alas de referencia, por lo que puede variar la corrección y el error angular acumulado.'], ['¿Cómo afecta la interferencia del utillaje?', 'Las alas formadas deben librar cuerpo del punzón, portaherramientas, hombros y carnero; si no, el pliegue se adelanta o se selecciona otro útil adecuado.'], ['¿Deben probarse las piezas complejas antes de producir?', 'Sí. Una prueba confirma paso, secuencia, corrección angular, cotas y manipulación segura con condiciones reales.']],
    diagram: { title: 'Orden de plegado incorrecto frente a correcto', intro: 'Comparación de un retorno con dos pliegues: plegar primero la pestaña alta cierra el paso superior; plegar primero el interior conserva acceso.', svgTitle: 'Comparación de secuencia y holgura de utillaje', svgDescription: 'A la izquierda una pestaña exterior choca con el portaherramientas; a la derecha el pliegue interior se forma primero y queda holgura.', wrong: 'Secuencia incorrecta', wrongStep: 'PESTAÑA EXTERIOR PRIMERO / INTERIOR BLOQUEADO', correct: 'Secuencia correcta', correctStep: 'INTERIOR PRIMERO / CIERRE SEGUNDO', punch: 'Punzón', vDie: 'Matriz V', sheet: 'Chapa', firstBend: 'Primer pliegue', secondBend: 'Segundo pliegue', collision: 'Riesgo de colisión', correctOrder: 'Orden correcto', clearance: 'Holgura de útil', note: 'La holgura debe verificarse con portapunzón y segmentos instalados, no solo con el perfil de la nariz.' },
  },
  tr: {
    back: '\u2190 Mühendislik araçlarına dön', eyebrow: 'Proses mühendisliği kılavuzu', title: 'Büküm sırası kılavuzu',
    subtitle: 'Takım çakışmasını önlemek, yeniden işlemeyi azaltmak ve sac büküm hassasiyetini artırmak için doğru abkant büküm sırasını planlayın.',
    shopNote: 'Doğru açınım ve doğru tonaj tek başına üretilebilir parça anlamına gelmez; sıra, zımba, kalıp, arka dayama, ram ve operatör taşıması için açıklığı korumalıdır.',
    definition: { title: 'Büküm sırası nedir?', paragraphs: ['Büküm sırası, bir sac parçayı abkant preste güvenli ve hassas şekilde şekillendirmek için kullanılan planlı operasyon sırasıdır.', 'Üretimde soldan sağa basit bir akış değildir. Parça geometrisi, flanş yüksekliği ve yönü, takım alanı, makine gün ışığı ve boğazı, arka dayama erişimi, malzeme geri esnemesi ve operatörün parçayı yeniden çevirebilmesi birlikte değerlendirilir.'] },
    matters: { title: 'Büküm sırası neden önemlidir?', intro: 'Yanlış sıra, önceden bükülen flanşlarla çalışma alanını kapatabilir.', items: [['Parça çarpışmasını önler', 'Önceden oluşmuş dönüşler ram, tutucu veya gövdeye çarpmamalıdır.'], ['Takım girişimini önler', 'Dönüş flanşı veya kutu duvarı zımba ve V kalıp omuzlarını geçebilmelidir.'], ['Birikmiş açı hatasını azaltır', 'Kritik referans bükümler gereksiz yer değiştirme ve açı sapmasını devralmamalıdır.'], ['Flanş erişimini korur', 'Kısa ve iç bükümler destek ve arka dayama varken yapılmalıdır.'], ['Tekrarlanabilirliği artırır', 'Daha az çevirme ve döndürme operatör değişkenliğini düşürür.'], ['Üretimi korur', 'Kanıtlanmış sıra hurdayı, yeniden işlemi ve takım/makine hasarını azaltır.']] },
    rules: { title: 'Yaygın büküm sırası kuralları', intro: 'Bunlar deneyime dayalı yönergelerdir; derin kutu, özel takım veya otomasyon farklı bir sıra gerektirebilir.', items: ['Erişim daralacaksa iç özellikleri dış flanşlardan önce bükün.', 'Kısa flanşları büyük flanş destek veya arka dayamayı engellemeden önce oluşturun.', 'Sonraki erişimi kapatmıyorsa büyük ve basit bükümü kararlı referans için erken yapın.', 'Kapanış bükümlerini ve kutu büküm sırasını son operasyonlara bırakın.', 'Kalan çizgiler için makineye tekrar yerleştirilemeyecek bir geometri oluşturmayın.', 'Takım yüksekliğini, zımba burnu ve gövde boşluğunu, V açıklığını, dönüş yolunu ve arka dayama alanını kontrol edin.', 'Son kritik bükümden önce geri esneme düzeltme stratejisini belirleyin.', 'Özellikle uzun veya görünür yüzeyli parçalarda gereksiz çevirme ve döndürmeyi azaltın.'] },
    example: { title: 'Örnek: yanlış sıra ve doğru sıra', wrongTitle: 'Yanlış Sıra', wrong: ['Önce yüksek dış flanşı büker.', 'Zor iç büküm hattına erişimi kapatır.', 'Dönüş flanşını üst takım tutucu çarpışma bölgesine getirir.', 'Yeniden işlem, farklı takım veya yeni açınım gerektirir.'], correctTitle: 'Doğru Sıra', correct: ['Sac açık durumdayken iç veya zor bükümü önce oluşturur.', 'Sonraki işlem için kalıp desteğini ve arka dayama erişimini korur.', 'Takım boşluğu doğrulandıktan sonra dış flanşı tamamlar.', 'Çarpışma riskini azaltır ve ölçü tekrarlanabilirliğini yükseltir.'] },
    tooling: { title: 'Büküm sırası ve takım girişimi', paragraphs: ['Plan, gerçek üst zımba boşluğu, tutucu genişliği, kalıp omzu desteği ve V açıklığı ile kontrol edilmelidir. Büküm hattı V üzerinde yerleşse bile dönüş flanşı düz zımbaya çarpabilir; deveboynu zımba bazı engelleri çözer fakat yük ve derinlik sınırları vardır.', 'Her bükümden sonra arka dayamaya erişim ve yükselen flanşın ram, tutucu veya bitişik segmentlere süpürme yolu kontrol edilir. V açıklığı ile minimum flanş desteği beraber kararlaştırılır.'] },
    springback: { title: 'Büküm sırası ve geri esneme', paragraphs: ['Sıra, sonraki konumlama için hangi bükülmüş ayağın referans olacağını belirler. İlk açılar boşaltmada açılırsa hata bitmiş parçaya taşınabilir.', 'Hassas işlerde seçilen malzeme partisi ve takım seti ile geri esneme doğrulanmalı, mümkünse son kritik büküm ayara ayrılmalı ve deneme büküm düzeltmesi kaydedilmelidir. Açık kupondaki değer kapalı kutu kısıtını doğrulama olmadan temsil etmez.'] },
    production: { title: 'Pratik üretim önerileri', items: ['Hassas parçalarda sıra, açı düzeltmesi ve son flanş ölçüsü birlikte deneme bükümüyle ölçülmelidir.', 'Karmaşık parçaları gerçek gün ışığı, boğaz, takım yüksekliği, segment dizilimi ve arka dayama erişimiyle inceleyin.', 'İşi yalnızca açınım yazılımı çıktısıyla serbest bırakmayın; atölye takımını veya çarpışma yolunu içermeyebilir.', 'Operatör sıra planını mevcut pres, takım ve malzeme partisine göre uyarlayabilir; değişiklik belgelenmeli ve kontrol edilmelidir.', 'Uzun parçalarda destek, sehim kompanzasyonu ve taşıma yönüne dikkat edin.', 'Derin kutular ve kapanış flanşları son strok öncesinde ilave girişim kontrolü gerektirir.'] },
    linksTitle: 'Sıra planlama referansları', linksIntro: 'Büküm sırasını doğrularken şu kontrolleri birlikte kullanın:',
    faqTitle: 'Sık sorulan sorular', faq: [['Abkant bükümünde büküm sırası nedir?', 'Parçanın erişilebilir, referanslanabilir ve güvenle tamamlanabilir kalmasını sağlayan planlı büküm hattı sırasıdır.'], ['Sac şekillendirmede sıra neden önemlidir?', 'Önceki flanşların sonraki işlemleri kapatmasını engeller, taşımayı ve açı birikimini azaltır, takım, makine ve malzemeyi korur.'], ['Büküm sırası yanlış olursa ne olur?', 'Dönüş flanşı zımbayı veya tutucuyu engelleyebilir, arka dayamaya erişilemez ya da ölçü hatası birikir; farklı takım, yeniden işlem veya yeni parça gerekebilir.'], ['Doğru sıra nasıl seçilir?', 'Deneme öncesi geometri, kısıtlı bükümler, destek, döndürme, takım boşluğu, arka dayama, makine açıklığı, geri esneme ve ölçüm referansları incelenir.'], ['Sıra geri esnemeyi etkiler mi?', 'Evet. Kısıtı ve sonraki konumlama referanslarını değiştirdiği için düzeltme ve birikmiş açı hatası değişebilir.'], ['Takım girişimi sırayı nasıl etkiler?', 'Bükülmüş ayaklar zımba gövdesi, tutucu, kalıp omuzları ve ramdan geçmelidir; geçmiyorsa işlem erkene alınır veya uygun takım kullanılır.'], ['Karmaşık parçalar üretimden önce denenmeli mi?', 'Evet. Deneme, gerçek malzeme, makine ve takım ile açıklık, sıra, açı düzeltmesi, ölçü ve güvenli taşımayı doğrular.']],
    diagram: { title: 'Yanlış ve doğru büküm sırası', intro: 'İki bükümlü dönüş kesiti: yüksek dış flanşın önce yapılması üst takım erişimini kapatır; iç bükümün önce yapılması boşluğu korur.', svgTitle: 'Büküm sırası ve takım açıklığı karşılaştırması', svgDescription: 'Solda dış flanş üst takım tutucusuyla çarpışır; sağda iç büküm önce yapılır ve sonraki işlem için boşluk kalır.', wrong: 'Yanlış Sıra', wrongStep: 'DIŞ FLANŞ ÖNCE / İÇ BÜKÜM KAPALI', correct: 'Doğru Sıra', correctStep: 'İÇ BÜKÜM ÖNCE / KAPANIŞ SONRA', punch: 'Zımba', vDie: 'V Kalıp', sheet: 'Sac', firstBend: 'İlk Büküm', secondBend: 'İkinci Büküm', collision: 'Çarpışma Riski', correctOrder: 'Doğru Büküm Sırası', clearance: 'Takım Boşluğu', note: 'Boşluk yalnızca zımba burnuna göre değil, takılı zımba tutucusu ve segment takımlar ile kontrol edilmelidir.' },
  },
  id: {
    back: '\u2190 Kembali ke alat teknik', eyebrow: 'Panduan proses teknik', title: 'Panduan urutan bending',
    subtitle: 'Rencanakan urutan bending press brake yang benar untuk menghindari interferensi, mengurangi rework, dan meningkatkan akurasi bending plat.',
    shopNote: 'Flat pattern dan tonase yang benar belum menjamin komponen dapat dibuat; urutan tetap harus menyediakan ruang untuk punch, die, backgauge, ram, dan penanganan operator.',
    definition: { title: 'Apa itu urutan bending?', paragraphs: ['Urutan bending adalah urutan operasi yang direncanakan untuk membentuk komponen plat dengan aman dan akurat pada press brake.', 'Dalam produksi, urutan bukan sekadar dari kiri ke kanan. Pertimbangkan bentuk komponen, tinggi dan arah flange, ruang tooling, daylight dan throat mesin, akses backgauge, springback material, serta kemampuan operator untuk memutar dan memosisikan ulang komponen.'] },
    matters: { title: 'Mengapa urutan bending penting', intro: 'Urutan yang salah dapat menutup ruang kerja dengan flange yang sudah terbentuk.', items: [['Menghindari tabrakan komponen', 'Return flange yang sudah terbentuk tidak boleh mengenai ram, holder, atau rangka mesin.'], ['Menghindari interferensi tooling', 'Return flange atau dinding box harus melewati punch dan bahu V-die.'], ['Mengurangi akumulasi error sudut', 'Bending referensi kritis tidak boleh menerima kesalahan posisi dan sudut yang tidak perlu.'], ['Menjaga akses flange', 'Flange pendek dan bend internal dibuat saat masih dapat ditumpu dan diposisikan.'], ['Meningkatkan repeatability', 'Lebih sedikit pembalikan dan rotasi mengurangi variasi operator.'], ['Melindungi produksi', 'Urutan teruji mengurangi scrap, rework, dan risiko kerusakan alat atau mesin.']] },
    rules: { title: 'Aturan praktis urutan bending', intro: 'Ini adalah panduan berbasis pengalaman, bukan aturan mutlak; box dalam atau tooling khusus dapat membutuhkan urutan lain.', items: ['Tekuk fitur internal sebelum flange luar jika akses nantinya terbatas.', 'Bentuk flange pendek sebelum flange besar menghalangi tumpuan atau backgauge.', 'Lakukan bend besar sederhana lebih awal jika memberi referensi stabil tanpa menutup proses berikutnya.', 'Sisakan bend penutup atau urutan box untuk operasi akhir.', 'Jangan membentuk geometri yang tidak dapat dimasukkan kembali untuk garis bend tersisa.', 'Periksa tinggi tooling, nose dan badan punch, bukaan V, lintasan return flange, serta ruang backgauge.', 'Rencanakan koreksi springback sebelum bend kritis terakhir.', 'Kurangi pembalikan dan rotasi yang tidak perlu, khususnya pada komponen panjang atau permukaan visual.'] },
    example: { title: 'Contoh: urutan salah vs urutan benar', wrongTitle: 'Urutan Salah', wrong: ['Membentuk flange luar tinggi lebih dahulu.', 'Menghalangi akses ke bend internal yang sulit.', 'Membawa return flange ke zona tabrakan holder atas.', 'Memerlukan rework, tooling lain, atau blank baru.'], correctTitle: 'Urutan Benar', correct: ['Membentuk bend internal atau sulit saat blank masih terbuka.', 'Mempertahankan tumpuan die dan akses backgauge untuk operasi berikutnya.', 'Menyelesaikan flange luar setelah clearance tooling diperiksa.', 'Mengurangi tabrakan dan meningkatkan konsistensi dimensi akhir.'] },
    tooling: { title: 'Urutan bending dan interferensi tooling', paragraphs: ['Rencana harus diperiksa dengan clearance punch atas, lebar holder, dukungan bahu die, dan bukaan V yang benar-benar dipasang. Dinding box dapat mengenai punch lurus walaupun garis bend dapat ditempatkan di atas V-die; punch gooseneck menyelesaikan sebagian hambatan tetapi memiliki batas beban dan kedalaman.', 'Periksa juga akses backgauge setelah setiap bend dan lintasan flange terhadap ram, holder, atau segmen alat lain. Bukaan V dan dukungan flange minimum adalah keputusan yang saling terkait.'] },
    springback: { title: 'Urutan bending dan springback', paragraphs: ['Urutan menentukan flange terbentuk mana yang menjadi referensi untuk posisi berikutnya. Jika sudut awal membuka setelah unloading, error dapat terbawa ke dimensi akhir.', 'Untuk pekerjaan presisi, verifikasi springback pada batch material dan set tooling pilihan, sisakan penyesuaian pada bend kritis akhir bila praktis, dan catat koreksi saat trial bending. Nilai dari kupon terbuka tidak otomatis berlaku untuk box tertutup.'] },
    production: { title: 'Saran produksi praktis', items: ['Komponen presisi tetap memerlukan trial bending; ukur urutan, koreksi sudut, dan lokasi flange akhir bersama-sama.', 'Tinjau komponen rumit menggunakan daylight, throat, tinggi tooling, susunan segmen, dan jangkauan backgauge aktual.', 'Jangan melepas pekerjaan hanya dari output software flat pattern; software mungkin tidak memuat tooling dan jalur tabrakan di workshop.', 'Operator dapat menyesuaikan urutan menurut mesin, tooling, dan batch material yang tersedia, dengan perubahan didokumentasi dan diperiksa.', 'Komponen panjang perlu dukungan, crowning, dan arah handling yang benar.', 'Box dalam dan flange penutup memerlukan pemeriksaan tabrakan tambahan sebelum stroke akhir.'] },
    linksTitle: 'Referensi perencanaan urutan', linksIntro: 'Gunakan pemeriksaan berikut bersama-sama saat mengesahkan urutan:',
    faqTitle: 'Pertanyaan umum', faq: [['Apa itu urutan bend pada press brake?', 'Urutan bend adalah rencana urutan garis tekuk agar komponen tetap dapat diakses, diposisikan, dan diselesaikan dengan aman.'], ['Mengapa urutan penting dalam forming plat?', 'Urutan mencegah flange awal menutup proses berikutnya, mengurangi handling dan akumulasi error sudut, serta melindungi tooling, mesin, dan material.'], ['Apa yang terjadi jika urutan salah?', 'Return flange dapat menghalangi punch atau holder, backgauge tidak tercapai, atau dimensi mengakumulasi error; tooling lain, rework, atau blank baru mungkin diperlukan.'], ['Bagaimana memilih urutan yang benar?', 'Tinjau geometri, bend sulit, dukungan flange, rotasi, clearance tooling, backgauge, bukaan mesin, springback, dan referensi inspeksi sebelum mencoba satu komponen.'], ['Apakah urutan memengaruhi springback?', 'Ya. Urutan mengubah kekangan dan flange referensi untuk posisi berikutnya, sehingga koreksi dan error sudut terakumulasi dapat berubah.'], ['Bagaimana interferensi tooling memengaruhi urutan?', 'Flange terbentuk harus melewati badan punch, holder, bahu die, dan ram; jika tidak, bend dilakukan lebih awal atau memakai tooling yang sesuai.'], ['Apakah komponen rumit perlu trial bending?', 'Ya. Trial memastikan clearance, urutan, koreksi sudut, dimensi, dan handling aman dengan material, mesin, serta tooling aktual.']],
    diagram: { title: 'Urutan bending salah vs benar', intro: 'Perbandingan penampang return flange dua bend: flange luar tinggi yang dibuat pertama menutup akses tooling; bend internal pertama menyisakan ruang.', svgTitle: 'Perbandingan urutan bending dan clearance tooling', svgDescription: 'Kiri menunjukkan return flange bertabrakan dengan holder alat atas; kanan menunjukkan bend internal lebih dahulu sehingga clearance tersedia.', wrong: 'Urutan Salah', wrongStep: 'FLANGE LUAR DAHULU / BEND DALAM TERHALANG', correct: 'Urutan Benar', correctStep: 'BEND DALAM DAHULU / PENUTUP KEDUA', punch: 'Punch', vDie: 'V-Die', sheet: 'Plat', firstBend: 'Bend Pertama', secondBend: 'Bend Kedua', collision: 'Risiko Tabrakan', correctOrder: 'Urutan Bend Benar', clearance: 'Clearance Tooling', note: 'Clearance harus diperiksa dengan holder punch dan tooling segmen yang terpasang, bukan hanya profil nose punch.' },
  },
}

export default function BendSequenceGuide({
  language = 'en',
  setLanguage = () => {},
}) {
  const sharedText = getEngineeringText(language)
  const page = content[language] || content.en

  useEffect(() => {
    setPageSEO({
      title: 'Bend Sequence Guide | Press Brake Sheet Metal Bending Order',
      description: 'Learn how to plan press brake bend sequence for sheet metal parts, avoid tooling interference, reduce angle errors, control springback, and improve bending accuracy in real production.',
      keywords: 'bend sequence, press brake bend sequence, sheet metal bending order, bending sequence guide, press brake bending process, sheet metal forming sequence, bend order planning, press brake tooling interference, box bending sequence, flange bending order',
      canonicalPath: routePath,
    })

    setStructuredData({
      id: 'bend-sequence-guide-jsonld',
      data: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'TechArticle',
            headline: 'Bend Sequence Guide | Press Brake Sheet Metal Bending Order',
            description: 'Practical process engineering guidance for planning press brake bending order, tooling clearance, springback control and safe box forming.',
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
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Engineering Tools', item: getSiteUrl('/engineering-tools') },
              { '@type': 'ListItem', position: 2, name: 'Bend Sequence Guide', item: getSiteUrl(routePath) },
            ],
          },
        ],
      },
    })
  }, [page.faq])

  return (
    <>
      <style>
        {`
          .zyco-sequence-guide {
            min-height: 100vh;
            box-sizing: border-box;
            padding: 52px 22px;
            color: #fff;
            background:
              radial-gradient(circle at 16% 10%, rgba(96,165,250,.33), transparent 28%),
              radial-gradient(circle at 84% 16%, rgba(14,165,233,.2), transparent 25%),
              linear-gradient(145deg, #071224 0%, #0b1f3f 42%, #12366e 74%, #1d4ed8 100%);
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
            position: relative;
          }
          .zyco-sequence-guide::before {
            content: "";
            position: absolute;
            inset: 0;
            background-image: linear-gradient(rgba(96,165,250,.075) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,.075) 1px, transparent 1px);
            background-size: 42px 42px;
            mask-image: linear-gradient(to bottom, #000, transparent 90%);
            pointer-events: none;
          }
          .zyco-sequence-guide__shell { width: min(1160px, 100%); margin: 0 auto; position: relative; }
          .zyco-sequence-guide__header, .zyco-sequence-guide__panel {
            margin-bottom: 22px;
            padding: 30px;
            border: 1px solid rgba(147,197,253,.2);
            border-radius: 28px;
            background: linear-gradient(145deg, rgba(255,255,255,.14), rgba(255,255,255,.05));
            box-shadow: 0 22px 60px rgba(0,0,0,.25);
            backdrop-filter: blur(16px);
          }
          .zyco-sequence-guide__back, .zyco-sequence-guide__tool, .zyco-sequence-guide__inline-tool {
            display: inline-flex;
            padding: 11px 16px;
            border: 1px solid rgba(147,197,253,.38);
            border-radius: 14px;
            color: #dbeafe;
            background: rgba(30,64,175,.32);
            font-weight: 760;
            text-decoration: none;
            transition: all .25s ease;
          }
          .zyco-sequence-guide__back:hover {
            transform: translateY(-2px);
            border-color: rgba(125,211,252,.7);
            color: #fff;
            background: rgba(37,99,235,.42);
            box-shadow: 0 14px 32px rgba(37,99,235,.32), 0 0 0 1px rgba(125,211,252,.16);
          }
          .zyco-sequence-guide__tool:hover, .zyco-sequence-guide__inline-tool:hover {
            transform: translateY(-4px);
            border-color: rgba(125,211,252,.7);
            color: #fff;
            background: rgba(37,99,235,.4);
            box-shadow: 0 14px 30px rgba(56,189,248,.22), 0 7px 22px rgba(2,8,23,.22);
          }
          .zyco-sequence-guide__eyebrow { margin: 24px 0 10px; color: #93c5fd; letter-spacing: 2px; font-weight: 850; text-transform: uppercase; font-size: 12px; }
          .zyco-sequence-guide__title { max-width: 880px; margin: 0; font-size: clamp(34px, 5vw, 48px); line-height: 1.12; font-weight: 900; }
          .zyco-sequence-guide__subtitle { max-width: 900px; margin: 15px 0 0; color: #dbeafe; font-size: 17px; line-height: 1.7; }
          .zyco-sequence-guide__notice { margin: 22px 0 0; padding: 16px 18px; border-left: 3px solid #38bdf8; border-radius: 0 12px 12px 0; background: rgba(15,45,88,.42); color: #bfdbfe; line-height: 1.65; }
          .zyco-sequence-guide__section-title { margin: 0 0 14px; font-size: 25px; font-weight: 850; }
          .zyco-sequence-guide__copy { color: #dbeafe; font-size: 15.5px; line-height: 1.78; }
          .zyco-sequence-guide__copy p { margin: 0 0 12px; }
          .zyco-sequence-guide__copy p:last-child { margin-bottom: 0; }
          .zyco-sequence-guide__cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; margin-top: 18px; }
          .zyco-sequence-guide__cards article, .zyco-sequence-guide__compare article {
            padding: 18px;
            border: 1px solid rgba(147,197,253,.15);
            border-radius: 16px;
            background: rgba(10,34,70,.3);
          }
          .zyco-sequence-guide__cards h3, .zyco-sequence-guide__compare h3 { margin: 0 0 8px; font-size: 16px; }
          .zyco-sequence-guide__cards p { margin: 0; color: #dbeafe; line-height: 1.6; font-size: 14px; }
          .zyco-sequence-guide__list { margin: 0; padding-left: 20px; color: #dbeafe; line-height: 1.75; }
          .zyco-sequence-guide__list li + li { margin-top: 8px; }
          .zyco-sequence-guide__compare { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
          .zyco-sequence-guide__compare article:first-child { border-color: rgba(248,113,113,.35); }
          .zyco-sequence-guide__compare article:last-child { border-color: rgba(52,211,153,.34); }
          .zyco-sequence-guide__links, .zyco-sequence-guide__tools { display: flex; flex-wrap: wrap; gap: 10px; }
          .zyco-sequence-guide__links { margin-top: 16px; }
          .zyco-sequence-guide__faq { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
          .zyco-sequence-guide__faq article { padding: 17px; border: 1px solid rgba(147,197,253,.15); border-radius: 16px; background: rgba(10,34,70,.3); }
          .zyco-sequence-guide__faq h3 { margin: 0 0 8px; font-size: 16px; }
          .zyco-sequence-guide__faq p { margin: 0; color: #dbeafe; line-height: 1.6; font-size: 14px; }
          @media (max-width: 820px) {
            .zyco-sequence-guide { padding: 28px 14px; }
            .zyco-sequence-guide__header, .zyco-sequence-guide__panel { padding: 22px; border-radius: 22px; }
            .zyco-sequence-guide__cards, .zyco-sequence-guide__compare, .zyco-sequence-guide__faq { grid-template-columns: 1fr; }
          }
        `}
      </style>
      <main className='zyco-sequence-guide'>
        <div className='zyco-sequence-guide__shell'>
          <header className='zyco-sequence-guide__header'>
            <LanguageSwitcher className='zyco-page-language-switcher' language={language} setLanguage={setLanguage} />
            <a className='zyco-sequence-guide__back' href='/engineering-tools'>{page.back}</a>
            <p className='zyco-sequence-guide__eyebrow'>{page.eyebrow}</p>
            <h1 className='zyco-sequence-guide__title'>{page.title}</h1>
            <p className='zyco-sequence-guide__subtitle'>{page.subtitle}</p>
            <p className='zyco-sequence-guide__notice'>{page.shopNote}</p>
          </header>

          <section className='zyco-sequence-guide__panel' aria-labelledby='sequence-definition-title'>
            <h2 className='zyco-sequence-guide__section-title' id='sequence-definition-title'>{page.definition.title}</h2>
            <div className='zyco-sequence-guide__copy'>{page.definition.paragraphs.map((text) => <p key={text}>{text}</p>)}</div>
          </section>

          <section className='zyco-sequence-guide__panel' aria-labelledby='sequence-matters-title'>
            <h2 className='zyco-sequence-guide__section-title' id='sequence-matters-title'>{page.matters.title}</h2>
            <p className='zyco-sequence-guide__copy'>{page.matters.intro}</p>
            <div className='zyco-sequence-guide__cards'>
              {page.matters.items.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}
            </div>
          </section>

          <section className='zyco-sequence-guide__panel' aria-labelledby='sequence-rules-title'>
            <h2 className='zyco-sequence-guide__section-title' id='sequence-rules-title'>{page.rules.title}</h2>
            <p className='zyco-sequence-guide__copy'>{page.rules.intro}</p>
            <ul className='zyco-sequence-guide__list'>{page.rules.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          <section className='zyco-sequence-guide__panel' aria-labelledby='sequence-example-title'>
            <h2 className='zyco-sequence-guide__section-title' id='sequence-example-title'>{page.example.title}</h2>
            <div className='zyco-sequence-guide__compare'>
              <article><h3>{page.example.wrongTitle}</h3><ul className='zyco-sequence-guide__list'>{page.example.wrong.map((item) => <li key={item}>{item}</li>)}</ul></article>
              <article><h3>{page.example.correctTitle}</h3><ul className='zyco-sequence-guide__list'>{page.example.correct.map((item) => <li key={item}>{item}</li>)}</ul></article>
            </div>
          </section>

          <BendSequenceMotionDiagram labels={page.diagram} />

          <section className='zyco-sequence-guide__panel' aria-labelledby='sequence-tooling-title'>
            <h2 className='zyco-sequence-guide__section-title' id='sequence-tooling-title'>{page.tooling.title}</h2>
            <div className='zyco-sequence-guide__copy'>{page.tooling.paragraphs.map((text) => <p key={text}>{text}</p>)}</div>
          </section>

          <section className='zyco-sequence-guide__panel' aria-labelledby='sequence-springback-title'>
            <h2 className='zyco-sequence-guide__section-title' id='sequence-springback-title'>{page.springback.title}</h2>
            <div className='zyco-sequence-guide__copy'>{page.springback.paragraphs.map((text) => <p key={text}>{text}</p>)}</div>
          </section>

          <section className='zyco-sequence-guide__panel' aria-labelledby='sequence-production-title'>
            <h2 className='zyco-sequence-guide__section-title' id='sequence-production-title'>{page.production.title}</h2>
            <ul className='zyco-sequence-guide__list'>{page.production.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          <section className='zyco-sequence-guide__panel' aria-labelledby='sequence-links-title'>
            <h2 className='zyco-sequence-guide__section-title' id='sequence-links-title'>{page.linksTitle}</h2>
            <p className='zyco-sequence-guide__copy'>{page.linksIntro}</p>
            <nav className='zyco-sequence-guide__links' aria-label={page.linksTitle}>
              <a className='zyco-sequence-guide__inline-tool' href='/engineering/press-brake-tooling-selection-guide'>{sharedText.relatedTools.toolingSelectionGuide}</a>
              <a className='zyco-sequence-guide__inline-tool' href='/engineering/how-to-choose-press-brake-v-die-opening'>{sharedText.relatedTools.vDieOpeningGuide}</a>
              <a className='zyco-sequence-guide__inline-tool' href='/engineering/minimum-flange-length-guide'>{sharedText.relatedTools.minimumFlangeLengthGuide}</a>
              <a className='zyco-sequence-guide__inline-tool' href='/springback-compensation-guide'>{sharedText.relatedTools.springbackCompensationGuide}</a>
            </nav>
          </section>

          <section className='zyco-sequence-guide__panel' aria-labelledby='sequence-faq-title'>
            <h2 className='zyco-sequence-guide__section-title' id='sequence-faq-title'>{page.faqTitle}</h2>
            <div className='zyco-sequence-guide__faq'>
              {page.faq.map(([question, answer]) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}
            </div>
          </section>

          <section className='zyco-sequence-guide__panel' aria-labelledby='sequence-related-title'>
            <h2 className='zyco-sequence-guide__section-title' id='sequence-related-title'>{sharedText.common.relatedEngineeringTools}</h2>
            <nav className='zyco-sequence-guide__tools' aria-label={sharedText.common.relatedToolsAria}>
              {relatedTools.map(([key, href]) => <a className='zyco-sequence-guide__tool' href={href} key={key}>{sharedText.relatedTools[key]}</a>)}
            </nav>
          </section>
        </div>
      </main>
    </>
  )
}
