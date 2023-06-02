import { useRouter } from "next/router";
import useCoffee from "../hooks/useCoffee";
const steps = [
  { step: 1, name: "Menú", url: "/", value: 10 },
  { step: 2, name: "Resumen", url: "/resumen", value: 50 },
  { step: 3, name: "Total", url: "/total", value: 100 },
];

const Steps = () => {
  const router = useRouter();

  const calculateProgress = () => {
    const step = steps.find((step) => step.url === router.pathname);
    return step.value;
  };

  const handleClickStep = (step) => {
    router.push(step.url);
  };

  return (
    <>
      <div className="flex justify-between mb-5">
        {steps.map((step) => (
          <button
            key={step.step}
            className="text-2xl font-bold"
            onClick={() => handleClickStep(step)}
          >
            {step.name}
          </button>
        ))}
      </div>

      <div className="bg-gray-100 md-10">
        <div
          className="rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white"
          style={{ width: `${calculateProgress()}%` }}
        ></div>
      </div>
    </>
  );
};

export default Steps;
