import Toast, { ToastMessageType, ToastPosition } from "./components/Notifications/Toast";

const App: React.FC = () => {
  return (
    <div className="h-[200vh] ">
      <Toast messageType={ToastMessageType.SUCCESS} position={ToastPosition.BOTTOM_LEFT}  />
    </div>
  );
};

export default App;

/**
 *  TODO:
 *  - complete all of them using jsdocs,
 *  in stories, use bard for code review
 *  and make it as reusable as i can
 * - finish button input notification and spinner,
 * - i may not do the input folder one and change it still thinking
 * - also refactor the butotn component still not done
 * - write test and fix folder for notifications
 * 
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
