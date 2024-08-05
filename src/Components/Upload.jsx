import React, { useState } from 'react';
import axios from 'axios';
import { zip } from '../assets';

const Upload = () => {
    const [fileName, setFileName] = useState('');
    const [referencePic, setReferencePic] = useState('');
    const [zipFile, setZipFile] = useState(null);
    const [referenceFile, setReferenceFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/x-zip-compressed') {
            setFileName(file.name);
            setZipFile(file);
        } else {
            alert('Please upload a zip file.');
        }
    };

    const handleReferencePic = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            setReferencePic(file.name);
            setReferenceFile(file);
        } else {
            alert('Please upload a JPEG, JPG, or PNG file.');
        }
    };

    const handleSubmit = async () => {
        if (!zipFile || !referenceFile) {
            alert('Please upload both the zip file and the reference image.');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        const formData = new FormData();
        formData.append('zip_file', zipFile);
        formData.append('reference_image', referenceFile);

        try {
            const response = await axios.post('https://4ca6-34-124-184-96.ngrok-free.app/segregate', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },

                timeout: 1200000 // 60 seconds timeout
            });


            console.log(response.data);

            // setResult(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex gap-3 flex-col lg:flex-row justify-center items-center'>
                    <div
                        className={`w-[200px] md:w-[300px] md:h-[300px]  lg:w-[400px] relative border-2 border-dashed rounded-lg p-6 flex items-center justify-center ${fileName ? 'border-green-600 ' : 'border-gray-300'}`}
                        id="dropzone"
                    >
                        <input
                            type="file"
                            accept=".zip"
                            className="absolute inset-0 w-full h-full opacity-0 z-50"
                            onChange={handleFileChange}
                        />
                        <div className="text-center">
                            {fileName ? (
                                <>
                                    <img
                                        className="mx-auto h-12 w-12"
                                        src={zip}
                                        alt=""
                                    />
                                    <p className="mt-2 text-green-600">Uploaded: {fileName}</p>

                                </>
                            ) : (
                                <>
                                    <img
                                        className="mx-auto h-12 w-12"
                                        src={zip}
                                        alt=""
                                    />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                                        <label htmlFor="file-upload" className="relative cursor-pointer">
                                            <span>Drag and drop</span>
                                            <span className="text-blue-600"> or browse </span>
                                            <span>to upload</span>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                accept=".zip"
                                                className="sr-only"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                    </h3>
                                    <p className="mt-1 text-xs text-gray-200">ZIP files up to 10MB</p>
                                </>
                            )}
                        </div>
                    </div>

                    <div
                        className={`w-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] relative border-2 border-dashed rounded-lg p-6 flex items-center justify-center ${referencePic ? 'border-green-600 ' : 'border-gray-300'} sm:w-[200px]`}
                        id="reference-dropzone"
                    >
                        <input
                            type="file"
                            accept=".jpeg, .jpg, .png"
                            className="absolute inset-0 w-full h-full opacity-0 z-50"
                            onChange={handleReferencePic}
                        />
                        <div className="text-center">
                            {referencePic ? (
                                <>
                                    <img
                                        className="mx-auto h-12 w-12"
                                        src={zip} // Ideally, this should be an image icon, change it accordingly.
                                        alt=""
                                    />
                                    <p className="mt-2 text-green-600">Uploaded: {referencePic}</p>
                                </>
                            ) : (
                                <>
                                    <img
                                        className="mx-auto h-12 w-12"
                                        src="https://www.svgrepo.com/show/357902/image-upload.svg"
                                        alt=""
                                    />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                                        <label htmlFor="reference-upload" className="relative cursor-pointer">
                                            <span>Drag and drop</span>
                                            <span className="text-blue-600"> or browse </span>
                                            <span>to upload</span>
                                            <input
                                                id="reference-upload"
                                                name="reference-upload"
                                                type="file"
                                                accept=".jpeg, .jpg, .png"
                                                className="sr-only"
                                                onChange={handleReferencePic}
                                            />
                                        </label>
                                    </h3>
                                    <p className="mt-1 text-xs text-gray-200">Upload a reference picture (JPEG, JPG, or PNG)</p>
                                </>
                            )}

                        </div>
                    </div>
                </div>

                {
                    fileName && referencePic && (
                        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
                            <button
                                className="flex w-full items-center justify-center rounded-lg border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 md:py-4 md:px-10 md:text-lg"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : 'Get started 🚀'}
                            </button>
                        </div>
                    )
                }

                {error && (
                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
                        <p className="text-red-600">{error}</p>
                    </div>
                )}

                {result && (
                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
                        <div className="text-green-600">
                            <p>Matched Images: {result.matched.join(', ')}</p>
                            <p>Unmatched Images: {result.unmatched.join(', ')}</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Upload;
