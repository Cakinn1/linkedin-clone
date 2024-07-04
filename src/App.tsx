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
 *  - start components files
 *  - complete all of them using jsdocs,
 *  in stories, use bard for code review
 *  and make it as reusable as i can
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
