"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/trpc/client";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

const QuestionsList = ({ thingId }: { thingId: string }) => {
  const [questions] = trpc.getQuestionsByThingId.useSuspenseQuery({ thingId });
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleInputChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Answers:", answers);
    alert(JSON.stringify(answers, null, 2));
  };

  if (questions.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">No questions found.</div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {questions.map((q) => (
          <div
            key={q.id}
            className="p-6 border rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow"
          >
            <Label htmlFor={q.id} className="text-lg font-semibold block mb-2">
              {q.questionText}
            </Label>
            <p className="text-sm text-gray-500 mb-4">{q.answerText}</p>
            <Input
              id={q.id}
              placeholder="Your answer..."
              value={answers[q.id] || ""}
              onChange={(e) => handleInputChange(q.id, e.target.value)}
              className="w-full"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <Button type="submit" className="w-full md:w-auto">
          Submit Answers
        </Button>

        <div className="mt-8 p-4 bg-gray-100 rounded-lg overflow-auto">
          <h3 className="font-semibold mb-2 text-sm text-gray-700">
            Current State:
          </h3>
          <pre className="text-xs">{JSON.stringify(answers, null, 2)}</pre>
        </div>
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
