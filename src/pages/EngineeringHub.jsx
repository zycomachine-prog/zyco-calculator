const tools = [
  {
    title: 'Press Brake Calculator',
    description:
      'Professional bending force calculation system',
    status: 'active',
    href: '/',
  },
  {
    title: 'Material Database',
    description:
      'Yield strength, tensile strength, K-factor and bending properties',
    status: 'active',
    href: '/engineering-tools/material-database',
  },
  {
    title: 'Springback Database',
    description:
      'Industrial springback reference system',
    status: 'active',
    href: '/engineering-tools/springback-database',
  },
  {
    title: 'V Die Selection',
    description:
      'Recommended V opening and tooling selection',
    status: 'active',
    href: '/engineering-tools/v-die-selection',
  },
  {
    title: 'Inside Radius Guide',
    description:
      'Inside bend radius and minimum radius reference',
    status: 'active',
    href: '/engineering-tools/inside-radius-guide',
  },
  {
    title: 'Tooling Guide',
    description:
      'Punch and die application guide',
    status: 'soon',
  },
]

export default function EngineeringHub() {
  return (
    <>
      <style>
        {`
          .zyco-hub {
            min-height: 100vh;
            box-sizing: border-box;
            padding: 52px 22px;
            background:
              radial-gradient(circle at 18% 12%, rgba(96, 165, 250, 0.34), transparent 30%),
              radial-gradient(circle at 82% 22%, rgba(14, 165, 233, 0.22), transparent 28%),
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

          .zyco-hub::before {
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

          .zyco-hub::after {
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

          .zyco-hub__shell {
            width: min(1180px, 100%);
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }

          .zyco-hub__header {
            margin-bottom: 34px;
            padding: 34px;
            border: 1px solid rgba(147, 197, 253, 0.2);
            border-radius: 28px;
            background:
              linear-gradient(145deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.05));
            box-shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
            backdrop-filter: blur(18px);
          }

          .zyco-hub__eyebrow {
            margin: 0 0 14px;
            color: #93c5fd;
            font-size: 13px;
            font-weight: 800;
            letter-spacing: 2.4px;
            text-transform: uppercase;
          }

          .zyco-hub__title {
            margin: 0;
            color: #ffffff;
            font-size: 46px;
            line-height: 1.08;
            font-weight: 900;
            letter-spacing: 0;
            text-shadow: 0 0 28px rgba(96, 165, 250, 0.35);
          }

          .zyco-hub__subtitle {
            max-width: 680px;
            margin: 16px 0 0;
            color: #bfdbfe;
            font-size: 18px;
            line-height: 1.7;
            font-weight: 600;
          }

          .zyco-hub__grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 18px;
          }

          .zyco-tool-card {
            min-height: 236px;
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

          .zyco-tool-card::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, #38bdf8, #2563eb, transparent);
            opacity: 0.75;
          }

          .zyco-tool-card:hover {
            transform: translateY(-7px);
            border-color: rgba(147, 197, 253, 0.36);
            box-shadow: 0 22px 48px rgba(37, 99, 235, 0.26);
            background:
              radial-gradient(circle at top left, rgba(96, 165, 250, 0.3), transparent 45%),
              linear-gradient(145deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.07));
          }

          .zyco-tool-card__index {
            width: 44px;
            height: 44px;
            display: grid;
            place-items: center;
            margin-bottom: 22px;
            border-radius: 16px;
            background:
              linear-gradient(145deg, rgba(59, 130, 246, 0.86), rgba(14, 165, 233, 0.72));
            color: #ffffff;
            font-size: 15px;
            font-weight: 900;
            box-shadow: 0 12px 28px rgba(37, 99, 235, 0.28);
          }

          .zyco-tool-card__title {
            margin: 0;
            color: #ffffff;
            font-size: 21px;
            line-height: 1.28;
            font-weight: 850;
            letter-spacing: 0;
            overflow-wrap: anywhere;
          }

          .zyco-tool-card__description {
            margin: 12px 0 26px;
            color: #cbd5e1;
            font-size: 15px;
            line-height: 1.65;
            font-weight: 600;
            overflow-wrap: anywhere;
          }

          .zyco-tool-card__action {
            min-height: 46px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            align-self: flex-start;
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

          .zyco-tool-card__action:hover {
            transform: translateY(-2px);
            box-shadow: 0 18px 38px rgba(37, 99, 235, 0.42);
          }

          .zyco-tool-card__badge {
            min-height: 36px;
            display: inline-flex;
            align-items: center;
            align-self: flex-start;
            box-sizing: border-box;
            padding: 0 14px;
            border: 1px solid rgba(191, 219, 254, 0.22);
            border-radius: 999px;
            background: rgba(15, 23, 42, 0.32);
            color: #bfdbfe;
            font-size: 12px;
            font-weight: 900;
            letter-spacing: 1.2px;
            text-transform: uppercase;
          }

          @media (max-width: 980px) {
            .zyco-hub__grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .zyco-hub__title {
              font-size: 38px;
            }
          }

          @media (max-width: 640px) {
            .zyco-hub {
              padding: 28px 14px;
            }

            .zyco-hub__header {
              padding: 24px;
              border-radius: 24px;
            }

            .zyco-hub__title {
              font-size: 32px;
            }

            .zyco-hub__subtitle {
              font-size: 16px;
            }

            .zyco-hub__grid {
              grid-template-columns: 1fr;
              gap: 14px;
            }

            .zyco-tool-card {
              min-height: 214px;
              padding: 22px;
            }
          }
        `}
      </style>

      <main className='zyco-hub'>
        <section className='zyco-hub__shell'>
          <header className='zyco-hub__header'>
            <p className='zyco-hub__eyebrow'>
              Engineering Tools Hub
            </p>

            <h1 className='zyco-hub__title'>
              ZYCO Engineering Tools
            </h1>

            <p className='zyco-hub__subtitle'>
              Professional Engineering Tools for Sheet Metal Bending
            </p>
          </header>

          <div className='zyco-hub__grid'>
            {tools.map((tool, index) => (
              <article
                className='zyco-tool-card'
                key={tool.title}
              >
                <div>
                  <div className='zyco-tool-card__index'>
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <h2 className='zyco-tool-card__title'>
                    {tool.title}
                  </h2>

                  <p className='zyco-tool-card__description'>
                    {tool.description}
                  </p>
                </div>

                {tool.status === 'active' ? (
                  <a
                    className='zyco-tool-card__action'
                    href={tool.href}
                  >
                    Open Tool →
                  </a>
                ) : (
                  <span className='zyco-tool-card__badge'>
                    Coming Soon
                  </span>
                )}
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
