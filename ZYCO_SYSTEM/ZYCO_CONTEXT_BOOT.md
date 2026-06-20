# ZYCO CONTEXT BOOT SYSTEM V5.3

## 1. PURPOSE
This file restores Codex working memory when context is lost.

It acts as the "system reboot file" for engineering continuity.

---

## 2. CORE PROJECT IDENTITY

Project Name: ZYCO Press Brake Calculator
System Type: Engineering Calculation + SEO + Industrial Tools Platform
Deployment: Vercel (Production)
Repository: GitHub (zycomachine-prog/zyco-calculator)

---

## 3. CURRENT VALID ENGINEERING VERSION

V5.3 ENGINEERING STANDARD

---

## 4. MATERIAL FACTORS (LOCKED)

- Mild Steel = 1.0
- Galvanized Steel = 1.05
- Stainless 304 = 1.62
- Stainless 201 = 1.76
- Aluminum = 0.65
- Brass = 0.60

---

## 5. SYSTEM RULE PRIORITY

If conflict exists:

1. ZYCO_ENGINEERING_SYSTEM.md (highest priority)
2. ZYCO_CHANGE_CONTROL.md
3. Source code
4. External assumptions (ignore)

---

## 6. CODEx RECOVERY INSTRUCTION

If Codex loses memory:

→ Load this file first
→ Then load Engineering System
→ Then load Change Control System

---

## 7. DEPLOYMENT TRUTH RULE

- Git main = production truth
- Vercel = live production
- Local = development only

Any mismatch = system inconsistency

---

END OF CONTEXT BOOT SYSTEM