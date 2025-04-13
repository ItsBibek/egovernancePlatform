
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ComplaintForm from "./ComplaintForm";
import ComplaintTracker from "./ComplaintTracker";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("submit");
  const [trackedComplaintId, setTrackedComplaintId] = useState("");

  const handleComplaintSubmitted = (complaintId: string) => {
    setTrackedComplaintId(complaintId);
    setActiveTab("track");
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-nepal-blue">Citizen Complaint Portal</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Report issues in your community directly to local authorities. Help us improve governance and public services.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-6">
          <TabsTrigger value="submit">Submit Complaint</TabsTrigger>
          <TabsTrigger value="track">Track Complaint</TabsTrigger>
        </TabsList>
        
        <TabsContent value="submit">
          <ComplaintForm onSubmitSuccess={handleComplaintSubmitted} />
        </TabsContent>
        
        <TabsContent value="track">
          <ComplaintTracker initialComplaintId={trackedComplaintId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomePage;
