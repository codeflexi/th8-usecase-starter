<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 font-prompt">
    <!-- ================= Topbar ================= -->
    <header class="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
      <div class="mx-auto max-w-[1400px] px-4">
        <div class="h-14 flex items-center justify-between gap-3">
          <!-- Brand + Search -->
          <div class="flex items-center gap-3 min-w-0">
            <button
              class="lg:hidden h-9 w-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-50"
              @click="sidebarOpen = !sidebarOpen"
            >
              ≡
            </button>

            <div class="flex items-center gap-2 min-w-0">
              <div class="h-9 w-9 rounded-xl bg-slate-900 flex items-center justify-center">
                <span class="text-white text-xs font-bold">TH8</span>
              </div>
              <div class="min-w-0">
                <p class="text-[11px] uppercase tracking-wide text-red-600 font-semibold">
                  TH8.AI · ศูนย์กลางการตัดสินใจองค์กร
                </p>
                <p class="text-sm font-semibold truncate">
                  ระบบบริหารการตัดสินใจ (สำหรับลูกค้าองค์กร)
                </p>
              </div>
            </div>

            <div class="hidden md:flex items-center gap-2 ml-6">
              <input
                v-model="q"
                type="text"
                placeholder="ค้นหาเคส, คู่ค้า, นโยบาย, เอกสารอ้างอิง…"
                class="w-[420px] max-w-[40vw] px-4 py-2 rounded-xl border border-slate-200 text-sm"
              />
              <button
                class="px-3 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold"
                @click="toast(`ค้นหา: ${q || '…'} (demo)`)"
              >
                ค้นหา
              </button>
            </div>
          </div>

          <!-- Right -->
          <div class="flex items-center gap-3">
            <button
              class="px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold"
              @click="toast('สร้างเคสใหม่ (demo)')"
            >
              + สร้างเคส
            </button>

            <button
              class="h-10 w-10 rounded-xl border border-slate-200 bg-white"
              @click="toast('การแจ้งเตือน (demo)')"
            >
              🔔
            </button>

            <div class="hidden sm:flex items-center gap-2">
              <div class="text-right">
                <p class="text-sm font-semibold">ผู้ดูแลระบบลูกค้า</p>
                <p class="text-xs text-slate-500">CFO / Head of IT</p>
              </div>
              <div class="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                CA
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- ================= Layout ================= -->
    <div class="mx-auto max-w-[1400px] px-4">
      <div class="grid grid-cols-12 gap-6 py-6">
        <!-- Sidebar -->
        <aside class="col-span-12 lg:col-span-3 xl:col-span-2">
          <div class="bg-white border border-slate-200 rounded-2xl p-3 sticky top-20">
            <p class="px-2 py-2 text-xs uppercase tracking-wide text-slate-500 font-semibold">
              เมนูหลัก
            </p>

            <div class="space-y-1">
              <button
                v-for="item in primaryNav"
                :key="item.key"
                class="w-full text-left px-3 py-3 rounded-xl border"
                :class="navBtnClass(item.key)"
                @click="active = item.key"
              >
                <p class="text-sm font-semibold">{{ item.label }}</p>
                <p class="text-xs text-slate-500 mt-1">{{ item.caption }}</p>
              </button>
            </div>

            <div class="mt-4 border-t pt-4">
              <p class="px-2 text-xs uppercase tracking-wide text-slate-500 font-semibold">
                การกำกับดูแลระบบ
              </p>
              <button
                class="mt-2 w-full text-left px-3 py-3 rounded-xl border"
                :class="navBtnClass('admin')"
                @click="active = 'admin'"
              >
                <p class="text-sm font-semibold">ตั้งค่าการควบคุมระบบ</p>
                <p class="text-xs text-slate-500 mt-1">
                  นโยบาย · เอกสารอ้างอิง · สิทธิผู้ใช้งาน · การเชื่อมต่อระบบ
                </p>
              </button>
            </div>

            <div class="mt-4 rounded-xl bg-slate-50 border p-3">
              <p class="text-xs font-semibold text-slate-500 uppercase">
                หลักการองค์กร
              </p>
              <p class="text-sm mt-1 text-slate-700">
                ทุกการตัดสินใจต้องอ้างอิงนโยบาย มีเอกสารประกอบ และตรวจสอบย้อนหลังได้
              </p>
            </div>
          </div>
        </aside>

        <!-- ================= Main ================= -->
        <main class="col-span-12 lg:col-span-9 xl:col-span-10 space-y-6">
          <!-- Header -->
          <div>
            <p class="text-xs uppercase tracking-wide text-red-600 font-semibold">
              {{ pageKicker }}
            </p>
            <h1 class="text-2xl md:text-3xl font-semibold">
              {{ pageTitle }}
            </h1>
            <p class="text-sm text-slate-600 mt-1">
              {{ pageSubtitle }}
            </p>
          </div>

          <!-- Dashboard -->
          <section v-if="active === 'dashboard'" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <KpiCard title="มูลค่าความเสี่ยง (บาท)" value="฿12,850,000" trend="เพิ่มขึ้นจากสัปดาห์ก่อน" />
            <KpiCard title="รายการรอการตัดสินใจ" value="12 เคส" trend="ต้องพิจารณาวันนี้" />
            <KpiCard title="ความเสี่ยงผิด SLA" value="6 เคส" trend="ภายใน 24 ชม." />
            <KpiCard title="การปฏิบัติตามนโยบาย" value="98.7%" trend="ตรวจสอบย้อนหลังได้ทั้งหมด" />
          </section>

          <!-- Placeholder for other sections -->
          <section v-else class="bg-white border border-slate-200 rounded-2xl p-6">
            <p class="text-sm font-semibold">โหมดสาธิต (Demo)</p>
            <p class="text-sm text-slate-600 mt-1">
              ส่วนนี้ใช้แสดงแนวคิดสินค้าและบริการของ TH8.AI สำหรับลูกค้าองค์กร
            </p>
          </section>
        </main>
      </div>
    </div>

    <!-- Toast -->
    <div v-if="toastMsg" class="fixed bottom-4 right-4 z-50">
      <div class="bg-slate-900 text-white rounded-2xl px-4 py-3 shadow-lg">
        <p class="text-sm">{{ toastMsg }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, defineComponent, h } from "vue";

type NavKey = "dashboard" | "cases" | "decisions" | "insights" | "reports" | "admin";

const sidebarOpen = ref(false);
const q = ref("");
const active = ref<NavKey>("dashboard");
const toastMsg = ref("");

const primaryNav = [
  { key: "dashboard", label: "ภาพรวมผู้บริหาร", caption: "ความเสี่ยง เงิน และงานที่ต้องตัดสินใจ" },
  { key: "cases", label: "รายการเคสงาน", caption: "ติดตามงานพร้อมเอกสารอ้างอิง" },
  { key: "decisions", label: "รอการตัดสินใจ", caption: "อนุมัติตามนโยบายองค์กร" },
  { key: "insights", label: "บทวิเคราะห์ผู้บริหาร", caption: "เกิดอะไรขึ้น และควรทำอะไรต่อ" },
  { key: "reports", label: "รายงานและการตรวจสอบ", caption: "เอกสารสำหรับบอร์ดและผู้ตรวจสอบ" },
];

function navBtnClass(key: NavKey) {
  return active.value === key
    ? "border-slate-900 bg-slate-50"
    : "border-slate-200 bg-white hover:bg-slate-50";
}

function toast(msg: string) {
  toastMsg.value = msg;
  setTimeout(() => (toastMsg.value = ""), 2500);
}

const pageKicker = computed(() => {
  if (active.value === "dashboard") return "แดชบอร์ดผู้บริหาร";
  if (active.value === "cases") return "การจัดการงาน";
  if (active.value === "decisions") return "กระบวนการอนุมัติ";
  if (active.value === "insights") return "บทวิเคราะห์";
  if (active.value === "reports") return "รายงานและการตรวจสอบ";
  return "การกำกับดูแลระบบ";
});

const pageTitle = computed(() => {
  if (active.value === "dashboard") return "ภาพรวมผู้บริหาร";
  if (active.value === "cases") return "รายการเคสงาน";
  if (active.value === "decisions") return "รอการตัดสินใจ";
  if (active.value === "insights") return "บทวิเคราะห์เพื่อการตัดสินใจ";
  if (active.value === "reports") return "รายงานและการตรวจสอบย้อนหลัง";
  return "ตั้งค่าการควบคุมระบบ";
});

const pageSubtitle = computed(() => {
  if (active.value === "dashboard")
    return "แสดงมูลค่าความเสี่ยง (บาท) ความคืบหน้า และงานที่ผู้บริหารต้องให้ความสนใจ";
  if (active.value === "cases")
    return "ติดตามสถานะงาน เอกสารอ้างอิง และไทม์ไลน์การดำเนินการ";
  if (active.value === "decisions")
    return "การตัดสินใจที่อยู่ภายใต้นโยบายองค์กรและตรวจสอบได้";
  if (active.value === "insights")
    return "อธิบายสิ่งที่เกิดขึ้น พร้อมข้อเสนอแนะเชิงกลยุทธ์";
  if (active.value === "reports")
    return "จัดเตรียมรายงานสำหรับการตรวจสอบและนำเสนอผู้บริหาร";
  return "กำหนดนโยบาย เอกสาร และสิทธิการใช้งานของระบบ";
});

/* KPI Component */
const KpiCard = defineComponent({
  props: {
    title: String,
    value: String,
    trend: String,
  },
  setup(props) {
    return () =>
      h("div", { class: "bg-white border border-slate-200 rounded-2xl p-5" }, [
        h("p", { class: "text-xs uppercase tracking-wide text-slate-500 font-semibold" }, props.title),
        h("p", { class: "mt-2 text-2xl font-semibold" }, props.value),
        h("p", { class: "mt-1 text-sm text-slate-600" }, props.trend),
      ]);
  },
});
</script>
