import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// Components
import Operation from "components/Operation";
// Services
import userService from "services/user.service";
// Styles
import styles from "./Home.module.css";

function Home() {
  const [user, setUser] = useState(null);
  const [operations, setOperations] = useState([]);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      const user = await userService.getUserData();
      const operations = await userService.getOperations();

      if (user.status === 200 && operations.status === 200) {
        setUser(user.data);
        setOperations(operations.data);
      }
    };

    if (auth.isSignedIn) fetchData();
  }, [auth]);

  return (
    <div className={styles["container"]}>
      <div className={styles["card"]}>
        <span className={styles["welcome-message"]}>
          Hello {"User!" || "Visitor!"}
        </span>
        <span className={styles["subtitle"]}>This is your actual balance</span>

        <span className={styles["balance"]}>$ {user?.balance ?? 0}</span>
      </div>
      <div className={styles["operations-cont"]}>
        {operations.length > 0 &&
          operations.map((op) => <Operation key={op.id} data={op} />)}
      </div>
    </div>
  );
}

export default Home;
