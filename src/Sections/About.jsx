import React from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaBrain } from "react-icons/fa";
import { IoRocket } from "react-icons/io5";

const About = () => {
  return (
    <>
      {/* Container for demo purpose */}
      <div className="container my-24 mx-auto md:px-6" id='about'>
        {/* Section: Design Block */}
        <section className="mb-32 text-center">
          <h2 className="mb-16 text-3xl font-bold dark:text-white">
            Why is it so 
            <u className="text-primary dark:text-blue-600 p-2">great?</u>
          </h2>
          <div className="grid gap-x-6 md:grid-cols-3 lg:gap-x-12">
            <div className="mb-12 md:mb-0">
              <div className="mb-6 inline-block rounded-md bg-slate-300 p-4 text-primary ">
                <FaCloudUploadAlt />
              </div>
              <h5 className="mb-4 text-lg font-bold dark:text-blue-600"> Easy Upload </h5>
            </div>
            <div className="mb-12 md:mb-0">
              <div className="mb-6 inline-block rounded-md bg-slate-300 p-4 text-primary">
                <FaBrain/>
              </div>
              <h5 className="mb-4 text-lg font-bold dark:text-blue-600">AI-Powered Segregation</h5>
            </div>
            <div className="mb-12 md:mb-0">
              <div className="mb-6 inline-block rounded-md bg-slate-300  p-4 text-primary">
                <IoRocket/>
              </div>
              <h5 className="mb-4 text-lg font-bold dark:text-blue-600">Fast and Accurate</h5>
            </div>
          </div>
        </section>
        {/* Section: Design Block */}
      </div>
      {/* Container for demo purpose */}
    </>

  )
}

export default About
