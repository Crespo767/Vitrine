import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="container mx-auto flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-8">
        <h1 className="font-display text-2xl font-bold text-center mb-6">
          {isLogin ? "Entrar" : "Criar conta"}
        </h1>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {!isLogin && (
            <div>
              <Label htmlFor="name">Nome completo</Label>
              <Input id="name" placeholder="Seu nome" className="mt-1" />
            </div>
          )}
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" placeholder="seu@email.com" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" placeholder="••••••••" className="mt-1" />
          </div>
          <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            {isLogin ? "Entrar" : "Cadastrar"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          {isLogin ? "Não tem conta?" : "Já tem conta?"}{" "}
          <button className="text-primary font-medium hover:underline" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Cadastre-se" : "Faça login"}
          </button>
        </p>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Esta é uma demonstração. Nenhum dado é armazenado.
        </p>
      </div>
    </main>
  );
}
