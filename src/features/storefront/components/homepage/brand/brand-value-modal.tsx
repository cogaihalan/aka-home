"use client";

import Image from "next/image";
import { Modal } from "@/components/ui/modal";
import { BrandValueItem as BrandValueItemType } from "./types";

interface BrandValueModalProps {
  item: BrandValueItemType | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BrandValueModal({
  item,
  isOpen,
  onClose,
}: BrandValueModalProps) {
  if (!item) return null;

  return (
    <Modal
      title={item.title}
      description={item.shortContent}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-4 max-h-[80vh] overflow-y-auto">
        <div className="flex  gap-4">
          <div className="relative w-1/2 aspect-square overflow-hidden rounded-lg">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover w-full h-full"
            />
          </div>
          <div className="text-sm wysiwyg text-muted-foreground leading-relaxed flex-1">
            {item.fullContent}
          </div>
        </div>
      </div>
    </Modal>
  );
}
