
const LiveUpdateIndicator = () => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <p className="text-green-700 text-sm font-medium">
          ✨ Anteprima 1:1 - Dimensioni reali iPhone
        </p>
      </div>
    </div>
  );
};

export default LiveUpdateIndicator;
