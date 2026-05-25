const wrapLabel = (label, maxLength) => {
  if (label.length <= maxLength || !label.includes(' ')) {
    return [label]
  }

  return label.split(' ').reduce((lines, word) => {
    const last = lines[lines.length - 1]

    if (!last || `${last} ${word}`.length > maxLength) {
      lines.push(word)
    } else {
      lines[lines.length - 1] = `${last} ${word}`
    }

    return lines
  }, [])
}

const DiagramLabel = ({
  label,
  x,
  y,
  fill,
  fontSize = 12,
  fontWeight = '700',
  textAnchor = 'start',
  maxLength = 19,
  lineHeight = 15,
}) => (
  <text x={x} y={y} fill={fill} fontSize={fontSize} fontWeight={fontWeight} textAnchor={textAnchor}>
    {wrapLabel(label, maxLength).map((line, index) => (
      <tspan x={x} dy={index === 0 ? 0 : lineHeight} key={line}>{line}</tspan>
    ))}
  </text>
)

export default function KFactorNeutralAxisDiagram({ labels }) {
  return (
    <section className='zyco-kdiagram' aria-labelledby='kdiagram-title'>
      <style>{`
        .zyco-kdiagram { position:relative; margin-top:18px; padding:24px; overflow:hidden; border:1px solid rgba(180,220,255,.14); border-radius:26px; background:radial-gradient(circle at 70% 20%,rgba(56,189,248,.16),transparent 30%),linear-gradient(135deg,rgba(26,64,112,.72),rgba(8,28,56,.84)); box-shadow:0 18px 48px rgba(2,8,23,.2),inset 0 1px 0 rgba(255,255,255,.14); }
        .zyco-kdiagram::before { content:""; position:absolute; inset:1px; border-radius:25px; background-image:linear-gradient(rgba(148,197,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(148,197,255,.04) 1px,transparent 1px); background-size:28px 28px; mask-image:radial-gradient(circle at 48% 44%,#000,transparent 78%); pointer-events:none; }
        .zyco-kdiagram__header,.zyco-kdiagram__stage { position:relative; z-index:1; }
        .zyco-kdiagram__eyebrow { margin:0 0 7px; color:#93c5fd; font-size:12px; font-weight:850; letter-spacing:2px; text-transform:uppercase; }
        .zyco-kdiagram__title { margin:0 0 18px; color:#fff; font-size:21px; line-height:1.35; font-weight:850; }
        .zyco-kdiagram__stage { border:1px solid rgba(191,219,254,.2); border-radius:22px; background:linear-gradient(180deg,rgba(38,84,143,.34),rgba(18,49,93,.32)); overflow:hidden; }
        .zyco-kdiagram__svg { display:block; width:100%; height:auto; }
        .zyco-kdiagram__neutral { stroke-dasharray:9 7; }
        @media (max-width:760px) { .zyco-kdiagram { padding:18px; border-radius:22px; } .zyco-kdiagram__title { font-size:18px; } }
      `}</style>
      <header className='zyco-kdiagram__header'>
        <p className='zyco-kdiagram__eyebrow'>{labels.eyebrow}</p>
        <h2 className='zyco-kdiagram__title' id='kdiagram-title'>{labels.title}</h2>
      </header>
      <div className='zyco-kdiagram__stage'>
        <svg className='zyco-kdiagram__svg' viewBox='0 0 1120 650' role='img' aria-labelledby='kdiagram-svg-title kdiagram-svg-desc'>
          <title id='kdiagram-svg-title'>{labels.svgTitle}</title>
          <desc id='kdiagram-svg-desc'>{labels.svgDescription}</desc>
          <defs>
            <linearGradient id='kSheet' x1='0' y1='0' x2='1' y2='1'>
              <stop stopColor='#dbeafe'/>
              <stop offset='.46' stopColor='#fff'/>
              <stop offset='1' stopColor='#60a5fa'/>
            </linearGradient>
            <linearGradient id='kBa' x1='0' y1='0' x2='1' y2='0'>
              <stop stopColor='#0ea5e9'/>
              <stop offset='1' stopColor='#67e8f9'/>
            </linearGradient>
            <filter id='kGlow'><feGaussianBlur stdDeviation='4' result='blur'/><feMerge><feMergeNode in='blur'/><feMergeNode in='SourceGraphic'/></feMerge></filter>
            <marker id='kArrow' markerWidth='8' markerHeight='8' refX='7' refY='4' orient='auto-start-reverse'>
              <path d='M8 0 L0 4 L8 8' fill='none' stroke='#93c5fd' strokeWidth='1.4'/>
            </marker>
            <marker id='kCyanArrow' markerWidth='8' markerHeight='8' refX='7' refY='4' orient='auto-start-reverse'>
              <path d='M8 0 L0 4 L8 8' fill='none' stroke='#38bdf8' strokeWidth='1.4'/>
            </marker>
          </defs>

          <g transform='translate(36 30)'>
            <rect x='0' y='0' width='620' height='580' rx='22' fill='rgba(10,30,61,.42)' stroke='rgba(191,219,254,.16)'/>
            <text x='310' y='40' fill='#bae6fd' textAnchor='middle' fontSize='18' fontWeight='800'>{labels.bentSection}</text>

            <path d='M156 462 V242 A92 92 0 0 1 248 150 H507 V192 H248 A50 50 0 0 0 198 242 V462 Z' fill='url(#kSheet)' stroke='#e0f2fe' strokeWidth='1.4'/>
            <path className='zyco-kdiagram__neutral' d='M178 462 V242 A70 70 0 0 1 248 172 H507' fill='none' stroke='#0ea5e9' strokeWidth='3' filter='url(#kGlow)'/>
            <path d='M198 242 A50 50 0 0 1 248 192' fill='none' stroke='#38bdf8' strokeWidth='3.2'/>

            {/* T spans the full sheet thickness and is labeled above clear space. */}
            <path d='M292 150 V192' fill='none' stroke='#93c5fd' markerStart='url(#kArrow)' markerEnd='url(#kArrow)'/>
            <path d='M282 150 H302 M282 192 H302 M292 143 V122' stroke='#93c5fd' fill='none'/>
            <DiagramLabel label={`T - ${labels.thickness}`} x='292' y='106' fill='#dbeafe' fontSize='13' fontWeight='750' textAnchor='middle' maxLength={22}/>

            {/* t measures only from the inside surface to the dashed neutral axis. */}
            <path d='M352 192 V172' fill='none' stroke='#38bdf8' markerStart='url(#kCyanArrow)' markerEnd='url(#kCyanArrow)'/>
            <path d='M344 192 H362 M344 172 H362 M352 200 V211' stroke='#38bdf8' fill='none'/>
            <DiagramLabel label={`t - ${labels.offset}`} x='352' y='228' fill='#7dd3fc' fontSize='12' fontWeight='750' textAnchor='middle' maxLength={22}/>

            {/* Each leader terminates on its own engineering feature. */}
            <path d='M404 192 L425 250 H440' fill='none' stroke='#93c5fd' markerStart='url(#kArrow)'/>
            <DiagramLabel label={labels.insideSurface} x='448' y='254' fill='#dbeafe' maxLength={17}/>

            <path d='M214 214 L278 302 H440' fill='none' stroke='#38bdf8' markerStart='url(#kCyanArrow)'/>
            <DiagramLabel label={`R - ${labels.insideRadius}`} x='448' y='306' fill='#7dd3fc' maxLength={18}/>

            <path d='M178 356 H286 L352 356 H440' fill='none' stroke='#38bdf8' markerStart='url(#kCyanArrow)'/>
            <DiagramLabel label={labels.neutralAxis} x='448' y='360' fill='#7dd3fc' maxLength={17}/>

            <rect x='52' y='500' width='516' height='50' rx='14' fill='rgba(37,99,235,.18)' stroke='rgba(125,211,252,.26)'/>
            <text x='310' y='531' textAnchor='middle' fill='#eff6ff' fontSize='20' fontWeight='850'>K = t / T</text>
          </g>

          <g transform='translate(690 30)'>
            <rect x='0' y='0' width='394' height='580' rx='22' fill='rgba(10,30,61,.42)' stroke='rgba(191,219,254,.16)'/>
            <text x='197' y='40' fill='#bae6fd' textAnchor='middle' fontSize='18' fontWeight='800'>{labels.flatPattern}</text>

            <rect x='43' y='112' width='308' height='54' rx='8' fill='url(#kSheet)' stroke='#e0f2fe'/>
            <rect x='150' y='112' width='94' height='54' rx='4' fill='url(#kBa)' filter='url(#kGlow)'/>
            <path className='zyco-kdiagram__neutral' d='M43 139 H351' stroke='#0ea5e9' strokeWidth='2.2'/>
            <path d='M150 184 H244' stroke='#38bdf8' markerStart='url(#kCyanArrow)' markerEnd='url(#kCyanArrow)'/>
            <text x='197' y='209' fill='#7dd3fc' textAnchor='middle' fontSize='14' fontWeight='800'>{labels.baArc}</text>
            <text x='197' y='257' fill='#eff6ff' textAnchor='middle' fontSize='17' fontWeight='850'>BA = A × π / 180</text>
            <text x='197' y='283' fill='#eff6ff' textAnchor='middle' fontSize='17' fontWeight='850'>× (R + K × T)</text>

            <rect x='34' y='342' width='326' height='156' rx='18' fill='rgba(37,99,235,.14)' stroke='rgba(125,211,252,.2)'/>
            <text x='197' y='375' fill='#93c5fd' textAnchor='middle' fontSize='13' fontWeight='800'>{labels.relationship}</text>
            <text x='197' y='415' fill='#fff' textAnchor='middle' fontSize='18' fontWeight='850'>K → BA → BD</text>
            <text x='197' y='449' fill='#fff' textAnchor='middle' fontSize='18' fontWeight='850'>{labels.flatLength}</text>
            <DiagramLabel label={labels.verify} x='197' y='477' fill='#bfdbfe' textAnchor='middle' fontSize='12' fontWeight='650' maxLength={27}/>
          </g>
        </svg>
      </div>
    </section>
  )
}
