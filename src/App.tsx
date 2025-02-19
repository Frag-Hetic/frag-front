import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md space-y-4">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Hello World</h1>
        <p className="text-gray-600 hover:text-gray-800 transition-colors">
          Welcome to tailwind new React app
        </p>
        <Button>Button</Button>
      </div>
    </div>
  );
}

export default App;
