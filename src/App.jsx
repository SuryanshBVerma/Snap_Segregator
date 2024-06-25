import Header from "./Components/Header"
import Home from "./Sections/Home"
import About from "./Sections/About"
import Contact from "./Sections/Contact"
import UploadSection from "./Sections/UploadSection"


function App() {


  return (
    <>
      <div className="bg-white dark:bg-slate-800">
        <Header/>
        <Home />
        <About />
        <UploadSection/>
        <Contact />
      </div>

    </>
  )
}

export default App
