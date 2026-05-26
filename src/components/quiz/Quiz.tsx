import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Shell } from "./Shell";
import { Answers } from "./types";
import { StepIntro } from "./steps/StepIntro";
import { StepGoal } from "./steps/StepGoal";
import { StepChannel } from "./steps/StepChannel";
import { StepSegment } from "./steps/StepSegment";
import { StepBudget } from "./steps/StepBudget";
import { StepCnpj } from "./steps/StepCnpj";
import { StepProcessing } from "./steps/StepProcessing";
import { StepCapture } from "./steps/StepCapture";
import { StepSuccess } from "./steps/StepSuccess";
import { submitLeadToSheet } from "@/lib/lead-submit";

const TOTAL = 8;

export function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));
  const update = (patch: Partial<Answers>) => setAnswers((a) => ({ ...a, ...patch }));

  const stepNumber = Math.min(Math.max(step, 1), TOTAL);
  const showProgress = step > 0 && step <= TOTAL;
  // Back is allowed on all steps except intro (0), processing (6) and success (8).
  const canGoBack = step > 0 && step !== 6 && step !== 8;

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
          <StepChannel
            key="channel"
            exploTag="#etapa2"
            value={answers.channel}
            onSelect={(v) => {
              update({ channel: v });
              next();
            }}
          />
        )}
        {step === 3 && (
          <StepSegment
            key="segment"
            exploTag="#etapa3"
            value={answers.segment}
            onSelect={(v) => {
              update({ segment: v });
              next();
            }}
          />
        )}
        {step === 4 && (
          <StepBudget
            key="budget"
            exploTag="#etapa4"
            value={answers.budget}
            onSelect={(v) => {
              update({ budget: v });
              next();
            }}
          />
        )}
        {step === 5 && (
          <StepCnpj
            key="cnpj"
            exploTag="#etapa5"
            value={answers.cnpj}
            onSubmit={(v) => {
              update({ cnpj: v });
              next();
            }}
          />
        )}
        {step === 6 && <StepProcessing key="proc" exploTag="#etapa6" onDone={next} />}
        {step === 7 && (
          <StepCapture
            key="capture"
            exploTag="#etapa7"
            answers={answers}
            onSubmit={async (v) => {
              const nextAnswers = { ...answers, ...v };
              update(v);
              await submitLeadToSheet(nextAnswers);
              next();
            }}
          />
        )}
        {step === 8 && <StepSuccess key="success" exploTag="#etapa8" answers={answers} />}
      </AnimatePresence>
    </Shell>
  );
}
