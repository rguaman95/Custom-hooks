import { useEffect, useState } from "react"

const localCache = {};

export const useFetch = (url) => {

    const [state, setstate] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null
    });

    useEffect( () => {
        getFecth();
    }, [url]);

    const setLoadingState = () =>{
        setstate({
            data: null,
            isLoading: true,
            hasError: false,
            error: null
        })
    }

    const getFecth = async () => {

        if( localCache[url] ){

            setstate({
                data:   localCache[url],
                isLoading :false,
                hasError:false,
                error:null
            });
            return;
        }

        setLoadingState();

        const resp = await fetch(url);

        await new Promise(resolve => setTimeout(resolve, 1500))

        if(!resp.ok){
            setstate({
                data:null,
                isLoading:false,
                hasError:true,
                error:{
                    code:resp.status,
                    message:resp.statusText
                }
            });

            return;
        }


        const data = await resp.json();

        setstate({
            data :data,
            isLoading:false,
            hasError:false,
            error:null
        })

        //manejo del cache

        localCache[url] =data;

    }




  return {
    data: state.data,
    isLoading :state.isLoading,
    hasError :state.hasError
  }
}
