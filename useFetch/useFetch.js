import { useEffect, useState } from "react"

const localCache = { }

export const useFetch = (url) => {

    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null
    });

    useEffect(() => {
      getFetch();
    }, [url])


    const setLoadingState = () => {
      setState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null
      })
    }

    const getFetch = async() => {

      if(localCache[url]) {
        setState({
          data: localCache[url],
          isLoading: false,
          hasError: false,
          error: null
        });
        console.log('usando cache');
        return
      }

        setLoadingState()
        const resp = await fetch(url);
        const data = await resp.json();

        //sleep
        await new Promise(resolve => setTimeout(resolve, 1500));

        if(!resp.ok) {
          setState({
            data: null,
            isLoading: false,
            hasError: true,
            error: {
              message: resp.statusText
            }
          })
          return;
        }

        setState({
          data: data,
          isLoading: false,
          hasError: false,
          error: null
        })

        //Manejo del cache
        localCache[url] = data;
    }
    

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError

  }
}
