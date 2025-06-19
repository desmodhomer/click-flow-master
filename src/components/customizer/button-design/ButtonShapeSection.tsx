
import { Button } from "@/components/ui/button";
import { Square, Circle, CornerRightUp } from "lucide-react";

interface ButtonShapeSectionProps {
  currentStyle: string;
  onButtonDesignUpdate: (property: string, value: string | number) => void;
}

const ButtonShapeSection = ({
  currentStyle,
  onButtonDesignUpdate
}: ButtonShapeSectionProps) => {
  const buttonStyles = [
    { id: 'rounded', name: 'Arrotondato', class: 'rounded-xl', icon: CornerRightUp },
    { id: 'square', name: 'Quadrato', class: 'rounded-none', icon: Square },
    { id: 'pill', name: 'Pillola', class: 'rounded-full', icon: Circle }
  ];

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-700">Forma</h4>
      <div className="grid grid-cols-3 gap-2">
        {buttonStyles.map((style) => {
          const IconComponent = style.icon;
          return (
            <Button
              key={style.id}
              variant={currentStyle === style.id ? "default" : "outline"}
              size="sm"
              onClick={() => onButtonDesignUpdate('style', style.id)}
              className="flex flex-col items-center gap-1 h-auto py-3"
            >
              <IconComponent className="h-4 w-4" />
              <span className="text-xs">{style.name}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default ButtonShapeSection;
