import type { ImageListType } from "react-images-uploading/dist/typings";
import type { ReactNode } from "react";

import { useState } from "react";

import ImageUploading from "react-images-uploading";

const ImageButton = ({
    onChange,
    children,
    className,
    ...props
}: {
    onChange: (value: string) => void;
    children: ReactNode;
    className?: string;
}) => {
    const [image, setImage] = useState<ImageListType>([]);

    return (
        <ImageUploading
            onChange={image => {
                setImage(image);
                onChange(image.length > 0 ? image[0].dataURL || "" : "");
            }}
            value={image}
        >
            {({ onImageUpload, onImageUpdate }) => (
                <div className={className} onClick={image ? onImageUpload : () => onImageUpdate(0)} {...props}>
                    {children}
                </div>
            )}
        </ImageUploading>
    );
};

export default ImageButton;
