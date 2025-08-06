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

    // Test 3: Try Gradio 4.x queue API
    const baseUrl = 'https://liuyuelintop-career-chatbots.hf.space';
    
    addResult('🧪 Testing Gradio 4.x Queue API...');
    
    try {
      const joinResponse = await fetch(`${baseUrl}/queue/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: ['Hello', []],
          event_data: null,
          fn_index: 0,
          session_hash: Math.random().toString(36).substring(2)
        })
      });

      if (joinResponse.ok) {
        const joinData = await joinResponse.json();
        addResult(`✅ Queue join successful: ${JSON.stringify(joinData)}`);
        
        if (joinData.event_id) {
          // Try to get result
          const resultResponse = await fetch(`${baseUrl}/queue/data`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              event_id: joinData.event_id,
              session_hash: joinData.session_hash
            })
          });
          
          if (resultResponse.ok) {
            const resultData = await resultResponse.json();
            addResult(`✅ Queue result: ${JSON.stringify(resultData)}`);
          } else {
            addResult(`❌ Queue data failed: HTTP ${resultResponse.status}`);
          }
        }
      } else {
        addResult(`❌ Queue join failed: HTTP ${joinResponse.status}`);
      }
    } catch (e) {
      addResult(`❌ Queue API error: ${e.message}`);
    }

    // Test 4: Try legacy predict API
    addResult('🧪 Testing legacy predict API...');
    
    try {
      const response = await fetch(`${baseUrl}/api/predict`, {
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
        addResult(`✅ Legacy API works: ${JSON.stringify(data, null, 2)}`);
      } else {
        addResult(`❌ Legacy API failed: HTTP ${response.status}`);
      }
    } catch (e) {
      addResult(`❌ Legacy API error: ${e.message}`);
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