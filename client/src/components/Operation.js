import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
// Services
import userService from "services/user.service";
// Actions
import { refresh } from "store/userSlice";
// Icons
import { ReactComponent as CloseIcon } from "icons/error-icon.svg";
import { ReactComponent as EditIcon } from "icons/edit-icon.svg";
// Styles
import styles from "./Operation.module.css";

function Operation({ data, modify, setUpdate }) {
  const dispatch = useDispatch();
  const [deleteOp, setDeleteOp] = useState(false);

  // get operations
  useEffect(() => {
    const sendRequest = async () => {
      const response = await userService.deleteOperation(data.id);

      if (response.status === 200) {
        toast.success(response.data.message);
        dispatch(refresh(true));
      }
    };

    if (deleteOp) sendRequest();
  }, [deleteOp, dispatch, data]);

  return (
    <div className={`${styles["container"]}`}>
      <div className={styles["topbar"]}>
        <span>${data.amount}</span>
        <span>{data.date}</span>
      </div>
      {modify && (
        <div className={styles["options"]}>
          <CloseIcon
            onClick={() => setDeleteOp(true)}
            className={styles["close-button"]}
          />
          <EditIcon
            onClick={() => setUpdate(data)}
            className={styles["edit-button"]}
          />
        </div>
      )}
      <div className={styles["concept-cont"]}>
        <span>Concept:</span>
        <div className={styles["concept"]}>
          <p>{data.concept}</p>
        </div>
      </div>
      <div className={styles["bottom"]}>
        <span className={styles["type"]}>{data.type.toUpperCase()}</span>
        <span className={styles["category"]}>
          <strong>Category:</strong> {data.Category?.name ?? "None"}
        </span>
      </div>
    </div>
  );
}

export default Operation;
