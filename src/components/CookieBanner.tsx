import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("vitrinepro-cookies")) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("vitrinepro-cookies", "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card p-4 shadow-lg animate-fade-in">
      <div className="container mx-auto flex flex-col items-center gap-3 sm:flex-row">
        <p className="flex-1 text-sm text-muted-foreground">
          Utilizamos cookies para melhorar sua experiência. Ao continuar, você concorda com nossa{" "}
          <a href="/privacidade" className="text-primary underline">Política de Privacidade</a>.
        </p>
        <button
          onClick={accept}
          className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
