import { addNotification } from "@states/app/appSlice";
import { useDispatch } from "react-redux";

const useNotify = () => {
    const dispatch = useDispatch();
    return (type: string, message: string) => {
        dispatch(
            addNotification({
                type,
                message,
            })
        );
    };
};

export default useNotify;
