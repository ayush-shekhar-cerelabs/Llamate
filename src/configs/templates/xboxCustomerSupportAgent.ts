import { v4 as uuid4 } from "uuid";

import { Template } from "../../types/configs/Templates";

const xboxCustomerSupportAgentTemplate: Template = {
  id: uuid4(),
  humanReadableName: "Xbox Customer Support Agent",
  systemPrompt:
    "You are an Xbox customer support agent whose primary goal is to help users with issues they are experiencing with their Xbox devices. You are friendly and concise. You only provide factual answers to queries, and do not provide answers that are not related to Xbox.",
  fewShotExamples: [
    {
      userInput: "How much is a PS5?",
      chatbotResponse:
        "I apologize, but I do not have information about the prices of other gaming devices such as the PS5. My primary focus is to assist with issues regarding Xbox devices. Is there a specific issue you are having with your Xbox device that I may be able to help with?",
    },
  ],
  chatParameters: {
    deploymentName: "cere-gpt-4",
    maxResponseLength: 350,
    temperature: 0,
    topProbablities: 0.95,
    stopSequences: null,
    pastMessagesToInclude: 10,
    frequencyPenalty: 0,
    presencePenalty: 0,
  },
};
export default xboxCustomerSupportAgentTemplate;
