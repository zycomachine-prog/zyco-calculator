export default function MinimumFlangeDiagram({ labels }) {
  return (
    <section className='zyco-flange-diagram' aria-labelledby='flange-diagram-title'>
      <style>
        {`
          .zyco-flange-diagram { position:relative; width:100%; box-sizing:border-box; margin-top:18px; padding:24px; overflow:hidden; border:1px solid rgba(180,220,255,.12); border-radius:26px; background:radial-gradient(circle at 75% 33%,rgba(56,189,248,.16),transparent 31%),radial-gradient(circle at 24% 34%,rgba(248,113,113,.1),transparent 30%),linear-gradient(135deg,rgba(26,64,112,.72),rgba(8,28,56,.82)); box-shadow:0 18px 48px rgba(2,8,23,.18),inset 0 1px 0 rgba(255,255,255,.16); }
          .zyco-flange-diagram::before { content:""; position:absolute; inset:1px; border-radius:25px; background-image:linear-gradient(rgba(148,197,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(148,197,255,.04) 1px,transparent 1px); background-size:28px 28px; mask-image:radial-gradient(circle at 50% 45%,#000,transparent 77%); pointer-events:none; }
          .zyco-flange-diagram__header,.zyco-flange-diagram__stage { position:relative; z-index:1; }
          .zyco-flange-diagram__header { margin-bottom:18px; }
          .zyco-flange-diagram__eyebrow { margin:0 0 7px; color:#93c5fd; font-size:12px; font-weight:850; letter-spacing:2px; text-transform:uppercase; }
          .zyco-flange-diagram__title { margin:0; color:#fff; font-size:21px; line-height:1.3; font-weight:850; }
          .zyco-flange-diagram__stage { border:1px solid rgba(191,219,254,.2); border-radius:22px; background:linear-gradient(180deg,rgba(38,84,143,.38),rgba(18,49,93,.34)); overflow:hidden; }
          .zyco-flange-diagram__svg { display:block; width:100%; height:auto; }
          .zyco-flange-diagram__risk-sheet { transform-origin:350px 176px; transform:rotate(-5deg); animation:flange-sheet-instability 9.2s cubic-bezier(.42,0,.35,1) infinite; }
          .zyco-flange-diagram__risk-glow { animation:flange-warning-track 8.8s ease-in-out infinite; }
          .zyco-flange-diagram__stable { animation:flange-stable 3.8s ease-in-out infinite; }
          @keyframes flange-sheet-instability {
            0%,20%,100% { transform:rotate(0deg); }
            48% { transform:rotate(-2.1deg); }
            70%,82% { transform:rotate(-5deg); }
          }
          @keyframes flange-warning-track {
            0%,18%,100% { opacity:.5; }
            46% { opacity:.72; }
            68%,80% { opacity:1; }
          }
          @keyframes flange-stable { 0%,100% { opacity:.65; } 50% { opacity:1; } }
          @media (prefers-reduced-motion:reduce) { .zyco-flange-diagram__risk-sheet,.zyco-flange-diagram__risk-glow,.zyco-flange-diagram__stable { animation:none; } }
          @media (max-width:760px) { .zyco-flange-diagram { padding:18px; border-radius:22px; } .zyco-flange-diagram__title { font-size:18px; } }
        `}
      </style>
      <header className='zyco-flange-diagram__header'>
        <p className='zyco-flange-diagram__eyebrow'>{labels.eyebrow}</p>
        <h2 className='zyco-flange-diagram__title' id='flange-diagram-title'>{labels.title}</h2>
      </header>
      <div className='zyco-flange-diagram__stage'>
        <svg className='zyco-flange-diagram__svg' viewBox='0 0 1120 860' role='img' aria-labelledby='flange-svg-title flange-svg-desc'>
          <title id='flange-svg-title'>{labels.svgTitle}</title>
          <desc id='flange-svg-desc'>{labels.svgDescription}</desc>
          <defs>
            <linearGradient id='flangeDie' x1='0' y1='0' x2='0' y2='1'><stop stopColor='#2563eb'/><stop offset='100%' stopColor='#071a3d'/></linearGradient>
            <linearGradient id='flangePunch' x1='0' y1='0' x2='0' y2='1'><stop stopColor='#7dd3fc'/><stop offset='.55' stopColor='#2563eb'/><stop offset='1' stopColor='#102e68'/></linearGradient>
            <linearGradient id='flangeSheet' x1='0' y1='0' x2='1' y2='0'><stop stopColor='#94a3b8'/><stop offset='.5' stopColor='#fff'/><stop offset='1' stopColor='#93c5fd'/></linearGradient>
            <filter id='flangeBlueGlow'><feGaussianBlur stdDeviation='6' result='b'/><feMerge><feMergeNode in='b'/><feMergeNode in='SourceGraphic'/></feMerge></filter>
            <filter id='flangeRedGlow'><feGaussianBlur stdDeviation='6' result='b'/><feMerge><feMergeNode in='b'/><feMergeNode in='SourceGraphic'/></feMerge></filter>
            <marker id='flangeArrow' markerWidth='8' markerHeight='8' refX='7' refY='4' orient='auto'><path d='M0 0 L8 4 L0 8' fill='none' stroke='#93c5fd' strokeWidth='1.5'/></marker>
            <marker id='flangeWarnArrow' markerWidth='8' markerHeight='8' refX='7' refY='4' orient='auto'><path d='M0 0 L8 4 L0 8' fill='none' stroke='#fca5a5' strokeWidth='1.5'/></marker>
          </defs>
          <line x1='560' y1='32' x2='560' y2='510' stroke='#60a5fa' strokeOpacity='.22' strokeDasharray='8 14'/>
          <g transform='translate(32 20)'>
            <text x='246' y='38' textAnchor='middle' fill='#fecaca' fontSize='17' fontWeight='800'>{labels.instability}</text>
            <rect x='28' y='57' width='438' height='404' rx='18' fill='rgba(127,29,29,.08)' stroke='rgba(248,113,113,.22)'/>
            <path d='M58 302 V178 H140 L246 286 L352 178 H434 V302 Z' fill='url(#flangeDie)'/>
            <path d='M58 178 H140 L246 286 L352 178 H434' fill='none' stroke='#fca5a5' strokeWidth='3'/>
            <path d='M229 98 L246 136 L263 98 Z' fill='url(#flangePunch)'/>
            <path className='zyco-flange-diagram__risk-sheet' d='M166 176 L350 176' fill='none' stroke='#f8fafc' strokeWidth='13' strokeLinecap='round' strokeLinejoin='round' opacity='1'/>
            <circle className='zyco-flange-diagram__risk-glow' cx='150' cy='188' r='8' fill='#f87171' filter='url(#flangeRedGlow)'/>
            <path d='M158 159 H102 V120' fill='none' stroke='#fca5a5' markerEnd='url(#flangeWarnArrow)'/>
            <text x='54' y='105' fill='#fecaca' fontSize='13' fontWeight='720'>{labels.insufficient}</text>
            <path d='M151 188 L126 218 H64' fill='none' stroke='#fca5a5' markerStart='url(#flangeWarnArrow)'/>
            <text x='54' y='239' fill='#fecaca' fontSize='13' fontWeight='720'>{labels.slips}</text>
            <text x='246' y='362' textAnchor='middle' fill='#fca5a5' fontSize='14' fontWeight='780'>{labels.shortRisk}</text>
            <text x='246' y='392' textAnchor='middle' fill='#fecaca' fontSize='13'>{labels.unstable}</text>
          </g>
          <g transform='translate(592 20)'>
            <text x='246' y='38' textAnchor='middle' fill='#bae6fd' fontSize='17' fontWeight='800'>{labels.supportTitle}</text>
            <rect x='28' y='57' width='438' height='404' rx='18' fill='rgba(14,116,144,.08)' stroke='rgba(125,211,252,.25)'/>
            <path d='M58 302 V178 H182 L246 250 L310 178 H434 V302 Z' fill='url(#flangeDie)'/>
            <path d='M58 178 H182 L246 250 L310 178 H434' fill='none' stroke='#7dd3fc' strokeWidth='3'/>
            <path d='M229 98 L246 136 L263 98 Z' fill='url(#flangePunch)'/>
            <path d='M78 164 H204 Q229 164 246 184 Q263 164 288 164 H414' fill='none' stroke='url(#flangeSheet)' strokeWidth='12' strokeLinecap='round'/>
            <g className='zyco-flange-diagram__stable' filter='url(#flangeBlueGlow)'>
              <circle cx='182' cy='171' r='6' fill='#38bdf8'/><circle cx='310' cy='171' r='6' fill='#38bdf8'/>
            </g>
            <path d='M182 158 H88 V119' fill='none' stroke='#93c5fd' markerEnd='url(#flangeArrow)'/>
            <text x='54' y='104' fill='#bae6fd' fontSize='13' fontWeight='720'>{labels.proper}</text>
            <path d='M310 158 H411 V121' fill='none' stroke='#93c5fd' markerEnd='url(#flangeArrow)'/>
            <text x='298' y='105' fill='#bae6fd' fontSize='13' fontWeight='720'>{labels.shoulder}</text>
            <text x='246' y='362' textAnchor='middle' fill='#7dd3fc' fontSize='14' fontWeight='780'>{labels.correct}</text>
            <text x='246' y='392' textAnchor='middle' fill='#bae6fd' fontSize='13'>{labels.stable}</text>
          </g>
          <g transform='translate(50 528)'>
            <rect width='1020' height='284' rx='20' fill='rgba(10,30,61,.55)' stroke='rgba(191,219,254,.17)'/>
            <text x='28' y='38' fill='#7dd3fc' fontSize='12' fontWeight='800' letterSpacing='1.8'>{labels.geometry}</text>
            <path d='M368 232 V112 H468 L548 208 L628 112 H728 V232 Z' fill='url(#flangeDie)'/>
            <path d='M368 112 H468 L548 208 L628 112 H728' fill='none' stroke='#7dd3fc' strokeWidth='3'/>
            <path d='M531 38 H565 L587 84 L548 124 L509 84 Z' fill='url(#flangePunch)'/>
            <path d='M300 98 H486 Q526 98 548 124 Q570 98 610 98 H796' fill='none' stroke='url(#flangeSheet)' strokeWidth='11' strokeLinecap='round'/>
            <path d='M468 246 H628 M468 238 V254 M628 238 V254' stroke='#93c5fd' strokeWidth='1.5' markerEnd='url(#flangeArrow)'/>
            <text x='548' y='272' textAnchor='middle' fill='#dbeafe' fontSize='13' fontWeight='700'>{labels.vOpening}</text>
            <path d='M301 76 H486 M301 69 V83 M486 69 V83' stroke='#93c5fd' strokeWidth='1.5' markerEnd='url(#flangeArrow)'/>
            <text x='393' y='61' textAnchor='middle' fill='#dbeafe' fontSize='13' fontWeight='700'>{labels.flangeLength}</text>
            <path d='M456 105 L414 148 H302' fill='none' stroke='#93c5fd' strokeWidth='1.5' markerStart='url(#flangeArrow)'/>
            <text x='194' y='152' fill='#dbeafe' fontSize='13'>{labels.shoulder}</text>
            <path d='M532 121 L644 62 H738' fill='none' stroke='#93c5fd' strokeWidth='1.5' markerStart='url(#flangeArrow)'/>
            <text x='746' y='66' fill='#dbeafe' fontSize='13'>{labels.insideRadius}</text>
            <path d='M548 43 V22 H604' fill='none' stroke='#93c5fd' strokeWidth='1.5' markerStart='url(#flangeArrow)'/>
            <text x='612' y='26' fill='#dbeafe' fontSize='13'>{labels.punch}</text>
            <path d='M756 98 H830 V118' fill='none' stroke='#93c5fd' strokeWidth='1.5' markerStart='url(#flangeArrow)'/>
            <text x='838' y='122' fill='#dbeafe' fontSize='13'>{labels.sheet}</text>
            <path d='M680 202 H794 V214' fill='none' stroke='#93c5fd' strokeWidth='1.5' markerStart='url(#flangeArrow)'/>
            <text x='802' y='218' fill='#dbeafe' fontSize='13'>{labels.vDie}</text>
          </g>
        </svg>
      </div>
    </section>
  )
}
