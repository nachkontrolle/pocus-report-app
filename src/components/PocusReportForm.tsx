import React, { useState } from 'react';

interface PocusReportFormProps {
  module: string;
  examType: string;
  examName: string;
}

interface ExamData {
  indications: string[];
  suggestedViews: string;
  findings: string[];
}

const PocusReportForm: React.FC<PocusReportFormProps> = ({ module, examType, examName }) => {
  const [selectedIndications, setSelectedIndications] = useState<number[]>([]);
  const [customIndication, setCustomIndication] = useState('');
  const [findings, setFindings] = useState<{ [key: number]: boolean }>({});
  const [reportText, setReportText] = useState('');

  const examData: { [key: string]: { [key: string]: ExamData } } = {
    basic: {
      fluid: {
        indications: [
          'Trauma',
          'Abdominal pain',
          'Suspected effusion'
        ],
        suggestedViews: `RUQ, LUQ, pelvis, pleural spaces bilaterally, subcostal cardiac view`,
        findings: [
          'Free fluid in Morrison\'s pouch',
          'Free fluid in splenorenal recess',
          'Free fluid in pelvis',
          'Right pleural effusion',
          'Left pleural effusion',
          'Pericardial effusion'
        ]
      }
    }
  };

  const handleIndicationChange = (index: number) => {
    setSelectedIndications(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      }
      return [...prev, index];
    });
  };

  const handleFindingChange = (index: number) => {
    setFindings(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const generateReport = () => {
    const currentExam = examData[module]?.[examType];
    if (!currentExam) return;

    const selectedIndicationsText = selectedIndications
      .map(i => currentExam.indications[i])
      .join(', ');
    
    const customIndicationText = customIndication 
      ? `, ${customIndication}` 
      : '';
    
    const findingsText = Object.entries(findings)
      .filter(([_, value]) => value)
      .map(([key]) => currentExam.findings[parseInt(key)])
      .join('\n');

    const report = `POCUS ${examName}

INDICATIONS: ${selectedIndicationsText}${customIndicationText}

FINDINGS:
${findingsText || 'No significant findings'}`;

    setReportText(report);
  };

  const currentExam = examData[module]?.[examType];
  if (!currentExam) {
    return <div>Exam type not yet implemented</div>;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Indications:</h2>
        <div className="space-y-2">
          {currentExam.indications.map((indication, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedIndications.includes(index)}
                onChange={() => handleIndicationChange(index)}
                className="rounded border-gray-300"
              />
              <span>{indication}</span>
            </label>
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium">Other indication:</label>
          <input
            type="text"
            value={customIndication}
            onChange={(e) => setCustomIndication(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Suggested Views:</h2>
        <div className="bg-gray-50 p-4 rounded-md">
          {currentExam.suggestedViews}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Findings:</h2>
        <div className="space-y-2">
          {currentExam.findings.map((finding, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={findings[index] || false}
                onChange={() => handleFindingChange(index)}
                className="rounded border-gray-300"
              />
              <span>{finding}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={generateReport}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Generate Report
      </button>

      {reportText && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Report:</h2>
          <textarea
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
            className="w-full h-[300px] p-4 border rounded-md font-mono"
            readOnly
          />
        </div>
      )}
    </div>
  );
};

export default PocusReportForm;
