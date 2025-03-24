import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <div className="text-9xl font-bold opacity-20">404</div>
      <h1 className="text-3xl font-bold mt-4">Page non trouvée</h1>
      <p className="text-muted-foreground mt-2 mb-8 max-w-md">
        Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Link to="/">
        <Button className="gap-2">
          <Home className="h-4 w-4" />
          Retourner à l'accueil
        </Button>
      </Link>
    </div>
  );
}
