import { useQueryState, parseAsBoolean } from "nuqs";

export const useUpdatePasswordModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "update-breed-informations",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }),
  );

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, setIsOpen, open, close };
};
