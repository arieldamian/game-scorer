import { useEffect, useRef, useState } from "react";

interface ModalProps {
  showModal: boolean;
  onModalClose: (num: number) => void;
}

export default function Modal({ showModal, onModalClose }: ModalProps) {
	const modalRef = useRef<HTMLDialogElement | null>(null);
  const [value, setValue] = useState<string>('');
  const [closeTriggered, setCloseTriggered] = useState<boolean>(false);

  useEffect(() => {
    if (showModal) {
      modalRef?.current!.showModal();
    }
  }, [showModal]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setCloseTriggered(true); // Set that the close was triggered intentionally
    modalRef.current?.close();
    onModalClose(Number(value));
    setValue('');
  }

  const handleDialogClose = () => {
    if (!closeTriggered) { // If close was not triggered intentionally, reset the value
        setValue('');
        onModalClose(0);
    }
    setCloseTriggered(false); // Reset the state for the next open
}

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const re = /[0-9\b]+$/;
    if (e.target.value !== '' && !re.test(e.target.value)) {
      return;
    }

    setValue(e.target.value);
  }

  return (
		<dialog ref={modalRef} onClose={handleDialogClose}>
      <form onSubmit={handleSubmit}>
        <label>
          Enter a number:
          <input
            autoFocus
            type="number"
            value={value}
            onChange={onChange}
          />
          <button type="submit">OK</button>
        </label>
      </form> 
		</dialog>
	);
}