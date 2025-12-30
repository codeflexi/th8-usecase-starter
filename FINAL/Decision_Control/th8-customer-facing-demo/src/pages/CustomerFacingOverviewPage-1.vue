<!-- src/pages/Th8AdminSpa.vue
     TH8.AI Admin SPA (customer-facing) — layout inspired by modern admin templates (like your screenshot)
     Vue 3 + Tailwind only (no external UI libs), demo-ready with left sidebar + topbar + 6 modules.
-->
<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 font-prompt">
    <!-- Topbar -->
    <header class="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
      <div class="mx-auto max-w-[1400px] px-4">
        <div class="h-14 flex items-center justify-between gap-3">
          <!-- Left: brand + quick search -->
          <div class="flex items-center gap-3 min-w-0">
            <button
              class="lg:hidden h-9 w-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-50"
              @click="sidebarOpen = !sidebarOpen"
              aria-label="Toggle menu"
            >
              <div class="h-full w-full flex items-center justify-center">
                <span class="text-slate-700 text-lg leading-none">≡</span>
              </div>
            </button>

            <div class="flex items-center gap-2 min-w-0">
              <div class="h-9 w-9 rounded-xl bg-slate-900 flex items-center justify-center">
                <span class="text-white text-xs font-bold tracking-wide">TH8</span>
              </div>
              <div class="min-w-0">
                <p class="text-[11px] uppercase tracking-wide text-red-600 font-semibold">
                  TH8.AI · Enterprise Decision Center
                </p>
                <p class="text-sm font-semibold text-slate-900 truncate">
                  Admin Console (Customer-facing)
                </p>
              </div>
            </div>

            <div class="hidden md:flex items-center gap-2 ml-6">
              <div class="relative">
                <input
                  v-model="q"
                  type="text"
                  placeholder="Search cases, vendors, policies, documents…"
                  class="w-[420px] max-w-[40vw] pl-10 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-sm
                         focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                />
                <div class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">⌕</div>
              </div>
              <button
                class="px-3 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800"
                @click="toast(`Search: “${q || '…'}” (demo)`)"
              >
                Search
              </button>
            </div>
          </div>

          <!-- Right: actions -->
          <div class="flex items-center gap-2">
            <div class="hidden lg:flex items-center gap-2">
              <button
                class="px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold hover:bg-slate-50"
                @click="openCreateCase()"
              >
                + New case
              </button>

              <div class="relative">
                <button
                  class="px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold hover:bg-slate-50"
                  @click="showQuickActions = !showQuickActions"
                >
                  Quick actions
                </button>
                <div
                  v-if="showQuickActions"
                  class="absolute right-0 mt-2 w-72 rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden"
                >
                  <div class="p-3 border-b border-slate-200">
                    <p class="text-xs uppercase tracking-wide text-slate-500 font-semibold">Admin</p>
                    <p class="text-sm font-semibold text-slate-900">Shortcuts</p>
                  </div>
                  <div class="p-2 space-y-1">
                    <button class="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 text-sm" @click="jump('policies')">
                      Decision Policy → Drafts
                    </button>
                    <button class="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 text-sm" @click="jump('knowledge')">
                      RAG Documents → Upload
                    </button>
                    <button class="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 text-sm" @click="jump('users')">
                      Users & Roles → Add user
                    </button>
                    <button class="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 text-sm" @click="jump('integrations')">
                      Integrations → Health check
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              class="h-10 w-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 relative"
              @click="toast('Notifications (demo)')"
            >
              <div class="h-full w-full flex items-center justify-center">🔔</div>
              <span class="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 rounded-full bg-red-600 text-white text-[11px] font-bold flex items-center justify-center">
                3
              </span>
            </button>

            <div class="hidden sm:flex items-center gap-3 pl-2">
              <div class="text-right">
                <p class="text-sm font-semibold text-slate-900 leading-tight">Customer Admin</p>
                <p class="text-xs text-slate-500 leading-tight">CFO / Head of IT</p>
              </div>
              <div class="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-semibold">
                CA
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile search row -->
        <div class="md:hidden pb-3">
          <div class="flex items-center gap-2">
            <div class="relative flex-1">
              <input
                v-model="q"
                type="text"
                placeholder="Search…"
                class="w-full pl-10 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-sm
                       focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
              />
              <div class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">⌕</div>
            </div>
            <button
              class="px-3 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800"
              @click="toast(`Search: “${q || '…'}” (demo)`)"
            >
              Go
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="mx-auto max-w-[1400px] px-4">
      <div class="grid grid-cols-12 gap-6 py-6">
        <!-- Sidebar -->
        <aside
          class="col-span-12 lg:col-span-3 xl:col-span-2"
          :class="[
            'lg:block',
            sidebarOpen ? 'block' : 'hidden',
          ]"
        >
          <div class="bg-white border border-slate-200 rounded-2xl p-3 sticky top-20">
            <div class="px-2 py-2 flex items-center justify-between">
              <p class="text-xs uppercase tracking-wide text-slate-500 font-semibold">Menu</p>
              <span class="text-[11px] px-2 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 font-semibold">
                SPA
              </span>
            </div>

            <!-- Primary nav -->
            <div class="space-y-1 p-1">
              <button
                v-for="item in primaryNav"
                :key="item.key"
                class="w-full text-left px-3 py-3 rounded-xl border transition"
                :class="navBtnClass(item.key)"
                @click="active = item.key"
              >
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <p class="text-sm font-semibold truncate">
                      {{ item.label }}
                    </p>
                    <p class="text-xs mt-1 text-slate-500">
                      {{ item.caption }}
                    </p>
                  </div>
                  <span
                    v-if="item.badge"
                    class="shrink-0 text-[11px] px-2 py-1 rounded-full font-semibold"
                    :class="item.badgeClass"
                  >
                    {{ item.badge }}
                  </span>
                </div>
              </button>
            </div>

            <!-- Admin section -->
            <div class="mt-4 border-t border-slate-200 pt-4">
              <p class="px-2 text-xs uppercase tracking-wide text-slate-500 font-semibold">
                Admin & Governance
              </p>
              <div class="mt-2 space-y-1 p-1">
                <button
                  v-for="item in adminNav"
                  :key="item.key"
                  class="w-full text-left px-3 py-3 rounded-xl border transition"
                  :class="navBtnClass(item.key)"
                  @click="active = item.key"
                >
                  <div class="flex items-start justify-between gap-3">
                    <div class="min-w-0">
                      <p class="text-sm font-semibold truncate">
                        {{ item.label }}
                      </p>
                      <p class="text-xs mt-1 text-slate-500">
                        {{ item.caption }}
                      </p>
                    </div>
                    <span
                      v-if="item.badge"
                      class="shrink-0 text-[11px] px-2 py-1 rounded-full font-semibold"
                      :class="item.badgeClass"
                    >
                      {{ item.badge }}
                    </span>
                  </div>
                </button>
              </div>
            </div>

            <!-- Footer note -->
            <div class="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-3">
              <p class="text-[11px] uppercase tracking-wide text-slate-500 font-semibold">Enterprise promise</p>
              <p class="mt-1 text-sm text-slate-700">
                Policy-controlled decisions with evidence links and audit-ready traceability.
              </p>
            </div>
          </div>
        </aside>

        <!-- Main -->
        <main class="col-span-12 lg:col-span-9 xl:col-span-10 space-y-6">
          <!-- Page header -->
          <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <div>
              <p class="text-xs uppercase tracking-wide text-red-600 font-semibold">
                {{ pageKicker }}
              </p>
              <h1 class="text-2xl md:text-3xl font-semibold text-slate-900">
                {{ pageTitle }}
              </h1>
              <p class="text-sm text-slate-600 mt-1 max-w-4xl">
                {{ pageSubtitle }}
              </p>
            </div>

            <div class="flex items-center gap-2">
              <button
                class="px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold hover:bg-slate-50"
                @click="toast('Export (demo)')"
              >
                Export
              </button>
              <button
                class="px-3 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800"
                @click="toast('Save (demo)')"
              >
                Save
              </button>
            </div>
          </div>

          <!-- Content by module -->
          <section v-if="active === 'dashboard'" class="space-y-6">
            <!-- KPI cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <KpiCard title="Amount at risk (THB)" :value="formatTHB(12850000)" trend="+8.3% vs last week" />
              <KpiCard title="Pending decisions" value="12" trend="3 escalations today" />
              <KpiCard title="SLA breach risk" value="6 cases" trend="2 within 24 hours" />
              <KpiCard title="Policy compliance" value="98.7%" trend="All approvals traceable" />
            </div>

            <!-- Panels -->
            <div class="grid grid-cols-1 xl:grid-cols-12 gap-4">
              <div class="xl:col-span-7 bg-white border border-slate-200 rounded-2xl p-5">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <p class="text-sm font-semibold text-slate-900">Decision queue (top priority)</p>
                    <p class="text-sm text-slate-600 mt-1">
                      What needs executive attention today — ordered by impact and SLA.
                    </p>
                  </div>
                  <span class="text-[11px] px-2 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 font-semibold">
                    Approver view
                  </span>
                </div>

                <div class="mt-4 space-y-3">
                  <QueueRow id="PO-2025-0182" vendor="Ovaltine Thailand" :amount="2450000" risk="High" sla="12h" />
                  <QueueRow id="PO-2025-0199" vendor="Office Supplies Co.,Ltd." :amount="680000" risk="Medium" sla="2d" />
                  <QueueRow id="PO-2025-0204" vendor="Logistics Partner A" :amount="1320000" risk="High" sla="24h" />
                </div>

                <div class="mt-4 flex items-center gap-2">
                  <button class="px-3 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800" @click="active='decisions'">
                    Open Decisions
                  </button>
                  <button class="px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold hover:bg-slate-50" @click="toast('View all queues (demo)')">
                    View all
                  </button>
                </div>
              </div>

              <div class="xl:col-span-5 bg-white border border-slate-200 rounded-2xl p-5">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <p class="text-sm font-semibold text-slate-900">Hotspots</p>
                    <p class="text-sm text-slate-600 mt-1">
                      Where risk and friction concentrate — by vendor, category, or policy.
                    </p>
                  </div>
                  <span class="text-[11px] px-2 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 font-semibold">
                    Executive
                  </span>
                </div>

                <div class="mt-4 space-y-3">
                  <HotspotRow label="Contract clause mismatch" value="7 cases" tone="red" />
                  <HotspotRow label="SLA at risk (approval delay)" value="6 cases" tone="amber" />
                  <HotspotRow label="Vendor master data mismatch" value="3 cases" tone="slate" />
                </div>

                <div class="mt-5 rounded-xl bg-slate-50 border border-slate-200 p-4">
                  <p class="text-xs uppercase tracking-wide text-slate-500 font-semibold">Executive message</p>
                  <p class="mt-1 text-sm text-slate-700">
                    TH8 shows <span class="font-semibold">exposure in THB</span> and links every hotspot to
                    <span class="font-semibold">evidence + policy version</span> — enabling defensible decisions.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section v-else-if="active === 'cases'" class="space-y-6">
            <div class="bg-white border border-slate-200 rounded-2xl p-5">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-sm font-semibold text-slate-900">Case portfolio</p>
                  <p class="text-sm text-slate-600 mt-1">Filter by status, risk, amount, SLA, vendor.</p>
                </div>
                <div class="flex items-center gap-2">
                  <select class="px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm" v-model="caseFilter">
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="in_review">In review</option>
                    <option value="resolved">Resolved</option>
                  </select>
                  <button class="px-3 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800" @click="toast('Apply filters (demo)')">
                    Apply
                  </button>
                </div>
              </div>

              <div class="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div class="grid grid-cols-12 gap-0 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                  <div class="col-span-3 p-3">Case</div>
                  <div class="col-span-3 p-3">Vendor</div>
                  <div class="col-span-2 p-3">Amount (THB)</div>
                  <div class="col-span-2 p-3">Risk</div>
                  <div class="col-span-2 p-3">SLA</div>
                </div>
                <div class="divide-y divide-slate-200">
                  <CaseRow id="CASE-1842" vendor="Ovaltine Thailand" :amount="2450000" risk="High" sla="12h" @open="toast('Open CaseDetail (demo)')" />
                  <CaseRow id="CASE-1849" vendor="Office Supplies Co.,Ltd." :amount="680000" risk="Medium" sla="2d" @open="toast('Open CaseDetail (demo)')" />
                  <CaseRow id="CASE-1856" vendor="Logistics Partner A" :amount="1320000" risk="High" sla="24h" @open="toast('Open CaseDetail (demo)')" />
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 xl:grid-cols-12 gap-4">
              <div class="xl:col-span-7 bg-white border border-slate-200 rounded-2xl p-5">
                <p class="text-sm font-semibold text-slate-900">Case detail (preview)</p>
                <p class="text-sm text-slate-600 mt-1">
                  What makes it enterprise: timeline + evidence links + decision context.
                </p>

                <div class="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <p class="text-sm font-semibold text-slate-900">CASE-1842 · Contract-based procurement</p>
                      <p class="text-sm text-slate-600 mt-1">Amount: <span class="font-semibold">{{ formatTHB(2450000) }}</span> · Risk: High · SLA: 12h</p>
                    </div>
                    <span class="text-[11px] px-2 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold">
                      Evidence-linked
                    </span>
                  </div>

                  <div class="mt-4 space-y-2">
                    <TimelineItem when="09:12" who="System" what="Ingestion completed: PO/GR/Invoice normalized" />
                    <TimelineItem when="09:14" who="TH8 Policy Engine" what="Detected clause mismatch vs contract v1.8" />
                    <TimelineItem when="09:18" who="Ops" what="Requested clarification from vendor" />
                    <TimelineItem when="10:02" who="Approver" what="Decision pending (authority threshold exceeded)" />
                  </div>

                  <div class="mt-4 flex items-center gap-2">
                    <button class="px-3 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800" @click="active='decisions'">
                      Go to Decisions
                    </button>
                    <button class="px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold hover:bg-slate-50" @click="toast('Open evidence links (demo)')">
                      View evidence
                    </button>
                  </div>
                </div>
              </div>

              <div class="xl:col-span-5 bg-white border border-slate-200 rounded-2xl p-5">
                <p class="text-sm font-semibold text-slate-900">Evidence panel (preview)</p>
                <p class="text-sm text-slate-600 mt-1">
                  RAG is framed as evidence retrieval — citations and document links.
                </p>

                <div class="mt-4 space-y-3">
                  <EvidenceRow title="Contract: Office Supply 2024" meta="Clause 4.2 · price cap" tag="Contract" />
                  <EvidenceRow title="SOP: Procurement Approval Matrix" meta="Thresholds by role" tag="SOP" />
                  <EvidenceRow title="Vendor quotation" meta="Line item mismatch" tag="Document" />
                </div>

                <div class="mt-5 rounded-xl bg-slate-50 border border-slate-200 p-4">
                  <p class="text-xs uppercase tracking-wide text-slate-500 font-semibold">Audit note</p>
                  <p class="mt-1 text-sm text-slate-700">
                    Every recommendation is linked to evidence. Exportable as an audit pack.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section v-else-if="active === 'decisions'" class="space-y-6">
            <div class="grid grid-cols-1 xl:grid-cols-12 gap-4">
              <div class="xl:col-span-7 bg-white border border-slate-200 rounded-2xl p-5">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <p class="text-sm font-semibold text-slate-900">Decision queue</p>
                    <p class="text-sm text-slate-600 mt-1">Approve / Reject with rationale and policy guardrails.</p>
                  </div>
                  <span class="text-[11px] px-2 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 font-semibold">
                    Approver
                  </span>
                </div>

                <div class="mt-4 space-y-3">
                  <DecisionCard
                    id="DEC-3921"
                    title="Approve PO with clause mismatch"
                    :amount="2450000"
                    risk="High"
                    policy="Policy v1.8 · Contract compliance"
                    @approve="toast('Approved (demo)')"
                    @reject="toast('Rejected (demo)')"
                    @openEvidence="toast('Open evidence links (demo)')"
                  />
                  <DecisionCard
                    id="DEC-3922"
                    title="Approve emergency purchase (override)"
                    :amount="1320000"
                    risk="High"
                    policy="Policy v1.8 · Override requires justification"
                    @approve="toast('Approved (demo)')"
                    @reject="toast('Rejected (demo)')"
                    @openEvidence="toast('Open evidence links (demo)')"
                  />
                </div>
              </div>

              <div class="xl:col-span-5 bg-white border border-slate-200 rounded-2xl p-5">
                <p class="text-sm font-semibold text-slate-900">Policy guardrails (preview)</p>
                <p class="text-sm text-slate-600 mt-1">
                  This is what makes approvals defensible: authority limits + required evidence + justification.
                </p>

                <div class="mt-4 space-y-3">
                  <RuleRow title="Authority threshold" desc="If amount > ฿1,000,000 → CFO approval required" tone="red" />
                  <RuleRow title="Evidence requirement" desc="Any contract mismatch must include clause citation" tone="emerald" />
                  <RuleRow title="Override logging" desc="Emergency override requires explicit reason and audit log entry" tone="slate" />
                </div>

                <div class="mt-5 rounded-xl bg-slate-50 border border-slate-200 p-4">
                  <p class="text-xs uppercase tracking-wide text-slate-500 font-semibold">What you tell executives</p>
                  <p class="mt-1 text-sm text-slate-700">
                    “TH8 doesn’t generate approvals — it enforces the company’s policy, attaches evidence, and logs decisions for audit.”
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section v-else-if="active === 'insights'" class="space-y-6">
            <div class="grid grid-cols-1 xl:grid-cols-12 gap-4">
              <div class="xl:col-span-8 bg-white border border-slate-200 rounded-2xl p-5">
                <p class="text-sm font-semibold text-slate-900">Executive insights</p>
                <p class="text-sm text-slate-600 mt-1">
                  “What changed and why” — turning operational noise into decision-ready explanations.
                </p>

                <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <InsightCard title="Top driver" value="Contract mismatches" note="7 cases this week" />
                  <InsightCard title="Financial exposure" :value="formatTHB(12850000)" note="At risk within SLA window" />
                  <InsightCard title="Operational friction" value="Approval delays" note="6 cases near breach" />
                </div>

                <div class="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p class="text-sm font-semibold text-slate-900">Recommended actions</p>
                  <div class="mt-3 space-y-2">
                    <ActionRow title="Publish policy update" desc="Tighten clause matching rules for category: Office Supplies" />
                    <ActionRow title="Update knowledge source" desc="Upload the latest contract addendum to evidence store" />
                    <ActionRow title="Operational fix" desc="Escalate approvals within 24h for high-risk cases" />
                  </div>
                </div>
              </div>

              <div class="xl:col-span-4 bg-white border border-slate-200 rounded-2xl p-5">
                <p class="text-sm font-semibold text-slate-900">Explainability snapshot</p>
                <p class="text-sm text-slate-600 mt-1">Insight → linked to cases → linked to evidence.</p>

                <div class="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                  <p class="text-xs uppercase tracking-wide text-emerald-700 font-semibold">Evidence chain</p>
                  <ul class="mt-2 text-sm text-slate-800 space-y-1">
                    <li>• Driver: clause mismatch</li>
                    <li>• Evidence: Contract clause 4.2</li>
                    <li>• Policy: v1.8 compliance checks</li>
                    <li>• Cases: CASE-1842, CASE-1856…</li>
                  </ul>
                </div>

                <button class="mt-4 w-full px-3 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800" @click="active='reports'">
                  Export executive pack
                </button>
              </div>
            </div>
          </section>

          <section v-else-if="active === 'reports'" class="space-y-6">
            <div class="bg-white border border-slate-200 rounded-2xl p-5">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-sm font-semibold text-slate-900">Reports & exports</p>
                  <p class="text-sm text-slate-600 mt-1">
                    Audit-ready packs: decision log, policy version, and evidence references.
                  </p>
                </div>
                <span class="text-[11px] px-2 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold">
                  Audit
                </span>
              </div>

              <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <ReportCard title="Decision Log" desc="Who / When / Why for all approvals" />
                <ReportCard title="Policy Trace" desc="Policy versions used in each decision" />
                <ReportCard title="Evidence List" desc="Documents and clause citations (RAG)" />
              </div>

              <div class="mt-5 flex flex-wrap gap-2">
                <button class="px-3 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800" @click="toast('Export PDF (demo)')">
                  Export PDF
                </button>
                <button class="px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold hover:bg-slate-50" @click="toast('Export CSV (demo)')">
                  Export CSV
                </button>
                <button class="px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold hover:bg-slate-50" @click="toast('Schedule weekly pack (demo)')">
                  Schedule weekly pack
                </button>
              </div>
            </div>

            <div class="bg-white border border-slate-200 rounded-2xl p-5">
              <p class="text-sm font-semibold text-slate-900">Report preview (table)</p>
              <div class="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div class="grid grid-cols-12 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                  <div class="col-span-3 p-3">Decision</div>
                  <div class="col-span-3 p-3">Policy</div>
                  <div class="col-span-2 p-3">Amount</div>
                  <div class="col-span-2 p-3">Outcome</div>
                  <div class="col-span-2 p-3">Evidence</div>
                </div>
                <div class="divide-y divide-slate-200 text-sm">
                  <div class="grid grid-cols-12">
                    <div class="col-span-3 p-3 font-semibold">DEC-3921</div>
                    <div class="col-span-3 p-3 text-slate-600">v1.8</div>
                    <div class="col-span-2 p-3">{{ formatTHB(2450000) }}</div>
                    <div class="col-span-2 p-3">
                      <span class="text-[11px] px-2 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold">
                        Approved
                      </span>
                    </div>
                    <div class="col-span-2 p-3">
                      <button class="text-sm font-semibold text-slate-900 hover:underline" @click="toast('Open citations (demo)')">
                        3 links
                      </button>
                    </div>
                  </div>
                  <div class="grid grid-cols-12">
                    <div class="col-span-3 p-3 font-semibold">DEC-3922</div>
                    <div class="col-span-3 p-3 text-slate-600">v1.8</div>
                    <div class="col-span-2 p-3">{{ formatTHB(1320000) }}</div>
                    <div class="col-span-2 p-3">
                      <span class="text-[11px] px-2 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 font-semibold">
                        Rejected
                      </span>
                    </div>
                    <div class="col-span-2 p-3">
                      <button class="text-sm font-semibold text-slate-900 hover:underline" @click="toast('Open citations (demo)')">
                        2 links
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section v-else class="space-y-6">
            <!-- ADMIN hub: tabs -->
            <div class="bg-white border border-slate-200 rounded-2xl p-3">
              <div class="flex flex-wrap items-center gap-2">
                <button
                  v-for="t in adminTabs"
                  :key="t.key"
                  class="px-3 py-2 rounded-xl text-sm font-semibold border transition"
                  :class="tabBtnClass(t.key)"
                  @click="adminTab = t.key"
                >
                  {{ t.label }}
                </button>
              </div>
            </div>

            <!-- Admin: Policies -->
            <div v-if="adminTab === 'policies'" class="grid grid-cols-1 xl:grid-cols-12 gap-4">
              <div class="xl:col-span-8 bg-white border border-slate-200 rounded-2xl p-5">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <p class="text-sm font-semibold text-slate-900">Decision Policy</p>
                    <p class="text-sm text-slate-600 mt-1">
                      Draft → review → publish with versioning. Policy controls AI behavior.
                    </p>
                  </div>
                  <button class="px-3 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800" @click="toast('Create new policy draft (demo)')">
                    + New draft
                  </button>
                </div>

                <div class="mt-4 overflow-hidden rounded-xl border border-slate-200">
                  <div class="grid grid-cols-12 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                    <div class="col-span-4 p-3">Policy</div>
                    <div class="col-span-2 p-3">Version</div>
                    <div class="col-span-2 p-3">Status</div>
                    <div class="col-span-2 p-3">Owner</div>
                    <div class="col-span-2 p-3">Actions</div>
                  </div>
                  <div class="divide-y divide-slate-200 text-sm bg-white">
                    <div class="grid grid-cols-12 items-center">
                      <div class="col-span-4 p-3">
                        <p class="font-semibold text-slate-900">Contract Compliance</p>
                        <p class="text-xs text-slate-500">Clause match, price cap, vendor terms</p>
                      </div>
                      <div class="col-span-2 p-3 font-semibold">v1.8</div>
                      <div class="col-span-2 p-3">
                        <span class="text-[11px] px-2 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold">Published</span>
                      </div>
                      <div class="col-span-2 p-3 text-slate-600">Head of IT</div>
                      <div class="col-span-2 p-3">
                        <button class="text-sm font-semibold text-slate-900 hover:underline" @click="toast('Open policy (demo)')">Open</button>
                      </div>
                    </div>

                    <div class="grid grid-cols-12 items-center">
                      <div class="col-span-4 p-3">
                        <p class="font-semibold text-slate-900">Approval Thresholds</p>
                        <p class="text-xs text-slate-500">Authority limits, escalation paths</p>
                      </div>
                      <div class="col-span-2 p-3 font-semibold">v1.9</div>
                      <div class="col-span-2 p-3">
                        <span class="text-[11px] px-2 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 font-semibold">Draft</span>
                      </div>
                      <div class="col-span-2 p-3 text-slate-600">CFO Office</div>
                      <div class="col-span-2 p-3 flex items-center gap-3">
                        <button class="text-sm font-semibold text-slate-900 hover:underline" @click="toast('Review draft (demo)')">Review</button>
                        <button class="text-sm font-semibold text-red-600 hover:underline" @click="toast('Publish draft (demo)')">Publish</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-4">
                  <p class="text-xs uppercase tracking-wide text-slate-500 font-semibold">Enterprise control</p>
                  <p class="mt-1 text-sm text-slate-700">
                    Policies are versioned and attached to every decision — enabling defensible approvals and clean audits.
                  </p>
                </div>
              </div>

              <div class="xl:col-span-4 bg-white border border-slate-200 rounded-2xl p-5">
                <p class="text-sm font-semibold text-slate-900">Policy editor (preview)</p>
                <p class="text-sm text-slate-600 mt-1">Human-readable rules (no technical knobs).</p>

                <div class="mt-4 space-y-3">
                  <RuleEditorCard
                    title="Authority threshold"
                    rule="If amount > ฿1,000,000 → CFO approval required"
                    tone="red"
                  />
                  <RuleEditorCard
                    title="Evidence requirement"
                    rule="Contract mismatch must include clause citation"
                    tone="emerald"
                  />
                  <RuleEditorCard
                    title="Override behavior"
                    rule="Emergency override requires explicit reason + audit entry"
                    tone="slate"
                  />
                </div>

                <div class="mt-4 flex gap-2">
                  <button class="flex-1 px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold hover:bg-slate-50" @click="toast('Validate rules (demo)')">
                    Validate
                  </button>
                  <button class="flex-1 px-3 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800" @click="toast('Save draft (demo)')">
                    Save draft
                  </button>
                </div>
              </div>
            </div>

            <!-- Admin: Knowledge -->
            <div v-else-if="adminTab === 'knowledge'" class="grid grid-cols-1 xl:grid-cols-12 gap-4">
              <div class="xl:col-span-8 bg-white border border-slate-200 rounded-2xl p-5">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <p class="text-sm font-semibold text-slate-900">RAG Documents (Evidence Store)</p>
                    <p class="text-sm text-slate-600 mt-1">
                      Manage allowed sources: contracts, SOPs, policies. Track versions and access control.
                    </p>
                  </div>
                  <button class="px-3 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800" @click="toast('Upload document (demo)')">
                    + Upload
                  </button>
                </div>

                <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <DocCard title="Contracts" meta="12 files · versioned" tag="Allowed source" />
                  <DocCard title="SOP / Work Instructions" meta="18 files · curated" tag="Allowed source" />
                  <DocCard title="Policies & Memos" meta="9 files · approved" tag="Allowed source" />
                </div>

                <div class="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <div class="grid grid-cols-12 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                    <div class="col-span-5 p-3">Document</div>
                    <div class="col-span-2 p-3">Type</div>
                    <div class="col-span-2 p-3">Version</div>
                    <div class="col-span-3 p-3">Status</div>
                  </div>
                  <div class="divide-y divide-slate-200 text-sm">
                    <div class="grid grid-cols-12 items-center">
                      <div class="col-span-5 p-3">
                        <p class="font-semibold text-slate-900">Contract: Office Supply 2024</p>
                        <p class="text-xs text-slate-500">PDF · clauses indexed</p>
                      </div>
                      <div class="col-span-2 p-3 text-slate-600">Contract</div>
                      <div class="col-span-2 p-3 font-semibold">v3</div>
                      <div class="col-span-3 p-3">
                        <span class="text-[11px] px-2 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold">Active</span>
                        <button class="ml-2 text-sm font-semibold text-slate-900 hover:underline" @click="toast('Open doc (demo)')">Open</button>
                      </div>
                    </div>

                    <div class="grid grid-cols-12 items-center">
                      <div class="col-span-5 p-3">
                        <p class="font-semibold text-slate-900">SOP: Approval Matrix</p>
                        <p class="text-xs text-slate-500">PDF · thresholds highlighted</p>
                      </div>
                      <div class="col-span-2 p-3 text-slate-600">SOP</div>
                      <div class="col-span-2 p-3 font-semibold">v5</div>
                      <div class="col-span-3 p-3">
                        <span class="text-[11px] px-2 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-700 font-semibold">Pending review</span>
                        <button class="ml-2 text-sm font-semibold text-slate-900 hover:underline" @click="toast('Review doc (demo)')">Review</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-4">
                  <p class="text-xs uppercase tracking-wide text-slate-500 font-semibold">Governance rule</p>
                  <p class="mt-1 text-sm text-slate-700">
                    Only approved sources are retrievable. This prevents “random answers” and keeps decisions defensible.
                  </p>
                </div>
              </div>

              <div class="xl:col-span-4 bg-white border border-slate-200 rounded-2xl p-5">
                <p class="text-sm font-semibold text-slate-900">Source controls</p>
                <p class="text-sm text-slate-600 mt-1">Define what the system is allowed to use.</p>

                <div class="mt-4 space-y-3">
                  <ToggleRow label="Allow external URLs" desc="Disabled for enterprise safety" :on="false" />
                  <ToggleRow label="Require citations for recommendations" desc="Always on" :on="true" />
                  <ToggleRow label="Document update workflow" desc="Draft → review → activate" :on="true" />
                </div>

                <button class="mt-4 w-full px-3 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800" @click="toast('Save controls (demo)')">
                  Save controls
                </button>
              </div>
            </div>

            <!-- Admin: Users -->
            <div v-else-if="adminTab === 'users'" class="grid grid-cols-1 xl:grid-cols-12 gap-4">
              <div class="xl:col-span-8 bg-white border border-slate-200 rounded-2xl p-5">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <p class="text-sm font-semibold text-slate-900">Users & roles</p>
                    <p class="text-sm text-slate-600 mt-1">Separation of duties: who can approve what, and why.</p>
                  </div>
                  <button class="px-3 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800" @click="toast('Add user (demo)')">
                    + Add user
                  </button>
                </div>

                <div class="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <div class="grid grid-cols-12 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                    <div class="col-span-4 p-3">User</div>
                    <div class="col-span-3 p-3">Role</div>
                    <div class="col-span-3 p-3">Authority</div>
                    <div class="col-span-2 p-3">Status</div>
                  </div>
                  <div class="divide-y divide-slate-200 text-sm">
                    <UserRow name="CFO Office" role="Approver" auth="Up to ฿10,000,000" status="Active" />
                    <UserRow name="Procurement Lead" role="Operator" auth="Request / review" status="Active" />
                    <UserRow name="Audit Team" role="Audit" auth="Read / export" status="Active" />
                  </div>
                </div>
              </div>

              <div class="xl:col-span-4 bg-white border border-slate-200 rounded-2xl p-5">
                <p class="text-sm font-semibold text-slate-900">Role templates</p>
                <p class="text-sm text-slate-600 mt-1">Use presets for fast rollout.</p>

                <div class="mt-4 space-y-3">
                  <PresetCard title="Approver (CFO/COO)" desc="Approve/reject, view evidence, export reports" />
                  <PresetCard title="Operator (Ops)" desc="Manage cases, request info, escalate" />
                  <PresetCard title="Audit / Risk" desc="Read-only with export packs and traceability" />
                </div>

                <button class="mt-4 w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold hover:bg-slate-50" @click="toast('Apply templates (demo)')">
                  Apply templates
                </button>
              </div>
            </div>

            <!-- Admin: Integrations -->
            <div v-else class="grid grid-cols-1 xl:grid-cols-12 gap-4">
              <div class="xl:col-span-8 bg-white border border-slate-200 rounded-2xl p-5">
                <p class="text-sm font-semibold text-slate-900">Integrations & health</p>
                <p class="text-sm text-slate-600 mt-1">ERP, procurement systems, document stores, event logs.</p>

                <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <IntegrationCard name="ERP / Finance" status="Healthy" note="Sync every 15 minutes" />
                  <IntegrationCard name="Contracts repository" status="Healthy" note="12 sources allowed" />
                  <IntegrationCard name="Workflow events / logs" status="Degraded" note="Latency spike (2m)" />
                  <IntegrationCard name="Email / Notifications" status="Healthy" note="Escalations enabled" />
                </div>

                <div class="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-4">
                  <p class="text-xs uppercase tracking-wide text-slate-500 font-semibold">Boundary clarity</p>
                  <p class="mt-1 text-sm text-slate-700">
                    TH8 consumes authoritative data and produces decisions + audit logs. It does not replace ERP.
                  </p>
                </div>
              </div>

              <div class="xl:col-span-4 bg-white border border-slate-200 rounded-2xl p-5">
                <p class="text-sm font-semibold text-slate-900">Operational controls</p>
                <p class="text-sm text-slate-600 mt-1">Safe rollout settings.</p>

                <div class="mt-4 space-y-3">
                  <ToggleRow label="Auto decisions" desc="Start manual → move to guarded auto" :on="false" />
                  <ToggleRow label="Escalations" desc="Notify approvers on SLA risk" :on="true" />
                  <ToggleRow label="Immutable audit logs" desc="Always on" :on="true" />
                </div>

                <button class="mt-4 w-full px-3 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800" @click="toast('Run health check (demo)')">
                  Run health check
                </button>
              </div>
            </div>
          </section>

          <!-- Toast -->
          <div v-if="toastMsg" class="fixed bottom-4 right-4 z-50">
            <div class="bg-slate-900 text-white rounded-2xl px-4 py-3 shadow-lg border border-white/10 max-w-sm">
              <p class="text-xs uppercase tracking-wide text-slate-300 font-semibold">Demo</p>
              <p class="mt-1 text-sm">{{ toastMsg }}</p>
            </div>
          </div>
        </main>
      </div>
    </div>

    <!-- Simple click-away backdrop for mobile sidebar -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black/20 z-30 lg:hidden"
      @click="sidebarOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, h, ref, watch } from "vue";

type NavKey =
  | "dashboard"
  | "cases"
  | "decisions"
  | "insights"
  | "reports"
  | "admin";

type AdminTabKey = "policies" | "knowledge" | "users" | "integrations";

const sidebarOpen = ref(false);
const showQuickActions = ref(false);

const q = ref("");
const caseFilter = ref<"all" | "pending" | "in_review" | "resolved">("all");

const active = ref<NavKey>("dashboard");
const adminTab = ref<AdminTabKey>("policies");
const toastMsg = ref("");

const primaryNav = [
  {
    key: "dashboard" as NavKey,
    label: "Dashboard",
    caption: "Executive visibility & hotspots",
    badge: "Exec",
    badgeClass: "bg-slate-900 text-white border border-slate-900",
  },
  {
    key: "cases" as NavKey,
    label: "Cases",
    caption: "Portfolio · drill-down · evidence",
    badge: "Ops",
    badgeClass: "bg-slate-50 text-slate-700 border border-slate-200",
  },
  {
    key: "decisions" as NavKey,
    label: "Decisions",
    caption: "Approval queue with guardrails",
    badge: "Approver",
    badgeClass: "bg-red-50 text-red-700 border border-red-200",
  },
  {
    key: "insights" as NavKey,
    label: "Insights",
    caption: "What changed & why",
    badge: "Exec",
    badgeClass: "bg-slate-50 text-slate-700 border border-slate-200",
  },
  {
    key: "reports" as NavKey,
    label: "Reports",
    caption: "Audit packs & exports",
    badge: "Audit",
    badgeClass: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  },
];

const adminNav = [
  {
    key: "admin" as NavKey,
    label: "Admin",
    caption: "Policy · RAG · Roles · Integrations",
    badge: "IT",
    badgeClass: "bg-slate-50 text-slate-700 border border-slate-200",
  },
];

const adminTabs = [
  { key: "policies" as AdminTabKey, label: "Decision Policy" },
  { key: "knowledge" as AdminTabKey, label: "RAG Documents" },
  { key: "users" as AdminTabKey, label: "Users & Roles" },
  { key: "integrations" as AdminTabKey, label: "Integrations" },
];

watch(active, (v) => {
  showQuickActions.value = false;
  if (v !== "admin") adminTab.value = "policies";
});

function navBtnClass(key: NavKey) {
  const isActive = active.value === key;
  return isActive
    ? "border-slate-900 bg-slate-50"
    : "border-slate-200 bg-white hover:bg-slate-50";
}

function tabBtnClass(key: AdminTabKey) {
  const isActive = adminTab.value === key;
  return isActive
    ? "border-slate-900 bg-slate-900 text-white"
    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50";
}

function toast(msg: string) {
  toastMsg.value = msg;
  window.clearTimeout((toast as any)._t);
  (toast as any)._t = window.setTimeout(() => (toastMsg.value = ""), 2600);
}

function jump(tab: AdminTabKey) {
  active.value = "admin";
  adminTab.value = tab;
  showQuickActions.value = false;
  toast(`Jumped to Admin → ${adminTabs.find((t) => t.key === tab)?.label}`);
}

function openCreateCase() {
  toast("Create case (demo) — in real app: open create-case modal");
}

const pageKicker = computed(() => {
  if (active.value === "admin") return "Admin & Governance";
  if (active.value === "dashboard") return "Executive dashboard";
  if (active.value === "cases") return "Case management";
  if (active.value === "decisions") return "Approval flow";
  if (active.value === "insights") return "Executive insights";
  return "Audit & reporting";
});

const pageTitle = computed(() => {
  if (active.value === "admin") return "Admin Console";
  if (active.value === "dashboard") return "Dashboard";
  if (active.value === "cases") return "Cases";
  if (active.value === "decisions") return "Decisions";
  if (active.value === "insights") return "Insights";
  return "Reports";
});

const pageSubtitle = computed(() => {
  if (active.value === "dashboard")
    return "High-level exposure (THB), SLA risk, and what needs attention today — linked to evidence.";
  if (active.value === "cases")
    return "Portfolio and drill-down with audit timeline and evidence links — traceable by design.";
  if (active.value === "decisions")
    return "Approve/reject decisions under policy guardrails — with justification and evidence links.";
  if (active.value === "insights")
    return "Explain what changed and why, then recommend actions aligned to policy.";
  if (active.value === "reports")
    return "Generate audit packs: decision logs, policy versions, and evidence references in minutes.";
  return "Control policy, evidence sources (RAG), roles, and integrations — without technical complexity.";
});

function formatTHB(value: number) {
  try {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `฿${Math.round(value).toLocaleString("en-US")}`;
  }
}

/* -------------------------
   Small local components
   ------------------------- */

const KpiCard = defineComponent({
  props: {
    title: { type: String, required: true },
    value: { type: String, required: true },
    trend: { type: String, required: true },
  },
  setup(props) {
    return () =>
      h("div", { class: "bg-white border border-slate-200 rounded-2xl p-5" }, [
        h("p", { class: "text-xs uppercase tracking-wide text-slate-500 font-semibold" }, props.title),
        h("p", { class: "mt-2 text-2xl font-semibold text-slate-900" }, props.value),
        h("p", { class: "mt-1 text-sm text-slate-600" }, props.trend),
      ]);
  },
});

const QueueRow = defineComponent({
  emits: ["open"],
  props: {
    id: { type: String, required: true },
    vendor: { type: String, required: true },
    amount: { type: Number, required: true },
    risk: { type: String, required: true },
    sla: { type: String, required: true },
  },
  setup(props) {
    const riskPill = computed(() =>
      props.risk === "High"
        ? "bg-red-50 border-red-200 text-red-700"
        : "bg-slate-50 border-slate-200 text-slate-700"
    );
    return () =>
      h("div", { class: "rounded-xl border border-slate-200 bg-white p-4 flex items-start justify-between gap-4" }, [
        h("div", { class: "min-w-0" }, [
          h("p", { class: "text-sm font-semibold text-slate-900" }, `${props.id} · ${props.vendor}`),
          h("p", { class: "mt-1 text-sm text-slate-600" }, `Amount: ${formatTHB(props.amount)} · SLA: ${props.sla}`),
        ]),
        h("div", { class: "shrink-0 flex items-center gap-2" }, [
          h("span", { class: `text-[11px] px-2 py-1 rounded-full border font-semibold ${riskPill.value}` }, props.risk),
          h(
            "button",
            {
              class: "px-3 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800",
              onClick: () => (toastMsg.value = `Open ${props.id} (demo)`),
            },
            "Open"
          ),
        ]),
      ]);
  },
});

const HotspotRow = defineComponent({
  props: {
    label: { type: String, required: true },
    value: { type: String, required: true },
    tone: { type: String, required: true },
  },
  setup(props) {
    const pill = computed(() => {
      if (props.tone === "red") return "bg-red-50 border-red-200 text-red-700";
      if (props.tone === "amber") return "bg-amber-50 border-amber-200 text-amber-800";
      return "bg-slate-50 border-slate-200 text-slate-700";
    });
    return () =>
      h("div", { class: "flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4" }, [
        h("p", { class: "text-sm font-semibold text-slate-900" }, props.label),
        h("span", { class: `text-[11px] px-2 py-1 rounded-full border font-semibold ${pill.value}` }, props.value),
      ]);
  },
});

const CaseRow = defineComponent({
  emits: ["open"],
  props: {
    id: { type: String, required: true },
    vendor: { type: String, required: true },
    amount: { type: Number, required: true },
    risk: { type: String, required: true },
    sla: { type: String, required: true },
  },
  setup(props, { emit }) {
    const riskPill = computed(() =>
      props.risk === "High"
        ? "bg-red-50 border-red-200 text-red-700"
        : props.risk === "Medium"
        ? "bg-amber-50 border-amber-200 text-amber-800"
        : "bg-slate-50 border-slate-200 text-slate-700"
    );
    return () =>
      h(
        "button",
        {
          class: "w-full grid grid-cols-12 text-left hover:bg-slate-50",
          onClick: () => emit("open"),
        },
        [
          h("div", { class: "col-span-3 p-3 font-semibold text-slate-900" }, props.id),
          h("div", { class: "col-span-3 p-3 text-slate-600" }, props.vendor),
          h("div", { class: "col-span-2 p-3" }, formatTHB(props.amount)),
          h("div", { class: "col-span-2 p-3" }, [
            h("span", { class: `text-[11px] px-2 py-1 rounded-full border font-semibold ${riskPill.value}` }, props.risk),
          ]),
          h("div", { class: "col-span-2 p-3 text-slate-600" }, props.sla),
        ]
      );
  },
});

const TimelineItem = defineComponent({
  props: {
    when: { type: String, required: true },
    who: { type: String, required: true },
    what: { type: String, required: true },
  },
  setup(props) {
    return () =>
      h("div", { class: "flex items-start gap-3" }, [
        h("div", { class: "shrink-0 w-14 text-xs text-slate-500 font-semibold" }, props.when),
        h("div", { class: "min-w-0" }, [
          h("p", { class: "text-sm font-semibold text-slate-900" }, props.who),
          h("p", { class: "text-sm text-slate-600 mt-0.5" }, props.what),
        ]),
      ]);
  },
});

const EvidenceRow = defineComponent({
  props: {
    title: { type: String, required: true },
    meta: { type: String, required: true },
    tag: { type: String, required: true },
  },
  setup(props) {
    return () =>
      h("div", { class: "rounded-xl border border-slate-200 bg-white p-4 flex items-start justify-between gap-3" }, [
        h("div", { class: "min-w-0" }, [
          h("p", { class: "text-sm font-semibold text-slate-900 truncate" }, props.title),
          h("p", { class: "text-xs text-slate-500 mt-1" }, props.meta),
        ]),
        h("span", { class: "shrink-0 text-[11px] px-2 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold" }, props.tag),
      ]);
  },
});

const DecisionCard = defineComponent({
  emits: ["approve", "reject", "openEvidence"],
  props: {
    id: { type: String, required: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    risk: { type: String, required: true },
    policy: { type: String, required: true },
  },
  setup(props, { emit }) {
    return () =>
      h("div", { class: "rounded-2xl border border-slate-200 bg-white p-5" }, [
        h("div", { class: "flex items-start justify-between gap-4" }, [
          h("div", { class: "min-w-0" }, [
            h("p", { class: "text-sm font-semibold text-slate-900" }, `${props.id} · ${props.title}`),
            h("p", { class: "mt-1 text-sm text-slate-600" }, `Amount: ${formatTHB(props.amount)} · Risk: ${props.risk}`),
            h("p", { class: "mt-2 text-xs text-slate-500" }, `Policy: ${props.policy}`),
          ]),
          h("span", { class: "shrink-0 text-[11px] px-2 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 font-semibold" }, props.risk),
        ]),
        h("div", { class: "mt-4 flex flex-wrap gap-2" }, [
          h(
            "button",
            { class: "px-3 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800", onClick: () => emit("approve") },
            "Approve"
          ),
          h(
            "button",
            { class: "px-3 py-2 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-500", onClick: () => emit("reject") },
            "Reject"
          ),
          h(
            "button",
            { class: "px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold hover:bg-slate-50", onClick: () => emit("openEvidence") },
            "Evidence links"
          ),
        ]),
      ]);
  },
});

const RuleRow = defineComponent({
  props: {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    tone: { type: String, required: true },
  },
  setup(props) {
    const cls = computed(() => {
      if (props.tone === "red") return "bg-red-50 border-red-200";
      if (props.tone === "emerald") return "bg-emerald-50 border-emerald-200";
      return "bg-slate-50 border-slate-200";
    });
    return () =>
      h("div", { class: `rounded-xl border p-4 ${cls.value}` }, [
        h("p", { class: "text-sm font-semibold text-slate-900" }, props.title),
        h("p", { class: "mt-1 text-sm text-slate-700" }, props.desc),
      ]);
  },
});

const RuleEditorCard = defineComponent({
  props: {
    title: { type: String, required: true },
    rule: { type: String, required: true },
    tone: { type: String, required: true },
  },
  setup(props) {
    const cls = computed(() => {
      if (props.tone === "red") return "bg-red-50 border-red-200";
      if (props.tone === "emerald") return "bg-emerald-50 border-emerald-200";
      return "bg-slate-50 border-slate-200";
    });
    return () =>
      h("div", { class: `rounded-xl border p-4 ${cls.value}` }, [
        h("p", { class: "text-xs uppercase tracking-wide text-slate-500 font-semibold" }, props.title),
        h("p", { class: "mt-1 text-sm font-semibold text-slate-900" }, props.rule),
      ]);
  },
});

const ToggleRow = defineComponent({
  props: {
    label: { type: String, required: true },
    desc: { type: String, required: true },
    on: { type: Boolean, required: true },
  },
  setup(props) {
    return () =>
      h("div", { class: "rounded-xl border border-slate-200 bg-white p-4 flex items-start justify-between gap-4" }, [
        h("div", { class: "min-w-0" }, [
          h("p", { class: "text-sm font-semibold text-slate-900" }, props.label),
          h("p", { class: "mt-1 text-sm text-slate-600" }, props.desc),
        ]),
        h("div", { class: "shrink-0" }, [
          h(
            "span",
            {
              class:
                "inline-flex items-center px-2 py-1 rounded-full text-[11px] font-semibold border " +
                (props.on ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-slate-50 border-slate-200 text-slate-700"),
            },
            props.on ? "ON" : "OFF"
          ),
        ]),
      ]);
  },
});

const DocCard = defineComponent({
  props: {
    title: { type: String, required: true },
    meta: { type: String, required: true },
    tag: { type: String, required: true },
  },
  setup(props) {
    return () =>
      h("div", { class: "rounded-2xl border border-slate-200 bg-white p-5" }, [
        h("p", { class: "text-sm font-semibold text-slate-900" }, props.title),
        h("p", { class: "mt-1 text-sm text-slate-600" }, props.meta),
        h("div", { class: "mt-3" }, [
          h("span", { class: "text-[11px] px-2 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold" }, props.tag),
        ]),
      ]);
  },
});

const ReportCard = defineComponent({
  props: {
    title: { type: String, required: true },
    desc: { type: String, required: true },
  },
  setup(props) {
    return () =>
      h("div", { class: "rounded-2xl border border-slate-200 bg-white p-5" }, [
        h("p", { class: "text-sm font-semibold text-slate-900" }, props.title),
        h("p", { class: "mt-1 text-sm text-slate-600" }, props.desc),
        h("button", { class: "mt-3 text-sm font-semibold text-slate-900 hover:underline", onClick: () => toastMsg.value = `${props.title}: preview (demo)` }, "Preview"),
      ]);
  },
});

const UserRow = defineComponent({
  props: {
    name: { type: String, required: true },
    role: { type: String, required: true },
    auth: { type: String, required: true },
    status: { type: String, required: true },
  },
  setup(props) {
    return () =>
      h("div", { class: "grid grid-cols-12 items-center" }, [
        h("div", { class: "col-span-4 p-3" }, [
          h("p", { class: "font-semibold text-slate-900" }, props.name),
          h("p", { class: "text-xs text-slate-500" }, "role-based access"),
        ]),
        h("div", { class: "col-span-3 p-3 text-slate-600" }, props.role),
        h("div", { class: "col-span-3 p-3 text-slate-600" }, props.auth),
        h("div", { class: "col-span-2 p-3" }, [
          h("span", { class: "text-[11px] px-2 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold" }, props.status),
        ]),
      ]);
  },
});

const PresetCard = defineComponent({
  props: {
    title: { type: String, required: true },
    desc: { type: String, required: true },
  },
  setup(props) {
    return () =>
      h("div", { class: "rounded-2xl border border-slate-200 bg-white p-5" }, [
        h("p", { class: "text-sm font-semibold text-slate-900" }, props.title),
        h("p", { class: "mt-1 text-sm text-slate-600" }, props.desc),
      ]);
  },
});

const IntegrationCard = defineComponent({
  props: {
    name: { type: String, required: true },
    status: { type: String, required: true },
    note: { type: String, required: true },
  },
  setup(props) {
    const pill = computed(() => {
      if (props.status === "Healthy") return "bg-emerald-50 border-emerald-200 text-emerald-700";
      if (props.status === "Degraded") return "bg-amber-50 border-amber-200 text-amber-800";
      return "bg-red-50 border-red-200 text-red-700";
    });
    return () =>
      h("div", { class: "rounded-2xl border border-slate-200 bg-white p-5 flex items-start justify-between gap-4" }, [
        h("div", { class: "min-w-0" }, [
          h("p", { class: "text-sm font-semibold text-slate-900" }, props.name),
          h("p", { class: "mt-1 text-sm text-slate-600" }, props.note),
        ]),
        h("span", { class: `shrink-0 text-[11px] px-2 py-1 rounded-full border font-semibold ${pill.value}` }, props.status),
      ]);
  },
});

const InsightCard = defineComponent({
  props: {
    title: { type: String, required: true },
    value: { type: String, required: true },
    note: { type: String, required: true },
  },
  setup(props) {
    return () =>
      h("div", { class: "rounded-2xl border border-slate-200 bg-white p-5" }, [
        h("p", { class: "text-xs uppercase tracking-wide text-slate-500 font-semibold" }, props.title),
        h("p", { class: "mt-2 text-xl font-semibold text-slate-900" }, props.value),
        h("p", { class: "mt-1 text-sm text-slate-600" }, props.note),
      ]);
  },
});

const ActionRow = defineComponent({
  props: {
    title: { type: String, required: true },
    desc: { type: String, required: true },
  },
  setup(props) {
    return () =>
      h("div", { class: "rounded-xl border border-slate-200 bg-white p-4 flex items-start justify-between gap-3" }, [
        h("div", { class: "min-w-0" }, [
          h("p", { class: "text-sm font-semibold text-slate-900" }, props.title),
          h("p", { class: "mt-1 text-sm text-slate-600" }, props.desc),
        ]),
        h("button", { class: "shrink-0 px-3 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800", onClick: () => toastMsg.value = `${props.title} (demo)` }, "Run"),
      ]);
  },
});
</script>
