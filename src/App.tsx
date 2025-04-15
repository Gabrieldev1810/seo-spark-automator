
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import WebVitals from "./pages/WebVitals";
import Agents from "./pages/Agents";
import Content from "./pages/Content";
import AgentSystem from "./pages/AgentSystem";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import AiContent from "./pages/AiContent";
import VoiceSearch from "./pages/VoiceSearch";
import EEAT from "./pages/EEAT";
import Mobile from "./pages/Mobile";
import LocalSeo from "./pages/LocalSeo";
import SeoKpis from "./pages/SeoKpis";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/web-vitals" element={<WebVitals />} />
      <Route path="/ai-content" element={<AiContent />} />
      <Route path="/voice-search" element={<VoiceSearch />} />
      <Route path="/e-e-a-t" element={<EEAT />} />
      <Route path="/mobile" element={<Mobile />} />
      <Route path="/local-seo" element={<LocalSeo />} />
      <Route path="/agents" element={<Agents />} />
      <Route path="/content" element={<Content />} />
      <Route path="/agent-system" element={<AgentSystem />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/seo-kpis" element={<SeoKpis />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
