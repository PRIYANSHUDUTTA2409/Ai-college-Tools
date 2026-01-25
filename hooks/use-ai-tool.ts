import { useState } from 'react';

interface UseAiToolProps {
    apiEndpoint?: string;
    systemPrompt: string;
}

export function useAiTool<T>({ apiEndpoint = '/api/chat', systemPrompt }: UseAiToolProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<T | null>(null);

    const generate = async (input: string) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: input,
                    systemPrompt,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const apiResponse = await response.json();
            console.log('Raw API Response:', apiResponse);

            let parsedData = apiResponse;

            // Handle { result: "stringified json" } format
            if (apiResponse.result && typeof apiResponse.result === 'string') {
                try {
                    // Fuzzy match JSON object or array to ignore pre/postamble
                    const match = apiResponse.result.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
                    const jsonStr = match ? match[0] : apiResponse.result.replace(/```json|```/g, '');

                    parsedData = JSON.parse(jsonStr);
                } catch (e) {
                    console.warn('Failed to parse inner JSON result, using raw string:', e);
                    parsedData = apiResponse.result;
                }
            } else if (apiResponse.result) {
                // Handle { result: object } format
                parsedData = apiResponse.result;
            }

            // Normalization: Ensure we have { items: [...] } structure
            if (Array.isArray(parsedData)) {
                parsedData = { items: parsedData };
            } else if (parsedData && typeof parsedData === 'object' && !parsedData.items) {
                // If missing 'items', look for any array property
                const arrayVal = Object.values(parsedData).find(v => Array.isArray(v));
                if (arrayVal) {
                    parsedData = { items: arrayVal };
                }
            }

            console.log('Final Parsed Data:', parsedData);
            setData(parsedData);
        } catch (err: any) {
            console.error('AI Tool Error:', err);
            setError(err.message || 'An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, data, generate };
}
