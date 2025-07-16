import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Lock, Loader2 } from "lucide-react";

const loginSchema = z.object({
  password: z.string().min(1, "Heslo je povinné"),
});

type LoginFormData = z.infer<typeof loginSchema>;

// Jednoduché admin heslo - v produkci by mělo být lepší řešení
const ADMIN_PASSWORD = "admin123";

export default function AdminLogin() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulace kontroly hesla
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (data.password === ADMIN_PASSWORD) {
        // Uložení admin session
        localStorage.setItem('admin-session', 'true');
        localStorage.setItem('admin-login-time', Date.now().toString());
        
        toast({
          title: "Přihlášení úspěšné",
          description: "Vítejte v admin panelu",
        });
        
        navigate('/admin/dashboard');
      } else {
        toast({
          title: "Neplatné heslo",
          description: "Zadali jste nesprávné heslo",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Chyba přihlášení",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Admin přihlášení</CardTitle>
          <CardDescription>
            Zadejte heslo pro přístup do administrace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin heslo</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Zadejte admin heslo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Přihlašuji...
                  </>
                ) : (
                  "Přihlásit se"
                )}
              </Button>
            </form>
          </Form>
          
          {process.env.NODE_ENV === 'development' && (
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Demo heslo: admin123
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}