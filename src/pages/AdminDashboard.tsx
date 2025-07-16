import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RefreshCw, Download, ExternalLink, Users, Mail, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { fetchPlugsyInquiries, isPlugsyAvailable, mapPlugsyToAdmin } from "@/integrations/plugsy/client";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  created_at: string;
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  location: string | null;
  created_at: string;
}

export default function AdminDashboard() {
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [plugsyData, setPlugsyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const { toast } = useToast();

  const loadData = async () => {
    setLoading(true);
    try {
      // Načtení kontaktních zpráv
      const { data: contactData, error: contactError } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (contactError) throw contactError;
      setContacts(contactData || []);

      // Načtení poptávek
      const { data: inquiryData, error: inquiryError } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (inquiryError) throw inquiryError;
      setInquiries(inquiryData || []);

    } catch (error: any) {
      console.error('Error loading data:', error);
      toast({
        title: "Chyba načítání",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const syncPlugsyData = async () => {
    if (!isPlugsyAvailable()) {
      toast({
        title: "Plugsy.cz nedostupný",
        description: "Plugsy.cz API není nakonfigurován",
        variant: "destructive",
      });
      return;
    }

    setSyncing(true);
    try {
      const plugsyInquiries = await fetchPlugsyInquiries();
      setPlugsyData(plugsyInquiries);
      
      toast({
        title: "Synchronizace dokončena",
        description: `Načteno ${plugsyInquiries.length} záznamů z plugsy.cz`,
      });
    } catch (error: any) {
      console.error('Error syncing plugsy data:', error);
      toast({
        title: "Chyba synchronizace",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSyncing(false);
    }
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (!data.length) return;
    
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(item => 
      Object.values(item).map(val => 
        typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val
      ).join(',')
    );
    
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    loadData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('cs-CZ');
  };

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin" />
          <span className="ml-2">Načítám data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Správa formulářových dat a poptávek</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={loadData} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Obnovit
          </Button>
          {isPlugsyAvailable() && (
            <Button onClick={syncPlugsyData} disabled={syncing}>
              {syncing ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <ExternalLink className="h-4 w-4 mr-2" />
              )}
              Sync Plugsy.cz
            </Button>
          )}
        </div>
      </div>

      {/* Statistiky */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Kontaktní zprávy"
          value={contacts.length}
          icon={Mail}
          color="text-blue-600"
        />
        <StatCard
          title="Poptávky"
          value={inquiries.length}
          icon={Users}
          color="text-green-600"
        />
        <StatCard
          title="Plugsy.cz data"
          value={plugsyData.length}
          icon={ExternalLink}
          color="text-purple-600"
        />
        <StatCard
          title="Celkem"
          value={contacts.length + inquiries.length + plugsyData.length}
          icon={MapPin}
          color="text-orange-600"
        />
      </div>

      <Tabs defaultValue="contacts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="contacts">Kontaktní zprávy ({contacts.length})</TabsTrigger>
          <TabsTrigger value="inquiries">Poptávky ({inquiries.length})</TabsTrigger>
          {isPlugsyAvailable() && (
            <TabsTrigger value="plugsy">Plugsy.cz ({plugsyData.length})</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="contacts" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Kontaktní zprávy</h2>
            <Button 
              onClick={() => exportToCSV(contacts, 'contacts')}
              variant="outline"
              disabled={!contacts.length}
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
          
          <div className="space-y-4">
            {contacts.map((contact) => (
              <Card key={contact.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{contact.subject}</CardTitle>
                      <CardDescription>
                        Od: {contact.name} ({contact.email})
                        {contact.phone && ` • Tel: ${contact.phone}`}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">
                      {formatDate(contact.created_at)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap">{contact.message}</p>
                </CardContent>
              </Card>
            ))}
            {!contacts.length && (
              <Card>
                <CardContent className="text-center py-8">
                  <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Žádné kontaktní zprávy</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="inquiries" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Poptávky</h2>
            <Button 
              onClick={() => exportToCSV(inquiries, 'inquiries')}
              variant="outline"
              disabled={!inquiries.length}
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
          
          <div className="grid gap-4">
            {inquiries.map((inquiry) => (
              <Card key={inquiry.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{inquiry.name}</CardTitle>
                      <CardDescription>
                        Email: {inquiry.email}
                        {inquiry.phone && ` • Tel: ${inquiry.phone}`}
                        {inquiry.location && ` • PSČ: ${inquiry.location}`}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">
                      {formatDate(inquiry.created_at)}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
            {!inquiries.length && (
              <Card>
                <CardContent className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Žádné poptávky</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {isPlugsyAvailable() && (
          <TabsContent value="plugsy" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Plugsy.cz Data</h2>
              <div className="flex gap-2">
                <Button 
                  onClick={() => exportToCSV(plugsyData, 'plugsy')}
                  variant="outline"
                  disabled={!plugsyData.length}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
                <Button onClick={syncPlugsyData} disabled={syncing}>
                  {syncing ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4 mr-2" />
                  )}
                  Synchronizovat
                </Button>
              </div>
            </div>
            
            <div className="grid gap-4">
              {plugsyData.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <CardDescription>
                          Email: {item.email}
                          {item.phone && ` • Tel: ${item.phone}`}
                          {item.location && ` • Lokalita: ${item.location}`}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">Plugsy.cz</Badge>
                        <Badge variant="secondary">
                          {formatDate(item.created_at)}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
              {!plugsyData.length && (
                <Card>
                  <CardContent className="text-center py-8">
                    <ExternalLink className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Žádná data z plugsy.cz. Klikněte na "Synchronizovat" pro načtení.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}