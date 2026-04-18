import { Loader2 } from "lucide-react";

const CheckoutLoading = ({ text }: { text: string }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">{text}</span>
      </div>
    </div>
  );
};

export default CheckoutLoading;
