import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";
import getFetchUrl from "@/lib/getPortUrl";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  stega: {
    studioUrl: getFetchUrl,
  },
});
