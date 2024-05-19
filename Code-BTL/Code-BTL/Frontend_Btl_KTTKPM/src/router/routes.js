import MainLayout from "layouts/MainLayout.vue";
import WelcomePage from "@/pages/WelcomePage.vue";
import LoginPage from "@/pages/authentication/LoginPage.vue";

/* import */
import ImportCayToChuc from "@/pages/import-du-lieu/ImportCayToChuc.vue";
import ImportMucTieu from "@/pages/import-du-lieu/ImportHocPhan.vue";

/* Don Vi */
import SoDoToChuc from "@/pages/quan-ly-don-vi/SoDoToChuc.vue";
import CapToChuc from "@/pages/quan-ly-don-vi/CapToChuc.vue";

/* Muc Tieu */
import DieuChinhMucTieu from "@/pages/quan-ly-muc-tieu/DieuChinhMucTieu.vue";
import XemBangMucTieu from "@/pages/quan-ly-muc-tieu/XemBangMucTieu.vue";
import ThietLapThongSoDauVao from "@/pages/quan-ly-muc-tieu/ThietLapThongSoDauVao.vue";

/* Nhan Vien */
import DanhSachNhanVien from "@/pages/quan-ly-nhan-vien/DanhSachNhanVien.vue";
import ChucDanhNhanVien from "src/pages/quan-ly-nhan-vien/ChucDanhNhanVien.vue";

/* Cai Dat */
import CaiDatMucTieu from "@/pages/settings/CaiDatMucTieu.vue";

/* Thong ke */
import DashBoard from "@/pages/thong-ke/DashBoard.vue";
import ThongKeTheoQuy from "@/pages/thong-ke/ThongKeTheoQuy.vue";
import ThongKeTheoDonVi from "@/pages/thong-ke/ThongKeTheoDonVi.vue";

const routes = [
  /* Main router */
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "/", component: WelcomePage, meta: { requiresAuth: true } },
      // { path: "/login", component: LoginPage, meta: { ableBackLogin: true } },
    ],
  },

  {
    path: "/login",
    component: LoginPage,
    meta: { ableBackLogin: true },
  },

  /* import router */
  {
    path: "/import",
    component: MainLayout,
    children: [
      {
        path: "company-level",
        component: ImportCayToChuc,
        meta: { requiresAuth: true },
      },

      {
        path: "target",
        component: ImportMucTieu,
        meta: { requiresAuth: true },
      },
    ],
  },

  /* company structure router */
  {
    path: "/structure",
    component: MainLayout,
    children: [
      { path: "level", component: CapToChuc, meta: { requiresAuth: true } },
      { path: "list", component: SoDoToChuc, meta: { requiresAuth: true } },
    ],
  },

  /* Target router */
  {
    path: "/target",
    component: MainLayout,
    children: [
      {
        path: "table",
        component: XemBangMucTieu,
        meta: { requiresAuth: true },
      },

      {
        path: "list/:id?",
        component: DieuChinhMucTieu,
        meta: { requiresAuth: true },
      },

      {
        path: "setup",
        component: ThietLapThongSoDauVao,
        meta: { requiresAuth: true },
      },
    ],
  },

  /* employees router */
  {
    path: "/employees",
    component: MainLayout,
    children: [
      {
        path: "list",
        component: DanhSachNhanVien,
        meta: { requiresAuth: true },
      },
      {
        path: "job",
        component: ChucDanhNhanVien,
        meta: { requiresAuth: true },
      },
    ],
  },

  /* cai dat router */
  {
    path: "/settings",
    component: MainLayout,
    children: [
      {
        path: "target",
        component: CaiDatMucTieu,
        meta: { requiresAuth: true },
      },
    ],
  },

  /* thongke router */
  {
    path: "/chart",
    component: MainLayout,
    children: [
      {
        path: "general",
        component: DashBoard,
        meta: { requiresAuth: true },
      },

      {
        path: "time",
        component: ThongKeTheoQuy,
        meta: { requiresAuth: true },
      },

      {
        path: "department",
        component: ThongKeTheoDonVi,
        meta: { requiresAuth: true },
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
