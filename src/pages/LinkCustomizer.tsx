
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
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <RubiksCube />
      </div>
      
      {/* Light Effect Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-blue-200 opacity-5 rounded-full blur-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent"></div>
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-center px-4 md:px-8 lg:px-16 overflow-y-auto">
        <div className="max-w-6xl mx-auto w-full py-12">
          {/* Hero Title */}
          <LinkCustomizerHero />

          {/* Features Cards */}
          <LinkCustomizerFeatures />

          {/* Main Tool */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Form Section */}
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

            {/* Preview Section */}
            <LinkPreview
              generatedLink={generatedLink}
              title={title}
              description={description}
            />
          </div>
        </div>
      </div>
      
      {/* Back Button - Bottom Left */}
      <div className="absolute bottom-8 left-4 md:left-8 lg:left-16 z-20">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/">
                <Button 
                  className="bg-transparent text-white border border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300 rounded-full px-6 py-2 flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Torna alla Home
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Torna alla pagina principale</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </section>
  );
};

export default LinkCustomizerPage;
