import { useDispatch, useSelector } from "react-redux";
import { Toast } from "./components/Notifications";
import { openAndCloseToast } from "./store/toastSlice";
import { RootState } from "./store";
import { useEffect, useRef, useState } from "react";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isopen = useSelector((state: RootState) => state.toast.isOpen);
  let timerRef = useRef<NodeJS.Timeout | null>(null);
  const [timer, settimer] = useState(0);
  useEffect(() => {
    if (isopen) {
      timerRef.current = setInterval(() => {
        settimer((prev) => {
          console.log(prev);
          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isopen]);

  console.log(isopen);
  return (
    <div className="h-screen">
      <button onClick={() => dispatch(openAndCloseToast(true))}>click</button>
      <Toast messageType="error" />
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
