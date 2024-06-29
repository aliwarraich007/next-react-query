import {useProjects} from "@/@core/services/queries";
import {useState} from "react";


export default function Project () {
    const [page, setPage] = useState(1);
    const {data,
        isPending,
        error,
        isError,
        isPlaceholderData,
        isFetching } = useProjects(page);
    return (
       <div>
           {isPending ?
               'Loading...' :
               isError ?
                   'Error occurred' :
                   (
               <div>
                   {data.map((item) => (
                       <p key={item.id}>
                           {item.name}
                       </p>
                   ))}
               </div>
           )}
           <span>Current page: {page}</span>
           <button onClick={() => setPage((prev) => Math.max(prev - 1, 0))}>Previous page</button>
           <button onClick={() => {
               if(!isPlaceholderData) setPage((prev) => prev + 1)
           }} disabled={isPlaceholderData}>Next page</button>
           {
               isFetching ? "loading..." : null
           }
       </div>
    )
}