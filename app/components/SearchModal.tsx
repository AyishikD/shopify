"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-4xl w-[95vw]">
        <SheetHeader>
          <SheetTitle>Search</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-4 mt-6">
          <Input
            placeholder="e.g. 'Red Nike shoes under ₹3000'"
            className="text-lg px-4 py-3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="flex gap-4">
            <Button variant="outline" className="w-full">
              Normal Search
            </Button>
            <Button variant="default" className="w-full">
              AI Search
            </Button>
          </div>

          {/* Split view */}
          <div className="flex flex-col md:flex-row gap-6 mt-6 h-[60vh] overflow-auto">
            <div className="flex-1 bg-gray-100 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Left Panel</h2>
              <p className="text-sm text-gray-600">Add filters, previews, etc. here.</p>
            </div>

            <div className="flex-1 bg-gray-100 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Right Panel</h2>
              <p className="text-sm text-gray-600">Add results or suggestions here.</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
