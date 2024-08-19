import React, { useState } from 'react'
import Upload from '../Components/Upload'
import { Button } from '@chakra-ui/react'
import Result from '../Components/Result'

const UploadSection = () => {
  const [response, setResponse] = useState(null)
  const [file, setFile] = useState(null);

  return (
    <>
      <div className='bg-blue-100 flex justify-center p-9 m-10 rounded-xl shadow-2xl lg:h-[600px] border-slate-300 dark:bg-slate-600' id='upload'>
        <Upload setResponse={setResponse} setFile={setFile} />
      </div>

      <div>
        {response ? (

          <div className='bg-blue-100 flex justify-center p-9 m-10 rounded-xl shadow-2xl lg:h-[600px] border-slate-300 dark:bg-slate-600'>
            <Result response={response} file={file} />
          </div>
        ) : (
          <div></div>
        )

        }
      </div>



    </>
  )
}

export default UploadSection
