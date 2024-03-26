import Board from "./components/board/Board";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Board />
      </ChakraProvider>
    </div>
  );
}

export default App;
