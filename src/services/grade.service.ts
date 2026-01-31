export type GradeTier = 1 | 2 | 3 | 4;
export type GradeColor = "bronze" | "silver" | "gold";

class GradeService {
  constructor() {}

  getTier(pooTrophees: number): GradeTier {
    return 1;
  }

  getColor(pooTrophees: number): GradeColor {
    return "bronze";
  }
}

export default new GradeService();
