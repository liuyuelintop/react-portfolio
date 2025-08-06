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

    // Test 3: Try Hugging Face Inference API
    addResult('🧪 Testing HF Inference API...');
    
    const inferenceUrl = 'https://api-inference.huggingface.co/models/liuyuelintop/career_chatbots';
    const testMessage = "Hello, tell me about Yuelin's experience";
    
    try {
      const response = await fetch(inferenceUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: testMessage,
          parameters: {
            max_new_tokens: 100,
            temperature: 0.7,
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        addResult(`✅ Inference API success: ${JSON.stringify(data, null, 2)}`);
      } else if (response.status === 503) {
        addResult(`⏳ Inference API loading (503) - Model is starting up`);
      } else {
        addResult(`❌ Inference API failed: HTTP ${response.status}`);
      }
    } catch (e) {
      addResult(`❌ Inference API error: ${e.message}`);
    }

    // Test 4: Try Space direct API with FormData
    addResult('🧪 Testing Space API with FormData...');
    
    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify([testMessage, []]));
      
      const spaceResponse = await fetch('https://liuyuelintop-career-chatbots.hf.space/api/predict', {
        method: 'POST',
        body: formData,
      });

      if (spaceResponse.ok) {
        const spaceData = await spaceResponse.json();
        addResult(`✅ Space FormData API success: ${JSON.stringify(spaceData, null, 2)}`);
      } else {
        addResult(`❌ Space FormData API failed: HTTP ${spaceResponse.status}`);
      }
    } catch (e) {
      addResult(`❌ Space FormData API error: ${e.message}`);
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