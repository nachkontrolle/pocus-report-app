import React, { useState } from 'react';
import PocusReportForm from './PocusReportForm';

interface ModuleType {
  name: string;
  exams: {
    [key: string]: string;
  };
}

interface ModulesType {
  [key: string]: ModuleType;
}

const PocusNavigation: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string>('');
  const [selectedExam, setSelectedExam] = useState<string>('');

  const modules: ModulesType = {
    basic: {
      name: 'Basic Emergency',
      exams: {
        fluid: 'Free Fluid Assessment',
        vascular: 'Vascular Assessment',
        dvt: 'DVT Assessment',
        biliary: 'Biliary Assessment',
        renal: 'Renal Assessment'
      }
    },
    lung: {
      name: 'Lung/Thoracic',
      exams: {
        blines: 'B-line Assessment',
        pleural: 'Pleural Line Assessment',
        effusion: 'Pleural Effusion',
        consolidation: 'Lung Consolidation'
      }
    },
    cardiac: {
      name: 'Focused Cardiac',
      exams: {
        basic: 'Basic Cardiac Assessment',
        shock: 'Shock Assessment',
        arrest: 'Cardiac Arrest'
      }
    }
  };

  const handleBack = () => {
    if (selectedExam) {
      setSelectedExam('');
    } else {
      setSelectedModule('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">POCUS Report Generator</h1>
          {(selectedModule || selectedExam) && (
            <button 
              onClick={handleBack}
              className="px-4 py-2 bg-white border rounded-md hover:bg-gray-50"
            >
              Back
            </button>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {!selectedModule && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(modules).map(([key, module]) => (
                <button
                  key={key}
                  onClick={() => setSelectedModule(key)}
                  className="h-24 text-lg bg-white border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {module.name}
                </button>
              ))}
            </div>
          )}

          {selectedModule && !selectedExam && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(modules[selectedModule].exams).map(([key, name]) => (
                <button
                  key={key}
                  onClick={() => setSelectedExam(key)}
                  className="h-16 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {name}
                </button>
              ))}
            </div>
          )}

          {selectedModule && selectedExam && (
            <PocusReportForm 
              module={selectedModule}
              examType={selectedExam}
              examName={modules[selectedModule].exams[selectedExam]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PocusNavigation;
