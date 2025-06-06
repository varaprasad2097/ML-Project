import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModelMetrics from "@/components/ml/ModelMetrics";
import HyperparameterTuning from "@/components/ml/HyperparameterTuning";
import DataVisualization from "@/components/ml/DataVisualization";
import DataUpload from "@/components/ml/DataUpload";
import ModelTraining from "@/components/ml/ModelTraining";
import { Brain, BarChart3, Settings, Upload, Play } from "lucide-react";

const Index = () => {
  const [activeModel, setActiveModel] = useState("xgboost");
  const [isTraining, setIsTraining] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="h-12 w-12 text-primary animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              ML Dashboard
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced Machine Learning Platform with XGBoost, Autoencoders & Hyperparameter Optimization
          </p>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-fit lg:mx-auto">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Data
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Training
            </TabsTrigger>
            <TabsTrigger value="tuning" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Tuning
            </TabsTrigger>
            <TabsTrigger value="visualization" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <ModelMetrics activeModel={activeModel} setActiveModel={setActiveModel} />
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <DataUpload />
          </TabsContent>

          <TabsContent value="training" className="space-y-6">
            <ModelTraining isTraining={isTraining} setIsTraining={setIsTraining} />
          </TabsContent>

          <TabsContent value="tuning" className="space-y-6">
            <HyperparameterTuning />
          </TabsContent>

          <TabsContent value="visualization" className="space-y-6">
            <DataVisualization />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
