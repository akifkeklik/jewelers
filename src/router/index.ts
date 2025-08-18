import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import Home from "@/pages/home.vue";
import Satis from "@/pages/satis.vue";
import Raporlar from "@/pages/raporlar.vue";
import Toptanci from "@/pages/toptanci.vue";
import Kategoriler from "@/pages/kategoriler.vue";
import Urunler from "@/pages/urunler.vue";
import MusteriBilgi from "@/pages/musteriBilgi.vue";
import Stok from "@/pages/stok.vue";
import Kargo from "@/pages/kargo.vue";
import JewelryDashboard from "@/pages/JewelryDashboard.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
    // 📌 Açılışta direkt Dashboard'a yönlendirme
    { path: "/", redirect: "/dashboard" },

    { path: "/home", name: "home", component: Home },
    { path: "/satis", name: "satis", component: Satis },
    { path: "/raporlar", name: "raporlar", component: Raporlar },
    { path: "/toptancilar", name: "toptancilar", component: Toptanci },
    { path: "/kategoriler", name: "kategoriler", component: Kategoriler },
    { path: "/urunler", name: "urunler", component: Urunler },
    { path: "/musteriBilgi", name: "musteriBilgi", component: MusteriBilgi },
    { path: "/stok", name: "stok", component: Stok },
    { path: "/kargo", name: "kargo", component: Kargo },

    // 📌 Dashboard route
    { path: "/dashboard", name: "dashboard", component: JewelryDashboard },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;
