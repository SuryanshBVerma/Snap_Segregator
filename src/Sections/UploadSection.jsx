import React from 'react'
import Upload from '../Components/Upload'
import { Button } from '@chakra-ui/react'

const UploadSection = () => {
  return (
    <>
      <div className='bg-blue-100 flex justify-center p-9 m-10 rounded-xl shadow-2xl lg:h-[600px] border-slate-300 dark:bg-slate-600' id='upload'>
        <Upload />
      </div>

      

    </>
  )
}

export default UploadSection
