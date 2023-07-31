import { useAppDispatch, useAppSelector } from "@app/hooks";
import { closeModal } from "../../screens/features/common/modalSlice";
import AddLeadModalBody from "../../screens/features/leads/components/AddLeadModalBody";
import { MODAL_BODY_TYPES } from "@utils/globalConstantUtil";

function ModalLayout() {
    const { isOpen, bodyType, size, title } = useAppSelector(
        state => state.modal
    );
    const dispatch = useAppDispatch();

    const close = () => {
        dispatch(closeModal());
    };

    return (
        <>
            {/* The button to open modal */}

            {/* Put this part before </body> tag */}
            <div className={`modal ${isOpen ? "modal-open" : ""}`}>
                <div
                    className={`modal-box  ${size === "lg" ? "max-w-5xl" : ""}`}
                >
                    <button
                        className="btn-sm btn-circle btn absolute right-2 top-2"
                        onClick={() => close()}
                    >
                        ✕
                    </button>
                    <h3 className="pb-6 text-center text-2xl font-semibold">
                        {title}
                    </h3>

                    {/* Loading modal body according to different modal type */}
                    {
                        {
                            [MODAL_BODY_TYPES.LEAD_ADD_NEW]: (
                                <AddLeadModalBody closeModal={close} />
                            ),
                            [MODAL_BODY_TYPES.DEFAULT]: <div></div>,
                        }[bodyType]
                    }
                </div>
            </div>
        </>
    );
}

export default ModalLayout;
