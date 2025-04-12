"use client";
import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Paperclip, X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface AttachedImage {
  file: File;
  preview: string;
}

export default function SearchModal({ isOpen, onClose }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState<AttachedImage[]>([]);
  const [results, setResults] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
  if (searchTerm.trim().length > 0) {
    const base = searchTerm.trim();
    const mockResults = Array.from({ length: 5 }, (_, i) => `${base}${i + 1}`);
    setResults(mockResults);

    const ideas = [
      `with matching socks`,
      `that go well with sunglasses`,
      `and a cool cap`,
      `for gym lovers`,
      `under ₹2999 combo`,
      `in trending colors`,
    ];
    const shuffled = ideas.sort(() => 0.5 - Math.random());
    setSuggestions(shuffled.slice(0, 3).map((s) => `${base} ${s}`));
  } else {
    setResults([]);
    setSuggestions([]);
  }
}, [searchTerm]);


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages: AttachedImage[] = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        newImages.push({ file, preview: reader.result as string });
        if (newImages.length === files.length) {
          setImages((prev) => [...prev, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-4xl w-[95vw] p-4 flex flex-col h-full">
        <SheetHeader>
          <SheetTitle>Search</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-4 mt-4 flex-1 overflow-y-auto">
          {/* Top Split View */}
          <div className="flex flex-col md:flex-row gap-6 flex-grow">
            <div className="flex-1 bg-gray-100 rounded-lg p-4 min-h-[200px]">
              <h2 className="text-lg font-semibold mb-2">You Searched</h2>
              <ul className="text-sm text-gray-700 list-disc ml-4 space-y-1">
                {results.length > 0 ? (
                  results.map((term, idx) => <li key={idx}>{term}</li>)
                ) : (
                  <li>Nothing searched yet.</li>
                )}
              </ul>
            </div>

            <div className="flex-1 bg-gray-100 rounded-lg p-4 min-h-[200px]">
              <h2 className="text-lg font-semibold mb-2">Suggestions</h2>
              <ul className="text-sm text-gray-700 list-disc ml-4 space-y-1">
                {suggestions.length > 0 ? (
                  suggestions.map((s, idx) => <li key={idx}>{s}</li>)
                ) : (
                  <li>Start typing to see suggestions.</li>
                )}
              </ul>
            </div>
          </div>

          {/* Search Box & Attachments */}
          <div className="flex items-center gap-2">
            <Input
              placeholder="e.g. 'Red Nike shoes under ₹3000'"
              className="text-lg px-4 py-3 flex-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
              <div className="p-3 rounded-md bg-gray-100 hover:bg-gray-200">
                <Paperclip className="w-5 h-5 text-gray-600" />
              </div>
            </label>
          </div>

          {/* Image Previews */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-2">
              {images.map((img, index) => (
                <div key={index} className="relative w-20 h-20">
                  <img
                    src={img.preview}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover rounded-md border"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-white text-red-500 p-1 rounded-full shadow"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Search Options */}
          <div className="flex gap-4">
            <Button variant="outline" className="w-full">
              Normal Search
            </Button>
            <Button variant="default" className="w-full">
              AI Search
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
