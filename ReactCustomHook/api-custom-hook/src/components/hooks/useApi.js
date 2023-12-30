import React, { useEffect, useState } from 'react'

const useApi = (url) => {

    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const resp = await fetch(url);
                const result = await resp.json();
                setData(result);
            } catch (error) {
                setError(error);
            }finally{
                setTimeout(()=>{
                    setLoading(false);
                },5000)
            }
        }

        fetchData();
    },[url])

  return { data, loading, error };
}

export default useApi