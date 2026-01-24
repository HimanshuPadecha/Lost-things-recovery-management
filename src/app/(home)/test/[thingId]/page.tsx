import { HydrateClient, trpc } from "@/trpc/server";
import { QuestionView } from "./question-view";

const Page = async (props: { params: Promise<{ thingId: string }> }) => {
  const params = await props.params;
  const { thingId } = params;

  if (thingId) {
    void trpc.getQuestionsByThingId.prefetch({ thingId });
  }

  return (
    <HydrateClient>
      <QuestionView thingId={thingId} />
    </HydrateClient>
  );
};

export default Page;
