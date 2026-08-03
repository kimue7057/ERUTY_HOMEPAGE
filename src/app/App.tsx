import { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { LanguageProvider } from "./context/LanguageContext";
import { NotFoundPage } from "./pages/NotFoundPage";

const HomePage = lazy(async () => ({
  default: (await import("./pages/HomePage")).HomePage,
}));
const ResourcesPage = lazy(async () => ({
  default: (await import("./pages/ResourcesPage")).ResourcesPage,
}));
const StartProjectPage = lazy(async () => ({
  default: (await import("./pages/StartProjectPage")).StartProjectPage,
}));
const TechnologyPage = lazy(async () => ({
  default: (await import("./pages/TechnologyPage")).TechnologyPage,
}));
const AboutPage = lazy(async () => ({
  default: (await import("./pages/company/AboutPage")).AboutPage,
}));
const CareersPage = lazy(async () => ({
  default: (await import("./pages/company/CareersPage")).CareersPage,
}));
const GrowthPage = lazy(async () => ({
  default: (await import("./pages/company/GrowthPage")).GrowthPage,
}));
const TeamPage = lazy(async () => ({
  default: (await import("./pages/company/TeamPage")).TeamPage,
}));
const ErumterPage = lazy(async () => ({
  default: (await import("./pages/services/erumter/ErumterPage")).ErumterPage,
}));
const HitpickPage = lazy(async () => ({
  default: (await import("./pages/services/hitpick/HitpickPage")).HitpickPage,
}));

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return null;
}

function RouteFallback() {
  return (
    <div
      className="flex min-h-[calc(100vh-var(--eruty-header-height))] items-center justify-center px-6"
      style={{ background: "#FFFFFF" }}
    >
      <div
        className="text-xs uppercase tracking-[0.24em]"
        style={{ color: "#737780", fontFamily: "var(--font-mono)" }}
      >
        Loading
      </div>
    </div>
  );
}

function AppLayout() {
  return (
    <div style={{ minHeight: "100vh", background: "#FFFFFF" }}>
      <ScrollToTop />
      <Header />
      <main style={{ paddingTop: "var(--eruty-header-height)" }}>
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/company/about" element={<AboutPage />} />
            <Route path="/company/team" element={<TeamPage />} />
            <Route path="/company/growth" element={<GrowthPage />} />
            <Route path="/company/careers" element={<CareersPage />} />
            <Route path="/services/hitpick" element={<HitpickPage />} />
            <Route path="/services/erumter" element={<ErumterPage />} />
            <Route path="/technology" element={<TechnologyPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/start-a-project" element={<StartProjectPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
