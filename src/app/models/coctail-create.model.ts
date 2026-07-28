import { Step } from "./step.model";

export interface CocktailCreate {
  name: string;
  description: string;
  steps: Step[];
  image: Blob | null;
}
