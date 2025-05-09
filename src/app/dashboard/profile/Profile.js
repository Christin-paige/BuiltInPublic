'use client';

import useUser from "../../hook/useUser";
import Image from "next/image";

export default function Profile() {
 
   const { isFetching, data} = useUser();
    
    if(isFetching) {
        return <></>
    }
    return (
      <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto px-4 gap-4">
            {!data?.id ? (
                <h1>profile</h1>

            ) : (

       
           <Image src={data.avatar_url || ""} alt={data.name || ""} 
           width={100}
           height={100}
           className="rounded-full "/>
            )}
            
            <h1 className="text-md font-bold justify-items-center">{data?.name}</h1>
        </div>
    )
}
