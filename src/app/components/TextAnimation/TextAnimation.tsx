import { useEffect, useRef, useState } from "react";

interface IProps {
    fullText: string;
}

export const TextAnimation = ({ fullText }: IProps) => {
    const [text, setText] = useState("");
    const indexRef = useRef(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const type = () => {
            setText(fullText.slice(0, indexRef.current));
            indexRef.current++;

            if (indexRef.current > fullText.length) {
                clearInterval(intervalRef.current!);
                timeoutRef.current = setTimeout(() => {
                    indexRef.current = 0;
                    setText("");
                    startTyping();
                }, 2000);
            }
        };

        const startTyping = () => {
            intervalRef.current = setInterval(type, 110);
        };

        startTyping();

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [fullText]);

    return (
        <p className="text-2xl text-[#d9d9d9]">
            {text}
        </p>
    );
};
