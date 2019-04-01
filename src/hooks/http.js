import { useState, useEffect } from 'react';

export const useHttp = (url, dependencies) => {

    const [isLoading, setIsLoading] = useState(false);
    const [fetchedData, setFetchedData] = useState(null);

    useEffect(() => {
        // componentDidMount
        setIsLoading(true);
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch.');
                }
                return response.json();
            })
            .then(data => {
                setIsLoading(false);
                setFetchedData(data);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });

    }, dependencies);
    // With empty array is the same to 'componentDidMount' (just runs once)
    // Adding a dependency works like 'componentDidUpdate' (runs again when this info changes)

    return [isLoading, fetchedData];
};