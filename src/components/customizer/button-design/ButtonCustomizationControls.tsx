
import { CustomButton } from "../ConfigurationPanel";
import ButtonSelectorSection from "./ButtonSelectorSection";
import ButtonShapeSection from "./ButtonShapeSection";
import ButtonSizeSection from "./ButtonSizeSection";
import ButtonSpacingSection from "./ButtonSpacingSection";
import BaseColorsSection from "./BaseColorsSection";
import GradientColorsSection from "./GradientColorsSection";
import CustomColorSection from "./CustomColorSection";

interface ButtonCustomizationControlsProps {
  customButtons: CustomButton[];
  selectedButtonId: string;
  onSelectedButtonChange: (value: string) => void;
  onButtonDesignUpdate: (property: string, value: string | number) => void;
  onCustomColorUpdate: (customColorCode: string) => void;
  currentStyle: string;
  currentColor: string;
  currentSize: string;
  currentSpacing: number;
}

const ButtonCustomizationControls = ({
  customButtons,
  selectedButtonId,
  onSelectedButtonChange,
  onButtonDesignUpdate,
  onCustomColorUpdate,
  currentStyle,
  currentColor,
  currentSize,
  currentSpacing
}: ButtonCustomizationControlsProps) => {
  return (
    <>
      <ButtonSelectorSection
        customButtons={customButtons}
        selectedButtonId={selectedButtonId}
        onSelectedButtonChange={onSelectedButtonChange}
      />

      <ButtonShapeSection
        currentStyle={currentStyle}
        onButtonDesignUpdate={onButtonDesignUpdate}
      />

      <ButtonSizeSection
        currentSize={currentSize}
        onButtonDesignUpdate={onButtonDesignUpdate}
      />

      <ButtonSpacingSection
        currentSpacing={currentSpacing}
        onButtonDesignUpdate={onButtonDesignUpdate}
      />

      <BaseColorsSection
        currentColor={currentColor}
        onButtonDesignUpdate={onButtonDesignUpdate}
      />

      <GradientColorsSection
        currentColor={currentColor}
        onButtonDesignUpdate={onButtonDesignUpdate}
      />

      <CustomColorSection
        customButtons={customButtons}
        selectedButtonId={selectedButtonId}
        onCustomColorUpdate={onCustomColorUpdate}
      />
    </>
  );
};

export default ButtonCustomizationControls;
