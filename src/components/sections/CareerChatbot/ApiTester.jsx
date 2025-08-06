import React, { useState } from 'react';

const ApiTester = () => {
  const [testResults, setTestResults] = useState([]);
  const [isTesting, setIsTesting] = useState(false);

  const addResult = (result) => {
    setTestResults(prev => [...prev, result]);
  };

  const testGradioAPI = async () => {
    setIsTesting(true);
    setTestResults([]);
    
    addResult('🔍 Starting API tests...');

    // Test 1: Check if space is accessible
    try {
      const response = await fetch('https://liuyuelintop-career-chatbots.hf.space/', {
        method: 'HEAD',
        mode: 'no-cors'
      });
      addResult('✅ Space is accessible');
    } catch (e) {
      addResult(`❌ Space not accessible: ${e.message}`);
    }

    // Test 2: Get space info
    try {
      const infoResponse = await fetch('https://liuyuelintop-career-chatbots.hf.space/info');
      if (infoResponse.ok) {
        const info = await infoResponse.json();
        addResult(`✅ Space info: ${JSON.stringify(info, null, 2)}`);
      } else {
        addResult(`❌ Info endpoint failed: ${infoResponse.status}`);
      }
    } catch (e) {
      addResult(`❌ Info request failed: ${e.message}`);
    }

    // Test 3: Try predict API
    const endpoints = [
      'https://liuyuelintop-career-chatbots.hf.space/api/predict',
      'https://liuyuelintop-career-chatbots.hf.space/run/predict',
      'https://liuyuelintop-career-chatbots.hf.space/call/chat'
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: ['Hello', []],
            fn_index: 0
          })
        });

        if (response.ok) {
          const data = await response.json();
          addResult(`✅ ${endpoint}: ${JSON.stringify(data, null, 2)}`);
        } else {
          addResult(`❌ ${endpoint}: HTTP ${response.status}`);
        }
      } catch (e) {
        addResult(`❌ ${endpoint}: ${e.message}`);
      }
    }

    setIsTesting(false);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="font-bold mb-4">Gradio API Tester</h3>
      
      <button
        onClick={testGradioAPI}
        disabled={isTesting}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 disabled:opacity-50"
      >
        {isTesting ? 'Testing...' : 'Test API Connection'}
      </button>

      <div className="bg-black text-green-400 p-4 rounded font-mono text-sm max-h-96 overflow-y-auto">
        {testResults.map((result, index) => (
          <div key={index} className="mb-1">
            {result}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiTester;