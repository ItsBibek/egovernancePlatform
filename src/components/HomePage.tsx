
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
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-nepal-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Easy Submission</h3>
          <p className="text-gray-600">
            Simple form to submit your complaints with an option to upload evidence.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-nepal-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
          <p className="text-gray-600">
            Follow the status of your complaint using the unique ID provided after submission.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-nepal-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Quick Response</h3>
          <p className="text-gray-600">
            Get faster responses from local authorities based on the priority level of your issue.
          </p>
        </div>
      </div>
      
      <div className="mt-16 bg-gray-50 p-6 rounded-lg border border-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-nepal-blue text-white flex items-center justify-center mb-3">1</div>
            <h3 className="font-semibold mb-2">Submit</h3>
            <p className="text-sm text-gray-600">Fill out the complaint form with all necessary details</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-nepal-blue text-white flex items-center justify-center mb-3">2</div>
            <h3 className="font-semibold mb-2">Review</h3>
            <p className="text-sm text-gray-600">Your complaint is reviewed by the relevant department</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-nepal-blue text-white flex items-center justify-center mb-3">3</div>
            <h3 className="font-semibold mb-2">Process</h3>
            <p className="text-sm text-gray-600">The issue is addressed by the local authorities</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-nepal-blue text-white flex items-center justify-center mb-3">4</div>
            <h3 className="font-semibold mb-2">Resolution</h3>
            <p className="text-sm text-gray-600">Once resolved, you'll receive a notification</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
