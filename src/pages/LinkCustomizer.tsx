
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { RubiksCube } from "@/components/ui/rubik-s-cube";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import LinkCustomizerForm from "@/components/LinkCustomizerForm";
import LinkPreview from "@/components/LinkPreview";
import LinkCustomizerFeatures from "@/components/LinkCustomizerFeatures";
import LinkCustomizerHero from "@/components/LinkCustomizerHero";

const LinkCustomizerPage = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  const handleLinkGenerated = (link: string) => {
    setGeneratedLink(link);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <RubiksCube />
      </div>
      
      {/* Light Effect Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-blue-200 opacity-5 rounded-full blur-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent"></div>
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="flex-1 flex flex-col justify-center py-8 sm:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto w-full space-y-8 sm:space-y-12">
            {/* Hero Title */}
            <LinkCustomizerHero />

            {/* Features Cards */}
            <LinkCustomizerFeatures />

            {/* Main Tool */}
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {/* Form Section */}
              <div className="order-2 lg:order-1">
                <LinkCustomizerForm
                  onLinkGenerated={handleLinkGenerated}
                  originalUrl={originalUrl}
                  setOriginalUrl={setOriginalUrl}
                  customSlug={customSlug}
                  setCustomSlug={setCustomSlug}
                  title={title}
                  setTitle={setTitle}
                  description={description}
                  setDescription={setDescription}
                />
              </div>

              {/* Preview Section */}
              <div className="order-1 lg:order-2">
                <LinkPreview
                  generatedLink={generatedLink}
                  title={title}
                  description={description}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Back Button - Bottom Left */}
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 lg:left-16 z-20">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/">
                  <Button 
                    className="bg-transparent text-white border border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300 rounded-full px-4 py-2 sm:px-6 flex items-center gap-2 text-sm sm:text-base"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Torna alla Home</span>
                    <span className="sm:hidden">Home</span>
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Torna alla pagina principale</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </section>
  );
};

export default LinkCustomizerPage;
