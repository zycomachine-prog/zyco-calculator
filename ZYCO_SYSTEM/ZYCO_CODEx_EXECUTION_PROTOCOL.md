# ZYCO CODEX EXECUTION PROTOCOL V5.3

## 1. PURPOSE
This file defines how Codex must receive instructions and execute changes.

It is the ONLY allowed execution method for all engineering operations.

---

## 2. EXECUTION RULE

Codex MUST follow this strict sequence:

---

### STEP 1 - LOAD SYSTEM (MANDATORY)

Before doing ANY task, Codex must read:

- ZYCO_ENGINEERING_SYSTEM.md
- ZYCO_CHANGE_CONTROL.md
- ZYCO_CONTEXT_BOOT.md

If any file is missing or not loaded → STOP execution.

---

### STEP 2 - CLASSIFY TASK

Codex must classify every task into ONE category:

- UI Change (visual / layout only)
- Engineering Calculation Change (formula / material / logic)
- System Architecture Change (routes / structure / deployment)

If unclear → treat as ENGINEERING CHANGE.

---

### STEP 3 - IMPACT ANALYSIS (MANDATORY)

Codex MUST check impact on:

- Material factors
- Calculation formulas
- SEO structure
- Engineering Hub routing
- Vercel deployment
- Cross-language consistency

If ANY impact exists → must escalate to FULL SYSTEM CHECK.

---

### STEP 4 - APPLY CHANGE

Only proceed if:

- No conflict with system rules
- No broken dependency
- No partial update risk

Otherwise STOP and request clarification.

---

### STEP 5 - FINAL CONSISTENCY CHECK (MANDATORY)

Before finishing, Codex must verify:

- No version mismatch introduced
- No duplicate logic created
- No old logic left behind
- No unintended file modifications
- UI matches calculation logic

---

### STEP 6 - POST-CHANGE REPORT (NEW - CRITICAL)

After EVERY change, Codex MUST output:

✔ Changed files:
✔ What was modified:
✔ Why it was changed:
✔ Impact level (Low / Medium / High)
✔ Risk assessment:
✔ Confirmation: No unintended side effects

If this report is missing → CHANGE IS INVALID.

---

## 3. FORBIDDEN BEHAVIOR

Codex MUST NEVER:

- Skip system loading step
- Modify material factors without SYSTEM check
- Change calculation logic without impact analysis
- Leave partial or inconsistent updates
- Modify multiple logic sources without synchronization

---

## 4. GOLDEN RULE

> No change is valid unless ALL steps (1–6) are completed and POST-CHANGE REPORT is provided.

---

## 5. SYSTEM PRIORITY ORDER

If conflict exists:

1. ZYCO_ENGINEERING_SYSTEM.md (HIGHEST PRIORITY)
2. ZYCO_CHANGE_CONTROL.md
3. ZYCO_CONTEXT_BOOT.md
4. This execution protocol
5. Source code (LOWEST PRIORITY)

---

END OF ZYCO CODEX EXECUTION PROTOCOL V5.3