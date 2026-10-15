import { describe, it, expect } from "vitest";
import {
  GRADES, getRandomQuestions, getThemesForGrade, getThemeQuestionCount, getChaptersForGrade,
  parseNumericAnswer, checkAnswer,
} from "./index";

describe("Banques de questions", () => {
  for (const grade of GRADES) {
    describe(grade, () => {
      const all = getRandomQuestions(100000, grade, "melange");

      it("chaque chapitre contient des questions", () => {
        for (const chapter of getChaptersForGrade(grade)) {
          expect(getThemeQuestionCount(chapter.id, grade), chapter.name).toBeGreaterThan(10);
        }
      });

      it("les QCM contiennent leur bonne réponse, sans doublon", () => {
        for (const q of all.filter(q => q.options)) {
          expect(q.options, q.text).toContain(q.answer);
          expect(new Set(q.options).size, q.text).toBe(q.options!.length);
        }
      });

      it("les réponses numériques sont lisibles par le correcteur", () => {
        for (const q of all.filter(q => !q.options)) {
          expect(Number.isNaN(parseNumericAnswer(q.answer)), `${q.text} → ${q.answer}`).toBe(false);
          expect(checkAnswer(q.answer.replace(".", ","), q.answer), q.text).toBe(true);
        }
      });

      it("aucune valeur NaN / undefined dans les énoncés", () => {
        for (const q of all) expect(`${q.text} ${q.answer} ${q.hint ?? ""}`, q.text).not.toMatch(/NaN|undefined|Infinity/);
      });

      it("un tirage de 20 questions est varié", () => {
        const draw = getRandomQuestions(20, grade, "melange");
        expect(draw).toHaveLength(20);
        expect(new Set(draw.map(q => q.category)).size).toBeGreaterThanOrEqual(12);
      });

      it("propose « Toutes les notions »", () => {
        expect(getThemesForGrade(grade).some(t => t.id === "melange")).toBe(true);
      });
    });
  }
});

describe("Correcteur", () => {
  it.each([
    ["0,33", "1/3", true], ["1/3", "0.333", true], ["-3/10", "-0.3", true], ["0,7", "0.7", true],
    ["0", "0.0001", false], ["7", "0.7", false], ["-4", "4", false], ["2", "2.5", false],
  ])("%s pour %s → %s", (user, answer, expected) => {
    expect(checkAnswer(user as string, answer as string)).toBe(expected);
  });
});
