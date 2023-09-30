import type { ReactNode, ChangeEvent } from "react";

import { useRef } from "react";

const ImageButton = ({
    onChange,
    children,
    className,
}: {
    onChange: (value: string) => void;
    children: ReactNode;
    className?: string;
}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = e => {
                const dataUrl = e?.target?.result;
                onChange(String(dataUrl));
            };
            reader.readAsDataURL(selectedFile);
        }
        event.target.value = "";
    };

    return (
        <>
            <div
                className={className}
                onClick={() => {
                    if (fileInputRef.current) {
                        fileInputRef.current.click();
                    }
                }}
            >
                {children}
            </div>
            <input
                type="file"
                hidden={true}
                ref={fileInputRef}
                onChange={handleFileInputChange}
                accept=".png, .jpg, .svg"
            />
        </>
    );
};

export default ImageButton;
