
import { useState } from "react";
import { CustomButton } from "./ConfigurationPanel";
import ButtonDesignHeader from "./button-design/ButtonDesignHeader";
import AddButtonSection from "./button-design/AddButtonSection";
import ButtonList from "./button-design/ButtonList";
import ButtonCustomizationControls from "./button-design/ButtonCustomizationControls";
import ButtonPreview from "./button-design/ButtonPreview";

interface ButtonDesignPanelProps {
  customButtons: CustomButton[];
  setCustomButtons: (buttons: CustomButton[]) => void;
}

const ButtonDesignPanel = ({ customButtons, setCustomButtons }: ButtonDesignPanelProps) => {
  const [selectedButtonId, setSelectedButtonId] = useState<string>("all");

  const addButton = () => {
    const newButton: CustomButton = {
      id: `btn-${Date.now()}`,
      text: '',
      url: '',
      style: 'rounded',
      color: 'white',
      size: 'medium',
      spacing: 3,
      icon: null
    };
    setCustomButtons([...customButtons, newButton]);
  };

  const updateButton = (id: string, field: keyof CustomButton, value: string) => {
    setCustomButtons(customButtons.map(btn => 
      btn.id === id ? { ...btn, [field]: value } : btn
    ));
  };

  const removeButton = (id: string) => {
    setCustomButtons(customButtons.filter(btn => btn.id !== id));
  };

  const updateButtonDesign = (property: string, value: string | number) => {
    if (selectedButtonId === "all") {
      // Modifica tutti i pulsanti
      const updatedButtons = customButtons.map(button => ({
        ...button,
        [property]: value
      }));
      setCustomButtons(updatedButtons);
    } else {
      // Modifica solo il pulsante selezionato
      const updatedButtons = customButtons.map(button => 
        button.id === selectedButtonId 
          ? { ...button, [property]: value }
          : button
      );
      setCustomButtons(updatedButtons);
    }
  };

  const getCurrentButtonStyle = () => {
    if (selectedButtonId === "all") {
      const firstButtonStyle = customButtons[0]?.style || 'rounded';
      const allSameStyle = customButtons.every(btn => btn.style === firstButtonStyle);
      return allSameStyle ? firstButtonStyle : 'rounded';
    } else {
      const selectedButton = customButtons.find(btn => btn.id === selectedButtonId);
      return selectedButton?.style || 'rounded';
    }
  };

  const getCurrentButtonColor = () => {
    if (selectedButtonId === "all") {
      const firstButtonColor = customButtons[0]?.color || 'white';
      const allSameColor = customButtons.every(btn => btn.color === firstButtonColor);
      return allSameColor ? firstButtonColor : 'white';
    } else {
      const selectedButton = customButtons.find(btn => btn.id === selectedButtonId);
      return selectedButton?.color || 'white';
    }
  };

  const getCurrentButtonSize = () => {
    if (selectedButtonId === "all") {
      const firstButtonSize = customButtons[0]?.size || 'medium';
      const allSameSize = customButtons.every(btn => btn.size === firstButtonSize);
      return allSameSize ? firstButtonSize : 'medium';
    } else {
      const selectedButton = customButtons.find(btn => btn.id === selectedButtonId);
      return selectedButton?.size || 'medium';
    }
  };

  const getCurrentButtonSpacing = () => {
    if (selectedButtonId === "all") {
      const firstButtonSpacing = customButtons[0]?.spacing || 3;
      const allSameSpacing = customButtons.every(btn => btn.spacing === firstButtonSpacing);
      return allSameSpacing ? firstButtonSpacing : 3;
    } else {
      const selectedButton = customButtons.find(btn => btn.id === selectedButtonId);
      return selectedButton?.spacing || 3;
    }
  };

  const currentStyle = getCurrentButtonStyle();
  const currentColor = getCurrentButtonColor();
  const currentSize = getCurrentButtonSize();
  const currentSpacing = getCurrentButtonSpacing();

  if (customButtons.length === 0) {
    return (
      <div className="space-y-6">
        <ButtonDesignHeader />
        <AddButtonSection onAddButton={addButton} />
        <div className="text-center py-8">
          <p className="text-gray-500">Nessun pulsante disponibile per la personalizzazione</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ButtonDesignHeader />
      <AddButtonSection onAddButton={addButton} />
      <ButtonList 
        customButtons={customButtons}
        onUpdateButton={updateButton}
        onRemoveButton={removeButton}
      />
      
      {/* Opzioni di personalizzazione - Solo se ci sono pulsanti */}
      {customButtons.length > 0 && (
        <>
          <ButtonCustomizationControls
            customButtons={customButtons}
            selectedButtonId={selectedButtonId}
            onSelectedButtonChange={setSelectedButtonId}
            onButtonDesignUpdate={updateButtonDesign}
            currentStyle={currentStyle}
            currentColor={currentColor}
            currentSize={currentSize}
            currentSpacing={currentSpacing}
          />
          <ButtonPreview
            customButtons={customButtons}
            selectedButtonId={selectedButtonId}
            currentSpacing={currentSpacing}
          />
        </>
      )}
    </div>
  );
};

export default ButtonDesignPanel;
