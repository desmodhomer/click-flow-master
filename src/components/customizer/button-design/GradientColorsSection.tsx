
import { Button } from "@/components/ui/button";

interface GradientColorsSectionProps {
  currentColor: string;
  onButtonDesignUpdate: (property: string, value: string | number) => void;
}

const GradientColorsSection = ({
  currentColor,
  onButtonDesignUpdate
}: GradientColorsSectionProps) => {
  const gradientColors = [
    { id: 'gradient-blue', name: 'Blu-Viola', class: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700', color: 'linear-gradient(to right, #2563eb, #9333ea)' },
    { id: 'gradient-orange', name: 'Arancione-Rosso', class: 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600', color: 'linear-gradient(to right, #f97316, #ef4444)' },
    { id: 'gradient-green', name: 'Verde-Teal', class: 'bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600', color: 'linear-gradient(to right, #22c55e, #14b8a6)' },
    { id: 'gradient-pink', name: 'Rosa-Viola', class: 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600', color: 'linear-gradient(to right, #ec4899, #a855f7)' }
  ];

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-700">Colori Gradiente</h4>
      <div className="grid grid-cols-1 gap-2">
        {gradientColors.map((color) => (
          <Button
            key={color.id}
            variant={currentColor === color.id ? "default" : "outline"}
            size="sm"
            onClick={() => onButtonDesignUpdate('color', color.id)}
            className="w-full justify-start h-10"
          >
            <div 
              className="w-5 h-5 rounded mr-2 border border-gray-200" 
              style={{ background: color.color }}
            ></div>
            <span className="text-xs">{color.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default GradientColorsSection;
