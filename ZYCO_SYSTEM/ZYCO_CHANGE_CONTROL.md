# ZYCO CHANGE CONTROL SYSTEM V5.3

## 1. PURPOSE
This system controls all code changes in the ZYCO engineering project.

Any modification must follow structured validation rules before being applied.

---

## 2. CHANGE CLASSIFICATION

All changes must be classified into:

### LEVEL 1 - SAFE CHANGE
- UI text update
- Styling adjustment
- Non-calculation visual changes

### LEVEL 2 - ENGINEERING CHANGE
- Material factor modification
- Formula modification
- Calculation logic change

### LEVEL 3 - SYSTEM CHANGE
- Routing changes
- Engineering Hub structure changes
- Deployment configuration changes

---

## 3. MANDATORY CHECK BEFORE ANY CHANGE

Before modifying code, answer:

- Does it affect calculation accuracy?
- Does it affect material factors?
- Does it affect Engineering Hub structure?
- Does it affect SEO structure?

If YES → treat as LEVEL 2 or LEVEL 3 change.

---

## 4. SAFE DEPLOYMENT RULE

No change can be pushed to production unless:

- Git main branch updated
- Local tested successfully
- Vercel preview confirmed
- No broken routes in Engineering Tools

---

## 5. ANTI-BREAK RULE

Never allow:

- Partial updates to calculation logic
- Mixed old/new material factors
- Unsynchronized UI vs formula
- Untracked version changes

---

END OF CHANGE CONTROL SYSTEM