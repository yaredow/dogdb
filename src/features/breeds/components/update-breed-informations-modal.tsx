import ResponsiveModal from "@/components/responsive-modal";
import { type ReactElement } from "react";
import { useUpdatePasswordModal } from "../hooks/use-update-breed-informations";
import UpdateBreedInformationsForm from "./update-breed-information-form";

export default function UpdatePasswordModal(): ReactElement {
  const { isOpen, close, setIsOpen } = useUpdatePasswordModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <UpdateBreedInformationsForm />
    </ResponsiveModal>
  );
}
