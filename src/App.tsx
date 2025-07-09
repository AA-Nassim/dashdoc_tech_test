import AdressSection from "./sections/AdressSection";
import PathSection from "./sections/PathSection";
import StepSection from "./sections/StepSection";

function App() {


  return (
    <div className="flex flex-col lg:flex-row gap-5 p-5 w-full justify-around ">
      <AdressSection />
      <StepSection />
      <PathSection />
    </div>
  );
}

export default App
