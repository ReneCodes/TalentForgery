import { DataType } from "../../utils/types";

const filter = (filterType: string, arr: DataType[]) => {
  switch (filterType) {
    case "newest":
      arr.sort((a, b) => {
        const dateA = new Date(a.access_date).getTime();
        const dateB = new Date(b.access_date).getTime();
        return dateA - dateB;
      });
      return arr;
    case "oldest":
      arr.sort((a, b) => {
        const dateA = new Date(a.access_date).getTime();
        const dateB = new Date(b.access_date).getTime();
        return dateB - dateA;
      });
      return arr;
    default:
      return arr;
  }
};

export default filter;
