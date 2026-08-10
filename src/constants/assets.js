import melbUniUltimate from "../assets/projects/melbUniUltimate.webp";
import moneyguardAiFinancePipeline from "../assets/projects/moneyguard-ai-finance-pipeline.webp";

const getImageSource = (image) => typeof image === "string" ? image : image.src;

export const projectImages = {
  melbUniUltimate: getImageSource(melbUniUltimate),
  moneyguardAiFinancePipeline: getImageSource(moneyguardAiFinancePipeline),
};
