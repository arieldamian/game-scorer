import { useEffect, useRef, useState } from "react";

interface ModalProps {
  showModal: boolean;
  onModalClose: (num: number) => void;
  playerName: string;
}

export default function Modal({ showModal, onModalClose, playerName }: ModalProps) {
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
      modalRef.current?.close();
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
		<dialog className="relative p-4 w-4/5 md:w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700" ref={modalRef} onClose={handleDialogClose}>
      <form onSubmit={handleSubmit} >
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Puntaje para <span className="italic underline">{playerName}</span>
          </h3>
          <button onClick={handleDialogClose} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="flex items-center my-8">
          <label
            htmlFor="number"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >Ingresar valor</label>
          <input
            autoFocus
            type="number"
            id="number"
            className="w-auto ml-6 bg-gray-50 border border-gray-300 text-center text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            value={value}
            onChange={onChange}
          />
        </div>
        <button
          type="submit"
          className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >Agregar puntos</button>
      </form> 
		</dialog>
	);
}