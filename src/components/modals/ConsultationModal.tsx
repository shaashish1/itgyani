import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Calendar, Clock, CheckCircle, User, Mail, Building } from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType?: string;
}

const ConsultationModal = ({ isOpen, onClose, serviceType }: ConsultationModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    serviceInterest: serviceType || "",
    preferredTime: "",
    timezone: "",
    goals: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate booking API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success("Consultation booked! We'll send you a calendar invite within 1 hour.");
    setIsLoading(false);
    onClose();
  };

  const services = [
    "Business Process Automation",
    "AI Customer Support",
    "Data Integration",
    "E-commerce Automation", 
    "Marketing Automation",
    "Scheduling Management",
    "Custom Automation Solution"
  ];

  const timeSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM", 
    "11:00 AM - 12:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM"
  ];

  const timezones = [
    "Pacific Time (PT)",
    "Mountain Time (MT)",
    "Central Time (CT)",
    "Eastern Time (ET)",
    "UTC/GMT"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            Schedule Free Consultation
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Benefits Banner */}
          <div className="glass-card p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="font-semibold">What You'll Get:</span>
            </div>
            <ul className="text-sm text-foreground/80 space-y-1">
              <li>• 30-minute strategy session with our automation experts</li>
              <li>• Custom automation roadmap for your business</li>
              <li>• ROI analysis and implementation timeline</li>
              <li>• No commitment required</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="pl-10 bg-input/50 border-border/50 focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@company.com"
                    className="pl-10 bg-input/50 border-border/50 focus:border-primary"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your Company"
                    className="pl-10 bg-input/50 border-border/50 focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  className="bg-input/50 border-border/50 focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Service Interest</Label>
              <Select 
                value={formData.serviceInterest} 
                onValueChange={(value) => handleSelectChange("serviceInterest", value)}
              >
                <SelectTrigger className="bg-input/50 border-border/50 focus:border-primary">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Preferred Time</Label>
                <Select 
                  value={formData.preferredTime} 
                  onValueChange={(value) => handleSelectChange("preferredTime", value)}
                >
                  <SelectTrigger className="bg-input/50 border-border/50 focus:border-primary">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Timezone</Label>
                <Select 
                  value={formData.timezone} 
                  onValueChange={(value) => handleSelectChange("timezone", value)}
                >
                  <SelectTrigger className="bg-input/50 border-border/50 focus:border-primary">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((tz) => (
                      <SelectItem key={tz} value={tz}>
                        {tz}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="goals">What are your main automation goals? *</Label>
              <Textarea
                id="goals"
                name="goals"
                value={formData.goals}
                onChange={handleInputChange}
                placeholder="Tell us about the processes you want to automate, current challenges, and expected outcomes..."
                rows={3}
                className="bg-input/50 border-border/50 focus:border-primary resize-none"
                required
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Clock className="h-4 w-4 text-primary" />
              <Badge className="bg-primary/20 text-primary border-primary/30">
                Response within 1 hour
              </Badge>
            </div>

            <Button type="submit" className="btn-hero w-full" disabled={isLoading}>
              {isLoading ? "Booking Consultation..." : "Book Free Consultation"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationModal;