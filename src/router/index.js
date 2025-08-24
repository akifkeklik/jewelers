import Vue from 'vue';
import Router from 'vue-router';

// Sayfaları import et
import SalesPage from "@/pages/Sales.vue";
import ProductPage from "@/pages/Products/ProductPage.vue";
import CustomerPage from "@/pages/Customers/CustomerPage.vue";
import ReportPage from "@/pages/Reports/ReportPage.vue";
import SettingsPage from "@/pages/Settings.vue";
import PricesPage from "@/pages/PricesPage.vue";
import DashboardPage from "@/pages/DashboardPage.vue";
import CalculatorPage from "@/components/Calculator.vue";

Vue.use(Router);

export default new Router({
    mode: "history",  // URL'yi temiz tutmak için history modunu kullan
    routes: [
        { path: "/sales", name: "Sales", component: SalesPage },
        { path: "/products", name: "Products", component: ProductPage },
        { path: "/customers", name: "Customers", component: CustomerPage },
        { path: "/reports", name: "Reports", component: ReportPage },
        { path: "/settings", name: "Settings", component: SettingsPage },
        { path: "/prices", name: "PricesPage", component: PricesPage },
        { path: "/dashboard", name: "Dashboard", component: DashboardPage },
        { path: "/calculator", name: "Calculator", component: CalculatorPage },

        // Varsayılan yönlendirme
        { path: "*", redirect: "/dashboard" }
    ]
});
