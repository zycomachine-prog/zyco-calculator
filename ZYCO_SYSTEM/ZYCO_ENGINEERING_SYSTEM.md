# ZYCO ENGINEERING SYSTEM V5.3

## 1. SYSTEM PRINCIPLE
This project is a unified engineering calculation system.
All calculations, UI, SEO, and deployment must follow a single version standard.

---

## 2. SINGLE SOURCE OF TRUTH

The following rules are mandatory:

- Material factors must ONLY be defined in one place
- Calculation formula must ONLY exist in one implementation
- UI must reflect calculation logic exactly
- SEO content must match engineering logic

---

## 3. CURRENT VALID ENGINEERING DATA (V5.3)

### Material Factors (LOCKED)

- Mild Steel = 1.0
- Galvanized Steel = 1.05
- Stainless 304 = 1.62
- Stainless 201 = 1.76
- Aluminum = 0.65
- Brass = 0.60

---

## 4. SYSTEM INTEGRITY RULE

Any change MUST ensure:

- No duplicate logic exists
- No outdated parameters remain
- No partial updates allowed
- All related modules must be updated together

---

## 5. FAILURE PREVENTION RULE

If any update affects:
- Material
- Formula
- Tooling logic
- UI calculation output

Then system must be treated as FULL SYSTEM UPDATE (not partial patch)

---

## 6. VERSION CONTROL RULE

All production deployments must align with:

- Git main branch = production source
- Vercel deploy = mirror of main branch
- Local environment = development only

---

END OF SYSTEM