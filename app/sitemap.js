import { CASE_STUDIES } from "../src/constants/caseStudies";

export const dynamic = "force-static";

export default function sitemap() {
  return [
    {
      url: "https://www.liuyuelin.dev/",
    },
    ...Object.values(CASE_STUDIES).map((caseStudy) => ({
      url: caseStudy.canonical,
    })),
  ];
}
