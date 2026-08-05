import melbUniUltimate from "../assets/projects/melbUniUltimate.webp";
import alexAwsMultiAgentWealthPlatform from "../assets/projects/alex-aws-multi-agent-wealth-platform.webp";
import moneyguardAiFinancePipeline from "../assets/projects/moneyguard-ai-finance-pipeline.webp";

const getImageSource = (image) => typeof image === "string" ? image : image.src;

export const projectImages = {
  melbUniUltimate: getImageSource(melbUniUltimate),
  alexAwsMultiAgentWealthPlatform: getImageSource(alexAwsMultiAgentWealthPlatform),
  moneyguardAiFinancePipeline: getImageSource(moneyguardAiFinancePipeline),
};
