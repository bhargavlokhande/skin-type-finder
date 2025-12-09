import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import skinHeroImage from "@/assets/skin-hero.png";
type Answer = "A" | "B" | "C" | "D" | "E";
type SkinType = "dry" | "oily" | "combination" | "normal" | "sensitive";
type FlowStep = "initial" | "select-type" | "quiz" | "result";

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

const skinTypeResults: Record<Answer, { type: string; description: string }> = {
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

const skinTypeOptions: { value: SkinType; label: string }[] = [
  { value: "dry", label: "Dry Skin" },
  { value: "oily", label: "Oily Skin" },
  { value: "combination", label: "Combination Skin" },
  { value: "normal", label: "Normal Skin" },
  { value: "sensitive", label: "Sensitive Skin" },
];

const skinTypeToAnswer: Record<SkinType, Answer> = {
  dry: "A",
  oily: "B",
  combination: "C",
  normal: "D",
  sensitive: "E",
};

export const SkinQuiz = () => {
  const [flowStep, setFlowStep] = useState<FlowStep>("initial");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [result, setResult] = useState<Answer | null>(null);
  const [selectedSkinType, setSelectedSkinType] = useState<SkinType | null>(null);

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
    setFlowStep("result");
  };

  const handleRestart = () => {
    setFlowStep("initial");
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    setSelectedSkinType(null);
  };

  const handleKnowsSkinType = (knows: boolean) => {
    if (knows) {
      setFlowStep("select-type");
    } else {
      setFlowStep("quiz");
    }
  };

  const handleSelectSkinType = (type: SkinType) => {
    setSelectedSkinType(type);
    setResult(skinTypeToAnswer[type]);
    setFlowStep("result");
  };

  // Initial question: "Do you know your skin type?"
  if (flowStep === "initial") {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Background image with gradient overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${skinHeroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-2xl">
            <div className="p-8 md:p-16">
              <div className="text-center space-y-10">
                {/* Decorative element */}
                <div className="flex justify-center">
                  <div className="w-16 h-[2px] bg-primary" />
                </div>
                
                <div className="space-y-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium">
                    Skin Analysis
                  </p>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground leading-tight">
                    Do you know your
                    <br />
                    <span className="italic">skin type?</span>
                  </h1>
                  <p className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto leading-relaxed font-light">
                    Understanding your skin is the first step to a perfect skincare routine.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                  <Button
                    size="lg"
                    onClick={() => handleKnowsSkinType(true)}
                    className="px-10 py-6 text-base font-medium tracking-wide"
                  >
                    Yes, I know
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => handleKnowsSkinType(false)}
                    className="px-10 py-6 text-base font-medium tracking-wide border-2 bg-background/80 backdrop-blur-sm hover:bg-secondary hover:text-secondary-foreground"
                  >
                    Help me discover
                  </Button>
                </div>

                {/* Decorative element */}
                <div className="flex justify-center pt-6">
                  <div className="w-8 h-[1px] bg-border" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Skin type selection page
  if (flowStep === "select-type") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-2xl">
          <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <div className="space-y-10">
                <div className="text-center space-y-4">
                  <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium">
                    Select Your Type
                  </p>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground">
                    Choose your <span className="italic">skin type</span>
                  </h1>
                  <div className="w-12 h-[2px] bg-primary mx-auto mt-4" />
                </div>

                <div className="grid gap-3">
                  {skinTypeOptions.map((option) => (
                    <button
                      key={option.value}
                      className="w-full py-5 px-8 text-lg text-left font-medium rounded-lg border-2 border-border bg-background/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group"
                      onClick={() => handleSelectSkinType(option.value)}
                    >
                      <span className="font-serif text-xl">{option.label}</span>
                    </button>
                  ))}
                </div>

                <div className="text-center pt-4">
                  <button
                    onClick={() => setFlowStep("initial")}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm uppercase tracking-widest"
                  >
                    ← Go back
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Result page
  if (flowStep === "result" && result) {
    const skinResult = skinTypeResults[result];
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-2xl">
          <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <div className="text-center space-y-8">
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium">
                    Your Result
                  </p>
                  <div className="w-12 h-[2px] bg-primary mx-auto" />
                </div>

                <div className="space-y-6">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground italic">
                    {skinResult.type}
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto font-light">
                    {skinResult.description}
                  </p>
                </div>

                <div className="pt-6">
                  <Button
                    onClick={handleRestart}
                    size="lg"
                    variant="outline"
                    className="px-10 py-6 text-base font-medium tracking-wide border-2 hover:bg-secondary hover:text-secondary-foreground"
                  >
                    Start Over
                  </Button>
                </div>

                <div className="flex justify-center pt-4">
                  <div className="w-8 h-[1px] bg-border" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Quiz flow
  const currentQ = questions[currentQuestion];
  const currentAnswer = answers[currentQ.id];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl">
        <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
          <CardContent className="p-6 md:p-10">
            <div className="space-y-8">
              {/* Progress section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span className="uppercase tracking-widest font-medium">
                    Question {currentQuestion + 1}
                    <span className="text-border mx-2">/</span>
                    {questions.length}
                  </span>
                  <span className="font-medium">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-1 bg-border" />
              </div>

              {/* Question */}
              <div className="space-y-6">
                <h2 className="text-xl md:text-2xl font-serif font-medium text-foreground leading-relaxed">
                  {currentQ.question}
                </h2>

                <RadioGroup value={currentAnswer} onValueChange={handleAnswer}>
                  <div className="space-y-3">
                    {currentQ.options.map((option) => (
                      <div
                        key={option.value}
                        className={`flex items-start space-x-4 p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                          currentAnswer === option.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50 hover:bg-background/50"
                        }`}
                        onClick={() => handleAnswer(option.value)}
                      >
                        <RadioGroupItem 
                          value={option.value} 
                          id={option.value} 
                          className="mt-0.5"
                        />
                        <Label
                          htmlFor={option.value}
                          className="flex-1 cursor-pointer text-foreground leading-relaxed"
                        >
                          <span className="font-semibold text-primary mr-2">{option.value}.</span>
                          {option.text}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  onClick={currentQuestion === 0 ? () => setFlowStep("initial") : handlePrevious}
                  className="text-muted-foreground hover:text-foreground uppercase tracking-widest text-sm"
                >
                  ← {currentQuestion === 0 ? "Back" : "Previous"}
                </Button>
                <Button 
                  onClick={handleNext} 
                  disabled={!currentAnswer}
                  className="px-8 font-medium tracking-wide"
                >
                  {currentQuestion === questions.length - 1 ? "See Results" : "Next →"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
