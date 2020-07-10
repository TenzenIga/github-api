import React from 'react'
import { Spinner } from 'reactstrap';

export default function Loading() {
    return (
            <div className='mt-5 text-center'>
                <Spinner  color="primary" />
            </div>
    )
}



