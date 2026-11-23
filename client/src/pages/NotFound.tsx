import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-6">
      <Card className="w-full max-w-md shadow-2xl border border-border bg-card">
        <CardContent className="pt-10 pb-10 text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <AlertCircle className="w-8 h-8" />
            </div>
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground block mb-2">Error 404</span>
            <h1 className="text-3xl font-serif font-bold text-primary mb-2">Endpoint Unresolved</h1>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto font-sans">
              The requested route does not exist or may have been repositioned within our architectural topology.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link href="/">
              <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-background text-xs px-6 py-2.5">
                <Home className="w-4 h-4 mr-2" /> Return to Homepage
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
