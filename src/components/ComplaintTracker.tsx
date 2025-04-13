
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Clock } from "lucide-react";

interface ComplaintTrackerProps {
  initialComplaintId?: string;
}

interface Complaint {
  id: string;
  fullName: string;
  category: string;
  district: string;
  municipality: string;
  description: string;
  priority: string;
  status: string;
  submittedAt: string;
  photo?: string | null;
}

const ComplaintTracker: React.FC<ComplaintTrackerProps> = ({ initialComplaintId = "" }) => {
  const { toast } = useToast();
  const [complaintId, setComplaintId] = useState(initialComplaintId);
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500";
      case "in progress":
        return "bg-blue-500";
      case "pending":
        return "bg-yellow-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "urgent":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "infrastructure":
        return "Infrastructure";
      case "sanitation":
        return "Sanitation & Waste";
      case "public-services":
        return "Public Services";
      case "corruption":
        return "Corruption";
      case "others":
        return "Others";
      default:
        return category;
    }
  };

  const handleSearch = () => {
    if (!complaintId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a complaint ID to search",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      try {
        const complaints = JSON.parse(localStorage.getItem("complaints") || "[]");
        const found = complaints.find((c: Complaint) => c.id === complaintId.trim());
        
        if (found) {
          setComplaint(found);
        } else {
          setComplaint(null);
          toast({
            title: "Not Found",
            description: "No complaint found with the provided ID",
            variant: "destructive"
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong while searching for the complaint",
          variant: "destructive"
        });
      } finally {
        setIsSearching(false);
      }
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto animate-fade-in">
      <CardHeader className="bg-nepal-blue text-white rounded-t-lg">
        <CardTitle className="text-2xl">Track Your Complaint</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-grow">
            <Label htmlFor="complaintId">Complaint ID</Label>
            <Input
              id="complaintId"
              value={complaintId}
              onChange={(e) => setComplaintId(e.target.value)}
              placeholder="Enter your complaint ID"
              className="mt-1"
            />
          </div>
          <div className="self-end">
            <Button 
              onClick={handleSearch} 
              disabled={isSearching}
              className="bg-nepal-red hover:bg-nepal-red/90 w-full md:w-auto"
            >
              {isSearching ? "Searching..." : (
                <>
                  <Search className="mr-2 h-4 w-4" /> Search
                </>
              )}
            </Button>
          </div>
        </div>

        {complaint && (
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Complaint Details</TabsTrigger>
              <TabsTrigger value="status">Status & Timeline</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="pt-4">
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div>
                    <h3 className="text-lg font-bold">{complaint.fullName}'s Complaint</h3>
                    <p className="text-gray-600">Complaint ID: {complaint.id}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className={`${getStatusColor(complaint.status)} text-white`}>
                      {complaint.status}
                    </Badge>
                    <Badge variant="outline" className={`${getPriorityColor(complaint.priority)} text-white`}>
                      {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)} Priority
                    </Badge>
                    <Badge variant="secondary">
                      {getCategoryLabel(complaint.category)}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-500">Location</h4>
                    <p>{complaint.municipality}, {complaint.district}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-500">Submitted On</h4>
                    <p>{formatDate(complaint.submittedAt)}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-500">Description</h4>
                  <p className="mt-1 p-3 border border-gray-200 rounded-md bg-gray-50">{complaint.description}</p>
                </div>
                
                {complaint.photo && (
                  <div>
                    <h4 className="font-medium text-gray-500">Attached Photo</h4>
                    <div className="mt-2">
                      <img 
                        src={complaint.photo} 
                        alt="Complaint evidence" 
                        className="h-48 object-cover rounded-md border border-gray-200" 
                      />
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="status" className="pt-4">
              <div className="space-y-6">
                <div className="relative border-l-2 border-nepal-blue pl-6 pb-6 ml-4">
                  <div className="absolute w-4 h-4 bg-nepal-blue rounded-full -left-[9px] top-0"></div>
                  <div className="mb-1 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm text-gray-500">{formatDate(complaint.submittedAt)}</span>
                  </div>
                  <h3 className="text-lg font-medium">Complaint Submitted</h3>
                  <p className="text-gray-600">Your complaint has been received and is awaiting review.</p>
                </div>
                
                {complaint.status !== "Pending" && (
                  <div className="relative border-l-2 border-nepal-blue pl-6 pb-6 ml-4">
                    <div className="absolute w-4 h-4 bg-nepal-blue rounded-full -left-[9px] top-0"></div>
                    <div className="mb-1 flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-500">{formatDate(new Date(new Date(complaint.submittedAt).getTime() + 86400000).toISOString())}</span>
                    </div>
                    <h3 className="text-lg font-medium">Complaint Under Review</h3>
                    <p className="text-gray-600">Your complaint is being reviewed by the concerned department.</p>
                  </div>
                )}
                
                {complaint.status === "In Progress" && (
                  <div className="relative border-l-2 border-nepal-blue pl-6 pb-6 ml-4">
                    <div className="absolute w-4 h-4 bg-nepal-blue rounded-full -left-[9px] top-0"></div>
                    <div className="mb-1 flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-500">{formatDate(new Date(new Date(complaint.submittedAt).getTime() + 172800000).toISOString())}</span>
                    </div>
                    <h3 className="text-lg font-medium">Action Taken</h3>
                    <p className="text-gray-600">Your complaint has been assigned and action is being taken.</p>
                  </div>
                )}
                
                {complaint.status === "Completed" && (
                  <div className="relative border-l-2 border-nepal-blue pl-6 ml-4">
                    <div className="absolute w-4 h-4 bg-green-500 rounded-full -left-[9px] top-0"></div>
                    <div className="mb-1 flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-500">{formatDate(new Date(new Date(complaint.submittedAt).getTime() + 259200000).toISOString())}</span>
                    </div>
                    <h3 className="text-lg font-medium">Resolution Complete</h3>
                    <p className="text-gray-600">Your complaint has been resolved successfully.</p>
                  </div>
                )}
                
                {complaint.status === "Rejected" && (
                  <div className="relative border-l-2 border-nepal-blue pl-6 ml-4">
                    <div className="absolute w-4 h-4 bg-red-500 rounded-full -left-[9px] top-0"></div>
                    <div className="mb-1 flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-500">{formatDate(new Date(new Date(complaint.submittedAt).getTime() + 172800000).toISOString())}</span>
                    </div>
                    <h3 className="text-lg font-medium">Complaint Rejected</h3>
                    <p className="text-gray-600">Your complaint has been rejected due to insufficient information or it does not fall under the jurisdiction of the concerned department.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        )}
        
        {!complaint && complaintId && !isSearching && (
          <div className="text-center py-10">
            <div className="text-gray-400 mb-2">No complaint found with ID: {complaintId}</div>
            <p className="text-sm text-gray-500">Please check the ID and try again</p>
          </div>
        )}
        
        {!complaint && !complaintId && (
          <div className="text-center py-10">
            <div className="text-gray-400 mb-2">Enter your complaint ID to track its status</div>
            <p className="text-sm text-gray-500">You can find your complaint ID in the confirmation email or SMS you received after submission</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ComplaintTracker;
