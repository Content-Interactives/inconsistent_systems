import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Slider } from '../components/ui/slider';

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

  const CustomLegend = () => (
    <div className="text-center mt-2">
      <p className={`font-medium ${isInconsistent ? 'text-[#008545]' : 'text-yellow-500'}`}>
        {isInconsistent ? "The equations are inconsistent" : "The equations are not inconsistent"}
      </p>
    </div>
  );

  return (
    <div className="w-[500px] h-auto mx-auto shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] bg-white rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#5750E3] text-sm font-medium select-none">Inconsistent Systems Simulator</h2>
          <button
            onClick={handleReset}
            className="text-gray-500 hover:text-gray-700 text-sm px-3 py-1 rounded border border-gray-300 hover:border-gray-400 transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="space-y-6">
          <div className="h-80 w-full bg-white p-4 rounded-lg shadow">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={generateData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" domain={[-10, 10]} tickCount={11} />
                <YAxis type="number" domain={[-10, 10]} tickCount={11} />
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
                <ReferenceLine x={0} stroke="#666" />
                <ReferenceLine y={0} stroke="#666" />
                <Line type="monotone" dataKey="y1" stroke="#8884d8" name="Equation 1" dot={false} />
                <Line type="monotone" dataKey="y2" stroke="#82ca9d" name="Equation 2" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#8884d8]/10 p-4 rounded-lg">
              <h3 className="text-base font-semibold text-[#8884d8] mb-4">Equation 1: y = {m1}x {b1 >= 0 ? '+' : ''}{b1}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#8884d8] mb-2">Slope (m₁):</label>
                  <Slider
                    value={[m1]}
                    onValueChange={(value) => setM1(Number(value[0].toFixed(1)))}
                    min={-5}
                    max={5}
                    step={0.1}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#8884d8] mb-2">Y-intercept (b₁):</label>
                  <Slider
                    value={[b1]}
                    onValueChange={(value) => setB1(Number(value[0].toFixed(1)))}
                    min={-10}
                    max={10}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#82ca9d]/10 p-4 rounded-lg">
              <h3 className="text-base font-semibold text-[#82ca9d] mb-4">Equation 2: y = {m2}x {b2 >= 0 ? '+' : ''}{b2}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#82ca9d] mb-2">Slope (m₂):</label>
                  <Slider
                    value={[m2]}
                    onValueChange={(value) => setM2(Number(value[0].toFixed(1)))}
                    min={-5}
                    max={5}
                    step={0.1}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#82ca9d] mb-2">Y-intercept (b₂):</label>
                  <Slider
                    value={[b2]}
                    onValueChange={(value) => setB2(Number(value[0].toFixed(1)))}
                    min={-10}
                    max={10}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InconsistentSystems;