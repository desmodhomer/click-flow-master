
import { Slider } from "@/components/ui/slider";

interface ButtonSpacingSectionProps {
  currentSpacing: number;
  onButtonDesignUpdate: (property: string, value: string | number) => void;
}

const ButtonSpacingSection = ({
  currentSpacing,
  onButtonDesignUpdate
}: ButtonSpacingSectionProps) => {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-700">Spaziatura</h4>
      <div className="px-2">
        <Slider
          value={[currentSpacing]}
          onValueChange={(value) => onButtonDesignUpdate('spacing', value[0])}
          max={6}
          min={1}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1 - Minima</span>
          <span>6 - Massima</span>
        </div>
      </div>
    </div>
  );
};

export default ButtonSpacingSection;
