import { useState } from "react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useSiteData } from "@/contexts/SiteDataContext";
import {
  commitSiteDataToGitHub,
  validateGitHubPAT,
  saveGitHubPAT,
  getGitHubPAT,
  clearGitHubPAT,
  hasGitHubPAT,
} from "@/lib/githubSync";
import { Link } from "wouter";
import {
  Shield,
  Lock,
  LogOut,
  Save,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Download,
  Upload,
  RefreshCw,
  Eye,
  CheckCircle2,
  Briefcase,
  Layers,
  Users,
  FileText,
  Sliders,
  Settings,
  Sparkles,
  ArrowRight,
  Key,
  Globe,
  MessageSquare,
  AlertCircle,
  Copy,
  ChevronRight,
  Github,
  Rocket,
  Loader2,
  CheckCheck,
  XCircle,
  Wifi
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ProjectItem, TeamMember, ServiceItem, InsightArticle, TestimonialItem, HeroSlide } from "@/types/site";
import { toast } from "sonner";

export default function Admin() {
  const { isAuthenticated, login, logout, changePasscode, hasCustomPasscode } = useAdminAuth();
  const {
    siteData,
    updateGeneral,
    updateHeroSlides,
    updateStats,
    updateClientele,
    updateServices,
    updateProjects,
    updateTeam,
    updateInsights,
    updateTestimonials,
    resetToDefaults,
    exportDataAsJson,
    importDataFromJson
  } = useSiteData();

  // Login form state
  const [passcode, setPasscode] = useState("");
  const [showPass, setShowPass] = useState(false);

  // Active admin tab
  const [activeTab, setActiveTab] = useState("overview");

  // General info state
  const [generalForm, setGeneralForm] = useState(siteData.general);

  // Hero slides state
  const [slides, setSlides] = useState<HeroSlide[]>(siteData.heroSlides);

  // Projects state
  const [projectList, setProjectList] = useState<ProjectItem[]>(siteData.projects);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);

  // Team state
  const [teamList, setTeamList] = useState<TeamMember[]>(siteData.team);
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);
  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false);

  // Services state
  const [servicesList, setServicesList] = useState<ServiceItem[]>(siteData.services);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);

  // Insights state
  const [insightsList, setInsightsList] = useState<InsightArticle[]>(siteData.insights);
  const [editingArticle, setEditingArticle] = useState<InsightArticle | null>(null);
  const [isInsightDialogOpen, setIsInsightDialogOpen] = useState(false);

  // Clientele state
  const [clienteleInput, setClienteleInput] = useState(siteData.clientele.join(", "));

  // Passcode change state
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");

  // Import JSON state
  const [importText, setImportText] = useState("");

  // GitHub Sync State
  const [githubPatInput, setGithubPatInput] = useState(getGitHubPAT());
  const [isPatSaved, setIsPatSaved] = useState(hasGitHubPAT());
  const [isValidatingPat, setIsValidatingPat] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [lastDeployUrl, setLastDeployUrl] = useState<string | null>(null);

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(passcode);
  };

  const handleSavePat = async () => {
    if (!githubPatInput.trim()) {
      toast.error("Please enter a GitHub Personal Access Token");
      return;
    }
    setIsValidatingPat(true);
    const valid = await validateGitHubPAT(githubPatInput.trim());
    setIsValidatingPat(false);
    if (valid) {
      saveGitHubPAT(githubPatInput.trim());
      setIsPatSaved(true);
      toast.success("GitHub Token Connected!", {
        description: "You can now publish edits globally to all visitors worldwide.",
      });
    } else {
      toast.error("Invalid GitHub Token or Repository Access Denied", {
        description: "Ensure the token has repo contents write permissions for AlphaGroupOfDevelopers/alphagroupofdevelopers.github.io",
      });
    }
  };

  const handleClearPat = () => {
    clearGitHubPAT();
    setGithubPatInput("");
    setIsPatSaved(false);
    toast.info("GitHub Token removed");
  };

  const handlePublishToGitHub = async (customMessage?: string) => {
    if (!hasGitHubPAT()) {
      toast.error("GitHub Token Required", {
        description: "Please configure your GitHub Personal Access Token in Settings & Sync to publish changes globally.",
      });
      setActiveTab("settings");
      return;
    }
    setIsDeploying(true);
    try {
      const result = await commitSiteDataToGitHub(
        siteData,
        customMessage || `chore(cms): update website content [${new Date().toISOString().slice(0, 16)}]`
      );
      setLastDeployUrl(result.commitUrl);
      toast.success("Changes Pushed to GitHub Successfully!", {
        description: "GitHub Actions has automatically triggered a build. Your changes will be live globally in ~2 minutes.",
      });
    } catch (err: any) {
      console.error(err);
      toast.error("GitHub Sync Failed", {
        description: err?.message || "Failed to commit changes to GitHub.",
      });
    } finally {
      setIsDeploying(false);
    }
  };

  // --------------------------------------------------------------------------
  // Project handlers
  // --------------------------------------------------------------------------
  const openNewProject = () => {
    setEditingProject({
      id: `proj-${Date.now()}`,
      client: "",
      title: "",
      desc: "",
      tags: ["Full Stack", "Web"],
      category: "E-commerce",
      link: "",
      year: new Date().getFullYear().toString(),
      featured: true
    });
    setIsProjectDialogOpen(true);
  };

  const saveProject = () => {
    if (!editingProject || !editingProject.client.trim()) {
      toast.error("Client or Project name is required");
      return;
    }
    const exists = projectList.some(p => p.id === editingProject.id);
    let updated: ProjectItem[];
    if (exists) {
      updated = projectList.map(p => (p.id === editingProject.id ? editingProject : p));
    } else {
      updated = [editingProject, ...projectList];
    }
    setProjectList(updated);
    updateProjects(updated);
    setIsProjectDialogOpen(false);
    setEditingProject(null);
  };

  const deleteProject = (id: string) => {
    if (window.confirm("Are you sure you want to remove this project?")) {
      const updated = projectList.filter(p => p.id !== id);
      setProjectList(updated);
      updateProjects(updated);
    }
  };

  // --------------------------------------------------------------------------
  // Team handlers
  // --------------------------------------------------------------------------
  const openNewTeamMember = () => {
    setEditingTeamMember({
      id: `tm-${Date.now()}`,
      name: "",
      role: "",
      image: "/Founder.jpeg",
      bio: "",
      background: "",
      expertise: ""
    });
    setIsTeamDialogOpen(true);
  };

  const saveTeamMember = () => {
    if (!editingTeamMember || !editingTeamMember.name.trim()) {
      toast.error("Member name is required");
      return;
    }
    const exists = teamList.some(t => t.id === editingTeamMember.id);
    let updated: TeamMember[];
    if (exists) {
      updated = teamList.map(t => (t.id === editingTeamMember.id ? editingTeamMember : t));
    } else {
      updated = [...teamList, editingTeamMember];
    }
    setTeamList(updated);
    updateTeam(updated);
    setIsTeamDialogOpen(false);
    setEditingTeamMember(null);
  };

  const deleteTeamMember = (id: string) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      const updated = teamList.filter(t => t.id !== id);
      setTeamList(updated);
      updateTeam(updated);
    }
  };

  // --------------------------------------------------------------------------
  // Services handlers
  // --------------------------------------------------------------------------
  const openNewService = () => {
    setEditingService({
      id: `srv-${Date.now()}`,
      title: "",
      desc: "",
      icon: "Terminal",
      deliverables: ["Custom Development", "High Performance Architecture"],
      highlight: false
    });
    setIsServiceDialogOpen(true);
  };

  const saveService = () => {
    if (!editingService || !editingService.title.trim()) {
      toast.error("Service title is required");
      return;
    }
    const exists = servicesList.some(s => s.id === editingService.id);
    let updated: ServiceItem[];
    if (exists) {
      updated = servicesList.map(s => (s.id === editingService.id ? editingService : s));
    } else {
      updated = [...servicesList, editingService];
    }
    setServicesList(updated);
    updateServices(updated);
    setIsServiceDialogOpen(false);
    setEditingService(null);
  };

  const deleteService = (id: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      const updated = servicesList.filter(s => s.id !== id);
      setServicesList(updated);
      updateServices(updated);
    }
  };

  // --------------------------------------------------------------------------
  // Insights handlers
  // --------------------------------------------------------------------------
  const openNewArticle = () => {
    setEditingArticle({
      id: `ins-${Date.now()}`,
      title: "",
      slug: `article-${Date.now()}`,
      category: "Engineering",
      date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      readTime: "5 min read",
      author: "Alpha Engineering Team",
      excerpt: "",
      content: ""
    });
    setIsInsightDialogOpen(true);
  };

  const saveArticle = () => {
    if (!editingArticle || !editingArticle.title.trim()) {
      toast.error("Article title is required");
      return;
    }
    const exists = insightsList.some(a => a.id === editingArticle.id);
    let updated: InsightArticle[];
    if (exists) {
      updated = insightsList.map(a => (a.id === editingArticle.id ? editingArticle : a));
    } else {
      updated = [editingArticle, ...insightsList];
    }
    setInsightsList(updated);
    updateInsights(updated);
    setIsInsightDialogOpen(false);
    setEditingArticle(null);
  };

  const deleteArticle = (id: string) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      const updated = insightsList.filter(a => a.id !== id);
      setInsightsList(updated);
      updateInsights(updated);
    }
  };

  // --------------------------------------------------------------------------
  // JSON Backup / Export / Download
  // --------------------------------------------------------------------------
  const downloadJsonBackup = () => {
    const jsonStr = exportDataAsJson();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `alphagroup_website_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Site configuration exported and downloaded!");
  };

  const copyJsonToClipboard = () => {
    const jsonStr = exportDataAsJson();
    navigator.clipboard.writeText(jsonStr);
    toast.success("JSON copied to clipboard!", {
      description: "You can paste this into client/src/data/initialSiteData.ts to make it default."
    });
  };

  const handleImportJson = () => {
    if (!importText.trim()) {
      toast.error("Please paste valid JSON text");
      return;
    }
    const success = importDataFromJson(importText);
    if (success) {
      setImportText("");
      window.location.reload();
    }
  };

  // --------------------------------------------------------------------------
  // Render: Login Screen if not authenticated
  // --------------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Ambient subtle glow background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block group mb-4">
              <span className="text-2xl font-serif font-bold text-primary group-hover:italic transition-all">
                AlphaGroupOfDevelopers
              </span>
            </Link>
            <div className="flex items-center justify-center gap-2 text-primary font-mono text-xs uppercase tracking-widest mt-1">
              <Shield className="w-4 h-4 text-primary" /> Admin Management Console
            </div>
          </div>

          <Card className="border border-border/80 shadow-2xl bg-card/95 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl font-serif text-primary">Admin Sign In</CardTitle>
              <CardDescription className="text-xs">
                Enter your administrative passcode to edit and manage website content.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleLoginSubmit}>
              <CardContent className="space-y-4 pt-2">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="passcode" className="text-xs font-medium">Passcode</Label>
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="text-[11px] text-muted-foreground hover:text-primary transition-colors"
                    >
                      {showPass ? "Hide" : "Show"}
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      id="passcode"
                      type={showPass ? "text" : "password"}
                      placeholder="Enter admin passcode"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      className="pr-10 tracking-widest font-mono"
                      autoFocus
                    />
                    <Lock className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="p-3 rounded bg-secondary/50 border border-border/50 text-[11px] text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-primary">Quick hint:</span> Default passcode is{" "}
                  <code className="bg-background px-1.5 py-0.5 rounded border border-border font-mono text-primary font-bold">alpha2026</code>.
                  You can change this inside the Admin Settings tab anytime.
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3 pt-2">
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-background">
                  Access Management Console <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Link href="/" className="text-xs text-muted-foreground hover:text-primary transition-colors text-center">
                  ← Return to Public Website
                </Link>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Render: Authenticated Admin Dashboard
  // --------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-card/90 backdrop-blur-md border-b border-border px-6 py-3.5">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="font-serif font-bold text-lg md:text-xl text-primary hover:italic transition-all">
              AlphaGroupOfDevelopers
            </Link>
            <span className="text-[10px] tracking-widest uppercase bg-primary/10 text-primary px-2.5 py-0.5 rounded border border-primary/20 font-mono">
              Admin Portal
            </span>
            <div className="hidden sm:flex items-center space-x-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Site Sync</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-3">
            <Button
              size="sm"
              onClick={() => handlePublishToGitHub()}
              disabled={isDeploying}
              className="gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm transition-all"
              title={
                isPatSaved
                  ? "Publish all current edits to GitHub so every visitor worldwide sees them"
                  : "Connect GitHub token to publish changes globally"
              }
            >
              {isDeploying ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <Rocket className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Publish to Live Site</span>
                </>
              )}
            </Button>
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">View Website</span>
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadJsonBackup}
              className="gap-1.5 text-xs"
              title="Download backup file"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Export Backup</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="gap-1.5 text-xs text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Admin Area */}
      <main className="flex-1 container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Admin Navigation Tabs */}
          <div className="overflow-x-auto pb-2 scrollbar-thin">
            <TabsList className="bg-secondary/60 p-1 border border-border inline-flex h-auto">
              <TabsTrigger value="overview" className="gap-2 py-2 text-xs md:text-sm">
                <Sliders className="w-4 h-4" /> Overview
              </TabsTrigger>
              <TabsTrigger value="general" className="gap-2 py-2 text-xs md:text-sm">
                <Globe className="w-4 h-4" /> Brand & Info
              </TabsTrigger>
              <TabsTrigger value="hero" className="gap-2 py-2 text-xs md:text-sm">
                <Sparkles className="w-4 h-4" /> Hero Slides
              </TabsTrigger>
              <TabsTrigger value="projects" className="gap-2 py-2 text-xs md:text-sm">
                <Briefcase className="w-4 h-4" /> Projects ({projectList.length})
              </TabsTrigger>
              <TabsTrigger value="services" className="gap-2 py-2 text-xs md:text-sm">
                <Layers className="w-4 h-4" /> Services ({servicesList.length})
              </TabsTrigger>
              <TabsTrigger value="team" className="gap-2 py-2 text-xs md:text-sm">
                <Users className="w-4 h-4" /> Team ({teamList.length})
              </TabsTrigger>
              <TabsTrigger value="insights" className="gap-2 py-2 text-xs md:text-sm">
                <FileText className="w-4 h-4" /> Insights ({insightsList.length})
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2 py-2 text-xs md:text-sm">
                <Settings className="w-4 h-4" /> Settings & Sync
              </TabsTrigger>
            </TabsList>
          </div>

          {/* ================================================================ */}
          {/* TAB 1: OVERVIEW */}
          {/* ================================================================ */}
          <TabsContent value="overview" className="space-y-8">
            <div className="bg-card border border-border p-6 md:p-8 rounded-lg shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-2">
                    Welcome to Alpha CMS
                  </h1>
                  <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
                    Make changes here and they will immediately update the live website on this device.
                    To deploy updates across all users worldwide, use the <strong>Export Backup / Copy JSON</strong> button in Settings to commit the file to your GitHub repository.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => setActiveTab("projects")} className="bg-primary text-background gap-2 text-xs">
                    <Plus className="w-4 h-4" /> Add Project
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("team")} className="gap-2 text-xs">
                    <Plus className="w-4 h-4" /> Add Team Member
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <Card className="border border-border/80">
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs uppercase tracking-wider font-mono">Portfolio Projects</CardDescription>
                  <CardTitle className="text-3xl font-serif text-primary">{projectList.length}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-[11px] text-muted-foreground">
                    {projectList.filter(p => p.featured).length} featured on homepage
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-border/80">
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs uppercase tracking-wider font-mono">Core Services</CardDescription>
                  <CardTitle className="text-3xl font-serif text-primary">{servicesList.length}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-[11px] text-muted-foreground">Full stack, infrastructure, consulting</p>
                </CardContent>
              </Card>

              <Card className="border border-border/80">
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs uppercase tracking-wider font-mono">Engineering Team</CardDescription>
                  <CardTitle className="text-3xl font-serif text-primary">{teamList.length}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-[11px] text-muted-foreground">Architects, engineers & designers</p>
                </CardContent>
              </Card>

              <Card className="border border-border/80">
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs uppercase tracking-wider font-mono">Published Insights</CardDescription>
                  <CardTitle className="text-3xl font-serif text-primary">{insightsList.length}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-[11px] text-muted-foreground">Technical articles & philosophy</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Nav Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                onClick={() => setActiveTab("general")}
                className="group p-6 rounded-lg bg-secondary/30 border border-border hover:border-primary/40 transition-all cursor-pointer"
              >
                <Globe className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-serif font-bold text-lg text-primary group-hover:italic mb-1">Brand & Contact Info</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Update company name, phone, WhatsApp, email, headline badges, and social links.
                </p>
              </div>

              <div
                onClick={() => setActiveTab("projects")}
                className="group p-6 rounded-lg bg-secondary/30 border border-border hover:border-primary/40 transition-all cursor-pointer"
              >
                <Briefcase className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-serif font-bold text-lg text-primary group-hover:italic mb-1">Manage Portfolio</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Add new client case studies, live demo URLs, tags, and showcase highlights.
                </p>
              </div>

              <div
                onClick={() => setActiveTab("settings")}
                className="group p-6 rounded-lg bg-secondary/30 border border-border hover:border-primary/40 transition-all cursor-pointer"
              >
                <Settings className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-serif font-bold text-lg text-primary group-hover:italic mb-1">Settings & Backups</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Download backups, change your admin passcode, or restore original defaults.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* ================================================================ */}
          {/* TAB 2: GENERAL & BRAND INFO */}
          {/* ================================================================ */}
          <TabsContent value="general" className="space-y-6">
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-primary">Company Identity & Details</CardTitle>
                <CardDescription>
                  These values are rendered across the Navbar, Home header, Contact page, and Footer.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={generalForm.companyName}
                      onChange={e => setGeneralForm({ ...generalForm, companyName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input
                      id="tagline"
                      value={generalForm.tagline}
                      onChange={e => setGeneralForm({ ...generalForm, tagline: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="badgeText">Header Status Badge Text</Label>
                    <Input
                      id="badgeText"
                      value={generalForm.badgeText}
                      onChange={e => setGeneralForm({ ...generalForm, badgeText: e.target.value })}
                      placeholder="e.g. Available for Q1/Q2 Projects"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Physical / Regional Location</Label>
                    <Input
                      id="location"
                      value={generalForm.location}
                      onChange={e => setGeneralForm({ ...generalForm, location: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Official Contact Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={generalForm.email}
                      onChange={e => setGeneralForm({ ...generalForm, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={generalForm.phone}
                      onChange={e => setGeneralForm({ ...generalForm, phone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp Direct Number (international format)</Label>
                    <Input
                      id="whatsapp"
                      value={generalForm.whatsapp}
                      onChange={e => setGeneralForm({ ...generalForm, whatsapp: e.target.value })}
                      placeholder="233559428462"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="foundedYear">Year Founded</Label>
                    <Input
                      id="foundedYear"
                      value={generalForm.foundedYear}
                      onChange={e => setGeneralForm({ ...generalForm, foundedYear: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shortBio">Short Bio (Displayed in footer and summary cards)</Label>
                  <Textarea
                    id="shortBio"
                    rows={2}
                    value={generalForm.shortBio}
                    onChange={e => setGeneralForm({ ...generalForm, shortBio: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aboutStory">About Story Paragraph 1</Label>
                  <Textarea
                    id="aboutStory"
                    rows={3}
                    value={generalForm.aboutStory[0] || ""}
                    onChange={e => {
                      const updated = [...generalForm.aboutStory];
                      updated[0] = e.target.value;
                      setGeneralForm({ ...generalForm, aboutStory: updated });
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aboutStory2">About Story Paragraph 2</Label>
                  <Textarea
                    id="aboutStory2"
                    rows={3}
                    value={generalForm.aboutStory[1] || ""}
                    onChange={e => {
                      const updated = [...generalForm.aboutStory];
                      updated[1] = e.target.value;
                      setGeneralForm({ ...generalForm, aboutStory: updated });
                    }}
                  />
                </div>

                {/* Clientele Marquee Input */}
                <div className="pt-4 border-t border-border space-y-2">
                  <Label htmlFor="clientele">Clientele Marquee Names (comma separated)</Label>
                  <Input
                    id="clientele"
                    value={clienteleInput}
                    onChange={e => setClienteleInput(e.target.value)}
                    placeholder="Ghana Revenue Authority, Atsupi's Cosmetics, Walmas Travel"
                  />
                  <p className="text-[11px] text-muted-foreground">These names scroll smoothly in the infinite marquee on the homepage.</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-3 border-t border-border pt-4">
                <Button
                  onClick={() => {
                    updateGeneral(generalForm);
                    const parsedClients = clienteleInput.split(",").map(s => s.trim()).filter(Boolean);
                    updateClientele(parsedClients);
                  }}
                  className="bg-primary text-background gap-2"
                >
                  <Save className="w-4 h-4" /> Save Brand Details
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* ================================================================ */}
          {/* TAB 3: HERO SLIDES */}
          {/* ================================================================ */}
          <TabsContent value="hero" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-serif font-bold text-primary">Homepage Hero Carousel</h2>
                <p className="text-xs text-muted-foreground">Edit headline banners that rotate on the landing page.</p>
              </div>
            </div>

            <div className="space-y-6">
              {slides.map((slide, index) => (
                <Card key={slide.id || index} className="border border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-serif text-primary flex items-center justify-between">
                      <span>Slide 0{index + 1}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Headline Title</Label>
                        <Input
                          value={slide.title}
                          onChange={e => {
                            const updated = [...slides];
                            updated[index].title = e.target.value;
                            setSlides(updated);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Hero Image Path / URL</Label>
                        <Input
                          value={slide.image}
                          onChange={e => {
                            const updated = [...slides];
                            updated[index].image = e.target.value;
                            setSlides(updated);
                          }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Description / Subtitle</Label>
                      <Textarea
                        rows={2}
                        value={slide.desc}
                        onChange={e => {
                          const updated = [...slides];
                          updated[index].desc = e.target.value;
                          setSlides(updated);
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <Label className="text-xs">Primary CTA Text</Label>
                        <Input
                          value={slide.primaryCtaText}
                          onChange={e => {
                            const updated = [...slides];
                            updated[index].primaryCtaText = e.target.value;
                            setSlides(updated);
                          }}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Primary CTA Link</Label>
                        <Input
                          value={slide.primaryCtaLink}
                          onChange={e => {
                            const updated = [...slides];
                            updated[index].primaryCtaLink = e.target.value;
                            setSlides(updated);
                          }}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Secondary CTA Text</Label>
                        <Input
                          value={slide.secondaryCtaText}
                          onChange={e => {
                            const updated = [...slides];
                            updated[index].secondaryCtaText = e.target.value;
                            setSlides(updated);
                          }}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Secondary CTA Link</Label>
                        <Input
                          value={slide.secondaryCtaLink}
                          onChange={e => {
                            const updated = [...slides];
                            updated[index].secondaryCtaLink = e.target.value;
                            setSlides(updated);
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="flex justify-end">
                <Button
                  onClick={() => updateHeroSlides(slides)}
                  className="bg-primary text-background gap-2"
                >
                  <Save className="w-4 h-4" /> Save Hero Slides
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* ================================================================ */}
          {/* TAB 4: PROJECTS */}
          {/* ================================================================ */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-primary">Projects & Case Studies</h2>
                <p className="text-xs text-muted-foreground">Manage your past client projects and active production platforms.</p>
              </div>
              <Button onClick={openNewProject} className="bg-primary text-background gap-2 text-xs">
                <Plus className="w-4 h-4" /> Add New Project
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectList.map((project, idx) => (
                <Card key={project.id || idx} className="border border-border flex flex-col justify-between hover:border-primary/40 transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono uppercase bg-secondary px-2 py-0.5 rounded border border-border">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="text-[10px] font-mono uppercase bg-primary text-background px-2 py-0.5 rounded">
                          Featured
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-xl font-serif text-primary">{project.client}</CardTitle>
                    {project.title && (
                      <p className="text-xs text-muted-foreground font-medium">{project.title}</p>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-3 flex-1">
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.map((tag, ti) => (
                        <span key={ti} className="text-[9px] uppercase px-1.5 py-0.5 bg-secondary/80 text-primary border border-border rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.link && (
                      <div className="pt-2">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary font-mono inline-flex items-center gap-1 hover:underline"
                        >
                          Visit Live URL <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="border-t border-border/60 pt-3 flex items-center justify-between">
                    <span className="text-xs font-mono text-muted-foreground">Year: {project.year || "2024"}</span>
                    <div className="flex items-center space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingProject({ ...project });
                          setIsProjectDialogOpen(true);
                        }}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteProject(project.id)}
                        className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Project Edit / Add Dialog */}
            <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
              <DialogContent className="max-w-xl">
                <DialogHeader>
                  <DialogTitle className="font-serif">
                    {editingProject && projectList.some(p => p.id === editingProject.id) ? "Edit Project" : "Add New Project"}
                  </DialogTitle>
                  <DialogDescription>
                    Provide project details, live production link, and categories.
                  </DialogDescription>
                </DialogHeader>

                {editingProject && (
                  <div className="space-y-4 py-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Client / Project Name</Label>
                        <Input
                          value={editingProject.client}
                          onChange={e => setEditingProject({ ...editingProject, client: e.target.value })}
                          placeholder="e.g. Scanty's Closet"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Subhead / Title</Label>
                        <Input
                          value={editingProject.title || ""}
                          onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                          placeholder="e.g. Modern E-Commerce Platform"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        rows={3}
                        value={editingProject.desc}
                        onChange={e => setEditingProject({ ...editingProject, desc: e.target.value })}
                        placeholder="Explain the technical challenges solved and business impact..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Select
                          value={editingProject.category}
                          onValueChange={(val: any) => setEditingProject({ ...editingProject, category: val })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="E-commerce">E-commerce</SelectItem>
                            <SelectItem value="SaaS & Web App">SaaS & Web App</SelectItem>
                            <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                            <SelectItem value="Enterprise">Enterprise</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Year</Label>
                        <Input
                          value={editingProject.year || ""}
                          onChange={e => setEditingProject({ ...editingProject, year: e.target.value })}
                          placeholder="2024"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Live Website URL (optional)</Label>
                      <Input
                        value={editingProject.link || ""}
                        onChange={e => setEditingProject({ ...editingProject, link: e.target.value })}
                        placeholder="https://example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Tags (comma separated)</Label>
                      <Input
                        value={editingProject.tags.join(", ")}
                        onChange={e => {
                          const tags = e.target.value.split(",").map(t => t.trim()).filter(Boolean);
                          setEditingProject({ ...editingProject, tags });
                        }}
                        placeholder="E-commerce, Full Stack, UI/UX"
                      />
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={editingProject.featured || false}
                        onChange={e => setEditingProject({ ...editingProject, featured: e.target.checked })}
                        className="rounded border-border text-primary focus:ring-primary w-4 h-4"
                      />
                      <Label htmlFor="featured" className="text-xs cursor-pointer">
                        Featured on homepage preview
                      </Label>
                    </div>
                  </div>
                )}

                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={() => setIsProjectDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={saveProject} className="bg-primary text-background">
                    Save Project
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* ================================================================ */}
          {/* TAB 5: SERVICES */}
          {/* ================================================================ */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-primary">Service Offerings</h2>
                <p className="text-xs text-muted-foreground">Manage your firm's core technical specialties and deliverables.</p>
              </div>
              <Button onClick={openNewService} className="bg-primary text-background gap-2 text-xs">
                <Plus className="w-4 h-4" /> Add New Service
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {servicesList.map((service, idx) => (
                <Card key={service.id || idx} className="border border-border">
                  <CardHeader className="pb-3 flex flex-row items-start justify-between">
                    <div>
                      <CardTitle className="text-xl font-serif text-primary">{service.title}</CardTitle>
                      <span className="text-[10px] font-mono text-muted-foreground uppercase">Icon: {service.icon}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingService({ ...service });
                          setIsServiceDialogOpen(true);
                        }}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteService(service.id)}
                        className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {service.desc}
                    </p>
                    {service.deliverables && service.deliverables.length > 0 && (
                      <div className="space-y-1 pt-2">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-primary font-bold">Key Deliverables:</span>
                        <ul className="text-xs text-muted-foreground list-disc list-inside space-y-0.5">
                          {service.deliverables.map((deliv, di) => (
                            <li key={di}>{deliv}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Service Edit / Add Dialog */}
            <Dialog open={isServiceDialogOpen} onOpenChange={setIsServiceDialogOpen}>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="font-serif">
                    {editingService && servicesList.some(s => s.id === editingService.id) ? "Edit Service" : "Add Service"}
                  </DialogTitle>
                </DialogHeader>

                {editingService && (
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <Label>Service Title</Label>
                      <Input
                        value={editingService.title}
                        onChange={e => setEditingService({ ...editingService, title: e.target.value })}
                        placeholder="e.g. Web & Digital Platforms"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Icon Name (Globe, Terminal, Shield, Zap)</Label>
                      <Input
                        value={editingService.icon}
                        onChange={e => setEditingService({ ...editingService, icon: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        rows={3}
                        value={editingService.desc}
                        onChange={e => setEditingService({ ...editingService, desc: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Deliverables (comma separated)</Label>
                      <Input
                        value={(editingService.deliverables || []).join(", ")}
                        onChange={e => {
                          const deliverables = e.target.value.split(",").map(d => d.trim()).filter(Boolean);
                          setEditingService({ ...editingService, deliverables });
                        }}
                        placeholder="Custom Applications, Micro-frontends, Security"
                      />
                    </div>
                  </div>
                )}

                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={() => setIsServiceDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={saveService} className="bg-primary text-background">
                    Save Service
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* ================================================================ */}
          {/* TAB 6: TEAM */}
          {/* ================================================================ */}
          <TabsContent value="team" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-primary">Team Members & Leadership</h2>
                <p className="text-xs text-muted-foreground">Manage the public roster of architects, engineers, and designers.</p>
              </div>
              <Button onClick={openNewTeamMember} className="bg-primary text-background gap-2 text-xs">
                <Plus className="w-4 h-4" /> Add Team Member
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamList.map((member, idx) => (
                <Card key={member.id || idx} className="border border-border">
                  <CardHeader className="flex flex-row items-center justify-between pb-3">
                    <div className="flex items-center space-x-4">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-14 h-14 object-cover rounded-md border border-border"
                        />
                      ) : (
                        <div className="w-14 h-14 bg-secondary flex items-center justify-center rounded-md text-primary font-serif font-bold">
                          {member.name.slice(0, 2)}
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-lg font-serif text-primary">{member.name}</CardTitle>
                        <CardDescription className="text-xs uppercase tracking-wider text-primary font-bold">
                          {member.role}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingTeamMember({ ...member });
                          setIsTeamDialogOpen(true);
                        }}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteTeamMember(member.id)}
                        className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
                    {member.background && (
                      <p><strong className="text-primary font-medium">Background:</strong> {member.background}</p>
                    )}
                    {member.expertise && (
                      <p><strong className="text-primary font-medium">Expertise:</strong> {member.expertise}</p>
                    )}
                    <p className="line-clamp-3 pt-1">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Team Member Dialog */}
            <Dialog open={isTeamDialogOpen} onOpenChange={setIsTeamDialogOpen}>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="font-serif">
                    {editingTeamMember && teamList.some(t => t.id === editingTeamMember.id) ? "Edit Team Member" : "Add Team Member"}
                  </DialogTitle>
                </DialogHeader>

                {editingTeamMember && (
                  <div className="space-y-4 py-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input
                          value={editingTeamMember.name}
                          onChange={e => setEditingTeamMember({ ...editingTeamMember, name: e.target.value })}
                          placeholder="e.g. Kingsley Okyere"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Role / Title</Label>
                        <Input
                          value={editingTeamMember.role}
                          onChange={e => setEditingTeamMember({ ...editingTeamMember, role: e.target.value })}
                          placeholder="e.g. Lead Architect"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Photo Image URL / Path</Label>
                      <Input
                        value={editingTeamMember.image || ""}
                        onChange={e => setEditingTeamMember({ ...editingTeamMember, image: e.target.value })}
                        placeholder="/Founder.jpeg or https://..."
                      />
                      <p className="text-[10px] text-muted-foreground">Available local images: /Founder.jpeg, /Godfred Fokuo.jpeg, /livingstone.jpeg, /george.jpeg</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Academic / Career Background</Label>
                      <Input
                        value={editingTeamMember.background || ""}
                        onChange={e => setEditingTeamMember({ ...editingTeamMember, background: e.target.value })}
                        placeholder="e.g. BSc. Information Technology"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Core Expertise</Label>
                      <Input
                        value={editingTeamMember.expertise || ""}
                        onChange={e => setEditingTeamMember({ ...editingTeamMember, expertise: e.target.value })}
                        placeholder="e.g. Building Long-Lasting Software"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Bio / Summary</Label>
                      <Textarea
                        rows={3}
                        value={editingTeamMember.bio}
                        onChange={e => setEditingTeamMember({ ...editingTeamMember, bio: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={() => setIsTeamDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={saveTeamMember} className="bg-primary text-background">
                    Save Member
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* ================================================================ */}
          {/* TAB 7: INSIGHTS & ARTICLES */}
          {/* ================================================================ */}
          <TabsContent value="insights" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-primary">Insights & Articles</h2>
                <p className="text-xs text-muted-foreground">Publish technical deep-dives, architectural writeups, and philosophies.</p>
              </div>
              <Button onClick={openNewArticle} className="bg-primary text-background gap-2 text-xs">
                <Plus className="w-4 h-4" /> Write New Article
              </Button>
            </div>

            <div className="space-y-4">
              {insightsList.map((article, idx) => (
                <Card key={article.id || idx} className="border border-border">
                  <CardHeader className="pb-3 flex flex-row items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-mono uppercase bg-primary/10 text-primary px-2 py-0.5 rounded border border-primary/20">
                          {article.category}
                        </span>
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {article.date} • {article.readTime}
                        </span>
                      </div>
                      <CardTitle className="text-xl font-serif text-primary">{article.title}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">By {article.author}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingArticle({ ...article });
                          setIsInsightDialogOpen(true);
                        }}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteArticle(article.id)}
                        className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {article.excerpt}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Article Dialog */}
            <Dialog open={isInsightDialogOpen} onOpenChange={setIsInsightDialogOpen}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-serif">
                    {editingArticle && insightsList.some(a => a.id === editingArticle.id) ? "Edit Article" : "Write New Article"}
                  </DialogTitle>
                </DialogHeader>

                {editingArticle && (
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <Label>Article Title</Label>
                      <Input
                        value={editingArticle.title}
                        onChange={e => setEditingArticle({ ...editingArticle, title: e.target.value })}
                        placeholder="e.g. Why Stability Matters More Than Speed"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Category</Label>
                        <Input
                          value={editingArticle.category}
                          onChange={e => setEditingArticle({ ...editingArticle, category: e.target.value })}
                          placeholder="Engineering / Philosophy"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Author</Label>
                        <Input
                          value={editingArticle.author}
                          onChange={e => setEditingArticle({ ...editingArticle, author: e.target.value })}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Read Time</Label>
                        <Input
                          value={editingArticle.readTime}
                          onChange={e => setEditingArticle({ ...editingArticle, readTime: e.target.value })}
                          placeholder="5 min read"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Excerpt / Summary</Label>
                      <Textarea
                        rows={2}
                        value={editingArticle.excerpt}
                        onChange={e => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Full Article Content</Label>
                      <Textarea
                        rows={8}
                        value={editingArticle.content}
                        onChange={e => setEditingArticle({ ...editingArticle, content: e.target.value })}
                        placeholder="Full body of the insight / paper..."
                      />
                    </div>
                  </div>
                )}

                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={() => setIsInsightDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={saveArticle} className="bg-primary text-background">
                    Save Article
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* ================================================================ */}
          {/* TAB 8: SETTINGS & BACKUPS */}
          {/* ================================================================ */}
          <TabsContent value="settings" className="space-y-6">
            {/* GitHub Live Deployment Card */}
            <Card className="border border-primary/30 shadow-md bg-gradient-to-br from-card via-card to-primary/5">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-serif text-primary flex items-center gap-2">
                      <Github className="w-5 h-5 text-primary" /> GitHub Live Deployment (Global Sync)
                    </CardTitle>
                    <CardDescription>
                      Publish edits to all visitors worldwide by committing directly to the GitHub repository.
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {isPatSaved ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        <CheckCheck className="w-3.5 h-3.5" /> Token Connected
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        <AlertCircle className="w-3.5 h-3.5" /> Token Not Set
                      </span>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  AlphaGroupOfDevelopers is deployed via <strong>GitHub Pages</strong>. When you connect a GitHub Personal Access Token (PAT),
                  clicking <strong>"Publish to Live Site"</strong> automatically updates <code className="bg-muted px-1.5 py-0.5 rounded text-primary font-mono text-[11px]">initialSiteData.ts</code> in your repository.
                  GitHub Actions then builds and serves the new content to all visitors worldwide in ~2 minutes.
                </p>

                <div className="space-y-3 p-4 rounded-lg bg-secondary/40 border border-border">
                  <Label htmlFor="githubPat" className="text-xs font-semibold flex items-center justify-between">
                    <span>GitHub Personal Access Token (PAT)</span>
                    <a
                      href="https://github.com/settings/tokens/new?scopes=repo&description=AlphaGroup+Admin+CMS"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-primary hover:underline font-normal inline-flex items-center gap-1"
                    >
                      Generate token on GitHub <ExternalLink className="w-3 h-3" />
                    </a>
                  </Label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      id="githubPat"
                      type="password"
                      placeholder="ghp_xxxxxxxxxxxxxxxxxxxx or github_pat_xxxx"
                      value={githubPatInput}
                      onChange={e => setGithubPatInput(e.target.value)}
                      className="font-mono text-xs flex-1"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={handleSavePat}
                        disabled={isValidatingPat}
                        className="bg-primary text-background text-xs gap-1.5"
                      >
                        {isValidatingPat ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Verifying...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{isPatSaved ? "Update Token" : "Connect Token"}</span>
                          </>
                        )}
                      </Button>
                      {isPatSaved && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleClearPat}
                          className="text-destructive hover:bg-destructive/10 text-xs gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Disconnect</span>
                        </Button>
                      )}
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Required permission: <strong>repo</strong> (Full control of private repositories) or fine-grained token with <strong>Contents: Read & Write</strong> on <code className="font-mono text-primary">alphagroupofdevelopers.github.io</code>. Your token is stored securely in your browser's local storage and is never exposed to visitors.
                  </p>
                </div>

                {/* Publish Action Box */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-primary flex items-center gap-2">
                      <Rocket className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      Publish All Active Changes Now
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Commits all current projects, team members, services, brand info, and insights to your GitHub repo.
                    </p>
                    {lastDeployUrl && (
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 pt-1">
                        ✓ Last commit created:{" "}
                        <a
                          href={lastDeployUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline font-mono"
                        >
                          View commit on GitHub →
                        </a>
                      </p>
                    )}
                  </div>
                  <Button
                    onClick={() => handlePublishToGitHub()}
                    disabled={isDeploying || !isPatSaved}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-2 shrink-0"
                  >
                    {isDeploying ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Deploying...</span>
                      </>
                    ) : (
                      <>
                        <Rocket className="w-4 h-4" />
                        <span>Deploy to Production</span>
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Backup & Code Sync */}
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-primary">Data Backup & Repository Sync</CardTitle>
                <CardDescription>
                  Because this site is hosted on GitHub Pages, export your site data so you can save backups or update the repository.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded border border-border bg-secondary/30 space-y-3">
                    <h4 className="font-serif font-bold text-primary flex items-center gap-2">
                      <Download className="w-4 h-4 text-primary" /> Download JSON Backup
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Download a complete snapshot of all website content (projects, team, services, settings) as a file.
                    </p>
                    <Button onClick={downloadJsonBackup} variant="outline" className="w-full text-xs gap-2">
                      <Download className="w-3.5 h-3.5" /> Download siteData.json
                    </Button>
                  </div>

                  <div className="p-4 rounded border border-border bg-secondary/30 space-y-3">
                    <h4 className="font-serif font-bold text-primary flex items-center gap-2">
                      <Copy className="w-4 h-4 text-primary" /> Copy JSON Code
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Copy the full JSON payload directly to your clipboard to paste into the code or commit to GitHub.
                    </p>
                    <Button onClick={copyJsonToClipboard} variant="outline" className="w-full text-xs gap-2">
                      <Copy className="w-3.5 h-3.5" /> Copy Config to Clipboard
                    </Button>
                  </div>
                </div>

                {/* Import JSON */}
                <div className="pt-4 border-t border-border space-y-3">
                  <Label htmlFor="importJson">Restore from JSON Backup</Label>
                  <Textarea
                    id="importJson"
                    rows={4}
                    placeholder="Paste exported JSON here to restore all content..."
                    value={importText}
                    onChange={e => setImportText(e.target.value)}
                    className="font-mono text-xs"
                  />
                  <Button onClick={handleImportJson} className="bg-primary text-background gap-2 text-xs">
                    <Upload className="w-3.5 h-3.5" /> Import & Apply Backup
                  </Button>
                </div>

                {/* Reset to Factory Defaults */}
                <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-medium text-destructive text-sm flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" /> Reset Website to Original Defaults
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Clears local edits and restores the website to its original factory content.
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to revert all custom changes back to defaults?")) {
                        resetToDefaults();
                        window.location.reload();
                      }
                    }}
                    className="text-xs"
                  >
                    Reset Defaults
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Change Admin Passcode */}
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-primary flex items-center gap-2">
                  <Key className="w-5 h-5 text-primary" /> Security & Passcode
                </CardTitle>
                <CardDescription>
                  Change the administrative passcode used to access this management console.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label>Current Passcode</Label>
                  <Input
                    type="password"
                    placeholder="Current passcode (default: alpha2026)"
                    value={currentPass}
                    onChange={e => setCurrentPass(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>New Passcode</Label>
                  <Input
                    type="password"
                    placeholder="Enter new strong passcode"
                    value={newPass}
                    onChange={e => setNewPass(e.target.value)}
                  />
                </div>
                <Button
                  onClick={() => {
                    const ok = changePasscode(currentPass, newPass);
                    if (ok) {
                      setCurrentPass("");
                      setNewPass("");
                    }
                  }}
                  className="bg-primary text-background text-xs"
                >
                  Update Passcode
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
