import { debounce } from "lodash";
import { useCallback } from "react";

export const useDebounceFn = (fn: () => void, delay: number) => {
  const onSubmit = () => fn();
  const debouncedSubmit = debounce(onSubmit, delay);
  const _debouncedSubmit = useCallback(debouncedSubmit, [debouncedSubmit]);
  return _debouncedSubmit;
};
