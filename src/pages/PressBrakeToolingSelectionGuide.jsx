import { useEffect } from 'react'
import LanguageSwitcher from '../components/LanguageSwitcher.jsx'
import ToolingSelectionDiagramSystem from '../components/ToolingSelectionDiagramSystem.jsx'
import {
  getSiteUrl,
  setPageSEO,
  setStructuredData,
} from '../utils/seo.js'

const routePath = '/engineering/press-brake-tooling-selection-guide'

const relatedTools = [
  ['pressBrakeCalculator', '/engineering-tools/press-brake-calculator'],
  ['materialDatabase', '/engineering-tools/material-database'],
  ['vDieSelectionTool', '/engineering-tools/v-die-selection'],
  ['insideRadiusGuide', '/engineering-tools/inside-radius-guide'],
  ['springbackDatabase', '/engineering-tools/springback-database'],
  ['bendAllowanceCalculator', '/engineering-tools/bend-allowance-calculator'],
  ['airBendingGuide', '/engineering-tools/air-bending-guide'],
  ['pressBrakeTonnageGuide', '/engineering/press-brake-tonnage-guide'],
  ['vDieOpeningGuide', '/engineering/how-to-choose-press-brake-v-die-opening'],
  ['toolingSelectionGuide', routePath],
  ['crowningGuide', '/engineering/press-brake-crowning-guide'],
]

const content = {
  en: {
    hubName: 'ZYCO Engineering Hub',
    back: '← Back to Engineering Tools',
    eyebrow: 'Engineering Guide',
    title: 'Press Brake Tooling Selection Guide',
    subtitle: 'Application reference for selecting punch and die geometry for accurate, stable and surface-controlled press brake production.',
    seoDescription: 'Engineering guide to press brake tooling selection, punch and die types, interference checks, surface protection, special forming and custom tooling decisions.',
    keywords: 'press brake tooling selection, press brake punch, press brake die, gooseneck punch, hemming die, offset die, custom tooling',
    intro: {
      title: 'Introduction',
      text: [
        'Press brake tooling must be selected from the complete bend condition: material grade and thickness, target radius, flange dimensions, bend sequence, visible-surface requirement, machine capacity and expected production quantity.',
        'A tool that forms one sample part may still be unsuitable for production if it overloads a shoulder, marks a finished surface, obstructs a later return flange or cannot repeat alignment over a long batch.',
      ],
    },
    why: {
      title: 'Why Tooling Selection Matters',
      intro: 'Tool geometry is part of process capability, not only a way to produce an angle.',
      cards: [
        ['Accuracy and stability', 'Punch radius, V opening and tool centering influence angle repeatability, inside radius and dimensional control across material variation.'],
        ['Interference and minimum flange', 'Tool height, throat profile and die shoulders determine whether a return bend clears the tool and whether a short flange remains supported.'],
        ['Tool life and load', 'A narrow opening or unsuitable nose concentrates load; premature wear, chipping and shoulder damage can follow even when the machine has sufficient tonnage.'],
        ['Surface and batch consistency', 'Contact pressure and shoulder condition drive marking. Consistent tools, alignment and protection matter more as production volume increases.'],
      ],
    },
    punch: {
      title: 'Punch Selection',
      intro: 'Select the punch after checking the completed profile and the full bend sequence, not only the first bend angle.',
      cards: [
        ['Standard punch', 'General air-bending choice for accessible profiles. It offers good stiffness and load capacity, but can collide with returned legs on box parts.'],
        ['Gooseneck punch', 'Provides relief behind the nose for return flanges and deep boxes. Clearance improves access, while the relieved body typically requires closer load-rating checks.'],
        ['Acute punch', 'Used for small included angles and controlled overbending. It supports springback compensation, but sharp forming raises crack and marking risk in hard material.'],
        ['Radius punch', 'Used when the part specifies a larger inside radius or surface strain must be reduced. Radius control requires compatible die opening and allowance review.'],
        ['Narrow punch', 'Useful in restricted spaces or close adjacent bends. Reduced body width can limit capacity and increase deflection sensitivity on long bends.'],
      ],
    },
    die: {
      title: 'Die Selection',
      intro: 'Die geometry must support the flange, carry the required load and produce the intended natural radius without unacceptable surface pressure.',
      cards: [
        ['Single V die', 'A dedicated opening gives clear setup control and stable shoulders for repeated production. Confirm opening, load rating and minimum flange before release.'],
        ['Multi V die', 'Rotating or multi-opening dies improve flexibility for mixed work. Correct station selection and alignment are critical to prevent wrong-opening setups.'],
        ['Radius die', 'Provides smoother support for large-radius forming or finish-sensitive material. It normally trades tight radius capability for lower localized marking.'],
        ['Hemming die', 'Supports the closing stage after a controlled pre-bend. Gap, tool parallelism and material thickness govern hem consistency and edge damage.'],
        ['Offset die', 'Forms two opposing bends in one stroke for step geometry. Offset height, tool centerline and sheet positioning directly control the finished step.'],
      ],
    },
    special: [
      {
        id: 'gooseneck',
        title: 'Gooseneck Tooling',
        text: 'Deep-box parts and return flanges often fail at a later bend because the already formed wall enters the space occupied by a straight punch. A gooseneck punch creates clearance behind its working tip so the bend sequence can proceed without collision. Check the complete folded envelope, punch clearance at the lowest ram position, segment joints and the reduced load capacity associated with a relieved profile.',
      },
      {
        id: 'acute',
        title: 'Acute Tooling',
        text: 'Acute tooling is used when a small included angle or deliberate overbend is needed to recover a target angle after springback. It is especially useful in staged hemming preparation. High-strength or low-ductility material can crack when strain is concentrated into an excessively small radius, so confirm material limit, rolling direction, force and trial-bend results.',
      },
      {
        id: 'hemming',
        title: 'Hemming Tooling',
        text: 'A reliable hem is normally produced in two operations: pre-bending to an acute angle, followed by flattening or closing. The closing die must control the finished gap without trapping excessive material or damaging a visible face. Protective film compatibility, clean tooling shoulders and consistent sheet positioning are essential for coated, stainless or aluminum parts.',
      },
      {
        id: 'offset',
        title: 'Offset Tooling',
        text: 'Offset tooling produces Z-shaped forms by creating two bends within one controlled geometry. The required offset dimension must match the tool step height after accounting for thickness and springback. Tool centering, ram parallelism and accurate sheet location are important because any mismatch appears as unequal legs or angular error in both bends.',
      },
    ],
    radius: {
      title: 'Tooling Radius and Material Thickness',
      intro: 'The punch radius participates in bend quality even when the natural radius of air bending is strongly influenced by V opening.',
      cards: [
        ['Radius matching', 'Use a punch nose compatible with the required inside radius, material thickness and bend method; a drawing radius cannot be achieved by punch selection alone.'],
        ['Radius too small', 'Tight noses and narrow openings concentrate outer-fiber strain, increasing cracking, coating failure and local thinning risk.'],
        ['Radius too large', 'A large punch radius may improve material flow, but it can increase the formed radius and shift flange or developed-length control.'],
      ],
    },
    surface: {
      title: 'Surface Protection',
      intro: 'Stainless steel, aluminum and mirror-finished sheet require surface control as a process requirement.',
      cards: [
        ['Contact condition', 'Keep shoulders clean and free of pickup. Scratches or embedded debris transfer directly into visible sheet surfaces.'],
        ['Protective layers', 'Protective film or urethane barrier sheets can reduce shoulder marks when their thickness and forming suitability are verified before production.'],
        ['Low-mark tooling', 'Radius shoulders, non-marking inserts or dedicated protective tooling can reduce pressure concentration, but load rating and bend repeatability still require confirmation.'],
      ],
    },
    mistakes: {
      title: 'Common Tooling Selection Mistakes',
      items: [
        ['Selecting by thickness only', 'Thickness rules are a starting point; radius, flange length, material grade and finish also determine the correct tool.'],
        ['Ignoring return-flange interference', 'A successful first bend does not prove later formed legs can clear the punch and clamp geometry.'],
        ['Ignoring minimum flange support', 'A flange shorter than practical shoulder support may slide, distort or produce an unstable angle.'],
        ['Ignoring material strength', 'High-strength material and stainless grades can demand higher force and greater radius or opening allowance.'],
        ['Choosing an overly small V opening', 'A narrow V increases tonnage, shoulder pressure, marking and tool overload risk.'],
        ['Skipping tool load rating', 'The allowable load of punch, die and segmented sections must be checked independently of machine capacity.'],
        ['Ignoring long-run stability', 'Production tooling should be selected for wear life, repeatable location and controlled surface quality, not only first-piece success.'],
      ],
    },
    custom: {
      title: 'Custom Tooling Considerations',
      text: [
        'Standard tooling cannot cover every forming condition. Complex profiles, narrow return bends, deep boxes, offset bends, large-radius forms and workpieces with interference risk may require a custom punch or die solution.',
        'Illustrations shown are representative engineering references. Actual tooling geometry may vary depending on tooling manufacturer, bending application, tonnage capacity, radius design and production standards. For special products, evaluate material, bend sequence, interference risk and batch stability before defining custom tooling.',
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        ['How do I choose press brake tooling?', 'Start with material, thickness, bend angle, inside radius, flange geometry and bend sequence; then verify V opening, punch profile, tool rating, machine capacity and surface requirement.'],
        ['When should I use gooseneck tooling?', 'Use it when a return flange, box wall or previous bend would interfere with the body of a straight punch during a later operation.'],
        ['What causes tooling interference?', 'Interference results from the folded part envelope colliding with punch body, holder, die, segments or machine throat during the planned bend sequence.'],
        ['How does punch radius affect inside radius?', 'In air bending, V opening and material strongly affect the natural radius, while punch radius establishes a minimum contact condition and can dominate when intentionally large.'],
        ['When is custom tooling required?', 'Custom tooling is considered when standard tools cannot provide clearance, step size, large radius, surface control or repeatable forming for the target part.'],
        ['How can I reduce marks on stainless steel or aluminum?', 'Use clean polished contact surfaces, validated protective film or urethane protection, low-mark tooling where suitable, and trial bends before production approval.'],
      ],
    },
    notes: {
      title: 'Engineering Notes',
      items: [
        'Select tooling by considering material, thickness, V opening, bend sequence, return-flange height, machine tonnage and surface requirement together.',
        'For long production runs, monitor tool life, segmentation condition, repeatable positioning and first-off versus in-process dimensional drift.',
        'Evaluate interference and tool load capacity early for special parts, before programming and production scheduling are finalized.',
      ],
    },
    relatedTitle: 'Related Engineering Tools',
    relatedLabels: {
      pressBrakeCalculator: 'Press Brake Calculator',
      materialDatabase: 'Material Database',
      vDieSelectionTool: 'V Die Selection Tool',
      insideRadiusGuide: 'Inside Radius Guide',
      springbackDatabase: 'Springback Database',
      bendAllowanceCalculator: 'Bend Allowance Calculator',
      airBendingGuide: 'Air Bending Guide',
      pressBrakeTonnageGuide: 'Press Brake Tonnage Guide',
      vDieOpeningGuide: 'How to Choose Press Brake V-Die Opening',
      toolingSelectionGuide: 'Press Brake Tooling Selection Guide',
      crowningGuide: 'Press Brake Crowning Guide',
    },
    diagrams: {
      eyebrow: 'Tooling Diagram System',
      title: 'Representative tooling profiles',
      intro: 'Simplified sections show the function of common tooling families and the clearance or forming feature to be verified in application engineering.',
      reference: 'Representative reference',
      diagrams: [
        { type: 'standard', title: 'Standard Punch and V Die', aria: 'Representative standard punch and V die profile', description: 'Standard punch forming sheet in a V die.', tags: ['Punch', 'V opening', 'Supported flange'], caption: 'General air bending where the finished profile clears a straight punch.' },
        { type: 'gooseneck', title: 'Gooseneck Punch', aria: 'Representative gooseneck punch clearance profile', description: 'Relieved punch body clearing a return flange.', tags: ['Relief', 'Return flange', 'Clearance'], caption: 'Relieved body provides space for box walls or returned legs.' },
        { type: 'acute', title: 'Acute Tooling', aria: 'Representative acute tooling profile', description: 'Acute punch and die for small-angle bending.', tags: ['Acute angle', 'Overbend', 'Springback'], caption: 'Small-angle setup used only after strain and force checks.' },
        { type: 'hemming', title: 'Hemming Tooling', aria: 'Representative hemming closing profile', description: 'Flattening tool closing a pre-bent hem.', tags: ['Pre-bend', 'Closing', 'Surface'], caption: 'Closing stage must manage gap, marking and edge condition.' },
        { type: 'offset', title: 'Offset Tooling', aria: 'Representative offset tooling profile', description: 'Offset tooling producing a stepped sheet profile.', tags: ['Z form', 'Offset height', 'Centerline'], caption: 'Matched upper and lower steps control two bends together.' },
        { type: 'radius', title: 'Radius Tooling', aria: 'Representative large radius tooling profile', description: 'Radius punch forming a broad inside radius.', tags: ['Radius punch', 'Large radius', 'Material flow'], caption: 'Broad contact reduces concentrated strain for suitable parts.' },
      ],
    },
  },
  zh: {
    hubName: 'ZYCO 工程中心',
    back: '← 返回工程工具中心',
    eyebrow: '工程指南',
    title: '折弯机模具选型指南',
    subtitle: '面向折弯精度、生产稳定性与表面质量控制的冲头和下模应用参考。',
    seoDescription: '折弯机模具选型工程指南，涵盖冲头与下模类型、干涉核对、表面保护、特殊成形及定制模具决策。',
    keywords: '折弯机模具选型, 折弯机冲头, 折弯机下模, 鹅颈冲头, 压平模具, 段差模具, 定制模具',
    intro: {
      title: '简介',
      text: [
        '折弯机模具选型必须结合完整工况：材料牌号和板厚、目标内圆角、翻边尺寸、折弯顺序、可见面要求、设备吨位以及预计生产数量。',
        '能够完成一件样件的模具，不一定适合批量生产；若肩部载荷过高、可见面产生压痕、后续回边发生干涉或长批次中定位不稳定，仍应重新选型。',
      ],
    },
    why: {
      title: '模具选型为何重要',
      intro: '模具几何是工艺能力的一部分，不只是形成角度的工具。',
      cards: [
        ['精度与稳定性', '冲头半径、V 槽开口和模具对中会影响角度重复性、内圆角以及材料波动下的尺寸控制。'],
        ['干涉与最小翻边', '冲头高度、避空轮廓和下模肩部决定回边是否避让，以及短边能否得到稳定支撑。'],
        ['模具寿命与载荷', '过小开口或不合适的尖端会集中载荷，即使设备吨位足够，也可能加速磨损、崩角或肩部损伤。'],
        ['表面与批量一致性', '接触压力和肩部状态决定压痕风险；批量越大，模具一致性、定位和保护措施越重要。'],
      ],
    },
    punch: {
      title: '冲头选择',
      intro: '应在核对成品轮廓和全部折弯顺序后选择冲头，而不是仅依据第一道折弯角度。',
      cards: [
        ['标准冲头', '适用于轮廓开敞的常规空气折弯，刚性和承载能力较好；箱体件的回边可能与直身冲头发生碰撞。'],
        ['鹅颈冲头', '在尖端后方提供避空，用于回边和深盒结构；获得空间的同时，避空截面通常需要更严格的承载核对。'],
        ['锐角冲头', '用于小夹角及受控过折弯，可辅助回弹补偿；硬质材料在尖锐成形下更易开裂或产生压痕。'],
        ['圆弧冲头', '用于指定较大内圆角或需要减轻表面应变的零件；必须与下模开口和展开量核对配合。'],
        ['窄身冲头', '适用于受限空间或邻近折弯，但较窄本体可能限制承载，并提高长折弯中的挠曲敏感性。'],
      ],
    },
    die: {
      title: '下模选择',
      intro: '下模必须稳定支撑翻边、承受所需载荷，并在不过度压伤表面的条件下形成目标自然内圆角。',
      cards: [
        ['单 V 下模', '固定开口便于工艺控制，肩部稳定，适合重复生产；投产前应确认开口、额定载荷和最小翻边。'],
        ['多 V 下模', '适合多品种作业并减少换模；必须确认正确槽位和对中，避免误用开口造成不良。'],
        ['圆弧下模', '为大圆弧或表面敏感材料提供更平缓支撑，通常以紧小圆角能力换取更低的局部压痕。'],
        ['压平下模', '用于受控预折后的闭合阶段；间隙、平行度和板厚共同决定包边一致性及边缘损伤。'],
        ['段差下模', '在一次行程中形成两道相反折弯；段差高度、中心线和板材定位直接决定成品偏移尺寸。'],
      ],
    },
    special: [
      { id: 'gooseneck', title: '鹅颈模具', text: '深盒件和回边件常在后续折弯时出现问题，因为已成形侧壁会进入直身冲头占据的空间。鹅颈冲头在工作尖端后方设置避空，使折弯顺序能够避免碰撞。应核对完整成形包络、滑块最低位置的冲头间隙、分段接缝以及避空轮廓带来的承载下降。' },
      { id: 'acute', title: '锐角模具', text: '当需要小夹角或通过过折弯补偿回弹以获得目标角度时，可使用锐角模具；压平前的预折也常采用此类工具。高强度或延展性较低的材料，在过小半径下会产生较高开裂风险，因此必须确认材料极限、轧制方向、成形力和试折结果。' },
      { id: 'hemming', title: '压平模具', text: '可靠包边通常分两步完成：先预折成锐角，再压平或闭合。闭合下模需要控制最终间隙，避免夹料过量或损伤可见面。对涂层板、不锈钢和铝板，应特别确认保护膜适用性、模具肩部清洁度和板材定位一致性。' },
      { id: 'offset', title: '段差模具', text: '段差模具通过受控几何同时形成两道折弯，用于 Z 型件。所需偏移尺寸应在考虑板厚与回弹后匹配模具台阶高度。模具对中、滑块平行度和板材放置精度十分关键，否则两道折弯都会表现为腿长不等或角度偏差。' },
    ],
    radius: {
      title: '模具半径与材料厚度',
      intro: '即使空气折弯的自然内圆角主要受 V 槽开口影响，冲头半径仍直接参与折弯质量控制。',
      cards: [
        ['半径匹配', '应根据目标内圆角、板厚和折弯方式选用兼容的冲头尖端；单靠冲头并不能保证图纸内圆角。'],
        ['半径过小', '过紧的冲头尖端和小开口会集中外层纤维应变，增加开裂、镀层破坏和局部减薄风险。'],
        ['半径过大', '大半径可改善材料流动，但也可能放大成形圆角，并影响翻边尺寸与展开长度控制。'],
      ],
    },
    surface: {
      title: '表面保护',
      intro: '不锈钢、铝板和镜面板应把表面控制作为工艺要求，而不是最终检验问题。',
      cards: [
        ['接触状态', '保持下模肩部清洁，防止粘料与碎屑；嵌入的异物会直接转印到可见板面。'],
        ['保护介质', '经验证适于成形的保护膜或聚氨酯隔离膜可降低肩部压痕，但必须先核对厚度影响和成形适用性。'],
        ['无痕方案', '圆弧肩部、无痕嵌件或专用保护模具可降低接触压力集中，但仍需确认承载能力和重复精度。'],
      ],
    },
    mistakes: {
      title: '常见模具选型错误',
      items: [
        ['只按板厚选模具', '板厚规则只是起点，内圆角、翻边长度、材料牌号和表面要求同样决定选型。'],
        ['忽略回边干涉', '第一道折弯成功，并不代表后续已成形边能够避开冲头和夹具。'],
        ['忽略最小翻边', '小于实际肩部支撑范围的翻边可能滑移、变形或导致角度不稳定。'],
        ['忽略材料强度', '高强钢和不锈钢可能需要更高成形力以及更宽开口或更大圆角余量。'],
        ['选择过小 V 槽', '过窄 V 槽会提高吨位、肩部压力、压痕和模具超载风险。'],
        ['忽略模具承载等级', '冲头、下模及分段工具的允许载荷必须独立于设备能力进行检查。'],
        ['忽略批量稳定性', '生产用模具应关注寿命、重复定位和可控表面质量，而不只是首件能够成形。'],
      ],
    },
    custom: {
      title: '定制模具注意事项',
      text: [
        '标准模具不能覆盖所有折弯工况。复杂异形件、窄边回折、深盒结构、偏移折弯、大圆弧成形以及存在干涉风险的工件，可能需要定制冲头或下模方案。',
        '图示为典型工程参考结构。实际模具几何形状会因模具制造商、折弯工艺、吨位等级、圆角设计及生产标准不同而存在差异。对于特殊产品，应依据材料、折弯顺序、干涉风险和批量稳定性评估定制模具设计。',
      ],
    },
    faq: {
      title: '常见问题',
      items: [
        ['如何选择折弯机模具？', '先确认材料、板厚、折弯角度、内圆角、翻边几何和折弯顺序，再核对 V 槽、冲头轮廓、模具额定载荷、设备吨位及表面要求。'],
        ['何时应使用鹅颈模具？', '当回边、箱体侧壁或前一道折弯在后续工序中会与直身冲头发生干涉时，应考虑鹅颈模具。'],
        ['模具干涉由什么造成？', '在计划折弯顺序中，成形后的零件包络与冲头本体、夹具、下模、分段接缝或设备喉口碰撞，就会发生干涉。'],
        ['冲头半径如何影响内圆角？', '在空气折弯中，V 槽与材料强烈影响自然内圆角；冲头半径限定接触条件，当其设计较大时会主导成形圆角。'],
        ['何时需要定制模具？', '当标准模具无法提供所需避让、段差、大圆弧、表面控制或稳定重复成形能力时，应评估定制方案。'],
        ['如何减少不锈钢或铝板压痕？', '应保持接触面清洁光滑，使用经过验证的保护膜或聚氨酯防护，并在适用时采用无痕模具和投产前试折。'],
      ],
    },
    notes: {
      title: '工程说明',
      items: [
        '模具选择应综合考虑材料、板厚、V 槽、折弯顺序、回边高度、设备吨位和表面要求。',
        '对于长期批量生产，应关注模具寿命、分段状态、重复定位稳定性以及首件与过程尺寸漂移。',
        '特殊工件应在编程和排产确定前，提前评估干涉风险与模具承载能力。',
      ],
    },
    relatedTitle: '相关工程工具',
    relatedLabels: {
      pressBrakeCalculator: '折弯机计算器', materialDatabase: '材料数据库', vDieSelectionTool: 'V 型模具选择工具', insideRadiusGuide: '内半径指南', springbackDatabase: '回弹数据库', bendAllowanceCalculator: '折弯展开计算器', airBendingGuide: '空气折弯指南', pressBrakeTonnageGuide: '折弯机吨位指南', vDieOpeningGuide: '如何选择折弯机 V 型模开口', toolingSelectionGuide: '折弯机模具选型指南', crowningGuide: '折弯机挠度补偿指南',
    },
    diagrams: {
      eyebrow: '模具图示系统',
      title: '典型模具轮廓参考',
      intro: '简化剖面用于说明常见模具类型的功能，以及应用工程中需要核对的避空或成形特征。',
      reference: '典型参考图示',
      diagrams: [
        { type: 'standard', title: '标准冲头与 V 型下模', aria: '标准冲头与 V 型下模典型参考图示', description: '标准冲头在 V 型下模中折弯板材。', tags: ['冲头', 'V 槽开口', '翻边支撑'], caption: '适用于成品轮廓能够避开直身冲头的常规空气折弯。' },
        { type: 'gooseneck', title: '鹅颈冲头', aria: '鹅颈冲头避空典型参考图示', description: '带避空轮廓的冲头避开回边。', tags: ['避空', '回边', '间隙'], caption: '避空本体为箱体侧壁或回折边提供空间。' },
        { type: 'acute', title: '锐角模具', aria: '锐角模具典型参考图示', description: '锐角冲头和下模形成小夹角。', tags: ['锐角', '过折弯', '回弹'], caption: '小角度设定应在确认应变和成形力后使用。' },
        { type: 'hemming', title: '压平模具', aria: '压平模具闭合典型参考图示', description: '压平工具闭合预折包边。', tags: ['预折', '闭合', '表面'], caption: '闭合阶段必须控制间隙、压痕和边缘状态。' },
        { type: 'offset', title: '段差模具', aria: '段差模具典型参考图示', description: '段差模具形成阶梯形板材。', tags: ['Z 型', '偏移高度', '中心线'], caption: '匹配的上下台阶共同控制两道折弯。' },
        { type: 'radius', title: '圆弧模具', aria: '大圆弧模具典型参考图示', description: '圆弧冲头形成较大的内圆角。', tags: ['圆弧冲头', '大圆角', '材料流动'], caption: '适用零件中，宽接触可降低局部应变集中。' },
      ],
    },
  },
  ru: {
    hubName: 'Инженерный центр ZYCO',
    back: '← Назад к инженерным инструментам',
    eyebrow: 'Инженерное руководство',
    title: 'Руководство по выбору оснастки листогибочного пресса',
    subtitle: 'Прикладной справочник по выбору пуансона и матрицы для точной, стабильной гибки с контролем поверхности.',
    seoDescription: 'Инженерное руководство по выбору оснастки листогиба: типы пуансонов и матриц, проверка столкновений, защита поверхности, специальная формовка и заказная оснастка.',
    keywords: 'оснастка листогиба, пуансон, матрица, гусачный пуансон, матрица подгибки, ступенчатая матрица, заказная оснастка',
    intro: { title: 'Введение', text: ['Оснастку выбирают по полному условию гибки: марке и толщине материала, требуемому внутреннему радиусу, размерам полок, последовательности гибов, требованиям к видимой поверхности, мощности станка и объему выпуска.', 'Инструмент, пригодный для одной пробной детали, может оказаться непригодным для серии, если он перегружает плечо, оставляет следы, мешает следующей обратной полке или нестабильно базируется в длинной партии.'] },
    why: { title: 'Почему важен выбор оснастки', intro: 'Геометрия инструмента является частью возможностей процесса, а не только средством получения угла.', cards: [['Точность и стабильность', 'Радиус пуансона, раскрытие V и центровка влияют на повторяемость угла, радиус и размеры при изменениях материала.'], ['Столкновения и малая полка', 'Высота и профиль пуансона, а также плечи матрицы определяют проход обратной полки и надежность опоры короткой стороны.'], ['Ресурс и нагрузка', 'Узкое раскрытие или неверный носик концентрируют нагрузку и ускоряют износ, сколы и повреждение плеч.'], ['Поверхность и серия', 'Контактное давление определяет следы; в серии особенно важны состояние инструмента, позиционирование и защита.']] },
    punch: { title: 'Выбор пуансона', intro: 'Пуансон выбирают после проверки конечного профиля и всей последовательности гибов.', cards: [['Стандартный пуансон', 'Подходит для доступных профилей воздушной гибки, обладает хорошей жесткостью; обратные стенки коробов могут столкнуться с прямым корпусом.'], ['Гусачный пуансон', 'Создает выемку для обратных полок и глубоких коробов; облегчение корпуса требует более строгой проверки допустимой нагрузки.'], ['Остроугольный пуансон', 'Используется для малых углов и управляемого перегиба при компенсации пружинения; повышает риск трещин и следов на твердых материалах.'], ['Радиусный пуансон', 'Применяется при заданном большом радиусе или необходимости снизить деформацию поверхности; требует согласования с матрицей и разверткой.'], ['Узкий пуансон', 'Полезен при ограниченном доступе и соседних гибах; меньшая ширина может ограничить нагрузку и повысить чувствительность к прогибу.']] },
    die: { title: 'Выбор матрицы', intro: 'Матрица должна поддерживать полку, выдерживать нагрузку и формировать радиус без недопустимого давления на поверхность.', cards: [['Одиночная V-матрица', 'Фиксированное раскрытие упрощает настройку и стабильно для серии; проверьте раскрытие, нагрузку и минимальную полку.'], ['Многоручьевая V-матрица', 'Удобна для смешанных работ; выбор правильного ручья и центровка обязательны для исключения ошибочной настройки.'], ['Радиусная матрица', 'Обеспечивает плавную опору при больших радиусах или чувствительной поверхности, снижая локальные следы.'], ['Матрица для подгибки', 'Закрывает заготовку после контролируемого предварительного гиба; зазор, параллельность и толщина определяют качество кромки.'], ['Ступенчатая матрица', 'Формирует два противоположных гиба за ход; высота ступени, ось и позиционирование задают конечное смещение.']] },
    special: [
      { id: 'gooseneck', title: 'Гусачная оснастка', text: 'У глубоких коробов и обратных полок столкновение часто появляется на последующем гибе, когда сформированная стенка входит в зону прямого пуансона. Гусачный профиль освобождает пространство позади рабочей вершины. Проверьте весь габарит согнутой детали, зазор в нижней точке хода, стыки сегментов и уменьшенную несущую способность облегченного профиля.' },
      { id: 'acute', title: 'Остроугольная оснастка', text: 'Остроугольная оснастка нужна для малого угла или намеренного перегиба с учетом пружинения, а также для подготовки подгибки. У высокопрочного и малопластичного материала чрезмерно малый радиус повышает риск трещин; подтвердите предел материала, направление прокатки, усилие и пробные гибы.' },
      { id: 'hemming', title: 'Оснастка для подгибки', text: 'Стабильную подгибку обычно выполняют в два этапа: предварительный острый гиб и последующее закрытие. Закрывающая матрица должна выдерживать требуемый зазор без повреждения видимой поверхности. Для покрытого листа, нержавеющей стали и алюминия важны защитная пленка, чистые плечи и повторяемое положение.' },
      { id: 'offset', title: 'Ступенчатая оснастка', text: 'Ступенчатый инструмент создает Z-образный профиль двумя гибами в одной согласованной геометрии. Требуемое смещение сопоставляют с высотой инструмента с учетом толщины и пружинения. Ошибка центровки, параллельности или положения листа проявляется сразу в обеих полках.' },
    ],
    radius: { title: 'Радиус оснастки и толщина материала', intro: 'Даже когда естественный радиус воздушной гибки сильно зависит от раскрытия V, радиус пуансона остается важным параметром качества.', cards: [['Согласование радиуса', 'Носик согласуют с внутренним радиусом, толщиной и методом гибки; один пуансон не гарантирует радиус чертежа.'], ['Слишком малый радиус', 'Острый носик и узкое раскрытие концентрируют растяжение, повышая риск трещин, повреждения покрытия и утонения.'], ['Слишком большой радиус', 'Большой радиус улучшает течение материала, но может увеличить результат гибки и сместить контроль полок и развертки.']] },
    surface: { title: 'Защита поверхности', intro: 'Для нержавеющей стали, алюминия и зеркального листа поверхность является параметром процесса.', cards: [['Зона контакта', 'Держите плечи чистыми и свободными от налипания: частицы непосредственно отпечатываются на видимой поверхности.'], ['Защитные слои', 'Проверенная защитная пленка или полиуретановая прокладка может уменьшить следы после оценки толщины и пригодности к формовке.'], ['Оснастка с малым следом', 'Радиусные плечи, немаркирующие вставки или защитная оснастка снижают давление, но требуют проверки нагрузки и повторяемости.']] },
    mistakes: { title: 'Типовые ошибки выбора оснастки', items: [['Выбор только по толщине', 'Нужно также учитывать радиус, полку, марку материала и поверхность.'], ['Игнорирование обратной полки', 'Первый успешный гиб не подтверждает проход детали в последующих операциях.'], ['Игнорирование малой полки', 'Недостаточная опора вызывает скольжение, деформацию и нестабильный угол.'], ['Игнорирование прочности', 'Высокопрочные и нержавеющие материалы требуют большего усилия и запаса радиуса или раскрытия.'], ['Слишком узкая V-матрица', 'Узкое раскрытие повышает усилие, давление на плечах, следы и риск перегрузки.'], ['Отсутствие проверки нагрузки', 'Допустимую нагрузку пуансона, матрицы и сегментов проверяют отдельно от мощности станка.'], ['Недооценка серии', 'Для выпуска важны ресурс, повторяемое базирование и стабильная поверхность, а не только первая деталь.']] },
    custom: { title: 'Когда требуется заказная оснастка', text: ['Стандартная оснастка не покрывает все условия гибки. Сложные профили, узкие обратные полки, глубокие короба, ступенчатые гибы, большие радиусы и детали с риском столкновений могут требовать специального пуансона или матрицы.', 'Показанные иллюстрации являются типовыми инженерными справочными схемами. Фактическая геометрия оснастки зависит от производителя, применения, допустимого усилия, конструкции радиусов и производственных стандартов. Для специальных изделий оцените материал, порядок гибов, риск столкновения и стабильность серии до проектирования оснастки.'] },
    faq: { title: 'Частые вопросы', items: [['Как выбирать оснастку листогиба?', 'Определите материал, толщину, угол, радиус, полки и порядок гибов, затем проверьте раскрытие V, профиль пуансона, допустимую нагрузку, станок и поверхность.'], ['Когда нужен гусачный инструмент?', 'Когда обратная полка, стенка короба или предыдущий гиб сталкивается с прямым пуансоном на следующей операции.'], ['Что вызывает столкновение?', 'Столкновение возникает при контакте сформированной детали с пуансоном, держателем, матрицей, сегментами или зевом станка в выбранной последовательности.'], ['Как радиус пуансона влияет на внутренний радиус?', 'При воздушной гибке естественный радиус зависит от V и материала, а пуансон задает минимальный контакт и может определять радиус при большом размере.'], ['Когда нужна заказная оснастка?', 'Когда стандартная не обеспечивает зазор, ступень, большой радиус, поверхность или стабильную повторяемость детали.'], ['Как уменьшить следы на нержавеющей стали или алюминии?', 'Используйте чистые полированные контакты, проверенную пленку или полиуретановую защиту, подходящую немаркирующую оснастку и пробные гибы.']] },
    notes: { title: 'Инженерные примечания', items: ['Выбирайте оснастку совместно по материалу, толщине, раскрытию V, порядку гибов, высоте обратной полки, усилию станка и поверхности.', 'Для длительных серий контролируйте ресурс инструмента, состояние сегментов, повторяемость позиционирования и изменение размеров в процессе.', 'Для специальных деталей заранее проверяйте столкновения и допустимую нагрузку оснастки до завершения программирования и планирования производства.'] },
    relatedTitle: 'Связанные инженерные инструменты',
    relatedLabels: { pressBrakeCalculator: 'Калькулятор листогиба', materialDatabase: 'База материалов', vDieSelectionTool: 'Подбор V-матрицы', insideRadiusGuide: 'Справочник внутреннего радиуса', springbackDatabase: 'База пружинения', bendAllowanceCalculator: 'Калькулятор припуска на гиб', airBendingGuide: 'Руководство по воздушной гибке', pressBrakeTonnageGuide: 'Руководство по тоннажу пресса', vDieOpeningGuide: 'Выбор раскрытия V-матрицы', toolingSelectionGuide: 'Выбор оснастки листогиба', crowningGuide: 'Руководство по компенсации прогиба листогиба' },
    diagrams: {
      eyebrow: 'Система схем оснастки', title: 'Типовые профили оснастки', intro: 'Упрощенные сечения показывают назначение распространенных инструментов и проверяемые зоны зазора или формования.', reference: 'Типовая справочная схема',
      diagrams: [
        { type: 'standard', title: 'Стандартный пуансон и V-матрица', aria: 'Типовая схема стандартного пуансона и V-матрицы', description: 'Пуансон гнет лист в V-матрице.', tags: ['Пуансон', 'Раскрытие V', 'Опора полки'], caption: 'Обычная воздушная гибка при свободном проходе прямого пуансона.' },
        { type: 'gooseneck', title: 'Гусачный пуансон', aria: 'Типовая схема зазора гусачного пуансона', description: 'Облегченный корпус обходит обратную полку.', tags: ['Выемка', 'Обратная полка', 'Зазор'], caption: 'Выемка дает место стенкам короба и обратным полкам.' },
        { type: 'acute', title: 'Остроугольная оснастка', aria: 'Типовая схема остроугольной оснастки', description: 'Остроугольный инструмент формирует малый угол.', tags: ['Острый угол', 'Перегиб', 'Пружинение'], caption: 'Используется после проверки усилия и деформации материала.' },
        { type: 'hemming', title: 'Оснастка для подгибки', aria: 'Типовая схема закрытия подгибки', description: 'Закрывающий инструмент сжимает подготовленную кромку.', tags: ['Предгиб', 'Закрытие', 'Поверхность'], caption: 'Этап закрытия должен контролировать зазор и следы.' },
        { type: 'offset', title: 'Ступенчатая оснастка', aria: 'Типовая схема ступенчатой оснастки', description: 'Инструмент формирует ступень листа.', tags: ['Z-профиль', 'Высота', 'Ось'], caption: 'Согласованные ступени контролируют два гиба одновременно.' },
        { type: 'radius', title: 'Радиусная оснастка', aria: 'Типовая схема большого радиуса', description: 'Радиусный пуансон формирует широкий внутренний радиус.', tags: ['Радиусный пуансон', 'Большой радиус', 'Течение материала'], caption: 'Широкий контакт уменьшает концентрацию деформации.' },
      ],
    },
  },
  es: {
    hubName: 'Centro de ingeniería ZYCO',
    back: '← Volver a herramientas de ingeniería',
    eyebrow: 'Guía de ingeniería',
    title: 'Guía de selección de utillaje para plegadora',
    subtitle: 'Referencia aplicada para seleccionar punzón y matriz en producción precisa, estable y con control de superficie.',
    seoDescription: 'Guía técnica de selección de utillaje para plegadora: tipos de punzón y matriz, interferencias, protección de superficie, conformado especial y utillaje a medida.',
    keywords: 'utillaje plegadora, punzón, matriz, punzón cuello de cisne, matriz de aplastado, matriz de desplazamiento, utillaje a medida',
    intro: { title: 'Introducción', text: ['El utillaje debe seleccionarse con la condición completa del pliegue: material y espesor, radio interior objetivo, dimensiones de pestaña, secuencia de pliegues, superficie visible, capacidad de máquina y volumen previsto.', 'Una herramienta capaz de producir una muestra puede fallar en serie si sobrecarga el hombro, marca la superficie, interfiere con una pestaña posterior o pierde repetibilidad de posicionamiento.'] },
    why: { title: 'Por qué importa el utillaje', intro: 'La geometría del utillaje forma parte de la capacidad del proceso, no solo produce un ángulo.', cards: [['Precisión y estabilidad', 'Radio del punzón, abertura V y centrado influyen en repetición angular, radio interior y control dimensional.'], ['Interferencia y pestaña mínima', 'Altura y alivio del punzón, junto con los hombros de matriz, determinan el paso de retornos y el apoyo de pestañas cortas.'], ['Vida útil y carga', 'Una abertura pequeña o una punta inadecuada concentran carga y aceleran desgaste, mellas o daño de hombros.'], ['Superficie y consistencia', 'La presión de contacto produce marcas; en serie son esenciales el estado del útil, la posición y la protección.']] },
    punch: { title: 'Selección del punzón', intro: 'Seleccione el punzón tras comprobar el perfil terminado y toda la secuencia de plegado.', cards: [['Punzón estándar', 'Elección habitual para perfiles accesibles, con buena rigidez; los retornos de cajas pueden chocar con su cuerpo recto.'], ['Punzón cuello de cisne', 'Deja espacio para pestañas retornadas y cajas profundas; el cuerpo aliviado requiere verificar con cuidado la carga permitida.'], ['Punzón agudo', 'Adecuado para ángulos pequeños y sobreplegado controlado por retorno elástico; incrementa riesgo de fisura y marca en materiales duros.'], ['Punzón de radio', 'Se utiliza para radios interiores grandes o menor deformación superficial; debe coordinarse con abertura y desarrollo.'], ['Punzón estrecho', 'Ayuda con acceso limitado o pliegues próximos; su anchura reducida puede limitar carga y aumentar sensibilidad a flexión.']] },
    die: { title: 'Selección de la matriz', intro: 'La matriz debe apoyar la pestaña, soportar la carga y formar el radio requerido sin presión superficial excesiva.', cards: [['Matriz V única', 'Una abertura dedicada facilita el control y la repetición; confirme abertura, carga admisible y pestaña mínima.'], ['Matriz V múltiple', 'Aporta flexibilidad para trabajos variados; la estación correcta y el centrado evitan usar una abertura errónea.'], ['Matriz de radio', 'Da apoyo suave para radios grandes o acabados sensibles, reduciendo marcas localizadas.'], ['Matriz de aplastado', 'Cierra el borde después del prepliegue; holgura, paralelismo y espesor controlan la uniformidad.'], ['Matriz de desplazamiento', 'Forma dos pliegues opuestos en una carrera; altura, eje y posicionamiento gobiernan el desplazamiento final.']] },
    special: [
      { id: 'gooseneck', title: 'Utillaje cuello de cisne', text: 'En cajas profundas y pestañas retornadas, la interferencia suele aparecer en un pliegue posterior, cuando la pared ya conformada ocupa el espacio de un punzón recto. El cuello de cisne crea alivio detrás de la punta. Verifique el volumen completo de la pieza plegada, la holgura al final de carrera, las juntas de segmentos y la capacidad reducida del perfil aliviado.' },
      { id: 'acute', title: 'Utillaje agudo', text: 'Se emplea cuando se necesita un ángulo incluido pequeño o un sobreplegado para compensar retorno elástico; también prepara el aplastado. En materiales de alta resistencia o baja ductilidad, un radio excesivamente pequeño eleva el riesgo de fisura, por lo que deben comprobarse material, dirección de laminación, fuerza y pruebas.' },
      { id: 'hemming', title: 'Utillaje de aplastado', text: 'Un borde cerrado estable suele producirse en dos operaciones: prepliegue agudo y cierre. La matriz de cierre debe controlar la holgura sin atrapar demasiado material ni dañar la cara visible. En chapa recubierta, inoxidable o aluminio, valide película protectora, limpieza de hombros y posición repetible.' },
      { id: 'offset', title: 'Utillaje de desplazamiento', text: 'El útil de desplazamiento crea formas Z mediante dos pliegues en una geometría controlada. La cota de desplazamiento debe coincidir con la altura del útil considerando espesor y retorno elástico. Centrado, paralelismo y localización de chapa son críticos para evitar alas desiguales y error angular.' },
    ],
    radius: { title: 'Radio del utillaje y espesor', intro: 'Aunque la abertura V influye mucho en el radio natural del plegado al aire, el radio del punzón sigue controlando la calidad.', cards: [['Correspondencia de radios', 'Use una punta compatible con radio interior, espesor y método; el punzón por sí solo no garantiza el radio del plano.'], ['Radio demasiado pequeño', 'Puntas cerradas y aberturas estrechas concentran deformación, elevando fisuras, daño de recubrimiento y adelgazamiento.'], ['Radio demasiado grande', 'Un radio grande mejora el flujo, pero puede aumentar el radio formado y alterar pestañas o desarrollo.']] },
    surface: { title: 'Protección superficial', intro: 'En acero inoxidable, aluminio y chapa espejo, el acabado debe tratarse como requisito del proceso.', cards: [['Condición de contacto', 'Mantenga limpios los hombros; suciedad o material adherido se transfiere directamente a la superficie visible.'], ['Capas protectoras', 'La película protectora o una barrera de poliuretano validada puede reducir marcas tras revisar su espesor y aptitud de conformado.'], ['Utillaje de baja marca', 'Hombros radiados, insertos que no marcan o útiles protectores reducen presión, pero requieren confirmar carga y repetición.']] },
    mistakes: { title: 'Errores comunes de selección', items: [['Elegir solo por espesor', 'También determinan la selección el radio, la pestaña, el material y el acabado.'], ['Ignorar retornos', 'Un primer pliegue correcto no garantiza espacio para operaciones posteriores.'], ['Ignorar pestaña mínima', 'El apoyo insuficiente puede causar deslizamiento, deformación o ángulo inestable.'], ['Ignorar resistencia', 'Materiales resistentes e inoxidables pueden necesitar más fuerza y mayor radio o abertura.'], ['Abertura V demasiado pequeña', 'Eleva tonelaje, presión de hombro, marcas y riesgo de sobrecarga.'], ['No verificar la carga', 'La carga de punzón, matriz y segmentos se comprueba aparte de la capacidad de máquina.'], ['No valorar la serie', 'En producción importan vida útil, posicionamiento repetible y superficie constante.']] },
    custom: { title: 'Consideraciones de utillaje a medida', text: ['El utillaje estándar no cubre todas las condiciones. Perfiles complejos, retornos estrechos, cajas profundas, desplazamientos, radios grandes y piezas con riesgo de interferencia pueden requerir punzón o matriz a medida.', 'Las ilustraciones son referencias técnicas representativas. La geometría real puede variar según fabricante, aplicación de plegado, capacidad de tonelaje, diseño de radios y normas de producción. Para piezas especiales, evalúe material, secuencia, interferencia y estabilidad de serie antes de definir un útil a medida.'] },
    faq: { title: 'Preguntas frecuentes', items: [['¿Cómo selecciono el utillaje de plegadora?', 'Defina material, espesor, ángulo, radio, pestañas y secuencia; después verifique abertura V, perfil de punzón, carga, capacidad y superficie.'], ['¿Cuándo uso un cuello de cisne?', 'Cuando una pestaña retornada, pared de caja o pliegue anterior interfiere con un punzón recto en una operación posterior.'], ['¿Qué causa la interferencia?', 'La pieza conformada colisiona con el punzón, portaherramientas, matriz, segmentos o garganta durante la secuencia prevista.'], ['¿Cómo afecta el radio del punzón al radio interior?', 'En plegado al aire, V y material influyen en el radio natural; el punzón fija el contacto mínimo y domina si es grande.'], ['¿Cuándo se requiere utillaje a medida?', 'Cuando el estándar no ofrece holgura, desplazamiento, radio grande, superficie o repetibilidad necesaria.'], ['¿Cómo reduzco marcas en inoxidable o aluminio?', 'Use contactos limpios y pulidos, película o poliuretano validados, útiles de baja marca adecuados y pruebas antes de producción.']] },
    notes: { title: 'Notas de ingeniería', items: ['Seleccione el utillaje considerando conjuntamente material, espesor, abertura V, secuencia, altura de retorno, tonelaje y superficie.', 'Para series largas, supervise vida del útil, estado de segmentos, posicionamiento repetible y variación dimensional durante el proceso.', 'En piezas especiales, evalúe con antelación interferencia y capacidad del útil antes de cerrar programación y planificación.'] },
    relatedTitle: 'Herramientas de ingeniería relacionadas',
    relatedLabels: { pressBrakeCalculator: 'Calculadora de plegadora', materialDatabase: 'Base de datos de materiales', vDieSelectionTool: 'Selección de matriz V', insideRadiusGuide: 'Guía de radio interior', springbackDatabase: 'Base de datos de retorno elástico', bendAllowanceCalculator: 'Calculadora de desarrollo de plegado', airBendingGuide: 'Guía de plegado al aire', pressBrakeTonnageGuide: 'Guía de tonelaje para plegadoras', vDieOpeningGuide: 'Selección de abertura de matriz V', toolingSelectionGuide: 'Guía de selección de utillaje', crowningGuide: 'Guía de compensación de flecha para plegadoras' },
    diagrams: {
      eyebrow: 'Sistema de diagramas de utillaje', title: 'Perfiles representativos de utillaje', intro: 'Las secciones simplificadas muestran la función de familias comunes y la holgura o característica que debe comprobarse.', reference: 'Referencia representativa',
      diagrams: [
        { type: 'standard', title: 'Punzón estándar y matriz V', aria: 'Referencia de punzón estándar y matriz V', description: 'Punzón formando chapa en matriz V.', tags: ['Punzón', 'Abertura V', 'Apoyo de pestaña'], caption: 'Plegado al aire general cuando la pieza libera el punzón recto.' },
        { type: 'gooseneck', title: 'Punzón cuello de cisne', aria: 'Referencia de holgura de cuello de cisne', description: 'Cuerpo aliviado libera una pestaña retornada.', tags: ['Alivio', 'Pestaña retornada', 'Holgura'], caption: 'El cuerpo aliviado deja espacio para paredes y retornos.' },
        { type: 'acute', title: 'Utillaje agudo', aria: 'Referencia de utillaje agudo', description: 'Punzón y matriz agudos forman ángulo pequeño.', tags: ['Ángulo agudo', 'Sobreplegado', 'Retorno'], caption: 'Utilícelo después de comprobar deformación y fuerza.' },
        { type: 'hemming', title: 'Utillaje de aplastado', aria: 'Referencia de cierre de borde', description: 'Herramienta cierra un borde preplegado.', tags: ['Prepliegue', 'Cierre', 'Superficie'], caption: 'El cierre controla holgura, marcas y estado del borde.' },
        { type: 'offset', title: 'Utillaje de desplazamiento', aria: 'Referencia de desplazamiento', description: 'Herramienta forma un perfil escalonado.', tags: ['Forma Z', 'Altura', 'Eje'], caption: 'Los escalones emparejados controlan ambos pliegues.' },
        { type: 'radius', title: 'Utillaje de radio', aria: 'Referencia de radio grande', description: 'Punzón radiado forma un radio interior amplio.', tags: ['Punzón radiado', 'Radio grande', 'Flujo'], caption: 'El contacto amplio reduce la deformación concentrada.' },
      ],
    },
  },
  tr: {
    hubName: 'ZYCO Mühendislik Merkezi',
    back: '← Mühendislik araçlarına dön',
    eyebrow: 'Mühendislik kılavuzu',
    title: 'Abkant pres takım seçimi kılavuzu',
    subtitle: 'Hassas, kararlı ve yüzey kontrollü üretim için zımba ve kalıp geometrisi seçim başvurusu.',
    seoDescription: 'Abkant pres takım seçimi, zımba ve kalıp türleri, çakışma kontrolü, yüzey koruma, özel şekillendirme ve özel takım kararları için mühendislik kılavuzu.',
    keywords: 'abkant takım seçimi, zımba, kalıp, kaz boynu zımba, ezme kalıbı, ofset kalıbı, özel takım',
    intro: { title: 'Giriş', text: ['Takım seçimi; malzeme türü ve kalınlığı, hedef iç radyüs, flanş ölçüleri, büküm sırası, görünür yüzey gereksinimi, makine kapasitesi ve üretim miktarı birlikte değerlendirilerek yapılır.', 'Bir numuneyi şekillendiren takım, omuzu aşırı yüklüyor, bitmiş yüzeyi izliyor, sonraki dönüş flanşıyla çakışıyor veya seri boyunca konumunu tekrarlayamıyorsa üretime uygun sayılmaz.'] },
    why: { title: 'Takım seçimi neden önemlidir', intro: 'Takım geometrisi yalnız açı oluşturmaz; proses kabiliyetinin bir parçasıdır.', cards: [['Hassasiyet ve kararlılık', 'Zımba radyüsü, V açıklığı ve merkezleme; açı tekrarı, iç radyüs ve ölçü kontrolünü etkiler.'], ['Çakışma ve en küçük flanş', 'Zımba yüksekliği, boşaltılmış profil ve kalıp omuzları; dönüş kenarının geçişini ve kısa flanş desteğini belirler.'], ['Takım ömrü ve yük', 'Dar açıklık veya uygun olmayan uç yükü yoğunlaştırır; aşınma, kırılma ve omuz hasarı hızlanabilir.'], ['Yüzey ve seri tutarlılığı', 'Temas basıncı izleri belirler; uzun seride takım durumu, konumlama ve koruma daha önemlidir.']] },
    punch: { title: 'Zımba seçimi', intro: 'Zımbayı yalnız ilk açıya göre değil, bitmiş profil ve bütün büküm sırası doğrulandıktan sonra seçin.', cards: [['Standart zımba', 'Erişilebilir profillerde genel havada büküm için rijit ve güçlü seçenektir; kutu dönüşleri düz gövdeye çarpabilir.'], ['Kaz boynu zımba', 'Dönüş flanşları ve derin kutular için gövde arkasında boşluk sağlar; boşaltılmış kesitte izin verilen yük dikkatle incelenmelidir.'], ['Dar açılı zımba', 'Küçük açı ve geri esneme telafisi için kontrollü aşırı bükmede kullanılır; sert malzemede çatlak ve iz riskini artırır.'], ['Radyüslü zımba', 'Büyük iç radyüs veya azaltılmış yüzey gerinimi istenen parçalar içindir; kalıp açıklığı ve açınım ile uyumlu olmalıdır.'], ['Dar zımba', 'Sınırlı erişimde veya yakın bükümlerde yararlıdır; düşük gövde genişliği yükü sınırlayabilir ve sehim duyarlılığını artırabilir.']] },
    die: { title: 'Kalıp seçimi', intro: 'Kalıp flanşı desteklemeli, yükü taşımalı ve aşırı yüzey basıncı oluşturmadan hedef radyüsü üretmelidir.', cards: [['Tek V kalıp', 'Sabit açıklık ayarı açık ve seri üretimi kararlı kılar; açıklık, yük sınırı ve en küçük flanşı doğrulayın.'], ['Çoklu V kalıp', 'Karışık işlerde esneklik sağlar; yanlış açıklığı önlemek için istasyon ve merkezleme doğrulanmalıdır.'], ['Radyüslü kalıp', 'Büyük radyüs veya hassas yüzey için daha yumuşak destek verir ve yerel izi azaltır.'], ['Ezme kalıbı', 'Kontrollü ön bükümden sonra kenarı kapatır; boşluk, paralellik ve kalınlık, kenar kararlılığını belirler.'], ['Ofset kalıbı', 'Tek strokta karşılıklı iki büküm oluşturur; adım yüksekliği, eksen ve konumlama son ofseti belirler.']] },
    special: [
      { id: 'gooseneck', title: 'Kaz boynu takım', text: 'Derin kutu ve dönüş flanşı parçalarında çakışma çoğunlukla sonraki bükümde, şekillenmiş duvar düz zımbanın hacmine girdiğinde görülür. Kaz boynu zımba çalışma ucunun arkasında boşluk açar. Tam bükülmüş zarfı, alt konumdaki açıklığı, segment birleşimlerini ve boşaltılmış profilin daha düşük yük kapasitesini kontrol edin.' },
      { id: 'acute', title: 'Dar açılı takım', text: 'Küçük dahil açı veya geri esneme sonrasında hedef açıyı elde etmek için aşırı büküm gerektiğinde dar açılı takım kullanılır; ezme ön bükümünde de yaygındır. Yüksek dayanımlı veya düşük sünek malzemede çok küçük radyüs çatlama riskini yükseltir; malzeme sınırı, hadde yönü, kuvvet ve deneme bükümü doğrulanmalıdır.' },
      { id: 'hemming', title: 'Ezme takımı', text: 'Kararlı kapalı kenar genellikle iki işlemle yapılır: dar açılı ön büküm ve kapatma. Kapatma kalıbı görünür yüzeye zarar vermeden son boşluğu kontrol etmelidir. Kaplamalı sac, paslanmaz ve alüminyumda koruyucu tabaka uygunluğu, temiz omuzlar ve tekrarlı konumlama önemlidir.' },
      { id: 'offset', title: 'Ofset takımı', text: 'Ofset takım kontrollü geometride iki büküm oluşturarak Z biçimli parçalar üretir. Gerekli ofset ölçüsü, kalınlık ve geri esneme hesaba katılarak takım yüksekliğiyle eşleşmelidir. Merkezleme, koç paralelliği ve sac konumu bozulursa iki bükümde de ölçü ve açı hatası görülür.' },
    ],
    radius: { title: 'Takım radyüsü ve malzeme kalınlığı', intro: 'Havada bükmede doğal radyüs V açıklığından güçlü biçimde etkilense de zımba radyüsü kaliteyi belirleyen bir girdidir.', cards: [['Radyüs eşleştirme', 'Zımba ucu hedef iç radyüs, kalınlık ve yöntemle uyumlu seçilir; yalnız zımba teknik resmi garanti etmez.'], ['Çok küçük radyüs', 'Keskin uç ve dar açıklık dış lif gerinimini yoğunlaştırır; çatlak, kaplama hasarı ve incelme riski artar.'], ['Çok büyük radyüs', 'Büyük radyüs akışı iyileştirebilir, ancak oluşan radyüsü büyütüp flanş ve açınım kontrolünü değiştirebilir.']] },
    surface: { title: 'Yüzey koruması', intro: 'Paslanmaz çelik, alüminyum ve ayna yüzeyli saclarda görünüm bir proses şartıdır.', cards: [['Temas durumu', 'Omuzları temiz ve yapışmadan arınmış tutun; parçacıklar görünür yüzeye doğrudan iz bırakır.'], ['Koruyucu katmanlar', 'Doğrulanmış koruyucu film veya poliüretan ara tabaka, kalınlık ve şekillendirme uygunluğu incelendikten sonra izleri azaltabilir.'], ['Düşük izli takım', 'Radyüslü omuz, iz bırakmayan ek veya koruyucu takım basıncı azaltır; yük ve tekrarlanabilirlik yine doğrulanır.']] },
    mistakes: { title: 'Yaygın takım seçim hataları', items: [['Yalnız kalınlığa göre seçim', 'Radyüs, flanş, malzeme ve yüzey de takım kararını belirler.'], ['Dönüş çakışmasını atlamak', 'Başarılı ilk büküm, sonraki adımda boşluk olduğunu kanıtlamaz.'], ['En küçük flanşı atlamak', 'Yetersiz destek kayma, bozulma veya kararsız açı oluşturabilir.'], ['Malzeme dayanımını atlamak', 'Yüksek dayanımlı ve paslanmaz malzeme daha fazla kuvvet ve radyüs ya da açıklık payı isteyebilir.'], ['Aşırı dar V açıklığı', 'Tonajı, omuz basıncını, izleri ve aşırı yük riskini artırır.'], ['Yük sınırını kontrol etmemek', 'Zımba, kalıp ve segment yükü makine kapasitesinden ayrı doğrulanır.'], ['Seri kararlılığını atlamak', 'Üretimde ilk parça kadar ömür, tekrarlı konum ve yüzey kontrolü de önemlidir.']] },
    custom: { title: 'Özel takım değerlendirmeleri', text: ['Standart takımlar her büküm koşulunu karşılamaz. Karmaşık profiller, dar dönüş kenarları, derin kutular, ofset bükümler, büyük radyüsler ve çakışma riski bulunan parçalar özel zımba veya kalıp gerektirebilir.', 'Gösterilen çizimler temsili mühendislik referanslarıdır. Gerçek takım geometrisi takım üreticisine, büküm uygulamasına, tonaj kapasitesine, radyüs tasarımına ve üretim standartlarına göre değişebilir. Özel ürünlerde takım tasarımından önce malzeme, sıra, çakışma riski ve seri kararlılığı değerlendirilmelidir.'] },
    faq: { title: 'Sık sorulan sorular', items: [['Abkant pres takımı nasıl seçilir?', 'Malzeme, kalınlık, açı, iç radyüs, flanşlar ve sırayı belirleyin; ardından V açıklığı, zımba profili, yük, kapasite ve yüzeyi doğrulayın.'], ['Kaz boynu takım ne zaman kullanılır?', 'Dönüş flanşı, kutu duvarı veya önceki büküm sonraki işlemde düz zımbayla çakışacaksa kullanılır.'], ['Takım çakışmasına ne sebep olur?', 'Şekillenmiş parçanın planlanan sıra içinde zımba, tutucu, kalıp, segment veya makine boğazıyla temas etmesi çakışmadır.'], ['Zımba radyüsü iç radyüsü nasıl etkiler?', 'Havada bükmede doğal radyüsü V ve malzeme etkiler; zımba temas alt sınırını belirler ve büyük tasarlandığında baskın olur.'], ['Özel takım ne zaman gerekir?', 'Standart takım gereken boşluk, adım, büyük radyüs, yüzey kontrolü veya tekrarlı şekillendirmeyi sağlayamadığında.'], ['Paslanmaz veya alüminyumda izler nasıl azaltılır?', 'Temiz cilalı temas, doğrulanmış film veya poliüretan koruma, uygun düşük izli takım ve üretim öncesi deneme kullanın.']] },
    notes: { title: 'Mühendislik notları', items: ['Takımı; malzeme, kalınlık, V açıklığı, büküm sırası, dönüş yüksekliği, makine tonajı ve yüzey gereksinimi birlikte değerlendirilerek seçin.', 'Uzun serilerde takım ömrü, segment durumu, tekrarlı konumlama ve süreç içindeki ölçü kayması izlenmelidir.', 'Özel parçalarda programlama ve planlama kesinleşmeden önce çakışma ve takım yük kapasitesini değerlendirin.'] },
    relatedTitle: 'İlgili mühendislik araçları',
    relatedLabels: { pressBrakeCalculator: 'Abkant pres hesaplayıcısı', materialDatabase: 'Malzeme veritabanı', vDieSelectionTool: 'V kalıp seçim aracı', insideRadiusGuide: 'İç radyüs kılavuzu', springbackDatabase: 'Geri esneme veritabanı', bendAllowanceCalculator: 'Büküm payı hesaplayıcı', airBendingGuide: 'Havada büküm kılavuzu', pressBrakeTonnageGuide: 'Abkant pres tonaj kılavuzu', vDieOpeningGuide: 'V kalıp açıklığı seçimi', toolingSelectionGuide: 'Abkant pres takım seçimi kılavuzu', crowningGuide: 'Abkant pres sehim kompanzasyonu kılavuzu' },
    diagrams: {
      eyebrow: 'Takım çizim sistemi', title: 'Temsili takım profilleri', intro: 'Basitleştirilmiş kesitler, yaygın takım ailelerinin işlevini ve doğrulanması gereken boşluk veya şekillendirme özelliğini gösterir.', reference: 'Temsili referans',
      diagrams: [
        { type: 'standard', title: 'Standart zımba ve V kalıp', aria: 'Standart zımba ve V kalıp temsili referansı', description: 'Standart zımba sacı V kalıpta büker.', tags: ['Zımba', 'V açıklığı', 'Flanş desteği'], caption: 'Bitmiş profil düz zımbayı serbest bıraktığında genel havada büküm.' },
        { type: 'gooseneck', title: 'Kaz boynu zımba', aria: 'Kaz boynu zımba boşluk referansı', description: 'Boşaltılmış zımba dönüş flanşını geçer.', tags: ['Boşaltma', 'Dönüş flanşı', 'Açıklık'], caption: 'Boşaltılmış gövde kutu duvarları için yer sağlar.' },
        { type: 'acute', title: 'Dar açılı takım', aria: 'Dar açılı takım referansı', description: 'Dar açılı takım küçük açı oluşturur.', tags: ['Dar açı', 'Aşırı büküm', 'Geri esneme'], caption: 'Gerinim ve kuvvet kontrolünden sonra kullanılır.' },
        { type: 'hemming', title: 'Ezme takımı', aria: 'Ezme kapatma referansı', description: 'Kapatma takımı ön bükülmüş kenarı kapatır.', tags: ['Ön büküm', 'Kapatma', 'Yüzey'], caption: 'Kapatma boşluğu ve yüzey izini kontrol eder.' },
        { type: 'offset', title: 'Ofset takımı', aria: 'Ofset takım referansı', description: 'Takım kademeli sac profili oluşturur.', tags: ['Z biçimi', 'Ofset yüksekliği', 'Merkez çizgisi'], caption: 'Eşleşen adımlar iki bükümü birlikte kontrol eder.' },
        { type: 'radius', title: 'Radyüs takımı', aria: 'Büyük radyüs takım referansı', description: 'Radyüslü zımba geniş iç radyüs oluşturur.', tags: ['Radyüslü zımba', 'Büyük radyüs', 'Akış'], caption: 'Geniş temas yerel gerinim yoğunluğunu azaltır.' },
      ],
    },
  },
  id: {
    hubName: 'Pusat Teknik ZYCO',
    back: '← Kembali ke alat teknik',
    eyebrow: 'Panduan teknik',
    title: 'Panduan pemilihan perkakas mesin tekuk',
    subtitle: 'Referensi penerapan untuk memilih penekan dan cetakan bagi produksi yang akurat, stabil, dan terkendali permukaannya.',
    seoDescription: 'Panduan teknik pemilihan perkakas mesin tekuk: jenis penekan dan cetakan, pemeriksaan gangguan, perlindungan permukaan, pembentukan khusus, serta perkakas pesanan.',
    keywords: 'perkakas mesin tekuk, penekan, cetakan, penekan leher angsa, cetakan pelipatan rapat, cetakan tingkat, perkakas pesanan',
    intro: { title: 'Pendahuluan', text: ['Perkakas harus dipilih dari kondisi tekuk lengkap: jenis dan tebal material, radius dalam sasaran, ukuran sayap, urutan tekuk, tuntutan permukaan terlihat, kapasitas mesin, dan jumlah produksi.', 'Perkakas yang berhasil membuat satu sampel belum tentu cocok untuk produksi bila membebani bahu secara berlebihan, meninggalkan bekas, mengganggu sayap balik berikutnya, atau tidak stabil dalam penempatan berulang.'] },
    why: { title: 'Mengapa pemilihan perkakas penting', intro: 'Geometri perkakas adalah bagian dari kemampuan proses, bukan sekadar pembentuk sudut.', cards: [['Akurasi dan kestabilan', 'Radius penekan, bukaan V, dan pemusatan memengaruhi pengulangan sudut, radius dalam, dan kendali ukuran.'], ['Gangguan dan sayap minimum', 'Tinggi serta relief penekan dan bahu cetakan menentukan lewatnya sayap balik serta dukungan bagi sayap pendek.'], ['Umur perkakas dan beban', 'Bukaan sempit atau ujung yang keliru memusatkan beban dan mempercepat aus, pecah, atau kerusakan bahu.'], ['Permukaan dan konsistensi seri', 'Tekanan kontak menimbulkan bekas; pada produksi seri, kondisi perkakas, posisi, dan perlindungan sangat penting.']] },
    punch: { title: 'Pemilihan penekan', intro: 'Pilih penekan setelah memeriksa profil akhir dan seluruh urutan tekuk, bukan hanya sudut pertama.', cards: [['Penekan standar', 'Pilihan umum untuk profil terbuka dengan kekakuan baik; sayap balik pada kotak dapat bertabrakan dengan badan lurus.'], ['Penekan leher angsa', 'Memberi ruang di belakang ujung untuk sayap balik dan kotak dalam; profil berongga memerlukan pemeriksaan beban lebih ketat.'], ['Penekan sudut tajam', 'Digunakan untuk sudut kecil dan tekuk lebih guna mengompensasi pemulihan elastis; meningkatkan risiko retak dan bekas pada material keras.'], ['Penekan radius', 'Digunakan untuk radius dalam besar atau untuk mengurangi regangan permukaan; harus sesuai dengan bukaan dan perhitungan bentangan.'], ['Penekan ramping', 'Berguna pada ruang terbatas atau tekukan berdekatan; badan sempit dapat membatasi beban dan lebih peka terhadap lendutan.']] },
    die: { title: 'Pemilihan cetakan', intro: 'Cetakan harus mendukung sayap, menahan beban, dan menghasilkan radius tanpa tekanan permukaan berlebihan.', cards: [['Cetakan V tunggal', 'Bukaan khusus memberi pengaturan jelas dan stabil untuk seri; pastikan bukaan, beban izin, dan sayap minimum.'], ['Cetakan V majemuk', 'Memberi keluwesan untuk pekerjaan campuran; pilihan alur dan pemusatan harus tepat agar bukaan tidak salah.'], ['Cetakan radius', 'Memberi dukungan halus untuk radius besar atau permukaan sensitif dan mengurangi bekas setempat.'], ['Cetakan pelipatan rapat', 'Menutup tepi setelah pratekuk terkendali; celah, kesejajaran, dan tebal material menentukan konsistensi tepi.'], ['Cetakan tingkat', 'Membentuk dua tekukan berlawanan dalam satu langkah; tinggi tingkat, sumbu, dan posisi mengendalikan ukuran akhir.']] },
    special: [
      { id: 'gooseneck', title: 'Perkakas leher angsa', text: 'Pada kotak dalam dan sayap balik, gangguan sering muncul pada tekukan berikutnya ketika dinding yang sudah terbentuk memasuki ruang penekan lurus. Penekan leher angsa memberi relief di belakang ujung kerja. Periksa selubung lengkap komponen tertekuk, ruang pada posisi bawah, sambungan segmen, dan penurunan kapasitas beban akibat profil relief.' },
      { id: 'acute', title: 'Perkakas sudut tajam', text: 'Perkakas sudut tajam dipakai bila diperlukan sudut kecil atau tekuk lebih untuk mencapai sudut sasaran setelah pemulihan elastis; perkakas ini juga lazim pada pratekuk pelipatan rapat. Pada material kuat atau kurang ulet, radius sangat kecil meningkatkan risiko retak, sehingga batas material, arah pengerolan, gaya, dan uji tekuk harus dipastikan.' },
      { id: 'hemming', title: 'Perkakas pelipatan rapat', text: 'Tepi lipat yang stabil biasanya dibuat dalam dua langkah: pratekuk sudut tajam lalu penutupan. Cetakan penutup harus mengendalikan celah akhir tanpa menjepit material berlebih atau merusak muka terlihat. Pada lembaran berlapis, baja tahan karat, atau aluminium, pastikan lapisan pelindung, kebersihan bahu, dan posisi yang berulang.' },
      { id: 'offset', title: 'Perkakas tingkat', text: 'Perkakas tingkat menghasilkan bentuk Z dengan dua tekukan dalam satu geometri terkendali. Ukuran pergeseran harus sesuai tinggi langkah perkakas setelah memperhitungkan tebal dan pemulihan elastis. Pemusatan, kesejajaran penekan mesin, dan posisi lembaran penting agar kedua tekukan tidak berbeda panjang atau sudut.' },
    ],
    radius: { title: 'Radius perkakas dan ketebalan material', intro: 'Walaupun radius alami tekuk udara banyak dipengaruhi bukaan V, radius penekan tetap menentukan mutu pembentukan.', cards: [['Kecocokan radius', 'Gunakan ujung yang sesuai dengan radius dalam, tebal, dan metode; penekan saja tidak menjamin radius gambar.'], ['Radius terlalu kecil', 'Ujung tajam dan bukaan sempit memusatkan regangan, meningkatkan retak, kerusakan lapisan, dan penipisan.'], ['Radius terlalu besar', 'Radius besar membantu aliran material, tetapi dapat membesarkan radius hasil dan mengubah kendali sayap atau bentangan.']] },
    surface: { title: 'Perlindungan permukaan', intro: 'Pada baja tahan karat, aluminium, dan lembaran cermin, tampilan permukaan adalah persyaratan proses.', cards: [['Kondisi kontak', 'Jaga bahu bersih dan bebas serpihan; kotoran akan langsung tercetak pada permukaan terlihat.'], ['Lapisan pelindung', 'Film pelindung atau lembar pemisah poliuretana yang telah diuji dapat mengurangi bekas setelah ketebalan dan kelayakan pembentukan diperiksa.'], ['Perkakas minim bekas', 'Bahu beradius, sisipan tanpa bekas, atau perkakas pelindung dapat menurunkan tekanan, tetapi beban dan pengulangan tetap harus diuji.']] },
    mistakes: { title: 'Kesalahan umum pemilihan perkakas', items: [['Memilih hanya dari ketebalan', 'Radius, sayap, jenis material, dan permukaan juga menentukan perkakas.'], ['Mengabaikan gangguan sayap balik', 'Tekukan pertama yang berhasil tidak membuktikan ruang aman untuk langkah berikutnya.'], ['Mengabaikan sayap minimum', 'Dukungan yang kurang dapat menyebabkan selip, perubahan bentuk, atau sudut tidak stabil.'], ['Mengabaikan kekuatan material', 'Material kuat dan baja tahan karat dapat membutuhkan gaya lebih besar serta radius atau bukaan lebih longgar.'], ['Bukaan V terlalu kecil', 'Bukaan sempit menaikkan tonase, tekanan bahu, bekas, dan risiko beban berlebih.'], ['Tidak memeriksa tingkat beban', 'Beban izin penekan, cetakan, dan segmen diperiksa terpisah dari kapasitas mesin.'], ['Mengabaikan kestabilan seri', 'Produksi memerlukan umur perkakas, posisi berulang, dan mutu permukaan terkendali, bukan hanya keberhasilan benda pertama.']] },
    custom: { title: 'Pertimbangan perkakas pesanan', text: ['Perkakas standar tidak dapat melayani semua kondisi tekuk. Profil rumit, lipatan balik sempit, kotak dalam, tekukan tingkat, pembentukan radius besar, dan komponen berisiko gangguan dapat memerlukan penekan atau cetakan pesanan.', 'Ilustrasi yang ditampilkan merupakan referensi teknik yang mewakili bentuk umum. Geometri perkakas sebenarnya dapat berbeda menurut pembuat perkakas, penerapan tekuk, kapasitas tonase, rancangan radius, dan standar produksi. Untuk produk khusus, nilai material, urutan tekuk, risiko gangguan, dan kestabilan seri sebelum merancang perkakas pesanan.'] },
    faq: { title: 'Pertanyaan umum', items: [['Bagaimana memilih perkakas mesin tekuk?', 'Tentukan material, tebal, sudut, radius, sayap, dan urutan; kemudian periksa bukaan V, profil penekan, beban, kapasitas, serta permukaan.'], ['Kapan memakai perkakas leher angsa?', 'Saat sayap balik, dinding kotak, atau tekukan sebelumnya akan bertabrakan dengan penekan lurus pada operasi berikutnya.'], ['Apa penyebab gangguan perkakas?', 'Gangguan terjadi ketika komponen yang terbentuk bersentuhan dengan penekan, pemegang, cetakan, segmen, atau tenggorok mesin dalam urutan yang direncanakan.'], ['Bagaimana radius penekan memengaruhi radius dalam?', 'Pada tekuk udara, bukaan V dan material sangat memengaruhi radius alami; penekan menetapkan kondisi kontak minimum dan dominan bila dibuat besar.'], ['Kapan diperlukan perkakas pesanan?', 'Saat perkakas standar tidak memberi ruang, ukuran tingkat, radius besar, kendali permukaan, atau pembentukan berulang yang dibutuhkan.'], ['Bagaimana mengurangi bekas pada baja tahan karat atau aluminium?', 'Gunakan kontak bersih dan halus, film atau pelindung poliuretana yang telah diuji, perkakas minim bekas yang sesuai, dan uji tekuk sebelum produksi.']] },
    notes: { title: 'Catatan teknik', items: ['Pilih perkakas dengan mempertimbangkan bersama material, tebal, bukaan V, urutan tekuk, tinggi sayap balik, tonase mesin, dan tuntutan permukaan.', 'Untuk produksi seri panjang, pantau umur perkakas, kondisi segmen, kestabilan posisi berulang, dan perubahan ukuran selama proses.', 'Pada komponen khusus, nilai risiko gangguan dan kemampuan beban perkakas lebih awal sebelum pemrograman dan penjadwalan diselesaikan.'] },
    relatedTitle: 'Alat teknik terkait',
    relatedLabels: { pressBrakeCalculator: 'Kalkulator mesin tekuk', materialDatabase: 'Basis data material', vDieSelectionTool: 'Alat pemilihan cetakan V', insideRadiusGuide: 'Panduan radius dalam', springbackDatabase: 'Basis data pemulihan elastis', bendAllowanceCalculator: 'Kalkulator bentangan tekuk', airBendingGuide: 'Panduan tekuk udara', pressBrakeTonnageGuide: 'Panduan tonase mesin tekuk', vDieOpeningGuide: 'Pemilihan bukaan cetakan V', toolingSelectionGuide: 'Panduan pemilihan perkakas mesin tekuk', crowningGuide: 'Panduan kompensasi lendutan press brake' },
    diagrams: {
      eyebrow: 'Sistem diagram perkakas', title: 'Profil perkakas representatif', intro: 'Penampang sederhana menunjukkan fungsi keluarga perkakas umum serta ruang bebas atau ciri pembentukan yang perlu diperiksa.', reference: 'Referensi representatif',
      diagrams: [
        { type: 'standard', title: 'Penekan standar dan cetakan V', aria: 'Referensi penekan standar dan cetakan V', description: 'Penekan membentuk lembaran pada cetakan V.', tags: ['Penekan', 'Bukaan V', 'Dukungan sayap'], caption: 'Tekuk udara umum saat profil akhir bebas dari penekan lurus.' },
        { type: 'gooseneck', title: 'Penekan leher angsa', aria: 'Referensi ruang penekan leher angsa', description: 'Badan berelief melewati sayap balik.', tags: ['Relief', 'Sayap balik', 'Ruang bebas'], caption: 'Badan berelief memberi ruang bagi dinding kotak.' },
        { type: 'acute', title: 'Perkakas sudut tajam', aria: 'Referensi perkakas sudut tajam', description: 'Perkakas sudut tajam membentuk sudut kecil.', tags: ['Sudut tajam', 'Tekuk lebih', 'Pemulihan'], caption: 'Digunakan setelah pemeriksaan regangan dan gaya.' },
        { type: 'hemming', title: 'Perkakas pelipatan rapat', aria: 'Referensi penutupan lipatan rapat', description: 'Perkakas menutup tepi yang telah ditekuk.', tags: ['Pratekuk', 'Penutupan', 'Permukaan'], caption: 'Tahap penutupan mengendalikan celah dan bekas.' },
        { type: 'offset', title: 'Perkakas tingkat', aria: 'Referensi perkakas tingkat', description: 'Perkakas membentuk profil lembaran bertingkat.', tags: ['Bentuk Z', 'Tinggi tingkat', 'Garis pusat'], caption: 'Langkah atas dan bawah mengendalikan dua tekukan.' },
        { type: 'radius', title: 'Perkakas radius', aria: 'Referensi perkakas radius besar', description: 'Penekan radius membentuk radius dalam lebar.', tags: ['Penekan radius', 'Radius besar', 'Aliran material'], caption: 'Kontak lebar mengurangi pemusatan regangan.' },
      ],
    },
  },
}

function CardGrid({
  items,
  columns = 'three',
}) {
  return (
    <div className={`zyco-tooling-guide__cards zyco-tooling-guide__cards--${columns}`}>
      {items.map(([title, text]) => (
        <article
          className='zyco-tooling-guide__card'
          key={title}
        >
          <h3>{title}</h3>
          <p className='zyco-tooling-guide__copy'>{text}</p>
        </article>
      ))}
    </div>
  )
}

function TextPanel({
  id,
  section,
}) {
  return (
    <section
      className='zyco-tooling-guide__panel'
      aria-labelledby={id}
    >
      <h2
        className='zyco-tooling-guide__section-title'
        id={id}
      >
        {section.title}
      </h2>
      {section.text.map((paragraph) => (
        <p
          className='zyco-tooling-guide__copy zyco-tooling-guide__copy--spaced'
          key={paragraph}
        >
          {paragraph}
        </p>
      ))}
    </section>
  )
}

function CardPanel({
  id,
  section,
  columns,
}) {
  return (
    <section
      className='zyco-tooling-guide__panel'
      aria-labelledby={id}
    >
      <h2
        className='zyco-tooling-guide__section-title'
        id={id}
      >
        {section.title}
      </h2>
      {section.intro && <p className='zyco-tooling-guide__copy'>{section.intro}</p>}
      <CardGrid
        columns={columns}
        items={section.cards || section.items}
      />
    </section>
  )
}

export default function PressBrakeToolingSelectionGuide({
  language = 'en',
  setLanguage = () => {},
}) {
  const page = content[language] || content.en

  useEffect(() => {
    setPageSEO({
      title: `${page.title} | ${page.hubName}`,
      description: page.seoDescription,
      keywords: page.keywords,
      canonicalPath: routePath,
    })

    setStructuredData({
      id: 'press-brake-tooling-selection-guide-jsonld',
      data: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage',
            name: page.title,
            description: page.seoDescription,
            url: getSiteUrl(routePath),
            isPartOf: {
              '@type': 'WebSite',
              name: page.hubName,
              url: getSiteUrl('/engineering-tools'),
            },
          },
          {
            '@type': 'TechArticle',
            headline: page.title,
            description: page.seoDescription,
            author: { '@type': 'Organization', name: 'ZYCO' },
            publisher: {
              '@type': 'Organization',
              name: 'ZYCO',
              url: getSiteUrl('/'),
            },
            mainEntityOfPage: getSiteUrl(routePath),
          },
          {
            '@type': 'FAQPage',
            mainEntity: page.faq.items.map(([question, answer]) => ({
              '@type': 'Question',
              name: question,
              acceptedAnswer: { '@type': 'Answer', text: answer },
            })),
          },
        ],
      },
    })
  }, [page])

  return (
    <>
      <style>
        {`
          .zyco-tooling-guide {
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
          .zyco-tooling-guide::before {
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
          .zyco-tooling-guide__shell {
            width: min(1180px, 100%);
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }
          .zyco-tooling-guide__hero {
            padding: 38px 36px;
            margin-bottom: 22px;
            border: 1px solid rgba(191, 219, 254, 0.2);
            border-radius: 30px;
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.06));
            backdrop-filter: blur(16px);
            box-shadow: 0 28px 68px rgba(2, 8, 23, 0.2);
          }
          .zyco-tooling-guide__back {
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
            box-shadow: 0 10px 28px rgba(15, 23, 42, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.12);
            backdrop-filter: blur(16px);
            transition: transform 0.22s ease, border-color 0.22s ease, color 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          }
          .zyco-tooling-guide__back:hover,
          .zyco-tooling-guide__tool:hover {
            transform: translateY(-2px);
            border-color: rgba(191, 219, 254, 0.72);
            color: #ffffff;
          }
          .zyco-tooling-guide__back:focus-visible,
          .zyco-tooling-guide__tool:focus-visible {
            outline: 3px solid rgba(147, 197, 253, 0.46);
            outline-offset: 3px;
          }
          .zyco-tooling-guide__eyebrow {
            margin: 0;
            color: #7dd3fc;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 0.2em;
            text-transform: uppercase;
          }
          .zyco-tooling-guide__title {
            max-width: 920px;
            margin: 14px 0 18px;
            font-size: clamp(34px, 5vw, 54px);
            line-height: 1.08;
            letter-spacing: -0.05em;
          }
          .zyco-tooling-guide__subtitle {
            max-width: 850px;
            margin: 0;
            color: #dbeafe;
            font-size: 18px;
            line-height: 1.72;
          }
          .zyco-tooling-guide__panel {
            padding: 28px;
            margin-top: 18px;
            border: 1px solid rgba(191, 219, 254, 0.16);
            border-radius: 25px;
            background: rgba(10, 30, 61, 0.48);
            backdrop-filter: blur(12px);
          }
          .zyco-tooling-guide__section-title {
            margin: 0 0 14px;
            color: #ffffff;
            font-size: 25px;
            letter-spacing: -0.035em;
          }
          .zyco-tooling-guide__copy {
            margin: 0;
            color: #cbd5e1;
            font-size: 15px;
            line-height: 1.72;
          }
          .zyco-tooling-guide__copy--spaced + .zyco-tooling-guide__copy--spaced {
            margin-top: 12px;
          }
          .zyco-tooling-guide__cards {
            display: grid;
            gap: 12px;
            margin-top: 18px;
          }
          .zyco-tooling-guide__cards--two {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .zyco-tooling-guide__cards--three {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
          .zyco-tooling-guide__card {
            padding: 18px 20px;
            border: 1px solid rgba(191, 219, 254, 0.12);
            border-radius: 18px;
            background: rgba(30, 64, 112, 0.3);
            transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
          }
          .zyco-tooling-guide__card:hover {
            transform: translateY(-2px);
            border-color: rgba(191, 219, 254, 0.25);
            box-shadow: 0 12px 24px rgba(30, 64, 175, 0.12);
          }
          .zyco-tooling-guide__card h3 {
            margin: 0 0 8px;
            color: #eff6ff;
            font-size: 16px;
            line-height: 1.42;
          }
          .zyco-tooling-guide__special-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px;
          }
          .zyco-tooling-guide__custom {
            border-color: rgba(125, 211, 252, 0.25);
            background: linear-gradient(135deg, rgba(30, 64, 112, 0.44), rgba(10, 30, 61, 0.5));
          }
          .zyco-tooling-guide__tools {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
          }
          .zyco-tooling-guide__tool {
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
          .zyco-tooling-guide__tool:hover {
            box-shadow: 0 18px 38px rgba(37, 99, 235, 0.42);
          }
          @media (max-width: 900px) {
            .zyco-tooling-guide__cards--three {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }
          @media (max-width: 760px) {
            .zyco-tooling-guide {
              padding: 22px 14px;
            }
            .zyco-tooling-guide__hero,
            .zyco-tooling-guide__panel {
              padding: 22px;
              border-radius: 22px;
            }
            .zyco-tooling-guide__subtitle {
              font-size: 16px;
            }
            .zyco-tooling-guide__cards--two,
            .zyco-tooling-guide__cards--three,
            .zyco-tooling-guide__special-grid {
              grid-template-columns: 1fr;
            }
          }
          @media (max-width: 640px) {
            .zyco-tooling-guide__back,
            .zyco-tooling-guide__tool {
              width: 100%;
            }
          }
        `}
      </style>

      <main className='zyco-tooling-guide'>
        <div className='zyco-tooling-guide__shell'>
          <header className='zyco-tooling-guide__hero'>
            <a
              className='zyco-tooling-guide__back'
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
            <p className='zyco-tooling-guide__eyebrow'>{page.eyebrow}</p>
            <h1 className='zyco-tooling-guide__title'>{page.title}</h1>
            <p className='zyco-tooling-guide__subtitle'>{page.subtitle}</p>
          </header>

          <TextPanel id='tooling-guide-intro' section={page.intro} />
          <CardPanel id='tooling-guide-why' section={page.why} columns='two' />
          <ToolingSelectionDiagramSystem labels={page.diagrams} />
          <CardPanel id='tooling-guide-punch' section={page.punch} columns='three' />
          <CardPanel id='tooling-guide-die' section={page.die} columns='three' />

          <div className='zyco-tooling-guide__special-grid'>
            {page.special.map((section) => (
              <TextPanel
                id={`tooling-guide-${section.id}`}
                key={section.id}
                section={{ ...section, text: [section.text] }}
              />
            ))}
          </div>

          <CardPanel id='tooling-guide-radius' section={page.radius} columns='three' />
          <CardPanel id='tooling-guide-surface' section={page.surface} columns='three' />
          <CardPanel id='tooling-guide-mistakes' section={page.mistakes} columns='two' />

          <section
            className='zyco-tooling-guide__panel zyco-tooling-guide__custom'
            aria-labelledby='tooling-guide-custom'
          >
            <h2
              className='zyco-tooling-guide__section-title'
              id='tooling-guide-custom'
            >
              {page.custom.title}
            </h2>
            {page.custom.text.map((paragraph) => (
              <p
                className='zyco-tooling-guide__copy zyco-tooling-guide__copy--spaced'
                key={paragraph}
              >
                {paragraph}
              </p>
            ))}
          </section>

          <CardPanel id='tooling-guide-faq' section={page.faq} columns='two' />

          <section
            className='zyco-tooling-guide__panel'
            aria-labelledby='tooling-guide-notes'
          >
            <h2
              className='zyco-tooling-guide__section-title'
              id='tooling-guide-notes'
            >
              {page.notes.title}
            </h2>
            <div className='zyco-tooling-guide__cards zyco-tooling-guide__cards--three'>
              {page.notes.items.map((note) => (
                <article
                  className='zyco-tooling-guide__card'
                  key={note}
                >
                  <p className='zyco-tooling-guide__copy'>{note}</p>
                </article>
              ))}
            </div>
          </section>

          <section
            className='zyco-tooling-guide__panel'
            aria-labelledby='tooling-guide-related'
          >
            <h2
              className='zyco-tooling-guide__section-title'
              id='tooling-guide-related'
            >
              {page.relatedTitle}
            </h2>
            <nav
              className='zyco-tooling-guide__tools'
              aria-label={page.relatedTitle}
            >
              {relatedTools.map(([key, href]) => (
                <a
                  className='zyco-tooling-guide__tool'
                  href={href}
                  key={key}
                >
                  {page.relatedLabels[key]}
                </a>
              ))}
            </nav>
          </section>
        </div>
      </main>
    </>
  )
}
