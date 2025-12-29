
  export type ProjectType = {
  _id: string;
  name: string;
  code?: string;
  language?: string;
  owners?: string[];
};

 export type SaveStatus = "idle" | "saving" | "saved" | "error";
