import { useEffect } from 'react'
import LanguageSwitcher from '../components/LanguageSwitcher.jsx'
import StainlessSteelBendingDiagram from '../components/StainlessSteelBendingDiagram.jsx'
import { getEngineeringText } from '../languages/engineeringText.js'
import {
  getSiteUrl,
  setPageSEO,
  setStructuredData,
} from '../utils/seo.js'

const routePath = '/engineering/stainless-steel-bending-guide'

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
  ['crowningGuide', '/engineering/press-brake-crowning-guide'],
  ['stainlessSteelBendingGuide', routePath],
  ['aluminumBendingGuide', '/engineering/aluminum-bending-guide'],
]

const content = {
  en: {
    back: '← Back to Engineering Tools',
    eyebrow: 'Engineering Guide',
    title: 'Stainless Steel Bending Guide',
    subtitle: 'Engineering reference for stainless steel press brake bending, where higher strength, stronger springback, visible surface requirements and tooling decisions demand tighter process control than mild steel.',
    seoDescription: 'Engineering guide to stainless steel bending: 304 and 201 behavior, stainless steel springback, V die opening, bend radius, tonnage and reducing die marks.',
    keywords: 'stainless steel bending, stainless steel press brake bending, 304 stainless steel bending, 201 stainless steel bending, stainless steel springback, stainless steel V die opening, stainless steel bend radius, reduce die marks on stainless steel',
    why: {
      title: 'Why Stainless Steel Is More Difficult to Bend',
      text: 'Compared with common mild steel, stainless sheet normally combines higher tensile and yield strength with stronger elastic recovery. A setup that closes correctly in the stroke can open more after unloading, while the increased contact pressure makes polished or brushed faces vulnerable to die-shoulder marks. Tight radii or aggressive openings increase outer-fiber strain and cracking risk. Actual strength and springback also vary between grade, mill condition and material batch, so repeat production needs verified parameters rather than a single generic setting.',
    },
    comparison: {
      title: '201 vs 304 Stainless Steel Bending',
      intro: 'Both grades require stainless-specific setup checks. The differences below describe common shop experience; certified material properties and trial bends govern the released process.',
      headers: ['Engineering point', '201 stainless steel', '304 stainless steel'],
      rows: [
        ['Strength and forming', 'Often supplied at higher strength and can feel harder in bending.', 'Usually offers more predictable formability, while still requiring more force than mild steel.'],
        ['Springback and angle', 'Frequently needs greater overbend or correction due to stronger recovery.', 'Springback remains significant but is commonly easier to stabilize in production.'],
        ['Surface and tooling', 'Higher forming pressure can increase visible shoulder marking.', 'Finished faces still need clean, suitable low-mark tooling and protection.'],
        ['Process selection', 'Verify V opening, radius and tonnage conservatively before batch work.', 'Use controlled V opening and recorded angle compensation for repeat output.'],
      ],
    },
    sections: [
      ['tonnage', 'Tonnage Requirement for Stainless Steel', 'Stainless steel bending force is normally materially higher than the equivalent mild-steel job. Strength raises the required load, thickness has an approximately squared effect, and a small V opening can sharply raise both machine and tool demand. For continuous production, do not plan a stainless job close to the machine maximum: leave practical reserve for batch strength variation, tooling load and repeatable angle correction.'],
      ['v-die', 'V-Die Opening for Stainless Steel', 'V opening is a critical balance. Too small an opening concentrates pressure, increases tonnage and die marks, and can raise cracking risk in a hard sheet or tight bend. Too large an opening increases the natural inside radius, springback and difficulty controlling flange dimensions. Begin from a thickness-based reference, then adjust for grade strength, minimum flange, specified radius and visible-surface requirement.'],
      ['springback', 'Springback Control', 'Stainless steel normally springs back more than mild steel. Production control commonly combines deliberate overbending, CNC angle correction or measured angle feedback, a compatible tooling radius, consistent material batches and documented trial bends. The accepted correction for 304 must not be assumed valid for 201 or for a new coil without checking.'],
      ['tooling', 'Tooling Selection for Stainless Steel', 'Choose punch radius and die shoulder radius to support the required bend radius without concentrating unnecessary strain. Precision-ground, adequately hardened tooling with clean and smooth contact faces improves consistency and limits pickup. For cosmetic parts, assess anti-marking tooling, protective film, urethane barriers or other no-mark concepts while confirming their effect on angle and capacity.'],
      ['surface', 'Surface Protection and Mark Reduction', 'Brushed, polished and mirror stainless surfaces show contact damage readily. Visible die marks and dragging scratches are reduced through clean shoulders, verified protective film, a larger compatible die shoulder radius, no-mark tooling and a V opening that avoids excessive local pressure. Surface protection should be selected before a production batch, not after completed faces have been rejected.'],
      ['radius', 'Inside Radius and Cracking Risk', 'An inside radius that is too small can strain the outside of the bend until cracking appears, particularly with high-strength sheet, thick stainless, unfavorable grain direction or a sharp punch. A larger radius and less severe forming condition often improve consistency for thicker material. Inspect trial bends at the bend line and release the radius and direction condition with the job record.'],
    ],
    problems: {
      title: 'Common Stainless Steel Bending Problems',
      cards: [
        ['Excessive springback', 'Final angle opens beyond tolerance when compensation does not match grade or batch.'],
        ['Visible die marks', 'High shoulder pressure or contaminated contact surfaces imprint finished faces.'],
        ['Cracking at bend line', 'A tight radius, sharp punch, hard material or unfavorable grain direction overloads outer fibers.'],
        ['Angle inconsistency', 'Thickness, strength, tooling wear or uncontrolled coil changes disturb repeatability.'],
        ['High tonnage', 'A narrow V opening or stronger material overloads machine or tooling margins.'],
        ['Tooling wear', 'Sustained pressure and pickup damage shoulders and reduce surface stability.'],
        ['Short flange instability', 'An opening too wide for available flange support allows unstable location.'],
        ['Surface scratching', 'Debris, dragging or unsuitable protection damages visible stainless finish.'],
      ],
    },
    notes: {
      title: 'Engineering Notes',
      items: [
        'Do not apply mild-steel bend settings directly to stainless; qualify the grade and finished surface requirement.',
        'Review material grade, thickness, V opening, tooling radius, surface requirement and production volume as one process condition.',
        'For long batch production, monitor tool wear, sustained machine loading and angle repeatability at defined inspection intervals.',
        'Plan film, urethane or low-mark tooling before forming any high-visibility stainless component.',
      ],
    },
    faqTitle: 'Frequently Asked Questions',
    faq: [
      ['Is stainless steel harder to bend than mild steel?', 'Usually yes. Stainless sheet typically requires more bending force and more springback compensation than comparable mild steel.'],
      ['Does 304 stainless steel spring back more than mild steel?', 'Yes in typical air-bending work. Its elastic recovery commonly requires additional overbend or CNC correction.'],
      ['Is 201 stainless steel harder to bend than 304?', '201 is often encountered at higher strength and may spring back more, but actual certificates and trial bends should determine the setup.'],
      ['What V die opening should be used for stainless steel?', 'Use a thickness-based starting reference and confirm it against strength, inside radius, flange support, tonnage and surface-quality requirements.'],
      ['How can I reduce marks on stainless steel?', 'Keep contact faces clean and use suitable film, urethane or low-mark tools with an opening and shoulder radius that limit pressure.'],
      ['Why does stainless steel crack during bending?', 'Common causes include an overly tight radius, sharp punch, hard material condition, unfavorable grain direction or an opening that concentrates strain.'],
      ['How do I control springback in stainless steel bending?', 'Use recorded trial bends, controlled overbend or angle correction, stable tooling and consistent verified material batches.'],
    ],
    relatedTitle: 'Related Engineering Tools',
    relatedAria: 'Related engineering tools',
    relatedLabels: {
      pressBrakeCalculator: 'Press Brake Calculator', materialDatabase: 'Material Database', vDieSelectionTool: 'V Die Selection Tool', insideRadiusGuide: 'Inside Radius Guide', springbackDatabase: 'Springback Database', bendAllowanceCalculator: 'Bend Allowance Calculator', bendDeductionGuide: 'Bend Deduction Guide', airBendingGuide: 'Air Bending Guide', pressBrakeTonnageGuide: 'Press Brake Tonnage Guide', vDieOpeningGuide: 'How to Choose Press Brake V-Die Opening', minimumFlangeLengthGuide: 'Minimum Flange Length Guide', toolingSelectionGuide: 'Press Brake Tooling Selection Guide', crowningGuide: 'Press Brake Crowning Guide', stainlessSteelBendingGuide: 'Stainless Steel Bending Guide', aluminumBendingGuide: 'Aluminum Bending Guide',
    },
    diagram: { eyebrow: 'Bending Factors Diagram', title: 'Stainless steel bending factors', svgTitle: 'Stainless steel press brake bending factors diagram', svgDescription: 'Punch and V die forming stainless sheet with callouts for springback, contact marking and inside radius.', punch: 'Punch', sheet: 'Stainless sheet', vDie: 'V die', springback: 'Springback angle', markZone: 'Surface mark zone', insideRadius: 'Inside radius', caption: 'Pressure, radius and recovery must be balanced together before approving the production bend.' },
  },
  zh: {
    back: '← 返回工程工具中心', eyebrow: '工程指南', title: '不锈钢折弯指南',
    subtitle: '面向不锈钢折弯机加工的工程参考：其更高强度、更强回弹、可视表面要求和模具决策，使工艺控制比低碳钢更严格。',
    seoDescription: '不锈钢折弯工程指南，涵盖 304 与 201 不锈钢、回弹、V 型模开口、折弯半径、吨位以及减少压痕的方法。',
    keywords: '不锈钢折弯, 不锈钢折弯机加工, 304 不锈钢折弯, 201 不锈钢折弯, 不锈钢回弹, 不锈钢 V 型模开口, 不锈钢折弯半径, 减少不锈钢压痕',
    why: { title: '为什么不锈钢更难折弯', text: '与常见低碳钢相比，不锈钢板通常同时具有更高的抗拉和屈服强度以及更强的弹性恢复。行程内达到的角度卸载后可能明显张开，增大的接触压力也更容易在拉丝或抛光表面留下下模肩部压痕。过紧半径或激进的 V 开口会增加外纤维应变和开裂风险。不同牌号、供货状态与材料批次的强度和回弹也会变化，因此批量生产需要验证过的参数。' },
    comparison: { title: '201 与 304 不锈钢折弯对比', intro: '两种牌号均需采用不锈钢专用设定检查。下述差异属于常见车间经验，最终工艺应由材质证明和试折确认。', headers: ['工程要点', '201 不锈钢', '304 不锈钢'], rows: [['强度与成形', '供货状态下通常强度较高，折弯感受更硬。', '通常成形性更可预测，但所需力仍明显高于低碳钢。'], ['回弹与角度', '经常需要更大的过折量或角度修正。', '回弹仍显著，但批量稳定性通常更易控制。'], ['表面与模具', '较高成形压力可能加重可视压痕。', '成品表面仍需洁净、合适的低痕模具与保护。'], ['工艺选择', '批量前保守核查 V 开口、半径和吨位。', '使用受控 V 开口并记录角度补偿以保证重复输出。']] },
    sections: [
      ['tonnage', '不锈钢的吨位需求', '相同工况下，不锈钢所需折弯力通常明显高于低碳钢。材料强度会提高载荷，厚度对吨位约呈平方影响，小 V 开口还会显著增加机器与模具负荷。连续生产不应将不锈钢工件规划在设备最大吨位附近，应为批次强度波动、模具承载和角度修正保留余量。'],
      ['v-die', '不锈钢的 V 型模开口', 'V 开口必须平衡选择。开口过小会集中压力、提高吨位和压痕，并可能在硬质板材或紧半径处增加裂纹风险；开口过大则会增加自然内 R、回弹和法兰尺寸控制难度。应以板厚参考起步，再依据牌号强度、最小法兰、目标半径与表面要求调整。'],
      ['springback', '回弹控制', '不锈钢通常比低碳钢回弹更强。实际生产常结合有意过折、CNC 角度修正或角度测量反馈、匹配的模具半径、稳定材料批次以及有记录的试折。304 的合格修正值不能未经核验直接套用于 201 或新卷料。'],
      ['tooling', '不锈钢模具选择', '冲头半径与下模肩部半径应在满足目标弯曲半径的同时避免不必要的应变集中。精磨、硬度足够且接触面洁净平滑的模具有助于一致性并减少粘料。对外观件，应评估防压痕模具、保护膜、聚氨酯隔离片或无痕方案，同时确认其对角度和承载的影响。'],
      ['surface', '表面保护与减少压痕', '拉丝、抛光与镜面不锈钢非常容易显现接触损伤。保持肩部洁净、采用经验证的保护膜、适当增大下模肩部半径、使用无痕模具并选择不过度集中压力的 V 开口，可降低压痕和拖擦划伤。表面保护应在批量生产前规划。'],
      ['radius', '内 R 与开裂风险', '内半径过小会使折弯外侧应变增大直至开裂，尤其在高强板、较厚不锈钢、纹向不利或冲头过尖时更明显。对厚板，较大半径和更温和的成形条件通常有利于一致性。应检查试折弯线并将半径和纹向条件写入工艺记录。'],
    ],
    problems: { title: '不锈钢折弯常见问题', cards: [['回弹过大', '补偿与牌号或批次不匹配时，最终角度超差张开。'], ['明显压痕', '肩部压力高或接触面污染会在成品面留下印痕。'], ['弯线开裂', '紧半径、尖冲头、硬材料或不利纹向使外纤维过载。'], ['角度不一致', '厚度、强度、模具磨损或卷料变更影响重复性。'], ['吨位过高', '过窄 V 开口或高强材料侵占机器与模具余量。'], ['模具磨损', '持续高压与粘料损坏肩部并降低表面稳定性。'], ['短边不稳定', '开口相对法兰支撑过宽时定位不稳定。'], ['表面划伤', '碎屑、拖擦或保护方式不合适会损伤可视表面。']] },
    notes: { title: '工程说明', items: ['不能将低碳钢折弯设定直接套用于不锈钢；应确认牌号与成品表面要求。', '应将材料牌号、板厚、V 开口、模具半径、表面要求与生产数量作为同一工艺条件评估。', '长期批量生产应按检验周期监控模具磨损、机器持续负载与角度重复性。', '高可视不锈钢零件在成形前就应规划保护膜、聚氨酯或低痕模具方案。'] },
    faqTitle: '常见问题', faq: [['不锈钢比低碳钢更难折弯吗？', '通常是。不锈钢板一般需要更高折弯力和更大的回弹补偿。'], ['304 不锈钢比低碳钢回弹更大吗？', '在常见空气折弯中是的，通常需要附加过折或 CNC 修正。'], ['201 不锈钢比 304 更难折弯吗？', '201 常见供货状态往往强度更高且回弹可能更大，但应以材质证明和试折确定参数。'], ['不锈钢应选择什么 V 型模开口？', '先采用板厚参考值，再结合强度、内 R、法兰支撑、吨位和表面质量核验。'], ['如何减少不锈钢表面压痕？', '保持接触面洁净，并采用合适保护膜、聚氨酯或低痕模具，同时控制开口与肩部半径。'], ['不锈钢折弯为什么会开裂？', '常见原因是半径过紧、冲头过尖、材料状态偏硬、纹向不利或开口造成应变集中。'], ['如何控制不锈钢折弯回弹？', '采用记录化试折、受控过折或角度修正、稳定模具和经确认的一致材料批次。']],
    relatedTitle: '相关工程工具', relatedAria: '相关工程工具',
    relatedLabels: { pressBrakeCalculator: '折弯机计算器', materialDatabase: '材料数据库', vDieSelectionTool: 'V 型模具选择工具', insideRadiusGuide: '内半径指南', springbackDatabase: '回弹数据库', bendAllowanceCalculator: '折弯展开计算器', bendDeductionGuide: '折弯扣除量指南', airBendingGuide: '空气折弯指南', pressBrakeTonnageGuide: '折弯机吨位指南', vDieOpeningGuide: '如何选择折弯机 V 型模开口', minimumFlangeLengthGuide: '最小翻边长度指南', toolingSelectionGuide: '折弯机模具选型指南', crowningGuide: '折弯机挠度补偿指南', stainlessSteelBendingGuide: '不锈钢折弯指南', aluminumBendingGuide: '铝板折弯指南' },
    diagram: { eyebrow: '折弯因素示意图', title: '不锈钢折弯关键因素', svgTitle: '不锈钢折弯机折弯因素示意图', svgDescription: '冲头和 V 型模对不锈钢板成形，标注回弹、表面压痕区域和内半径。', punch: '冲头', sheet: '不锈钢板', vDie: 'V 型模', springback: '回弹角', markZone: '表面压痕区', insideRadius: '内半径', caption: '批准批量工艺前，必须同时平衡压力、半径和卸载回弹。' },
  },
  ru: {
    back: '← Назад к инженерным инструментам', eyebrow: 'Инженерное руководство', title: 'Руководство по гибке нержавеющей стали',
    subtitle: 'Инженерный справочник по гибке нержавеющей стали на листогибе: повышенная прочность, большее пружинение, требования к поверхности и оснастке требуют более строгого управления, чем для мягкой стали.',
    seoDescription: 'Инженерное руководство по гибке нержавеющей стали 304 и 201: пружинение, раскрытие V-матрицы, радиус, усилие и уменьшение следов.',
    keywords: 'гибка нержавеющей стали, гибка нержавейки на листогибе, гибка стали 304, гибка стали 201, пружинение нержавеющей стали, V-матрица, радиус гиба, следы матрицы',
    why: { title: 'Почему нержавеющую сталь сложнее гнуть', text: 'По сравнению с обычной мягкой сталью нержавеющий лист обычно имеет более высокую прочность на растяжение и предел текучести, а также большее упругое восстановление. Угол после снятия нагрузки раскрывается сильнее, а повышенное контактное давление оставляет следы на шлифованной или полированной поверхности. Малый радиус или слишком узкая V-матрица повышают деформацию наружных волокон и риск трещин. Прочность и пружинение меняются от марки, состояния поставки и партии, поэтому серийный процесс требует проверенных параметров.' },
    comparison: { title: 'Гибка нержавеющей стали 201 и 304', intro: 'Обе марки требуют проверки специального режима для нержавеющей стали. Ниже приведен обычный производственный опыт; окончательное решение принимают по сертификату и пробной гибке.', headers: ['Параметр', 'Нержавеющая сталь 201', 'Нержавеющая сталь 304'], rows: [['Прочность и формование', 'Часто поставляется более прочной и ощущается жестче при гибке.', 'Обычно имеет более предсказуемую формуемость, но требует больше усилия, чем мягкая сталь.'], ['Пружинение и угол', 'Часто требует большего перегиба или коррекции.', 'Пружинение заметно, но его обычно легче стабилизировать в серии.'], ['Поверхность и оснастка', 'Более высокое давление может усилить видимые следы плеч матрицы.', 'Чистая маломаркирующая оснастка и защита также необходимы.'], ['Выбор процесса', 'До серии консервативно проверить V-раскрытие, радиус и усилие.', 'Применять контролируемое раскрытие и записанную коррекцию угла.']] },
    sections: [['tonnage', 'Требуемое усилие для нержавеющей стали', 'Усилие гибки нержавеющей стали обычно заметно выше, чем у аналогичной детали из мягкой стали. Прочность повышает нагрузку, толщина влияет приблизительно в квадрате, а малая V-матрица резко увеличивает нагрузку на станок и инструмент. Для непрерывной серии не следует планировать работу около максимального усилия машины: нужен запас на разброс партии, оснастку и коррекцию угла.'], ['v-die', 'V-матрица для нержавеющей стали', 'Раскрытие V требует баланса. Слишком малое раскрытие концентрирует давление, увеличивает усилие, следы и вероятность трещин. Слишком большое увеличивает естественный внутренний радиус, пружинение и сложность управления размерами полки. Начните с рекомендации по толщине и скорректируйте ее по прочности, минимальной полке, радиусу и требованиям к поверхности.'], ['springback', 'Управление пружинением', 'Нержавеющая сталь обычно пружинит сильнее мягкой. В производстве применяют заданный перегиб, CNC-коррекцию угла или измерительную систему, совместимый радиус инструмента, стабильные партии материала и документированные пробные гибы. Коррекцию для 304 нельзя без проверки переносить на 201 или новый рулон.'], ['tooling', 'Выбор оснастки для нержавеющей стали', 'Радиус пуансона и плеча матрицы должен обеспечивать нужный радиус без лишней концентрации деформации. Точно шлифованная закаленная оснастка с чистыми гладкими поверхностями повышает повторяемость. Для декоративных деталей проверяйте маломаркирующую оснастку, пленку, полиуретановые прокладки или решения без следов с учетом угла и допустимой нагрузки.'], ['surface', 'Защита поверхности и уменьшение следов', 'Шлифованные, полированные и зеркальные поверхности легко показывают повреждения. Чистые плечи, проверенная пленка, подходящий больший радиус плеча, маломаркирующая оснастка и корректное V-раскрытие уменьшают вмятины и царапины. Защиту поверхности следует выбрать до выпуска серии.'], ['radius', 'Внутренний радиус и риск трещин', 'Слишком малый внутренний радиус может вызвать трещины по наружной стороне, особенно у высокопрочного или толстого листа, при неблагоприятном направлении проката или остром пуансоне. Для толстой нержавеющей стали больший радиус и менее жесткое формование обычно дают более стабильный результат. Проверяйте линию гиба на пробной детали и фиксируйте условия.']],
    problems: { title: 'Типичные проблемы гибки нержавеющей стали', cards: [['Чрезмерное пружинение', 'После снятия нагрузки угол выходит за допуск при неверной компенсации.'], ['Видимые следы матрицы', 'Высокое давление или загрязнение отпечатываются на лицевой поверхности.'], ['Трещины по линии гиба', 'Малый радиус, острый пуансон, жесткий материал или направление проката перегружают наружные волокна.'], ['Нестабильный угол', 'Толщина, прочность, износ инструмента или смена рулона нарушают повторяемость.'], ['Высокое усилие', 'Узкая V-матрица или прочный материал сокращают запас машины и инструмента.'], ['Износ оснастки', 'Длительное давление и налипание повреждают плечи матрицы.'], ['Неустойчивая короткая полка', 'Слишком широкое раскрытие не обеспечивает опору короткой полки.'], ['Царапины поверхности', 'Грязь, протягивание или неподходящая защита повреждают отделку.']] },
    notes: { title: 'Инженерные замечания', items: ['Не переносите параметры мягкой стали непосредственно на нержавеющую; квалифицируйте марку и требования к поверхности.', 'Оценивайте марку, толщину, V-раскрытие, радиус инструмента, поверхность и объем серии как одно условие процесса.', 'В длительной серии контролируйте износ инструмента, постоянную нагрузку машины и повторяемость угла.', 'Для заметных поверхностей заранее планируйте пленку, полиуретан или маломаркирующую оснастку.'] },
    faqTitle: 'Часто задаваемые вопросы', faq: [['Нержавеющую сталь сложнее гнуть, чем мягкую?', 'Обычно да: ей требуется больше усилия и большая компенсация пружинения.'], ['Сталь 304 пружинит больше мягкой стали?', 'Да, при обычной воздушной гибке обычно нужен дополнительный перегиб или CNC-коррекция.'], ['Сталь 201 сложнее гнуть, чем 304?', '201 часто имеет более высокую прочность и может больше пружинить, но режим определяют сертификат и пробная гибка.'], ['Какое раскрытие V-матрицы использовать?', 'Начните с значения по толщине и проверьте прочность, радиус, опору полки, усилие и качество поверхности.'], ['Как уменьшить следы на нержавеющей стали?', 'Содержите контакты чистыми и применяйте подходящую пленку, полиуретан или маломаркирующую оснастку с корректным раскрытием.'], ['Почему нержавеющая сталь трескается при гибке?', 'Причиной часто служат слишком малый радиус, острый пуансон, жесткий материал, направление проката или концентрированная деформация.'], ['Как управлять пружинением?', 'Используйте записанные пробные гибы, управляемый перегиб или коррекцию угла, стабильную оснастку и проверенные партии материала.']],
    relatedTitle: 'Связанные инженерные инструменты', relatedAria: 'Связанные инженерные инструменты',
    relatedLabels: { pressBrakeCalculator: 'Калькулятор листогиба', materialDatabase: 'База материалов', vDieSelectionTool: 'Подбор V-матрицы', insideRadiusGuide: 'Справочник внутреннего радиуса', springbackDatabase: 'База пружинения', bendAllowanceCalculator: 'Калькулятор припуска на гиб', bendDeductionGuide: 'Руководство по вычету гиба', airBendingGuide: 'Руководство по воздушной гибке', pressBrakeTonnageGuide: 'Руководство по тоннажу пресса', vDieOpeningGuide: 'Выбор раскрытия V-матрицы', minimumFlangeLengthGuide: 'Руководство по минимальной длине полки', toolingSelectionGuide: 'Выбор оснастки листогиба', crowningGuide: 'Руководство по компенсации прогиба листогиба', stainlessSteelBendingGuide: 'Руководство по гибке нержавеющей стали', aluminumBendingGuide: 'Руководство по гибке алюминия' },
    diagram: { eyebrow: 'Схема факторов гибки', title: 'Факторы гибки нержавеющей стали', svgTitle: 'Схема гибки нержавеющей стали на листогибе', svgDescription: 'Пуансон и V-матрица формуют нержавеющий лист с обозначением пружинения, зоны следов и внутреннего радиуса.', punch: 'Пуансон', sheet: 'Нержавеющий лист', vDie: 'V-матрица', springback: 'Угол пружинения', markZone: 'Зона следа', insideRadius: 'Внутренний радиус', caption: 'Перед утверждением серии совместно проверьте давление, радиус и восстановление после разгрузки.' },
  },
  es: {
    back: '← Volver a herramientas de ingeniería', eyebrow: 'Guía de ingeniería', title: 'Guía de plegado de acero inoxidable',
    subtitle: 'Referencia técnica para el plegado en prensa de acero inoxidable, donde la mayor resistencia, el retorno elástico, el acabado visible y el utillaje exigen más control que en acero dulce.',
    seoDescription: 'Guía técnica del plegado de acero inoxidable 304 y 201: retorno elástico, abertura V, radio, tonelaje y reducción de marcas.',
    keywords: 'plegado de acero inoxidable, plegado en plegadora, acero inoxidable 304, acero inoxidable 201, retorno elástico, abertura matriz V, radio de plegado, reducir marcas',
    why: { title: 'Por qué el acero inoxidable es más difícil de plegar', text: 'Frente al acero dulce común, la chapa inoxidable suele combinar mayor resistencia a tracción y límite elástico con una recuperación elástica superior. Un ángulo cerrado durante la carrera puede abrirse más al descargar, mientras la mayor presión de contacto marca con facilidad acabados cepillados o pulidos. Los radios cerrados o una abertura V agresiva aumentan la deformación exterior y el riesgo de grietas. La resistencia y el retorno también varían entre calidad, condición y lote, por lo que la producción repetitiva exige parámetros verificados.' },
    comparison: { title: 'Plegado de acero inoxidable 201 frente a 304', intro: 'Ambas calidades requieren comprobaciones específicas. Las diferencias reflejan experiencia habitual de taller; el certificado y las pruebas determinan el proceso liberado.', headers: ['Punto técnico', 'Acero inoxidable 201', 'Acero inoxidable 304'], rows: [['Resistencia y conformado', 'A menudo se suministra con mayor resistencia y resulta más duro al plegar.', 'Suele tener conformabilidad más predecible, aunque requiere más fuerza que el acero dulce.'], ['Retorno y ángulo', 'Con frecuencia necesita mayor sobreplegado o corrección.', 'El retorno sigue siendo importante, pero suele estabilizarse con mayor facilidad.'], ['Superficie y utillaje', 'La mayor presión puede aumentar las marcas visibles de hombro.', 'Las caras acabadas también necesitan utillaje limpio, de baja marca y protección.'], ['Selección del proceso', 'Verificar conservadoramente abertura, radio y tonelaje antes de producir.', 'Aplicar abertura controlada y corrección angular registrada.']] },
    sections: [['tonnage', 'Tonelaje requerido para acero inoxidable', 'La fuerza de plegado del inoxidable normalmente es sensiblemente superior a la de una pieza equivalente de acero dulce. La resistencia eleva la carga, el espesor influye aproximadamente al cuadrado y una abertura V pequeña aumenta con rapidez la exigencia de máquina y utillaje. En producción continua no se debe planificar cerca del tonelaje máximo: reserve margen para variación de lote, carga del útil y corrección repetible del ángulo.'], ['v-die', 'Abertura de matriz V para acero inoxidable', 'La abertura V es un equilibrio crítico. Una abertura demasiado pequeña concentra presión, eleva tonelaje y marcas, y puede aumentar las grietas; una demasiado grande incrementa radio interior natural, retorno elástico y dificultad de controlar las alas. Parta de una referencia por espesor y ajuste por resistencia, ala mínima, radio especificado y acabado visible.'], ['springback', 'Control del retorno elástico', 'El inoxidable suele retornar más que el acero dulce. El control de producción combina sobreplegado deliberado, corrección angular CNC o medición, radio de utillaje compatible, lotes consistentes y pruebas documentadas. La corrección aceptada para 304 no debe aplicarse a 201 o a una bobina nueva sin comprobarla.'], ['tooling', 'Selección de utillaje para inoxidable', 'El radio del punzón y el radio del hombro deben soportar el radio exigido sin concentrar deformación innecesaria. Utillajes rectificados, suficientemente endurecidos y limpios mejoran la repetibilidad. Para piezas cosméticas, evalúe útiles antimarca, película, barreras de uretano o conceptos sin marca, comprobando sus efectos en ángulo y capacidad.'], ['surface', 'Protección superficial y reducción de marcas', 'Los acabados cepillados, pulidos y espejo revelan enseguida daños de contacto. Hombros limpios, película verificada, un radio de hombro compatible mayor, utillaje sin marca y la abertura V correcta reducen impresiones y rayas. La protección debe definirse antes de iniciar el lote.'], ['radius', 'Radio interior y riesgo de grietas', 'Un radio interior demasiado pequeño puede agrietar el exterior, sobre todo en chapa resistente o gruesa, dirección de grano desfavorable o con punzón afilado. En inoxidable grueso, un radio mayor y una condición menos severa suelen estabilizar el formado. Inspeccione el pliegue de prueba y registre radio y orientación.']],
    problems: { title: 'Problemas habituales al plegar inoxidable', cards: [['Retorno excesivo', 'El ángulo final se abre fuera de tolerancia por compensación incorrecta.'], ['Marcas visibles', 'Alta presión o contactos contaminados imprimen la cara terminada.'], ['Grietas en la línea', 'Radio cerrado, punzón afilado, material duro o dirección desfavorable sobrecargan la fibra exterior.'], ['Ángulo inconsistente', 'Espesor, resistencia, desgaste o cambio de bobina alteran la repetibilidad.'], ['Tonelaje elevado', 'Una V estrecha o material resistente consume el margen de máquina y útil.'], ['Desgaste de útil', 'Presión sostenida y adherencias dañan los hombros.'], ['Ala corta inestable', 'Una abertura demasiado ancha no sostiene correctamente el ala.'], ['Rayado superficial', 'Residuos, arrastre o protección incorrecta deterioran el acabado.']] },
    notes: { title: 'Notas de ingeniería', items: ['No aplique directamente parámetros de acero dulce al inoxidable; califique material y acabado.', 'Evalúe calidad, espesor, abertura V, radio de herramienta, acabado y volumen como una condición única.', 'En lotes largos controle desgaste de herramienta, carga continua y repetibilidad angular.', 'Planifique película, uretano o utillaje de baja marca antes de plegar piezas de alta visibilidad.'] },
    faqTitle: 'Preguntas frecuentes', faq: [['¿Es más difícil plegar inoxidable que acero dulce?', 'Generalmente sí; suele exigir más fuerza y compensación de retorno.'], ['¿El inoxidable 304 retorna más que el acero dulce?', 'Sí en el plegado al aire habitual; suele requerir sobreplegado o corrección CNC adicional.'], ['¿El inoxidable 201 es más difícil de plegar que el 304?', 'El 201 suele encontrarse con mayor resistencia y puede retornar más, pero deben mandar certificado y prueba.'], ['¿Qué abertura V debe usarse para inoxidable?', 'Empiece con una referencia por espesor y compruebe resistencia, radio, apoyo de ala, tonelaje y acabado.'], ['¿Cómo reduzco marcas en inoxidable?', 'Mantenga contactos limpios y use película, uretano o utillaje de baja marca apropiados con la abertura correcta.'], ['¿Por qué se agrieta el inoxidable al plegarlo?', 'Suele deberse a radio demasiado cerrado, punzón afilado, condición dura, dirección de grano o deformación concentrada.'], ['¿Cómo controlo el retorno elástico?', 'Use pruebas registradas, sobreplegado o corrección angular controlados, utillaje estable y lotes verificados.']],
    relatedTitle: 'Herramientas de ingeniería relacionadas', relatedAria: 'Herramientas de ingeniería relacionadas',
    relatedLabels: { pressBrakeCalculator: 'Calculadora de plegadora', materialDatabase: 'Base de datos de materiales', vDieSelectionTool: 'Selección de matriz V', insideRadiusGuide: 'Guía de radio interior', springbackDatabase: 'Base de datos de retorno elástico', bendAllowanceCalculator: 'Calculadora de desarrollo de plegado', bendDeductionGuide: 'Guía de deducción de plegado', airBendingGuide: 'Guía de plegado al aire', pressBrakeTonnageGuide: 'Guía de tonelaje para plegadoras', vDieOpeningGuide: 'Selección de abertura de matriz V', minimumFlangeLengthGuide: 'Guía de longitud mínima de pestaña', toolingSelectionGuide: 'Guía de selección de utillaje', crowningGuide: 'Guía de compensación de flecha', stainlessSteelBendingGuide: 'Guía de plegado de acero inoxidable', aluminumBendingGuide: 'Guía de plegado de aluminio' },
    diagram: { eyebrow: 'Diagrama de factores', title: 'Factores de plegado del acero inoxidable', svgTitle: 'Diagrama técnico de plegado de acero inoxidable', svgDescription: 'Punzón y matriz V plegando chapa inoxidable con retorno, zona de marca y radio interior.', punch: 'Punzón', sheet: 'Chapa inoxidable', vDie: 'Matriz V', springback: 'Ángulo de retorno', markZone: 'Zona de marca', insideRadius: 'Radio interior', caption: 'Antes de liberar producción, equilibre conjuntamente presión, radio y recuperación.' },
  },
  tr: {
    back: '← Mühendislik Araçlarına Dön', eyebrow: 'Mühendislik Kılavuzu', title: 'Paslanmaz Çelik Büküm Kılavuzu',
    subtitle: 'Daha yüksek dayanım, daha güçlü geri esneme, görünür yüzey ve takım seçiminin yumuşak çeliğe göre daha sıkı kontrol gerektirdiği paslanmaz sac abkant bükümü için mühendislik kaynağı.',
    seoDescription: '304 ve 201 paslanmaz çelik bükümü için teknik kılavuz: geri esneme, V kalıp açıklığı, büküm radyüsü, tonaj ve kalıp izi azaltma.',
    keywords: 'paslanmaz çelik büküm, abkant büküm, 304 paslanmaz, 201 paslanmaz, geri esneme, V kalıp açıklığı, büküm radyüsü, kalıp izi azaltma',
    why: { title: 'Paslanmaz Çeliği Bükmek Neden Daha Zordur', text: 'Yaygın yumuşak çeliğe kıyasla paslanmaz sac genellikle daha yüksek çekme ve akma dayanımını daha güçlü elastik geri kazanımla birleştirir. Strok sırasında kapanan açı yük kalkınca daha fazla açılabilir; yüksek temas basıncı fırçalı veya parlatılmış yüzeylerde kalıp omzu izlerini görünür kılar. Çok dar radyüs veya agresif V açıklığı dış lif gerinimini ve çatlama riskini artırır. Dayanım ve geri esneme kaliteye, teslim durumuna ve partiye göre değiştiğinden seri üretim doğrulanmış parametreler ister.' },
    comparison: { title: '201 ve 304 Paslanmaz Çelik Bükümü', intro: 'Her iki kalite de paslanmaza özel kurulum kontrolü gerektirir. Aşağıdaki farklar genel atölye deneyimidir; serbest bırakılan prosesi sertifika ve deneme bükümü belirler.', headers: ['Mühendislik noktası', '201 paslanmaz çelik', '304 paslanmaz çelik'], rows: [['Dayanım ve şekillendirme', 'Çoğu zaman daha yüksek dayanımla gelir ve bükümde daha sert hissedilir.', 'Genellikle daha öngörülebilir şekillenir, ancak yumuşak çelikten daha fazla kuvvet ister.'], ['Geri esneme ve açı', 'Sıklıkla daha fazla aşırı bükme veya düzeltme gerekir.', 'Geri esneme hâlâ belirgindir ancak seri üretimde daha kolay dengelenir.'], ['Yüzey ve takım', 'Daha yüksek basınç görünür omuz izlerini artırabilir.', 'Bitmiş yüzeyler yine temiz düşük izli takım ve koruma ister.'], ['Proses seçimi', 'Seri öncesi V açıklığı, radyüs ve tonajı ihtiyatlı doğrulayın.', 'Kontrollü açıklık ve kaydedilmiş açı düzeltmesi kullanın.']] },
    sections: [['tonnage', 'Paslanmaz Çelik İçin Tonaj Gereksinimi', 'Paslanmaz çeliğin bükme kuvveti eşdeğer yumuşak çelik işine göre normalde belirgin biçimde yüksektir. Dayanım yükü artırır, kalınlığın etkisi yaklaşık kareseldir ve küçük bir V açıklığı makine ile takım talebini hızla yükseltir. Sürekli üretimde işi makinenin azami tonajına yakın planlamayın; parti farklılığı, takım yükü ve tekrarlı açı düzeltmesi için pay bırakın.'], ['v-die', 'Paslanmaz Çelik İçin V Kalıp Açıklığı', 'V açıklığı kritik bir dengedir. Fazla küçük açıklık basıncı yoğunlaştırır, tonajı ve izleri artırır ve çatlama riskini yükseltebilir. Fazla büyük açıklık doğal iç radyüsü, geri esnemeyi ve flanş ölçüsü kontrol zorluğunu artırır. Kalınlık referansından başlayın, kalite dayanımı, minimum flanş, istenen radyüs ve yüzey beklentisine göre ayarlayın.'], ['springback', 'Geri Esneme Kontrolü', 'Paslanmaz çelik çoğunlukla yumuşak çelikten daha fazla geri esner. Üretimde bilinçli aşırı bükme, CNC açı düzeltmesi veya ölçüm geri bildirimi, uyumlu takım radyüsü, tutarlı malzeme partileri ve kayıtlı deneme bükümleri birlikte kullanılır. 304 için kabul edilen düzeltme doğrulanmadan 201 veya yeni ruloya taşınmamalıdır.'], ['tooling', 'Paslanmaz Çelik İçin Takım Seçimi', 'Zımba ve kalıp omuz radyüsü, gereksiz gerinim yoğunlaşması oluşturmadan hedef radyüsü desteklemelidir. Hassas taşlanmış, yeterince sert ve temiz düzgün temaslı takım tutarlılığı artırır. Görsel parçalar için iz önleyici takım, koruyucu film, poliüretan bariyer veya izsiz çözüm değerlendirilirken açı ve kapasite etkisi doğrulanmalıdır.'], ['surface', 'Yüzey Koruma ve İz Azaltma', 'Fırçalı, parlatılmış ve ayna yüzeyler temas hasarını kolayca gösterir. Temiz omuzlar, doğrulanmış film, uyumlu daha büyük omuz radyüsü, izsiz takım ve doğru V açıklığı basma izlerini ve çizilmeyi azaltır. Yüzey koruması seri başlamadan önce belirlenmelidir.'], ['radius', 'İç Radyüs ve Çatlama Riski', 'Çok küçük iç radyüs, özellikle yüksek dayanımlı veya kalın paslanmazda, olumsuz hadde yönünde ya da keskin zımba ile dış tarafta çatlamaya yol açabilir. Kalın paslanmazda daha büyük radyüs ve daha yumuşak şekillendirme genellikle tutarlılığı iyileştirir. Deneme bükümünün hattını inceleyin ve koşulları proses kaydına alın.']],
    problems: { title: 'Yaygın Paslanmaz Çelik Büküm Sorunları', cards: [['Aşırı geri esneme', 'Düzeltme kaliteye veya partiye uymadığında nihai açı tolerans dışı açılır.'], ['Görünür kalıp izleri', 'Yüksek omuz basıncı veya kirli temaslar bitmiş yüzeye iz basar.'], ['Büküm hattında çatlama', 'Dar radyüs, keskin zımba, sert malzeme veya olumsuz yön dış lifleri zorlar.'], ['Açı tutarsızlığı', 'Kalınlık, dayanım, takım aşınması veya rulo değişimi tekrarı bozar.'], ['Yüksek tonaj', 'Dar V veya yüksek dayanım makine ve takım payını tüketir.'], ['Takım aşınması', 'Sürekli basınç ve yapışma kalıp omzunu bozar.'], ['Kısa flanş kararsızlığı', 'Çok geniş açıklık kısa flanşı yeterince desteklemez.'], ['Yüzey çizilmesi', 'Kalıntı, sürüklenme veya yanlış koruma görünür bitişi hasarlar.']] },
    notes: { title: 'Mühendislik Notları', items: ['Yumuşak çelik ayarlarını paslanmaza doğrudan uygulamayın; kaliteyi ve yüzey talebini doğrulayın.', 'Malzeme kalitesi, kalınlık, V açıklığı, takım radyüsü, yüzey gereksinimi ve üretim miktarını tek proses koşulu olarak değerlendirin.', 'Uzun serilerde takım aşınması, sürekli makine yükü ve açı tekrarlanabilirliğini izleyin.', 'Görünürlüğü yüksek parçalar için film, poliüretan veya düşük izli takımı bükümden önce planlayın.'] },
    faqTitle: 'Sık Sorulan Sorular', faq: [['Paslanmaz çeliği bükmek yumuşak çelikten zor mudur?', 'Genellikle evet; daha fazla büküm kuvveti ve geri esneme telafisi ister.'], ['304 paslanmaz yumuşak çelikten daha fazla geri esner mi?', 'Tipik havada bükümde evet; ek aşırı bükme veya CNC düzeltmesi gerekir.'], ['201 paslanmazı bükmek 304 ten zor mudur?', '201 çoğunlukla daha yüksek dayanımla karşılaşılır ve daha fazla geri esneyebilir; sertifika ile deneme belirleyicidir.'], ['Paslanmaz için hangi V açıklığı kullanılmalı?', 'Kalınlık esaslı başlangıç değeri kullanın ve dayanım, iç radyüs, flanş desteği, tonaj ve yüzeyi kontrol edin.'], ['Paslanmaz üzerindeki izleri nasıl azaltırım?', 'Temas yüzeylerini temiz tutun; doğru açıklıkla uygun film, poliüretan veya düşük izli takım kullanın.'], ['Paslanmaz büküm sırasında neden çatlar?', 'Çok dar radyüs, keskin zımba, sert malzeme, olumsuz hadde yönü veya yoğun gerinim yaygın nedenlerdir.'], ['Geri esnemeyi nasıl kontrol ederim?', 'Kayıtlı denemeler, kontrollü aşırı bükme veya açı düzeltmesi, kararlı takım ve doğrulanmış parti kullanın.']],
    relatedTitle: 'İlgili Mühendislik Araçları', relatedAria: 'İlgili mühendislik araçları',
    relatedLabels: { pressBrakeCalculator: 'Abkant pres hesaplayıcısı', materialDatabase: 'Malzeme veritabanı', vDieSelectionTool: 'V kalıp seçim aracı', insideRadiusGuide: 'İç radyüs kılavuzu', springbackDatabase: 'Geri esneme veritabanı', bendAllowanceCalculator: 'Büküm payı hesaplayıcı', bendDeductionGuide: 'Büküm Düşümü Kılavuzu', airBendingGuide: 'Havada büküm kılavuzu', pressBrakeTonnageGuide: 'Abkant pres tonaj kılavuzu', vDieOpeningGuide: 'V kalıp açıklığı seçimi', minimumFlangeLengthGuide: 'Minimum Flanş Boyu Kılavuzu', toolingSelectionGuide: 'Abkant pres takım seçimi kılavuzu', crowningGuide: 'Abkant pres sehim kompanzasyonu kılavuzu', stainlessSteelBendingGuide: 'Paslanmaz çelik büküm kılavuzu', aluminumBendingGuide: 'Alüminyum Büküm Kılavuzu' },
    diagram: { eyebrow: 'Büküm Faktörleri Diyagramı', title: 'Paslanmaz çelik büküm faktörleri', svgTitle: 'Paslanmaz çelik abkant büküm faktörleri diyagramı', svgDescription: 'Zımba ve V kalıp paslanmaz sacı biçimlendirirken geri esneme, iz bölgesi ve iç radyüsü gösterir.', punch: 'Zımba', sheet: 'Paslanmaz sac', vDie: 'V kalıp', springback: 'Geri esneme açısı', markZone: 'Yüzey iz bölgesi', insideRadius: 'İç radyüs', caption: 'Seri onayından önce basınç, radyüs ve boşaltma sonrası geri dönüş birlikte dengelenmelidir.' },
  },
  id: {
    back: '← Kembali ke Peralatan Teknik', eyebrow: 'Panduan Teknik', title: 'Panduan Tekuk Stainless Steel',
    subtitle: 'Referensi teknik untuk penekukan stainless steel pada press brake, karena kekuatan lebih tinggi, springback lebih besar, tuntutan permukaan dan pilihan perkakas memerlukan kontrol lebih ketat daripada baja ringan.',
    seoDescription: 'Panduan teknis tekuk stainless steel 304 dan 201: springback, bukaan V-die, radius, tonase, dan pengurangan bekas cetakan.',
    keywords: 'tekuk stainless steel, press brake stainless steel, tekuk stainless 304, tekuk stainless 201, springback stainless, bukaan V die, radius tekuk, mengurangi bekas cetakan',
    why: { title: 'Mengapa Stainless Steel Lebih Sulit Ditekuk', text: 'Dibandingkan baja ringan umum, lembaran stainless biasanya menggabungkan kekuatan tarik dan luluh yang lebih tinggi dengan pemulihan elastis yang lebih kuat. Sudut yang tertutup saat langkah mesin dapat terbuka lebih besar setelah beban dilepas, sedangkan tekanan kontak lebih tinggi mudah meninggalkan tanda pada permukaan brushed atau poles. Radius terlalu ketat atau bukaan V agresif meningkatkan regangan serat luar dan risiko retak. Kekuatan serta springback juga berubah menurut grade, kondisi pasokan dan batch, sehingga produksi berulang memerlukan parameter yang diverifikasi.' },
    comparison: { title: 'Penekukan Stainless Steel 201 vs 304', intro: 'Kedua grade memerlukan pemeriksaan setelan khusus stainless. Perbedaan berikut adalah pengalaman bengkel yang lazim; sertifikat material dan uji tekuk menentukan proses final.', headers: ['Poin teknik', 'Stainless steel 201', 'Stainless steel 304'], rows: [['Kekuatan dan pembentukan', 'Sering dipasok dengan kekuatan lebih tinggi dan terasa lebih keras saat ditekuk.', 'Biasanya lebih dapat diprediksi untuk dibentuk, tetapi tetap memerlukan gaya lebih besar daripada baja ringan.'], ['Springback dan sudut', 'Sering membutuhkan overbend atau koreksi lebih besar.', 'Springback tetap nyata namun umumnya lebih mudah distabilkan dalam produksi.'], ['Permukaan dan perkakas', 'Tekanan lebih tinggi dapat meningkatkan tanda bahu cetakan yang terlihat.', 'Permukaan jadi tetap memerlukan perkakas bersih, rendah tanda dan perlindungan.'], ['Pemilihan proses', 'Periksa bukaan V, radius dan tonase secara konservatif sebelum produksi.', 'Gunakan bukaan terkendali dan koreksi sudut yang tercatat.']] },
    sections: [['tonnage', 'Kebutuhan Tonase untuk Stainless Steel', 'Gaya tekuk stainless steel biasanya jelas lebih tinggi daripada pekerjaan baja ringan yang setara. Kekuatan material menaikkan beban, ketebalan berpengaruh kira-kira secara kuadrat, dan bukaan V kecil meningkatkan kebutuhan mesin serta perkakas secara besar. Untuk produksi berkelanjutan, jangan merencanakan pekerjaan stainless mendekati tonase maksimum mesin; sediakan margin untuk variasi batch, beban perkakas dan koreksi sudut yang konsisten.'], ['v-die', 'Bukaan V-Die untuk Stainless Steel', 'Bukaan V merupakan keseimbangan penting. Bukaan terlalu kecil memusatkan tekanan, menaikkan tonase dan bekas, serta dapat meningkatkan risiko retak. Bukaan terlalu besar menambah radius dalam alami, springback dan kesulitan mengendalikan dimensi flange. Mulailah dari referensi ketebalan lalu sesuaikan dengan kekuatan grade, flange minimum, radius yang ditentukan dan kebutuhan tampilan.'], ['springback', 'Pengendalian Springback', 'Stainless steel biasanya memiliki springback lebih besar daripada baja ringan. Pengendalian produksi menggabungkan overbending terencana, koreksi sudut CNC atau umpan balik pengukuran, radius perkakas yang sesuai, batch material konsisten dan uji tekuk terdokumentasi. Koreksi yang diterima untuk 304 tidak boleh langsung dipakai pada 201 atau coil baru tanpa pemeriksaan.'], ['tooling', 'Pemilihan Perkakas untuk Stainless Steel', 'Radius punch dan radius bahu die harus mendukung radius tekuk yang diperlukan tanpa memusatkan regangan berlebihan. Perkakas presisi, cukup keras, serta memiliki bidang kontak bersih dan halus meningkatkan konsistensi. Untuk komponen kosmetik, evaluasi perkakas anti-tanda, film pelindung, lapisan urethane atau konsep tanpa bekas sambil memastikan pengaruhnya pada sudut dan kapasitas.'], ['surface', 'Perlindungan Permukaan dan Pengurangan Bekas', 'Permukaan stainless brushed, poles dan mirror mudah menunjukkan kerusakan kontak. Bahu bersih, film yang telah diuji, radius bahu lebih besar yang sesuai, perkakas no-mark dan bukaan V yang benar mengurangi bekas tekan dan gores. Perlindungan harus direncanakan sebelum batch produksi dimulai.'], ['radius', 'Radius Dalam dan Risiko Retak', 'Radius dalam terlalu kecil dapat membuat sisi luar retak, terutama pada material kuat atau tebal, arah serat kurang baik atau punch tajam. Untuk stainless tebal, radius lebih besar dan kondisi pembentukan yang tidak terlalu berat biasanya meningkatkan konsistensi. Periksa garis tekuk pada sampel dan catat radius serta arah material pada proses.']],
    problems: { title: 'Masalah Umum Penekukan Stainless Steel', cards: [['Springback berlebihan', 'Sudut akhir terbuka di luar toleransi ketika koreksi tidak cocok dengan grade atau batch.'], ['Bekas die terlihat', 'Tekanan bahu tinggi atau bidang kontak kotor mencetak permukaan jadi.'], ['Retak pada garis tekuk', 'Radius ketat, punch tajam, material keras atau arah serat buruk membebani serat luar.'], ['Sudut tidak konsisten', 'Ketebalan, kekuatan, aus perkakas atau perubahan coil mengganggu pengulangan.'], ['Tonase tinggi', 'V sempit atau material kuat menghabiskan margin mesin dan perkakas.'], ['Keausan perkakas', 'Tekanan terus-menerus dan material menempel merusak bahu die.'], ['Flange pendek tidak stabil', 'Bukaan terlalu lebar tidak menopang flange pendek dengan baik.'], ['Gores permukaan', 'Kotoran, geseran atau perlindungan salah merusak finishing terlihat.']] },
    notes: { title: 'Catatan Teknik', items: ['Jangan langsung memakai setelan baja ringan untuk stainless; pastikan grade dan kebutuhan permukaan jadi.', 'Nilai grade, ketebalan, bukaan V, radius perkakas, kebutuhan permukaan dan volume produksi sebagai satu kondisi proses.', 'Pada produksi batch panjang, pantau keausan perkakas, beban mesin berkelanjutan dan pengulangan sudut.', 'Rencanakan film, urethane atau perkakas rendah tanda sebelum membentuk komponen stainless yang terlihat jelas.'] },
    faqTitle: 'Pertanyaan Umum', faq: [['Apakah stainless steel lebih sulit ditekuk daripada baja ringan?', 'Biasanya ya; stainless memerlukan gaya tekuk dan kompensasi springback lebih besar.'], ['Apakah stainless 304 memiliki springback lebih besar daripada baja ringan?', 'Ya pada pekerjaan air bending umum; biasanya diperlukan overbend atau koreksi CNC tambahan.'], ['Apakah stainless 201 lebih sulit ditekuk daripada 304?', '201 sering dijumpai pada kekuatan lebih tinggi dan mungkin lebih banyak springback, tetapi sertifikat dan uji tekuk harus menentukan setelan.'], ['Bukaan V die apa yang digunakan untuk stainless?', 'Gunakan referensi awal berbasis ketebalan lalu periksa kekuatan, radius dalam, dukungan flange, tonase dan kualitas permukaan.'], ['Bagaimana mengurangi bekas pada stainless?', 'Jaga bidang kontak bersih dan gunakan film, urethane atau perkakas rendah tanda yang sesuai dengan bukaan yang benar.'], ['Mengapa stainless retak saat ditekuk?', 'Penyebab umum ialah radius terlalu ketat, punch tajam, material keras, arah serat buruk atau regangan terkonsentrasi.'], ['Bagaimana mengendalikan springback?', 'Gunakan uji tekuk tercatat, overbend atau koreksi sudut terkendali, perkakas stabil dan batch material terverifikasi.']],
    relatedTitle: 'Peralatan Teknik Terkait', relatedAria: 'Peralatan teknik terkait',
    relatedLabels: { pressBrakeCalculator: 'Kalkulator press brake', materialDatabase: 'Database material', vDieSelectionTool: 'Alat pemilihan V-die', insideRadiusGuide: 'Panduan radius dalam', springbackDatabase: 'Database springback', bendAllowanceCalculator: 'Kalkulator bend allowance', bendDeductionGuide: 'Panduan Bend Deduction', airBendingGuide: 'Panduan tekuk udara', pressBrakeTonnageGuide: 'Panduan tonase press brake', vDieOpeningGuide: 'Pemilihan bukaan cetakan V', minimumFlangeLengthGuide: 'Panduan Panjang Flange Minimum', toolingSelectionGuide: 'Panduan pemilihan perkakas mesin tekuk', crowningGuide: 'Panduan kompensasi lendutan press brake', stainlessSteelBendingGuide: 'Panduan tekuk stainless steel', aluminumBendingGuide: 'Panduan Tekuk Aluminium' },
    diagram: { eyebrow: 'Diagram Faktor Tekuk', title: 'Faktor penekukan stainless steel', svgTitle: 'Diagram faktor tekuk stainless steel pada press brake', svgDescription: 'Punch dan V die membentuk lembaran stainless dengan penanda springback, zona bekas dan radius dalam.', punch: 'Punch', sheet: 'Lembaran stainless', vDie: 'V die', springback: 'Sudut springback', markZone: 'Zona bekas permukaan', insideRadius: 'Radius dalam', caption: 'Seimbangkan tekanan, radius dan pemulihan setelah beban dilepas sebelum menyetujui produksi.' },
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
  return (
    <article className='zyco-stainless__card'>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}

export default function StainlessSteelBendingGuide({
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
      id: 'stainless-steel-bending-guide-jsonld',
      data: createStructuredData(),
    })
  }, [])

  return (
    <>
      <style>
        {`
          .zyco-stainless {
            min-height: 100vh; box-sizing: border-box; padding: 52px 22px;
            background: radial-gradient(circle at 16% 12%, rgba(96,165,250,.34), transparent 30%), radial-gradient(circle at 84% 20%, rgba(14,165,233,.22), transparent 28%), linear-gradient(145deg,#071224 0%,#0b1f3f 42%,#12366e 74%,#1d4ed8 100%);
            color: #fff; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; position: relative; overflow: hidden;
          }
          .zyco-stainless::before { content:""; position:absolute; inset:0; background-image:linear-gradient(rgba(96,165,250,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(96,165,250,.08) 1px,transparent 1px); background-size:42px 42px; mask-image:linear-gradient(to bottom,rgba(0,0,0,.9),transparent 78%); pointer-events:none; }
          .zyco-stainless__shell { width:min(1180px,100%); margin:0 auto; position:relative; z-index:1; }
          .zyco-stainless__hero { padding:38px 36px; margin-bottom:22px; border:1px solid rgba(191,219,254,.2); border-radius:30px; background:linear-gradient(145deg,rgba(255,255,255,.14),rgba(255,255,255,.06)); backdrop-filter:blur(16px); box-shadow:0 28px 68px rgba(2,8,23,.2); }
          .zyco-stainless__back, .zyco-stainless__tool { display:inline-flex; align-items:center; justify-content:center; box-sizing:border-box; text-decoration:none; color:#fff; font-size:15px; font-weight:800; transition:all .25s ease; }
          .zyco-stainless__back { width:fit-content; max-width:min(100%,480px); min-height:44px; margin:0 0 22px; padding:0 16px; border:1px solid rgba(147,197,253,.46); border-radius:999px; background:linear-gradient(145deg,rgba(15,23,42,.34),rgba(37,99,235,.12)); color:#bfdbfe; }
          .zyco-stainless__back:hover { transform:translateY(-2px); border-color:rgba(125,211,252,.7); color:#fff; background:rgba(37,99,235,.42); box-shadow:0 14px 32px rgba(37,99,235,.32),0 0 0 1px rgba(125,211,252,.16); }
          .zyco-stainless__eyebrow { margin:0; color:#7dd3fc; font-size:12px; font-weight:800; letter-spacing:.2em; text-transform:uppercase; }
          .zyco-stainless__title { max-width:920px; margin:14px 0 18px; font-size:clamp(34px,5vw,54px); line-height:1.08; letter-spacing:-.05em; }
          .zyco-stainless__subtitle { max-width:900px; margin:0; color:#dbeafe; font-size:18px; line-height:1.72; }
          .zyco-stainless__panel { padding:28px; margin-top:18px; border:1px solid rgba(191,219,254,.16); border-radius:25px; background:rgba(10,30,61,.48); backdrop-filter:blur(12px); }
          .zyco-stainless__section-title { margin:0 0 14px; color:#fff; font-size:25px; letter-spacing:-.035em; }
          .zyco-stainless__copy { margin:0; color:#cbd5e1; font-size:16px; line-height:1.75; }
          .zyco-stainless__grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:18px; }
          .zyco-stainless__cards { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px; margin-top:16px; }
          .zyco-stainless__card { padding:18px; border:1px solid rgba(191,219,254,.13); border-radius:18px; background:rgba(30,64,112,.34); }
          .zyco-stainless__card h3 { margin:0 0 8px; color:#eff6ff; font-size:16px; line-height:1.45; }
          .zyco-stainless__card p { margin:0; color:#bfdbfe; font-size:14px; line-height:1.65; }
          .zyco-stainless__table-wrap { overflow-x:auto; border:1px solid rgba(191,219,254,.16); border-radius:18px; margin-top:18px; }
          .zyco-stainless__table { width:100%; min-width:700px; border-collapse:collapse; }
          .zyco-stainless__table th, .zyco-stainless__table td { padding:14px 16px; border-bottom:1px solid rgba(191,219,254,.1); text-align:left; }
          .zyco-stainless__table th { color:#bae6fd; background:rgba(30,64,112,.38); font-size:13px; }
          .zyco-stainless__table td { color:#e2e8f0; font-size:14px; line-height:1.55; }
          .zyco-stainless__list, .zyco-stainless__faq { display:grid; gap:12px; padding:0; margin:0; list-style:none; }
          .zyco-stainless__list li, .zyco-stainless__faq article { padding:17px 20px; border:1px solid rgba(191,219,254,.12); border-radius:18px; background:rgba(30,64,112,.3); }
          .zyco-stainless__faq h3 { margin:0 0 8px; color:#eff6ff; font-size:16px; }
          .zyco-stainless__tools { display:flex; flex-wrap:wrap; gap:12px; }
          .zyco-stainless__tool { min-height:46px; padding:0 18px; border:1px solid rgba(147,197,253,.38); border-radius:14px; color:#dbeafe; background:rgba(30,64,175,.32); box-shadow:none; }
          .zyco-stainless__tool:hover { transform:translateY(-4px); border-color:rgba(125,211,252,.7); color:#fff; background:rgba(37,99,235,.4); box-shadow:0 14px 30px rgba(56,189,248,.22),0 7px 22px rgba(2,8,23,.22); }
          @media (max-width:840px) { .zyco-stainless__grid, .zyco-stainless__cards { grid-template-columns:1fr; } }
          @media (max-width:760px) { .zyco-stainless { padding:22px 14px; } .zyco-stainless__hero, .zyco-stainless__panel { padding:22px; border-radius:22px; } .zyco-stainless__subtitle { font-size:16px; } }
          @media (max-width:640px) { .zyco-stainless__back, .zyco-stainless__tool { width:100%; } }
        `}
      </style>
      <main className='zyco-stainless'>
        <div className='zyco-stainless__shell'>
          <header className='zyco-stainless__hero'>
            <a className='zyco-stainless__back' href='/engineering' aria-label={page.back}>{page.back}</a>
            <LanguageSwitcher className='zyco-page-language-switcher' language={language} setLanguage={setLanguage} />
            <p className='zyco-stainless__eyebrow'>{page.eyebrow}</p>
            <h1 className='zyco-stainless__title'>{page.title}</h1>
            <p className='zyco-stainless__subtitle'>{page.subtitle}</p>
          </header>
          <section className='zyco-stainless__panel' aria-labelledby='stainless-why'>
            <h2 className='zyco-stainless__section-title' id='stainless-why'>{page.why.title}</h2>
            <p className='zyco-stainless__copy'>{page.why.text}</p>
          </section>
          <StainlessSteelBendingDiagram labels={page.diagram} />
          <section className='zyco-stainless__panel' aria-labelledby='stainless-comparison'>
            <h2 className='zyco-stainless__section-title' id='stainless-comparison'>{page.comparison.title}</h2>
            <p className='zyco-stainless__copy'>{page.comparison.intro}</p>
            <div className='zyco-stainless__table-wrap'>
              <table className='zyco-stainless__table'>
                <thead><tr>{page.comparison.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
                <tbody>{page.comparison.rows.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
          </section>
          <div className='zyco-stainless__grid'>
            {page.sections.map(([id, title, text]) => (
              <section className='zyco-stainless__panel' aria-labelledby={`stainless-${id}`} key={id}>
                <h2 className='zyco-stainless__section-title' id={`stainless-${id}`}>{title}</h2>
                <p className='zyco-stainless__copy'>{text}</p>
              </section>
            ))}
          </div>
          <section className='zyco-stainless__panel' aria-labelledby='stainless-problems'>
            <h2 className='zyco-stainless__section-title' id='stainless-problems'>{page.problems.title}</h2>
            <div className='zyco-stainless__cards'>
              {page.problems.cards.map(([title, text]) => <Card key={title} title={title} text={text} />)}
            </div>
          </section>
          <section className='zyco-stainless__panel' aria-labelledby='stainless-notes'>
            <h2 className='zyco-stainless__section-title' id='stainless-notes'>{page.notes.title}</h2>
            <ul className='zyco-stainless__list'>
              {page.notes.items.map((note) => <li className='zyco-stainless__copy' key={note}>{note}</li>)}
            </ul>
          </section>
          <section className='zyco-stainless__panel' aria-labelledby='stainless-faq'>
            <h2 className='zyco-stainless__section-title' id='stainless-faq'>{page.faqTitle}</h2>
            <div className='zyco-stainless__faq'>
              {page.faq.map(([question, answer]) => (
                <article key={question}>
                  <h3>{question}</h3>
                  <p className='zyco-stainless__copy'>{answer}</p>
                </article>
              ))}
            </div>
          </section>
          <section className='zyco-stainless__panel' aria-labelledby='stainless-related'>
            <h2 className='zyco-stainless__section-title' id='stainless-related'>{page.relatedTitle}</h2>
            <nav className='zyco-stainless__tools' aria-label={page.relatedAria}>
              {relatedTools.map(([key, href]) => (
                <a className='zyco-stainless__tool' href={href} key={key}>{page.relatedLabels[key] || sharedText.relatedTools[key]}</a>
              ))}
            </nav>
          </section>
        </div>
      </main>
    </>
  )
}
