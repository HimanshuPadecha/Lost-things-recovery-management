"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/trpc/client";
import { useUser } from "@clerk/nextjs";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { toast } from "sonner";

const QuestionsList = ({ thingId }: { thingId: string }) => {
  const [questions] = trpc.getQuestionsByThingId.useSuspenseQuery({ thingId });
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleInputChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const trigger = trpc.callFlow.useMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Answers:", answers);
    const verification_items = questions.map((q) => ({
      question: q.questionText,
      correct_answer: q.answerText,
      user_answer: answers[q.id] || "",
    }));

    trigger.mutate({ thingId, verfication: verification_items });
  };

  if (questions.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">No questions found.</div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {questions.map((q, index) => (
  <div
    key={q.id}
    className="group p-6 border border-gray-200 rounded-xl bg-white hover:border-blue-300 hover:shadow-lg transition-all duration-200"
  >
    {/* Question number and text */}
    <div className="flex gap-3 mb-4">
      <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold group-hover:bg-blue-100 transition-colors">
        {index + 1}
      </span>
      <Label 
        htmlFor={q.id} 
        className="text-lg font-medium text-gray-900 leading-relaxed cursor-pointer"
      >
        {q.questionText}
      </Label>
    </div>

    {/* Input field */}
    <Input
      id={q.id}
      placeholder="Type your answer here..."
      value={answers[q.id] || ""}
      onChange={(e) => handleInputChange(q.id, e.target.value)}
      className="w-full px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
    />

    {/* Optional: Character count or validation indicator */}
    {answers[q.id] && (
      <p className="mt-2 text-sm text-gray-500">
        {answers[q.id].length} characters
      </p>
    )}
  </div>
))}
      </div>

      <div className="flex flex-col gap-4">
        <Button type="submit" className="w-full md:w-auto">
          Submit Answers
        </Button>
      </div>
    </form>
  );
};

export const QuestionView = ({ thingId }: { thingId: string }) => {
  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Answer Questions</h1>
      <ErrorBoundary
        fallback={
          <div className="text-red-500 p-4 border border-red-200 rounded">
            Error loading questions
          </div>
        }
      >
        <Suspense
          fallback={
            <div className="flex justify-center p-12 text-gray-500">
              Loading questions...
            </div>
          }
        >
          <QuestionsList thingId={thingId} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
