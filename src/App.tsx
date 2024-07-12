import { Nav } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Nav />
        <Routes>
          <Route />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

/**
 *  TODO:
 * - ?
 * 
 *  MAYBE:
 *  - fix folder for pages and etc
 * 
 * ├── pages/                   
│   ├── Home/
│   │   ├── index.tsx      
│   │   ├── components/
│   │   │   ├── Hero.tsx     
│   │   │   ├── FeaturedProducts.tsx 
│   │   │   └── ...         
│   │   └── index.ts
│   ├── About/               
│   │   ├── index.tsx       
│   │   ├── components/      
│   │       ├── Team.tsx     
│   │       ├── Mission.tsx  
│   │       └── ...         
│   │   └── index.ts
 */
