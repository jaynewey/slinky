import { DataSet } from "vis-data";
import { IdType } from "vis-network";

export const newId = (dataSet: DataSet<any>): number => {
  return dataSet.length
    ? Math.max(
        ...dataSet.map((data) =>
          Number.isFinite(data.id) ? Number(data.id) : 0
        )
      ) + 1
    : 0;
};
