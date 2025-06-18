
const SubdomainLoadingState = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
        <p className="text-gray-600 text-lg">Caricamento in corso...</p>
      </div>
    </div>
  );
};

export default SubdomainLoadingState;
