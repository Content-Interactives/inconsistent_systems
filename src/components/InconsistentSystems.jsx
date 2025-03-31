import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Slider } from '../components/ui/slider';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { RefreshCw, Lightbulb, GitBranch } from 'lucide-react';

const InconsistentSystems = () => {
  const [m1, setM1] = useState(1);
  const [b1, setB1] = useState(2);
  const [m2, setM2] = useState(1);
  const [b2, setB2] = useState(3);

  const generateData = useMemo(() => {
    const data = [];
    for (let x = -10; x <= 10; x += 0.5) {
      data.push({
        x,
        y1: m1 * x + b1,
        y2: m2 * x + b2
      });
    }
    return data;
  }, [m1, b1, m2, b2]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow">
          <p className="font-bold">x: {label}</p>
          <p className="text-[#8884d8]">Equation 1: ({label}, {payload[0].value.toFixed(2)})</p>
          <p className="text-[#82ca9d]">Equation 2: ({label}, {payload[1].value.toFixed(2)})</p>
        </div>
      );
    }
    return null;
  };

  const handleReset = () => {
    setM1(1);
    setB1(2);
    setM2(1);
    setB2(3);
  };

  const isInconsistent = m1 === m2 && b1 !== b2;

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <Card className="w-full max-w-2xl mx-auto shadow-md bg-white">
        <CardHeader className="bg-sky-100 text-sky-800">
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl font-bold">Inconsistent Equations Simulator</CardTitle>
            <GitBranch size={40} className="text-sky-600" />
          </div>
          <CardDescription className="text-sky-700 text-lg">Explore Systems of Linear Equations!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <Alert className="bg-blue-50 border-blue-100">
            <Lightbulb className="h-4 w-4 text-blue-400" />
            <AlertTitle className="text-blue-700">Understanding Inconsistent Systems</AlertTitle>
            <AlertDescription className="text-blue-600">
              This simulator helps you visualize how changing the slope and y-intercept affects the relationship between two linear equations. Your goal is to create an inconsistent system where the lines are parallel and never intersect.
            </AlertDescription>
          </Alert>
          <div className="space-y-6">
            <div className="bg-sky-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-sky-700 mb-4">Equation 1: y = {m1}x + {b1}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sky-700">Slope (m1):</label>
                  <Slider
                    value={[m1]}
                    onValueChange={(value) => setM1(value[0])}
                    min={-5}
                    max={5}
                    step={0.1}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sky-700">Y-intercept (b1):</label>
                  <Slider
                    value={[b1]}
                    onValueChange={(value) => setB1(value[0])}
                    min={-10}
                    max={10}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            <div className="bg-sky-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-sky-700 mb-4">Equation 2: y = {m2}x + {b2}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sky-700">Slope (m2):</label>
                  <Slider
                    value={[m2]}
                    onValueChange={(value) => setM2(value[0])}
                    min={-5}
                    max={5}
                    step={0.1}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sky-700">Y-intercept (b2):</label>
                  <Slider
                    value={[b2]}
                    onValueChange={(value) => setB2(value[0])}
                    min={-10}
                    max={10}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            <Button 
              onClick={handleReset} 
              variant="outline"
              className="w-full border-sky-300 text-sky-700 hover:bg-sky-50 text-xl py-6"
            >
              <RefreshCw className="mr-2" /> Reset to Default
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start bg-gray-50 pt-8">
          <div className="w-full space-y-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-sky-700 mb-2">System Analysis:</h3>
              <p className={`mt-2 font-semibold ${isInconsistent ? 'text-green-500' : 'text-red-500'}`}>
                {isInconsistent 
                  ? "Congratulations! You've created an inconsistent system. The lines are parallel and will never intersect." 
                  : "The system is not yet inconsistent. Keep adjusting the parameters to make the lines parallel but not overlapping."}
              </p>
            </div>
            <div className="h-80 w-full bg-white p-4 rounded-lg shadow">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={generateData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" dataKey="x" domain={[-10, 10]} tickCount={11} />
                  <YAxis type="number" domain={[-10, 10]} tickCount={11} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <ReferenceLine x={0} stroke="#666" />
                  <ReferenceLine y={0} stroke="#666" />
                  <Line type="monotone" dataKey="y1" stroke="#8884d8" name="Equation 1" dot={false} />
                  <Line type="monotone" dataKey="y2" stroke="#82ca9d" name="Equation 2" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InconsistentSystems;