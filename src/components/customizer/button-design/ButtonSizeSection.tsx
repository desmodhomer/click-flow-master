
import { Button } from "@/components/ui/button";

interface ButtonSizeSectionProps {
  currentSize: string;
  onButtonDesignUpdate: (property: string, value: string | number) => void;
}

const ButtonSizeSection = ({
  currentSize,
  onButtonDesignUpdate
}: ButtonSizeSectionProps) => {
  const buttonSizes = [
    { id: 'tiny', name: '1 - Piccolissimo', height: 'h-6' },
    { id: 'small', name: '2 - Piccolo', height: 'h-8' },
    { id: 'medium', name: '3 - Medio', height: 'h-10' },
    { id: 'large', name: '4 - Grande', height: 'h-12' },
    { id: 'xlarge', name: '5 - Grandissimo', height: 'h-14' }
  ];

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-700">Dimensione</h4>
      <div className="grid grid-cols-1 gap-2">
        {buttonSizes.map((size) => (
          <Button
            key={size.id}
            variant={currentSize === size.id ? "default" : "outline"}
            size="sm"
            onClick={() => onButtonDesignUpdate('size', size.id)}
            className="justify-start"
          >
            <span className="text-sm">{size.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ButtonSizeSection;
