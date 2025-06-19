
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CustomButton } from "../ConfigurationPanel";

interface ButtonSelectorSectionProps {
  customButtons: CustomButton[];
  selectedButtonId: string;
  onSelectedButtonChange: (value: string) => void;
}

const ButtonSelectorSection = ({
  customButtons,
  selectedButtonId,
  onSelectedButtonChange
}: ButtonSelectorSectionProps) => {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-700">Personalizza Design</h4>
      <Select value={selectedButtonId} onValueChange={onSelectedButtonChange}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tutti i pulsanti</SelectItem>
          {customButtons.map((button, index) => (
            <SelectItem key={button.id} value={button.id}>
              Pulsante {index + 1}: {button.text || 'Senza titolo'}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ButtonSelectorSection;
