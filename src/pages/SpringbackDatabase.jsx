import { useEffect } from 'react'

const materials = [
  {
    name: 'Mild Steel',
    materialKey: 'mildSteel',
    range: '0.6°–1.3°',
    reference: '2 mm thickness / 90° air bending / V ≈ 8T',
    sensitivity: 'Low',
    factors: 'V-opening, thickness, tooling condition',
    note: 'Standard reference material with relatively stable springback behavior.',
  },
  {
    name: 'Galvanized Steel',
    materialKey: 'galvanizedSteel',
    range: '0.8°–1.6°',
    reference: '2 mm thickness / 90° air bending / V ≈ 8T',
    sensitivity: 'Low to Medium',
    factors: 'Coating condition, V-opening, material batch',
    note: 'Similar to mild steel, but coating and surface condition may affect forming quality.',
  },
  {
    name: 'Stainless Steel 201',
    materialKey: 'stainless201',
    range: '2.2°–3.8°',
    reference: '2 mm thickness / 90° air bending / V ≈ 8T',
    sensitivity: 'Very High',
    factors: 'Work hardening, tensile strength, V-opening, inside radius',
    note: 'Higher work hardening and springback than 304 stainless steel.',
  },
  {
    name: 'Stainless Steel 304',
    materialKey: 'stainless304',
    range: '1.8°–3.0°',
    reference: '2 mm thickness / 90° air bending / V ≈ 8T',
    sensitivity: 'High',
    factors: 'Work hardening, V-opening, inside radius, grain direction',
    note: 'Common stainless steel with significant springback and good corrosion resistance.',
  },
  {
    name: 'Aluminum',
    materialKey: 'aluminum',
    range: '1.2°–2.8°',
    reference: '2 mm thickness / 90° air bending / V ≈ 8T',
    sensitivity: 'Medium to High',
    factors:
      'Lower elastic modulus, alloy grade, temper condition, grain direction',
    note: 'Requires careful angle compensation despite lower bending force.',
  },
  {
    name: 'Brass',
    materialKey: 'brass',
    range: '0.4°–1.2°',
    reference: '2 mm thickness / 90° air bending / V ≈ 8T',
    sensitivity: 'Low',
    factors: 'Hardness condition, grain direction, V-opening',
    note: 'Good formability when hardness and bending direction are properly considered.',
  },
]

const springbackFactors = [
  'material strength',
  'thickness',
  'V-opening',
  'inside radius',
  'tooling condition',
  'bending method',
  'machine setup',
]

const faqItems = [
  {
    question: 'What is springback in press brake bending?',
    answer:
      'Springback is the elastic recovery of the material after bending. It causes the final angle to open slightly after the bending force is released.',
  },
  {
    question: 'Why does stainless steel have more springback?',
    answer:
      'Stainless steel usually has higher tensile strength and stronger work hardening behavior, so it tends to spring back more than mild steel.',
  },
  {
    question: 'Does a larger V-opening increase springback?',
    answer:
      'In air bending, a larger V-opening usually produces a larger inside radius and can increase springback tendency.',
  },
  {
    question: 'How can springback be reduced?',
    answer:
      'Springback can be reduced by using proper tooling, selecting a suitable V-opening, applying angle compensation and performing trial bending.',
  },
]

const relatedTools = [
  {
    title: 'Press Brake Calculator',
    href: '/engineering-tools/press-brake-calculator',
  },
  {
    title: 'Material Database',
    href: '/engineering-tools/material-database',
  },
  {
    title: 'V Die Selection Tool',
    href: '/engineering-tools/v-die-selection',
  },
  {
    title: 'Inside Radius Guide',
    href: '/engineering-tools/inside-radius-guide',
  },
  {
    title: 'Springback Database',
    href: '/engineering-tools/springback-database',
  },
  {
    title: 'Bend Allowance Calculator',
    href: '/engineering-tools/bend-allowance-calculator',
  },
]

const fields = [
  ['Typical Springback Range', 'range'],
  ['Reference Condition', 'reference'],
  ['Springback Sensitivity', 'sensitivity'],
  ['Main Influencing Factors', 'factors'],
]

export default function SpringbackDatabase() {
  useEffect(() => {
    document.title =
      'Springback Database | Press Brake Air Bending Reference | ZYCO'

    const description =
      'Typical press brake air bending springback reference by material, sheet thickness and V-opening, with engineering notes for steel, stainless steel, aluminum and brass.'

    let metaDescription = document.querySelector('meta[name="description"]')

    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }

    metaDescription.setAttribute('content', description)
  }, [])

  return (
    <>
      <style>
        {`
          .zyco-springback {
            min-height: 100vh;
            box-sizing: border-box;
            padding: 52px 22px;
            background:
              radial-gradient(circle at 16% 12%, rgba(96, 165, 250, 0.34), transparent 30%),
              radial-gradient(circle at 84% 20%, rgba(14, 165, 233, 0.22), transparent 28%),
              linear-gradient(145deg, #071224 0%, #0b1f3f 42%, #12366e 74%, #1d4ed8 100%);
            color: #ffffff;
            font-family:
              Inter,
              ui-sans-serif,
              system-ui,
              -apple-system,
              BlinkMacSystemFont,
              "Segoe UI",
              sans-serif;
            overflow: hidden;
            position: relative;
          }

          .zyco-springback::before {
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

          .zyco-springback::after {
            content: "";
            position: absolute;
            left: -10%;
            right: -10%;
            top: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(147, 197, 253, 0.9), transparent);
            box-shadow: 0 0 34px rgba(96, 165, 250, 0.55);
            pointer-events: none;
          }

          .zyco-springback__shell {
            width: min(1180px, 100%);
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }

          .zyco-springback__header,
          .zyco-springback__panel {
            border: 1px solid rgba(147, 197, 253, 0.2);
            border-radius: 28px;
            background:
              linear-gradient(145deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.05));
            box-shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
            backdrop-filter: blur(18px);
          }

          .zyco-springback__header {
            margin-bottom: 22px;
            padding: 34px;
          }

          .zyco-springback__eyebrow {
            margin: 0 0 14px;
            color: #93c5fd;
            font-size: 13px;
            font-weight: 800;
            letter-spacing: 2.4px;
            text-transform: uppercase;
          }

          .zyco-springback__title {
            margin: 0;
            color: #ffffff;
            font-size: 46px;
            line-height: 1.08;
            font-weight: 900;
            letter-spacing: 0;
            text-shadow: 0 0 28px rgba(96, 165, 250, 0.35);
          }

          .zyco-springback__subtitle {
            max-width: 760px;
            margin: 16px 0 0;
            color: #bfdbfe;
            font-size: 18px;
            line-height: 1.7;
            font-weight: 600;
          }

          .zyco-springback__panel {
            margin-bottom: 22px;
            padding: 24px;
          }

          .zyco-springback__panel-title {
            margin: 0 0 12px;
            color: #ffffff;
            font-size: 22px;
            line-height: 1.28;
            font-weight: 850;
            letter-spacing: 0;
          }

          .zyco-springback__panel-text {
            max-width: 960px;
            margin: 0;
            color: #dbeafe;
            font-size: 15px;
            line-height: 1.75;
            font-weight: 650;
          }

          .zyco-springback__factor-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin: 18px 0 0;
            padding: 0;
            list-style: none;
          }

          .zyco-springback__factor {
            padding: 9px 12px;
            border: 1px solid rgba(147, 197, 253, 0.22);
            border-radius: 999px;
            background: rgba(15, 23, 42, 0.28);
            color: #bfdbfe;
            font-size: 13px;
            line-height: 1.3;
            font-weight: 800;
          }

          .zyco-springback__grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 18px;
            margin-bottom: 22px;
          }

          .zyco-springback-card {
            min-height: 470px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 24px;
            border: 1px solid rgba(255, 255, 255, 0.14);
            border-radius: 24px;
            background:
              radial-gradient(circle at top left, rgba(96, 165, 250, 0.2), transparent 42%),
              linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.05));
            box-shadow: 0 12px 34px rgba(0, 0, 0, 0.22);
            backdrop-filter: blur(16px);
            transform: translateY(0);
            transition:
              transform 0.25s ease,
              border-color 0.25s ease,
              box-shadow 0.25s ease,
              background 0.25s ease;
            position: relative;
            overflow: hidden;
          }

          .zyco-springback-card::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, #38bdf8, #2563eb, transparent);
            opacity: 0.75;
          }

          .zyco-springback-card:hover {
            transform: translateY(-7px);
            border-color: rgba(147, 197, 253, 0.36);
            box-shadow: 0 22px 48px rgba(37, 99, 235, 0.26);
            background:
              radial-gradient(circle at top left, rgba(96, 165, 250, 0.3), transparent 45%),
              linear-gradient(145deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.07));
          }

          .zyco-springback-card__title {
            margin: 0 0 18px;
            color: #ffffff;
            font-size: 21px;
            line-height: 1.28;
            font-weight: 850;
            letter-spacing: 0;
          }

          .zyco-springback-card__specs {
            display: grid;
            gap: 10px;
            margin: 0 0 20px;
          }

          .zyco-springback-card__spec {
            margin: 0;
            padding: 12px 14px;
            border: 1px solid rgba(147, 197, 253, 0.16);
            border-radius: 16px;
            background: rgba(15, 23, 42, 0.2);
          }

          .zyco-springback-card__label {
            margin: 0 0 5px;
            color: #93c5fd;
            font-size: 11px;
            line-height: 1.35;
            font-weight: 900;
            letter-spacing: 0.7px;
            text-transform: uppercase;
          }

          .zyco-springback-card__value {
            margin: 0;
            color: #dbeafe;
            font-size: 14px;
            line-height: 1.55;
            font-weight: 750;
          }

          .zyco-springback-card__note-label {
            margin: 0 0 8px;
            color: #93c5fd;
            font-size: 12px;
            font-weight: 900;
            letter-spacing: 0.7px;
            text-transform: uppercase;
          }

          .zyco-springback-card__note {
            margin: 0 0 22px;
            color: #cbd5e1;
            font-size: 14px;
            line-height: 1.65;
            font-weight: 600;
          }

          .zyco-springback-card__action,
          .zyco-springback-tool-link {
            min-height: 46px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            padding: 0 18px;
            border-radius: 16px;
            background:
              linear-gradient(135deg, #1e3a8a 0%, #2563eb 48%, #60a5fa 100%);
            color: #ffffff;
            font-size: 15px;
            font-weight: 800;
            text-decoration: none;
            box-shadow: 0 12px 30px rgba(37, 99, 235, 0.34);
            transition:
              transform 0.25s ease,
              box-shadow 0.25s ease;
          }

          .zyco-springback-card__action:hover,
          .zyco-springback-tool-link:hover {
            transform: translateY(-2px);
            box-shadow: 0 18px 38px rgba(37, 99, 235, 0.42);
          }

          .zyco-springback__notes {
            display: grid;
            gap: 8px;
            margin: 0;
            padding: 0;
            list-style: none;
          }

          .zyco-springback__note {
            margin: 0;
            color: #dbeafe;
            font-size: 14px;
            line-height: 1.7;
            font-weight: 650;
          }

          .zyco-springback__faq {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }

          .zyco-springback__faq-item {
            padding: 18px;
            border: 1px solid rgba(147, 197, 253, 0.18);
            border-radius: 20px;
            background: rgba(15, 23, 42, 0.22);
          }

          .zyco-springback__question {
            margin: 0 0 8px;
            color: #ffffff;
            font-size: 15px;
            line-height: 1.45;
            font-weight: 850;
          }

          .zyco-springback__answer {
            margin: 0;
            color: #cbd5e1;
            font-size: 14px;
            line-height: 1.65;
            font-weight: 600;
          }

          .zyco-springback__tools {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
          }

          @media (max-width: 980px) {
            .zyco-springback__grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .zyco-springback__title {
              font-size: 38px;
            }
          }

          @media (max-width: 720px) {
            .zyco-springback__faq {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 640px) {
            .zyco-springback {
              padding: 28px 14px;
            }

            .zyco-springback__header,
            .zyco-springback__panel {
              padding: 22px;
              border-radius: 24px;
            }

            .zyco-springback__title {
              font-size: 32px;
            }

            .zyco-springback__subtitle {
              font-size: 16px;
            }

            .zyco-springback__grid {
              grid-template-columns: 1fr;
              gap: 14px;
            }

            .zyco-springback-card {
              min-height: 0;
              padding: 22px;
            }

            .zyco-springback-tool-link {
              width: 100%;
            }
          }
        `}
      </style>

      <main className='zyco-springback'>
        <section className='zyco-springback__shell'>
          <header className='zyco-springback__header'>
            <p className='zyco-springback__eyebrow'>
              Engineering Reference
            </p>

            <h1 className='zyco-springback__title'>
              Springback Database
            </h1>

            <p className='zyco-springback__subtitle'>
              Typical air bending springback reference by material, thickness and V-opening
            </p>
          </header>

          <section
            className='zyco-springback__panel'
            aria-labelledby='springback-engineering-overview'
          >
            <h2
              className='zyco-springback__panel-title'
              id='springback-engineering-overview'
            >
              Press Brake Springback Engineering Overview
            </h2>

            <p className='zyco-springback__panel-text'>
              Springback is not a fixed value. In air bending, the final angle
              after unloading changes with the elastic recovery of the sheet
              and with practical press brake setup conditions. The values below
              are intended as engineering reference ranges for comparing
              materials and preparing trial bending compensation.
            </p>

            <ul className='zyco-springback__factor-list'>
              {springbackFactors.map((factor) => (
                <li
                  className='zyco-springback__factor'
                  key={factor}
                >
                  {factor}
                </li>
              ))}
            </ul>
          </section>

          <div className='zyco-springback__grid'>
            {materials.map((material) => (
              <article
                className='zyco-springback-card'
                key={material.name}
              >
                <div>
                  <h2 className='zyco-springback-card__title'>
                    {material.name}
                  </h2>

                  <dl className='zyco-springback-card__specs'>
                    {fields.map(([label, key]) => (
                      <div
                        className='zyco-springback-card__spec'
                        key={label}
                      >
                        <dt className='zyco-springback-card__label'>
                          {label}
                        </dt>

                        <dd className='zyco-springback-card__value'>
                          {material[key]}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <p className='zyco-springback-card__note-label'>
                    Engineering Note
                  </p>

                  <p className='zyco-springback-card__note'>
                    {material.note}
                  </p>
                </div>

                <a
                  className='zyco-springback-card__action'
                  href={`/engineering-tools/press-brake-calculator?material=${material.materialKey}`}
                >
                  Calculate Bending Force →
                </a>
              </article>
            ))}
          </div>

          <section
            className='zyco-springback__panel'
            aria-labelledby='springback-reference-notes'
          >
            <h2
              className='zyco-springback__panel-title'
              id='springback-reference-notes'
            >
              Engineering Reference Notes
            </h2>

            <ul className='zyco-springback__notes'>
              <li className='zyco-springback__note'>
                Springback values are typical reference ranges based on 2 mm
                sheet thickness, 90° air bending and V-opening around 8×
                material thickness.
              </li>

              <li className='zyco-springback__note'>
                Actual springback may vary depending on material batch,
                thickness, V-die opening, punch radius, inside radius, grain
                direction, tooling condition and machine setup.
              </li>

              <li className='zyco-springback__note'>
                For thickness-, V-die- and length-based estimation, use the
                Press Brake Calculator.
              </li>
            </ul>
          </section>

          <section
            className='zyco-springback__panel'
            aria-labelledby='springback-faq'
          >
            <h2
              className='zyco-springback__panel-title'
              id='springback-faq'
            >
              Springback FAQ
            </h2>

            <div className='zyco-springback__faq'>
              {faqItems.map((item) => (
                <article
                  className='zyco-springback__faq-item'
                  key={item.question}
                >
                  <h3 className='zyco-springback__question'>
                    {item.question}
                  </h3>

                  <p className='zyco-springback__answer'>
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section
            className='zyco-springback__panel'
            aria-labelledby='springback-related-tools'
          >
            <h2
              className='zyco-springback__panel-title'
              id='springback-related-tools'
            >
              Related Engineering Tools
            </h2>

            <nav
              className='zyco-springback__tools'
              aria-label='Related engineering tools'
            >
              {relatedTools.map((tool) => (
                <a
                  className='zyco-springback-tool-link'
                  href={tool.href}
                  key={tool.title}
                >
                  {tool.title}
                </a>
              ))}
            </nav>
          </section>
        </section>
      </main>
    </>
  )
}
