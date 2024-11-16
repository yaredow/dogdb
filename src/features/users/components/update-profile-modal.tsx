"use client";

import ResponsiveModal from "@/components/responsive-modal";
import { useUpdateProfileModal } from "../hooks/use-update-profile-modal";
import UpdateProfileFormWrapper from "./update-profile-form-wrapper";

export const UpdateProfileModal = () => {
  const { isOpen, setIsOpen, close } = useUpdateProfileModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <UpdateProfileFormWrapper onCancel={close} />
    </ResponsiveModal>
  );
};
