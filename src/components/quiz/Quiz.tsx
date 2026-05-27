import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Shell } from "./Shell";
import { Answers } from "./types";
import { StepIntro } from "./steps/StepIntro";
import { StepGoal } from "./steps/StepGoal";
import { StepSegment } from "./steps/StepSegment";
import { StepBudget } from "./steps/StepBudget";
import { StepCapture } from "./steps/StepCapture";
import { StepSuccess } from "./steps/StepSuccess";
import { submitLeadToSheet } from "@/lib/lead-submit";

const TOTAL = 6;

export function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));
  const update = (patch: Partial<Answers>) => setAnswers((a) => ({ ...a, ...patch }));

  const stepNumber = Math.min(step + 1, TOTAL);
  const showProgress = step > 0 && step <= 5;
  const canGoBack = step > 0 && step !== 5;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = step === 0 ? "#inicio" : `#etapa${step}`;
    window.history.replaceState(null, "", hash);
  }, [step]);

  return (
    <Shell step={stepNumber} totalSteps={TOTAL} showProgress={showProgress} onBack={canGoBack ? back : undefined}>

      <AnimatePresence mode="wait">
        {step === 0 && <StepIntro key="intro" exploTag="#inicio" onStart={next} />}
        {step === 1 && (
          <StepGoal
            key="goal"
            exploTag="#etapa1"
            value={answers.goal}
            onSelect={(v) => {
              update({ goal: v });
              next();
            }}
          />
        )}
        {step === 2 && (
          <StepSegment
            key="segment"
            exploTag="#etapa2"
            value={answers.segment}
            onSelect={(v) => {
              update({ segment: v });
              next();
            }}
          />
        )}
        {step === 3 && (
          <StepBudget
            key="budget"
            exploTag="#etapa3"
            value={answers.budget}
            onSelect={(v) => {
              update({ budget: v });
              next();
            }}
          />
        )}
        {step === 4 && (
          <StepCapture
            key="capture"
            exploTag="#etapa4"
            answers={answers}
            onSubmit={async (v) => {
              const nextAnswers = { ...answers, ...v };
              update(v);
              await submitLeadToSheet(nextAnswers);
              next();
            }}
          />
        )}
        {step === 5 && <StepSuccess key="success" exploTag="#etapa5" answers={answers} />}
      </AnimatePresence>
    </Shell>
  );
}
