import Vue from "vue";
import Router from "vue-router";

// Sayfa importları
import Dashboard from "@/pages/Dashboard.vue";
import SalesPage from "@/pages/Sales.vue"; // Sales sayfasını import ediyoruz

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        { path: "/dashboard", name: "Dashboard", component: Dashboard },
        { path: "/sales", name: "Sales", component: SalesPage }, // Sales sayfasına yönlendirme
        // Diğer sayfalar
        { path: "/products", name: "Products", component: () => import("@/pages/Products/ProductPage.vue") },
        { path: "/customers", name: "Customers", component: () => import("@/pages/Customers/CustomerPage.vue") },
        { path: "/reports", name: "Reports", component: () => import("@/pages/Reports/ReportPage.vue") },
        { path: "/settings", name: "Settings", component: () => import("@/pages/Settings.vue") },
        { path: "*", redirect: "/dashboard" }, // Varsayılan yönlendirme
    ]
});
