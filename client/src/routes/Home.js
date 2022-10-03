import { useState, useEffect } from "react";
// Components
import Operation from "components/Operation";
// Services
import userService from "services/user.service";
// Styles
import styles from "./Home.module.css";

function Home() {
  const [balance, setBalance] = useState(null);
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const balance = await userService.getBalance();
      const operations = await userService.getOperations();

      if (balance.status === 200 && operations.status === 200) {
        setBalance(balance.data);
        setOperations(operations.data);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles["container"]}>
      <div className={styles["card"]}>
        <span className={styles["welcome-message"]}>Hello Alejandro</span>
        <span className={styles["subtitle"]}>This is your actual balance</span>

        <span className={styles["balance"]}>$ {balance?.balance}</span>
      </div>
      <div className={styles["operations-cont"]}>
        {operations.length > 0 &&
          operations.map((op) => <Operation key={op.id} data={op} />)}
      </div>
    </div>
  );
}

export default Home;
