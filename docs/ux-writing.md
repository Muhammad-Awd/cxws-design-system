# UX writing: tone and examples

Copy conventions below are drawn only from the customer portal source. Labels are **OBSERVED** code examples; writing patterns are **DERIVED** only when repeated. Any new recommendation is **PROPOSED**. English and Arabic strings live together through `t(english, arabic)` calls in the portal; paths are relative to `cxws-user-web-portal/`.

## Observed examples by purpose

| Purpose | English source example | Arabic source example | Status / source |
| --- | --- | --- | --- |
| Navigation label | “Search” | “بحث” | OBSERVED: `src/components/layout/AppLayouts.tsx` |
| Account action | “Sign out” | “خروج” | OBSERVED: `src/components/layout/AppLayouts.tsx` |
| Validation | “Enter a valid email address (for example, client@example.com).” | “أدخل عنوان بريد إلكتروني صالحاً (مثال: client@example.com).” | OBSERVED: `src/pages/auth/AuthPages.tsx` |
| Error | “Unable to send verification request right now. Your email was preserved; retry when ready.” | “تعذر إرسال طلب التحقق حالياً. تم الاحتفاظ ببريدك الإلكتروني للمحاولة مجدداً.” | OBSERVED: `src/pages/auth/AuthPages.tsx` |
| Empty | “No invoices issued yet.” | “لا توجد فواتير صادرة بعد.” | OBSERVED: `src/pages/dashboard/DashboardPage.tsx` |
| Success | “Recovery request sent” | “تم إرسال طلب الاستعادة” | OBSERVED: `src/pages/auth/AuthPages.tsx` |
| Loading announcement | “Loading workspace content” | UNKNOWN | OBSERVED English label only: `src/components/ui/Primitives.tsx` (`PageLoadingSkeleton`) |
| Copy confirmation | “Copied” | “تم النسخ” | OBSERVED: `src/components/ui/Primitives.tsx` (`CopyPillButton`) |
| Internal prototype narration | “Email service active. Customer continues alone.” | UNKNOWN | OBSERVED literal, but identified as internal narration rather than usable customer copy — `src/pages/email/EmailPurchaseConnectPages.tsx` |

## Rules

- **OBSERVED** Navigation/action labels use short phrases such as “Search”, “Billing”, and “Sign out”. Source: `src/components/layout/AppLayouts.tsx`.
- **OBSERVED** Validation text names the expected value and gives a concrete example. Source: `src/pages/auth/AuthPages.tsx`.
- **OBSERVED** The verification failure explains what happened, confirms that the email remains available, and gives a retry action. Source: `src/pages/auth/AuthPages.tsx`.
- **OBSERVED** Empty messages state what is absent in context (“No invoices issued yet.”). Source: `src/pages/dashboard/DashboardPage.tsx`.
- **OBSERVED** Success confirmations are short and describe the completed action (“Recovery request sent”). Source: `src/pages/auth/AuthPages.tsx`.
- **DERIVED** Keep operational messages direct and specific to the current task; the cited examples avoid jokes and unexplained technical wording. This inference comes from those strings only, not a source-written voice guide.
- **PROPOSED** Prefer an explicit action verb for button labels and keep one action per button. The portal contains examples, but it does not state this as a rule.
- **PROPOSED** For new loading/error/empty/success copy, keep the same language as the active interface and explain next steps only when the user can take one. The portal does not specify a full voice standard.
- **PROPOSED (task-directed)** Remove AI-sounding filler, internal narration, and implementation notes from customer-facing text. Say what happened in plain language and show the next available action. This is a requested cleanup rule, not an existing brand policy.
- **PROPOSED (task-directed)** Keep interface details minimal until requested; put secondary explanation behind “See more” and keep screens to at most two prominent task actions. This pairs with the progressive-disclosure guidance in `design-principles.md`.
- **PROPOSED (task-directed)** Prefer concrete labels such as “Connect email” or “View invoice” over abstract or promotional copy. Do not claim a service is ready, secure, or successful unless the current state supports that statement.

## Arabic and English conventions

- **OBSERVED** Supported interface languages are English (`en`) and Arabic (`ar`); translations are supplied as paired arguments to `t(en, ar)`. Source: `src/types/portal.ts`, `src/i18n/I18nContext.tsx`.
- **OBSERVED** Arabic mode sets document `lang="ar"` and `dir="rtl"`; English sets `lang="en"` and `dir="ltr"`. Source: `src/i18n/I18nContext.tsx`.
- **OBSERVED** Mixed-direction emails, identifiers, and amounts use `<bdi dir="ltr">` in several interfaces. Source: `src/components/layout/AppLayouts.tsx`, `src/components/ui/Primitives.tsx`, and page components.
- **UNKNOWN** Formal Arabic punctuation, transliteration, dialect, numerals, and capitalization rules beyond the literal strings present in source.
