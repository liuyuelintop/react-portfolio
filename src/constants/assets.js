import dshConversationExporter from "../assets/projects/dsh-conversation-exporter.webp";
import moneyguardAiFinancePipeline from "../assets/projects/moneyguard-ai-finance-pipeline.webp";

const getImageSource = (image) => typeof image === "string" ? image : image.src;

export const projectImages = {
  dshConversationExporter: getImageSource(dshConversationExporter),
  moneyguardAiFinancePipeline: getImageSource(moneyguardAiFinancePipeline),
};
