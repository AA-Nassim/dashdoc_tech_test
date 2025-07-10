
import Header from "./components/Header";
import PopUp from "./components/PopUp";
import { usePopUp } from "./contexts/PopUpContext";
import AdressSection from "./sections/AdressSection";
import PathSection from "./sections/PathSection";
import StepSection from "./sections/StepSection";

function App() {

  const {isOpen} = usePopUp()

  return (
    <div className="flex flex-col gap-5 p-5 w-full">
      {isOpen? <PopUp /> : null}
      <Header />
      <div className="flex flex-col lg:flex-row gap-5 w-full justify-around ">
        <AdressSection />
        <StepSection />
        <PathSection />
      </div>
    </div>
  );
}

export default App
