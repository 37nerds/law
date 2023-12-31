import type { CropperRef } from "react-advanced-cropper";

import { CircleStencil, Cropper } from "react-advanced-cropper";
import { useRef } from "react";

import "react-advanced-cropper/dist/style.css";
import "react-advanced-cropper/dist/themes/compact.css";

const ImageCropper = ({
    imageSrc,
    dialogOpen,
    setDialogOpen,
    onDone,
}: {
    imageSrc: string;
    dialogOpen: boolean;
    setDialogOpen: (value: boolean) => void;
    onDone: (imageFile: File) => void;
}) => {
    const cropperRef = useRef<CropperRef>(null);

    return dialogOpen ? (
        <div className={`fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50`}>
            <div className="flex min-h-screen items-center justify-center">
                <div className="mx-auto w-[95%] overflow-hidden rounded-lg bg-base-300 shadow-lg md:w-[600px]">
                    <div className="p-4">
                        <div className="mb-4 text-xl font-bold">Crop Image</div>
                        <div className="relative h-[265px] w-full rounded-lg bg-base-200 md:h-[360px]">
                            <Cropper
                                ref={cropperRef}
                                src={imageSrc}
                                aspectRatio={{
                                    minimum: 1,
                                    maximum: 1,
                                }}
                                stencilProps={{
                                    grid: true,
                                }}
                                stencilComponent={CircleStencil}
                                className="cropper rounded-lg"
                            />
                        </div>
                        <div className="mt-4 flex justify-between">
                            <div
                                onClick={() => {
                                    setDialogOpen(false);
                                }}
                                className="cursor-pointer rounded-lg bg-error px-4 py-2 text-white"
                            >
                                Close
                            </div>
                            <div
                                className="cursor-pointer rounded-lg bg-success px-4 py-2 text-white"
                                onClick={() => {
                                    const canvas = cropperRef.current?.getCanvas();
                                    if (canvas) {
                                        canvas.toBlob(blob => {
                                            if (blob) {
                                                onDone(new File([blob], "pic.jpg"));
                                                setDialogOpen(false);
                                            }
                                        }, "image/jpeg");
                                    }
                                }}
                            >
                                Done
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <></>
    );
};

export default ImageCropper;
