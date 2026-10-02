import dshConversationExporter from "../assets/projects/dsh-conversation-exporter.webp";
import jobSearchDispatch from "../assets/projects/job-search-dispatch.png";
import marshal from "../assets/projects/marshal.webp";
import moneyguardAiFinancePipeline from "../assets/projects/moneyguard-ai-finance-pipeline.webp";

const getImageSource = (image) => typeof image === "string" ? image : image.src;

export const projectImages = {
  marshal: getImageSource(marshal),
  jobSearchDispatch: getImageSource(jobSearchDispatch),
  dshConversationExporter: getImageSource(dshConversationExporter),
  moneyguardAiFinancePipeline: getImageSource(moneyguardAiFinancePipeline),
};
