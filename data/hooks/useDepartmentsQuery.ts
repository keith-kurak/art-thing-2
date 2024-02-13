import { useQuery, useQueryClient } from "@tanstack/react-query";
import { uniq } from "lodash";

const data = require("../api/cma_artwork.json");
const departments = uniq(data.data.map((item: any) => item.department));

export const useDepartmentsQuery = function() {
  const queryClient = useQueryClient();

  // Queries
  const query = useQuery({
    queryKey: [`categories`],
    queryFn: async () => {
      return departments
    },
  });

  return query;
}