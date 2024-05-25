import { MutableRefObject, useEffect, useState } from 'react'


const useInfiniteScroller = (callback: () => Promise<unknown>, observerTarget:MutableRefObject<null>) => {
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const observer = new IntersectionObserver(
          entries => {
            if (entries[0].isIntersecting) {
                setPage(p => p + 1)
            }
          },
          { rootMargin: "30px", threshold: 1 }
        );
      
        if (observerTarget.current) {
          observer.observe(observerTarget.current);
        }
      
        return () => {
          if (observerTarget.current) {
            observer.unobserve(observerTarget.current);
          }
        };
    }, [observerTarget]);



    useEffect(() => {
        
        setIsLoading(true)
        window.setTimeout(callback, 500);       
    }, [page])


    return {
        page,
        isLoading, setIsLoading
    }
}
export default useInfiniteScroller