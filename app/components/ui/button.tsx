import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
  "px-4 py-2 font-medium transition rounded-md",
  {
    variants: {
      variant: {
        default: "bg-blue-500 text-white hover:bg-blue-600",
        outline: "border border-gray-300 hover:bg-gray-100",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export function Button({ variant, className, ...props }: VariantProps<typeof buttonVariants> & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn(buttonVariants({ variant }), className)} {...props} />;
}
