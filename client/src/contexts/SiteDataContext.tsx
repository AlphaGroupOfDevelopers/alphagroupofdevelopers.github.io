import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  SiteData,
  GeneralInfo,
  HeroSlide,
  StatItem,
  CoreValue,
  TechItem,
  ServiceItem,
  WorkflowStep,
  ProjectItem,
  TeamMember,
  InsightArticle,
  TestimonialItem,
  SocialLink
} from "@/types/site";
import { initialSiteData } from "@/data/initialSiteData";
import { toast } from "sonner";

const STORAGE_KEY = "alpha_site_data_v2";

interface SiteDataContextType {
  siteData: SiteData;
  updateGeneral: (data: Partial<GeneralInfo>) => void;
  updateSocialLinks: (links: SocialLink[]) => void;
  updateHeroSlides: (slides: HeroSlide[]) => void;
  updateStats: (stats: StatItem[]) => void;
  updateClientele: (clients: string[]) => void;
  updateCoreValues: (values: CoreValue[]) => void;
  updateTechStack: (tech: TechItem[]) => void;
  updateServices: (services: ServiceItem[]) => void;
  updateWorkflow: (workflow: WorkflowStep[]) => void;
  updateProjects: (projects: ProjectItem[]) => void;
  updateTeam: (team: TeamMember[]) => void;
  updateInsights: (insights: InsightArticle[]) => void;
  updateTestimonials: (testimonials: TestimonialItem[]) => void;
  saveFullData: (data: SiteData) => void;
  resetToDefaults: () => void;
  exportDataAsJson: () => string;
  importDataFromJson: (jsonStr: string) => boolean;
  isModifiedFromDefault: boolean;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [siteData, setSiteData] = useState<SiteData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Deep merge with initialSiteData to guarantee no missing fields
        return {
          ...initialSiteData,
          ...parsed,
          general: { ...initialSiteData.general, ...(parsed.general || {}) },
          socialLinks: parsed.socialLinks || initialSiteData.socialLinks,
          heroSlides: parsed.heroSlides || initialSiteData.heroSlides,
          stats: parsed.stats || initialSiteData.stats,
          clientele: parsed.clientele || initialSiteData.clientele,
          coreValues: parsed.coreValues || initialSiteData.coreValues,
          techStack: parsed.techStack || initialSiteData.techStack,
          services: parsed.services || initialSiteData.services,
          workflow: parsed.workflow || initialSiteData.workflow,
          projects: parsed.projects || initialSiteData.projects,
          team: parsed.team || initialSiteData.team,
          insights: parsed.insights || initialSiteData.insights,
          testimonials: parsed.testimonials || initialSiteData.testimonials,
        };
      }
    } catch (e) {
      console.error("Failed to parse stored site data", e);
    }
    return initialSiteData;
  });

  const [isModifiedFromDefault, setIsModifiedFromDefault] = useState<boolean>(() => {
    return !!localStorage.getItem(STORAGE_KEY);
  });

  const persistData = useCallback((data: SiteData) => {
    try {
      const payload = {
        ...data,
        lastUpdated: new Date().toISOString()
      };
      setSiteData(payload);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setIsModifiedFromDefault(true);
      toast.success("Site changes updated live!", {
        description: "Your modifications are active on the website."
      });
    } catch (err) {
      console.error("Failed to persist site data:", err);
      toast.error("Failed to save changes to local storage.");
    }
  }, []);

  const updateGeneral = useCallback((data: Partial<GeneralInfo>) => {
    setSiteData(prev => {
      const updated: SiteData = {
        ...prev,
        general: { ...prev.general, ...data },
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setIsModifiedFromDefault(true);
      return updated;
    });
    toast.success("General information updated");
  }, []);

  const updateSocialLinks = useCallback((links: SocialLink[]) => {
    setSiteData(prev => {
      const updated = { ...prev, socialLinks: links, lastUpdated: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    toast.success("Social links updated");
  }, []);

  const updateHeroSlides = useCallback((slides: HeroSlide[]) => {
    setSiteData(prev => {
      const updated = { ...prev, heroSlides: slides, lastUpdated: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    toast.success("Hero slides updated");
  }, []);

  const updateStats = useCallback((stats: StatItem[]) => {
    setSiteData(prev => {
      const updated = { ...prev, stats, lastUpdated: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    toast.success("Key metrics updated");
  }, []);

  const updateClientele = useCallback((clients: string[]) => {
    setSiteData(prev => {
      const updated = { ...prev, clientele: clients, lastUpdated: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    toast.success("Client marquee updated");
  }, []);

  const updateCoreValues = useCallback((values: CoreValue[]) => {
    setSiteData(prev => {
      const updated = { ...prev, coreValues: values, lastUpdated: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    toast.success("Core values updated");
  }, []);

  const updateTechStack = useCallback((tech: TechItem[]) => {
    setSiteData(prev => {
      const updated = { ...prev, techStack: tech, lastUpdated: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    toast.success("Tech stack updated");
  }, []);

  const updateServices = useCallback((services: ServiceItem[]) => {
    setSiteData(prev => {
      const updated = { ...prev, services, lastUpdated: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    toast.success("Services updated");
  }, []);

  const updateWorkflow = useCallback((workflow: WorkflowStep[]) => {
    setSiteData(prev => {
      const updated = { ...prev, workflow, lastUpdated: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    toast.success("Workflow steps updated");
  }, []);

  const updateProjects = useCallback((projects: ProjectItem[]) => {
    setSiteData(prev => {
      const updated = { ...prev, projects, lastUpdated: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    toast.success("Projects list updated");
  }, []);

  const updateTeam = useCallback((team: TeamMember[]) => {
    setSiteData(prev => {
      const updated = { ...prev, team, lastUpdated: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    toast.success("Team roster updated");
  }, []);

  const updateInsights = useCallback((insights: InsightArticle[]) => {
    setSiteData(prev => {
      const updated = { ...prev, insights, lastUpdated: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    toast.success("Insights & articles updated");
  }, []);

  const updateTestimonials = useCallback((testimonials: TestimonialItem[]) => {
    setSiteData(prev => {
      const updated = { ...prev, testimonials, lastUpdated: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    toast.success("Testimonials updated");
  }, []);

  const saveFullData = useCallback((data: SiteData) => {
    persistData(data);
  }, [persistData]);

  const resetToDefaults = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setSiteData({ ...initialSiteData, lastUpdated: new Date().toISOString() });
    setIsModifiedFromDefault(false);
    toast.info("Reset to factory defaults", {
      description: "Default website configurations have been restored."
    });
  }, []);

  const exportDataAsJson = useCallback(() => {
    return JSON.stringify(siteData, null, 2);
  }, [siteData]);

  const importDataFromJson = useCallback((jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (!parsed || typeof parsed !== "object") {
        throw new Error("Invalid JSON structure");
      }
      const merged: SiteData = {
        ...initialSiteData,
        ...parsed,
        general: { ...initialSiteData.general, ...(parsed.general || {}) },
        lastUpdated: new Date().toISOString()
      };
      persistData(merged);
      return true;
    } catch (e) {
      console.error("Import error:", e);
      toast.error("Failed to import JSON: Invalid format");
      return false;
    }
  }, [persistData]);

  return (
    <SiteDataContext.Provider
      value={{
        siteData,
        updateGeneral,
        updateSocialLinks,
        updateHeroSlides,
        updateStats,
        updateClientele,
        updateCoreValues,
        updateTechStack,
        updateServices,
        updateWorkflow,
        updateProjects,
        updateTeam,
        updateInsights,
        updateTestimonials,
        saveFullData,
        resetToDefaults,
        exportDataAsJson,
        importDataFromJson,
        isModifiedFromDefault
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error("useSiteData must be used within a SiteDataProvider");
  }
  return context;
}
