import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { districts, municipalities } from "@/data/locations";

interface ComplaintFormProps {
  onSubmitSuccess: (complaintId: string) => void;
}

const ComplaintForm: React.FC<ComplaintFormProps> = ({ onSubmitSuccess }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    category: "",
    district: "",
    municipality: "",
    location: "",
    description: "",
    priority: "medium",
    photo: null as File | null
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const filteredMunicipalities = selectedDistrict 
    ? municipalities.filter(m => m.district === selectedDistrict)
    : [];

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    setFormData(prev => ({
      ...prev,
      district: value,
      municipality: "" // Reset municipality when district changes
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, photo: file }));
      
      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateSimpleId = () => {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    return `COMP-${timestamp}-${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Generate a simple ID for the complaint
      const complaintId = generateSimpleId();
      
      // Create complaint object
      const complaint = {
        id: complaintId,
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        category: formData.category,
        district: formData.district,
        municipality: formData.municipality,
        location: formData.location,
        description: formData.description,
        priority: formData.priority,
        photo_url: photoPreview,
        status: 'Pending',
        submitted_at: new Date().toISOString()
      };

      // Get existing complaints from localStorage or initialize empty array
      const existingComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
      
      // Add new complaint
      existingComplaints.push(complaint);
      
      // Save back to localStorage
      localStorage.setItem('complaints', JSON.stringify(existingComplaints));

      toast({
        title: "Complaint Submitted Successfully",
        description: `Your complaint has been registered with ID: ${complaintId}`,
      });
      
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        category: "",
        district: "",
        municipality: "",
        location: "",
        description: "",
        priority: "medium",
        photo: null
      });
      setPhotoPreview(null);
      setSelectedDistrict("");
      
      // Call the success callback
      onSubmitSuccess(complaintId);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "There was a problem submitting your complaint. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto animate-fade-in">
      <CardHeader className="bg-nepal-red text-white rounded-t-lg">
        <CardTitle className="text-2xl">Submit a Complaint</CardTitle>
        <CardDescription className="text-white/90">
          Please fill out the form below to submit your complaint to the local authorities
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="Your full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="98XXXXXXXX"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Complaint Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleSelectChange("category", value)}
                  required
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="infrastructure">Infrastructure (Roads, Bridges, etc.)</SelectItem>
                    <SelectItem value="sanitation">Sanitation & Waste Management</SelectItem>
                    <SelectItem value="public-services">Public Services</SelectItem>
                    <SelectItem value="corruption">Corruption & Malpractice</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Complaint Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Complaint Details</h3>
              
              <div className="space-y-2">
                <Label htmlFor="district">District</Label>
                <Select 
                  value={formData.district} 
                  onValueChange={handleDistrictChange}
                  required
                >
                  <SelectTrigger id="district">
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map(district => (
                      <SelectItem key={district} value={district}>{district}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="municipality">Municipality/VDC</Label>
                <Select 
                  value={formData.municipality} 
                  onValueChange={(value) => handleSelectChange("municipality", value)}
                  disabled={!selectedDistrict}
                  required
                >
                  <SelectTrigger id="municipality">
                    <SelectValue placeholder={selectedDistrict ? "Select municipality" : "Select district first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredMunicipalities.map(muni => (
                      <SelectItem key={muni.id} value={muni.name}>{muni.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Specific Location</Label>
                <Input 
                  id="location" 
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  placeholder="Ward, Street, Landmark, etc."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="photo">Upload Photo Evidence (Optional)</Label>
                <Input 
                  id="photo" 
                  type="file" 
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-nepal-blue file:text-white hover:file:bg-nepal-blue/90"
                />
                {photoPreview && (
                  <div className="mt-2">
                    <img src={photoPreview} alt="Preview" className="h-24 object-cover rounded-md" />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Complaint Description</Label>
            <Textarea 
              id="description" 
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              placeholder="Please provide detailed information about your complaint..."
              className="min-h-[120px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Priority Level</Label>
            <RadioGroup 
              value={formData.priority} 
              onValueChange={(value) => handleSelectChange("priority", value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="low" />
                <Label htmlFor="low" className="cursor-pointer">Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium" className="cursor-pointer">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="high" />
                <Label htmlFor="high" className="cursor-pointer">High</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="urgent" id="urgent" />
                <Label htmlFor="urgent" className="cursor-pointer">Urgent</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full md:w-auto bg-nepal-blue hover:bg-nepal-blue/90" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Complaint"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ComplaintForm;
