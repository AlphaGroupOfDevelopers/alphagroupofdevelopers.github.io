import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import SmoothScroll from "./components/layout/SmoothScroll";
import CustomCursor from "./components/ui/CustomCursor";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Insights from "./pages/Insights";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Licensing from "./pages/Licensing";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/team" component={Team} />
      <Route path="/services" component={Services} />
      <Route path="/projects" component={Projects} />
      <Route path="/insights" component={Insights} />
      <Route path="/contact" component={Contact} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/licensing" component={Licensing} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <SmoothScroll>
          <TooltipProvider>
            <CustomCursor />
            <Toaster />
            <Router />
          </TooltipProvider>
        </SmoothScroll>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
