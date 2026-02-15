import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Mail, MessageSquare } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Nome é obrigatório";
    if (!form.email.trim() || !form.email.includes("@")) e.email = "E-mail válido é obrigatório";
    if (!form.subject.trim()) e.subject = "Assunto é obrigatório";
    if (!form.message.trim()) e.message = "Mensagem é obrigatória";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      toast({ title: "Mensagem enviada!", description: "Responderemos em breve. Obrigado!" });
      setForm({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <main className="container mx-auto max-w-xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold text-center mb-2">Contato</h1>
      <p className="text-center text-muted-foreground mb-8">Tem dúvidas ou sugestões? Envie sua mensagem.</p>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-border bg-card p-6">
        <div>
          <Label htmlFor="name">Nome</Label>
          <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" />
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
        </div>
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1" />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
        </div>
        <div>
          <Label htmlFor="subject">Assunto</Label>
          <Input id="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="mt-1" />
          {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject}</p>}
        </div>
        <div>
          <Label htmlFor="message">Mensagem</Label>
          <Textarea id="message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-1" />
          {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
        </div>
        <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          <Mail className="mr-2 h-4 w-4" /> Enviar mensagem
        </Button>
      </form>

      <div className="mt-8 flex justify-center gap-4 text-sm text-muted-foreground">
        <span>📧 contato@vitrinepro.com.br</span>
      </div>
    </main>
  );
}
