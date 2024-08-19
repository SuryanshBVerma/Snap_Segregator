import JSZip from 'jszip';
import React, { useEffect, useState } from 'react'

const Result = ({ response, file }) => {

    const [extractedImages, setExtractedImages] = useState({ matched: [], unmatched: [] });
    const [activeTab, setActiveTab] = useState('matched');

    const extractZipFile = async (file, matchedFiles, unmatchedFiles) => {
        const zip = new JSZip();
        const contents = await zip.loadAsync(file);
        const matchedImages = [];
        const unmatchedImages = [];

        for (const [filename, file] of Object.entries(contents.files)) {
            if (!file?.dir) {
                const blob = await file.async('blob');
                const url = URL.createObjectURL(blob);
                if (matchedFiles.includes(filename)) {
                    matchedImages.push({ name: filename, url });
                } else if (unmatchedFiles.includes(filename)) {
                    unmatchedImages.push({ name: filename, url });
                }
            }
        }

        setExtractedImages({ matched: matchedImages, unmatched: unmatchedImages });
    };

    const downloadImages = (images) => {
        const zip = new JSZip();
        images.forEach((image) => {
            zip.file(image.name, fetch(image.url).then(res => res.blob()));
        });
        zip.generateAsync({ type: 'blob' }).then((content) => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = `${activeTab}_images.zip`;
            link.click();
        });
    };


    useEffect(() => {
        if (file && response && response.data) {
            extractZipFile(file, response.data?.matched, response.data?.unmatched);
        }
    }, [file, response]);

    return (
        <div className="mt-1 w-full max-w-4xl  rounded-2xl">
            <div className="flex justify-center mb-4">
                <button
                    className={`px-4 py-2 mr-2 rounded-lg ${activeTab === 'matched' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('matched')}
                >
                    Matched ({extractedImages.matched.length})
                </button>
                <button
                    className={`px-4 py-2 rounded-lg ${activeTab === 'unmatched' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('unmatched')}
                >
                    Unmatched ({extractedImages.unmatched.length})
                </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto border-slate-300 dark:bg-slate-700 p-5 rounded-xl">
                <div className="grid grid-cols-3 gap-4">
                    {extractedImages[activeTab].map((image, index) => (
                        <img key={index} src={image.url} alt={image.name} className="w-25 h-25 rounded-lg" />
                    ))}
                </div>
            </div>
            <div className="mt-4 flex justify-center">
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => downloadImages(extractedImages[activeTab])}
                >
                    Download {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Images
                </button>
            </div>
        </div>
    )
}

export default Result