import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  errorMessage: string;
}

export function ErrorModal({ isOpen, onClose, errorMessage }: ErrorModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-destructive">Upload Error</DialogTitle>
          <DialogDescription className="pt-2 text-base text-foreground whitespace-pre-wrap">
            {errorMessage}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-4">
          <Button onClick={onClose} variant="default">
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
