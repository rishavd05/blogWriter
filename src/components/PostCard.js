import  bucketService from '../AppWrite/bucket_service'
import React from 'react'
import { Link } from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
  return (
    <Link to= {`/post/${$id}`}> 
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <img src={bucketService.previewFile(featuredImage)} alt={title} className='rounded-xl' />
        </div>
        <h2 className='text-xl font-bold'>
            {title}
        </h2>

    </Link>
  )
}

export default PostCard