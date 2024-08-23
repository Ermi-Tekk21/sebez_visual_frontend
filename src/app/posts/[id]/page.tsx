
"use client"

import { useParams, useSearchParams } from "next/navigation"

const PostId=()=>{
    const params = useParams()
    const searchParams = useSearchParams()
    const newParams = searchParams.get('name')
    console.log(params);
    console.log(newParams);
        
return <main>
    hello
</main>
}

export default PostId;