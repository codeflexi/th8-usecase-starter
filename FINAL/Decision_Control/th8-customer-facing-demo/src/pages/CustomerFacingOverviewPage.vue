<!-- src/pages/CustomerFacingOverviewPage.vue
     Single-page “showcase” view: all customer-facing menus + what each menu contains
     Tailwind-only, no external deps, demo-ready (role switch + interactive nav)
-->
<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 font-prompt">
    <!-- Top bar -->
    <header class="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div class="flex items-center gap-3 min-w-0">
          <div class="h-9 w-9 rounded-xl bg-slate-900 flex items-center justify-center">
            <span class="text-white text-xs font-bold tracking-wide">TH8</span>
          </div>
          <div class="min-w-0">
            <p class="text-[11px] uppercase tracking-wide text-red-600 font-semibold">
              TH8.AI · Enterprise Decision Center
            </p>
            <p class="text-sm font-semibold text-slate-900 truncate">
              Customer-Facing Product Overview (Demo-Ready)
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <!-- Role switch -->
          <div class="hidden md:flex items-center gap-2">
            <span class="text-xs text-slate-600">Viewing as</span>
            <select
              v-model="activePersona"
              class="px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
            >
              <option v-for="p in personas" :key="p.key" :value="p.key">
                {{ p.label }}
              </option>
            </select>
          </div>

          <button
            class="px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold hover:bg-slate-50"
            @click="expandAll = !expandAll"
          >
            {{ expandAll ? "Collapse all" : "Expand all" }}
          </button>

          <button
            class="px-3 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800"
            @click="runDemoMode"
          >
            Demo mode
          </button>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 py-6 grid grid-cols-12 gap-6">
      <!-- Sidebar (customer-facing menus) -->
      <aside class="col-span-12 lg:col-span-3 space-y-4">
        <!-- Quick pitch card -->
        <div class="bg-white border border-slate-200 rounded-2xl p-4">
          <p class="text-xs uppercase tracking-wide text-slate-500 font-semibold">
            What you’re selling
          </p>
          <p class="mt-2 text-sm font-semibold text-slate-900">
            A decision system executives can defend.
          </p>
          <p class="mt-1 text-sm text-slate-600">
            Policy-controlled decisions, evidence-linked rationale, and audit-ready traceability — across roles.
          </p>

          <div class="mt-4 grid grid-cols-2 gap-3">
            <div class="rounded-xl bg-slate-50 border border-slate-200 p-3">
              <p class="text-[11px] uppercase tracking-wide text-slate-500 font-semibold">Focus</p>
              <p class="mt-1 text-sm font-semibold text-slate-900">Decision + Trust</p>
            </div>
            <div class="rounded-xl bg-slate-50 border border-slate-200 p-3">
              <p class="text-[11px] uppercase tracking-wide text-slate-500 font-semibold">Proof</p>
              <p class="mt-1 text-sm font-semibold text-slate-900">Evidence + Audit</p>
            </div>
          </div>
        </div>

        <!-- Nav -->
        <nav class="bg-white border border-slate-200 rounded-2xl p-2">
          <div class="px-2 py-2 flex items-center justify-between">
            <p class="text-xs uppercase tracking-wide text-slate-500 font-semibold">
              Customer menus
            </p>
            <span class="text-[11px] px-2 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 font-semibold">
              6 modules
            </span>
          </div>

          <div class="space-y-1 p-1">
            <button
              v-for="m in menus"
              :key="m.key"
              class="w-full text-left rounded-xl px-3 py-3 border transition"
              :class="menuBtnClass(m.key)"
              @click="selectMenu(m.key)"
            >
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <p class="text-sm font-semibold truncate" :class="selectedMenu === m.key ? 'text-slate-900' : 'text-slate-800'">
                    {{ m.label }}
                  </p>
                  <p class="text-xs mt-1" :class="selectedMenu === m.key ? 'text-slate-600' : 'text-slate-500'">
                    {{ m.tagline }}
                  </p>
                </div>

                <span
                  class="shrink-0 inline-flex items-center px-2 py-1 rounded-full text-[11px] font-semibold"
                  :class="m.pillClass"
                >
                  {{ m.primaryPersona }}
                </span>
              </div>
            </button>
          </div>
        </nav>

        <!-- Commercial packaging -->
        <div class="bg-white border border-slate-200 rounded-2xl p-4">
          <p class="text-xs uppercase tracking-wide text-slate-500 font-semibold">How TH8 sells</p>

          <div class="mt-3 space-y-3">
            <div class="rounded-xl border border-slate-200 bg-white p-3">
              <p class="text-sm font-semibold text-slate-900">Deliverables (what customer gets)</p>
              <ul class="mt-2 text-sm text-slate-700 space-y-1">
                <li>• Decision Center UI (role-based)</li>
                <li>• Policy Console (versioning + publish)</li>
                <li>• Evidence links (documents & clauses)</li>
                <li>• Audit exports (log + traceability)</li>
              </ul>
            </div>

            <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p class="text-sm font-semibold text-slate-900">Service wrapper (enterprise-ready)</p>
              <ul class="mt-2 text-sm text-slate-700 space-y-1">
                <li>• Discovery workshop (policy + risk)</li>
                <li>• Integration onboarding (ERP/docs)</li>
                <li>• Governance setup (roles, approvals)</li>
                <li>• Go-live playbook + KPI tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main content -->
      <main class="col-span-12 lg:col-span-9 space-y-6">
        <!-- Hero: Executive promise -->
        <section class="relative overflow-hidden bg-slate-900 rounded-3xl p-6 md:p-8 text-white border border-slate-900">
          <div class="absolute -right-10 -top-12 h-44 w-44 rounded-full bg-red-600/20 blur-2xl"></div>
          <div class="absolute -left-12 -bottom-16 h-44 w-44 rounded-full bg-white/10 blur-2xl"></div>

          <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 relative z-10">
            <div class="space-y-2">
              <p class="text-[11px] uppercase tracking-wide text-red-400 font-semibold">
                Executive Narrative
              </p>
              <h1 class="text-2xl md:text-3xl font-semibold leading-tight">
                Decisions with evidence. Control with policy. Audit by default.
              </h1>
              <p class="text-sm text-slate-300 max-w-3xl">
                TH8.AI is not a chatbot and not a BI dashboard. It is a decision system that connects data + policy + documents into actions that executives can defend.
              </p>
            </div>

            <div class="grid grid-cols-2 gap-3 w-full md:w-auto">
              <div class="rounded-2xl bg-white/10 border border-white/10 p-4">
                <p class="text-[11px] uppercase tracking-wide text-slate-300 font-semibold">Live KPI</p>
                <p class="mt-1 text-xl font-semibold">{{ formatTHB(demoKpi.amountAtRiskTHB) }}</p>
                <p class="text-xs text-slate-300 mt-1">Amount at risk (THB)</p>
              </div>
              <div class="rounded-2xl bg-white/10 border border-white/10 p-4">
                <p class="text-[11px] uppercase tracking-wide text-slate-300 font-semibold">Queue</p>
                <p class="mt-1 text-xl font-semibold">{{ demoKpi.pendingDecisions }}</p>
                <p class="text-xs text-slate-300 mt-1">Decisions awaiting approval</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Selected module details (single) -->
        <section class="bg-white border border-slate-200 rounded-3xl p-5 md:p-6">
          <div class="flex items-start justify-between gap-4">
            <div class="space-y-1">
              <p class="text-xs uppercase tracking-wide text-red-600 font-semibold">
                Module details
              </p>
              <h2 class="text-xl md:text-2xl font-semibold text-slate-900">
                {{ selected.label }}
              </h2>
              <p class="text-sm text-slate-600 max-w-3xl">
                {{ selected.description }}
              </p>
            </div>

            <div class="shrink-0 hidden md:flex flex-col items-end gap-2">
              <span class="text-[11px] px-2 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 font-semibold">
                Primary: {{ selected.primaryPersona }}
              </span>
              <span class="text-[11px] px-2 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 font-semibold">
                Demo-ready UI
              </span>
            </div>
          </div>

          <!-- "What they see" preview layout -->
          <div class="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
            <!-- Left: Screenshot-like UI preview (cards) -->
            <div class="lg:col-span-7 space-y-4">
              <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-semibold text-slate-900">
                    What users see in this module
                  </p>
                  <span class="text-[11px] px-2 py-1 rounded-full border border-slate-200 bg-white text-slate-700 font-semibold">
                    {{ selected.uiPreview.title }}
                  </span>
                </div>

                <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div
                    v-for="(card, idx) in selected.uiPreview.cards"
                    :key="idx"
                    class="rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <p class="text-xs uppercase tracking-wide text-slate-500 font-semibold">
                      {{ card.kicker }}
                    </p>
                    <p class="mt-1 text-base font-semibold text-slate-900">
                      {{ card.title }}
                    </p>
                    <p class="mt-1 text-sm text-slate-600">
                      {{ card.body }}
                    </p>

                    <div v-if="card.pills?.length" class="mt-3 flex flex-wrap gap-2">
                      <span
                        v-for="(p, pIdx) in card.pills"
                        :key="pIdx"
                        class="text-[11px] px-2 py-1 rounded-full border font-semibold"
                        :class="pillClass(p)"
                      >
                        {{ p }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="rounded-2xl border border-slate-200 bg-white p-4">
                <p class="text-sm font-semibold text-slate-900">Enterprise touchpoints</p>
                <div class="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div class="rounded-xl bg-slate-50 border border-slate-200 p-3">
                    <p class="text-[11px] uppercase tracking-wide text-slate-500 font-semibold">Policy</p>
                    <p class="mt-1 text-sm font-semibold text-slate-900">{{ selected.enterprise.policy }}</p>
                    <p class="mt-1 text-xs text-slate-600">{{ selected.enterprise.policyNote }}</p>
                  </div>
                  <div class="rounded-xl bg-slate-50 border border-slate-200 p-3">
                    <p class="text-[11px] uppercase tracking-wide text-slate-500 font-semibold">Evidence</p>
                    <p class="mt-1 text-sm font-semibold text-slate-900">{{ selected.enterprise.evidence }}</p>
                    <p class="mt-1 text-xs text-slate-600">{{ selected.enterprise.evidenceNote }}</p>
                  </div>
                  <div class="rounded-xl bg-slate-50 border border-slate-200 p-3">
                    <p class="text-[11px] uppercase tracking-wide text-slate-500 font-semibold">Audit</p>
                    <p class="mt-1 text-sm font-semibold text-slate-900">{{ selected.enterprise.audit }}</p>
                    <p class="mt-1 text-xs text-slate-600">{{ selected.enterprise.auditNote }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right: Value + KPI + Services -->
            <div class="lg:col-span-5 space-y-4">
              <div class="rounded-2xl border border-slate-200 bg-white p-4">
                <p class="text-sm font-semibold text-slate-900">Why customers buy this module</p>
                <ul class="mt-3 text-sm text-slate-700 space-y-2">
                  <li v-for="(b, idx) in selected.value.bullets" :key="idx">
                    • {{ b }}
                  </li>
                </ul>

                <div class="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p class="text-xs uppercase tracking-wide text-slate-500 font-semibold">
                    Suggested KPI for ROI
                  </p>
                  <ul class="mt-2 text-sm text-slate-700 space-y-1">
                    <li v-for="(k, idx) in selected.value.kpis" :key="idx">• {{ k }}</li>
                  </ul>
                </div>
              </div>

              <div class="rounded-2xl border border-slate-200 bg-white p-4">
                <p class="text-sm font-semibold text-slate-900">What TH8 delivers</p>
                <div class="mt-3 space-y-3">
                  <div class="rounded-xl border border-slate-200 bg-white p-3">
                    <p class="text-xs uppercase tracking-wide text-slate-500 font-semibold">Product</p>
                    <ul class="mt-2 text-sm text-slate-700 space-y-1">
                      <li v-for="(p, idx) in selected.delivery.product" :key="idx">• {{ p }}</li>
                    </ul>
                  </div>
                  <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <p class="text-xs uppercase tracking-wide text-slate-500 font-semibold">Service</p>
                    <ul class="mt-2 text-sm text-slate-700 space-y-1">
                      <li v-for="(s, idx) in selected.delivery.service" :key="idx">• {{ s }}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="rounded-2xl border border-slate-200 bg-white p-4">
                <p class="text-sm font-semibold text-slate-900">Demo actions</p>
                <p class="mt-1 text-sm text-slate-600">
                  Use these buttons to narrate the module in a customer meeting.
                </p>
                <div class="mt-3 grid grid-cols-2 gap-2">
                  <button
                    class="px-3 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800"
                    @click="simulateAction('Open module')"
                  >
                    Open module
                  </button>
                  <button
                    class="px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold hover:bg-slate-50"
                    @click="simulateAction('Show evidence links')"
                  >
                    Show evidence
                  </button>
                  <button
                    class="px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold hover:bg-slate-50"
                    @click="simulateAction('Explain policy control')"
                  >
                    Explain policy
                  </button>
                  <button
                    class="px-3 py-2 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-500"
                    @click="simulateAction('Export audit report')"
                  >
                    Export report
                  </button>
                </div>

                <div v-if="demoToast" class="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p class="text-xs uppercase tracking-wide text-slate-500 font-semibold">Demo note</p>
                  <p class="mt-1 text-sm text-slate-700">
                    {{ demoToast }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Full product map (all modules expanded) -->
        <section class="bg-white border border-slate-200 rounded-3xl p-5 md:p-6">
          <div class="flex items-start justify-between gap-4">
            <div class="space-y-1">
              <p class="text-xs uppercase tracking-wide text-red-600 font-semibold">Full product map</p>
              <h3 class="text-lg font-semibold text-slate-900">All customer-facing modules</h3>
              <p class="text-sm text-slate-600">
                Use this section to show “the whole product” — not just a single demo screen.
              </p>
            </div>

            <div class="hidden md:flex items-center gap-2">
              <span class="text-[11px] px-2 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 font-semibold">
                Role: {{ personaLabel(activePersona) }}
              </span>
            </div>
          </div>

          <div class="mt-5 space-y-3">
            <div
              v-for="m in menus"
              :key="m.key"
              class="rounded-2xl border border-slate-200 overflow-hidden"
            >
              <button
                class="w-full px-4 py-4 bg-white hover:bg-slate-50 flex items-start justify-between gap-4 text-left"
                @click="toggleExpanded(m.key)"
              >
                <div class="min-w-0">
                  <div class="flex items-center gap-2">
                    <p class="text-sm font-semibold text-slate-900">{{ m.label }}</p>
                    <span class="text-[11px] px-2 py-0.5 rounded-full border font-semibold" :class="m.pillClass">
                      {{ m.primaryPersona }}
                    </span>
                    <span class="text-[11px] px-2 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 font-semibold">
                      {{ m.tagline }}
                    </span>
                  </div>
                  <p class="mt-1 text-sm text-slate-600">
                    {{ moduleMap[m.key].description }}
                  </p>
                </div>

                <span class="shrink-0 text-xs font-semibold text-slate-600">
                  {{ isExpanded(m.key) ? "Hide" : "Show" }}
                </span>
              </button>

              <div v-if="expandAll || isExpanded(m.key)" class="px-4 pb-4 bg-slate-50 border-t border-slate-200">
                <div class="pt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div class="rounded-xl bg-white border border-slate-200 p-3">
                    <p class="text-[11px] uppercase tracking-wide text-slate-500 font-semibold">Screens</p>
                    <ul class="mt-2 text-sm text-slate-700 space-y-1">
                      <li v-for="(s, idx) in moduleMap[m.key].screens" :key="idx">• {{ s }}</li>
                    </ul>
                  </div>

                  <div class="rounded-xl bg-white border border-slate-200 p-3">
                    <p class="text-[11px] uppercase tracking-wide text-slate-500 font-semibold">Key outputs</p>
                    <ul class="mt-2 text-sm text-slate-700 space-y-1">
                      <li v-for="(o, idx) in moduleMap[m.key].outputs" :key="idx">• {{ o }}</li>
                    </ul>
                  </div>

                  <div class="rounded-xl bg-white border border-slate-200 p-3">
                    <p class="text-[11px] uppercase tracking-wide text-slate-500 font-semibold">Buyer proof</p>
                    <ul class="mt-2 text-sm text-slate-700 space-y-1">
                      <li v-for="(p, idx) in moduleMap[m.key].proof" :key="idx">• {{ p }}</li>
                    </ul>
                  </div>
                </div>

                <div class="mt-3 rounded-xl border border-slate-200 bg-white p-3">
                  <p class="text-[11px] uppercase tracking-wide text-slate-500 font-semibold">Role fit</p>
                  <p class="mt-1 text-sm text-slate-700">
                    Primary: <span class="font-semibold text-slate-900">{{ m.primaryPersona }}</span>
                    · Secondary: <span class="font-semibold text-slate-900">{{ moduleMap[m.key].secondaryPersona }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Footer: talk track -->
        <section class="bg-white border border-slate-200 rounded-3xl p-5 md:p-6">
          <p class="text-sm font-semibold text-slate-900">Suggested talk track (3 minutes)</p>
          <ol class="mt-3 text-sm text-slate-700 space-y-2">
            <li>1) Start at <span class="font-semibold">Dashboard</span> to show exposure and priority.</li>
            <li>2) Drill into <span class="font-semibold">Cases</span> to show traceability and timeline.</li>
            <li>3) Move to <span class="font-semibold">Decisions</span> to show action with policy guardrails.</li>
            <li>4) Show <span class="font-semibold">Evidence</span> and <span class="font-semibold">Reports</span> to prove audit readiness.</li>
            <li>5) Close with <span class="font-semibold">Admin</span> to show control: roles, policy versioning, knowledge sources.</li>
          </ol>

          <div class="mt-4 flex items-center gap-2 text-xs text-slate-500">
            <span class="w-2 h-2 rounded-full bg-red-600"></span>
            <span>Position TH8 as a decision system, not an AI tool.</span>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

type PersonaKey = "EXEC" | "CFO" | "COO" | "OPS" | "AUDIT" | "IT";
type MenuKey = "dashboard" | "cases" | "decisions" | "insights" | "reports" | "admin";

const personas: Array<{ key: PersonaKey; label: string }> = [
  { key: "EXEC", label: "Executive (CEO/GM)" },
  { key: "CFO", label: "CFO / Finance Approver" },
  { key: "COO", label: "COO / Operations" },
  { key: "OPS", label: "Ops Manager" },
  { key: "AUDIT", label: "Audit / Risk" },
  { key: "IT", label: "Head of IT / Admin" },
];

const menus: Array<{
  key: MenuKey;
  label: string;
  tagline: string;
  primaryPersona: string;
  pillClass: string;
}> = [
  {
    key: "dashboard",
    label: "Dashboard",
    tagline: "Executive visibility",
    primaryPersona: "Exec",
    pillClass: "bg-slate-900 text-white border border-slate-900",
  },
  {
    key: "cases",
    label: "Cases",
    tagline: "Portfolio & drill-down",
    primaryPersona: "Ops",
    pillClass: "bg-slate-50 text-slate-700 border border-slate-200",
  },
  {
    key: "decisions",
    label: "Decisions",
    tagline: "Approval queue",
    primaryPersona: "Approver",
    pillClass: "bg-red-50 text-red-700 border border-red-200",
  },
  {
    key: "insights",
    label: "Insights",
    tagline: "What changed & why",
    primaryPersona: "Exec",
    pillClass: "bg-slate-50 text-slate-700 border border-slate-200",
  },
  {
    key: "reports",
    label: "Reports",
    tagline: "Audit-ready exports",
    primaryPersona: "Audit",
    pillClass: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  },
  {
    key: "admin",
    label: "Admin",
    tagline: "Control & governance",
    primaryPersona: "IT",
    pillClass: "bg-slate-50 text-slate-700 border border-slate-200",
  },
];

const activePersona = ref<PersonaKey>("EXEC");
const selectedMenu = ref<MenuKey>("dashboard");
const expandAll = ref(false);
const expanded = ref<Set<MenuKey>>(new Set<MenuKey>(["dashboard"]));
const demoToast = ref<string>("");

const demoKpi = ref({
  amountAtRiskTHB: 12850000,
  pendingDecisions: 12,
});

const moduleMap: Record<MenuKey, any> = {
  dashboard: {
    description:
      "Executive entry point: exposure, SLA hotspots, and what requires attention today — in one screen.",
    screens: [
      "Executive overview (Amount at risk · SLA breaches · hotspots)",
      "Risk heatmap by category/vendor",
      "Top pending decisions (by impact)",
    ],
    outputs: [
      "Single-page situation awareness",
      "Prioritized attention list",
      "Confidence to act quickly",
    ],
    proof: [
      "Shows THB exposure (not counts)",
      "Links to cases and decisions",
      "Designed for board-level reporting",
    ],
    secondaryPersona: "CFO / COO",
  },

  cases: {
    description:
      "Case portfolio and case detail with timeline, evidence links, and decision context.",
    screens: [
      "Case portfolio (filters: risk/status/amount)",
      "Case detail (header, SLA, amount THB)",
      "Audit timeline (who/when/what)",
      "Evidence panel (documents, clauses, links)",
    ],
    outputs: [
      "Traceability from summary to evidence",
      "Fewer clarification loops",
      "Faster issue resolution",
    ],
    proof: [
      "Every case traceable to audit events",
      "Evidence links are explicit",
      "Ready for executive walkthrough",
    ],
    secondaryPersona: "Audit / Risk",
  },

  decisions: {
    description:
      "Decision queue where approvals happen with policy guardrails and evidence-backed rationale.",
    screens: [
      "Decision queue (priority by impact/SLA)",
      "Decision action panel (approve/reject/request info)",
      "Rationale & evidence links (why + sources)",
    ],
    outputs: [
      "Faster approvals without blind risk",
      "Clear accountability (who approved and why)",
      "Reduced operational friction",
    ],
    proof: [
      "Policy version attached to each decision",
      "Reject requires justification (audit)",
      "Approvals align to authority limits",
    ],
    secondaryPersona: "Ops Manager",
  },

  insights: {
    description:
      "Executive intelligence: explain trends and drivers, not just charts.",
    screens: [
      "Trends (risk, delays, amounts)",
      "Driver breakdown (root causes)",
      "Action recommendations (policy-aligned)",
    ],
    outputs: [
      "Shared understanding across teams",
      "Better decisions in weekly reviews",
      "Operational hotspots surfaced early",
    ],
    proof: [
      "Connects signals to actions",
      "Designed for executive cadence",
      "Reduces reliance on key-person explanations",
    ],
    secondaryPersona: "Strategy / Transformation",
  },

  reports: {
    description:
      "Audit & compliance outputs: logs, traceability, exports — without manual compilation.",
    screens: [
      "Decision log (who/when/why)",
      "Policy version history attached to actions",
      "Evidence list + export (CSV/PDF)",
    ],
    outputs: [
      "Audit-ready pack in minutes",
      "Reduced compliance risk",
      "Higher governance confidence",
    ],
    proof: [
      "Traceability by design",
      "Exports for auditors and board",
      "Separates evidence from opinion",
    ],
    secondaryPersona: "CFO / Legal",
  },

  admin: {
    description:
      "Governance and control: roles, policy versioning, knowledge sources, integrations, health.",
    screens: [
      "Users & Roles (authority thresholds)",
      "Decision Policy (draft, version, publish)",
      "Knowledge sources (documents, SOPs, contracts)",
      "Integrations (ERP/docs/events) + health",
      "Usage & ROI (optional for renewal)",
    ],
    outputs: [
      "Control AI behavior without technical knobs",
      "Safe rollout (manual → guarded auto)",
      "Operational ownership for IT",
    ],
    proof: [
      "Policy publish requires accountability",
      "Source governance prevents “random” answers",
      "Enterprise controls without complexity",
    ],
    secondaryPersona: "Audit / Risk",
  },
};

const selected = computed(() => {
  // Enhanced “module details” payload for the top section
  const base = moduleMap[selectedMenu.value];

  const uiPreviewByMenu: Record<MenuKey, any> = {
    dashboard: {
      title: "Executive Overview",
      cards: [
        {
          kicker: "Exposure",
          title: "Amount at risk (THB)",
          body: `Total risk exposure across active cases with SLA pressure.`,
          pills: ["THB", "SLA", "Top risks"],
        },
        {
          kicker: "Priority",
          title: "What needs attention today",
          body: `Top 10 items that require executive decision or escalation.`,
          pills: ["Queue", "Impact", "Escalations"],
        },
      ],
    },
    cases: {
      title: "Case Portfolio + Detail",
      cards: [
        {
          kicker: "Portfolio",
          title: "Case list with filters",
          body: `Status, risk, amount THB, SLA signals, and drill-down to detail.`,
          pills: ["Portfolio", "Filters", "THB"],
        },
        {
          kicker: "Traceability",
          title: "Audit timeline + evidence",
          body: `Every step traceable to audit events with document links.`,
          pills: ["Audit", "Evidence", "Links"],
        },
      ],
    },
    decisions: {
      title: "Approval Queue",
      cards: [
        {
          kicker: "Action",
          title: "Approve / Reject with rationale",
          body: `Decision actions follow policy guardrails and authority thresholds.`,
          pills: ["Approve", "Reject", "Reason"],
        },
        {
          kicker: "Trust",
          title: "Evidence-backed recommendation",
          body: `Recommendations include citations and links to documents/clauses.`,
          pills: ["Evidence", "Citations", "Policy"],
        },
      ],
    },
    insights: {
      title: "Executive Intelligence",
      cards: [
        {
          kicker: "Trends",
          title: "What changed and why",
          body: `Trends + drivers that explain operational movement, not just charts.`,
          pills: ["Trends", "Drivers", "Hotspots"],
        },
        {
          kicker: "Next steps",
          title: "Recommended actions",
          body: `Recommendations aligned to policy and operational constraints.`,
          pills: ["Actions", "Policy", "ROI"],
        },
      ],
    },
    reports: {
      title: "Audit-ready Exports",
      cards: [
        {
          kicker: "Audit trail",
          title: "Who / When / Why",
          body: `Decision log with policy version and evidence references.`,
          pills: ["Log", "Policy v", "Trace"],
        },
        {
          kicker: "Export",
          title: "CSV / PDF packs",
          body: `Exports for auditors, board meetings, and compliance reviews.`,
          pills: ["CSV", "PDF", "Board"],
        },
      ],
    },
    admin: {
      title: "Governance Console",
      cards: [
        {
          kicker: "Control",
          title: "Policy versioning + publish",
          body: `Draft → review → publish with accountability for every change.`,
          pills: ["Policy", "Version", "Publish"],
        },
        {
          kicker: "Knowledge",
          title: "Manage sources safely",
          body: `Allowed documents and evidence sources with update tracking.`,
          pills: ["Sources", "Docs", "Governance"],
        },
      ],
    },
  };

  const enterpriseByMenu: Record<MenuKey, any> = {
    dashboard: {
      policy: "Shows policy-driven risk signals",
      policyNote: "Executives see exposure framed by rules (not raw data).",
      evidence: "Links from hotspots to cases",
      evidenceNote: "One click from KPI to the evidence trail.",
      audit: "Board-ready summaries",
      auditNote: "Designed for executive cadence and audit scrutiny.",
    },
    cases: {
      policy: "Case status reflects policy states",
      policyNote: "State is meaningful (not technical) and traceable.",
      evidence: "Evidence panel + document links",
      evidenceNote: "Recommendations always point to sources.",
      audit: "Timeline from audit_events",
      auditNote: "Full traceability for each step and actor.",
    },
    decisions: {
      policy: "Policy guardrails + authority limits",
      policyNote: "Approvals aligned to thresholds and role authority.",
      evidence: "Citations required for recommendations",
      evidenceNote: "Evidence-first: no “trust the model”.",
      audit: "Decision log with reasons",
      auditNote: "Approve/reject always captured with justification.",
    },
    insights: {
      policy: "Insights mapped to controllable levers",
      policyNote: "Focus on what the business can change next.",
      evidence: "Drivers linked to underlying signals",
      evidenceNote: "Explain “why” with data context.",
      audit: "Review-ready narratives",
      auditNote: "Less debate, more action in weekly ops reviews.",
    },
    reports: {
      policy: "Policy version attached to actions",
      policyNote: "Auditors can see which policy was in effect.",
      evidence: "Evidence list included in exports",
      evidenceNote: "Documents and clauses are explicit.",
      audit: "Audit packs in minutes",
      auditNote: "Exportable traceability reduces compliance overhead.",
    },
    admin: {
      policy: "Draft → publish with versioning",
      policyNote: "Governance controls without technical complexity.",
      evidence: "Allowed sources governance",
      evidenceNote: "Prevents AI from using uncontrolled documents.",
      audit: "Admin actions logged",
      auditNote: "Who changed policy/roles and when — always traceable.",
    },
  };

  const valueByMenu: Record<MenuKey, any> = {
    dashboard: {
      bullets: [
        "Executives see exposure (THB) and SLA risk in seconds.",
        "Makes prioritization explicit: what matters today.",
        "Bridges the gap between BI and action.",
      ],
      kpis: ["Decision cycle time", "SLA breach rate", "Exposure reduced (THB)"],
    },
    cases: {
      bullets: [
        "One place to manage exceptions with full context.",
        "Traceability reduces back-and-forth with teams.",
        "Evidence links improve trust and speed.",
      ],
      kpis: ["Case resolution time", "Rework rate", "Audit findings reduced"],
    },
    decisions: {
      bullets: [
        "Approvals happen with policy guardrails (no blind risk).",
        "Evidence-backed rationale reduces executive hesitation.",
        "Clear accountability improves governance.",
      ],
      kpis: ["Approval turnaround", "Auto/manual ratio", "Exception backlog"],
    },
    insights: {
      bullets: [
        "Turns noisy operations into executive-ready explanations.",
        "Highlights drivers and hotspots that teams can act on.",
        "Supports cadence reviews (weekly/monthly).",
      ],
      kpis: ["Recurring issues reduced", "Predictability improved", "Avoided losses (THB)"],
    },
    reports: {
      bullets: [
        "Audit-ready by design: who/when/why + evidence.",
        "Reduces time spent building compliance packs.",
        "Improves trust with audit and legal stakeholders.",
      ],
      kpis: ["Audit prep time", "Compliance exceptions", "Traceability coverage"],
    },
    admin: {
      bullets: [
        "Gives IT and governance owners control without exposing technical knobs.",
        "Policy versioning supports safe rollout to production.",
        "Source governance keeps AI answers defensible.",
      ],
      kpis: ["Policy change lead time", "Incidents from misconfig", "Governance SLA"],
    },
  };

  const deliveryByMenu: Record<MenuKey, any> = {
    dashboard: {
      product: ["Executive dashboard (THB exposure + SLA)", "Drill-down to cases/decisions", "Role-based visibility"],
      service: ["Executive KPI alignment workshop", "Dashboard narrative scripting for board", "ROI baseline setup"],
    },
    cases: {
      product: ["Case portfolio + detail views", "Audit timeline UI", "Evidence panel + document links"],
      service: ["Case taxonomy design", "Data mapping to canonical case schema", "UAT scenarios for ops teams"],
    },
    decisions: {
      product: ["Decision queue + action panel", "Policy-aware recommendations", "Reason capture + audit logging"],
      service: ["Approval matrix design (authority limits)", "Workflow integration (notify/escalate)", "Go-live playbook for approvers"],
    },
    insights: {
      product: ["Trend/driver views", "Hotspot analysis", "Action recommendations aligned to policy"],
      service: ["Executive cadence setup (weekly ops review)", "Driver model workshop", "Outcome tracking framework"],
    },
    reports: {
      product: ["Decision log and exports", "Policy version traceability", "Evidence reference exports"],
      service: ["Audit pack template", "Compliance review walkthrough", "Controls documentation support"],
    },
    admin: {
      product: ["Users & roles", "Decision policy versioning + publish", "Knowledge source governance", "Integration health"],
      service: ["Governance setup", "Integration onboarding", "Operating model handover (IT/ops/audit)"],
    },
  };

  const mKey = selectedMenu.value;

  return {
    key: mKey,
    label: menus.find((x) => x.key === mKey)!.label,
    description: base.description,
    primaryPersona: menus.find((x) => x.key === mKey)!.primaryPersona,
    uiPreview: uiPreviewByMenu[mKey],
    enterprise: enterpriseByMenu[mKey],
    value: valueByMenu[mKey],
    delivery: deliveryByMenu[mKey],
  };
});

function selectMenu(key: MenuKey) {
  selectedMenu.value = key;
  demoToast.value = "";
  expanded.value.add(key);
}

function toggleVersionSet(set: Set<MenuKey>, key: MenuKey) {
  const next = new Set(set);
  if (next.has(key)) next.delete(key);
  else next.add(key);
  expanded.value = next;
}

function toggleExpanded(key: MenuKey) {
  toggleVersionSet(expanded.value, key);
}

function isExpanded(key: MenuKey) {
  return expanded.value.has(key);
}

function menuBtnClass(key: MenuKey) {
  const isActive = selectedMenu.value === key;
  return isActive
    ? "border-slate-900 bg-slate-50"
    : "border-slate-200 bg-white hover:bg-slate-50";
}

function pillClass(p: string) {
  // Lightweight semantics for demo
  const v = p.toLowerCase();
  if (v.includes("thb")) return "bg-slate-50 border-slate-200 text-slate-700";
  if (v.includes("policy")) return "bg-red-50 border-red-200 text-red-700";
  if (v.includes("evidence") || v.includes("citations")) return "bg-emerald-50 border-emerald-200 text-emerald-700";
  if (v.includes("approve") || v.includes("reject")) return "bg-red-50 border-red-200 text-red-700";
  if (v.includes("audit")) return "bg-emerald-50 border-emerald-200 text-emerald-700";
  return "bg-slate-50 border-slate-200 text-slate-700";
}

function personaLabel(key: PersonaKey) {
  return personas.find((p) => p.key === key)?.label || key;
}

function formatTHB(value: number) {
  try {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    // Fallback
    return `฿${Math.round(value).toLocaleString("en-US")}`;
  }
}

function simulateAction(action: string) {
  const m = menus.find((x) => x.key === selectedMenu.value)!;
  demoToast.value = `Narrate: ${m.label} → ${action}. Emphasize policy control + evidence + audit traceability.`;
  window.clearTimeout((simulateAction as any)._t);
  (simulateAction as any)._t = window.setTimeout(() => (demoToast.value = ""), 4500);
}

function runDemoMode() {
  // Simple guided sequence (no routing)
  const sequence: MenuKey[] = ["dashboard", "cases", "decisions", "reports", "admin", "insights"];
  let i = 0;
  demoToast.value = "Demo mode: guided walkthrough started (Dashboard → Cases → Decisions → Reports → Admin → Insights).";
  const step = () => {
    selectMenu(sequence[i]);
    i += 1;
    if (i < sequence.length) window.setTimeout(step, 1200);
    else window.setTimeout(() => (demoToast.value = "Demo mode: walkthrough completed."), 1200);
  };
  window.setTimeout(step, 900);
}
</script>
