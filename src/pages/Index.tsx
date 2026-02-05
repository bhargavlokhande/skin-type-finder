import { SkinQuiz } from "@/components/SkinQuiz";
import { CartDrawer } from "@/components/CartDrawer";

const Index = () => {
  return (
    <>
      {/* Fixed cart button in header */}
      <div className="fixed top-4 right-4 z-50">
        <CartDrawer />
      </div>
      <SkinQuiz />
    </>
  );
};

export default Index;
