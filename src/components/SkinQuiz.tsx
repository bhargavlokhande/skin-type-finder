import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type Answer = "A" | "B" | "C" | "D" | "E";

interface Question {
  id: number;
  question: string;
  options: {
    value: Answer;
    text: string;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "Two to three hours after cleansing (no products applied), my skin feels:",
    options: [
      { value: "A", text: "Tight, slightly uncomfortable, or flaky" },
      { value: "B", text: "Noticeably oily or greasy" },
      { value: "C", text: "Oily on forehead/nose/chin, dry or tight on cheeks" },
      { value: "D", text: "Comfortable, supple, neither dry nor oily" },
      { value: "E", text: "Stinging, itchy, or slightly burning" },
    ],
  },
  {
    id: 2,
    question: "My pore size is:",
    options: [
      { value: "A", text: "Very small or barely visible" },
      { value: "B", text: "Clearly large and visible across most of the face" },
      { value: "C", text: "Large on the nose and forehead, small on cheeks" },
      { value: "D", text: "Small to medium, not particularly noticeable" },
      { value: "E", text: "Normal size, but skin often looks flushed/red" },
    ],
  },
  {
    id: 3,
    question: "By midday, the shine on my face is:",
    options: [
      { value: "A", text: "None – it actually looks dull or matte" },
      { value: "B", text: "Significant shine all over (I often need to blot or powder)" },
      { value: "C", text: "Shine only on T-zone, cheeks stay matte" },
      { value: "D", text: "Minimal or none" },
      { value: "E", text: "Little shine, but redness or irritation is visible" },
    ],
  },
  {
    id: 4,
    question: "I experience flakiness, rough patches, or peeling:",
    options: [
      { value: "A", text: "Frequently, especially on cheeks" },
      { value: "B", text: "Almost never (I get blackheads instead)" },
      { value: "C", text: "Sometimes on cheeks, never on T-zone" },
      { value: "D", text: "Almost never" },
      { value: "E", text: "Rarely, but I get redness/itching instead" },
    ],
  },
  {
    id: 5,
    question: "Breakouts/acne occur:",
    options: [
      { value: "A", text: "Rarely – my problem is dryness, not pimples" },
      { value: "B", text: "Regularly, often cystic or inflammatory" },
      { value: "C", text: "Mostly in the T-zone, cheeks are usually clear" },
      { value: "D", text: "Very rarely" },
      { value: "E", text: "Occasionally, usually triggered by a product or stress" },
    ],
  },
  {
    id: 6,
    question: "When I try a new skincare product, my skin usually:",
    options: [
      { value: "A", text: "Feels drier or tighter" },
      { value: "B", text: "Gets oilier or breaks out" },
      { value: "C", text: "Cheeks get dry, T-zone gets oilier" },
      { value: "D", text: "Tolerates it perfectly" },
      { value: "E", text: "Reacts with redness, stinging, or itching within 24–48 hours" },
    ],
  },
  {
    id: 7,
    question: "In cold, dry, or windy weather my skin:",
    options: [
      { value: "A", text: "Becomes painfully tight, flaky, or even cracked" },
      { value: "B", text: "Stays oily (weather barely affects it)" },
      { value: "C", text: "Cheeks become very dry, T-zone stays oily" },
      { value: "D", text: "Remains pretty much the same" },
      { value: "E", text: "Becomes red, inflamed, or stingy" },
    ],
  },
  {
    id: 8,
    question: "My skin texture generally feels:",
    options: [
      { value: "A", text: "Rough, dull, or slightly scaly" },
      { value: "B", text: "Smooth but slick/greasy" },
      { value: "C", text: "Different textures in different areas" },
      { value: "D", text: "Soft, even, and smooth" },
      { value: "E", text: "Thin, fragile, easily reddened" },
    ],
  },
  {
    id: 9,
    question: "I need to blot or powder my face during the day:",
    options: [
      { value: "A", text: "Never" },
      { value: "B", text: "3+ times a day" },
      { value: "C", text: "1–2 times (only T-zone)" },
      { value: "D", text: "Almost never" },
      { value: "E", text: "Never, but I avoid makeup because it irritates" },
    ],
  },
  {
    id: 10,
    question: "When I apply a standard moisturizer:",
    options: [
      { value: "A", text: "It absorbs immediately and I still feel dry" },
      { value: "B", text: "It sits on top or makes me even shinier" },
      { value: "C", text: "Feels great on cheeks, too heavy on T-zone" },
      { value: "D", text: "Absorbs nicely and skin feels perfectly comfortable" },
      { value: "E", text: "Many moisturizers cause burning or redness (I have to be very careful)" },
    ],
  },
];

const skinTypeResults = {
  A: {
    type: "Dry Skin",
    description:
      "Your skin tends to lack oil and moisture. It may feel tight, rough, or flaky, especially after cleansing. Focus on hydrating and nourishing products with ingredients like hyaluronic acid, ceramides, and rich moisturizers.",
  },
  B: {
    type: "Oily Skin",
    description:
      "Your skin produces excess sebum, leading to shine and enlarged pores. You may be prone to breakouts. Look for lightweight, oil-free products with ingredients like salicylic acid, niacinamide, and mattifying formulas.",
  },
  C: {
    type: "Combination Skin",
    description:
      "Your skin has both oily and dry areas—typically oily in the T-zone and dry on the cheeks. Balance is key. Use targeted products for different zones and consider gel-based moisturizers.",
  },
  D: {
    type: "Normal Skin",
    description:
      "Your skin is well-balanced with minimal issues. It's neither too oily nor too dry. Maintain your skin's health with a consistent, gentle routine focused on protection and hydration.",
  },
  E: {
    type: "Sensitive Skin",
    description:
      "Your skin is easily irritated and reactive to products or environmental factors. Stick to gentle, fragrance-free products with minimal ingredients. Patch test new products and avoid harsh actives.",
  },
};

export const SkinQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [result, setResult] = useState<Answer | null>(null);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (answer: Answer) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResult = () => {
    const answerCounts: Record<Answer, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
    Object.values(answers).forEach((answer) => {
      answerCounts[answer]++;
    });

    const dominantAnswer = (Object.keys(answerCounts) as Answer[]).reduce((a, b) =>
      answerCounts[a] > answerCounts[b] ? a : b
    );

    setResult(dominantAnswer);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
  };

  if (result) {
    const skinResult = skinTypeResults[result];
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-foreground">{skinResult.type}</h1>
                <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {skinResult.description}
              </p>
              <Button onClick={handleRestart} size="lg" className="mt-6">
                Take Quiz Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const currentAnswer = answers[currentQ.id];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-8">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">{currentQ.question}</h2>

              <RadioGroup value={currentAnswer} onValueChange={handleAnswer}>
                <div className="space-y-3">
                  {currentQ.options.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors cursor-pointer"
                      onClick={() => handleAnswer(option.value)}
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label
                        htmlFor={option.value}
                        className="flex-1 cursor-pointer text-foreground leading-relaxed"
                      >
                        <span className="font-medium">{option.value})</span> {option.text}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              <Button onClick={handleNext} disabled={!currentAnswer}>
                {currentQuestion === questions.length - 1 ? "See Results" : "Next"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
