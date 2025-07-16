import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const inquirySchema = z.object({
  name: z.string().min(2, "Jméno musí mít alespoň 2 znaky"),
  email: z.string().email("Neplatný email"),
  phone: z.string().optional(),
  location: z.string().optional(),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

export default function InquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
    },
  });

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true);
    
    try {
      const { data: result, error } = await supabase.functions.invoke("send-form-email", {
        body: {
          type: "inquiry",
          data: data,
        },
      });

      if (error) {
        throw error;
      }

      if (!result.success) {
        throw new Error(result.error || "Došlo k chybě při odesílání");
      }

      toast({
        title: "Poptávka byla úspěšně odeslána!",
        description: "Děkujeme za váš zájem. Brzy se vám ozveme.",
      });

      form.reset();
    } catch (error: any) {
      console.error("Error submitting inquiry:", error);
      toast({
        title: "Chyba",
        description: error.message || "Došlo k chybě při odesílání formuláře. Zkuste to znovu.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6 bg-white/10 backdrop-blur border-white/20">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Jméno *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Vaše jméno"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="vas@email.cz"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Telefon</FormLabel>
                <FormControl>
                  <Input
                    placeholder="+420 123 456 789"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Lokalita</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Kde nabíjíte nejčastěji?"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Odesílám...
              </>
            ) : (
              "Odeslat nezávaznou poptávku"
            )}
          </Button>
        </form>
      </Form>
    </Card>
  );
}