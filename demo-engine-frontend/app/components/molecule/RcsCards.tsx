"use client";
import React, { useState, useRef, useEffect } from "react";
import Button from "@/components/RoundButton";

export interface RcsCardsProps {
  title: string;
  subtext: string;
  inputWidth?: string;
  inputHeight?: string;
  description?: string;
  inputPlaceholder?: string;
  showCharacterCount?: boolean;
}

const RcsCards: React.FC<RcsCardsProps> = ({
  title,
  subtext,
  inputWidth = "w-full",
  inputHeight,
  description,
  inputPlaceholder,
  showCharacterCount = false,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [charCount, setCharCount] = useState(0);
  const MAX_CHAR_COUNT = 100;
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);
  const isMessageCard = title === "RCS Message";

  const handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (value.length <= MAX_CHAR_COUNT) {
      setInputValue(value);
      setCharCount(value.length);
    }
  };

  useEffect(() => {
    if (isMessageCard && inputRef.current instanceof HTMLTextAreaElement) {
      const textarea = inputRef.current;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [inputValue, isMessageCard]);

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg shadow-md p-4 space-y-4 backdrop-blur-md">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="text-gray-300 text-sm">{subtext}</p>
      <div className="relative">
        {isMessageCard ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={inputValue}
            onChange={handleInputChange}
            placeholder={inputPlaceholder || "Enter text..."}
            maxLength={MAX_CHAR_COUNT}
            className={`${inputWidth} bg-black/20 text-white border border-gray-700 placeholder-gray-400 
              resize-y min-h-[4rem] py-2 w-full box-border text-sm leading-relaxed 
              p-3 rounded-md`}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={inputPlaceholder || "Enter text..."}
            maxLength={MAX_CHAR_COUNT}
            className={`${inputWidth} ${
              inputHeight ?? ""
            } bg-black/20 text-white border border-gray-700 
              placeholder-gray-400 box-border text-sm leading-relaxed 
              p-3 rounded-md w-full`}
          />
        )}
        {showCharacterCount && (
          <div
            className={`absolute top-full mt-1 right-2 text-xs ${
              charCount > MAX_CHAR_COUNT ? "text-red-500" : "text-gray-400"
            }`}
          >
            {charCount}/{MAX_CHAR_COUNT}
          </div>
        )}
      </div>
      {description && (
        <p className="italic text-gray-400 text-xs mt-1">{description}</p>
      )}
      <div className="flex gap-2">
        <Button text="Start Demo" width="w-32" color="bg-green-500" />
        <Button text="Start Custom Demo" width="w-48" color="bg-orange-600" />
      </div>
    </div>
  );
};

export default RcsCards;
