
import { Button } from "@/components/ui/button";

interface BaseColorsSectionProps {
  currentColor: string;
  onButtonDesignUpdate: (property: string, value: string | number) => void;
}

const BaseColorsSection = ({
  currentColor,
  onButtonDesignUpdate
}: BaseColorsSectionProps) => {
  const buttonColors = [
    { id: 'white', name: 'Bianco', class: 'bg-white/90 text-gray-900 hover:bg-white', color: '#ffffff' },
    { id: 'black', name: 'Nero', class: 'bg-gray-900 text-white hover:bg-gray-800', color: '#111827' },
    { id: 'gray', name: 'Grigio', class: 'bg-gray-600 text-white hover:bg-gray-700', color: '#4b5563' },
    { id: 'red', name: 'Rosso', class: 'bg-red-600 text-white hover:bg-red-700', color: '#dc2626' },
    { id: 'orange', name: 'Arancione', class: 'bg-orange-600 text-white hover:bg-orange-700', color: '#ea580c' },
    { id: 'yellow', name: 'Giallo', class: 'bg-yellow-500 text-gray-900 hover:bg-yellow-600', color: '#eab308' },
    { id: 'green', name: 'Verde', class: 'bg-green-600 text-white hover:bg-green-700', color: '#16a34a' },
    { id: 'teal', name: 'Verde Acqua', class: 'bg-teal-600 text-white hover:bg-teal-700', color: '#0d9488' },
    { id: 'blue', name: 'Blu', class: 'bg-blue-600 text-white hover:bg-blue-700', color: '#2563eb' },
    { id: 'indigo', name: 'Indaco', class: 'bg-indigo-600 text-white hover:bg-indigo-700', color: '#4f46e5' },
    { id: 'purple', name: 'Viola', class: 'bg-purple-600 text-white hover:bg-purple-700', color: '#9333ea' },
    { id: 'pink', name: 'Rosa', class: 'bg-pink-600 text-white hover:bg-pink-700', color: '#db2777' }
  ];

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-700">Colori Base</h4>
      <div className="grid grid-cols-2 gap-2">
        {buttonColors.map((color) => (
          <Button
            key={color.id}
            variant={currentColor === color.id ? "default" : "outline"}
            size="sm"
            onClick={() => onButtonDesignUpdate('color', color.id)}
            className="w-full justify-start h-10"
          >
            <div 
              className="w-5 h-5 rounded mr-2 border border-gray-200" 
              style={{ backgroundColor: color.color }}
            ></div>
            <span className="text-xs">{color.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BaseColorsSection;
