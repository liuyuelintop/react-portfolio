import dshConversationExporter from "../assets/projects/dsh-conversation-exporter.webp";
import jobSearchDispatch from "../assets/projects/job-search-dispatch.png";

const getImageSource = (image) => typeof image === "string" ? image : image.src;

export const projectImages = {
  jobSearchDispatch: getImageSource(jobSearchDispatch),
  dshConversationExporter: getImageSource(dshConversationExporter),
};
