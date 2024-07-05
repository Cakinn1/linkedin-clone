import { useDispatch, useSelector } from "react-redux";
import { Toast } from "./components/Notifications";
import { RootState } from "./store";
import { openAndCloseToast } from "./store/toastSlice";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const toast = useSelector((state: RootState) => state.toast);
  console.log(toast)
  return (
    <div className="h-[200vh] ">
      <Toast messageType="success" position="bottom-left" />
      <button
        onClick={() => {
          dispatch(openAndCloseToast(!toast.isOpen));
        }}
      >
        open toast
      </button>
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
