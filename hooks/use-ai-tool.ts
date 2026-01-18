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

            const result = await response.json();
            setData(result);
        } catch (err: any) {
            console.error('AI Tool Error:', err);
            setError(err.message || 'An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, data, generate };
}
