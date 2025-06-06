import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Brain, LogOut, Send, History } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import PredictionHistory from '@/components/PredictionHistory';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  // 34 input fields state
  const [formData, setFormData] = useState({
    maritalStatus: '',
    applicationMode: '',
    applicationOrder: '',
    course: '',
    daytimeEvening: '',
    previousQualification: '',
    previousQualificationGrade: '',
    nationality: '',
    mothersQualification: '',
    fathersQualification: '',
    mothersOccupation: '',
    fathersOccupation: '',
    admission: '',
    displaced: '',
    educational: '',
    debtor: '',
    tuitionFees: '',
    gender: '',
    scholarship: '',
    ageAtEnrollment: '',
    international: '',
    curricular1stSem: '',
    curricular2ndSem: '',
    target: '',
    credited1stSem: '',
    credited2ndSem: '',
    enrolled1stSem: '',
    enrolled2ndSem: '',
    evaluations1stSem: '',
    evaluations2ndSem: '',
    approved1stSem: '',
    approved2ndSem: '',
    grade1stSem: '',
    grade2ndSem: ''
  });

  const inputFields = [
    { key: 'maritalStatus', label: 'Marital Status' },
    { key: 'applicationMode', label: 'Application Mode' },
    { key: 'applicationOrder', label: 'Application Order' },
    { key: 'course', label: 'Course' },
    { key: 'daytimeEvening', label: 'Daytime/Evening Attendance' },
    { key: 'previousQualification', label: 'Previous Qualification' },
    { key: 'previousQualificationGrade', label: 'Previous Qualification Grade' },
    { key: 'nationality', label: 'Nationality' },
    { key: 'mothersQualification', label: "Mother's Qualification" },
    { key: 'fathersQualification', label: "Father's Qualification" },
    { key: 'mothersOccupation', label: "Mother's Occupation" },
    { key: 'fathersOccupation', label: "Father's Occupation" },
    { key: 'admission', label: 'Admission Grade' },
    { key: 'displaced', label: 'Displaced' },
    { key: 'educational', label: 'Educational Special Needs' },
    { key: 'debtor', label: 'Debtor' },
    { key: 'tuitionFees', label: 'Tuition Fees Up to Date' },
    { key: 'gender', label: 'Gender' },
    { key: 'scholarship', label: 'Scholarship Holder' },
    { key: 'ageAtEnrollment', label: 'Age at Enrollment' },
    { key: 'international', label: 'International' },
    { key: 'curricular1stSem', label: 'Curricular Units 1st Sem (credited)' },
    { key: 'curricular2ndSem', label: 'Curricular Units 2nd Sem (credited)' },
    { key: 'target', label: 'Target' },
    { key: 'credited1stSem', label: 'Curricular Units 1st Sem (credited)' },
    { key: 'credited2ndSem', label: 'Curricular Units 2nd Sem (credited)' },
    { key: 'enrolled1stSem', label: 'Curricular Units 1st Sem (enrolled)' },
    { key: 'enrolled2ndSem', label: 'Curricular Units 2nd Sem (enrolled)' },
    { key: 'evaluations1stSem', label: 'Curricular Units 1st Sem (evaluations)' },
    { key: 'evaluations2ndSem', label: 'Curricular Units 2nd Sem (evaluations)' },
    { key: 'approved1stSem', label: 'Curricular Units 1st Sem (approved)' },
    { key: 'approved2ndSem', label: 'Curricular Units 2nd Sem (approved)' },
    { key: 'grade1stSem', label: 'Curricular Units 1st Sem (grade)' },
    { key: 'grade2ndSem', label: 'Curricular Units 2nd Sem (grade)' }
  ];

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all fields are filled
    const emptyFields = Object.entries(formData).filter(([_, value]) => value === '');
    if (emptyFields.length > 0) {
      toast({
        title: "Error",
        description: `Please fill in all fields. ${emptyFields.length} fields are empty.`,
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      
      // Mock prediction (replace with actual API call to your backend)
      const predictions = ['Graduate', 'Dropout', 'Enrolled'];
      const mockPrediction = predictions[Math.floor(Math.random() * predictions.length)];
      
      setPrediction(mockPrediction);
      
      // Store prediction in Firestore
      await addDoc(collection(db, 'predictions'), {
        userId: currentUser?.uid,
        userEmail: currentUser?.email,
        inputs: formData,
        prediction: mockPrediction,
        timestamp: new Date()
      });

      toast({
        title: "Success",
        description: `Prediction completed: ${mockPrediction}`,
      });
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to make prediction. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Success",
        description: "Logged out successfully!"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Brain className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold">ML Predictor Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome, {currentUser?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowHistory(!showHistory)}
            >
              <History className="mr-2 h-4 w-4" />
              {showHistory ? 'Hide History' : 'Show History'}
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 space-y-6">
        {showHistory && (
          <PredictionHistory userId={currentUser?.uid || ''} />
        )}

        {/* Prediction Result */}
        {prediction && (
          <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-200">Prediction Result</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Badge 
                  variant={prediction === 'Graduate' ? 'default' : prediction === 'Dropout' ? 'destructive' : 'secondary'}
                  className="text-lg py-2 px-4"
                >
                  {prediction}
                </Badge>
                <p className="text-muted-foreground">
                  Based on the provided data, the student is predicted to: <strong>{prediction}</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Student Data Input</CardTitle>
            <CardDescription>
              Enter all 34 required fields for prediction. All fields are mandatory.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {inputFields.map((field, index) => (
                  <div key={field.key} className="space-y-2">
                    <Label htmlFor={field.key}>
                      {index + 1}. {field.label}
                    </Label>
                    <Input
                      id={field.key}
                      type="number"
                      step="any"
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      value={formData[field.key as keyof typeof formData]}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center pt-6">
                <Button type="submit" disabled={loading} size="lg" className="px-8">
                  <Send className="mr-2 h-4 w-4" />
                  {loading ? "Making Prediction..." : "Make Prediction"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
