import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="text-9xl font-bold opacity-20">404</div>
      <h1 className="mt-4 text-3xl font-bold">Page non trouvée</h1>
      <p className="mb-8 mt-2 max-w-md text-muted-foreground">
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
