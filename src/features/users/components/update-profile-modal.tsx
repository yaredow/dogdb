import ResponsiveModal from "@/components/responsive-modal";
import UpdateProfileFormWrapper from "./update-profile-form-wrapper";
import { useUpdateProfileModal } from "../hooks/use-update-profile-modal";

export default function UpdateProfileModal() {
  const { isOpen, setIsOpen, close } = useUpdateProfileModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <UpdateProfileFormWrapper onCancel={close} />
    </ResponsiveModal>
  );
}
